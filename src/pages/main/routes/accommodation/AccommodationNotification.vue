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
      <el-table :data="data" style="width: 100%">
        <el-table-column prop="id" label="编号"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="type" label="类型">
          <template #default="scope">
            <div v-if="scope.row.type === 0">批量排宿通知</div>
            <div v-if="scope.row.type === 1">批量退宿通知</div>
            <div v-if="scope.row.type === 2">普通入住通知</div>
            <div v-if="scope.row.type === 3">普通退宿通知</div>
            <div v-if="scope.row.type === 4">同楼栋换宿通知</div>
          </template>
        </el-table-column>
        <el-table-column prop="message" label="消息"/>
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
import PaginationComponent from '@/components/PaginationComponent.vue'
import {mapGetters} from 'vuex'
import {getAccommodationNotification} from '@api/accommodation'

export default {
  name: 'AccommodationNotification',
  components: {PaginationComponent},
  data () {
    return {
      data: [],
      total: 400,
      pageSize: 10,
      currentPage: 1
    }
  },
  methods: {
    async init () {
      await getAccommodationNotification({pageNo: this.currentPage, pageSize: this.pageSize, id: this.userId}).then(res => {
        if (res.status) {
          this.data = res.data.data
          this.total = res.data.total
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
  computed: {
    ...mapGetters({
      userType: 'user/getUserType',
      userId: 'user/getUserId'
    })
  },
  created () {
    this.init()
  }
}
</script>
