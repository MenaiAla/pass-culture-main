/* istanbul ignore file: DEBT, TO FIX */
import '@testing-library/jest-dom'

import { api } from 'apiClient/api'
import { PatchOfferBodyModel, WithdrawalTypeEnum } from 'apiClient/v1'
import { IOfferIndividualFormValues } from 'components/OfferIndividualForm'
import { AccessiblityEnum } from 'core/shared'

import { updateIndividualOffer } from '..'

describe('updateIndividualOffer', () => {
  it('should sent patPatchOfferBodyModel to api', async () => {
    const durationMinutes = new Date()
    durationMinutes.setHours(2, 20, 0, 0)
    const formValues: IOfferIndividualFormValues = {
      name: 'Test offer',
      description: 'Description for testing offer',
      accessibility: {
        [AccessiblityEnum.AUDIO]: true,
        [AccessiblityEnum.MENTAL]: true,
        [AccessiblityEnum.MOTOR]: true,
        [AccessiblityEnum.VISUAL]: true,
        [AccessiblityEnum.NONE]: false,
      },
      isNational: true,
      isDuo: true,
      venueId: 'AB',
      withdrawalDelay: 12,
      withdrawalDetails: 'withdrawal description',
      withdrawalType: WithdrawalTypeEnum.ON_SITE,
      isEvent: true,
      subCategoryFields: [],
      offererId: 'BB',
      categoryId: 'CA',
      subcategoryId: 'SCA',
      showType: '',
      showSubType: '',
      musicType: '',
      musicSubType: '',
      author: 'John Author',
      isbn: undefined,
      performer: 'John Performer',
      speaker: 'John Speaker',
      stageDirector: 'John Stage Director',
      visa: undefined,
      durationMinutes: durationMinutes,
      receiveNotificationEmails: true,
      bookingEmail: 'test@email.com',
      externalTicketOfficeUrl: 'https://example.com',
      url: '',
    }

    const expectedBody: PatchOfferBodyModel = {
      audioDisabilityCompliant: true,
      mentalDisabilityCompliant: true,
      motorDisabilityCompliant: true,
      visualDisabilityCompliant: true,
      description: 'Description for testing offer',
      extraData: {
        author: 'John Author',
        isbn: undefined,
        musicType: '',
        musicSubType: '',
        performer: 'John Performer',
        showType: '',
        showSubType: '',
        speaker: 'John Speaker',
        stageDirector: 'John Stage Director',
        visa: undefined,
      },
      isNational: true,
      isDuo: true,
      name: 'Test offer',
      url: null,
      venueId: 'AB',
      withdrawalDelay: 12,
      withdrawalDetails: 'withdrawal description',
      withdrawalType: WithdrawalTypeEnum.ON_SITE,
      durationMinutes: 140,
      bookingEmail: 'test@email.com',
      externalTicketOfficeUrl: 'https://example.com',
    }

    const offerId = 'AAAA'
    jest.spyOn(api, 'patchOffer').mockResolvedValue({ id: offerId })

    updateIndividualOffer({ offerId, formValues })
    expect(api.patchOffer).toHaveBeenCalledWith(offerId, expectedBody)
  })
})
