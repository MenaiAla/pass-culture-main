/// <reference path="./custom.d.ts" />
// tslint:disable
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * pass Culture pro private API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1
 * 
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */
import url from "url";

// TODO: ModelObject should be removed when offer.extraData is correctly typed on api
import { EmptyResponse, ModelObject, handleGeneratedApiResponse, safeFetch } from "api/helpers";

import { APIConfiguration } from "./configuration";

const BASE_PATH = "/".replace(/\/+$/, "");

export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

export interface FetchAPI {
    (url: string, init?: any): Promise<Response>;
}

export interface FetchArgs {
    url: string;
    options: any;
}

export class BaseAPI {
    protected configuration?: APIConfiguration;
    constructor(configuration?: APIConfiguration, protected basePath: string = BASE_PATH) {
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
};

export class RequiredError extends Error {
    name = "RequiredError"
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}


export enum AwesomEnum {
    Hello = 'hello',
    GoodBy = 'good by'
}
export interface AwesomePropOptional {
}


export interface Awesomepropoptionalunion {
}


export interface Awesomepropunion {
}


export interface BookingStatusFilter {
}


export interface ListBookingsQueryModel {
    awesomeProp: AwesomEnum;
    awesomePropOptional?: AwesomEnum | null;
    awesomePropOptionalUnion?: AwesomEnum | number;
    awesomePropUnion: AwesomEnum | number;
    bookingStatusFilter?: BookingStatusFilter | null;
}


export interface ListBookingsResponseModel {
    total?: number;
}


/**
 * DefaultApi - fetch parameter creator
 * @export
 */
export const DefaultApiFetchParamCreator = function (configuration?: APIConfiguration) {
    return {
        /**
         * 
         * @summary get_bookings_pro <GET>
         * @param {AwesomEnum} awesomeProp 
         * @param {Awesomepropunion} awesomePropUnion 
         * @param {BookingStatusFilter} [bookingStatusFilter] 
         * @param {AwesomePropOptional} [awesomePropOptional] 
         * @param {Awesomepropoptionalunion} [awesomePropOptionalUnion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getBookingsGetBookingsPro(awesomeProp: AwesomEnum, awesomePropUnion: Awesomepropunion, bookingStatusFilter?: BookingStatusFilter, awesomePropOptional?: AwesomePropOptional, awesomePropOptionalUnion?: Awesomepropoptionalunion, options: any = {}): Promise<FetchArgs> {
            // verify required parameter 'awesomeProp' is not null or undefined
            if (awesomeProp === null || awesomeProp === undefined) {
                throw new RequiredError('awesomeProp','Required parameter awesomeProp was null or undefined when calling getBookingsGetBookingsPro.');
            }
            // verify required parameter 'awesomePropUnion' is not null or undefined
            if (awesomePropUnion === null || awesomePropUnion === undefined) {
                throw new RequiredError('awesomePropUnion','Required parameter awesomePropUnion was null or undefined when calling getBookingsGetBookingsPro.');
            }
            const localVarPath = `/bookings/pro`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({
                method: 'GET',
                credentials: 'includes',
            }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            if (bookingStatusFilter !== undefined) {
                localVarQueryParameter['bookingStatusFilter'] = bookingStatusFilter;
            }
            if (awesomeProp !== undefined) {
                localVarQueryParameter['awesomeProp'] = awesomeProp;
            }
            if (awesomePropOptional !== undefined) {
                localVarQueryParameter['awesomePropOptional'] = awesomePropOptional;
            }
            if (awesomePropUnion !== undefined) {
                localVarQueryParameter['awesomePropUnion'] = awesomePropUnion;
            }
            if (awesomePropOptionalUnion !== undefined) {
                localVarQueryParameter['awesomePropOptionalUnion'] = awesomePropOptionalUnion;
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            localVarUrlObj.search = null;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(api: DefaultApi, configuration?: APIConfiguration) {
    return {
        /**
         * 
         * @summary get_bookings_pro <GET>
         * @param {AwesomEnum} awesomeProp 
         * @param {Awesomepropunion} awesomePropUnion 
         * @param {BookingStatusFilter} [bookingStatusFilter] 
         * @param {AwesomePropOptional} [awesomePropOptional] 
         * @param {Awesomepropoptionalunion} [awesomePropOptionalUnion] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getBookingsGetBookingsPro(basePath: string, awesomeProp: AwesomEnum, awesomePropUnion: Awesomepropunion, bookingStatusFilter?: BookingStatusFilter, awesomePropOptional?: AwesomePropOptional, awesomePropOptionalUnion?: Awesomepropoptionalunion, options?: any): Promise<ListBookingsResponseModel> {
            const localVarFetchArgs = await DefaultApiFetchParamCreator(configuration).getBookingsGetBookingsPro(awesomeProp, awesomePropUnion, bookingStatusFilter, awesomePropOptional, awesomePropOptionalUnion, options);
            const response = await safeFetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options)
            return handleGeneratedApiResponse(response)
        },
    }
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @summary get_bookings_pro <GET>
     * @param {AwesomEnum} awesomeProp 
     * @param {Awesomepropunion} awesomePropUnion 
     * @param {BookingStatusFilter} [bookingStatusFilter] 
     * @param {AwesomePropOptional} [awesomePropOptional] 
     * @param {Awesomepropoptionalunion} [awesomePropOptionalUnion] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public async getBookingsGetBookingsPro(awesomeProp: AwesomEnum, awesomePropUnion: Awesomepropunion, bookingStatusFilter?: BookingStatusFilter, awesomePropOptional?: AwesomePropOptional, awesomePropOptionalUnion?: Awesomepropoptionalunion, options?: any) {
        const functionalApi = DefaultApiFp(this, this.configuration)
        return functionalApi.getBookingsGetBookingsPro(this.basePath, awesomeProp, awesomePropUnion, bookingStatusFilter, awesomePropOptional, awesomePropOptionalUnion, options)
    }
}
