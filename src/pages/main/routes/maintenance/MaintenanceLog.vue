<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/maintenance/log' }">维修日志</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      维修日志
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'maintenanceLog',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
