<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/sanitary/objection/show' }">寝室卫生异议</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      卫生异议 宿管在这里查看学生提交的异议 并送分管领导审核
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'sanitaryObjectionShow',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
