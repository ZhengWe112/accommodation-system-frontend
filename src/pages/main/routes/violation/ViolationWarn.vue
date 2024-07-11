<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/violation/warn' }">警告通知</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-table :data="record" height="250" style="width: 100%">
        <el-table-column prop="violationTime" label="违规时间"/>
        <el-table-column prop="description" label="描述" width="800px"/>
        <el-table-column prop="degree" label="违规程度">
          <template #default="scope">
            <div v-if="scope.row.degree === 0">记过</div>
            <div v-if="scope.row.degree === 1">严重警告</div>
            <div v-if="scope.row.degree === 2">警告</div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {
  getWarningMsg
} from '@api/violation'
import {mapGetters} from 'vuex'

export default {
  name: 'violationWarn',
  data () {
    return {
      record: []
    }
  },
  computed: {
    ...mapGetters({
      userId: 'user/getUserId'
    })
  },
  methods: {
    async init () {
      getWarningMsg({id: this.userId}).then(res => {
        if (res.status) {
          this.record = res.data
        }
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
