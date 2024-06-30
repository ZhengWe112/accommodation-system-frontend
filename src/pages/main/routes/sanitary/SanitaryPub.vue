<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/sanitary/pub' }">检查结果发布</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      检查结果发布
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'sanitaryPub',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
