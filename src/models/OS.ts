/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type OS = {
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
};

