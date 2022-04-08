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


/**
 * An enumeration.
 * @export
 */
export const OfferStatus = {
    ACTIVE: 'ACTIVE' as 'ACTIVE',
    PENDING: 'PENDING' as 'PENDING',
    EXPIRED: 'EXPIRED' as 'EXPIRED',
    REJECTED: 'REJECTED' as 'REJECTED',
    SOLD_OUT: 'SOLD_OUT' as 'SOLD_OUT',
    INACTIVE: 'INACTIVE' as 'INACTIVE',
    DRAFT: 'DRAFT' as 'DRAFT',
    UNKNOWN_DEFAULT_OPEN_API: '11184809' as '11184809'
};
export type OfferStatus = typeof OfferStatus[keyof typeof OfferStatus];


export function OfferStatusFromJSON(json: any): OfferStatus {
    return OfferStatusFromJSONTyped(json, false);
}

export function OfferStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): OfferStatus {
    return json as OfferStatus;
}

export function OfferStatusToJSON(value?: OfferStatus | null): any {
    return value as any;
}

