<template>
    <div class="system-dict-container">
        <base-page-table table-title="错误日志" :filter-config="filterConfig" :table-config="tableConfig">
            <template #buttons>
                <base-button type="primary" @click="addAjaxError">触发一个ajax错误</base-button>
                <base-button type="primary" @click="addVueError">触发一个vue错误</base-button>
            </template>
        </base-page-table>
    </div>
</template>

<script lang="ts" setup>
import { useColumn } from "./column";
import { getErrorList, testErrorApi } from "@/api/log";
import { useErrorLogStoreWithOut } from "@/stores/modules/errorLog";

const { tableColumn, filterColumn } = useColumn();

const errorLogStore = useErrorLogStoreWithOut();

const filterConfig = reactive({
    columns: filterColumn,
    onSearch: handleSearch,
    showOpen: true,
    searchInfo: {}
});

const tableConfig = reactive({
    columns: tableColumn,
    data: [],
    pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
    },
    onRefresh: handleSearch
});

onMounted(() => {
    handleSearch();
});

/**
 * 查询
 */
async function handleSearch() {
    const { pageCount, pageSize,pageIndex } = tableConfig.pagination;
    const data = await getErrorList({ ...filterConfig.searchInfo, pageIndex, pageSize });
    tableConfig.data = res.data.list;
    tableConfig.pagination.pageCount = data.pageCount;
}

const addAjaxError = async () => {
    try {
        await testErrorApi();
    } catch {
        setTimeout(() => {
            handleSearch();
        }, 100);
    }
};

const addVueError = () => {
    setTimeout(() => {
        handleSearch();
    }, 100);
    const a: any = null;
    a.b = 5;
};
</script>

<style lang="scss" scoped></style>
