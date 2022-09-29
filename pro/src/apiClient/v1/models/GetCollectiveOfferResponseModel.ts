/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CollectiveOfferOfferVenueResponseModel } from './CollectiveOfferOfferVenueResponseModel';
import type { EducationalInstitutionResponseModel } from './EducationalInstitutionResponseModel';
import type { GetCollectiveOfferCollectiveStockResponseModel } from './GetCollectiveOfferCollectiveStockResponseModel';
import type { GetCollectiveOfferVenueResponseModel } from './GetCollectiveOfferVenueResponseModel';
import type { OfferDomain } from './OfferDomain';
import type { OfferStatus } from './OfferStatus';
import type { StudentLevels } from './StudentLevels';
import type { SubcategoryIdEnum } from './SubcategoryIdEnum';

export type GetCollectiveOfferResponseModel = {
  audioDisabilityCompliant?: boolean | null;
  bookingEmails: Array<string>;
  collectiveStock?: GetCollectiveOfferCollectiveStockResponseModel | null;
  contactEmail: string;
  contactPhone: string;
  dateCreated: string;
  description: string;
  domains: Array<OfferDomain>;
  durationMinutes?: number | null;
  hasBookingLimitDatetimesPassed: boolean;
  id: string;
  institution?: EducationalInstitutionResponseModel | null;
  interventionArea: Array<string>;
  isActive: boolean;
  isBookable: boolean;
  isCancellable: boolean;
  isEditable: boolean;
  isVisibilityEditable: boolean;
  mentalDisabilityCompliant?: boolean | null;
  motorDisabilityCompliant?: boolean | null;
  name: string;
  nonHumanizedId: number;
  offerId?: string | null;
  offerVenue: CollectiveOfferOfferVenueResponseModel;
  status: OfferStatus;
  students: Array<StudentLevels>;
  subcategoryId: SubcategoryIdEnum;
  templateId?: string | null;
  venue: GetCollectiveOfferVenueResponseModel;
  venueId: string;
  visualDisabilityCompliant?: boolean | null;
};
