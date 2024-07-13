<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/userInfo/mgmt' }">用户信息管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-button link type="primary" size="small" @click="add_user">添加</el-button>
        <el-tab-pane label="学生信息" name="first">
          <el-table :data="students_info" style="width: 100%">
            <el-table-column fixed prop="fullname" label="姓名" width="150" />
            <el-table-column prop="classname" label="班级" width="130" />
            <el-table-column prop="studentId" label="学号" width="130" />
            <el-table-column prop="grade" label="年级" width="120" />
            <el-table-column prop="collageName" label="学院" width="120" />
            <el-table-column prop="major" label="专业" width="600" />
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button link type="primary" size="small" @click="edit_student(scope.row)">Edit</el-button>
                <el-button link type="primary" size="small" @click="deleteById_student(scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="教师信息" name="second">
          <el-table :data="teachers_info" style="width: 100%">
            <el-table-column fixed prop="fullname" label="姓名" width="150" />
            <el-table-column prop="teacherId" label="工号" width="130" />
            <el-table-column prop="professionalTitle" label="职称" width="140" />
            <el-table-column prop="collageName" label="学院" width="120" />
            <el-table-column prop="major" label="专业" width="600" />
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button link type="primary" size="small" @click="edit_teacher(scope.row)">Edit</el-button>
                <el-button link type="primary" size="small" @click="deleteById_teacher(scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="管理员信息" name="third">
          <el-table :data="system_administrator_info" style="width: 100%">
            <el-table-column fixed label="职务" width="200">系统管理员</el-table-column>
            <el-table-column prop="fullname" label="姓名" width="150" />
            <el-table-column prop="classname" label="工号" width="130" />
            <el-table-column prop="studentId" label="密码" width="130" />
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button link type="primary" size="small">Edit</el-button>
                <el-button link type="primary" size="small">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="maintenance_administrator_info" style="width: 100%">
            <el-table-column fixed label="职务" width="200">维修管理员</el-table-column>
            <el-table-column prop="fullname" label="姓名" width="150" />
            <el-table-column prop="classname" label="工号" width="130" />
            <el-table-column prop="studentId" label="密码" width="130" />
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button link type="primary" size="small">Edit</el-button>
                <el-button link type="primary" size="small">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="responsible_leader_info" style="width: 100%">
            <el-table-column fixed label="职务" width="200">分管领导</el-table-column>
            <el-table-column prop="fullname" label="姓名" width="150" />
            <el-table-column prop="classname" label="工号" width="130" />
            <el-table-column prop="studentId" label="密码" width="130" />
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button link type="primary" size="small">Edit</el-button>
                <el-button link type="primary" size="small">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog :visible.sync="dialogVisible_student" title="编辑" width="30%">
      <el-form ref="form_student" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="form_student.fullname" />
        </el-form-item>
        <el-form-item label="年级">
          <el-input v-model="form_student.grade" />
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="form_student.classname" />
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="form_student.collageName" />
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="form_student.major" />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible_student = false">取消</el-button>
        <el-button type="primary" @click="submit_student">确定</el-button>
      </span>
      </template>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible_teacher" title="编辑" width="30%">
      <el-form ref="form_teacher" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="form_teacher.fullname" />
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="form_teacher.professionalTitle" />
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="form_teacher.collageName" />
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="form_teacher.major" />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible_teacher = false">取消</el-button>
        <el-button type="primary" @click="submit_teacher">确定</el-button>
      </span>
      </template>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible_add" title="添加" width="30%">
      <el-form ref="form_teacher" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="form_add.fullname" />
        </el-form-item>
        <el-form-item label="学号">
          <el-input id="add_for_student" v-model="form_add.studentId" disabled="false"/>
        </el-form-item>
        <el-form-item label="工号">
          <el-input id="add_for_teacher" v-model="form_add.teacherId" disabled="false"/>
        </el-form-item>
        <el-form-item>
          <el-button link type="primary" size="small" round="true" @click="add_student">学生</el-button>
          <el-button link type="primary" size="small" round="true" @click="add_teacher">教师</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible_add = false">取消</el-button>
        <el-button type="primary" @click="submit_user">确定</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'userInfoMgmt',
  data () {
    return {
      dialogVisible_student: false,
      dialogVisible_teacher: false,
      dialogVisible_add: false,
      activeName: 'first',
      students_info: [],
      teachers_info: [],
      maintenance_administrator_info: [],
      responsible_leader_info: [],
      system_administrator_info: [],
      form_student: {
        fullname: '',
        grade: '',
        classname: '',
        collageName: '',
        major: ''
      },
      form_teacher: {
        fullname: '',
        professionalTitle: '',
        collageName: '',
        major: ''
      },
      form_add: {
        fullname: '',
        teacherId: '',
        studentId: ''
      }
    }
  },
  methods: {
    add_user () {
      this.dialogVisible_add = true
    },
    add_student () {
      document.getElementById('add_for_student').disabled = false
      document.getElementById('add_for_teacher').disabled = true
    },
    add_teacher () {
      document.getElementById('add_for_student').disabled = true
      document.getElementById('add_for_teacher').disabled = false
    },
    edit_student (user) {
      this.dialogVisible_student = true
      this.form_student = JSON.parse(JSON.stringify(user))
    },
    edit_teacher (user) {
      this.dialogVisible_teacher = true
      this.form_teacher = JSON.parse(JSON.stringify(user))
    },
    deleteById_student (user) {
      let obj = {
        id: user.id
      }
      axios.post('/api/student/deleteById', obj).then(res => {
        if (res.data) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getData_student()
        }
      })
    },
    deleteById_teacher (user) {
      let obj = {
        id: user.id
      }
      axios.post('/api/teacher/deleteById', obj).then(res => {
        if (res.data) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getData_teacher()
        }
      })
    },
    submit_user () {
      if (document.getElementById('add_for_teacher').disabled === true) {
        axios.post('/api/student/insertById', this.form_add).then(res => {
          if (res.data) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.dialogVisible_add = false
          }
        })
      } else if (document.getElementById('add_for_student').disabled === true) {
        axios.post('/api/teacher/insertById', this.form_add).then(res => {
          if (res.data) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.dialogVisible_add = false
          }
        })
      }
    },
    submit_student () {
      console.info(this.form_student)
      axios.post('/api/student/updateById', this.form_student).then(res => {
        if (res.data) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.dialogVisible_student = false
        }
      })
    },
    submit_teacher () {
      console.info(this.form_teacher)
      axios.post('/api/teacher/updateById', this.form_teacher).then(res => {
        if (res.data) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.dialogVisible_teacher = false
        }
      })
    },
    // tabs标签页切换事件
    handleClick (tab, event) {
      console.log(tab, event)
      if (tab.name === 'first') {
        this.getData_student()
      } else if (tab.name === 'second') {
        this.getData_teacher()
      } else if (tab.name === 'third') {
        this.getData_manager()
      }
    },
    getData_student () {
      axios.get('api/student/list').then(res => {
        console.info(res)
        this.students_info = res.data.data
      })
    },
    getData_teacher () {
      axios.get('api/teacher/list').then(res => {
        console.info(res)
        this.teachers_info = res.data.data
      })
    },
    getData_manager () {
      axios.get('api/maintenance_administrator/list').then(res => {
        console.info(res)
        this.maintenance_administrator_info = res.data.data
      })
      axios.get('api/responsible_leader/list').then(res => {
        console.info(res)
        this.responsible_leader_info = res.data.data
      })
      axios.get('api/system_administrator/list').then(res => {
        console.info(res)
        this.system_administrator_info = res.data.data
      })
    }
  }
}
</script>
