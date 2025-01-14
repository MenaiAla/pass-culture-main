/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { VenueTypeCode } from './VenueTypeCode';

export type GetOffererVenueResponseModel = {
  address?: string | null;
  audioDisabilityCompliant?: boolean | null;
  bookingEmail?: string | null;
  city?: string | null;
  comment?: string | null;
  departementCode?: string | null;
  hasCreatedOffer: boolean;
  hasMissingReimbursementPoint: boolean;
  id: string;
  isVirtual: boolean;
  managingOffererId: string;
  mentalDisabilityCompliant?: boolean | null;
  motorDisabilityCompliant?: boolean | null;
  name: string;
  nonHumanizedId: number;
  postalCode?: string | null;
  publicName?: string | null;
  siret?: string | null;
  venueLabelId?: string | null;
  venueTypeCode?: VenueTypeCode | null;
  visualDisabilityCompliant?: boolean | null;
  withdrawalDetails?: string | null;
};

