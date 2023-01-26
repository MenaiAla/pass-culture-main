import './Offer.scss'

import cn from 'classnames'
import React, { useState } from 'react'

import { apiAdage } from 'apiClient/api'
import {
  HydratedCollectiveOffer,
  HydratedCollectiveOfferTemplate,
} from 'pages/AdageIframe/app/types/offers'
import { Tag } from 'pages/AdageIframe/app/ui-kit'
import { ReactComponent as ChevronIcon } from 'pages/AdageIframe/assets/chevron.svg'
import { ReactComponent as Logo } from 'pages/AdageIframe/assets/logo-without-text.svg'
import { ReactComponent as ImagePlaceholder } from 'pages/AdageIframe/assets/offer-image-placeholder.svg'
import { LOGS_DATA } from 'utils/config'

import ContactButton from './ContactButton'
import OfferDetails from './OfferDetails/OfferDetails'
import OfferSummary from './OfferSummary/OfferSummary'
import PrebookingButton from './PrebookingButton/PrebookingButton'
import { formatDescription } from './utils/formatDescription'
import { getOfferVenueAndOffererName } from './utils/getOfferVenueAndOffererName'

export const Offer = ({
  offer,
  canPrebookOffers,
  queryId,
  position,
}: {
  canPrebookOffers: boolean
  offer: HydratedCollectiveOffer | HydratedCollectiveOfferTemplate
  queryId: string
  position: number
}): JSX.Element => {
  const [displayDetails, setDisplayDetails] = useState(false)

  const openOfferDetails = (
    offer: HydratedCollectiveOffer | HydratedCollectiveOfferTemplate
  ) => {
    if (LOGS_DATA) {
      !offer.isTemplate
        ? apiAdage.logOfferDetailsButtonClick({ stockId: offer.stock.id })
        : apiAdage.logOfferTemplateDetailsButtonClick({ offerId: offer.id })
    }
    setDisplayDetails(!displayDetails)
  }

  return (
    <li className="offer" data-testid="offer-listitem">
      <div
        className={cn('offer-logo-placeholder', {
          'offer-logo-placeholder-showcase': offer.isTemplate,
        })}
        data-testid="thumb-placeholder"
      >
        <Logo />
      </div>
      <div className="offer-main-container">
        <div className="offer-image-container">
          {offer.imageUrl ? (
            <img
              alt=""
              className="offer-image"
              loading="lazy"
              src={offer.imageUrl}
            />
          ) : (
            <div className="offer-image-default">
              <ImagePlaceholder />
            </div>
          )}
        </div>
        <div className="offer-container">
          {offer.isTemplate ? (
            <ContactButton
              className="offer-prebooking-button"
              contactEmail={offer.contactEmail}
              contactPhone={offer.contactPhone}
              offerId={offer.id}
              position={position}
              queryId={queryId}
            />
          ) : (
            <PrebookingButton
              canPrebookOffers={canPrebookOffers}
              className="offer-prebooking-button"
              offerId={offer.id}
              queryId={queryId}
              stock={offer.stock}
            />
          )}
          <div className="offer-header">
            <h2 className="offer-header-title">{offer.name}</h2>
            <p className="offer-venue-name">
              {getOfferVenueAndOffererName(offer.venue)}
            </p>
            <ul className="offer-domains-list">
              {offer?.domains?.map(domain => (
                <li className="offer-domains-list-item" key={domain.id}>
                  <Tag label={domain.name} />
                </li>
              ))}
            </ul>
          </div>
          <OfferSummary offer={offer} />
          <p className="offer-description">
            {formatDescription(offer.description)}
          </p>
          <button
            className="offer-see-more"
            onClick={() => openOfferDetails(offer)}
            type="button"
          >
            <ChevronIcon
              className={cn('offer-see-more-icon', {
                'offer-see-more-icon-closed': !displayDetails,
              })}
            />
            en savoir plus
          </button>
          {displayDetails && <OfferDetails offer={offer} />}
        </div>
      </div>
    </li>
  )
}
