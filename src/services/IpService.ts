/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class IpService {
    /**
     * 根据掩码位批量插入IP
     * 根据掩码位批量插入IP到IP池，并创建IP池
     * @param adminPath 后台路径
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postInsertIpPoolByMask(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            /**
             * 池名
             */
            poolName: string;
            /**
             * 绑定节点ID
             */
            nodeId: number;
            /**
             * ip类型，0:经典，1:nat，2:专用
             */
            ipType?: number | null;
            /**
             * 网关
             */
            gateway: string;
            /**
             * 掩码位，如：24
             */
            mask: number;
            dns1: string;
            dns2: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/insertIpPoolByMask',
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
     * 根据IP范围批量插入IP
     * 根据IP范围批量插入IP到已创建的IP池
     * @param adminPath 后台路径
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postInsertIpPoolByRange(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            /**
             * IP池ID
             */
            poolId: number;
            /**
             * 起始IP
             */
            startIp: string;
            /**
             * 结束IP
             */
            endIp: string;
            /**
             * dns1
             */
            dns1: string;
            /**
             * dns2
             */
            dns2: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/insertIpPoolByRange',
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
     * 分页查询IP池列表
     * 分页查询IP池列表
     * @param adminPath 后台路径
     * @param page 页码
     * @param size 页数据量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getSelectIpPoolList(
        adminPath: string,
        page?: number,
        size?: number,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id: number;
                name: string;
                gateway: string;
                mask: number;
                dns1: string;
                dns2: string;
                available: null;
                used: null;
                disable: null;
                nodeid: number;
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
            url: '/{adminPath}/selectIpPoolList',
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
    /**
     * 查询指定IP池下的IP列表
     * 查询指定IP池下的IP列表
     * @param adminPath 后台路径
     * @param poolid IP池ID
     * @param page 页码
     * @param size 页数量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getSelectIpListByPoolId(
        adminPath: string,
        poolid?: number,
        page?: number,
        size?: number,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id: number;
                nodeId: number;
                vmId: null;
                poolId: number;
                ip: string;
                subnetMask: string;
                gateway: string;
                dns1: string;
                dns2: string;
                status: number;
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
            url: '/{adminPath}/selectIpListByPoolId',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'poolid': poolid,
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * 更新IP池信息
     * 更新IP池信息，支持post请求
     * @param adminPath 后台路径
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putUpdateIpPool(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            id: number;
            name?: string | null;
            gateway?: string | null;
            mask?: number | null;
            dns1?: string | null;
            dns2?: string | null;
            /**
             * 节点ID
             */
            nodeid?: number | null;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/{adminPath}/updateIpPool',
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
     * 修改IP信息
     * 修改IP信息，可多个，支持post请求
     * @param adminPath 后台路径
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putUpdateIp(
        adminPath: string,
        authorization?: string,
        requestBody?: Array<{
            id: number;
            nodeId?: number | null;
            vmId?: number | null;
            poolId?: number | null;
            subnetMask?: string | null;
            gateway?: string | null;
            dns1?: string | null;
            dns2?: string | null;
            /**
             * 0正常1正在使用2停止
             */
            status?: number | null;
        }>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/{adminPath}/updateIp',
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
     * 删除指定IP池
     * 删除指定IP池
     * @param adminPath
     * @param poolId ip池ID
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static deleteDeleteIpPool(
        adminPath: string,
        poolId: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/{adminPath}/deleteIpPool/{poolId}',
            path: {
                'adminPath': adminPath,
                'poolId': poolId,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
}
