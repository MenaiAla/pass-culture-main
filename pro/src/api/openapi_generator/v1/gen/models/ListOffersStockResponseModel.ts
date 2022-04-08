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
 * @interface ListOffersStockResponseModel
 */
export interface ListOffersStockResponseModel {
    /**
     * 
     * @type {Date}
     * @memberof ListOffersStockResponseModel
     */
    beginningDatetime?: Date | null;
    /**
     * 
     * @type {boolean}
     * @memberof ListOffersStockResponseModel
     */
    hasBookingLimitDatetimePassed: boolean;
    /**
     * 
     * @type {string}
     * @memberof ListOffersStockResponseModel
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ListOffersStockResponseModel
     */
    offerId: string;
    /**
     * 
     * @type {number | string}
     * @memberof ListOffersStockResponseModel
     */
    remainingQuantity: number | string | null;
}

export function ListOffersStockResponseModelFromJSON(json: any): ListOffersStockResponseModel {
    return ListOffersStockResponseModelFromJSONTyped(json, false);
}

export function ListOffersStockResponseModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListOffersStockResponseModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'beginningDatetime': !exists(json, 'beginningDatetime') ? undefined : (json['beginningDatetime'] === null ? null : new Date(json['beginningDatetime'])),
        'hasBookingLimitDatetimePassed': json['hasBookingLimitDatetimePassed'],
        'id': json['id'],
        'offerId': json['offerId'],
        'remainingQuantity': number | stringFromJSON(json['remainingQuantity']),
    };
}

export function ListOffersStockResponseModelToJSON(value?: ListOffersStockResponseModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'beginningDatetime': value.beginningDatetime === undefined ? undefined : (value.beginningDatetime === null ? null : value.beginningDatetime.toISOString()),
        'hasBookingLimitDatetimePassed': value.hasBookingLimitDatetimePassed,
        'id': value.id,
        'offerId': value.offerId,
        'remainingQuantity': number | stringToJSON(value.remainingQuantity),
    };
}

