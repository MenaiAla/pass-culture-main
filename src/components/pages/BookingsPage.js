import { requestData } from 'pass-culture-shared'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import BookingItem from '../BookingItem'
import Main from '../layout/Main'
import withLogin from '../hocs/withLogin'
import selectBookingsByTime from '../../selectors/bookingsByTime'
import { IS_DEXIE } from '../../utils/config'

class BookingsPage extends Component {
  componentDidMount() {
    this.handleRequestBookings()
  }

  handleRequestBookings = () => {
    this.props.requestData('GET', 'bookings', { local: IS_DEXIE })
  }

  render() {
    const { soonBookings, otherBookings } = this.props.bookingsByTime
    return (
      <Main name="bookings" redBg menuButton={{ borderTop: true }} backButton>
        <header>
          <h1>Mes réservations</h1>
        </header>
        {soonBookings.length > 0 && (
          <div>
            <h4>C'est bientôt !</h4>
            <ul className="bookings">
              {soonBookings.map((b, index) => (
                <BookingItem key={index} {...b} />
              ))}
            </ul>
          </div>
        )}
        {otherBookings.length > 0 && (
          <div>
            <h4>Réservations</h4>
            <ul className="bookings">
              {otherBookings.map((b, index) => (
                <BookingItem key={index} {...b} />
              ))}
            </ul>
          </div>
        )}
        {soonBookings.length === 0 &&
          otherBookings.length === 0 && (
            <div>
              <p className="nothing">Pas encore de réservation.</p>
              <p className="nothing">
                <Link to="/decouverte" className="button is-primary">
                  Allez-y !
                </Link>
              </p>
            </div>
          )}
      </Main>
    )
  }
}

export default compose(
  withLogin({ isRequired: true }),
  connect(
    state => ({
      bookingsByTime: selectBookingsByTime(state),
    }),
    { requestData }
  )
)(BookingsPage)
