/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Subnat = {
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
};

