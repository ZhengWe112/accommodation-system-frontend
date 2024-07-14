<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/userInfo/sk' }">用户信息查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      学号<input type="text" v-model="keyword_studentId">
      <button @click="getKeyWord_studentId">查询</button>
      <el-table :data="students_info" style="width: 100%">
        <el-table-column fixed prop="fullname" label="姓名" width="150" />
        <el-table-column prop="classname" label="班级" width="130" />
        <el-table-column prop="studentId" label="学号" width="130" />
        <el-table-column prop="grade" label="年级" width="120" />
        <el-table-column prop="collageName" label="学院" width="120" />
        <el-table-column prop="major" label="专业" width="600" />
      </el-table>
    </el-card>
    <el-card class="container">
      工号<input type="text" v-model="keyword_teacherId">
      <button @click="getKeyWord_teacherId">查询</button>
      <el-table :data="teachers_info" style="width: 100%">
        <el-table-column fixed prop="fullname" label="姓名" width="150" />
        <el-table-column prop="teacherId" label="工号" width="130" />
        <el-table-column prop="professionalTitle" label="职称" width="140" />
        <el-table-column prop="collageName" label="学院" width="120" />
        <el-table-column prop="major" label="专业" width="600" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'userInfoSk',
  data () {
    return {
      keyword_studentId: '',
      keyword_teacherId: '',
      students_info: [],
      teachers_info: []
    }
  },
  methods: {
    getKeyWord_studentId () {
      let obj = {
        studentId: this.keyword_studentId
      }
      axios.post('/api/student/listByKey', obj).then(res => {
        console.info(res)
        this.students_info = res.data.data
      })
    },
    getKeyWord_teacherId () {
      let obj = {
        teacherId: this.keyword_teacherId
      }
      axios.post('/api/teacher/listByKey', obj).then(res => {
        console.info(res)
        this.teachers_info = res.data.data
      })
    }
  }
}
</script>
