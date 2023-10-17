<template>
    <base-dialog ref="baseDialogRef" width="560px" :title="getDialogTitle" @save="handleSave">
        <base-form ref="baseFormRef" :columns="getColumn" :rules="userRules" :model="state.formModel">
            <template #menuIds>
                <el-tree
                    ref="roleTreeRef"
                    node-key="value"
                    highlight-current
                    :data="state.treeData"
                    :props="state.defaultProps"
                    show-checkbox
                    @check-change="menuCheckChage"
                    :default-checked-keys="getCheckedKeys"
                    :expand-on-click-node="false"
                >
                </el-tree>
            </template>
        </base-form>
    </base-dialog>
</template>

<script lang="ts" setup>
import { useColumn } from "../column";
import { useMessage } from "@/hooks";
import { addRole, editRole } from "@/api/system/role";
import { listPermission, bindPermission } from "@/api/system/permission";

const emit = defineEmits(["success"]);

const { success } = useMessage();

const baseDialogRef = ref();

const baseFormRef = ref();

const roleTreeRef = ref();

const state = reactive({
    isEdit: false,
    treeData: [],
    defaultProps: {
        children: "children",
        label: "label"
    },
    formModel: { roleNo: "" }
});
const digui = (data: [any]) => {
    const arr: any[] = [];
    for (let index = 0; index < data.length; index++) {
        const element = data[index].children;
        for (let j = 0; j < element.length; j++) {
            const elementJ: {
                [x: string]: boolean;
                activated: boolean;
                value: any;
            } = element[j];
            if (elementJ.activated === true) {
                arr.push(elementJ.value);
            }
            if (elementJ.disabled === true) {
                arr.push(elementJ.value);
            }
        }
    }
    return arr;
};

const getColumn = computed(() => {
    return useColumn(undefined, state).dialogColumn;
});

const getCheckedKeys = computed(() => {
    return digui(state.treeData as any);
});

const userRules = {
    roleName: [
        {
            required: true,
            message: "请输入角色名称",
            trigger: ["blur", "change"]
        }
    ],
    roleNo: [
        {
            required: true,
            message: "请输入角色标识",
            trigger: ["blur", "change"]
        }
    ]
    // menuIds: [
    //     {
    //         type: "array",
    //         required: true,
    //         message: "请选择菜单",
    //         trigger: ["blur", "change"]
    //     }
    // ]
};
const menuCheckChage = (data: any, isChecked: boolean) => {
    if (data.children === undefined) {
        bindPermission({
            roleNo: state.formModel.roleNo,
            permission: data.value,
            bind: isChecked
        });
    }
};
const getDialogTitle = computed(() => (state.isEdit ? "修改角色" : "新增角色"));

const showDialog = (val: any = {}) => {
    unref(baseDialogRef).showDialog();
    nextTick(async () => {
        unref(baseFormRef).instance.resetFields();
        state.isEdit = !!val.id;
        if (state.isEdit) {
            Object.assign(state.formModel, val);
            state.treeData = (await listPermission(val.roleNo)) as any;
            unref(roleTreeRef).setCheckedKeys(val.menuIds);
        } else {
            unref(roleTreeRef).setCheckedKeys([]);
        }
    });
};

const hideDialog = () => {
    unref(baseDialogRef).hideDialog();
};

const handleSave = async (loading: (flag: boolean) => void) => {
    Object.assign(state.formModel, {
        menuIds: unref(roleTreeRef).getCheckedKeys()
    });
    await unref(baseFormRef).instance.validate(async (valid: boolean) => {
        if (!valid) return;
        loading(true);
        try {
            state.isEdit ? await editRole(state.formModel) : await addRole(state.formModel);
            success(state.isEdit ? "修改成功" : "新增成功！");
            emit("success");
            hideDialog();
        } finally {
            loading(false);
        }
    });
};

defineExpose({
    showDialog,
    hideDialog
});
</script>

<style scoped></style>
