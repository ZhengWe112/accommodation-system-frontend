<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/houseInfo/sk' }">房源信息查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-tabs v-model="activeName" @tab-click="tabChg">
        <el-tab-pane label="园区信息" name="first">
          <el-table :data="park" style="width: 100%">
            <el-table-column prop="parkName" label="园区名"/>
            <el-table-column prop="parkAddress" label="园区地址"/>
            <el-table-column prop="parkType" label="园区类型">
              <template #default="scope">
                <div v-if="scope.row.parkType === 0">教师园区</div>
                <div v-if="scope.row.parkType === 1">男生园区</div>
                <div v-if="scope.row.parkType === 2">女生园区</div>
              </template>
            </el-table-column>
            <el-table-column prop="complicatedTime" label="竣工时间"/>
          </el-table>
          <PaginationComponent
              :total="total"
              :currentPage="currentPage"
              :pageSize="pageSize"
              @pagination="handlePageChange"
          />
        </el-tab-pane>
        <el-tab-pane label="楼栋信息" name="second">
          <el-table :data="building" style="width: 100%">
            <el-table-column prop="dormitoryAdministratorName" label="负责人"/>
            <el-table-column prop="parkName" label="所属园区  "/>
            <el-table-column prop="buildingName" label="楼栋名"/>
            <el-table-column prop="buildingNumber" label="楼栋号"/>
            <el-table-column prop="nbFloor" label="楼层数"/>
            <el-table-column prop="complicatedTime" label="竣工时间"/>
          </el-table>
          <PaginationComponent
              :total="total"
              :currentPage="currentPage"
              :pageSize="pageSize"
              @pagination="handlePageChange"
          />
        </el-tab-pane>
        <el-tab-pane label="房间信息" name="third">
          <el-table :data="room" style="width: 100%">
            <el-table-column prop="buildingName" label="所属楼栋"/>
            <el-table-column prop="roomNumber" label="房间号"/>
            <el-table-column prop="roomType" label="房间类型">
              <template #default="scope">
                <div v-if="scope.row.roomType === 0">寝室</div>
                <div v-if="scope.row.roomType === 1">辅导员室</div>
                <div v-if="scope.row.roomType === 2">门卫室</div>
                <div v-if="scope.row.roomType === 3">办公室</div>
                <div v-if="scope.row.roomType === 4">储藏室</div>
                <div v-if="scope.row.roomType === 5">洗手间</div>
                <div v-if="scope.row.roomType === 6">洗室</div>
                <div v-if="scope.row.roomType === 7">服务台</div>
                <div v-if="scope.row.roomType === 8">服务间</div>
              </template>
            </el-table-column>
            <el-table-column prop="roomFloor" label="所在楼层"/>
            <el-table-column prop="roomLocation" label="方位"/>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="床位信息" name="fourth">
          <el-table :data="bed" style="width: 100%">
            <el-table-column prop="buildingName" label="学生/老师">
              <template #default="scope">
                <div v-if="scope.row.studentName !== null">{{scope.row.studentName}}</div>
                <div v-else-if="scope.row.teacherName !== null">{{scope.row.teacherName}}</div>
                <div v-else>空床位</div>
              </template>
            </el-table-column>
            <el-table-column prop="roomNumber" label="所属房间"/>
            <el-table-column prop="type" label="类型">
              <template #default="scope">
                <div v-if="scope.row.type === true">学生</div>
                <div v-if="scope.row.type === false">老师</div>
              </template>
            </el-table-column>
            <el-table-column prop="isEmpty" label="是否空床">
              <template #default="scope">
                <div v-if="scope.row.isEmpty === true">有人</div>
                <div v-if="scope.row.isEmpty === false">空床</div>
              </template>
            </el-table-column>
            <el-table-column prop="bedNumber" label="床位号"/>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import {getPark, getBuilding, getRoom, getBed} from '@api/house'
import {mapGetters} from 'vuex'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  name: 'houseInfoSk',
  components: {PaginationComponent},
  data () {
    return {
      park: [],
      building: [],
      room: [],
      bed: [],
      total: 400,
      pageSize: 10,
      currentPage: 1,
      activeName: 'first'
    }
  },
  methods: {
    async init () {
      if (this.activeName === 'first') {
        await getPark({pageNo: this.currentPage, pageSize: this.pageSize}).then(res => {
          if (res.status) {
            this.park = res.data.data
            this.total = res.data.total
          }
        })
      } else if (this.activeName === 'second') {
        await getBuilding({pageNo: this.currentPage, pageSize: this.pageSize}).then(res => {
          if (res.status) {
            this.building = res.data.data
            this.total = res.data.total
          }
        })
      } else if (this.activeName === 'third') {
        await getRoom({pageNo: this.currentPage, pageSize: this.pageSize}).then(res => {
          if (res.status) {
            this.room = res.data.data
            this.total = res.data.total
          }
        })
      } else {
        await getBed({pageNo: this.currentPage, pageSize: this.pageSize}).then(res => {
          if (res.status) {
            this.bed = res.data.data
            this.total = res.data.total
            console.log(this.bed)
          }
        })
      }
    },
    handlePageChange (data) {
      this.currentPage = data.currentPage
      this.pageSize = data.pageSize
      console.log(this.currentPage, this.pageSize)
      this.init()
    },
    tabChg () {
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
