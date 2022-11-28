import { FormikProvider, useFormik } from 'formik'
import React, { useCallback, useState } from 'react'

import { api } from 'apiClient/api'
import FormLayout from 'components/FormLayout'
import { OFFER_WIZARD_STEP_IDS } from 'components/OfferIndividualStepper'
import { RouteLeavingGuardOfferIndividual } from 'components/RouteLeavingGuardOfferIndividual'
import { StockFormRow } from 'components/StockFormRow'
import { IStockFormRowAction } from 'components/StockFormRow/SockFormActions/types'
import {
  StockThingForm,
  getValidationSchema,
  buildInitialValues,
  IStockThingFormValues,
  STOCK_THING_FORM_DEFAULT_VALUES,
} from 'components/StockThingForm'
import { setFormReadOnlyFields } from 'components/StockThingForm/utils'
import { useOfferIndividualContext } from 'context/OfferIndividualContext'
import {
  Events,
  OFFER_FORM_NAVIGATION_MEDIUM,
  OFFER_FORM_NAVIGATION_OUT,
} from 'core/FirebaseEvents/constants'
import { getOfferIndividualAdapter } from 'core/Offers/adapters'
import {
  LIVRE_PAPIER_SUBCATEGORY_ID,
  OFFER_WIZARD_MODE,
} from 'core/Offers/constants'
import { IOfferIndividual } from 'core/Offers/types'
import { getOfferIndividualUrl } from 'core/Offers/utils/getOfferIndividualUrl'
import { isOfferDisabled } from 'core/Offers/utils/isOfferDisabled'
import { useNavigate, useOfferWizardMode } from 'hooks'
import useAnalytics from 'hooks/useAnalytics'
import { useModal } from 'hooks/useModal'
import useNotification from 'hooks/useNotification'
import { ReactComponent as AddActivationCodeIcon } from 'icons/add-activation-code-light.svg'
import { ReactComponent as TrashFilledIcon } from 'icons/ico-trash-filled.svg'
import { getToday } from 'utils/date'
import { getLocalDepartementDateTimeFromUtc } from 'utils/timezone'

import { ActionBar } from '../ActionBar'
import { DialogStockDeleteConfirm } from '../DialogStockDeleteConfirm'
import { SynchronizedProviderInformation } from '../SynchronisedProviderInfos'
import { logTo } from '../utils/logTo'

import { ActivationCodeFormDialog } from './ActivationCodeFormDialog'
import { upsertStocksThingAdapter } from './adapters'

export interface IStocksThingProps {
  offer: IOfferIndividual
}

