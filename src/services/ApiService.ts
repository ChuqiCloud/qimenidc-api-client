/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApiService {
    /**
     * 添加API key
     * 新增api key，该appkey只会本次显示，后续查询将不显示
     * @param adminPath 后台路径
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postInsertApiKey(
        adminPath: string,
        requestBody?: {
            /**
             * 备注
             */
            info?: string | null;
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            id: number;
            appid: string;
            appkey: string;
            info: string;
            createDate: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/insertApiKey',
            path: {
                'adminPath': adminPath,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 分页获取API信息
     * 分页获取API信息
     * @param adminPath 后台路径
     * @param page 页码
     * @param size 每页数据量
     * @returns any
     * @throws ApiError
     */
    public static getSelectApiByPage(
        adminPath: string,
        page?: number,
        size?: number,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id?: number;
                appid?: string;
                appkey?: string;
                info?: null;
                createDate?: null;
            }>;
            total: number;
            size: number;
            current: number;
            orders: Array<string>;
            optimizeCountSql: boolean;
            searchCount: boolean;
            maxLimit: null;
            countId: null;
            pages: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/selectApiByPage',
            path: {
                'adminPath': adminPath,
            },
            query: {
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * 删除指定ID的API key
     * 删除指定ID的API key，可以post请求
     * @param adminPath 后台路径
     * @param id api id
     * @returns any
     * @throws ApiError
     */
    public static deleteDeleteApi(
        adminPath: string,
        id?: number,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/{adminPath}/deleteApi',
            path: {
                'adminPath': adminPath,
            },
            query: {
                'id': id,
            },
        });
    }
    /**
     * 停用指定API
     * 停用指定API
     * @param adminPath
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static putDisableApi(
        adminPath: string,
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/{adminPath}/disableApi/{id}',
            path: {
                'adminPath': adminPath,
                'id': id,
            },
        });
    }
    /**
     * 启用指定API
     * 启用指定API
     * @param adminPath
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static putEnableApi(
        adminPath: string,
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/{adminPath}/enableApi/{id}',
            path: {
                'adminPath': adminPath,
                'id': id,
            },
        });
    }
    /**
     * 修改指定虚拟机的VNC密码
     * 修改指定虚拟机的VNC密码
     * @param node
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putApiV1UpdateVncPassword(
        node: string,
        authorization?: string,
        requestBody?: {
            hostId: number;
            password: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/{node}/updateVncPassword',
            path: {
                'node': node,
            },
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 创建虚拟机
     * 创建虚拟机
     * @param nodeType 虚拟化平台，目前只有pve
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postApiV1CerateVm(
        nodeType: string,
        requestBody?: {
            /**
             * 节点ID
             */
            nodeid: number;
            /**
             * 虚拟机名
             */
            hostname?: string | null;
            /**
             * 配置模板ID
             */
            configureTemplateId?: number | null;
            /**
             * 插槽数，默认为1
             */
            sockets?: number | null;
            /**
             * 核心，默认1
             */
            cores?: number | null;
            /**
             * 线程数，默认1
             */
            threads?: number | null;
            /**
             * 是否去虚拟化，默认false
             */
            devirtualization?: boolean | null;
            /**
             * 是否开启kvm虚拟化，默认开启
             */
            kvm?: boolean | null;
            /**
             * cpu信息模型ID
             */
            cpuModel?: number | null;
            /**
             * 组合模型ID，优先级大于cpuModel
             */
            modelGroup?: number | null;
            /**
             * 是否开启嵌套虚拟化，默认关闭
             */
            nested?: boolean | null;
            /**
             * cpu类型，默认kvm64，如果开启了nested，cpu必须为host或max
             */
            cpu?: string | null;
            /**
             * cpu限制(单位:百分比)，列：10 为10%
             */
            cpuUnits?: number | null;
            /**
             * I/O限制（单位MB/S），注意该参数为迁移服务器或克隆等操作才会有效，实际虚拟机I/O限制为下方的读写限制参数
             */
            bwlimit?: number | null;
            /**
             * 月流量限制(单位:GB)
             */
            flowLimit?: number | null;
            /**
             * 月流量使用量(单位:GB)
             */
            usedFlow?: number | null;
            /**
             * 系统架构(x86_64,arrch64)，默认x86_64
             */
            arch?: string | null;
            /**
             * acpi 默认1 开启
             */
            acpi?: string | null;
            /**
             * 内存 单位Mb，默认512
             */
            memory?: number | null;
            /**
             * PVE磁盘名，auto为自动
             */
            storage?: string | null;
            /**
             * 系统盘大小，单位Gb
             */
            systemDiskSize?: number | null;
            /**
             * 系统磁盘读取长效限制 单位mb/s
             */
            mbpsRd?: number | null;
            /**
             * 系统磁盘读取突发限制 单位mb/s
             */
            mbpsRdMax?: number | null;
            /**
             * 系统磁盘写入长效限制 单位mb/s
             */
            mbpsWr?: number | null;
            /**
             * 系统磁盘写入突发限制 单位mb/s
             */
            mbpsWrMax?: number | null;
            /**
             * 系统磁盘iops读取长效限制 单位ops/s
             */
            iopsRd?: number | null;
            /**
             * 系统磁盘iops读取突发限制 单位ops/s
             */
            iopsRdMax?: number | null;
            /**
             * 系统磁盘iops写入长效限制 单位ops/s
             */
            iopsWr?: number | null;
            /**
             * 系统磁盘iops写入突发限制 单位ops/s
             */
            iopsWrMax?: number | null;
            dataDisk?: string;
            /**
             * 网桥
             */
            bridge?: string | null;
            ipConfig?: string;
            /**
             * 操作系统，可填镜像名称或id
             */
            os: string;
            /**
             * 操作系统类型，（windows|linux）
             */
            osType?: string | null;
            /**
             * 带宽，单位Mbps
             */
            bandwidth?: number | null;
            /**
             * 是否开机自启 0:否 1:是，默认0关闭
             */
            onBoot?: number | null;
            /**
             * 虚拟机登录用户名
             */
            username?: string | null;
            /**
             * 虚拟机登录密码
             */
            password?: string | null;
            /**
             * 到期时间，时间戳
             */
            expirationTime?: number | null;
            ifnat?: number | null;
            natnum?: number | null;
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            nodeid: number;
            hostid: number;
            vmid: number;
            hostname: string;
            configureTemplateId: null;
            sockets: number;
            cores: number;
            threads: number;
            nested: boolean;
            devirtualization: boolean;
            kvm: boolean;
            cpuModel: null;
            modelGroup: number;
            cpu: string;
            cpuUnits: number;
            args: null;
            arch: string;
            acpi: number;
            memory: number;
            swap: null;
            storage: string;
            systemDiskSize: number;
            dataDisk: {
                '1': number;
            };
            bridge: string;
            ipConfig: {
                '1': string;
            };
            dns1: string;
            os: string;
            osType: string;
            iso: null;
            template: null;
            onBoot: number;
            bandwidth: number;
            username: string;
            password: string;
            task: null;
            status: null;
            expirationTime: null;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/{nodeType}/cerateVM',
            path: {
                'nodeType': nodeType,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 虚拟机电源状态管理
     * 虚拟机电源状态管理，action类型有start=开机、stop=关机、reboot=重启、shutdown=强制关机、suspend=挂起、resume=恢复、pause=暂停、unpause=恢复
     * @param nodeType 虚拟化平台，目前只有pve
     * @param hostId 数据库中虚拟机ID（非vmid）
     * @param action action类型有start、stop、reboot、shutdown
     * @returns any
     * @throws ApiError
     */
    public static putApiV1Power(
        nodeType: string,
        hostId: string,
        action: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: string | null;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/{nodeType}/power/{hostId}/{action}',
            path: {
                'nodeType': nodeType,
                'hostId': hostId,
                'action': action,
            },
        });
    }
    /**
     * 重装系统
     * 重装系统
     * @param nodeType
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putApiV1Reinstall(
        nodeType: string,
        requestBody?: {
            /**
             * hostId，非vmId
             */
            hostId: number;
            /**
             * 系统全面或系统id
             */
            os: string;
            /**
             * 新密码，为空不重置
             */
            newPassword: string | null;
            /**
             * 是否重置数据盘
             */
            resetDataDisk: boolean;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/{nodeType}/reinstall',
            path: {
                'nodeType': nodeType,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 删除虚拟机
     * 删除虚拟机
     * @param nodeType
     * @param hostId 这里不能为vmId
     * @returns any
     * @throws ApiError
     */
    public static deleteApiV1Delete(
        nodeType: string,
        hostId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/{nodeType}/delete/{hostId}',
            path: {
                'nodeType': nodeType,
                'hostId': hostId,
            },
        });
    }
    /**
     * 修改虚拟机密码
     * 修改虚拟机密码
     * @param nodeType
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putApiV1UpdateVmConfigRestPassword(
        nodeType: string,
        requestBody?: {
            /**
             * 虚拟机的ID
             */
            hostId: number;
            /**
             * 新密码
             */
            newPassword: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/{nodeType}/updateVmConfig/restPassword',
            path: {
                'nodeType': nodeType,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 续期
     * 续期
     * @param nodeType
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putApiV1UpdateVmConfigRenewal(
        nodeType: string,
        requestBody?: {
            /**
             * 虚拟机ID
             */
            hostId: number;
            /**
             * 到期时间戳
             */
            expirationTime: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/{nodeType}/updateVmConfig/renewal',
            path: {
                'nodeType': nodeType,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 获取指定虚拟机数据
     * current字段为当前运行实时监控数据，rrddata为历史数据，历史数据默认为一天
     * @param nodeType 虚拟化平台，目前只有pve
     * @param hostId 虚拟机ID（可以vmid或者键ID）
     * @returns any
     * @throws ApiError
     */
    public static getApiV1GetVmInfo(
        nodeType: string,
        hostId?: number,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            info: {
                id: number;
                nodeid: number;
                vmid: number;
                name: string;
                cores: number;
                memory: number;
                agent: number;
                ide0: string;
                ide2: string | null;
                net0: string;
                net1: string | null;
                os: string;
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
                    '1689664264882': number;
                    '1689664264900': number;
                    '1689664279791': number;
                    '1689664280959': number;
                    '1689664282054': number;
                    '1689664282539': number;
                };
                status: string;
                createTime: number;
                expirationTime: number;
            };
            status: {
                'running-machine': string;
                agent: number;
                pid: number;
                diskread: number;
                uptime: number;
                mem: number;
                vmid: number;
                freemem: number;
                maxmem: number;
                cpus: number;
                cpu: number;
                balloon: number;
                nics: {
                    tap101i0: {
                        netin: number;
                        netout: number;
                    };
                };
                netin: number;
                blockstat: {
                    scsi1: {
                        wr_operations: number;
                        wr_total_time_ns: number;
                        idle_time_ns: number;
                        timed_stats: Array<string>;
                        account_failed: boolean;
                        invalid_unmap_operations: number;
                        rd_bytes: number;
                        rd_merged: number;
                        failed_rd_operations: number;
                        account_invalid: boolean;
                        unmap_merged: number;
                        failed_wr_operations: number;
                        invalid_wr_operations: number;
                        failed_unmap_operations: number;
                        wr_bytes: number;
                        wr_merged: number;
                        rd_operations: number;
                        unmap_bytes: number;
                        invalid_flush_operations: number;
                        rd_total_time_ns: number;
                        unmap_operations: number;
                        wr_highest_offset: number;
                        flush_operations: number;
                        failed_flush_operations: number;
                        unmap_total_time_ns: number;
                        flush_total_time_ns: number;
                        invalid_rd_operations: number;
                    };
                    scsi0: {
                        failed_rd_operations: number;
                        account_invalid: boolean;
                        unmap_merged: number;
                        failed_wr_operations: number;
                        invalid_wr_operations: number;
                        wr_operations: number;
                        wr_total_time_ns: number;
                        timed_stats: Array<string>;
                        idle_time_ns: number;
                        account_failed: boolean;
                        rd_bytes: number;
                        invalid_unmap_operations: number;
                        rd_merged: number;
                        wr_highest_offset: number;
                        unmap_operations: number;
                        failed_flush_operations: number;
                        flush_operations: number;
                        unmap_total_time_ns: number;
                        flush_total_time_ns: number;
                        invalid_rd_operations: number;
                        failed_unmap_operations: number;
                        wr_bytes: number;
                        wr_merged: number;
                        unmap_bytes: number;
                        rd_operations: number;
                        invalid_flush_operations: number;
                        rd_total_time_ns: number;
                    };
                    ide2: {
                        failed_unmap_operations: number;
                        wr_bytes: number;
                        wr_merged: number;
                        unmap_bytes: number;
                        rd_operations: number;
                        invalid_flush_operations: number;
                        rd_total_time_ns: number;
                        unmap_operations: number;
                        wr_highest_offset: number;
                        failed_flush_operations: number;
                        flush_operations: number;
                        unmap_total_time_ns: number;
                        flush_total_time_ns: number;
                        invalid_rd_operations: number;
                        wr_operations: number;
                        wr_total_time_ns: number;
                        timed_stats: Array<string>;
                        idle_time_ns: number;
                        account_failed: boolean;
                        invalid_unmap_operations: number;
                        rd_bytes: number;
                        rd_merged: number;
                        failed_rd_operations: number;
                        account_invalid: boolean;
                        unmap_merged: number;
                        failed_wr_operations: number;
                        invalid_wr_operations: number;
                    };
                };
                ballooninfo: {
                    actual: number;
                    minor_page_faults: number;
                    total_mem: number;
                    last_update: number;
                    mem_swapped_in: number;
                    free_mem: number;
                    max_mem: number;
                    mem_swapped_out: number;
                    major_page_faults: number;
                };
                'running-qemu': string;
                disk: number;
                diskwrite: number;
                ha: {
                    managed: number;
                };
                name: string;
                qmpstatus: string;
                'proxmox-support': {
                    'pbs-masterkey': boolean;
                    'pbs-library-version': string;
                    'pbs-dirty-bitmap-migration': boolean;
                    'query-bitmap-info': boolean;
                    'pbs-dirty-bitmap': boolean;
                    'pbs-dirty-bitmap-savevm': boolean;
                };
                maxdisk: number;
                netout: number;
                status: string;
            };
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/{nodeType}/getVmInfo',
            path: {
                'nodeType': nodeType,
            },
            query: {
                'hostId': hostId,
            },
        });
    }
    /**
     * 获取指定虚拟机的vnc地址
     * 获取指定虚拟机的vnc地址
     * @param node
     * @param hostId 可以为vmid
     * @param page 页数
     * @param size 页数据量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getApiV1GetVnc(
        node: string,
        hostId?: number,
        page?: number,
        size?: number,
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
                '本地测试'?: string;
            }>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/{node}/getVnc',
            path: {
                'node': node,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'hostId': hostId,
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * 通讯测试
     * 通讯测试
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getApiV1Status(
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/status',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 分页获取实例信息
     * 分页查询实例信息
     * @param node
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getApiV1GetVmByPage(
        node: string,
        page?: number,
        size?: number,
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
            url: '/api/v1/{node}/getVmByPage',
            path: {
                'node': node,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * 带参数分页获取实例信息
     * @param node
     * @param page
     * @param size
     * @param param
     * @param value
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getApiV1GetVmByParam(
        node: string,
        page?: number,
        size?: number,
        param?: string,
        value?: string,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/{node}/getVmByParam',
            path: {
                'node': node,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'page': page,
                'size': size,
                'param': param,
                'value': value,
            },
        });
    }
    /**
     * 以降序排列获取虚拟机分页列表
     * 获取虚拟机分页列表,根据创建时间降序排列
     * @param node
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getApiV1GetVmByPageOrderByCreateTime(
        node: string,
        page?: number,
        size?: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/{node}/getVmByPageOrderByCreateTime',
            path: {
                'node': node,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * 获取实例总数
     * 获取虚拟机总数
     * @param node
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getApiV1GetVmCount(
        node: string,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/{node}/getVmCount',
            path: {
                'node': node,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 获取虚拟机历史负载
     * @param node
     * @param hostId 虚拟机id
     * @param timeframe 时间范围[hour,day,week,month,year]
     * @param cf 数据类型[AVERAGE,MAX]
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getApiV1GetVmHostRrdData(
        node: string,
        hostId?: number,
        timeframe?: string,
        cf?: string,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: Array<{
            mem: number;
            maxmem: number;
            netout: number;
            cpu: number;
            maxcpu: number;
            maxdisk: number;
            disk: number;
            diskwrite: number;
            time: number;
            netin: number;
            diskread: number;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/{node}/getVmHostRrdData',
            path: {
                'node': node,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'hostId': hostId,
                'timeframe': timeframe,
                'cf': cf,
            },
        });
    }
    /**
     * 分页获取指定状态的虚拟机列表
     * 分页获取指定状态的虚拟机列表
     * @param node
     * @param status 0为开机，详细查看电源管理接口
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getApiV1GetVmByStatus(
        node: string,
        status?: number,
        page?: number,
        size?: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/{node}/getVmByStatus',
            path: {
                'node': node,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'status': status,
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * 获取指定状态的虚拟机总数
     * 获取指定状态的虚拟机总数
     * @param node
     * @param status 0为开机，详细查看电源管理接口
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getApiV1GetVmCountByStatus(
        node: string,
        status?: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/{node}/getVmCountByStatus',
            path: {
                'node': node,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'status': status,
            },
        });
    }
}
