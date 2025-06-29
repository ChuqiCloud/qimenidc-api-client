/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SdnVnetsSubnetsService {
    /**
     * 添加子网
     * 添加子网
     * @param adminPath
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postSdnAddSubnet(
        adminPath: string,
        requestBody?: {
            /**
             * IP起始地址
             */
            subnet: string;
            /**
             * 子网掩码
             */
            mask: number;
            /**
             * vnet区域
             */
            vnet: string;
            /**
             * 网关
             */
            gateway: string;
            dns?: string | null;
            /**
             * 1开启。默认0
             */
            snat: number;
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/sdn/addSubnet',
            path: {
                'adminPath': adminPath,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 根据vnet查询subnet列表
     * 根据vnet查询subnet列表
     * @param adminPath
     * @param vnet vnet 名
     * @param page
     * @param size
     * @returns any
     * @throws ApiError
     */
    public static getSdnGetSubnets(
        adminPath: string,
        vnet: string,
        page?: number,
        size?: number,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id: number;
                nodeid: null;
                subnet: string;
                type: string;
                vnet: string;
                gateway: string;
                mask: number;
                dns: string;
                snat: number;
                available: null;
                used: null;
                disable: null;
                state: string;
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
            url: '/{adminPath}/sdn/{vnet}/getSubnets',
            path: {
                'adminPath': adminPath,
                'vnet': vnet,
            },
            query: {
                'page': page,
                'size': size,
            },
        });
    }
}
