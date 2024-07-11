<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/violation/mgmt' }">违规管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-button type="primary" @click="add" style="margin-left: 20px" plain>添加违规记录</el-button>
      <br><br>
      <el-form ref="violationRef" v-if="showForm" :model="form" :rules="rules" label-width="auto" style="width: 35%">
        <el-form-item label="学生名" prop="studentName">
          <el-input v-model="form.studentName" placeholder="请填写学生名"/>
        </el-form-item>
        <el-form-item label="学生名" prop="studentNumber">
          <el-input v-model="form.studentNumber" placeholder="请填写学号"/>
        </el-form-item>
        <el-form-item label="违规事项" prop="violationItem">
          <el-input v-model="form.violationItem" placeholder="请输入违规事项"/>
        </el-form-item>
        <el-form-item label="违规时间" prop="violationTime">
          <el-date-picker
              v-model="form.violationTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="严重性" prop="reason">
          <el-select v-model="form.violationDegree" placeholder="严重性">
            <el-option
                v-for="item in degree"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="理由" prop="reason">
          <el-input type="textarea" v-model="form.reason" placeholder="请输入理由"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save" plain>保存</el-button>
          <el-button type="success" @click="reset" plain>取消</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="record" height="250" style="width: 100%">
        <el-table-column prop="violationTime" label="违规时间"/>
        <el-table-column prop="studentName" label="学生名"/>
        <el-table-column prop="violationItem" label="违规事项"/>
        <el-table-column prop="reason" label="违规理由"/>
        <el-table-column prop="violationDegree" label="违规程度">
          <template #default="scope">
            <div v-if="scope.row.violationDegree === 0">记过</div>
            <div v-if="scope.row.violationDegree === 1">严重警告</div>
            <div v-if="scope.row.violationDegree === 2">警告</div>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <div v-if="scope.row.state === 0">未送审</div>
            <div v-if="scope.row.state === 1">审核中</div>
            <div v-if="scope.row.state === 2">已完成</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button v-if="scope.row.state === 0" size="small" type="success" @click="submit(scope.row)">
              送审
            </el-button>
            <el-button v-if="scope.row.state > 0" size="small" type="success" disabled>
              送审
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
  getViolationByDorm,
  addViolationRecord,
  delViolationRecord,
  submitViolationRecord
} from '@api/violation'
import {mapGetters} from 'vuex'

export default {
  name: 'violationMgmt',
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      record: [],
      form: {
        studentName: '',
        studentNumber: '',
        violationTime: '',
        violationItem: '',
        reason: '',
        violationDegree: ''
      },
      degree: [
        {value: 0, label: '记过'},
        {value: 1, label: '严重警告'},
        {value: 2, label: '警告'}
      ],
      showForm: false
    }
  },
  computed: {
    ...mapGetters({
      userId: 'user/getUserId'
    }),
    rules () {
      const validateStudentName = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('请输入学生姓名'))
        } else {
          callback()
        }
      }
      const validateStudentNumber = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('请输入学号'))
        } else {
          callback()
        }
      }
      const validateViolationTime = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入时间'))
        } else {
          callback()
        }
      }
      const validateViolationItem = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('请输入违规的项目'))
        } else {
          callback()
        }
      }
      const validateReason = (rule, value, callback) => {
        if (value.length < 4) {
          callback(new Error('理由不少于5个字'))
        } else {
          callback()
        }
      }
      const validateViolationDegree = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入违规的严重程度'))
        } else {
          callback()
        }
      }
      return {
        studentName: [{validator: validateStudentName, trigger: 'blur'}],
        studentNumber: [{validator: validateStudentNumber, trigger: 'blur'}],
        violationTime: [{validator: validateViolationTime, trigger: 'blur'}],
        violationItem: [{validator: validateViolationItem, trigger: 'blur'}],
        reason: [{validator: validateReason, trigger: 'blur'}],
        violationDegree: [{validator: validateViolationDegree, trigger: 'blur'}]
      }
    }
  },
  methods: {
    async init () {
      await getViolationByDorm({id: this.userId}).then(res => {
        if (res.status) {
          this.record = res.data
        }
      })
    },
    save () {
      this.$refs['violationRef'].validate(valid => {
        if (valid) {
          addViolationRecord(this.form).then(res => {
            if (res.status) {
              this.$message.success('保存成功')
              this.init()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    submit (row) {
      this.$confirm('确认送审此条违规记录?', '提示', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
        'type': 'warning'
      }).then(() => {
        submitViolationRecord({id: row.id}).then(res => {
          if (res.status) {
            this.$message.success('送审成功')
            this.init()
          } else {
            this.$message.error('出错了 请联系系统管理员')
          }
        })
      })
    },
    del (row) {
      this.$confirm('确认删除此条违规记录?', '提示', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
        'type': 'warning'
      }).then(() => {
        delViolationRecord(row.id).then(res => {
          if (res.status) {
            this.$message.success('删除成功')
            this.init()
          } else {
            this.$message.error('出错了 请联系系统管理员')
          }
        })
      })
    },
    add () {
      this.showForm = true
    },
    reset () {
      this.$confirm('确认要取消吗 未保存的数据无法恢复?', '提示', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
        'type': 'warning'
      }).then(() => {
        this.showForm = false
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
