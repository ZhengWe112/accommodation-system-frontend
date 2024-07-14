<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/accommodation/apply' }">住退宿申请</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-form ref="accommodationApplyRef" :model="form" :rules="rules" label-width="auto" style="width: 35%">
        <el-form-item label="类型" prop="requestType">
          <el-select v-model="form.requestType" placeholder="">
            <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="理由" prop="reason">
          <el-input type="textarea" v-model="form.requestReason" placeholder="please enter your reason"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save" plain>保存</el-button>
          <el-button type="success" @click="reset" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  addAccommodationApply
} from '@api/accommodation'
import {mapGetters} from 'vuex'

export default {
  name: 'accommodationApply',
  data () {
    return {
      form: {
        requestType: '',
        requestReason: ''
      },
      types: [
        {value: 0, label: '普通入住申请'},
        {value: 1, label: '普通调宿申请'},
        {value: 2, label: '互换申请申请'},
        {value: 3, label: '个人退宿申请'},
        {value: 4, label: '校外住宿'}
      ]
    }
  },
  methods: {
    save () {
      addAccommodationApply({studentId: this.userId, requestType: this.form.requestType, requestReason: this.form.requestReason}).then(res => {
        this.$message.success('申请成功')
        this.reset()
      })
    },
    reset () {
      this.form = {
        requestType: '',
        requestReason: ''
      }
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
          callback(new Error('请输入类型'))
        } else {
          callback()
        }
      }
      return {
        requestType: [{ validator: validateRequestItem, trigger: 'blur' }],
        requestReason: [{ validator: validateReason, trigger: 'blur' }]
      }
    }
  }
}
</script>
