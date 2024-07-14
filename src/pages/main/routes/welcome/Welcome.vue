<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-image src="https://www.lanhomex.com/uploads/210618/2-21061Q41531100.jpg" fit="fill"/>
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
