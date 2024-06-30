<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/sanitary/objection/notification' }">卫生异议反馈</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      卫生异议反馈 分管领导对送审的异议的反馈
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'sanitaryObjectionNotification',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
