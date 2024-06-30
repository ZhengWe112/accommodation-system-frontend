<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/accommodation/notification' }">住退宿通知</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      住退宿通知
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AccommodationNotification',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
