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
 * @interface StockResponseModel
 */
export interface StockResponseModel {
    /**
     * 
     * @type {Date}
     * @memberof StockResponseModel
     */
    activationCodesExpirationDatetime?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof StockResponseModel
     */
    beginningDatetime?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof StockResponseModel
     */
    bookingLimitDatetime?: Date | null;
    /**
     * 
     * @type {number}
     * @memberof StockResponseModel
     */
    bookingsQuantity: number;
    /**
     * 
     * @type {Date}
     * @memberof StockResponseModel
     */
    dateCreated: Date;
    /**
     * 
     * @type {Date}
     * @memberof StockResponseModel
     */
    dateModified: Date;
    /**
     * 
     * @type {string}
     * @memberof StockResponseModel
     */
    educationalPriceDetail?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof StockResponseModel
     */
    hasActivationCodes: boolean;
    /**
     * 
     * @type {string}
     * @memberof StockResponseModel
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof StockResponseModel
     */
    isEducationalStockEditable?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof StockResponseModel
     */
    isEventDeletable: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof StockResponseModel
     */
    isEventExpired: boolean;
    /**
     * 
     * @type {number}
     * @memberof StockResponseModel
     */
    numberOfTickets?: number | null;
    /**
     * 
     * @type {string}
     * @memberof StockResponseModel
     */
    offerId: string;
    /**
     * 
     * @type {number}
     * @memberof StockResponseModel
     */
    price: number;
    /**
     * 
     * @type {number}
     * @memberof StockResponseModel
     */
    quantity?: number | null;
}

export function StockResponseModelFromJSON(json: any): StockResponseModel {
    return StockResponseModelFromJSONTyped(json, false);
}

export function StockResponseModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): StockResponseModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'activationCodesExpirationDatetime': !exists(json, 'activationCodesExpirationDatetime') ? undefined : (json['activationCodesExpirationDatetime'] === null ? null : new Date(json['activationCodesExpirationDatetime'])),
        'beginningDatetime': !exists(json, 'beginningDatetime') ? undefined : (json['beginningDatetime'] === null ? null : new Date(json['beginningDatetime'])),
        'bookingLimitDatetime': !exists(json, 'bookingLimitDatetime') ? undefined : (json['bookingLimitDatetime'] === null ? null : new Date(json['bookingLimitDatetime'])),
        'bookingsQuantity': json['bookingsQuantity'],
        'dateCreated': (new Date(json['dateCreated'])),
        'dateModified': (new Date(json['dateModified'])),
        'educationalPriceDetail': !exists(json, 'educationalPriceDetail') ? undefined : json['educationalPriceDetail'],
        'hasActivationCodes': json['hasActivationCodes'],
        'id': json['id'],
        'isEducationalStockEditable': !exists(json, 'isEducationalStockEditable') ? undefined : json['isEducationalStockEditable'],
        'isEventDeletable': json['isEventDeletable'],
        'isEventExpired': json['isEventExpired'],
        'numberOfTickets': !exists(json, 'numberOfTickets') ? undefined : json['numberOfTickets'],
        'offerId': json['offerId'],
        'price': json['price'],
        'quantity': !exists(json, 'quantity') ? undefined : json['quantity'],
    };
}

export function StockResponseModelToJSON(value?: StockResponseModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'activationCodesExpirationDatetime': value.activationCodesExpirationDatetime === undefined ? undefined : (value.activationCodesExpirationDatetime === null ? null : value.activationCodesExpirationDatetime.toISOString()),
        'beginningDatetime': value.beginningDatetime === undefined ? undefined : (value.beginningDatetime === null ? null : value.beginningDatetime.toISOString()),
        'bookingLimitDatetime': value.bookingLimitDatetime === undefined ? undefined : (value.bookingLimitDatetime === null ? null : value.bookingLimitDatetime.toISOString()),
        'bookingsQuantity': value.bookingsQuantity,
        'dateCreated': (value.dateCreated.toISOString()),
        'dateModified': (value.dateModified.toISOString()),
        'educationalPriceDetail': value.educationalPriceDetail,
        'hasActivationCodes': value.hasActivationCodes,
        'id': value.id,
        'isEducationalStockEditable': value.isEducationalStockEditable,
        'isEventDeletable': value.isEventDeletable,
        'isEventExpired': value.isEventExpired,
        'numberOfTickets': value.numberOfTickets,
        'offerId': value.offerId,
        'price': value.price,
        'quantity': value.quantity,
    };
}

