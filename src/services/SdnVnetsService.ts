/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SdnVnetsService {
    /**
     * 添加vnet区域
     * 添加vnet区域
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postSdnAddVnet(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            /**
             * 名称
             */
            vnet: string;
            /**
             * 所属上级区域名称
             */
            zone: string;
            /**
             * 别称
             */
            alias?: string | null;
            /**
             * vlan
             */
            tag?: string | null;
            /**
             * 恒定vnet
             */
            type?: string | null;
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/sdn/addVnet',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 查询vnet列表
     * 查询vnet列表
     * @param adminPath
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getSdnGetVnetsByPage(
        adminPath: string,
        page?: number,
        size?: number,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id?: number;
                vnet?: string;
                zone?: string;
                alias?: null;
                tag?: null;
                type?: string;
                state?: string;
            }>;
            total: number;
            size: number;
            current: number;
            orders: Array<string>;
            optimizeCountSql: boolean;
            searchCount: boolean;
            maxLimit: null;
            countId: null;
            pages: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/sdn/getVnetsByPage',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'page': page,
                'size': size,
            },
        });
    }
}
