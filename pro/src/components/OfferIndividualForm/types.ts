import { WithdrawalTypeEnum } from 'apiClient/v1'
import { IAccessibiltyFormValues } from 'core/shared'

export interface IOfferIndividualFormValues {
  isEvent?: boolean
  subCategoryFields: string[]
  name: string
  description: string
  offererId: string
  venueId: string
  isNational: boolean
  categoryId: string
  subcategoryId: string
  showType: string
  showSubType: string
  musicType: string
  musicSubType: string
  withdrawalDetails: string
  withdrawalDelay?: number | null
  withdrawalType?: WithdrawalTypeEnum | null
  accessibility: IAccessibiltyFormValues
  author?: string
  isbn?: string
  performer?: string
  ean?: string
  speaker?: string
  stageDirector?: string
  visa?: string
  durationMinutes?: string | null
  receiveNotificationEmails: boolean
  bookingEmail: string
  isDuo: boolean
  externalTicketOfficeUrl: string
  url: string
  isVenueVirtual?: boolean
}
