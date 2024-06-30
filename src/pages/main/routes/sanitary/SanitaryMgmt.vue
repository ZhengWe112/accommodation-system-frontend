<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/sanitary/mgmt' }">寝室卫生管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      卫生检查管理 创建，登记，修改，送审，都在这个页面
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'sanitaryMgmt',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
