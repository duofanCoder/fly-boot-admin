import {FormColumnType} from "@/components/base-form";
import {FormTypeEnum} from "@/enums/componentEnum";
import {Column} from "@/components/base-table/src/types";
import {StatusData} from "@/constant/basic";
import {tr} from "element-plus/es/locale";

export function useColumn(action?: any, dialog?: any) {
    const filterColumn: FormColumnType[] = [
        {
            fieldName: "roleName",
            fieldDesc: "角色名称",
            fieldType: FormTypeEnum.INPUT
        },
        {
            fieldName: "roleNo",
            fieldDesc: "角色标识",
            fieldType: FormTypeEnum.INPUT
        },
        {
            fieldName: "isLocked",
            fieldDesc: "状态",
            fieldType: FormTypeEnum.SELECT,
            config: {
                options: StatusData
            }
        }
    ];

    const tableColumn: Column[] = [
        {
            fieldName: "roleName",
            fieldDesc: "角色名称"
        },
        {
            fieldName: "roleNo",
            fieldDesc: "角色标识",
            formType: "tag"
        },
        {
            fieldName: "isEnabled",
            fieldDesc: "状态",
            formType: "switch",
            callFunction: action?.changeSwitch
        },
        {
            fieldName: "createTime",
            fieldDesc: "创建时间",
            width: 160
        },
        {
            fieldName: "remark",
            fieldDesc: "备注",
            showOverflowTooltip: true
        },
        {
            fieldName: "#",
            fieldDesc: "操作",
            formType: "operation",
            width: 175,
            fixed: "right",
            operation: [
                {
                    icon: "edit",
                    label: "编辑",
                    callFunction: action?.edit
                },
                {
                    icon: "delete",
                    label: "删除",
                    confirm: true,
                    callFunction: action?.delete
                }
            ]
        }
    ];

    const dialogColumn: FormColumnType[] = [
        {
            fieldName: "roleName",
            fieldDesc: "角色名称",
            fieldType: FormTypeEnum.INPUT
        },
        {
            fieldName: "roleNo",
            fieldDesc: "角色标识",
            fieldType: FormTypeEnum.INPUT,
            config: {
                disabled: dialog?.isEdit
            }
        },
        {
            fieldName: "menuIds",
            fieldDesc: "菜单",
            fieldType: FormTypeEnum.SLOT
        },
        {
            fieldName: "remark",
            fieldDesc: "备注",
            fieldType: FormTypeEnum.INPUT,
            config: {
                type: "textarea"
            }
        }
    ];

    return {
        filterColumn,
        tableColumn,
        dialogColumn
    };
}
