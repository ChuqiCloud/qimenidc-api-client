/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OsService {
    /**
     * 获取在线系统列表
     * 获取在线系统列表
     * @param adminPath 后台路径
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getSelectOsByOnline(
        adminPath: string,
        page?: number,
        size?: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/selectOsByOnline',
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
     * 激活在线OS
     * 激活在线OS到数据库
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postActiveOsByOnline(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            /**
             * 镜像文件全名
             */
            fileName: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/activeOsByOnline',
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
     * 手动新增OS
     * 新增OS
     * @param adminPath 后台路径
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postInsertOs(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            /**
             * 系统名称（别称，可自定义）
             */
            name: string;
            /**
             * 文件全称，带后缀
             */
            fileName: string;
            /**
             * 镜像类型（win，linux）
             */
            type: string;
            /**
             * 镜像架构（默认x86_64）[x86_64,arm64,arm64,armhf,ppc64el,riscv64,s390x,aarch64,armv7l]
             */
            arch?: string | null;
            /**
             * 镜像系统类别名称，type为linux时必须填写[centos,debian,ubuntu,alpine,fedora,opensuse,ubuntukylin,other]
             */
            osType?: string | null;
            /**
             * 添加类型（0=自动下载;1=手动上传），为0时url参数不能为空
             */
            downType: number;
            /**
             * 下载地址（downType为0时禁止为空）
             */
            url?: string | null;
            /**
             * pve节点下储存路径，值为空或default则默认为/home/images
             */
            path?: string | null;
            /**
             * 是否开启cloud-init（0=未开启，1=开启，默认为0）
             */
            cloud?: number | null;
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/insertOs',
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
     * 分页获取已添加OS
     * 分页获取已添加OS
     * @param adminPath
     * @param page 页码
     * @param size 每页数据量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getSelectOsByPage(
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
                fileName?: string;
                type?: string;
                arch?: string;
                osType?: string;
                nodeStatus?: null;
                downType?: number;
                url?: string;
                size?: string;
                path?: string;
                cloud?: number;
                status?: number;
                createTime?: number;
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
            url: '/{adminPath}/selectOsByPage',
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
     * 分页带条件获取已添加os
     * 分页带条件获取已添加os，该接口为模糊匹配
     * @param adminPath
     * @param param 匹配参数
     * @param value 匹配值
     * @param page 页码
     * @param size 每页数据量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getSelectOsByPageAndCondition(
        adminPath: string,
        param: string,
        value: string,
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
                fileName?: string;
                type?: string;
                arch?: string;
                osType?: string;
                nodeStatus?: null;
                downType?: number;
                url?: string;
                size?: string;
                path?: string;
                cloud?: number;
                status?: number;
                createTime?: number;
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
            url: '/{adminPath}/selectOsByPageAndCondition',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'page': page,
                'size': size,
                'param': param,
                'value': value,
            },
        });
    }
    /**
     * 下载镜像
     * 下载指定id镜像到指定节点
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postDownloadOs(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            /**
             * 镜像id
             */
            osId: number;
            /**
             * 节点id
             */
            nodeId: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/downloadOs',
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
     * 删除os
     * 删除os
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static deleteDeleteOs(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            osId: number;
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/{adminPath}/deleteOs',
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
     * 修改os
     * 修改os
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putUpdateOs(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            id: number;
            /**
             * 系统名称（别称）
             */
            name: string;
            /**
             * 镜像文件全名
             */
            fileName: string;
            /**
             * 镜像类型[windows，linux]
             */
            type: string;
            /**
             * 镜像架构【x86_64，aarch64】
             */
            arch: string;
            /**
             * 镜像操作系统【centos,debian,ubuntu,alpine,fedora,opensuse,archlinux等】
             */
            osType: string;
            /**
             * 0=url下载;1=手动上传，该字段禁止修改
             */
            downType: number;
            url: string;
            /**
             * 镜像大小禁止修改
             */
            size: string;
            /**
             * 路径
             */
            path: string;
            /**
             * cloud-init【0=不使用;1=使用】
             */
            cloud: number;
            /**
             * 0:正常 1:停用 2:异常
             */
            status: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/{adminPath}/updateOs',
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
}
