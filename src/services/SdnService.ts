/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SdnService {
    /**
     * 添加sdn区域
     * 添加sdn区域
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postSdnAddZone(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            /**
             * 节点id
             */
            nodeId: number;
            /**
             * 插件类型 evpn | faucet | qinq | simple | vlan | vxlan
             */
            type: string;
            /**
             * sdn区域标识符
             */
            zone: string;
            /**
             * ipam 使用特定的ipam
             */
            ipam?: string | null;
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/sdn/addZone',
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
     * 根据id删除sdn区域
     * 根据id删除sdn区域
     * @param adminPath
     * @param id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static deleteSdnDeleteZoneById(
        adminPath: string,
        id: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/{adminPath}/sdn/deleteZoneById/{id}',
            path: {
                'adminPath': adminPath,
                'id': id,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 根据标识zone删除sdn区域
     * 根据标识zone删除sdn区域
     * @param adminPath
     * @param zone
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static deleteSdnDeleteZoneByZone(
        adminPath: string,
        zone: string,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: null;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/{adminPath}/sdn/deleteZoneByZone/{zone}',
            path: {
                'adminPath': adminPath,
                'zone': zone,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 查询sdn区域列表
     * 查询sdn区域列表
     * @param adminPath
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getSdnGetZonesByPage(
        adminPath: string,
        page?: number,
        size?: number,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<string>;
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
            url: '/{adminPath}/sdn/getZonesByPage',
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
