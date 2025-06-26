/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ForwardRule = {
    /**
     * 宿主端口
     */
    source_port?: number | null;
    /**
     * 客户端ip
     */
    destination_ip?: string | null;
    /**
     * 客户端端口
     */
    destination_port?: number | null;
    /**
     * tcp或udp
     */
    protocol?: ForwardRule.protocol;
    /**
     * 虚拟机识别id
     */
    vm: string;
};
export namespace ForwardRule {
    /**
     * tcp或udp
     */
    export enum protocol {
        TCP = 'tcp',
        UDP = 'udp',
    }
}

