/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ZonesParams = {
    /**
     * 节点id
     */
    nodeId: number;
    /**
     * 插件类型 evpn | faucet | qinq | simple | vlan | vxlan
     */
    type: string;
    /**
     * sdn区域标识符
     */
    zone: string;
    /**
     * ipam 使用特定的ipam
     */
    ipam?: string | null;
};

