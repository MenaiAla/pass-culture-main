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
import {
  EligibilitySubscriptionHistoryModel,
  EligibilitySubscriptionHistoryModelFromJSON,
  EligibilitySubscriptionHistoryModelFromJSONTyped,
  EligibilitySubscriptionHistoryModelToJSON,
} from './index'

/**
 *
 * @export
 * @interface GetUserSubscriptionHistoryResponseModel
 */
export interface GetUserSubscriptionHistoryResponseModel {
  /**
   *
   * @type {{ [key: string]: EligibilitySubscriptionHistoryModel; }}
   * @memberof GetUserSubscriptionHistoryResponseModel
   */
  subscriptions: { [key: string]: EligibilitySubscriptionHistoryModel }
}

export function GetUserSubscriptionHistoryResponseModelFromJSON(
  json: any
): GetUserSubscriptionHistoryResponseModel {
  return GetUserSubscriptionHistoryResponseModelFromJSONTyped(json, false)
}

export function GetUserSubscriptionHistoryResponseModelFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): GetUserSubscriptionHistoryResponseModel {
  if (json === undefined || json === null) {
    return json
  }
  return {
    subscriptions: mapValues(
      json['subscriptions'],
      EligibilitySubscriptionHistoryModelFromJSON
    ),
  }
}

export function GetUserSubscriptionHistoryResponseModelToJSON(
  value?: GetUserSubscriptionHistoryResponseModel | null
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    subscriptions: mapValues(
      value.subscriptions,
      EligibilitySubscriptionHistoryModelToJSON
    ),
  }
}