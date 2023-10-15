<template>
    <div class="system-dict-container">
        <base-page-table table-title="登录日志" :filter-config="filterConfig" :table-config="tableConfig"> </base-page-table>
    </div>
</template>

<script lang="ts" setup>
import { useColumn } from "./column";
import { getLoginList } from "@/api/log";

const { tableColumn, filterColumn } = useColumn();

const filterConfig = reactive({
    columns: filterColumn,
    onSearch: handleSearch,
    showOpen: false,
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
    const data = await getLoginList({ ...filterConfig.searchInfo, pageIndex, pageSize });
    tableConfig.data = res.data.list;
    tableConfig.pagination.pageCount = data.pageCount;
}
</script>

<style lang="scss" scoped></style>
