import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { Events } from 'core/FirebaseEvents/constants'
import * as useAnalytics from 'hooks/useAnalytics'
import { individualOfferFactory } from 'utils/individualApiFactories'
import { renderWithProviders } from 'utils/renderWithProviders'

import { PriceCategoriesSection } from '../PriceCategoriesSection'

const mockLogEvent = jest.fn()

describe('StockEventSection', () => {
  beforeEach(() => {
    jest.spyOn(useAnalytics, 'default').mockImplementation(() => ({
      logEvent: mockLogEvent,
      setLogEvent: null,
    }))
  })

  it('should render correctly', () => {
    const offer = individualOfferFactory()

    renderWithProviders(<PriceCategoriesSection offer={offer} />)

    expect(screen.getByText(/Tarifs/)).toBeInTheDocument()
  })

  it('should track click on modify button', async () => {
    const offer = individualOfferFactory()

    renderWithProviders(<PriceCategoriesSection offer={offer} />)

    await userEvent.click(screen.getByRole('link', { name: /Modifier/ }))

    expect(mockLogEvent).toHaveBeenCalledTimes(1)
    expect(mockLogEvent).toHaveBeenNthCalledWith(
      1,
      Events.CLICKED_OFFER_FORM_NAVIGATION,
      {
        from: 'recapitulatif',
        isDraft: false,
        isEdition: true,
        offerId: offer.id,
        to: 'tarifs',
        used: 'RecapLink',
      }
    )
  })
})
