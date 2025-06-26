/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type NetWorkParams = {
    /**
     * 网卡名称
     */
    iface: string;
    /**
     * bridge | bond | eth | alias | vlan | OVSBridge | OVSBond | OVSPort | OVSIntPort | unknown
     */
    type: string;
    node?: string;
    address?: string;
    address6?: string;
    autostart?: boolean;
    bondPrimary?: string;
    bondMode?: string;
    bondXmitHashPolicy?: string;
    bridgePorts?: string;
    bridgeVlanAware?: boolean;
    cidr?: string;
    cidr6?: string;
    comments?: string;
    comments6?: string;
    delete?: string;
    gateway?: string;
    gateway6?: string;
    mtu?: number;
    netmask?: string;
    netmask6?: number;
    ovsBonds?: string;
    ovsBridge?: string;
    ovsOptions?: string;
    ovsPorts?: string;
    ovsTag?: number;
    slaves?: string;
    vlanId?: number;
    vlanRawDevice?: string;
};

