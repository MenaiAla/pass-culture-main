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
    GetEducationalOffererResponseModel,
    GetEducationalOffererResponseModelFromJSON,
    GetEducationalOffererResponseModelFromJSONTyped,
    GetEducationalOffererResponseModelToJSON,
} from './GetEducationalOffererResponseModel';

/**
 * 
 * @export
 * @interface GetEducationalOfferersResponseModel
 */
export interface GetEducationalOfferersResponseModel {
    /**
     * 
     * @type {Array<GetEducationalOffererResponseModel>}
     * @memberof GetEducationalOfferersResponseModel
     */
    educationalOfferers: Array<GetEducationalOffererResponseModel>;
}

export function GetEducationalOfferersResponseModelFromJSON(json: any): GetEducationalOfferersResponseModel {
    return GetEducationalOfferersResponseModelFromJSONTyped(json, false);
}

export function GetEducationalOfferersResponseModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetEducationalOfferersResponseModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'educationalOfferers': ((json['educationalOfferers'] as Array<any>).map(GetEducationalOffererResponseModelFromJSON)),
    };
}

export function GetEducationalOfferersResponseModelToJSON(value?: GetEducationalOfferersResponseModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'educationalOfferers': ((value.educationalOfferers as Array<any>).map(GetEducationalOffererResponseModelToJSON)),
    };
}

