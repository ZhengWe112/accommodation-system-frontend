<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/sanitary/log' }">卫生检查</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      卫生检查信息查找页面
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
