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
 * @interface VenueStatsResponseModel
 */
export interface VenueStatsResponseModel {
    /**
     * 
     * @type {number}
     * @memberof VenueStatsResponseModel
     */
    activeBookingsQuantity: number;
    /**
     * 
     * @type {number}
     * @memberof VenueStatsResponseModel
     */
    activeOffersCount: number;
    /**
     * 
     * @type {number}
     * @memberof VenueStatsResponseModel
     */
    soldOutOffersCount: number;
    /**
     * 
     * @type {number}
     * @memberof VenueStatsResponseModel
     */
    validatedBookingsQuantity: number;
}

export function VenueStatsResponseModelFromJSON(json: any): VenueStatsResponseModel {
    return VenueStatsResponseModelFromJSONTyped(json, false);
}

export function VenueStatsResponseModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): VenueStatsResponseModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'activeBookingsQuantity': json['activeBookingsQuantity'],
        'activeOffersCount': json['activeOffersCount'],
        'soldOutOffersCount': json['soldOutOffersCount'],
        'validatedBookingsQuantity': json['validatedBookingsQuantity'],
    };
}

export function VenueStatsResponseModelToJSON(value?: VenueStatsResponseModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'activeBookingsQuantity': value.activeBookingsQuantity,
        'activeOffersCount': value.activeOffersCount,
        'soldOutOffersCount': value.soldOutOffersCount,
        'validatedBookingsQuantity': value.validatedBookingsQuantity,
    };
}

