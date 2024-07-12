<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/sanitary/mgmt' }">寝室卫生管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-button type="primary" plain @click="addChk">创建</el-button>
      <el-table :data="sanitaryData" height="250" style="width: 100%">
        <el-table-column prop="id" label="编号"/>
        <el-table-column prop="inspectionTime" label="创建时间"/>
        <el-table-column prop="overallSituation" label="整体情况">
          <template #default="scope">
            <div v-if="scope.row.overallSituation === 0">优</div>
            <div v-if="scope.row.overallSituation === 1">良</div>
            <div v-if="scope.row.overallSituation === 2">中</div>
            <div v-if="scope.row.overallSituation === 3">差</div>
          </template>
        </el-table-column>
        <el-table-column prop="averageScore" label="平均得分" />
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <div v-if="scope.row.state === 0">未送审</div>
            <div v-if="scope.row.state === 1">已送审</div>
            <div v-if="scope.row.state === 2">成绩已公布</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button size="small" type="primary" @click="getDetail(scope.row)">
              查看详情
            </el-button>
            <el-button v-if="scope.row.state === 0" size="small" type="success" @click="submit(scope.row)">
              送审
            </el-button>
            <el-button v-if="scope.row.state > 0" size="small" type="success" disabled>
              送审
            </el-button>
            <el-button v-if="scope.row.state === 0" size="small" type="danger" @click="deleteChk(scope.row)">
              删除
            </el-button>
            <el-button v-if="scope.row.state > 0" size="small" type="success" disabled>
              删除
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
  getSanitaryChkByDormId,
  addSanitaryChk,
  deleteSanitaryChk,
  submitSanitaryChk
} from '@api/sanitary'
import {mapGetters} from 'vuex'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  name: 'sanitaryMgmt',
  components: {PaginationComponent},
  data () {
    return {
      sanitaryData: [],
      total: 400,
      pageSize: 10,
      currentPage: 1
    }
  },
  methods: {
    async init () {
      await getSanitaryChkByDormId(this.userId, {pageNo: this.currentPage, pageSize: this.pageSize}).then(res => {
        this.sanitaryData = res.data.data
        this.total = res.data.total
      }).catch(err => {
        this.$message.error('出错了' + err)
      })
    },
    addChk () {
      addSanitaryChk(this.userId).then(res => {
        if (res.status) {
          this.$message.success('创建成功')
          this.init()
        } else {
          this.$message.error('出错了 请联系系统管理员')
        }
      })
    },
    deleteChk (row) {
      this.$confirm('确认删除此次卫生检查?', '提示', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
        'type': 'warning'
      }).then(() => {
        deleteSanitaryChk(row.id).then(res => {
          if (res.status) {
            this.$message.success('删除成功')
            this.init()
          }
        })
      })
    },
    submit (row) {
      console.log(row)
      this.$confirm('确认送审？送审后，你将无权删除此次检查', '提示', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
        'type': 'warning'
      }).then(() => {
        submitSanitaryChk({id: row.id}).then(res => {
          if (res.status) {
            this.$message.success('送审成功')
            this.init()
          }
        })
      })
    },
    getDetail (row) {
      this.$router.push({path: '/main/sanitary/mgmt/detail', query: {id: row.id}})
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
      userId: 'user/getUserId'
    })
  },
  created () {
    this.init()
  }
}
</script>
