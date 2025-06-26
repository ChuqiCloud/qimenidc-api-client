/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type reinstall = {
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

