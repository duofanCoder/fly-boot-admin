import type {AppRouteType} from "@/router/types";

const system: AppRouteType[] = [
    {
        path: "/system",
        name: "System",
        component: () => import("@/layouts/index.vue"),
        redirect: "/system/account",
        meta: {
            title: "系统管理",
            icon: "svg-setting",
            sort: 10,
            permission: "ROLE_ADMIN"
        },
        children: [
            {
                path: "account",
                name: "Account",
                component: () => import("@/views/system/account/index.vue"),
                meta: {
                    title: "用户管理",
                    icon: "",
                    sort: 1,
                    permission: "ROLE_ADMIN"
                }
            },
            {
                path: "role",
                name: "Role",
                component: () => import("@/views/system/role/index.vue"),
                meta: {
                    title: "角色管理",
                    icon: "",
                    sort: 2,
                    permission: "ROLE_ADMIN"
                }
            },
            {
                path: "department",
                name: "Department",
                component: () => import("@/views/system/department/index.vue"),
                meta: {
                    title: "部门管理",
                    icon: "",
                    sort: 3,
                    permission: "ROLE_ADMIN"
                }
            },
            {
                path: "menu",
                name: "Menu",
                component: () => import("@/views/system/menu/index.vue"),
                meta: {
                    title: "菜单管理",
                    icon: "",
                    sort: 4,
                    permission: "ROLE_ADMIN"
                }
            },
            {
                path: "api",
                name: "Api",
                component: () => import("@/views/system/api/index.vue"),
                meta: {
                    title: "接口管理",
                    icon: "",
                    sort: 5,
                    permission: "ROLE_ADMIN"
                }
            },
            {
                path: "dictionary-key",
                name: "DictionaryKey",
                component: () => import("@/views/system/dictionary-key/index.vue"),
                meta: {
                    title: "字典管理",
                    icon: "",
                    sort: 6,
                    permission: "ROLE_ADMIN"
                }
            },
            {
                path: "dictionary-data/:type",
                name: "DictionaryData",
                component: () => import("@/views/system/dictionary-data/index.vue"),
                meta: {
                    title: "字典数据",
                    hidden: true
                }
            },
            {
                path: "dictType",
                name: "dictType",
                component: () => import("@/views/system/FlyDictType/index.vue"),
                meta: {
                    title: "字典管理",
                }
            },
            {
                path: "dictData/:type",
                name: "dictData",
                component: () => import("@/views/system/FlyDictData/index.vue"),
                meta: {
                    title: "字典数据",
                    hidden: true
                }
            }
        ]
    }
];

export default system;
