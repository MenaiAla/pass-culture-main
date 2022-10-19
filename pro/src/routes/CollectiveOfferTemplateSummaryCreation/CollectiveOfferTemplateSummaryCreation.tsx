import React from 'react'

import Spinner from 'components/layout/Spinner'
import {
  getEducationalCategoriesAdapter,
  CollectiveOfferTemplate,
} from 'core/OfferEducational'
import { useAdapter } from 'hooks'
import useNotification from 'hooks/useNotification'
import CollectiveOfferSummaryCreation from 'screens/CollectiveOfferSummaryCreation'

interface CollectiveOfferTemplateSummaryProps {
  offer: CollectiveOfferTemplate
}
const CollectiveOfferTemplateSummary = ({
  offer,
}: CollectiveOfferTemplateSummaryProps): JSX.Element => {
  const notify = useNotification()

  const {
    data: categories,
    error,
    isLoading,
  } = useAdapter(getEducationalCategoriesAdapter)

  if (error) {
    notify.error(error.message)
    return <></>
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <CollectiveOfferSummaryCreation offer={offer} categories={categories} />
  )
}

export default CollectiveOfferTemplateSummary
