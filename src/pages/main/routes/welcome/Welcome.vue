<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      这是欢迎页面
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
