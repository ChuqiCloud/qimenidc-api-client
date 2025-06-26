/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type vncNode = {
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
};

