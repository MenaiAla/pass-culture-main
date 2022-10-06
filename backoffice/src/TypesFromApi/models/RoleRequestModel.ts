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
 * @interface RoleRequestModel
 */
export interface RoleRequestModel {
  /**
   *
   * @type {string}
   * @memberof RoleRequestModel
   */
  name: string
  /**
   *
   * @type {Array<number>}
   * @memberof RoleRequestModel
   */
  permissionIds: Array<number>
}

export function RoleRequestModelFromJSON(json: any): RoleRequestModel {
  return RoleRequestModelFromJSONTyped(json, false)
}

export function RoleRequestModelFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): RoleRequestModel {
  if (json === undefined || json === null) {
    return json
  }
  return {
    name: json['name'],
    permissionIds: json['permissionIds'],
  }
}

export function RoleRequestModelToJSON(value?: RoleRequestModel | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    name: value.name,
    permissionIds: value.permissionIds,
  }
}