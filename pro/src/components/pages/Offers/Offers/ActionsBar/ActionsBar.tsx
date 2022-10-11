import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import useNotification from 'components/hooks/useNotification'
import { getOffersCountToDisplay } from 'components/pages/Offers/domain/getOffersCountToDisplay'
import { TSearchFilters } from 'core/Offers/types'
import { Audience } from 'core/shared'
import { ReactComponent as StatusInactiveIcon } from 'icons/ico-status-inactive.svg'
import { ReactComponent as StatusValidatedIcon } from 'icons/ico-status-validated.svg'
import { ReactComponent as TrashFilledIcon } from 'icons/ico-trash-filled.svg'
import ActionsBarSticky from 'new_components/ActionsBarSticky'
import { searchFiltersSelector } from 'store/offers/selectors'
import { Button } from 'ui-kit'
import { ButtonVariant } from 'ui-kit/Button/types'

import { deleteDraftOffersAdapter } from '../adapters/deleteDraftOffers'

import { updateAllCollectiveOffersActiveStatusAdapter } from './adapters/updateAllCollectiveOffersActiveStatusAdapter'
import { updateAllOffersActiveStatusAdapter } from './adapters/updateAllOffersActiveStatusAdapter'
import { updateCollectiveOffersActiveStatusAdapter } from './adapters/updateCollectiveOffersActiveStatusAdapter'
import { updateOffersActiveStatusAdapter } from './adapters/updateOffersActiveStatusAdapter'
import DeactivationConfirmDialog from './ConfirmDialog/DeactivationConfirmDialog'
import DeleteConfirmDialog from './ConfirmDialog/DeleteConfirmDialog'

export interface IActionBarProps {
  areAllOffersSelected: boolean
  clearSelectedOfferIds: () => void
  nbSelectedOffers: number
  refreshOffers: () => void
  selectedOfferIds: string[]
  toggleSelectAllCheckboxes: () => void
  audience: Audience
  canUpdateOffersStatus: (selectedOfferIds: string[]) => boolean
  canDeleteOffers: (selectedOfferIds: string[]) => boolean
}

const getUpdateActiveStatusAdapter = (
  areAllOffersSelected: boolean,
  searchFilters: Partial<TSearchFilters>,
  isActive: boolean,
  nbSelectedOffers: number,
  selectedOfferIds: string[],
  audience: Audience
) => {
  if (areAllOffersSelected) {
    if (audience === Audience.COLLECTIVE) {
      return () =>
        updateAllCollectiveOffersActiveStatusAdapter({
          searchFilters: { ...searchFilters, isActive },
          nbSelectedOffers,
        })
    }

    return () =>
      updateAllOffersActiveStatusAdapter({
        searchFilters: { ...searchFilters, isActive },
        nbSelectedOffers,
      })
  }

  if (audience === Audience.COLLECTIVE) {
    return () =>
      updateCollectiveOffersActiveStatusAdapter({
        ids: selectedOfferIds,
        isActive,
      })
  }

  return () =>
    updateOffersActiveStatusAdapter({ ids: selectedOfferIds, isActive })
}

const ActionsBar = ({
  refreshOffers,
  selectedOfferIds,
  clearSelectedOfferIds,
  toggleSelectAllCheckboxes,
  areAllOffersSelected,
  nbSelectedOffers,
  audience,
  canUpdateOffersStatus,
  canDeleteOffers,
}: IActionBarProps): JSX.Element => {
  const searchFilters = useSelector(searchFiltersSelector)
  const notify = useNotification()

  const handleClose = useCallback(() => {
    clearSelectedOfferIds()
    areAllOffersSelected && toggleSelectAllCheckboxes()
  }, [clearSelectedOfferIds, areAllOffersSelected, toggleSelectAllCheckboxes])

  const handleUpdateOffersStatus = useCallback(
    async (isActivating: boolean) => {
      const adapter = getUpdateActiveStatusAdapter(
        areAllOffersSelected,
        searchFilters,
        isActivating,
        nbSelectedOffers,
        selectedOfferIds,
        audience
      )

      const { isOk, message } = await adapter()
      refreshOffers()

      if (!isOk) {
        notify.error(message)
      }

      areAllOffersSelected ? notify.pending(message) : notify.success(message)
      handleClose()
    },
    [
      searchFilters,
      selectedOfferIds,
      areAllOffersSelected,
      refreshOffers,
      nbSelectedOffers,
      handleClose,
      notify,
    ]
  )

  const handleActivate = useCallback(() => {
    if (canUpdateOffersStatus(selectedOfferIds)) {
      handleUpdateOffersStatus(true)
    } else {
      notify.error(
        'Vous ne pouvez pas publier des brouillons depuis cette liste'
      )
    }
  }, [handleUpdateOffersStatus])

  const handleDeactivate = useCallback(() => {
    handleUpdateOffersStatus(false)
    setIsConfirmDialogOpen(false)
  }, [handleUpdateOffersStatus])

  const computeSelectedOffersLabel = () => {
    if (nbSelectedOffers > 1) {
      return `${getOffersCountToDisplay(nbSelectedOffers)} offres sélectionnées`
    }

    return `${nbSelectedOffers} offre sélectionnée`
  }

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleDelete = useCallback(async () => {
    if (!canDeleteOffers(selectedOfferIds)) {
      notify.error('Seuls les  brouillons peuvent être supprimés')
      return
    }
    const { isOk, message } = await deleteDraftOffersAdapter({
      ids: selectedOfferIds,
    })
    if (!isOk) {
      notify.error(message)
    } else {
      notify.success(message)
      refreshOffers()
    }
    setIsDeleteDialogOpen(false)
  }, [])

  const handleOpenDeleteDialog = () => {
    if (!canDeleteOffers(selectedOfferIds)) {
      notify.error('Seuls les brouillons peuvent être supprimés')
      return
    }
    setIsDeleteDialogOpen(true)
  }
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const Left = () => <span>{computeSelectedOffersLabel()}</span>

  const Right = () => (
    <>
      <Button
        onClick={() => setIsConfirmDialogOpen(true)}
        Icon={StatusInactiveIcon}
      >
        Désactiver
      </Button>
      {audience == Audience.INDIVIDUAL && (
        <Button onClick={() => handleOpenDeleteDialog()} Icon={TrashFilledIcon}>
          Supprimer
        </Button>
      )}
      <Button onClick={handleActivate} Icon={StatusValidatedIcon}>
        Publier
      </Button>
      <Button onClick={handleClose} variant={ButtonVariant.SECONDARY}>
        Annuler
      </Button>
    </>
  )

  return (
    <>
      {isConfirmDialogOpen && (
        <DeactivationConfirmDialog
          areAllOffersSelected={areAllOffersSelected}
          nbSelectedOffers={nbSelectedOffers}
          onConfirm={handleDeactivate}
          onCancel={setIsConfirmDialogOpen}
        />
      )}
      {isDeleteDialogOpen && (
        <DeleteConfirmDialog
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          nbSelectedOffers={nbSelectedOffers}
          handleDelete={handleDelete}
        />
      )}
      <ActionsBarSticky>
        <ActionsBarSticky.Left>
          <Left />
        </ActionsBarSticky.Left>
        <ActionsBarSticky.Right>
          <Right />
        </ActionsBarSticky.Right>
      </ActionsBarSticky>
    </>
  )
}

export default ActionsBar
