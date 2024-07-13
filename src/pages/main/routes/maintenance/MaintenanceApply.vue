<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/maintenance/apply' }">维修申请</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-button type="primary" @click="add" style="margin-left: 20px" plain>新建</el-button>
      <br><br>
      <el-form ref="maintenanceRef" v-if="showForm" :model="form" :rules="rules" label-width="auto" style="width: 35%">
        <el-form-item label="项目" prop="requestItem">
          <el-input v-model="form.requestItem" placeholder="请填写损坏的物品"/>
        </el-form-item>
        <el-form-item label="理由" prop="reason">
          <el-input type="textarea" v-model="form.reason" placeholder="please enter your reason"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save" plain>保存</el-button>
          <el-button type="success" @click="reset" plain>取消</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="apply" height="250" style="width: 100%">
        <el-table-column prop="requestTime" label="创建时间"/>
        <el-table-column prop="studentId" label="学生姓名"/>
        <el-table-column prop="requestItem" label="维修物品"/>
        <el-table-column prop="reason" label="描述" width="400px"/>
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <div v-if="scope.row.state === 0">申请中</div>
            <div v-if="scope.row.state === 1">已维修</div>
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
  getMaintenanceRequest,
  addMaintenanceRequest
} from '@api/maintenance'
import PaginationComponent from '@/components/PaginationComponent.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'maintenanceApply',
  components: {PaginationComponent},
  data () {
    return {
      apply: [],
      total: 400,
      pageSize: 10,
      currentPage: 1,
      showForm: false,
      form: {
        reason: '',
        requestItem: ''
      }
    }
  },
  methods: {
    async init () {
      await getMaintenanceRequest(this.userId, {pageNo: this.currentPage, pageSize: this.pageSize}).then(res => {
        if (res.status) {
          this.apply = res.data.data
          this.total = res.data.total
        }
      })
    },
    add () {
      this.showForm = true
    },
    save () {
      this.$refs['maintenanceRef'].validate(valid => {
        if (valid) {
          addMaintenanceRequest({
            studentId: this.userId,
            reason: this.form.reason,
            requestItem: this.form.requestItem
          }).then(res => {
            if (res.status) {
              this.$message.success('添加成功')
              this.init()
            }
          })
        }
      })
      this.showForm = false
    },
    reset () {
      this.showForm = false
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
    }),
    rules () {
      const validateReason = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('请输入理由'))
        } else {
          callback()
        }
      }
      const validateRequestItem = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('请输入项目'))
        } else {
          callback()
        }
      }
      return {
        requestItem: [{ validator: validateRequestItem, trigger: 'blur' }],
        reason: [{ validator: validateReason, trigger: 'blur' }]
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
