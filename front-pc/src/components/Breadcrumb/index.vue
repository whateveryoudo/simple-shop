<template>
  <el-breadcrumb separator="/" class="breadcrumb-container">
    <el-breadcrumb-item v-for="(crumb,index) in crumbData" :key="crumb.path">
      <!--            最后一项 | 没有重定向的项-->
      <span
        v-if="crumb.redirect === 'noRedirect' || (index === crumbData.length - 1) "
      >{{getCurTitle(crumb.meta)}}</span>
      <router-link v-else :to="crumb.path">{{getCurTitle(crumb.meta)}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      routeParams: {},
      crumbData: null, //用于显示的数据
    };
  },
  created() {
    this.initCrumbData();
  },
  methods: {
    /**
     * 初始话面包屑数据
     * @param
     */
    initCrumbData() {
      this.routeParams = this.$route.params; // 获取当前参数集
      let matched = this.$route.matched.filter(
        (route) => route.meta && route.meta.title
      );
      matched.shift(matched[0]); //去除首项matched路由（navMain）
      this.crumbData = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      ); //过滤设置隐藏的项
    },
    // 获取当前title显示
    getCurTitle(meta) {
      let titleText = "";
      if (meta && meta.title instanceof Object) {
        const { titleKey, title } = meta;
        const tempKey = this.routeParams[titleKey]; // 获取判断title参数
        titleText = title[tempKey];
      } else {
        titleText = meta.title;
      }
      return titleText;
    },
  },
  watch: {
    $route(route) {
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.initCrumbData();
    },
  },
};
</script>
<style lang="scss">
.breadcrumb-container {
  .el-breadcrumb__item {
    .el-breadcrumb__inner a,
    .el-breadcrumb__inner.is-link {
      font-weight: normal;
      color: rgba(0, 0, 0, 0.45);
    }
    &:last-child {
      .el-breadcrumb__inner a,
      .el-breadcrumb__inner.is-link {
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
}
</style>
<style scoped>
.breadcrumb-container {
  /* float: left;*/
  height: 20px;
  line-height: 20px;
  padding-left: 10px;
}
</style>