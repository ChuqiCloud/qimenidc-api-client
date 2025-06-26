type ApiRequestOptions = {
    readonly method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';
    readonly url: string;
    readonly path?: Record<string, any>;
    readonly cookies?: Record<string, any>;
    readonly headers?: Record<string, any>;
    readonly query?: Record<string, any>;
    readonly formData?: Record<string, any>;
    readonly body?: any;
    readonly mediaType?: string;
    readonly responseHeader?: string;
    readonly errors?: Record<number, string>;
};

type ApiResult = {
    readonly url: string;
    readonly ok: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly body: any;
};

declare class ApiError extends Error {
    readonly url: string;
    readonly status: number;
    readonly statusText: string;
    readonly body: any;
    readonly request: ApiRequestOptions;
    constructor(request: ApiRequestOptions, response: ApiResult, message: string);
}

declare class CancelError extends Error {
    constructor(message: string);
    get isCancelled(): boolean;
}
interface OnCancel {
    readonly isResolved: boolean;
    readonly isRejected: boolean;
    readonly isCancelled: boolean;
    (cancelHandler: () => void): void;
}
declare class CancelablePromise<T> implements Promise<T> {
    #private;
    constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void, onCancel: OnCancel) => void);
    get [Symbol.toStringTag](): string;
    then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null): Promise<T | TResult>;
    finally(onFinally?: (() => void) | null): Promise<T>;
    cancel(): void;
    get isCancelled(): boolean;
}

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;
type OpenAPIConfig = {
    BASE: string;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    CREDENTIALS: 'include' | 'omit' | 'same-origin';
    TOKEN?: string | Resolver<string> | undefined;
    USERNAME?: string | Resolver<string> | undefined;
    PASSWORD?: string | Resolver<string> | undefined;
    HEADERS?: Headers | Resolver<Headers> | undefined;
    ENCODE_PATH?: ((path: string) => string) | undefined;
};
declare const OpenAPI: OpenAPIConfig;

