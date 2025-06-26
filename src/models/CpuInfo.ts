/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CpuInfo = {
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
};

