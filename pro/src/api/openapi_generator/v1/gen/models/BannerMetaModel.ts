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
 * @interface BannerMetaModel
 */
export interface BannerMetaModel {
    /**
     * 
     * @type {string}
     * @memberof BannerMetaModel
     */
    imageCredit?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BannerMetaModel
     */
    originalImageUrl?: string | null;
}

export function BannerMetaModelFromJSON(json: any): BannerMetaModel {
    return BannerMetaModelFromJSONTyped(json, false);
}

export function BannerMetaModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): BannerMetaModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'imageCredit': !exists(json, 'image_credit') ? undefined : json['image_credit'],
        'originalImageUrl': !exists(json, 'original_image_url') ? undefined : json['original_image_url'],
    };
}

export function BannerMetaModelToJSON(value?: BannerMetaModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'image_credit': value.imageCredit,
        'original_image_url': value.originalImageUrl,
    };
}

