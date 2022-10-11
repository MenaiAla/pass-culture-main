import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route } from 'react-router'

import { api } from 'apiClient/api'
import { configureTestStore } from 'store/testUtils'

import OfferLayout from '../../OfferLayout'

jest.mock('apiClient/api', () => ({
  api: {
    getCategories: jest.fn(),
    getOffer: jest.fn(),
    getStocks: jest.fn(),
    getVenues: jest.fn(),
    upsertStocks: jest.fn(),
    listOfferersNames: jest.fn(),
  },
}))

const renderOffers = async (
  props,
  storeOverrides,
  pathname = '/offre/AG3A/individuel/brouillon/stocks'
) => {
  const store = configureTestStore(storeOverrides)
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[{ pathname: pathname }]}>
        <Route path="/offre/:offerId([A-Z0-9]+)/individuel">
          {() => <OfferLayout {...props} />}
        </Route>
      </MemoryRouter>
    </Provider>
  )
}

describe('stocks page - Brouillon', () => {
  let props
  let defaultOffer
  let defaultStock
  let stockId
  let store
  beforeEach(() => {
    store = {
      user: {
        currentUser: { publicName: 'François', isAdmin: false },
        initialized: true,
      },
      features: {
        initialized: true,
        list: [],
      },
    }
    props = {}

    defaultOffer = {
      id: 'AG3A',
      venue: {
        id: 'BC',
        departementCode: '973',
        managingOfferer: {
          id: 'AB',
          name: 'offerer name',
        },
      },
      isEvent: false,
      status: 'DRAFT',
      stocks: [],
      dateCreated: '',
      fieldsUpdated: [],
      hasBookingLimitDatetimesPassed: true,
      isActive: true,
      isBookable: true,
      isDigital: true,
      isDuo: true,
      isEditable: true,
      isEducational: false,
      isNational: true,
      isThing: true,
      mediaUrls: [],
      mediations: [],
      name: 'offer name',
      nonHumanizedId: 1,
      product: {
        fieldsUpdated: [],
        id: 'product_id',
        isGcuCompatible: true,
        isNational: false,
        mediaUrls: [],
        name: 'product name',
        thumbCount: 0,
      },
      productId: 'product_id',
      subcategoryId: 'CONFERENCE',
      venueId: 'BC',
    }

    stockId = '2E'
    defaultStock = {
      activationCodes: [],
      activationCodesExpirationDatetime: null,
      quantity: 10,
      price: 10.01,
      remainingQuantity: 6,
      bookingsQuantity: 4,
      bookingLimitDatetime: '2020-12-18T23:59:59Z',
      id: stockId,
      isEventDeletable: true,
    }

    jest.spyOn(api, 'getOffer').mockResolvedValue(defaultOffer)
    api.getStocks.mockResolvedValue({ stocks: [defaultStock] })
    api.getCategories.mockResolvedValue({
      categories: [],
      subcategories: [],
    })
    api.upsertStocks.mockResolvedValue({})
    jest.spyOn(api, 'listOfferersNames').mockResolvedValue({
      offerersNames: [
        {
          id: 'AB',
          name: 'offerer name',
        },
      ],
    })
    jest.spyOn(api, 'getVenues').mockResolvedValue({
      venues: [
        {
          id: 'BC',
          isVirtual: false,
          managingOffererId: 'AB',
          name: 'venue name',
          offererName: 'offerer name',
        },
      ],
    })
  })
  describe('Brouillon', () => {
    it('should render a form with the right title', async () => {
      renderOffers(props, store)
      expect(await screen.findByText("Compléter l'offre")).toBeInTheDocument()
    })
  })
})