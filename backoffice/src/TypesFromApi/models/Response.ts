/* tslint:disable */
/* eslint-disable */
/**
 * pass Culture backoffice API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime'
/**
 *
 * @export
 * @interface Response
 */
export interface Response {
  /**
   *
   * @type {object}
   * @memberof Response
   */
  data?: object | null
}

export function ResponseFromJSON(json: any): Response {
  return ResponseFromJSONTyped(json, false)
}

export function ResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Response {
  if (json === undefined || json === null) {
    return json
  }
  return {
    data: !exists(json, 'data') ? undefined : json['data'],
  }
}

export function ResponseToJSON(value?: Response | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    data: value.data,
  }
}