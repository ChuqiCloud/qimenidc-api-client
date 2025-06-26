/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VmParams = {
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

