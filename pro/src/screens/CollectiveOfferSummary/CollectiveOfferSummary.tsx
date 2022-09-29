import React from 'react'

import useNotification from 'components/hooks/useNotification'
import {
  cancelCollectiveBookingAdapter,
  CollectiveOffer,
  CollectiveOfferTemplate,
  EducationalCategories,
  patchIsCollectiveOfferActiveAdapter,
  patchIsTemplateOfferActiveAdapter,
} from 'core/OfferEducational'
import OfferEducationalActions from 'new_components/OfferEducationalActions'
import { SummaryLayout } from 'new_components/SummaryLayout'
import { ButtonLink } from 'ui-kit'
import { ButtonVariant } from 'ui-kit/Button/types'

import styles from './CollectiveOfferSummary.module.scss'
import CollectiveOfferAccessibilitySection from './components/CollectiveOfferAccessibilitySection'
import CollectiveOfferContactSection from './components/CollectiveOfferContactSection'
import CollectiveOfferNotificationSection from './components/CollectiveOfferNotificationSection'
import CollectiveOfferParticipantSection from './components/CollectiveOfferParticipantSection'
import CollectiveOfferPracticalInformation from './components/CollectiveOfferPracticalInformation'
import CollectiveOfferStockSection from './components/CollectiveOfferStockSection'
import CollectiveOfferTypeSection from './components/CollectiveOfferTypeSection'
import CollectiveOfferVenueSection from './components/CollectiveOfferVenueSection'
import CollectiveOfferVisibilitySection from './components/CollectiveOfferVisibilitySection'
import { DEFAULT_RECAP_VALUE } from './components/constants'

interface ICollectiveOfferSummaryProps {
  offer: CollectiveOfferTemplate | CollectiveOffer
  categories: EducationalCategories
  reloadCollectiveOffer?: () => void
}

const CollectiveOfferSummary = ({
  offer,
  categories,
  reloadCollectiveOffer,
}: ICollectiveOfferSummaryProps) => {
  const notify = useNotification()

  const setIsOfferActive = async () => {
    const adapter = offer.isTemplate
      ? patchIsTemplateOfferActiveAdapter
      : patchIsCollectiveOfferActiveAdapter

    const response = await adapter({
      offerId: offer.id,
      isActive: !offer.isActive,
    })

    if (response.isOk) {
      return notify.success(response.message)
    }

    notify.error(response.message)
  }

  const cancelActiveBookings = async () => {
    if (offer.isTemplate) {
      return
    }

    const { isOk, message } = await cancelCollectiveBookingAdapter({
      offerId: offer.id,
    })

    if (!isOk) {
      return notify.error(message)
    }

    notify.success(message)
    reloadCollectiveOffer?.()
  }

  const offerEditLink = `/offre/${offer.isTemplate ? 'T-' : ''}${
    offer.id
  }/collectif/edition`

  const stockEditLink = `/offre/${offer.isTemplate ? 'T-' : ''}${
    offer.id
  }/collectif/stocks/edition`

  const visibilityEditLink = `/offre/${offer.id}/collectif/visibilite/edition`

  return (
    <>
      <OfferEducationalActions
        cancelActiveBookings={cancelActiveBookings}
        className={styles.actions}
        isBooked={
          offer.isTemplate ? false : Boolean(offer.collectiveStock?.isBooked)
        }
        isCancellable={offer.isCancellable}
        isOfferActive={offer.isActive}
        setIsOfferActive={setIsOfferActive}
      />
      <SummaryLayout>
        <SummaryLayout.Content fullWidth>
          <SummaryLayout.Section
            title="Détails de l’offre"
            editLink={offerEditLink}
          >
            <CollectiveOfferVenueSection venue={offer.venue} />
            <CollectiveOfferTypeSection offer={offer} categories={categories} />
            <CollectiveOfferPracticalInformation offer={offer} />
            <CollectiveOfferParticipantSection students={offer.students} />
            <CollectiveOfferAccessibilitySection offer={offer} />
            <CollectiveOfferContactSection
              phone={offer.contactPhone}
              email={offer.contactEmail}
            />
            {offer.bookingEmails.length > 0 && (
              <CollectiveOfferNotificationSection
                bookingEmails={offer.bookingEmails}
              />
            )}
          </SummaryLayout.Section>
          <SummaryLayout.Section title="Date & Prix" editLink={stockEditLink}>
            {offer.isTemplate ? (
              <SummaryLayout.Row
                title="Détails"
                description={
                  offer.educationalPriceDetail || DEFAULT_RECAP_VALUE
                }
              />
            ) : (
              <CollectiveOfferStockSection
                stock={offer.collectiveStock}
                venueDepartmentCode={offer.venue.departementCode}
              />
            )}
          </SummaryLayout.Section>
          {!offer.isTemplate && (
            <SummaryLayout.Section
              title="Visibilité"
              editLink={visibilityEditLink}
            >
              <CollectiveOfferVisibilitySection
                institution={offer.institution}
              />
            </SummaryLayout.Section>
          )}
        </SummaryLayout.Content>
      </SummaryLayout>
      <ButtonLink
        variant={ButtonVariant.PRIMARY}
        link={{ isExternal: false, to: '/offers/collective' }}
      >
        Retour à la liste des offres
      </ButtonLink>
    </>
  )
}

export default CollectiveOfferSummary