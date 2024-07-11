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
      <el-button type="primary" @click="add" style="margin-left: 20px" plain>新建</el-button>
      <br><br>
      <el-form ref="objectionRef" v-if="showForm" :model="form" :rules="rules" label-width="auto" style="width: 35%">
        <el-form-item label="卫生检查编号" prop="sanitaryInspectionId">
          <el-input v-model="form.sanitaryInspectionId" placeholder="请填写有异议的卫生检查编号"/>
        </el-form-item>
        <el-form-item label="理由" prop="objectionReason">
          <el-input type="textarea" v-model="form.objectionReason" placeholder="please enter your reason"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save" plain>保存</el-button>
          <el-button type="success" @click="reset" plain>取消</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="objectionData" height="250" style="width: 100%">
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="sanitaryInspectionId" label="卫生检查编号"/>
        <el-table-column prop="objectionReason" label="发起的理由" width="400px"/>
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <div v-if="scope.row.state === 0">未提交</div>
            <div v-if="scope.row.state === 1">已提交</div>
            <div v-if="scope.row.state === 2">已送审</div>
            <div v-if="scope.row.state === 3">已同意</div>
            <div v-if="scope.row.state === 4">被拒绝</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button v-if="scope.row.state === 0" size="small" type="success" @click="submit(scope.row)">
              提交
            </el-button>
            <el-button v-if="scope.row.state > 0" size="small" type="success" disabled>
              提交
            </el-button>
            <el-button v-if="scope.row.state === 0" size="small" type="danger" @click="del(scope.row)">
              删除
            </el-button>
            <el-button v-if="scope.row.state > 0" size="small" type="success" disabled>
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
  getSanitaryObjection,
  addSanitaryObjection,
  applySanitaryObjection,
  deleteSanitaryObjection
} from '@api/sanitary'
import {mapGetters} from 'vuex'

export default {
  name: 'sanitaryObjectionApply',
  data () {
    return {
      objectionData: [],
      form: {
        objectionReason: '',
        sanitaryInspectionId: ''
      },
      showForm: false
    }
  },
  computed: {
    rules () {
      const validateReason = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('请输入理由'))
        } else {
          callback()
        }
      }
      const validateSanitaryInspectionId = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('请输入正确的卫生检查编号'))
        } else {
          callback()
        }
      }
      return {
        sanitaryInspectionId: [{ validator: validateSanitaryInspectionId, trigger: 'blur' }],
        objectionReason: [{ validator: validateReason, trigger: 'blur' }]
      }
    },
    ...mapGetters({
      userId: 'user/getUserId'
    })
  },
  methods: {
    async init () {
      await getSanitaryObjection({studentId: this.userId}).then(res => {
        if (res.status) {
          this.objectionData = res.data
        }
      })
    },
    add () {
      this.showForm = true
    },
    save () {
      this.$refs['objectionRef'].validate(valid => {
        if (valid) {
          addSanitaryObjection({
            studentId: this.userId,
            objectionReason: this.form.objectionReason,
            sanitaryInspectionId: this.form.sanitaryInspectionId
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
    submit (row) {
      this.$confirm('确认提交此次卫生异议?', '提示', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
        'type': 'warning'
      }).then(() => {
        applySanitaryObjection({id: row.id}).then(res => {
          if (res.status) {
            this.$message.success('提交成功')
            this.init()
          }
        })
      })
    },
    del (row) {
      this.$confirm('确认删除此次卫生异议?', '提示', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
        'type': 'warning'
      }).then(() => {
        deleteSanitaryObjection({id: row.id}).then(res => {
          if (res.status) {
            this.$message.success('删除成功')
            this.init()
          }
        })
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
