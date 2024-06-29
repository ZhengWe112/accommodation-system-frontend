<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/houseInfo/sk' }">房源信息查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      这是房源信息查询页面  此页面显然会被多次复用
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'houseInfoSk',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
