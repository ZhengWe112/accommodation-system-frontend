<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/violation/review' }">违规审核</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      违规审核
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'violationReview',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
