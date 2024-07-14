<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/userInfo/mgmt' }">用户信息管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      用户信息管理页面
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'userInfoMgmt',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
