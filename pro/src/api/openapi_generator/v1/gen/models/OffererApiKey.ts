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
 * @interface OffererApiKey
 */
export interface OffererApiKey {
    /**
     * 
     * @type {number}
     * @memberof OffererApiKey
     */
    maxAllowed: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof OffererApiKey
     */
    prefixes: Array<string>;
}

export function OffererApiKeyFromJSON(json: any): OffererApiKey {
    return OffererApiKeyFromJSONTyped(json, false);
}

export function OffererApiKeyFromJSONTyped(json: any, ignoreDiscriminator: boolean): OffererApiKey {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'maxAllowed': json['maxAllowed'],
        'prefixes': json['prefixes'],
    };
}

export function OffererApiKeyToJSON(value?: OffererApiKey | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'maxAllowed': value.maxAllowed,
        'prefixes': value.prefixes,
    };
}

