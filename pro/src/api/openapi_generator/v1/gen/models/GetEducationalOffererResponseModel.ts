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
    GetEducationalOffererVenueResponseModel,
    GetEducationalOffererVenueResponseModelFromJSON,
    GetEducationalOffererVenueResponseModelFromJSONTyped,
    GetEducationalOffererVenueResponseModelToJSON,
} from './GetEducationalOffererVenueResponseModel';

/**
 * 
 * @export
 * @interface GetEducationalOffererResponseModel
 */
export interface GetEducationalOffererResponseModel {
    /**
     * 
     * @type {string}
     * @memberof GetEducationalOffererResponseModel
     */
    id: string;
    /**
     * 
     * @type {Array<GetEducationalOffererVenueResponseModel>}
     * @memberof GetEducationalOffererResponseModel
     */
    managedVenues: Array<GetEducationalOffererVenueResponseModel>;
    /**
     * 
     * @type {string}
     * @memberof GetEducationalOffererResponseModel
     */
    name: string;
}

export function GetEducationalOffererResponseModelFromJSON(json: any): GetEducationalOffererResponseModel {
    return GetEducationalOffererResponseModelFromJSONTyped(json, false);
}

export function GetEducationalOffererResponseModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetEducationalOffererResponseModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'managedVenues': ((json['managedVenues'] as Array<any>).map(GetEducationalOffererVenueResponseModelFromJSON)),
        'name': json['name'],
    };
}

export function GetEducationalOffererResponseModelToJSON(value?: GetEducationalOffererResponseModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'managedVenues': ((value.managedVenues as Array<any>).map(GetEducationalOffererVenueResponseModelToJSON)),
        'name': value.name,
    };
}

