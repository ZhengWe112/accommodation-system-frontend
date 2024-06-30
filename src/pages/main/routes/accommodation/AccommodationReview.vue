<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/accommodation/review' }">住退宿审批</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      住退宿审批
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'accommodationReview',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
