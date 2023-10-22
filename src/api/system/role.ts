import request from "@/utils/request";

export enum Api {
    ROLE_LIST = "/api/v1/role/page",
    ROLE_ALL_LIST = "/api/v1/dict/list?type=",
    ADD_ROLE = "/api/v1/role/create",
    EDIT_ROLE = "/api/v1/role/update",
    DELETE_ROLE = "/api/v1/role/remove",
    CHANGE_ROLE_STATUS = "/role/changeStatus",
    FLY_OPERATION_LIST = "/api/v1/operation"
}

export const getRoleList = (data?: any) => request.post(Api.ROLE_LIST, data);

export const getDict = (type:string) => request.post(Api.ROLE_ALL_LIST+type);

export const addRole = (data?: any) => request.post(Api.ADD_ROLE, data);

export const deleteRole = (data?: any) => request.post(Api.DELETE_ROLE, data);

export const editRole = (data?: any) => request.post(Api.EDIT_ROLE, data);

export const changeRoleStatus = (data?: any) => request.post(Api.CHANGE_ROLE_STATUS, data);


