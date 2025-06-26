/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Group = {
    id: number;
    /**
     * 地区名
     */
    name: string;
    /**
     * 父级节点id
     */
    parent?: number | null;
    /**
     * 目录级别，0为顶级，1为子级
     */
    realm: number;
};

