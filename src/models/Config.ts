/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Config = {
    id: number;
    token: string;
    /**
     * 全局Linux系统盘大小
     */
    linuxSystemDiskSize: number;
    /**
     * 全局Windows系统盘大小
     */
    winSystemDiskSize: number;
    /**
     * 迁移备份等系统类操作I/O限制(单位:KB/s)
     */
    bwlimit: number;
    /**
     * vnc过期时间(单位:分钟)
     */
    vncTime: number;
    /**
     * 正式版号
     */
    version: string;
    /**
     * 内部构建号
     */
    build: string;
};

