/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VncService {
    /**
     * 增加vnc控制器节点
     * 增加vnc控制器节点
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postAddVncNode(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            id: number;
            name: string;
            host: string;
            port: number;
            /**
             * 对外公开的域名
             */
            domain: string;
            /**
             * ssl，默认0不开启
             */
            protocol?: number | null;
            /**
             * 是否开启反向代理或者cdn，开启将不带端口
             */
            proxy?: number | null;
            status: number;
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/addVncNode',
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
     * 删除vnc控制器节点
     * 删除vnc控制器节点
     * @param adminPath
     * @param id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static deleteDeleteVncNode(
        adminPath: string,
        id?: number,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/{adminPath}/deleteVncNode',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'id': id,
            },
        });
    }
    /**
     * 修改vnc控制器节点
     * 修改vnc控制器节点
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putUpdateVncNode(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            id: number;
            name: string;
            host: string;
            port: number;
            /**
             * 对外公开的域名
             */
            domain: string;
            /**
             * ssl，默认0不开启
             */
            protocol?: number | null;
            /**
             * 是否开启反向代理或者cdn，开启将不带端口
             */
            proxy?: number | null;
            status: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/{adminPath}/updateVncNode',
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
     * 分页查询vnc控制器节点
     * 分页查询vnc控制器节点
     * @param adminPath
     * @param page 页码
     * @param size 页数据量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getSelectVncNodePage(
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
                name?: string;
                host?: string;
                port?: number;
                domain?: string;
                status?: number;
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
            url: '/{adminPath}/selectVncNodePage',
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
