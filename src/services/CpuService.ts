/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CpuService {
    /**
     * 新增cpu信息模型
     * 新增cpu信息模型
     * @param adminPath
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postAddCpuInfo(
        adminPath: string,
        requestBody?: {
            /**
             * cpu名称
             */
            name?: string | null;
            /**
             * CPU系列
             */
            family?: number | null;
            /**
             * 型号
             */
            model?: number | null;
            /**
             * 步进
             */
            stepping?: number | null;
            /**
             * CPU型号
             */
            level?: string | null;
            /**
             * CPU扩展型号
             */
            xlevel?: string | null;
            /**
             * 厂商
             */
            vendor?: string | null;
            /**
             * 三缓
             */
            l3Cache?: boolean | null;
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/addCpuInfo',
            path: {
                'adminPath': adminPath,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 删除cpu信息模型
     * 删除cpu信息模型
     * @param adminPath
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static deleteDeleteCpuInfo(
        adminPath: string,
        requestBody?: {
            id?: number | null;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/{adminPath}/deleteCpuInfo',
            path: {
                'adminPath': adminPath,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 修改cpu信息模型
     * 修改cpu信息模型
     * @param adminPath
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putUpdateCpuInfo(
        adminPath: string,
        requestBody?: {
            id: number;
            /**
             * cpu名称
             */
            name?: string | null;
            /**
             * CPU系列
             */
            family?: number | null;
            /**
             * 型号
             */
            model?: number | null;
            /**
             * 步进
             */
            stepping?: number | null;
            /**
             * CPU型号
             */
            level?: string | null;
            /**
             * CPU扩展型号
             */
            xlevel?: string | null;
            /**
             * 厂商
             */
            vendor?: string | null;
            /**
             * 三缓
             */
            l3Cache?: boolean | null;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/{adminPath}/updateCpuInfo',
            path: {
                'adminPath': adminPath,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 查询cpu信息模型
     * 查询cpu信息模型
     * @param adminPath
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static getSelectCpuInfo(
        adminPath: string,
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/selectCpuInfo',
            path: {
                'adminPath': adminPath,
            },
            query: {
                'id': id,
            },
        });
    }
    /**
     * 分页查询cpu信息模型
     * 分页查询cpu信息模型
     * @param adminPath
     * @param page
     * @param limit
     * @returns any
     * @throws ApiError
     */
    public static getSelectCpuInfoPage(
        adminPath: string,
        page?: number,
        limit?: number,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id?: number;
                cpu?: null;
                name?: string;
                family?: number;
                model?: number;
                stepping?: number;
                level?: string;
                xlevel?: string;
                vendor?: string;
                l3Cache?: boolean;
                other?: null;
                createDate?: number;
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
            url: '/{adminPath}/selectCpuInfoPage',
            path: {
                'adminPath': adminPath,
            },
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
}
