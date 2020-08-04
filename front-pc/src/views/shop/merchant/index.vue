<template>
  <div class="page-basic-layout analysis-container">
    商户列表界面
    <el-button type="primary" @click="toEdit('0')">新增</el-button>
    <el-button type="primary" @click="toEdit('1')">编辑</el-button>
  </div>
</template>

<script>
    export default {
        name: "MerchantList",
        data(){
            return {
            }
        },
        components : {
        },
        methods : {
          toEdit (type) {
            this.$router.push(`/shop/merchant/edit/${type}`)
          }
        }
    }
</script>

<style lang="scss" scoped>
.test {
  color: red;
}
.analysis-container {
  .card-title-icon {
    float: right;
    cursor: pointer;
  }
}
</style>