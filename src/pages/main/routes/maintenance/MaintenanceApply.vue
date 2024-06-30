<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/maintenance/apply' }">维修申请</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      维修申请
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'maintenanceApply',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
