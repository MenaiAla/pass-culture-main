import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'

import {
  Events,
  OFFER_FROM_TEMPLATE_ENTRIES,
} from 'core/FirebaseEvents/constants'
import {
  CollectiveOffer,
  CollectiveOfferTemplate,
  EducationalCategories,
} from 'core/OfferEducational'
import * as useAnalytics from 'hooks/useAnalytics'
import {
  categoriesFactory,
  subCategoriesFactory,
} from 'screens/OfferEducational/__tests-utils__'
import {
  collectiveOfferStockFactory,
  collectiveOfferTemplateFactory,
  offerFactory,
} from 'screens/OfferEducationalStock/__tests-utils__'
import { configureTestStore } from 'store/testUtils'

import CollectiveOfferSummaryEdition from '../CollectiveOfferSummaryEdition'

const renderCollectiveOfferSummaryEdition = (
  offer: CollectiveOfferTemplate | CollectiveOffer,
  categories: EducationalCategories
) => {
  const store = configureTestStore({
    user: {
      initialized: true,
      currentUser: {
        firstName: 'John',
        dateCreated: '2022-07-29T12:18:43.087097Z',
        email: 'john@do.net',
        id: '1',
        nonHumanizedId: '1',
        isAdmin: false,
        isEmailValidated: true,
        roles: [],
      },
    },
    features: {
      list: [
        {
          isActive: true,
          nameKey: 'WIP_CREATE_COLLECTIVE_OFFER_FROM_TEMPLATE',
        },
      ],
    },
  })
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CollectiveOfferSummaryEdition
          offer={offer}
          categories={categories}
          reloadCollectiveOffer={jest.fn()}
        />
      </MemoryRouter>
    </Provider>
  )
}

describe('CollectiveOfferSummary', () => {
  let offer: CollectiveOfferTemplate | CollectiveOffer
  let categories: EducationalCategories
  const mockLogEvent = jest.fn()

  beforeEach(() => {
    offer = collectiveOfferTemplateFactory({ isTemplate: true })
    categories = {
      educationalCategories: categoriesFactory([{ id: 'CAT_1' }]),
      educationalSubCategories: subCategoriesFactory([
        { categoryId: 'CAT_1', id: 'SUBCAT_1' },
      ]),
    }
    jest.spyOn(useAnalytics, 'default').mockImplementation(() => ({
      logEvent: mockLogEvent,
      setLogEvent: null,
    }))
  })
  it('should render create from template button if offer is template', () => {
    renderCollectiveOfferSummaryEdition(offer, categories)

    const createFromTemplateButton = screen.getByRole('link', {
      name: 'Créer une offre réservable pour un établissement scolaire',
    })

    expect(createFromTemplateButton).toBeInTheDocument()
  })
  it('should display desactive offer option when offer is active and not booked', () => {
    offer = collectiveOfferTemplateFactory({ isTemplate: true, isActive: true })
    renderCollectiveOfferSummaryEdition(offer, categories)

    const desactivateOffer = screen.getByRole('button', {
      name: 'Désactiver l’offre',
    })

    expect(desactivateOffer).toBeInTheDocument()
  })

  it('should display cancel booking button when offer is booked', () => {
    offer = offerFactory({
      isTemplate: false,
      isActive: true,
      collectiveStock: collectiveOfferStockFactory({ isBooked: true }),
    })
    renderCollectiveOfferSummaryEdition(offer, categories)

    const cancelBooking = screen.getByRole('button', {
      name: 'Annuler la réservation',
    })

    expect(cancelBooking).toBeInTheDocument()
  })

  it('should log event when clicking duplicate offer button', async () => {
    offer = collectiveOfferTemplateFactory({ isTemplate: true, isActive: true })
    renderCollectiveOfferSummaryEdition(offer, categories)

    const duplicateOffer = screen.getByRole('link', {
      name: 'Créer une offre réservable pour un établissement scolaire',
    })
    await userEvent.click(duplicateOffer)

    expect(mockLogEvent).toHaveBeenNthCalledWith(
      1,
      Events.CLICKED_DUPLICATE_TEMPLATE_OFFER,
      {
        from: OFFER_FROM_TEMPLATE_ENTRIES.OFFER_TEMPLATE_RECAP,
      }
    )
  })
})