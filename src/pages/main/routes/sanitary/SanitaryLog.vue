<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/sanitary/log' }">寝室卫生日志</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      卫生检查信息查找页面 指寝室的卫生检查记录
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'sanitaryLog',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
