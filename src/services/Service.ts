/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VmParams } from '../models/VmParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class Service {
    /**
     * 登陆接口
     * 登陆接口，
     * @param adminPath 后台路径
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postLoginDo(
        adminPath: string,
        requestBody?: {
            username: string;
            password: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/loginDo',
            path: {
                'adminPath': adminPath,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 增加地区
     * 增加地区
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postAddArea(
        adminPath: string,
        authorization?: string,
        requestBody?: {
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
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: null;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/addArea',
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
     * 删除地区
     * 删除地区
     * @param adminPath
     * @param id 删除地区的id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static deleteDeleteArea(
        adminPath: string,
        id: string,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/{adminPath}/deleteArea/{id}',
            path: {
                'adminPath': adminPath,
                'id': id,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 修改地区
     * 修改地区
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putUpdateArea(
        adminPath: string,
        authorization?: string,
        requestBody?: {
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
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/{adminPath}/updateArea',
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
     * 分页查询地区
     * 分页查询地区
     * @param adminPath
     * @param page
     * @param limit
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetAreaList(
        adminPath: string,
        page?: number,
        limit?: number,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id?: number;
                name?: string;
                parent?: number;
                realm?: number;
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
            url: '/{adminPath}/getAreaList',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * 查询指定id的地区
     * 查询指定id的地区
     * @param adminPath
     * @param id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetArea(
        adminPath: string,
        id: number,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            id: number;
            name: string;
            parent: number;
            realm: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getArea',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'id': id,
            },
        });
    }
    /**
     * 添加某节点到指定地区
     * 添加某节点到指定地区
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putAddNodeToArea(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            /**
             * 节点id
             */
            id: number;
            /**
             * 地区id
             */
            area: number;
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/{adminPath}/addNodeToArea',
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
     * 获取指定地区的节点列表
     * 获取指定地区的节点列表
     * @param adminPath
     * @param area 地区分类ID
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetNodeListByArea(
        adminPath: string,
        area: number,
        page?: number,
        size?: number,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id?: number;
                name?: null;
                area?: number;
                host?: string;
                port?: number;
                username?: string;
                password?: string;
                realm?: string;
                status?: number;
                csrfToken?: string;
                ticket?: string;
                nodeName?: string;
                autoStorage?: string;
                sshPort?: number;
                sshUsername?: string;
                sshPassword?: string;
                controllerStatus?: number;
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
            url: '/{adminPath}/getNodeListByArea',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'area': area,
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * 获取指定父级地区的子地区列表
     * 获取指定父级地区的子地区列表
     * @param adminPath
     * @param parent 父级ID
     * @param page 页码
     * @param size 页数据量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetAreaListByParent(
        adminPath: string,
        parent?: number,
        page?: number,
        size?: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getAreaListByParent',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'parent': parent,
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * 分页查询父级（一级）地区
     * 分页查询纯父级（一级）地区
     * @param adminPath
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetAreaListByParentIsNull(
        adminPath: string,
        page?: number,
        size?: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getAreaListByParentIsNull',
            path: {
                'adminPath': adminPath,
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
     * 获取节点网卡信息
     * 获取节点网卡信息
     * @param adminPath
     * @param nodeId
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetPveNodeNetworkInfo(
        adminPath: string,
        nodeId?: number,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: Array<{
            priority: number;
            active: number;
            type: string;
            method: string;
            exists?: number;
            method6: string;
            families: Array<string>;
            iface: string;
            autostart?: number;
            bridge_stp?: string;
            cidr?: string;
            gateway?: string;
            bridge_ports?: string;
            netmask?: string;
            address?: string;
            bridge_fd?: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getPveNodeNetworkInfo',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'nodeId': nodeId,
            },
        });
    }
    /**
     * 获取节点网卡配置文件信息
     * 获取节点网卡配置文件信息
     * @param adminPath
     * @param nodeId
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetPveNodeInterfaces(
        adminPath: string,
        nodeId?: number,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getPveNodeInterfaces',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'nodeId': nodeId,
            },
        });
    }
    /**
     * 创建指定节点虚拟网卡
     * 创建指定节点虚拟网卡
     * @param adminPath
     * @param nodeId 节点id
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postCreatePveNodeInterface(
        adminPath: string,
        nodeId: number,
        authorization?: string,
        requestBody?: {
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
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/createPveNodeInterface/{nodeId}',
            path: {
                'adminPath': adminPath,
                'nodeId': nodeId,
            },
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 查询单个节点状态
     * 查询单个节点状态
     * @param adminPath
     * @param nodeId 节点ID
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetNodeInfoByOne(
        adminPath: string,
        nodeId: number,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            cpuinfo: {
                flags: string;
                model: string;
                sockets: number;
                user_hz: number;
                mhz: string;
                cpus: number;
                hvm: string;
                cores: number;
            };
            wait: number;
            memory: {
                free: number;
                total: number;
                used: number;
            };
            idle: number;
            ksm: {
                shared: number;
            };
            loadavg: Array<string>;
            kversion: string;
            cpu: number;
            rootfs: {
                avail: number;
                used: number;
                free: number;
                total: number;
            };
            swap: {
                total: number;
                free: number;
                used: number;
            };
            pveversion: string;
            uptime: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getNodeInfoByOne',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'nodeId': nodeId,
            },
        });
    }
    /**
     * 获取指定节点负载信息
     * 获取指定节点负载信息
     * @param adminPath
     * @param nodeId 节点id
     * @param timeframe 采样时间 [hour, day, week, month, year] 默认为hour
     * @param cf 采样方式 [AVERAGE, MAX] 默认为AVERAGE
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetNodeLoadAvg(
        adminPath: string,
        nodeId: number,
        timeframe?: string,
        cf?: string,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: Array<{
            memused: number;
            roottotal: number;
            memtotal: number;
            rootused: number;
            iowait: number;
            cpu: number;
            time: number;
            swapused: number;
            netin: number;
            netout: number;
            swaptotal: number;
            loadavg: number;
            maxcpu: number;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getNodeLoadAvg',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'nodeId': nodeId,
                'timeframe': timeframe,
                'cf': cf,
            },
        });
    }
    /**
     * 获取节点总数
     * 获取节点总数
     * @param adminPath
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetNodeCount(
        adminPath: string,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getNodeCount',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 添加PVE主控节点
     * 添加PVE主控集群节点
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postAdminInsertNodeMaster(
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
            url: '/admin/insertNodeMaster',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 分页获取集群节点列表
     * 分页获取集群节点列表
     * @param adminPath
     * @param page 页码
     * @param size 每页数据量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getSelectNodeByPage(
        adminPath: string,
        page?: number,
        size?: number,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id: number;
                host: string;
                port: number;
                username: string;
                password: string;
                realm: string;
                status: number;
                csrfToken: string;
                ticket: string;
                nodeName: string;
                autoStorage: string;
                sshPort: number;
                sshUsername: string;
                sshPassword: string;
                controllerStatus: number | null;
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
            url: '/{adminPath}/selectNodeByPage',
            path: {
                'adminPath': adminPath,
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
     * 修改集群节点信息
     * 修改集群节点信息
     * @param adminPath 后台路径
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putUpdateNodeInfo(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            id: number;
            host: string;
            port: number;
            username: string;
            password: string;
            realm: string;
            status: number;
            nodeName: string;
            sshPort: number;
            sshUsername: string;
            sshPassword: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/{adminPath}/updateNodeInfo',
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
     * 删除指定ID节点
     * 删除指定ID节点
     * @param adminPath
     * @param nodeId
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static deleteDeleteNodeById(
        adminPath: string,
        nodeId?: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/{adminPath}/deleteNodeById',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'nodeId': nodeId,
            },
        });
    }
    /**
     * 添加超管账号
     * 添加超管账号
     * @param adminPath 后台路径
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postRegisterDo(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            phone: string;
            password: string;
            email: string;
            username: string;
            name: string;
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/registerDo',
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
     * 分页查询超管账号
     * 分页查询超管账号
     * @param adminPath 后台路径
     * @param page 页码
     * @param size 页数据量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetSysuser(
        adminPath: string,
        page?: number,
        size?: number,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id: number;
                username: string;
                password: string;
                name: string | null;
                phone: string | null;
                email: string | null;
                logindate: number;
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
            url: '/{adminPath}/getSysuser',
            path: {
                'adminPath': adminPath,
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
     * 修改超管账号接口
     * 修改超管账号接口
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postUpdateSysuser(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            id: number;
            username: string;
            phone: string;
            /**
             * 密码为空不修改
             */
            password: string | null;
            /**
             * 姓名
             */
            name: string;
            email: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/updateSysuser',
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
     * 根据uuid查询超管
     * 根据uuid查询超管
     * @param adminPath
     * @param uuid
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetSysuserByUuid(
        adminPath: string,
        uuid?: string,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getSysuserByUuid',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'uuid': uuid,
            },
        });
    }
    /**
     * 删除超管账号
     * 删除超管账号
     * @param adminPath
     * @param id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static deleteDeleteSysUserById(
        adminPath: string,
        id: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/{adminPath}/deleteSysUserById/{id}',
            path: {
                'adminPath': adminPath,
                'id': id,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 增加配置模板
     * 增加配置模板
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postAddConfiguretemplate(
        adminPath: string,
        authorization?: string,
        requestBody?: {
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
             * 带宽，单位Mbps
             */
            bandwidth?: number | null;
            /**
             * 是否开机自启 0:否 1:是，默认0关闭
             */
            onBoot?: number | null;
            ifnat?: number | null;
            natnum?: number | null;
            name: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/addConfiguretemplate',
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
     * 删除配置模板
     * 删除配置模板
     * @param adminPath
     * @param id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static deleteDeleteConfiguretemplate(
        adminPath: string,
        id: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/{adminPath}/deleteConfiguretemplate/{id}',
            path: {
                'adminPath': adminPath,
                'id': id,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 修改配置模板
     * 修改配置模板
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putUpdateConfiguretemplate(
        adminPath: string,
        authorization?: string,
        requestBody?: {
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
             * 带宽，单位Mbps
             */
            bandwidth?: number | null;
            /**
             * 是否开机自启 0:否 1:是，默认0关闭
             */
            onBoot?: number | null;
            ifnat?: number | null;
            natnum?: number | null;
            name: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/{adminPath}/updateConfiguretemplate',
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
     * 分页查询配置模板
     * 分页查询配置模板
     * @param adminPath
     * @param page 页码
     * @param limit 页数据量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetConfiguretemplateByPage(
        adminPath: string,
        page?: number,
        limit?: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getConfiguretemplateByPage',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * 电源状态操作
     * 虚拟机电源状态管理，action类型有start=开机、stop=关机、reboot=重启、shutdown=强制关机、suspend=挂起、resume=恢复、pause=暂停、unpause=恢复
     * @param adminPath
     * @param hostId 数据库中虚拟机ID（非vmid）
     * @param action action类型有start、stop、reboot、shutdown
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putPower(
        adminPath: string,
        hostId: number,
        action: string,
        authorization?: string,
        requestBody?: {
            /**
             * 暂停原因
             */
            pauseInfo: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/{adminPath}/power/{hostId}/{action}',
            path: {
                'adminPath': adminPath,
                'hostId': hostId,
                'action': action,
            },
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 重装虚拟机系统
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putReinstall(
        adminPath: string,
        authorization?: string,
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
            url: '/{adminPath}/reinstall',
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
     * 删除虚拟机
     * @param adminPath
     * @param hostId 非虚拟机vmId，为ID
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static deleteDelete(
        adminPath: string,
        hostId: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/{adminPath}/delete/{hostId}',
            path: {
                'adminPath': adminPath,
                'hostId': hostId,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 创建虚拟机
     * 创建虚拟机
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postCreateVm(
        adminPath: string,
        authorization?: string,
        requestBody?: VmParams,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/createVm',
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
     * 分页获取实例信息
     * @param adminPath
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetVmByPage(
        adminPath: string,
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
            url: '/{adminPath}/getVmByPage',
            path: {
                'adminPath': adminPath,
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
     * @param adminPath
     * @param page
     * @param size
     * @param param
     * @param value
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetVmByParam(
        adminPath: string,
        page?: number,
        size?: number,
        param?: string,
        value?: string,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getVmByParam',
            path: {
                'adminPath': adminPath,
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
     * 获取虚拟机主机信息
     * @param adminPath
     * @param hostId
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetVmHostInfo(
        adminPath: string,
        hostId?: number,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            vmhost: {
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
            current: {
                data: {
                    netin: number;
                    vmid: number;
                    'running-machine': string;
                    balloon: number;
                    ha: {
                        managed: number;
                    };
                    maxmem: number;
                    netout: number;
                    cpus: number;
                    'proxmox-support': {
                        'pbs-library-version': string;
                        'pbs-dirty-bitmap-migration': boolean;
                        'pbs-dirty-bitmap': boolean;
                        'query-bitmap-info': boolean;
                        'pbs-masterkey': boolean;
                        'pbs-dirty-bitmap-savevm': boolean;
                    };
                    diskread: number;
                    status: string;
                    pid: number;
                    disk: number;
                    mem: number;
                    'running-qemu': string;
                    name: string;
                    uptime: number;
                    ballooninfo: {
                        minor_page_faults: number;
                        max_mem: number;
                        actual: number;
                        mem_swapped_out: number;
                        mem_swapped_in: number;
                        total_mem: number;
                        free_mem: number;
                        last_update: number;
                        major_page_faults: number;
                    };
                    blockstat: {
                        scsi1: {
                            unmap_merged: number;
                            rd_total_time_ns: number;
                            wr_bytes: number;
                            failed_flush_operations: number;
                            failed_unmap_operations: number;
                            idle_time_ns: number;
                            timed_stats: Array<string>;
                            unmap_operations: number;
                            invalid_wr_operations: number;
                            wr_operations: number;
                            account_invalid: boolean;
                            rd_merged: number;
                            unmap_total_time_ns: number;
                            unmap_bytes: number;
                            failed_wr_operations: number;
                            flush_operations: number;
                            invalid_rd_operations: number;
                            wr_total_time_ns: number;
                            rd_bytes: number;
                            invalid_unmap_operations: number;
                            flush_total_time_ns: number;
                            wr_highest_offset: number;
                            failed_rd_operations: number;
                            rd_operations: number;
                            invalid_flush_operations: number;
                            wr_merged: number;
                            account_failed: boolean;
                        };
                        ide2: {
                            timed_stats: Array<string>;
                            failed_unmap_operations: number;
                            failed_flush_operations: number;
                            idle_time_ns: number;
                            invalid_wr_operations: number;
                            unmap_operations: number;
                            unmap_merged: number;
                            rd_total_time_ns: number;
                            wr_bytes: number;
                            unmap_total_time_ns: number;
                            unmap_bytes: number;
                            wr_operations: number;
                            account_invalid: boolean;
                            rd_merged: number;
                            invalid_rd_operations: number;
                            wr_total_time_ns: number;
                            rd_bytes: number;
                            failed_wr_operations: number;
                            flush_operations: number;
                            rd_operations: number;
                            wr_merged: number;
                            account_failed: boolean;
                            invalid_flush_operations: number;
                            invalid_unmap_operations: number;
                            flush_total_time_ns: number;
                            failed_rd_operations: number;
                            wr_highest_offset: number;
                        };
                        scsi0: {
                            rd_bytes: number;
                            wr_total_time_ns: number;
                            invalid_rd_operations: number;
                            flush_operations: number;
                            failed_wr_operations: number;
                            invalid_flush_operations: number;
                            account_failed: boolean;
                            wr_merged: number;
                            rd_operations: number;
                            wr_highest_offset: number;
                            failed_rd_operations: number;
                            invalid_unmap_operations: number;
                            flush_total_time_ns: number;
                            unmap_operations: number;
                            invalid_wr_operations: number;
                            failed_unmap_operations: number;
                            failed_flush_operations: number;
                            idle_time_ns: number;
                            timed_stats: Array<string>;
                            wr_bytes: number;
                            rd_total_time_ns: number;
                            unmap_merged: number;
                            unmap_bytes: number;
                            unmap_total_time_ns: number;
                            rd_merged: number;
                            wr_operations: number;
                            account_invalid: boolean;
                        };
                    };
                    diskwrite: number;
                    freemem: number;
                    qmpstatus: string;
                    maxdisk: number;
                    nics: {
                        tap103i0: {
                            netout: number;
                            netin: number;
                        };
                    };
                    cpu: number;
                    agent: number;
                };
            };
            rrddata: {
                data: Array<{
                    diskwrite: number;
                    time: number;
                    netin: number;
                    diskread: number;
                    mem: number;
                    netout: number;
                    maxmem: number;
                    cpu: number;
                    maxcpu: number;
                    disk: number;
                    maxdisk: number;
                }>;
            };
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getVmHostInfo',
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
    /**
     * 获取虚拟机历史负载
     * @param adminPath
     * @param hostId 虚拟机id
     * @param timeframe 时间范围[hour,day,week,month,year]
     * @param cf 数据类型[AVERAGE,MAX]
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetVmHostRrdData(
        adminPath: string,
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
            url: '/{adminPath}/getVmHostRrdData',
            path: {
                'adminPath': adminPath,
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
     * 获取指定虚拟机的vnc地址
     * 获取指定虚拟机的vnc地址
     * @param adminPath
     * @param node
     * @param hostId 可以为vmid
     * @param page 页数
     * @param size 页数据量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetVnc(
        adminPath: string,
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
            url: '/{adminPath}/{node}/getVnc',
            path: {
                'adminPath': adminPath,
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
     * 以降序排列获取虚拟机分页列表
     * 获取虚拟机分页列表,根据创建时间降序排列
     * @param adminPath
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetVmByPageOrderByCreateTime(
        adminPath: string,
        page?: number,
        size?: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getVmByPageOrderByCreateTime',
            path: {
                'adminPath': adminPath,
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
     * 分页获取指定状态的虚拟机列表
     * 分页获取指定状态的虚拟机列表
     * @param adminPath
     * @param status 0为开机，详细查看电源管理接口
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetVmByStatus(
        adminPath: string,
        status?: number,
        page?: number,
        size?: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getVmByStatus',
            path: {
                'adminPath': adminPath,
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
     * @param adminPath
     * @param status 0为开机，详细查看电源管理接口
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetVmCountByStatus(
        adminPath: string,
        status?: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getVmCountByStatus',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'status': status,
            },
        });
    }
    /**
     * 获取实例总数
     * 获取虚拟机总数
     * @param adminPath
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetVmCount(
        adminPath: string,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getVmCount',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 获取被控通讯密钥
     * 获取被控通讯密钥
     * @param adminPath
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetControlledSecretKey(
        adminPath: string,
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getControlledSecretKey',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 获取全局虚拟机默认系统盘大小
     * 获取全局虚拟机默认系统盘大小
     * @param adminPath
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetVmDefaultDiskSize(
        adminPath: string,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getVmDefaultDiskSize',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 修改全局虚拟机默认系统盘大小
     * 修改全局虚拟机默认系统盘大小，该接口支持POST,PUT请求方法
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postUpdateVmDefaultDiskSize(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            /**
             * 单位GB
             */
            Linux: number | null;
            /**
             * 单位GB
             */
            Windows: number | null;
        },
    ): CancelablePromise<{
        code: number;
        message: string;
        data: null;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/updateVmDefaultDiskSize',
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
     * 获取全部配置
     * 获取全部配置
     * @param adminPath
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetAllConfig(
        adminPath: string,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getAllConfig',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 修改系统配置
     * 修改系统配置
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putUpdateConfig(
        adminPath: string,
        authorization?: string,
        requestBody?: {
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
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/{adminPath}/updateConfig',
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
     * 新增smbios信息模型
     * 新增smbios信息模型
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postAddSmbiosInfo(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            type?: string | null;
            model: any;
            /**
             * 备注
             */
            info: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/addSmbiosInfo',
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
     * 删除smbios信息模型
     * 删除smbios信息模型
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static deleteDeleteSmbiosInfo(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            id: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/{adminPath}/deleteSmbiosInfo',
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
     * 修改smbios信息模型
     * 修改smbios信息模型
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putUpdateSmbiosInfo(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            id: number;
            type?: string | null;
            model: any;
            /**
             * 备注
             */
            info: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/{adminPath}/updateSmbiosInfo',
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
     * 查询smbios信息模型
     * 查询smbios信息模型
     * @param adminPath
     * @param id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetSmbiosInfo(
        adminPath: string,
        id?: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getSmbiosInfo',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'id': id,
            },
        });
    }
    /**
     * 分页查询smbios信息模型
     * 分页查询smbios信息模型
     * @param adminPath
     * @param page
     * @param limit
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetSmbiosInfoList(
        adminPath: string,
        page?: number,
        limit?: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getSmbiosInfoList',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * 添加模型组
     * 添加模型组
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postAddModelGroup(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            /**
             * cpu模型id
             */
            cpuModel?: number | null;
            /**
             * smbios模型id集
             */
            smbiosModel?: string | null;
            /**
             * 备注
             */
            info: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{adminPath}/addModelGroup',
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
     * 删除模型组
     * 删除模型组
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static deleteDeleteModelGroup(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            id: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/{adminPath}/deleteModelGroup',
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
     * 修改模型组
     * 修改模型组
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static putUpdateModelGroup(
        adminPath: string,
        authorization?: string,
        requestBody?: {
            id: number;
            /**
             * cpu模型id
             */
            cpuModel?: number | null;
            /**
             * smbios模型id集
             */
            smbiosModel?: string | null;
            /**
             * 备注
             */
            info: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/{adminPath}/updateModelGroup',
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
     * 查询模型组
     * 查询模型组
     * @param adminPath
     * @param modelGroupId
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetModelGroup(
        adminPath: string,
        modelGroupId?: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getModelGroup',
            path: {
                'adminPath': adminPath,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'modelGroupId': modelGroupId,
            },
        });
    }
    /**
     * 分页查询模型组
     * 分页查询模型组
     * @param adminPath
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getGetModelGroupPage(
        adminPath: string,
        page?: number,
        size?: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{adminPath}/getModelGroupPage',
            path: {
                'adminPath': adminPath,
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
     * 获取CPU类型
     * 获取CPU类型
     * @returns any
     * @throws ApiError
     */
    public static getApiCommonCpuType(): CancelablePromise<{
        code: number;
        message: string;
        data: {
            '486': string;
            Conroe: string;
            'Broadwell-IBRS': string;
            'Skylake-Server': string;
            'Broadwell-noTSX-IBRS': string;
            qemu32: string;
            KnightsMill: string;
            athlon: string;
            'IvyBridge-IBRS': string;
            'Icelake-Client-noTSX': string;
            'Cascadelake-Server': string;
            coreduo: string;
            host: string;
            Haswell: string;
            'Skylake-Client': string;
            'Skylake-Server-noTSX-IBRS': string;
            'Icelake-Server-noTSX': string;
            'Haswell-noTSX': string;
            'Skylake-Server-IBRS': string;
            'Icelake-Client': string;
            pentium2: string;
            pentium3: string;
            pentium: string;
            core2duo: string;
            'Haswell-IBRS': string;
            Westmere: string;
            'Icelake-Server': string;
            phenom: string;
            kvm64: string;
            'Skylake-Client-noTSX-IBRS': string;
            IvyBridge: string;
            'Haswell-noTSX-IBRS': string;
            'Nehalem-IBRS': string;
            Broadwell: string;
            EPYC: string;
            kvm32: string;
            'Cascadelake-Server-noTSX': string;
            'EPYC-Rome': string;
            'SandyBridge-IBRS': string;
            'Broadwell-noTSX': string;
            Nehalem: string;
            max: string;
            'EPYC-IBPB': string;
            qemu64: string;
            'EPYC-Milan': string;
            'Skylake-Client-IBRS': string;
            Opteron_G1: string;
            'Westmere-IBRS': string;
            Opteron_G2: string;
            Opteron_G3: string;
            Opteron_G4: string;
            Opteron_G5: string;
            SandyBridge: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/common/cpuType',
        });
    }
    /**
     * 获取OS类型
     * 获取OS类型
     * @returns any
     * @throws ApiError
     */
    public static getApiCommonOsType(): CancelablePromise<{
        code: number;
        message: string;
        data: Array<string>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/common/osType',
        });
    }
    /**
     * 获取OS架构列表
     * 获取OS架构列表
     * @returns any
     * @throws ApiError
     */
    public static getApiCommonOsArch(): CancelablePromise<{
        code: number;
        message: string;
        data: Array<string>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/common/osArch',
        });
    }
    /**
     * 获取系统版本信息
     * 获取系统版本信息
     * @returns any
     * @throws ApiError
     */
    public static getApiCommonVersion(): CancelablePromise<{
        code: number;
        message: string;
        data: {
            buildVersion: string;
            name: string;
            description: string;
            version: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/common/version',
        });
    }
    /**
     * 状态查询
     * 获取状态
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getStatus(
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/status',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 获取版本号
     * 获取版本号
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getVersion(
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/version',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 获取指定目录文件列表
     * 获取指定目录文件列表
     * @param path
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getPathFile(
        path?: string,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pathFile',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'path': path,
            },
        });
    }
    /**
     * 下载文件到指定目录
     * 下载文件到指定目录
     * @param url
     * @param path
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getWget(
        url?: string,
        path?: string,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/wget',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'url': url,
                'path': path,
            },
        });
    }
    /**
     * 重置虚拟机密码
     * 重置虚拟机密码
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postChangePassword(
        authorization?: string,
        requestBody?: {
            /**
             * vmid
             */
            id: number;
            /**
             * 用户名
             */
            username: string;
            /**
             * 新密码
             */
            password: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/changePassword',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 删除指定目录下的指定文件
     * 删除指定目录下的指定文件
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postDeleteFile(
        authorization?: string,
        requestBody?: {
            path: string;
            file: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/deleteFile',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 更新程序
     * 更新程序
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static postUpdate(
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/update',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 导入磁盘到虚拟机
     * 导入磁盘到虚拟机
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postImportDisk(
        authorization?: string,
        requestBody?: {
            vmid: number;
            image_path: string;
            save_path: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/importDisk',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 读取指定目录下文件的内容
     * 读取指定目录下文件的内容
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postReadFile(
        authorization?: string,
        requestBody?: {
            path: string;
            filename: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/readFile',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 创建VNC服务
     * 创建VNC服务
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postVnc(
        authorization?: string,
        requestBody?: {
            /**
             * vnc token目录
             */
            vnc_file_path: string;
            /**
             * 连接地址
             */
            host: string;
            /**
             * 端口
             */
            port: number;
            /**
             * vnc服务用户名
             */
            username: string;
            /**
             * vnc密码
             */
            password: string;
            /**
             * 有效时间，秒
             */
            time: number;
            /**
             * 虚拟机id
             */
            vmid: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vnc',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 停止指定vnc服务
     * 停止指定vnc服务
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postVncStop(
        authorization?: string,
        requestBody?: {
            port: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vnc/stop',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 导入vnc配置信息
     * 导入vnc配置信息
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postVncImport(
        authorization?: string,
        requestBody?: {
            /**
             * vnc token目录
             */
            vnc_file_path: string;
            /**
             * 连接地址
             */
            host: string;
            /**
             * 端口
             */
            port: number;
            /**
             * vnc服务用户名
             */
            username: string;
            /**
             * vnc密码
             */
            password: string;
            /**
             * 有效时间，秒
             */
            time: number;
            /**
             * 虚拟机id
             */
            vmid: number;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vnc/import',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 重启网桥
     * 重启网络配置
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static postRestartNetwork(
        authorization?: string,
    ): CancelablePromise<{
        code: number;
        message: string;
        data: {
            pid: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/restartNetwork',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * 添加端口转发规则
     * 添加端口转发规则
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postNatAdd(
        authorization?: string,
        requestBody?: {
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
            protocol?: 'tcp' | 'udp';
            /**
             * 虚拟机识别id
             */
            vm: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/nat/add',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 删除端口转发规则
     * 删除端口转发规则
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postNatDelete(
        authorization?: string,
        requestBody?: {
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
            protocol?: 'tcp' | 'udp';
            /**
             * 虚拟机识别id
             */
            vm: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/nat/delete',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 获取端口转发规则
     * 获取端口转发规则
     * @param page
     * @param size
     * @param vm
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    public static getNatGetVm(
        page: number,
        size: number,
        vm?: number,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/nat/getVm/{page}/{size}',
            path: {
                'page': page,
                'size': size,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'vm': vm,
            },
        });
    }
    /**
     * 添加端口转发接口
     * 添加端口转发规则
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postNatAddBridge(
        authorization?: string,
        requestBody?: {
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
            protocol?: 'tcp' | 'udp';
            /**
             * 虚拟机识别id
             */
            vm: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/nat/addBridge',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
