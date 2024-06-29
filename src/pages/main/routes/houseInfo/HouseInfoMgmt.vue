<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/houseInfo/mgmt' }">房源信息管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      房源信息管理页面 在这里增删改房源信息
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'houseInfoMgmt',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
