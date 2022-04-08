/* tslint:disable */
/* eslint-disable */
/**
 * pass Culture pro private API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';

import {
    CollectiveOfferOfferVenueResponseModel,
    CollectiveOfferOfferVenueResponseModelFromJSON,
    CollectiveOfferOfferVenueResponseModelFromJSONTyped,
    CollectiveOfferOfferVenueResponseModelToJSON,
} from './CollectiveOfferOfferVenueResponseModel';
import {
    GetCollectiveOfferCollectiveStockResponseModel,
    GetCollectiveOfferCollectiveStockResponseModelFromJSON,
    GetCollectiveOfferCollectiveStockResponseModelFromJSONTyped,
    GetCollectiveOfferCollectiveStockResponseModelToJSON,
} from './GetCollectiveOfferCollectiveStockResponseModel';
import {
    GetCollectiveOfferVenueResponseModel,
    GetCollectiveOfferVenueResponseModelFromJSON,
    GetCollectiveOfferVenueResponseModelFromJSONTyped,
    GetCollectiveOfferVenueResponseModelToJSON,
} from './GetCollectiveOfferVenueResponseModel';
import {
    OfferStatus,
    OfferStatusFromJSON,
    OfferStatusFromJSONTyped,
    OfferStatusToJSON,
} from './OfferStatus';
import {
    StudentLevels,
    StudentLevelsFromJSON,
    StudentLevelsFromJSONTyped,
    StudentLevelsToJSON,
} from './StudentLevels';
import {
    SubcategoryIdEnum,
    SubcategoryIdEnumFromJSON,
    SubcategoryIdEnumFromJSONTyped,
    SubcategoryIdEnumToJSON,
} from './SubcategoryIdEnum';

/**
 * 
 * @export
 * @interface GetCollectiveOfferResponseModel
 */
export interface GetCollectiveOfferResponseModel {
    /**
     * 
     * @type {boolean}
     * @memberof GetCollectiveOfferResponseModel
     */
    audioDisabilityCompliant?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof GetCollectiveOfferResponseModel
     */
    bookingEmail?: string | null;
    /**
     * 
     * @type {GetCollectiveOfferCollectiveStockResponseModel}
     * @memberof GetCollectiveOfferResponseModel
     */
    collectiveStock: GetCollectiveOfferCollectiveStockResponseModel;
    /**
     * 
     * @type {string}
     * @memberof GetCollectiveOfferResponseModel
     */
    contactEmail: string;
    /**
     * 
     * @type {string}
     * @memberof GetCollectiveOfferResponseModel
     */
    contactPhone: string;
    /**
     * 
     * @type {Date}
     * @memberof GetCollectiveOfferResponseModel
     */
    dateCreated: Date;
    /**
     * 
     * @type {string}
     * @memberof GetCollectiveOfferResponseModel
     */
    description?: string | null;
    /**
     * 
     * @type {number}
     * @memberof GetCollectiveOfferResponseModel
     */
    durationMinutes?: number | null;
    /**
     * 
     * @type {boolean}
     * @memberof GetCollectiveOfferResponseModel
     */
    hasBookingLimitDatetimesPassed: boolean;
    /**
     * 
     * @type {string}
     * @memberof GetCollectiveOfferResponseModel
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof GetCollectiveOfferResponseModel
     */
    isActive: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof GetCollectiveOfferResponseModel
     */
    isBookable: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof GetCollectiveOfferResponseModel
     */
    mentalDisabilityCompliant?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof GetCollectiveOfferResponseModel
     */
    motorDisabilityCompliant?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof GetCollectiveOfferResponseModel
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof GetCollectiveOfferResponseModel
     */
    nonHumanizedId: number;
    /**
     * 
     * @type {CollectiveOfferOfferVenueResponseModel}
     * @memberof GetCollectiveOfferResponseModel
     */
    offerVenue: CollectiveOfferOfferVenueResponseModel;
    /**
     * 
     * @type {OfferStatus}
     * @memberof GetCollectiveOfferResponseModel
     */
    status: OfferStatus;
    /**
     * 
     * @type {Array<StudentLevels>}
     * @memberof GetCollectiveOfferResponseModel
     */
    students: Array<StudentLevels>;
    /**
     * 
     * @type {SubcategoryIdEnum}
     * @memberof GetCollectiveOfferResponseModel
     */
    subcategoryId: SubcategoryIdEnum;
    /**
     * 
     * @type {GetCollectiveOfferVenueResponseModel}
     * @memberof GetCollectiveOfferResponseModel
     */
    venue: GetCollectiveOfferVenueResponseModel;
    /**
     * 
     * @type {string}
     * @memberof GetCollectiveOfferResponseModel
     */
    venueId: string;
    /**
     * 
     * @type {boolean}
     * @memberof GetCollectiveOfferResponseModel
     */
    visualDisabilityCompliant?: boolean | null;
}

