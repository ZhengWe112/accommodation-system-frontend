<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/sanitary/objection/review' }">卫生异议审核</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      卫生异议审核 分管领导对送审的异议的审核
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'sanitaryObjectionReview',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
