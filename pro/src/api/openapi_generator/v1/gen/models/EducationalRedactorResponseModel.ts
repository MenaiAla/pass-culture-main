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
 * @interface EducationalRedactorResponseModel
 */
export interface EducationalRedactorResponseModel {
    /**
     * 
     * @type {string}
     * @memberof EducationalRedactorResponseModel
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof EducationalRedactorResponseModel
     */
    firstname: string;
    /**
     * 
     * @type {string}
     * @memberof EducationalRedactorResponseModel
     */
    lastname: string;
    /**
     * 
     * @type {string}
     * @memberof EducationalRedactorResponseModel
     */
    phonenumber?: string | null;
}

export function EducationalRedactorResponseModelFromJSON(json: any): EducationalRedactorResponseModel {
    return EducationalRedactorResponseModelFromJSONTyped(json, false);
}

export function EducationalRedactorResponseModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): EducationalRedactorResponseModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'firstname': json['firstname'],
        'lastname': json['lastname'],
        'phonenumber': !exists(json, 'phonenumber') ? undefined : json['phonenumber'],
    };
}

export function EducationalRedactorResponseModelToJSON(value?: EducationalRedactorResponseModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'firstname': value.firstname,
        'lastname': value.lastname,
        'phonenumber': value.phonenumber,
    };
}