const StocksThing = ({ offer }: IStocksThingProps): JSX.Element => {
  const mode = useOfferWizardMode()
  const [afterSubmitUrl, setAfterSubmitUrl] = useState<string>(
    getOfferIndividualUrl({
      offerId: offer.id,
      step: OFFER_WIZARD_STEP_IDS.SUMMARY,
      mode,
    })
  )
  const [
    isSubmittingFromRouteLeavingGuard,
    setIsSubmittingFromRouteLeavingGuard,
  ] = useState<boolean>(false)
  const [isClickingFromActionBar, setIsClickingFromActionBar] =
    useState<boolean>(false)
  const { logEvent } = useAnalytics()
  const navigate = useNavigate()
  const notify = useNotification()
  const { setOffer } = useOfferIndividualContext()
  const {
    visible: activationCodeFormVisible,
    showModal: activationCodeFormShow,
    hideModal: activationCodeFormHide,
  } = useModal()
  const {
    visible: deleteConfirmVisible,
    showModal: deleteConfirmShow,
    hideModal: deleteConfirmHide,
  } = useModal()
  /* istanbul ignore next: DEBT, TO FIX */
  const isDisabled = offer.status ? isOfferDisabled(offer.status) : false
  const isSynchronized = offer.lastProvider !== null
  const providerName = offer?.lastProviderName

  const onSubmit = async (formValues: IStockThingFormValues) => {
    const { isOk, payload, message } = await upsertStocksThingAdapter({
      offerId: offer.id,
      formValues,
      departementCode: offer.venue.departmentCode,
      mode,
    })

    /* istanbul ignore next: DEBT, TO FIX */
    if (isOk) {
      notify.success(message)
      const response = await getOfferIndividualAdapter(offer.id)
      if (response.isOk) {
        setOffer && setOffer(response.payload)
      }
      if (!isSubmittingFromRouteLeavingGuard) {
        navigate(afterSubmitUrl)
      }
    } else {
      /* istanbul ignore next: DEBT, TO FIX */
      formik.setErrors(payload.errors)
    }
    setIsClickingFromActionBar(false)
  }

  let minQuantity = null
  // validation is test in getValidationSchema
  // and it's not possible as is to test it here
  /* istanbul ignore next: DEBT, TO FIX */
  if (offer.stocks.length > 0) {
    minQuantity = offer.stocks[0].bookingsQuantity
  }
  const today = getLocalDepartementDateTimeFromUtc(
    getToday(),
    offer.venue.departmentCode
  )
  const initialValues = buildInitialValues(offer)
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: getValidationSchema(minQuantity),
    // enableReinitialize is needed to reset dirty after submit (and not block after saving a draft)
    enableReinitialize: true,
  })

  const handleNextStep =
    ({ saveDraft = false } = {}) =>
    () => {
      // tested but coverage don't see it.
      /* istanbul ignore next */
      setIsClickingFromActionBar(true)
      setAfterSubmitUrl(
        getOfferIndividualUrl({
          offerId: offer.id,
          step: saveDraft
            ? OFFER_WIZARD_STEP_IDS.STOCKS
            : OFFER_WIZARD_STEP_IDS.SUMMARY,
          mode,
        })
      )
      if (!Object.keys(formik.touched).length) {
        setIsClickingFromActionBar(false)
        notify.success('Brouillon sauvegardé dans la liste des offres')
      } else {
        formik.handleSubmit()
      }
      logEvent?.(Events.CLICKED_OFFER_FORM_NAVIGATION, {
        from: OFFER_WIZARD_STEP_IDS.STOCKS,
        to: saveDraft
          ? OFFER_WIZARD_STEP_IDS.STOCKS
          : OFFER_WIZARD_STEP_IDS.SUMMARY,
        used: saveDraft
          ? OFFER_FORM_NAVIGATION_MEDIUM.DRAFT_BUTTONS
          : OFFER_FORM_NAVIGATION_MEDIUM.STICKY_BUTTONS,
        isEdition: mode !== OFFER_WIZARD_MODE.CREATION,
        isDraft: mode !== OFFER_WIZARD_MODE.EDITION,
        offerId: offer.id,
      })
    }

  const handlePreviousStep = () => {
    if (!formik.dirty) {
      logEvent?.(Events.CLICKED_OFFER_FORM_NAVIGATION, {
        from: OFFER_WIZARD_STEP_IDS.STOCKS,
        to: OFFER_WIZARD_STEP_IDS.INFORMATIONS,
        used: OFFER_FORM_NAVIGATION_MEDIUM.STICKY_BUTTONS,
        isEdition: mode !== OFFER_WIZARD_MODE.CREATION,
        isDraft: mode !== OFFER_WIZARD_MODE.EDITION,
        offerId: offer.id,
      })
    }
    /* istanbul ignore next: DEBT, TO FIX */
    navigate(
      getOfferIndividualUrl({
        offerId: offer.id,
        step: OFFER_WIZARD_STEP_IDS.INFORMATIONS,
        mode,
      })
    )
  }

  const renderStockForm = () => {
    return (
      <StockThingForm
        today={today}
        readOnlyFields={setFormReadOnlyFields(offer, formik.values)}
        showExpirationDate={
          formik.values.activationCodesExpirationDatetime !== null
        }
      />
    )
  }

  let actions: IStockFormRowAction[] = []
  let description
  if (!offer.isDigital) {
    description = `Les utilisateurs ont ${
      offer.subcategoryId === LIVRE_PAPIER_SUBCATEGORY_ID ? '10' : '30'
    } jours pour faire valider leur contremarque. Passé ce délai, la réservation est automatiquement annulée et l’offre remise en vente.`
  } else {
    description =
      'Les utilisateurs ont 30 jours pour annuler leurs réservations d’offres numériques. Dans le cas d’offres avec codes d’activation, les utilisateurs ne peuvent pas annuler leurs réservations d’offres numériques. Toute réservation est définitive et sera immédiatement validée.'
    let isDisabled = false
    if (offer.stocks.length > 0 && offer.stocks[0].hasActivationCode) {
      isDisabled = true
    }

    actions = [
      {
        callback: activationCodeFormShow,
        label: "Ajouter des codes d'activation",
        disabled: isDisabled,
        Icon: AddActivationCodeIcon,
      },
    ]
  }
  if (formik.values.stockId) {
    actions.push({
      callback: deleteConfirmShow,
      label: 'Supprimer le stock',
      disabled: isDisabled || isSynchronized,
      Icon: TrashFilledIcon,
    })
  }

  if (offer.isDigital) {
    description += `

    Pour ajouter des codes d’activation, veuillez passer par le menu ··· et choisir l’option correspondante.`
  }

  const submitActivationCodes = useCallback(
    (activationCodes: string[]) => {
      formik.setFieldValue('quantity', activationCodes?.length, true)
      formik.setFieldValue('activationCodes', activationCodes)
      activationCodeFormHide()
    },
    [activationCodeFormHide]
  )

  const onDeleteStock = async () => {
    formik.values.stockId &&
      api
        .deleteStock(formik.values.stockId)
        .then(() => {
          notify.success('Le stock a été supprimé.')
          formik.setValues(STOCK_THING_FORM_DEFAULT_VALUES)
        })
        .catch(() =>
          notify.error(
            'Une erreur est survenue lors de la suppression du stock.'
          )
        )
  }

  const onConfirmDeleteStock = () => {
    onDeleteStock()
    deleteConfirmHide()
  }

  return (
    <FormikProvider value={formik}>
      {deleteConfirmVisible && (
        <DialogStockDeleteConfirm
          onConfirm={onConfirmDeleteStock}
          onCancel={deleteConfirmHide}
          isEvent={true}
        />
      )}
      {activationCodeFormVisible && (
        <ActivationCodeFormDialog
          onSubmit={submitActivationCodes}
          onCancel={activationCodeFormHide}
          today={today}
          minExpirationDate={formik.values.bookingLimitDatetime}
        />
      )}

      {providerName && (
        <SynchronizedProviderInformation providerName={providerName} />
      )}
      <FormLayout>
        <FormLayout.Section title="Stock & Prix" description={description}>
          <form onSubmit={formik.handleSubmit}>
            <StockFormRow
              Form={renderStockForm()}
              actions={actions}
              actionDisabled={false}
              showStockInfo={
                mode === OFFER_WIZARD_MODE.EDITION && offer.stocks.length > 0
              }
            />

            <ActionBar
              onClickNext={handleNextStep()}
              onClickPrevious={handlePreviousStep}
              onClickSaveDraft={handleNextStep({ saveDraft: true })}
              step={OFFER_WIZARD_STEP_IDS.STOCKS}
              isDisabled={formik.isSubmitting}
              offerId={offer.id}
            />
          </form>
        </FormLayout.Section>
      </FormLayout>
      {formik.dirty && !isClickingFromActionBar && (
        <RouteLeavingGuardOfferIndividual
          saveForm={formik.handleSubmit}
          setIsSubmittingFromRouteLeavingGuard={
            setIsSubmittingFromRouteLeavingGuard
          }
          mode={mode}
          isFormValid={formik.isValid}
          tracking={nextLocation =>
            logEvent?.(Events.CLICKED_OFFER_FORM_NAVIGATION, {
              from: OFFER_WIZARD_STEP_IDS.STOCKS,
              to: logTo(nextLocation),
              used: OFFER_FORM_NAVIGATION_OUT.ROUTE_LEAVING_GUARD,
              isEdition: mode !== OFFER_WIZARD_MODE.CREATION,
              isDraft: mode !== OFFER_WIZARD_MODE.EDITION,
              offerId: offer?.id,
            })
          }
          hasOfferBeenCreated
        />
      )}
    </FormikProvider>
  )
}

export default StocksThing