export function GetCollectiveOfferResponseModelFromJSON(json: any): GetCollectiveOfferResponseModel {
    return GetCollectiveOfferResponseModelFromJSONTyped(json, false);
}

export function GetCollectiveOfferResponseModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetCollectiveOfferResponseModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'audioDisabilityCompliant': !exists(json, 'audioDisabilityCompliant') ? undefined : json['audioDisabilityCompliant'],
        'bookingEmail': !exists(json, 'bookingEmail') ? undefined : json['bookingEmail'],
        'collectiveStock': GetCollectiveOfferCollectiveStockResponseModelFromJSON(json['collectiveStock']),
        'contactEmail': json['contactEmail'],
        'contactPhone': json['contactPhone'],
        'dateCreated': (new Date(json['dateCreated'])),
        'description': !exists(json, 'description') ? undefined : json['description'],
        'durationMinutes': !exists(json, 'durationMinutes') ? undefined : json['durationMinutes'],
        'hasBookingLimitDatetimesPassed': json['hasBookingLimitDatetimesPassed'],
        'id': json['id'],
        'isActive': json['isActive'],
        'isBookable': json['isBookable'],
        'mentalDisabilityCompliant': !exists(json, 'mentalDisabilityCompliant') ? undefined : json['mentalDisabilityCompliant'],
        'motorDisabilityCompliant': !exists(json, 'motorDisabilityCompliant') ? undefined : json['motorDisabilityCompliant'],
        'name': json['name'],
        'nonHumanizedId': json['nonHumanizedId'],
        'offerVenue': CollectiveOfferOfferVenueResponseModelFromJSON(json['offerVenue']),
        'status': OfferStatusFromJSON(json['status']),
        'students': ((json['students'] as Array<any>).map(StudentLevelsFromJSON)),
        'subcategoryId': SubcategoryIdEnumFromJSON(json['subcategoryId']),
        'venue': GetCollectiveOfferVenueResponseModelFromJSON(json['venue']),
        'venueId': json['venueId'],
        'visualDisabilityCompliant': !exists(json, 'visualDisabilityCompliant') ? undefined : json['visualDisabilityCompliant'],
    };
}

export function GetCollectiveOfferResponseModelToJSON(value?: GetCollectiveOfferResponseModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'audioDisabilityCompliant': value.audioDisabilityCompliant,
        'bookingEmail': value.bookingEmail,
        'collectiveStock': GetCollectiveOfferCollectiveStockResponseModelToJSON(value.collectiveStock),
        'contactEmail': value.contactEmail,
        'contactPhone': value.contactPhone,
        'dateCreated': (value.dateCreated.toISOString()),
        'description': value.description,
        'durationMinutes': value.durationMinutes,
        'hasBookingLimitDatetimesPassed': value.hasBookingLimitDatetimesPassed,
        'id': value.id,
        'isActive': value.isActive,
        'isBookable': value.isBookable,
        'mentalDisabilityCompliant': value.mentalDisabilityCompliant,
        'motorDisabilityCompliant': value.motorDisabilityCompliant,
        'name': value.name,
        'nonHumanizedId': value.nonHumanizedId,
        'offerVenue': CollectiveOfferOfferVenueResponseModelToJSON(value.offerVenue),
        'status': OfferStatusToJSON(value.status),
        'students': ((value.students as Array<any>).map(StudentLevelsToJSON)),
        'subcategoryId': SubcategoryIdEnumToJSON(value.subcategoryId),
        'venue': GetCollectiveOfferVenueResponseModelToJSON(value.venue),
        'venueId': value.venueId,
        'visualDisabilityCompliant': value.visualDisabilityCompliant,
    };
}

