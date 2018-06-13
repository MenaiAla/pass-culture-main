import { createSelector } from 'reselect'

export default createSelector(
  state => state.data.venues,
  (state, ownProps) => ownProps.match.params.offererId,
  (venues, offererId) => venues &&
    venues.filter(v => v.managingOffererId === offererId)
)
