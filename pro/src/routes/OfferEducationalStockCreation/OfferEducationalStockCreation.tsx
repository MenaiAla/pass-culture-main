import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'

import useNotification from 'components/hooks/useNotification'
import Spinner from 'components/layout/Spinner'
import {
  DEFAULT_EAC_STOCK_FORM_VALUES,
  EducationalOfferType,
  getStockOfferAdapter,
  GetStockOfferSuccessPayload,
  Mode,
  OfferEducationalStockFormValues,
} from 'core/OfferEducational'
import { OfferBreadcrumbStep } from 'new_components/OfferBreadcrumb'
import OfferEducationalLayout from 'new_components/OfferEducationalLayout'
import RouteLeavingGuardOfferCreation from 'new_components/RouteLeavingGuardOfferCreation'
import OfferEducationalStockScreen from 'screens/OfferEducationalStock'

import postEducationalShadowStockAdapter from './adapters/postEducationalShadowStock'
import postEducationalStockAdapter from './adapters/postEducationalStock'

const OfferEducationalStockCreation = (): JSX.Element => {
  const [offer, setOffer] = useState<GetStockOfferSuccessPayload | null>(null)
  const [isReady, setIsReady] = useState<boolean>(false)
  const { offerId } = useParams<{ offerId: string }>()
  const notify = useNotification()
  const navigate = useNavigate()

  const handleSubmitStock = async (
    offer: GetStockOfferSuccessPayload,
    values: OfferEducationalStockFormValues
  ) => {
    let isOk: boolean
    let message: string | null

    if (values.educationalOfferType === EducationalOfferType.SHOWCASE) {
      const response = await postEducationalShadowStockAdapter({
        offerId: offer.id,
        values,
      })
      isOk = response.isOk
      message = response.message
    } else {
      const response = await postEducationalStockAdapter({
        offer,
        values,
      })
      isOk = response.isOk
      message = response.message
    }

    if (!isOk) {
      return notify.error(message)
    }
    navigate(`/offre/${offer.id}/collectif/confirmation`)
  }

  useEffect(() => {
    if (!isReady) {
      const loadOffer = async () => {
        const { payload, message, isOk } = await getStockOfferAdapter(offerId)

        if (!isOk) {
          return notify.error(message)
        }

        setOffer(payload)
        setIsReady(true)
      }

      loadOffer()
    }
  }, [offerId, notify, isReady])

  return (
    <OfferEducationalLayout
      activeStep={OfferBreadcrumbStep.STOCKS}
      isCreatingOffer
      title="Créer une nouvelle offre scolaire"
    >
      {offer && isReady ? (
        <>
          <OfferEducationalStockScreen
            initialValues={DEFAULT_EAC_STOCK_FORM_VALUES}
            mode={Mode.CREATION}
            offer={offer}
            onSubmit={handleSubmitStock}
          />
          <RouteLeavingGuardOfferCreation isCollectiveFlow />
        </>
      ) : (
        <Spinner />
      )}
    </OfferEducationalLayout>
  )
}

export default OfferEducationalStockCreation
