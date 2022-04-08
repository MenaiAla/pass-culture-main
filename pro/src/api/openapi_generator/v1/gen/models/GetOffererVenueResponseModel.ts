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
/**
 * 
 * @export
 * @interface GetOffererVenueResponseModel
 */
export interface GetOffererVenueResponseModel {
    /**
     * 
     * @type {string}
     * @memberof GetOffererVenueResponseModel
     */
    address?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof GetOffererVenueResponseModel
     */
    audioDisabilityCompliant?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof GetOffererVenueResponseModel
     */
    bookingEmail?: string | null;
    /**
     * 
     * @type {number}
     * @memberof GetOffererVenueResponseModel
     */
    businessUnitId?: number | null;
    /**
     * 
     * @type {string}
     * @memberof GetOffererVenueResponseModel
     */
    city?: string | null;
    /**
     * 
     * @type {string}
     * @memberof GetOffererVenueResponseModel
     */
    comment?: string | null;
    /**
     * 
     * @type {string}
     * @memberof GetOffererVenueResponseModel
     */
    departementCode?: string | null;
    /**
     * 
     * @type {string}
     * @memberof GetOffererVenueResponseModel
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof GetOffererVenueResponseModel
     */
    isValidated: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof GetOffererVenueResponseModel
     */
    isVirtual: boolean;
    /**
     * 
     * @type {string}
     * @memberof GetOffererVenueResponseModel
     */
    managingOffererId: string;
    /**
     * 
     * @type {boolean}
     * @memberof GetOffererVenueResponseModel
     */
    mentalDisabilityCompliant?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof GetOffererVenueResponseModel
     */
    motorDisabilityCompliant?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof GetOffererVenueResponseModel
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof GetOffererVenueResponseModel
     */
    postalCode?: string | null;
    /**
     * 
     * @type {string}
     * @memberof GetOffererVenueResponseModel
     */
    publicName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof GetOffererVenueResponseModel
     */
    venueLabelId?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof GetOffererVenueResponseModel
     */
    visualDisabilityCompliant?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof GetOffererVenueResponseModel
     */
    withdrawalDetails?: string | null;
}

export function GetOffererVenueResponseModelFromJSON(json: any): GetOffererVenueResponseModel {
    return GetOffererVenueResponseModelFromJSONTyped(json, false);
}

export function GetOffererVenueResponseModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetOffererVenueResponseModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'address': !exists(json, 'address') ? undefined : json['address'],
        'audioDisabilityCompliant': !exists(json, 'audioDisabilityCompliant') ? undefined : json['audioDisabilityCompliant'],
        'bookingEmail': !exists(json, 'bookingEmail') ? undefined : json['bookingEmail'],
        'businessUnitId': !exists(json, 'businessUnitId') ? undefined : json['businessUnitId'],
        'city': !exists(json, 'city') ? undefined : json['city'],
        'comment': !exists(json, 'comment') ? undefined : json['comment'],
        'departementCode': !exists(json, 'departementCode') ? undefined : json['departementCode'],
        'id': json['id'],
        'isValidated': json['isValidated'],
        'isVirtual': json['isVirtual'],
        'managingOffererId': json['managingOffererId'],
        'mentalDisabilityCompliant': !exists(json, 'mentalDisabilityCompliant') ? undefined : json['mentalDisabilityCompliant'],
        'motorDisabilityCompliant': !exists(json, 'motorDisabilityCompliant') ? undefined : json['motorDisabilityCompliant'],
        'name': json['name'],
        'postalCode': !exists(json, 'postalCode') ? undefined : json['postalCode'],
        'publicName': !exists(json, 'publicName') ? undefined : json['publicName'],
        'venueLabelId': !exists(json, 'venueLabelId') ? undefined : json['venueLabelId'],
        'visualDisabilityCompliant': !exists(json, 'visualDisabilityCompliant') ? undefined : json['visualDisabilityCompliant'],
        'withdrawalDetails': !exists(json, 'withdrawalDetails') ? undefined : json['withdrawalDetails'],
    };
}

export function GetOffererVenueResponseModelToJSON(value?: GetOffererVenueResponseModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'address': value.address,
        'audioDisabilityCompliant': value.audioDisabilityCompliant,
        'bookingEmail': value.bookingEmail,
        'businessUnitId': value.businessUnitId,
        'city': value.city,
        'comment': value.comment,
        'departementCode': value.departementCode,
        'id': value.id,
        'isValidated': value.isValidated,
        'isVirtual': value.isVirtual,
        'managingOffererId': value.managingOffererId,
        'mentalDisabilityCompliant': value.mentalDisabilityCompliant,
        'motorDisabilityCompliant': value.motorDisabilityCompliant,
        'name': value.name,
        'postalCode': value.postalCode,
        'publicName': value.publicName,
        'venueLabelId': value.venueLabelId,
        'visualDisabilityCompliant': value.visualDisabilityCompliant,
        'withdrawalDetails': value.withdrawalDetails,
    };
}

