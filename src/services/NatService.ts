/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NatService {
    /**
     * PVE主控创建NAT
     * 添加PVE主控集群节点
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postAdminAddNodeMasterNat(
        authorization?: string,
        requestBody?: {
            /**
             * 名称
             */
            name?: string | null;
            /**
             * 地区id
             */
            area?: number | null;
            /**
             * 地址
             */
            host: string;
            /**
             * 端口
             */
            port: number;
            /**
             * 用户名
             */
            username: string;
            /**
             * 密码
             */
            password: string;
            /**
             * 权限，默认pam
             */
            realm?: string | null;
            /**
             * 指定节点名，默认pve
             */
            nodeName?: string | null;
            /**
             * ssh端口
             */
            sshPort: string;
            /**
             * ssh登录账号
             */
            sshUsername: string;
            /**
             * ssh登录密码
             */
            sshPassword: string;
            /**
             * 0正常1停止
             */
            status?: string | null;
            /**
             * 被控端口，默认7600
             */
            controllerPort?: number | null;
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/addNodeMasterNat',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 添加虚拟机NAT规则
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postNatAdd(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            source_port: number;
            destination_ip: string;
            destination_port: number;
            protocol: string;
            vm: string;
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            total: number;
            current: number;
            pages: number;
            size: number;
            records: Array<{
                vmhost?: {
                    id: number;
                    nodeid: number;
                    vmid: number;
                    name: string;
                    sockets: number;
                    cores: number;
                    threads: number;
                    devirtualization: boolean;
                    kvm: boolean;
                    cpuModel: null;
                    modelGroup: null;
                    cpu: string;
                    cpuUnits: number;
                    args: null;
                    arch: string;
                    acpi: number;
                    memory: number;
                    swap: null;
                    agent: number;
                    ide0: null;
                    ide2: string;
                    net0: string;
                    net1: null;
                    os: string;
                    osType: string;
                    iso: null;
                    template: null;
                    onBoot: number;
                    bandwidth: number;
                    storage: string;
                    systemDiskSize: number;
                    dataDisk: {
                        '1': number;
                    };
                    bridge: string;
                    ipConfig: {
                        '1': string;
                    };
                    nested: number;
                    task: {
                        '1692783654292': number;
                        '1692783654310': number;
                        '1692783693695': number;
                        '1692783694983': number;
                        '1692783695855': number;
                        '1692783696541': number;
                    };
                    status: number;
                    createTime: number;
                    expirationTime: number;
                };
                current?: {
                    data: {
                        'running-qemu': string;
                        name: string;
                        mem: number;
                        disk: number;
                        pid: number;
                        status: string;
                        diskread: number;
                        'proxmox-support': {
                            'pbs-dirty-bitmap-savevm': boolean;
                            'pbs-masterkey': boolean;
                            'query-bitmap-info': boolean;
                            'pbs-dirty-bitmap': boolean;
                            'pbs-dirty-bitmap-migration': boolean;
                            'pbs-library-version': string;
                        };
                        agent: number;
                        nics: {
                            tap103i0: {
                                netout: number;
                                netin: number;
                            };
                        };
                        cpu: number;
                        maxdisk: number;
                        freemem: number;
                        qmpstatus: string;
                        diskwrite: number;
                        blockstat: {
                            scsi1: {
                                account_invalid: boolean;
                                wr_operations: number;
                                rd_merged: number;
                                unmap_total_time_ns: number;
                                unmap_bytes: number;
                                unmap_merged: number;
                                rd_total_time_ns: number;
                                wr_bytes: number;
                                timed_stats: Array<string>;
                                failed_unmap_operations: number;
                                failed_flush_operations: number;
                                idle_time_ns: number;
                                invalid_wr_operations: number;
                                unmap_operations: number;
                                invalid_unmap_operations: number;
                                flush_total_time_ns: number;
                                failed_rd_operations: number;
                                wr_highest_offset: number;
                                rd_operations: number;
                                account_failed: boolean;
                                wr_merged: number;
                                invalid_flush_operations: number;
                                failed_wr_operations: number;
                                flush_operations: number;
                                invalid_rd_operations: number;
                                wr_total_time_ns: number;
                                rd_bytes: number;
                            };
                            ide2: {
                                unmap_bytes: number;
                                unmap_total_time_ns: number;
                                rd_merged: number;
                                account_invalid: boolean;
                                wr_operations: number;
                                unmap_operations: number;
                                invalid_wr_operations: number;
                                failed_flush_operations: number;
                                failed_unmap_operations: number;
                                idle_time_ns: number;
                                timed_stats: Array<string>;
                                wr_bytes: number;
                                rd_total_time_ns: number;
                                unmap_merged: number;
                                invalid_flush_operations: number;
                                wr_merged: number;
                                account_failed: boolean;
                                rd_operations: number;
                                wr_highest_offset: number;
                                failed_rd_operations: number;
                                flush_total_time_ns: number;
                                invalid_unmap_operations: number;
                                wr_total_time_ns: number;
                                rd_bytes: number;
                                invalid_rd_operations: number;
                                flush_operations: number;
                                failed_wr_operations: number;
                            };
                            scsi0: {
                                unmap_merged: number;
                                rd_total_time_ns: number;
                                wr_bytes: number;
                                failed_unmap_operations: number;
                                failed_flush_operations: number;
                                idle_time_ns: number;
                                timed_stats: Array<string>;
                                unmap_operations: number;
                                invalid_wr_operations: number;
                                account_invalid: boolean;
                                wr_operations: number;
                                rd_merged: number;
                                unmap_total_time_ns: number;
                                unmap_bytes: number;
                                failed_wr_operations: number;
                                flush_operations: number;
                                invalid_rd_operations: number;
                                wr_total_time_ns: number;
                                rd_bytes: number;
                                flush_total_time_ns: number;
                                invalid_unmap_operations: number;
                                wr_highest_offset: number;
                                failed_rd_operations: number;
                                rd_operations: number;
                                invalid_flush_operations: number;
                                wr_merged: number;
                                account_failed: boolean;
                            };
                        };
                        ballooninfo: {
                            total_mem: number;
                            free_mem: number;
                            last_update: number;
                            major_page_faults: number;
                            minor_page_faults: number;
                            actual: number;
                            max_mem: number;
                            mem_swapped_out: number;
                            mem_swapped_in: number;
                        };
                        uptime: number;
                        vmid: number;
                        netin: number;
                        cpus: number;
                        maxmem: number;
                        netout: number;
                        ha: {
                            managed: number;
                        };
                        balloon: number;
                        'running-machine': string;
                    };
                };
                rrddata?: null;
            }>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/nat/add',
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
     * 删除虚拟机NAT规则
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postNatDel(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            source_port: number;
            destination_ip: string;
            destination_port: number;
            protocol: string;
            vm: string;
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            total: number;
            current: number;
            pages: number;
            size: number;
            records: Array<{
                vmhost?: {
                    id: number;
                    nodeid: number;
                    vmid: number;
                    name: string;
                    sockets: number;
                    cores: number;
                    threads: number;
                    devirtualization: boolean;
                    kvm: boolean;
                    cpuModel: null;
                    modelGroup: null;
                    cpu: string;
                    cpuUnits: number;
                    args: null;
                    arch: string;
                    acpi: number;
                    memory: number;
                    swap: null;
                    agent: number;
                    ide0: null;
                    ide2: string;
                    net0: string;
                    net1: null;
                    os: string;
                    osType: string;
                    iso: null;
                    template: null;
                    onBoot: number;
                    bandwidth: number;
                    storage: string;
                    systemDiskSize: number;
                    dataDisk: {
                        '1': number;
                    };
                    bridge: string;
                    ipConfig: {
                        '1': string;
                    };
                    nested: number;
                    task: {
                        '1692783654292': number;
                        '1692783654310': number;
                        '1692783693695': number;
                        '1692783694983': number;
                        '1692783695855': number;
                        '1692783696541': number;
                    };
                    status: number;
                    createTime: number;
                    expirationTime: number;
                };
                current?: {
                    data: {
                        'running-qemu': string;
                        name: string;
                        mem: number;
                        disk: number;
                        pid: number;
                        status: string;
                        diskread: number;
                        'proxmox-support': {
                            'pbs-dirty-bitmap-savevm': boolean;
                            'pbs-masterkey': boolean;
                            'query-bitmap-info': boolean;
                            'pbs-dirty-bitmap': boolean;
                            'pbs-dirty-bitmap-migration': boolean;
                            'pbs-library-version': string;
                        };
                        agent: number;
                        nics: {
                            tap103i0: {
                                netout: number;
                                netin: number;
                            };
                        };
                        cpu: number;
                        maxdisk: number;
                        freemem: number;
                        qmpstatus: string;
                        diskwrite: number;
                        blockstat: {
                            scsi1: {
                                account_invalid: boolean;
                                wr_operations: number;
                                rd_merged: number;
                                unmap_total_time_ns: number;
                                unmap_bytes: number;
                                unmap_merged: number;
                                rd_total_time_ns: number;
                                wr_bytes: number;
                                timed_stats: Array<string>;
                                failed_unmap_operations: number;
                                failed_flush_operations: number;
                                idle_time_ns: number;
                                invalid_wr_operations: number;
                                unmap_operations: number;
                                invalid_unmap_operations: number;
                                flush_total_time_ns: number;
                                failed_rd_operations: number;
                                wr_highest_offset: number;
                                rd_operations: number;
                                account_failed: boolean;
                                wr_merged: number;
                                invalid_flush_operations: number;
                                failed_wr_operations: number;
                                flush_operations: number;
                                invalid_rd_operations: number;
                                wr_total_time_ns: number;
                                rd_bytes: number;
                            };
                            ide2: {
                                unmap_bytes: number;
                                unmap_total_time_ns: number;
                                rd_merged: number;
                                account_invalid: boolean;
                                wr_operations: number;
                                unmap_operations: number;
                                invalid_wr_operations: number;
                                failed_flush_operations: number;
                                failed_unmap_operations: number;
                                idle_time_ns: number;
                                timed_stats: Array<string>;
                                wr_bytes: number;
                                rd_total_time_ns: number;
                                unmap_merged: number;
                                invalid_flush_operations: number;
                                wr_merged: number;
                                account_failed: boolean;
                                rd_operations: number;
                                wr_highest_offset: number;
                                failed_rd_operations: number;
                                flush_total_time_ns: number;
                                invalid_unmap_operations: number;
                                wr_total_time_ns: number;
                                rd_bytes: number;
                                invalid_rd_operations: number;
                                flush_operations: number;
                                failed_wr_operations: number;
                            };
                            scsi0: {
                                unmap_merged: number;
                                rd_total_time_ns: number;
                                wr_bytes: number;
                                failed_unmap_operations: number;
                                failed_flush_operations: number;
                                idle_time_ns: number;
                                timed_stats: Array<string>;
                                unmap_operations: number;
                                invalid_wr_operations: number;
                                account_invalid: boolean;
                                wr_operations: number;
                                rd_merged: number;
                                unmap_total_time_ns: number;
                                unmap_bytes: number;
                                failed_wr_operations: number;
                                flush_operations: number;
                                invalid_rd_operations: number;
                                wr_total_time_ns: number;
                                rd_bytes: number;
                                flush_total_time_ns: number;
                                invalid_unmap_operations: number;
                                wr_highest_offset: number;
                                failed_rd_operations: number;
                                rd_operations: number;
                                invalid_flush_operations: number;
                                wr_merged: number;
                                account_failed: boolean;
                            };
                        };
                        ballooninfo: {
                            total_mem: number;
                            free_mem: number;
                            last_update: number;
                            major_page_faults: number;
                            minor_page_faults: number;
                            actual: number;
                            max_mem: number;
                            mem_swapped_out: number;
                            mem_swapped_in: number;
                        };
                        uptime: number;
                        vmid: number;
                        netin: number;
                        cpus: number;
                        maxmem: number;
                        netout: number;
                        ha: {
                            managed: number;
                        };
                        balloon: number;
                        'running-machine': string;
                    };
                };
                rrddata?: null;
            }>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/nat/del',
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
     * 获取虚拟机NAT规则
     * @param adminPath
     * @param page
     * @param size
     * @param hostId
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getNatGetVm(
        adminPath: string,
        page?: number,
        size?: number,
        hostId?: number,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            total: number;
            current: number;
            pages: number;
            size: number;
            records: Array<{
                vmhost?: {
                    id: number;
                    nodeid: number;
                    vmid: number;
                    name: string;
                    sockets: number;
                    cores: number;
                    threads: number;
                    devirtualization: boolean;
                    kvm: boolean;
                    cpuModel: null;
                    modelGroup: null;
                    cpu: string;
                    cpuUnits: number;
                    args: null;
                    arch: string;
                    acpi: number;
                    memory: number;
                    swap: null;
                    agent: number;
                    ide0: null;
                    ide2: string;
                    net0: string;
                    net1: null;
                    os: string;
                    osType: string;
                    iso: null;
                    template: null;
                    onBoot: number;
                    bandwidth: number;
                    storage: string;
                    systemDiskSize: number;
                    dataDisk: {
                        '1': number;
                    };
                    bridge: string;
                    ipConfig: {
                        '1': string;
                    };
                    nested: number;
                    task: {
                        '1692783654292': number;
                        '1692783654310': number;
                        '1692783693695': number;
                        '1692783694983': number;
                        '1692783695855': number;
                        '1692783696541': number;
                    };
                    status: number;
                    createTime: number;
                    expirationTime: number;
                };
                current?: {
                    data: {
                        'running-qemu': string;
                        name: string;
                        mem: number;
                        disk: number;
                        pid: number;
                        status: string;
                        diskread: number;
                        'proxmox-support': {
                            'pbs-dirty-bitmap-savevm': boolean;
                            'pbs-masterkey': boolean;
                            'query-bitmap-info': boolean;
                            'pbs-dirty-bitmap': boolean;
                            'pbs-dirty-bitmap-migration': boolean;
                            'pbs-library-version': string;
                        };
                        agent: number;
                        nics: {
                            tap103i0: {
                                netout: number;
                                netin: number;
                            };
                        };
                        cpu: number;
                        maxdisk: number;
                        freemem: number;
                        qmpstatus: string;
                        diskwrite: number;
                        blockstat: {
                            scsi1: {
                                account_invalid: boolean;
                                wr_operations: number;
                                rd_merged: number;
                                unmap_total_time_ns: number;
                                unmap_bytes: number;
                                unmap_merged: number;
                                rd_total_time_ns: number;
                                wr_bytes: number;
                                timed_stats: Array<string>;
                                failed_unmap_operations: number;
                                failed_flush_operations: number;
                                idle_time_ns: number;
                                invalid_wr_operations: number;
                                unmap_operations: number;
                                invalid_unmap_operations: number;
                                flush_total_time_ns: number;
                                failed_rd_operations: number;
                                wr_highest_offset: number;
                                rd_operations: number;
                                account_failed: boolean;
                                wr_merged: number;
                                invalid_flush_operations: number;
                                failed_wr_operations: number;
                                flush_operations: number;
                                invalid_rd_operations: number;
                                wr_total_time_ns: number;
                                rd_bytes: number;
                            };
                            ide2: {
                                unmap_bytes: number;
                                unmap_total_time_ns: number;
                                rd_merged: number;
                                account_invalid: boolean;
                                wr_operations: number;
                                unmap_operations: number;
                                invalid_wr_operations: number;
                                failed_flush_operations: number;
                                failed_unmap_operations: number;
                                idle_time_ns: number;
                                timed_stats: Array<string>;
                                wr_bytes: number;
                                rd_total_time_ns: number;
                                unmap_merged: number;
                                invalid_flush_operations: number;
                                wr_merged: number;
                                account_failed: boolean;
                                rd_operations: number;
                                wr_highest_offset: number;
                                failed_rd_operations: number;
                                flush_total_time_ns: number;
                                invalid_unmap_operations: number;
                                wr_total_time_ns: number;
                                rd_bytes: number;
                                invalid_rd_operations: number;
                                flush_operations: number;
                                failed_wr_operations: number;
                            };
                            scsi0: {
                                unmap_merged: number;
                                rd_total_time_ns: number;
                                wr_bytes: number;
                                failed_unmap_operations: number;
                                failed_flush_operations: number;
                                idle_time_ns: number;
                                timed_stats: Array<string>;
                                unmap_operations: number;
                                invalid_wr_operations: number;
                                account_invalid: boolean;
                                wr_operations: number;
                                rd_merged: number;
                                unmap_total_time_ns: number;
                                unmap_bytes: number;
                                failed_wr_operations: number;
                                flush_operations: number;
                                invalid_rd_operations: number;
                                wr_total_time_ns: number;
                                rd_bytes: number;
                                flush_total_time_ns: number;
                                invalid_unmap_operations: number;
                                wr_highest_offset: number;
                                failed_rd_operations: number;
                                rd_operations: number;
                                invalid_flush_operations: number;
                                wr_merged: number;
                                account_failed: boolean;
                            };
                        };
                        ballooninfo: {
                            total_mem: number;
                            free_mem: number;
                            last_update: number;
                            major_page_faults: number;
                            minor_page_faults: number;
                            actual: number;
                            max_mem: number;
                            mem_swapped_out: number;
                            mem_swapped_in: number;
                        };
                        uptime: number;
                        vmid: number;
                        netin: number;
                        cpus: number;
                        maxmem: number;
                        netout: number;
                        ha: {
                            managed: number;
                        };
                        balloon: number;
                        'running-machine': string;
                    };
                };
                rrddata?: null;
            }>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/nat/getVm',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'page': page,
                'size': size,
                'hostId': hostId,
            },
        });
    }
    /**
     * 获取虚拟机NAT相关信息
     * @param adminPath
     * @param hostId
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getNatGetInfo(
        adminPath: string,
        hostId?: number,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            total: number;
            current: number;
            pages: number;
            size: number;
            records: Array<{
                vmhost?: {
                    id: number;
                    nodeid: number;
                    vmid: number;
                    name: string;
                    sockets: number;
                    cores: number;
                    threads: number;
                    devirtualization: boolean;
                    kvm: boolean;
                    cpuModel: null;
                    modelGroup: null;
                    cpu: string;
                    cpuUnits: number;
                    args: null;
                    arch: string;
                    acpi: number;
                    memory: number;
                    swap: null;
                    agent: number;
                    ide0: null;
                    ide2: string;
                    net0: string;
                    net1: null;
                    os: string;
                    osType: string;
                    iso: null;
                    template: null;
                    onBoot: number;
                    bandwidth: number;
                    storage: string;
                    systemDiskSize: number;
                    dataDisk: {
                        '1': number;
                    };
                    bridge: string;
                    ipConfig: {
                        '1': string;
                    };
                    nested: number;
                    task: {
                        '1692783654292': number;
                        '1692783654310': number;
                        '1692783693695': number;
                        '1692783694983': number;
                        '1692783695855': number;
                        '1692783696541': number;
                    };
                    status: number;
                    createTime: number;
                    expirationTime: number;
                };
                current?: {
                    data: {
                        'running-qemu': string;
                        name: string;
                        mem: number;
                        disk: number;
                        pid: number;
                        status: string;
                        diskread: number;
                        'proxmox-support': {
                            'pbs-dirty-bitmap-savevm': boolean;
                            'pbs-masterkey': boolean;
                            'query-bitmap-info': boolean;
                            'pbs-dirty-bitmap': boolean;
                            'pbs-dirty-bitmap-migration': boolean;
                            'pbs-library-version': string;
                        };
                        agent: number;
                        nics: {
                            tap103i0: {
                                netout: number;
                                netin: number;
                            };
                        };
                        cpu: number;
                        maxdisk: number;
                        freemem: number;
                        qmpstatus: string;
                        diskwrite: number;
                        blockstat: {
                            scsi1: {
                                account_invalid: boolean;
                                wr_operations: number;
                                rd_merged: number;
                                unmap_total_time_ns: number;
                                unmap_bytes: number;
                                unmap_merged: number;
                                rd_total_time_ns: number;
                                wr_bytes: number;
                                timed_stats: Array<string>;
                                failed_unmap_operations: number;
                                failed_flush_operations: number;
                                idle_time_ns: number;
                                invalid_wr_operations: number;
                                unmap_operations: number;
                                invalid_unmap_operations: number;
                                flush_total_time_ns: number;
                                failed_rd_operations: number;
                                wr_highest_offset: number;
                                rd_operations: number;
                                account_failed: boolean;
                                wr_merged: number;
                                invalid_flush_operations: number;
                                failed_wr_operations: number;
                                flush_operations: number;
                                invalid_rd_operations: number;
                                wr_total_time_ns: number;
                                rd_bytes: number;
                            };
                            ide2: {
                                unmap_bytes: number;
                                unmap_total_time_ns: number;
                                rd_merged: number;
                                account_invalid: boolean;
                                wr_operations: number;
                                unmap_operations: number;
                                invalid_wr_operations: number;
                                failed_flush_operations: number;
                                failed_unmap_operations: number;
                                idle_time_ns: number;
                                timed_stats: Array<string>;
                                wr_bytes: number;
                                rd_total_time_ns: number;
                                unmap_merged: number;
                                invalid_flush_operations: number;
                                wr_merged: number;
                                account_failed: boolean;
                                rd_operations: number;
                                wr_highest_offset: number;
                                failed_rd_operations: number;
                                flush_total_time_ns: number;
                                invalid_unmap_operations: number;
                                wr_total_time_ns: number;
                                rd_bytes: number;
                                invalid_rd_operations: number;
                                flush_operations: number;
                                failed_wr_operations: number;
                            };
                            scsi0: {
                                unmap_merged: number;
                                rd_total_time_ns: number;
                                wr_bytes: number;
                                failed_unmap_operations: number;
                                failed_flush_operations: number;
                                idle_time_ns: number;
                                timed_stats: Array<string>;
                                unmap_operations: number;
                                invalid_wr_operations: number;
                                account_invalid: boolean;
                                wr_operations: number;
                                rd_merged: number;
                                unmap_total_time_ns: number;
                                unmap_bytes: number;
                                failed_wr_operations: number;
                                flush_operations: number;
                                invalid_rd_operations: number;
                                wr_total_time_ns: number;
                                rd_bytes: number;
                                flush_total_time_ns: number;
                                invalid_unmap_operations: number;
                                wr_highest_offset: number;
                                failed_rd_operations: number;
                                rd_operations: number;
                                invalid_flush_operations: number;
                                wr_merged: number;
                                account_failed: boolean;
                            };
                        };
                        ballooninfo: {
                            total_mem: number;
                            free_mem: number;
                            last_update: number;
                            major_page_faults: number;
                            minor_page_faults: number;
                            actual: number;
                            max_mem: number;
                            mem_swapped_out: number;
                            mem_swapped_in: number;
                        };
                        uptime: number;
                        vmid: number;
                        netin: number;
                        cpus: number;
                        maxmem: number;
                        netout: number;
                        ha: {
                            managed: number;
                        };
                        balloon: number;
                        'running-machine': string;
                    };
                };
                rrddata?: null;
            }>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/nat/getInfo',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'hostId': hostId,
            },
        });
    }
}
