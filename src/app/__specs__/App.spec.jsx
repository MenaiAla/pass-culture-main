import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import React from 'react'
import { shallow } from 'enzyme'
import { App } from '../App'
import RedirectToMaintenance from '../RedirectToMaintenance'
import Router from 'react-router/Router'
import { createBrowserHistory } from 'history'

const middlewares = []
const mockStore = configureStore(middlewares)

describe('src | components | App', () => {
  it('should match the snapshot', () => {
    // given
    const initialState = {}
    const store = mockStore(initialState)
    const props = {
      location: {},
    }

    // when
    const wrapper = shallow(
      <Provider store={store}>
        <App {...props} />
      </Provider>
    )

    // then
    expect(wrapper).toMatchSnapshot()
  })

  it('should render a Redirect component when isMaintenanceSelector.js is true', () => {
    // given
    const props = {
      history: {},
      location: {},
      isMaintenanceActivated: true,
    }
    // when
    const wrapper = shallow(
      <App {...props}>
        <p>
          {'Sub component'}
        </p>
      </App>
    )

    // then
    const redirectNode = wrapper.find(RedirectToMaintenance)
    expect(redirectNode).toHaveLength(1)
  })

  it('should render a App component when isMaintenanceSelector.js is false', () => {
    // given
    const history = createBrowserHistory()
    const initialState = {}
    const store = configureStore([])(initialState)
    const props = {
      history: {},
      location: {},
      isMaintenanceActivated: false,
    }
    // when
    const wrapper = shallow(
      <Provider store={store}>
        <Router history={history}>
          <App {...props}>
            <div>
              {'Sub component'}
            </div>
          </App>
        </Router>
      </Provider>
    )

    // then
    const appNode = wrapper.find(App)
    const redirectNode = wrapper.find(RedirectToMaintenance)
    expect(appNode).toHaveLength(1)
    expect(redirectNode).toHaveLength(0)
  })
})
