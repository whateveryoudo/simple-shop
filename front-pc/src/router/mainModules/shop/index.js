/**
 * fileName : shop.js
 * author:ykx
 * date：2019/8/10 17:15
 * desc：二级路由模块（当子模块太长建议按照模块分割）
 */
import LayoutInner from '@/layout/layout-inner'
const BaseModulePath = '/shop'
const TplChildRouters = [
    {
        path: 'merchant',
        name: 'Merchant',
        component: LayoutInner,
        redirect:`${BaseModulePath}/merchant/list`,
        meta: {
            title: '商户管理',
            elemIcon: 'el-icon-user-solid'
        },
        children : [
            {
                path: 'list',
                name: 'MerchantList',
                component: () => import('@/views/shop/merchant'),
                meta : {
                    title : '商户列表'
                }
            },
            {
                path: 'edit/:type',
                name: 'MerchantEdit',
                component: () => import('@/views/shop/merchant/MerchantEdit.vue'),
                meta : {
                    hidden: true, // 不显示在左侧菜单 & tabs 中，这里放在meta中，否则监听$route无法获取到
                    titleKey: 'type', // 判断title字段名
                    title : { '0': '新增商户', '1' : '编辑商户'}
                }
            }
        ]
    }
]
export default TplChildRouters