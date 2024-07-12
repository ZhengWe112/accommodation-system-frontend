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
      <el-table :data="notification" height="250" style="width: 100%">
        <el-table-column prop="id" label="编号"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="description" label="描述" width="400px"/>
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <div v-if="scope.row.state === 0">同意，等待处理</div>
            <div v-if="scope.row.state === 1">拒绝，无需处理</div>
            <div v-if="scope.row.state === 2">同意，已处理</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button v-if="scope.row.state === 0" size="small" type="primary" @click="handle(scope.row)">
              已处理
            </el-button>
            <el-button v-if="scope.row.state > 0" size="small" type="primary" disabled>
              已处理
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <PaginationComponent
          :total="total"
          :currentPage="currentPage"
          :pageSize="pageSize"
          @pagination="handlePageChange"
      />
    </el-card>
  </div>
</template>

<script>
import {
  getSanitaryObjectionNotification,
  processSanitaryObjection
} from '@api/sanitary'
import {mapGetters} from 'vuex'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  name: 'sanitaryObjectionNotification',
  components: {PaginationComponent},
  data () {
    return {
      notification: [],
      total: 400,
      pageSize: 10,
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters({
      userId: 'user/getUserId'
    })
  },
  methods: {
    async init () {
      await getSanitaryObjectionNotification(this.userId, {pageNo: this.currentPage, pageSize: this.pageSize}).then(res => {
        if (res.status) {
          this.notification = res.data.data
          this.total = res.data.total
        }
      })
    },
    handle (row) {
      processSanitaryObjection({id: row.id}).then(res => {
        if (res.status) {
          this.$message.success('处理成功')
        }
      })
    },
    handlePageChange (data) {
      this.currentPage = data.currentPage
      this.pageSize = data.pageSize
      console.log(this.currentPage, this.pageSize)
      this.init()
    }
  },
  created () {
    this.init()
  }
}
</script>
