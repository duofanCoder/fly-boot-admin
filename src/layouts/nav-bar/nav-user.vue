<template>
    <el-dropdown class="pointer box-hover action-item" trigger="click">
        <div class="flex-row-center">
            <el-avatar :size="36" :src="headImg" />
            <span class="ml10">{{ getUserInfo.username }}</span>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="resetPassword"><base-icon svg-name="location" class="mr5" /> 修改密码</el-dropdown-item>
                <el-dropdown-item divided @click="logout"><base-icon svg-name="exit" class="mr5" />退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts" setup>
import headImg from "@/assets/images/user/headImg.gif";
import { useNavBarSetting } from "../hooks/useNavBarSetting";

const { getUserInfo, logout } = useNavBarSetting();

const resetPassword = () => {
    console.log("resetPassword");
};
</script>

<style scoped></style>
