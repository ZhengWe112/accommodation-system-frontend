<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="userType === 3" :to="{ path: '/main/sanitary/mgmt/' }">寝室卫生管理</el-breadcrumb-item>
          <el-breadcrumb-item v-if="userType === 4" :to="{ path: '/main/sanitary/pub/' }">检查结果发布</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/sanitary/mgmt/detail' }">明细</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <div v-if="userType === 3">
        <el-button type="primary" plain @click="add">添加记录</el-button>
        <el-button type="success" plain @click="importFromExcel">从Excel导入</el-button>
      </div>
      <el-table :data="detail" @cell-dblclick="cellDblClick">
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column prop="roomId" label="房间号">
          <template #default="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.roomId">{{ scope.row.roomId }}</el-input>
            <div v-else>{{ scope.row.roomId }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="item" label="项目">
          <template #default="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.item">{{ scope.row.item }}</el-input>
            <div v-else>{{ scope.row.item }}</div>
          </template>
        </el-table-column>
        <el-table-column label="分数">
          <template #default="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.score">{{ scope.row.score }}</el-input>
            <div v-else>{{ scope.row.score }}</div>
          </template>
        </el-table-column>
        <el-table-column label="描述">
          <template #default="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.description"></el-input>
            <div v-else>{{ scope.row.description }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="userType === 3" label="操作" width="200px">
          <template #default="scope">
            <el-button v-if="scope.row.edit" size="small" type="success" @click="save(scope.row)">
              保存
            </el-button>
            <el-button v-if="!scope.row.edit" size="small" type="primary" @click="cellDblClick(scope.row)">
              编辑
            </el-button>
            <el-button  size="small" type="danger" @click="del(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {
  getSanitaryDetail,
  updateSanitaryDetail,
  delSanitaryDetail,
  addSanitaryDetail
} from '@api/sanitary'
import {mapGetters} from 'vuex'

export default {
  name: 'sanitaryMgmtDetail',
  data () {
    return {
      detail: []
    }
  },
  computed: {
    ...mapGetters({
      userType: 'user/getUserType'
    })
  },
  methods: {
    async init () {
      await getSanitaryDetail({id: this.$route.query.id}).then(res => {
        if (res.status) {
          this.detail = res.data
        }
      })
    },
    cellDblClick (row) {
      if (this.userType === 3) {
        this.$set(row, 'edit', true)
      }
    },
    save (row) {
      this.$set(row, 'edit', false)
      if (row.id) {
        updateSanitaryDetail(row).then(res => {
          if (res.status) {
            this.$message.success('保存成功')
          } else {
            this.$message.error('出错了 请联系系统管理员')
          }
        })
      } else {
        row.sanitaryInspectionId = this.$route.query.id
        addSanitaryDetail(row).then(res => {
          if (res.status) {
            this.$message.success('添加成功')
          } else {
            this.$message.error('出错了 请联系系统管理员')
          }
        })
      }
    },
    del (row) {
      if (row.id) {
        this.$confirm('确认删除此条卫生检查记录?', '提示', {
          'confirmButtonText': '确定',
          'cancelButtonText': '取消',
          'type': 'warning'
        }).then(() => {
          delSanitaryDetail({'id': row.id, 'sanitaryInspectionId': row.sanitaryInspectionId}).then(res => {
            if (res.status) {
              this.$message.success('删除成功')
              this.init()
            } else {
              this.$message.error('出错了 请联系系统管理员')
            }
          })
        })
      } else {
        this.detail.pop()
      }
    },
    add () {
      this.detail.push({})
    },
    importFromExcel () {

    }
  },
  created () {
    this.init()
  }
}
</script>

<style>
</style>
