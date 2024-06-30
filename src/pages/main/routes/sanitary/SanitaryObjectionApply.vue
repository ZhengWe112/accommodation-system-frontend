<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/sanitary/objection/apply' }">卫生异议申请</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      卫生异议申请
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'sanitaryObjectionApply',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
