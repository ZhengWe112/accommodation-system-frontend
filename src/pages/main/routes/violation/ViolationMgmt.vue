<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/violation/mgmt' }">违规管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      违规管理页面
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'violationMgmt',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