type Config = {
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

type ConfigureTemplate = {
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
};

type CpuInfo = {
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

type ForwardRule = {
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
declare namespace ForwardRule {
    /**
     * tcp或udp
     */
    enum protocol {
        TCP = "tcp",
        UDP = "udp"
    }
}

type Group = {
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

type ModelGroup = {
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
};

type NetWorkParams = {
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

type OS = {
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

type reinstall = {
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
};

type RenewalParams = {
    /**
     * 虚拟机ID
     */
    hostId: number;
    /**
     * 到期时间戳
     */
    expirationTime: number;
};

type SmBios = {
    id: number;
    type?: string | null;
    model: any;
    /**
     * 备注
     */
    info: string;
};

type Subnat = {
    /**
     * IP起始地址
     */
    subnet: string;
    /**
     * 子网掩码
     */
    mask: number;
    /**
     * vnet区域
     */
    vnet: string;
    /**
     * 网关
     */
    gateway: string;
    dns?: string | null;
    /**
     * 1开启。默认0
     */
    snat: number;
};

type VmParams = {
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
};

type VncInfo = {
    id: number;
    hostId: number;
    vmid: number;
    host: string;
    port: number;
    username: string;
    password: string;
};

type vncNode = {
    id: number;
    name: string;
    host: string;
    port: number;
    /**
     * 对外公开的域名
     */
    domain: string;
    /**
     * ssl，默认0不开启
     */
    protocol?: number | null;
    /**
     * 是否开启反向代理或者cdn，开启将不带端口
     */
    proxy?: number | null;
    status: number;
};

type VncParams = {
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
};

type Vnets = {
    /**
     * 名称
     */
    vnet: string;
    /**
     * 所属上级区域名称
     */
    zone: string;
    /**
     * 别称
     */
    alias?: string | null;
    /**
     * vlan
     */
    tag?: string | null;
    /**
     * 恒定vnet
     */
    type?: string | null;
};

type ZonesParams = {
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

declare class Service {
    /**
     * 登陆接口
     * 登陆接口，
     * @param adminPath 后台路径
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postLoginDo(adminPath: string, requestBody?: {
        username: string;
        password: string;
    }): CancelablePromise<any>;
    /**
     * 增加地区
     * 增加地区
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postAddArea(adminPath: string, authorization?: string, requestBody?: {
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
    }): CancelablePromise<{
        code: number;
        message: string;
        data: null;
    }>;
    /**
     * 删除地区
     * 删除地区
     * @param adminPath
     * @param id 删除地区的id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static deleteDeleteArea(adminPath: string, id: string, authorization?: string): CancelablePromise<any>;
    /**
     * 修改地区
     * 修改地区
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putUpdateArea(adminPath: string, authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
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
    static getGetAreaList(adminPath: string, page?: number, limit?: number, authorization?: string): CancelablePromise<{
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
    }>;
    /**
     * 查询指定id的地区
     * 查询指定id的地区
     * @param adminPath
     * @param id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getGetArea(adminPath: string, id: number, authorization?: string): CancelablePromise<{
        code: number;
        message: string;
        data: {
            id: number;
            name: string;
            parent: number;
            realm: number;
        };
    }>;
    /**
     * 添加某节点到指定地区
     * 添加某节点到指定地区
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putAddNodeToArea(adminPath: string, authorization?: string, requestBody?: {
        /**
         * 节点id
         */
        id: number;
        /**
         * 地区id
         */
        area: number;
    }): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }>;
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
    static getGetNodeListByArea(adminPath: string, area: number, page?: number, size?: number, authorization?: string): CancelablePromise<{
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
    }>;
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
    static getGetAreaListByParent(adminPath: string, parent?: number, page?: number, size?: number, authorization?: string): CancelablePromise<any>;
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
    static getGetAreaListByParentIsNull(adminPath: string, page?: number, size?: number, authorization?: string): CancelablePromise<any>;
    /**
     * 获取节点网卡信息
     * 获取节点网卡信息
     * @param adminPath
     * @param nodeId
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getGetPveNodeNetworkInfo(adminPath: string, nodeId?: number, authorization?: string): CancelablePromise<{
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
    }>;
    /**
     * 获取节点网卡配置文件信息
     * 获取节点网卡配置文件信息
     * @param adminPath
     * @param nodeId
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getGetPveNodeInterfaces(adminPath: string, nodeId?: number, authorization?: string): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }>;
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
    static postCreatePveNodeInterface(adminPath: string, nodeId: number, authorization?: string, requestBody?: {
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
    }): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }>;
    /**
     * 查询单个节点状态
     * 查询单个节点状态
     * @param adminPath
     * @param nodeId 节点ID
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getGetNodeInfoByOne(adminPath: string, nodeId: number, authorization?: string): CancelablePromise<{
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
    }>;
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
    static getGetNodeLoadAvg(adminPath: string, nodeId: number, timeframe?: string, cf?: string, authorization?: string): CancelablePromise<{
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
    }>;
    /**
     * 获取节点总数
     * 获取节点总数
     * @param adminPath
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getGetNodeCount(adminPath: string, authorization?: string): CancelablePromise<any>;
    /**
     * 添加PVE主控节点
     * 添加PVE主控集群节点
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postAdminInsertNodeMaster(authorization?: string, requestBody?: {
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
    }): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }>;
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
    static getSelectNodeByPage(adminPath: string, page?: number, size?: number, authorization?: string): CancelablePromise<{
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
    }>;
    /**
     * 修改集群节点信息
     * 修改集群节点信息
     * @param adminPath 后台路径
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putUpdateNodeInfo(adminPath: string, authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
    /**
     * 删除指定ID节点
     * 删除指定ID节点
     * @param adminPath
     * @param nodeId
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static deleteDeleteNodeById(adminPath: string, nodeId?: number, authorization?: string): CancelablePromise<any>;
    /**
     * 添加超管账号
     * 添加超管账号
     * @param adminPath 后台路径
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postRegisterDo(adminPath: string, authorization?: string, requestBody?: {
        phone: string;
        password: string;
        email: string;
        username: string;
        name: string;
    }): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }>;
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
    static getGetSysuser(adminPath: string, page?: number, size?: number, authorization?: string): CancelablePromise<{
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
    }>;
    /**
     * 修改超管账号接口
     * 修改超管账号接口
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postUpdateSysuser(adminPath: string, authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
    /**
     * 根据uuid查询超管
     * 根据uuid查询超管
     * @param adminPath
     * @param uuid
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getGetSysuserByUuid(adminPath: string, uuid?: string, authorization?: string): CancelablePromise<any>;
    /**
     * 删除超管账号
     * 删除超管账号
     * @param adminPath
     * @param id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static deleteDeleteSysUserById(adminPath: string, id: number, authorization?: string): CancelablePromise<any>;
    /**
     * 增加配置模板
     * 增加配置模板
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postAddConfiguretemplate(adminPath: string, authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
    /**
     * 删除配置模板
     * 删除配置模板
     * @param adminPath
     * @param id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static deleteDeleteConfiguretemplate(adminPath: string, id: number, authorization?: string): CancelablePromise<any>;
    /**
     * 修改配置模板
     * 修改配置模板
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putUpdateConfiguretemplate(adminPath: string, authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
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
    static getGetConfiguretemplateByPage(adminPath: string, page?: number, limit?: number, authorization?: string): CancelablePromise<any>;
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
    static putPower(adminPath: string, hostId: number, action: string, authorization?: string, requestBody?: {
        /**
         * 暂停原因
         */
        pauseInfo: string;
    }): CancelablePromise<any>;
    /**
     * 重装虚拟机系统
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putReinstall(adminPath: string, authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
    /**
     * 删除虚拟机
     * @param adminPath
     * @param hostId 非虚拟机vmId，为ID
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static deleteDelete(adminPath: string, hostId: number, authorization?: string): CancelablePromise<any>;
    /**
     * 创建虚拟机
     * 创建虚拟机
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postCreateVm(adminPath: string, authorization?: string, requestBody?: VmParams): CancelablePromise<any>;
    /**
     * 分页获取实例信息
     * @param adminPath
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getGetVmByPage(adminPath: string, page?: number, size?: number, authorization?: string): CancelablePromise<{
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
    }>;
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
    static getGetVmByParam(adminPath: string, page?: number, size?: number, param?: string, value?: string, authorization?: string): CancelablePromise<any>;
    /**
     * 获取虚拟机主机信息
     * @param adminPath
     * @param hostId
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getGetVmHostInfo(adminPath: string, hostId?: number, authorization?: string): CancelablePromise<{
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
    }>;
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
    static getGetVmHostRrdData(adminPath: string, hostId?: number, timeframe?: string, cf?: string, authorization?: string): CancelablePromise<{
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
    }>;
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
    static getGetVnc(adminPath: string, node: string, hostId?: number, page?: number, size?: number, authorization?: string): CancelablePromise<{
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
    }>;
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
    static getGetVmByPageOrderByCreateTime(adminPath: string, page?: number, size?: number, authorization?: string): CancelablePromise<any>;
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
    static getGetVmByStatus(adminPath: string, status?: number, page?: number, size?: number, authorization?: string): CancelablePromise<any>;
    /**
     * 获取指定状态的虚拟机总数
     * 获取指定状态的虚拟机总数
     * @param adminPath
     * @param status 0为开机，详细查看电源管理接口
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getGetVmCountByStatus(adminPath: string, status?: number, authorization?: string): CancelablePromise<any>;
    /**
     * 获取实例总数
     * 获取虚拟机总数
     * @param adminPath
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getGetVmCount(adminPath: string, authorization?: string): CancelablePromise<any>;
    /**
     * 获取被控通讯密钥
     * 获取被控通讯密钥
     * @param adminPath
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getGetControlledSecretKey(adminPath: string, authorization?: string): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }>;
    /**
     * 获取全局虚拟机默认系统盘大小
     * 获取全局虚拟机默认系统盘大小
     * @param adminPath
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getGetVmDefaultDiskSize(adminPath: string, authorization?: string): CancelablePromise<any>;
    /**
     * 修改全局虚拟机默认系统盘大小
     * 修改全局虚拟机默认系统盘大小，该接口支持POST,PUT请求方法
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postUpdateVmDefaultDiskSize(adminPath: string, authorization?: string, requestBody?: {
        /**
         * 单位GB
         */
        Linux: number | null;
        /**
         * 单位GB
         */
        Windows: number | null;
    }): CancelablePromise<{
        code: number;
        message: string;
        data: null;
    }>;
    /**
     * 获取全部配置
     * 获取全部配置
     * @param adminPath
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getGetAllConfig(adminPath: string, authorization?: string): CancelablePromise<any>;
    /**
     * 修改系统配置
     * 修改系统配置
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putUpdateConfig(adminPath: string, authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
    /**
     * 新增smbios信息模型
     * 新增smbios信息模型
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postAddSmbiosInfo(adminPath: string, authorization?: string, requestBody?: {
        type?: string | null;
        model: any;
        /**
         * 备注
         */
        info: string;
    }): CancelablePromise<any>;
    /**
     * 删除smbios信息模型
     * 删除smbios信息模型
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static deleteDeleteSmbiosInfo(adminPath: string, authorization?: string, requestBody?: {
        id: number;
    }): CancelablePromise<any>;
    /**
     * 修改smbios信息模型
     * 修改smbios信息模型
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putUpdateSmbiosInfo(adminPath: string, authorization?: string, requestBody?: {
        id: number;
        type?: string | null;
        model: any;
        /**
         * 备注
         */
        info: string;
    }): CancelablePromise<any>;
    /**
     * 查询smbios信息模型
     * 查询smbios信息模型
     * @param adminPath
     * @param id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getGetSmbiosInfo(adminPath: string, id?: number, authorization?: string): CancelablePromise<any>;
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
    static getGetSmbiosInfoList(adminPath: string, page?: number, limit?: number, authorization?: string): CancelablePromise<any>;
    /**
     * 添加模型组
     * 添加模型组
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postAddModelGroup(adminPath: string, authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
    /**
     * 删除模型组
     * 删除模型组
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static deleteDeleteModelGroup(adminPath: string, authorization?: string, requestBody?: {
        id: number;
    }): CancelablePromise<any>;
    /**
     * 修改模型组
     * 修改模型组
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putUpdateModelGroup(adminPath: string, authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
    /**
     * 查询模型组
     * 查询模型组
     * @param adminPath
     * @param modelGroupId
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getGetModelGroup(adminPath: string, modelGroupId?: number, authorization?: string): CancelablePromise<any>;
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
    static getGetModelGroupPage(adminPath: string, page?: number, size?: number, authorization?: string): CancelablePromise<any>;
    /**
     * 获取CPU类型
     * 获取CPU类型
     * @returns any
     * @throws ApiError
     */
    static getApiCommonCpuType(): CancelablePromise<{
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
    }>;
    /**
     * 获取OS类型
     * 获取OS类型
     * @returns any
     * @throws ApiError
     */
    static getApiCommonOsType(): CancelablePromise<{
        code: number;
        message: string;
        data: Array<string>;
    }>;
    /**
     * 获取OS架构列表
     * 获取OS架构列表
     * @returns any
     * @throws ApiError
     */
    static getApiCommonOsArch(): CancelablePromise<{
        code: number;
        message: string;
        data: Array<string>;
    }>;
    /**
     * 获取系统版本信息
     * 获取系统版本信息
     * @returns any
     * @throws ApiError
     */
    static getApiCommonVersion(): CancelablePromise<{
        code: number;
        message: string;
        data: {
            buildVersion: string;
            name: string;
            description: string;
            version: string;
        };
    }>;
    /**
     * 状态查询
     * 获取状态
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getStatus(authorization?: string): CancelablePromise<any>;
    /**
     * 获取版本号
     * 获取版本号
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getVersion(authorization?: string): CancelablePromise<any>;
    /**
     * 获取指定目录文件列表
     * 获取指定目录文件列表
     * @param path
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getPathFile(path?: string, authorization?: string): CancelablePromise<any>;
    /**
     * 下载文件到指定目录
     * 下载文件到指定目录
     * @param url
     * @param path
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getWget(url?: string, path?: string, authorization?: string): CancelablePromise<any>;
    /**
     * 重置虚拟机密码
     * 重置虚拟机密码
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postChangePassword(authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
    /**
     * 删除指定目录下的指定文件
     * 删除指定目录下的指定文件
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postDeleteFile(authorization?: string, requestBody?: {
        path: string;
        file: string;
    }): CancelablePromise<any>;
    /**
     * 更新程序
     * 更新程序
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static postUpdate(authorization?: string): CancelablePromise<any>;
    /**
     * 导入磁盘到虚拟机
     * 导入磁盘到虚拟机
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postImportDisk(authorization?: string, requestBody?: {
        vmid: number;
        image_path: string;
        save_path: string;
    }): CancelablePromise<any>;
    /**
     * 读取指定目录下文件的内容
     * 读取指定目录下文件的内容
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postReadFile(authorization?: string, requestBody?: {
        path: string;
        filename: string;
    }): CancelablePromise<any>;
    /**
     * 创建VNC服务
     * 创建VNC服务
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postVnc(authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
    /**
     * 停止指定vnc服务
     * 停止指定vnc服务
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postVncStop(authorization?: string, requestBody?: {
        port: number;
    }): CancelablePromise<any>;
    /**
     * 导入vnc配置信息
     * 导入vnc配置信息
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postVncImport(authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
    /**
     * 重启网桥
     * 重启网络配置
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static postRestartNetwork(authorization?: string): CancelablePromise<{
        code: number;
        message: string;
        data: {
            pid: number;
        };
    }>;
    /**
     * 添加端口转发规则
     * 添加端口转发规则
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postNatAdd(authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
    /**
     * 删除端口转发规则
     * 删除端口转发规则
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postNatDelete(authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
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
    static getNatGetVm(page: number, size: number, vm?: number, authorization?: string): CancelablePromise<any>;
    /**
     * 添加端口转发接口
     * 添加端口转发规则
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postNatAddBridge(authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
}

declare class ApiService {
    /**
     * 添加API key
     * 新增api key，该appkey只会本次显示，后续查询将不显示
     * @param adminPath 后台路径
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postInsertApiKey(adminPath: string, authorization?: string, requestBody?: {
        /**
         * 备注
         */
        info?: string | null;
    }): CancelablePromise<{
        code: number;
        message: string;
        data: {
            id: number;
            appid: string;
            appkey: string;
            info: string;
            createDate: number;
        };
    }>;
    /**
     * 分页获取API信息
     * 分页获取API信息
     * @param adminPath 后台路径
     * @param page 页码
     * @param size 每页数据量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getSelectApiByPage(adminPath: string, page?: number, size?: number, authorization?: string): CancelablePromise<{
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
    }>;
    /**
     * 删除指定ID的API key
     * 删除指定ID的API key，可以post请求
     * @param adminPath 后台路径
     * @param id api id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static deleteDeleteApi(adminPath: string, id?: number, authorization?: string): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }>;
    /**
     * 停用指定API
     * 停用指定API
     * @param adminPath
     * @param id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static putDisableApi(adminPath: string, id: number, authorization?: string): CancelablePromise<any>;
    /**
     * 启用指定API
     * 启用指定API
     * @param adminPath
     * @param id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static putEnableApi(adminPath: string, id: number, authorization?: string): CancelablePromise<any>;
    /**
     * 修改指定虚拟机的VNC密码
     * 修改指定虚拟机的VNC密码
     * @param node
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putApiV1UpdateVncPassword(node: string, authorization?: string, requestBody?: {
        hostId: number;
        password: string;
    }): CancelablePromise<any>;
    /**
     * 创建虚拟机
     * 创建虚拟机
     * @param nodeType 虚拟化平台，目前只有pve
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postApiV1CerateVm(nodeType: string, requestBody?: {
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
    }): CancelablePromise<{
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
    }>;
    /**
     * 虚拟机电源状态管理
     * 虚拟机电源状态管理，action类型有start=开机、stop=关机、reboot=重启、shutdown=强制关机、suspend=挂起、resume=恢复、pause=暂停、unpause=恢复
     * @param nodeType 虚拟化平台，目前只有pve
     * @param hostId 数据库中虚拟机ID（非vmid）
     * @param action action类型有start、stop、reboot、shutdown
     * @returns any
     * @throws ApiError
     */
    static putApiV1Power(nodeType: string, hostId: string, action: string): CancelablePromise<{
        code: number;
        message: string;
        data: string | null;
    }>;
    /**
     * 重装系统
     * 重装系统
     * @param nodeType
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putApiV1Reinstall(nodeType: string, requestBody?: {
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
    }): CancelablePromise<any>;
    /**
     * 删除虚拟机
     * 删除虚拟机
     * @param nodeType
     * @param hostId 这里不能为vmId
     * @returns any
     * @throws ApiError
     */
    static deleteApiV1Delete(nodeType: string, hostId: number): CancelablePromise<any>;
    /**
     * 修改虚拟机密码
     * 修改虚拟机密码
     * @param nodeType
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putApiV1UpdateVmConfigRestPassword(nodeType: string, requestBody?: {
        /**
         * 虚拟机的ID
         */
        hostId: number;
        /**
         * 新密码
         */
        newPassword: string;
    }): CancelablePromise<any>;
    /**
     * 续期
     * 续期
     * @param nodeType
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putApiV1UpdateVmConfigRenewal(nodeType: string, requestBody?: {
        /**
         * 虚拟机ID
         */
        hostId: number;
        /**
         * 到期时间戳
         */
        expirationTime: number;
    }): CancelablePromise<any>;
    /**
     * 获取指定虚拟机数据
     * current字段为当前运行实时监控数据，rrddata为历史数据，历史数据默认为一天
     * @param nodeType 虚拟化平台，目前只有pve
     * @param hostId 虚拟机ID（可以vmid或者键ID）
     * @returns any
     * @throws ApiError
     */
    static getApiV1GetVmInfo(nodeType: string, hostId?: number): CancelablePromise<{
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
    }>;
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
    static getApiV1GetVnc(node: string, hostId?: number, page?: number, size?: number, authorization?: string): CancelablePromise<{
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
    }>;
    /**
     * 通讯测试
     * 通讯测试
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getApiV1Status(authorization?: string): CancelablePromise<any>;
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
    static getApiV1GetVmByPage(node: string, page?: number, size?: number, authorization?: string): CancelablePromise<{
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
    }>;
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
    static getApiV1GetVmByParam(node: string, page?: number, size?: number, param?: string, value?: string, authorization?: string): CancelablePromise<any>;
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
    static getApiV1GetVmByPageOrderByCreateTime(node: string, page?: number, size?: number, authorization?: string): CancelablePromise<any>;
    /**
     * 获取实例总数
     * 获取虚拟机总数
     * @param node
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getApiV1GetVmCount(node: string, authorization?: string): CancelablePromise<any>;
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
    static getApiV1GetVmHostRrdData(node: string, hostId?: number, timeframe?: string, cf?: string, authorization?: string): CancelablePromise<{
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
    }>;
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
    static getApiV1GetVmByStatus(node: string, status?: number, page?: number, size?: number, authorization?: string): CancelablePromise<any>;
    /**
     * 获取指定状态的虚拟机总数
     * 获取指定状态的虚拟机总数
     * @param node
     * @param status 0为开机，详细查看电源管理接口
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getApiV1GetVmCountByStatus(node: string, status?: number, authorization?: string): CancelablePromise<any>;
}

declare class ApiNatService {
    /**
     * 添加虚拟机NAT规则
     * @param nodeType
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postApiV1NatAdd(nodeType: string, authorization?: string, requestBody?: {
        source_port: number;
        destination_ip: string;
        destination_port: number;
        protocol: string;
        vm: string;
    }): CancelablePromise<{
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
    }>;
    /**
     * 删除虚拟机NAT规则
     * @param nodeType
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postApiV1NatDel(nodeType: string, authorization?: string, requestBody?: {
        source_port: number;
        destination_ip: string;
        destination_port: number;
        protocol: string;
        vm: string;
    }): CancelablePromise<{
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
    }>;
    /**
     * 获取虚拟机NAT规则
     * @param nodeType
     * @param page
     * @param size
     * @param hostId
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getApiV1NatGetVm(nodeType: string, page?: number, size?: number, hostId?: number, authorization?: string): CancelablePromise<{
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
    }>;
    /**
     * 获取虚拟机NAT相关信息
     * @param nodeType
     * @param hostId
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getApiV1PveNatGetInfo(nodeType: string, hostId?: number, authorization?: string): CancelablePromise<{
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
    }>;
}

declare class CpuService {
    /**
     * 新增cpu信息模型
     * 新增cpu信息模型
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postAddCpuInfo(adminPath: string, authorization?: string, requestBody?: {
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
    }): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }>;
    /**
     * 删除cpu信息模型
     * 删除cpu信息模型
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static deleteDeleteCpuInfo(adminPath: string, authorization?: string, requestBody?: {
        id?: number | null;
    }): CancelablePromise<any>;
    /**
     * 修改cpu信息模型
     * 修改cpu信息模型
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putUpdateCpuInfo(adminPath: string, authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
    /**
     * 查询cpu信息模型
     * 查询cpu信息模型
     * @param adminPath
     * @param id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getSelectCpuInfo(adminPath: string, id: number, authorization?: string): CancelablePromise<any>;
    /**
     * 分页查询cpu信息模型
     * 分页查询cpu信息模型
     * @param adminPath
     * @param page
     * @param limit
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getSelectCpuInfoPage(adminPath: string, page?: number, limit?: number, authorization?: string): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id?: number;
                cpu?: null;
                name?: string;
                family?: number;
                model?: number;
                stepping?: number;
                level?: string;
                xlevel?: string;
                vendor?: string;
                l3Cache?: boolean;
                other?: null;
                createDate?: number;
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
    }>;
}

declare class IpService {
    /**
     * 根据掩码位批量插入IP
     * 根据掩码位批量插入IP到IP池，并创建IP池
     * @param adminPath 后台路径
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postInsertIpPoolByMask(adminPath: string, authorization?: string, requestBody?: {
        /**
         * 池名
         */
        poolName: string;
        /**
         * 绑定节点ID
         */
        nodeId: number;
        /**
         * ip类型，0:经典，1:nat，2:专用
         */
        ipType?: number | null;
        /**
         * 网关
         */
        gateway: string;
        /**
         * 掩码位，如：24
         */
        mask: number;
        dns1: string;
        dns2: string;
    }): CancelablePromise<any>;
    /**
     * 根据IP范围批量插入IP
     * 根据IP范围批量插入IP到已创建的IP池
     * @param adminPath 后台路径
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postInsertIpPoolByRange(adminPath: string, authorization?: string, requestBody?: {
        /**
         * IP池ID
         */
        poolId: number;
        /**
         * 起始IP
         */
        startIp: string;
        /**
         * 结束IP
         */
        endIp: string;
        /**
         * dns1
         */
        dns1: string;
        /**
         * dns2
         */
        dns2: string;
    }): CancelablePromise<any>;
    /**
     * 分页查询IP池列表
     * 分页查询IP池列表
     * @param adminPath 后台路径
     * @param page 页码
     * @param size 页数据量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getSelectIpPoolList(adminPath: string, page?: number, size?: number, authorization?: string): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id: number;
                name: string;
                gateway: string;
                mask: number;
                dns1: string;
                dns2: string;
                available: null;
                used: null;
                disable: null;
                nodeid: number;
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
    }>;
    /**
     * 查询指定IP池下的IP列表
     * 查询指定IP池下的IP列表
     * @param adminPath 后台路径
     * @param poolid IP池ID
     * @param page 页码
     * @param size 页数量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getSelectIpListByPoolId(adminPath: string, poolid?: number, page?: number, size?: number, authorization?: string): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id: number;
                nodeId: number;
                vmId: null;
                poolId: number;
                ip: string;
                subnetMask: string;
                gateway: string;
                dns1: string;
                dns2: string;
                status: number;
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
    }>;
    /**
     * 更新IP池信息
     * 更新IP池信息，支持post请求
     * @param adminPath 后台路径
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putUpdateIpPool(adminPath: string, authorization?: string, requestBody?: {
        id: number;
        name?: string | null;
        gateway?: string | null;
        mask?: number | null;
        dns1?: string | null;
        dns2?: string | null;
        /**
         * 节点ID
         */
        nodeid?: number | null;
    }): CancelablePromise<any>;
    /**
     * 修改IP信息
     * 修改IP信息，可多个，支持post请求
     * @param adminPath 后台路径
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putUpdateIp(adminPath: string, authorization?: string, requestBody?: Array<{
        id: number;
        nodeId?: number | null;
        vmId?: number | null;
        poolId?: number | null;
        subnetMask?: string | null;
        gateway?: string | null;
        dns1?: string | null;
        dns2?: string | null;
        /**
         * 0正常1正在使用2停止
         */
        status?: number | null;
    }>): CancelablePromise<any>;
    /**
     * 删除指定IP池
     * 删除指定IP池
     * @param adminPath
     * @param poolId ip池ID
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static deleteDeleteIpPool(adminPath: string, poolId: number, authorization?: string): CancelablePromise<any>;
}

declare class NatService {
    /**
     * PVE主控创建NAT
     * 添加PVE主控集群节点
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postAdminAddNodeMasterNat(authorization?: string, requestBody?: {
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
    }): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }>;
    /**
     * 添加虚拟机NAT规则
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postNatAdd(adminPath: string, authorization?: string, requestBody?: {
        source_port: number;
        destination_ip: string;
        destination_port: number;
        protocol: string;
        vm: string;
    }): CancelablePromise<{
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
    }>;
    /**
     * 删除虚拟机NAT规则
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postNatDel(adminPath: string, authorization?: string, requestBody?: {
        source_port: number;
        destination_ip: string;
        destination_port: number;
        protocol: string;
        vm: string;
    }): CancelablePromise<{
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
    }>;
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
    static getNatGetVm(adminPath: string, page?: number, size?: number, hostId?: number, authorization?: string): CancelablePromise<{
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
    }>;
    /**
     * 获取虚拟机NAT相关信息
     * @param adminPath
     * @param hostId
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getNatGetInfo(adminPath: string, hostId?: number, authorization?: string): CancelablePromise<{
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
    }>;
}

declare class OsService {
    /**
     * 获取在线系统列表
     * 获取在线系统列表
     * @param adminPath 后台路径
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getSelectOsByOnline(adminPath: string, page?: number, size?: number, authorization?: string): CancelablePromise<any>;
    /**
     * 激活在线OS
     * 激活在线OS到数据库
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postActiveOsByOnline(adminPath: string, authorization?: string, requestBody?: {
        /**
         * 镜像文件全名
         */
        fileName: string;
    }): CancelablePromise<any>;
    /**
     * 手动新增OS
     * 新增OS
     * @param adminPath 后台路径
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postInsertOs(adminPath: string, authorization?: string, requestBody?: {
        /**
         * 系统名称（别称，可自定义）
         */
        name: string;
        /**
         * 文件全称，带后缀
         */
        fileName: string;
        /**
         * 镜像类型（win，linux）
         */
        type: string;
        /**
         * 镜像架构（默认x86_64）[x86_64,arm64,arm64,armhf,ppc64el,riscv64,s390x,aarch64,armv7l]
         */
        arch?: string | null;
        /**
         * 镜像系统类别名称，type为linux时必须填写[centos,debian,ubuntu,alpine,fedora,opensuse,ubuntukylin,other]
         */
        osType?: string | null;
        /**
         * 添加类型（0=自动下载;1=手动上传），为0时url参数不能为空
         */
        downType: number;
        /**
         * 下载地址（downType为0时禁止为空）
         */
        url?: string | null;
        /**
         * pve节点下储存路径，值为空或default则默认为/home/images
         */
        path?: string | null;
        /**
         * 是否开启cloud-init（0=未开启，1=开启，默认为0）
         */
        cloud?: number | null;
    }): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }>;
    /**
     * 分页获取已添加OS
     * 分页获取已添加OS
     * @param adminPath
     * @param page 页码
     * @param size 每页数据量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getSelectOsByPage(adminPath: string, page?: number, size?: number, authorization?: string): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id?: number;
                name?: string;
                fileName?: string;
                type?: string;
                arch?: string;
                osType?: string;
                nodeStatus?: null;
                downType?: number;
                url?: string;
                size?: string;
                path?: string;
                cloud?: number;
                status?: number;
                createTime?: number;
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
    }>;
    /**
     * 分页带条件获取已添加os
     * 分页带条件获取已添加os，该接口为模糊匹配
     * @param adminPath
     * @param param 匹配参数
     * @param value 匹配值
     * @param page 页码
     * @param size 每页数据量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getSelectOsByPageAndCondition(adminPath: string, param: string, value: string, page?: number, size?: number, authorization?: string): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id?: number;
                name?: string;
                fileName?: string;
                type?: string;
                arch?: string;
                osType?: string;
                nodeStatus?: null;
                downType?: number;
                url?: string;
                size?: string;
                path?: string;
                cloud?: number;
                status?: number;
                createTime?: number;
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
    }>;
    /**
     * 下载镜像
     * 下载指定id镜像到指定节点
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postDownloadOs(adminPath: string, authorization?: string, requestBody?: {
        /**
         * 镜像id
         */
        osId: number;
        /**
         * 节点id
         */
        nodeId: number;
    }): CancelablePromise<any>;
    /**
     * 删除os
     * 删除os
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static deleteDeleteOs(adminPath: string, authorization?: string, requestBody?: {
        osId: number;
    }): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }>;
    /**
     * 修改os
     * 修改os
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putUpdateOs(adminPath: string, authorization?: string, requestBody?: {
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
    }): CancelablePromise<any>;
}

declare class SdnService {
    /**
     * 添加sdn区域
     * 添加sdn区域
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postSdnAddZone(adminPath: string, authorization?: string, requestBody?: {
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
    }): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }>;
    /**
     * 根据id删除sdn区域
     * 根据id删除sdn区域
     * @param adminPath
     * @param id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static deleteSdnDeleteZoneById(adminPath: string, id: number, authorization?: string): CancelablePromise<any>;
    /**
     * 根据标识zone删除sdn区域
     * 根据标识zone删除sdn区域
     * @param adminPath
     * @param zone
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static deleteSdnDeleteZoneByZone(adminPath: string, zone: string, authorization?: string): CancelablePromise<{
        code: number;
        message: string;
        data: null;
    }>;
    /**
     * 查询sdn区域列表
     * 查询sdn区域列表
     * @param adminPath
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getSdnGetZonesByPage(adminPath: string, page?: number, size?: number, authorization?: string): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<string>;
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
    }>;
}

declare class SdnVnetsService {
    /**
     * 添加vnet区域
     * 添加vnet区域
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postSdnAddVnet(adminPath: string, authorization?: string, requestBody?: {
        /**
         * 名称
         */
        vnet: string;
        /**
         * 所属上级区域名称
         */
        zone: string;
        /**
         * 别称
         */
        alias?: string | null;
        /**
         * vlan
         */
        tag?: string | null;
        /**
         * 恒定vnet
         */
        type?: string | null;
    }): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }>;
    /**
     * 查询vnet列表
     * 查询vnet列表
     * @param adminPath
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getSdnGetVnetsByPage(adminPath: string, page?: number, size?: number, authorization?: string): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id?: number;
                vnet?: string;
                zone?: string;
                alias?: null;
                tag?: null;
                type?: string;
                state?: string;
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
    }>;
}

declare class SdnVnetsSubnetsService {
    /**
     * 添加子网
     * 添加子网
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postSdnAddSubnet(adminPath: string, authorization?: string, requestBody?: {
        /**
         * IP起始地址
         */
        subnet: string;
        /**
         * 子网掩码
         */
        mask: number;
        /**
         * vnet区域
         */
        vnet: string;
        /**
         * 网关
         */
        gateway: string;
        dns?: string | null;
        /**
         * 1开启。默认0
         */
        snat: number;
    }): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }>;
    /**
     * 根据vnet查询subnet列表
     * 根据vnet查询subnet列表
     * @param adminPath
     * @param vnet vnet 名
     * @param page
     * @param size
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getSdnGetSubnets(adminPath: string, vnet: string, page?: number, size?: number, authorization?: string): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id: number;
                nodeid: null;
                subnet: string;
                type: string;
                vnet: string;
                gateway: string;
                mask: number;
                dns: string;
                snat: number;
                available: null;
                used: null;
                disable: null;
                state: string;
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
    }>;
}

declare class VncService {
    /**
     * 增加vnc控制器节点
     * 增加vnc控制器节点
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static postAddVncNode(adminPath: string, authorization?: string, requestBody?: {
        id: number;
        name: string;
        host: string;
        port: number;
        /**
         * 对外公开的域名
         */
        domain: string;
        /**
         * ssl，默认0不开启
         */
        protocol?: number | null;
        /**
         * 是否开启反向代理或者cdn，开启将不带端口
         */
        proxy?: number | null;
        status: number;
    }): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }>;
    /**
     * 删除vnc控制器节点
     * 删除vnc控制器节点
     * @param adminPath
     * @param id
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static deleteDeleteVncNode(adminPath: string, id?: number, authorization?: string): CancelablePromise<{
        code: number;
        message: string;
        data: string;
    }>;
    /**
     * 修改vnc控制器节点
     * 修改vnc控制器节点
     * @param adminPath
     * @param authorization
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    static putUpdateVncNode(adminPath: string, authorization?: string, requestBody?: {
        id: number;
        name: string;
        host: string;
        port: number;
        /**
         * 对外公开的域名
         */
        domain: string;
        /**
         * ssl，默认0不开启
         */
        protocol?: number | null;
        /**
         * 是否开启反向代理或者cdn，开启将不带端口
         */
        proxy?: number | null;
        status: number;
    }): CancelablePromise<any>;
    /**
     * 分页查询vnc控制器节点
     * 分页查询vnc控制器节点
     * @param adminPath
     * @param page 页码
     * @param size 页数据量
     * @param authorization
     * @returns any
     * @throws ApiError
     */
    static getSelectVncNodePage(adminPath: string, page?: number, size?: number, authorization?: string): CancelablePromise<{
        code: number;
        message: string;
        data: {
            records: Array<{
                id?: number;
                name?: string;
                host?: string;
                port?: number;
                domain?: string;
                status?: number;
                createDate?: number;
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
    }>;
}

export { ApiError, ApiNatService, ApiService, CancelError, CancelablePromise, CpuService, ForwardRule, IpService, NatService, OpenAPI, OsService, SdnService, SdnVnetsService, SdnVnetsSubnetsService, Service, VncService };
export type { Config, ConfigureTemplate, CpuInfo, Group, ModelGroup, NetWorkParams, OS, OpenAPIConfig, RenewalParams, SmBios, Subnat, VmParams, VncInfo, VncParams, Vnets, ZonesParams, reinstall, vncNode };
