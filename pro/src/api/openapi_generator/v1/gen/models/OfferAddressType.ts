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
export const OfferAddressType = {
    OFFERER_VENUE: 'offererVenue' as 'offererVenue',
    SCHOOL: 'school' as 'school',
    OTHER: 'other' as 'other',
    UNKNOWN_DEFAULT_OPEN_API: '11184809' as '11184809'
};
export type OfferAddressType = typeof OfferAddressType[keyof typeof OfferAddressType];


export function OfferAddressTypeFromJSON(json: any): OfferAddressType {
    return OfferAddressTypeFromJSONTyped(json, false);
}

export function OfferAddressTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): OfferAddressType {
    return json as OfferAddressType;
}

export function OfferAddressTypeToJSON(value?: OfferAddressType | null): any {
    return value as any;
}

