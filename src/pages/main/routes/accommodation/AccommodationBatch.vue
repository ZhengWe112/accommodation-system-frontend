<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/accommodation/batch' }">批量排退宿</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      批量排退宿
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'accommodationBatch',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
