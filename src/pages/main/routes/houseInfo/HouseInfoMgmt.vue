<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/houseInfo/mgmt' }">房源信息管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-tabs v-model="activeName" @tab-click="tabChg">
        <el-tab-pane label="园区信息" name="first">
          <el-button type="primary" plain @click="add">添加记录</el-button>
          <el-table :data="park" style="width: 100%">
            <el-table-column prop="id" label="园区编号">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.id">{{ scope.row.id }}</el-input>
                <div v-else>{{ scope.row.id }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="parkName" label="园区名">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.parkName">{{ scope.row.parkName }}</el-input>
                <div v-else>{{ scope.row.parkName }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="parkAddress" label="园区地址">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.parkAddress">{{ scope.row.parkAddress }}</el-input>
                <div v-else>{{ scope.row.parkAddress }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="parkType" label="园区类型">
              <template #default="scope">
                <el-select v-if="scope.row.edit" v-model="scope.row.parkType">
                  <el-option
                      v-for="item in parkTypeSelection"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
                <div v-else>
                  <div v-if="scope.row.parkType === 0">教师园区</div>
                  <div v-if="scope.row.parkType === 1">男生园区</div>
                  <div v-if="scope.row.parkType === 2">女生园区</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="complicatedTime" label="竣工时间">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.complicatedTime">{{ scope.row.complicatedTime }}</el-input>
                <div v-else>{{ scope.row.complicatedTime }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200px">
              <template #default="scope">
                <el-button v-if="scope.row.edit" size="small" type="success" @click="save(scope.row)">
                  保存
                </el-button>
                <el-button v-if="!scope.row.edit" size="small" type="primary" @click="edit(scope.row)">
                  编辑
                </el-button>
                <el-button  size="small" type="danger" @click="del(scope.row)">
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
        </el-tab-pane>
        <el-tab-pane label="楼栋信息" name="second">
          <el-button type="primary" plain @click="add">添加记录</el-button>
          <el-table :data="building" style="width: 100%">
            <el-table-column prop="id" label="楼栋编号">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.id">{{ scope.row.id }}</el-input>
                <div v-else>{{ scope.row.id }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="dormitoryAdministratorName" label="负责人">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.dormitoryAdministratorName">{{ scope.row.dormitoryAdministratorName }}</el-input>
                <div v-else>{{ scope.row.dormitoryAdministratorName }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="parkId" label="所属园区编号">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.parkId">{{ scope.row.parkId }}</el-input>
                <div v-else>{{ scope.row.parkId }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="parkName" label="所属园区名">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.parkName">{{ scope.row.parkName }}</el-input>
                <div v-else>{{ scope.row.parkName }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="buildingName" label="楼栋名">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.buildingName">{{ scope.row.buildingName }}</el-input>
                <div v-else>{{ scope.row.buildingName }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="buildingNumber" label="楼栋号">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.buildingNumber">{{ scope.row.buildingNumber }}</el-input>
                <div v-else>{{ scope.row.buildingNumber }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="nbFloor" label="楼层数">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.nbFloor">{{ scope.row.nbFloor }}</el-input>
                <div v-else>{{ scope.row.nbFloor }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="complicatedTime" label="竣工时间">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.complicatedTime">{{ scope.row.complicatedTime }}</el-input>
                <div v-else>{{ scope.row.complicatedTime }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200px">
              <template #default="scope">
                <el-button v-if="scope.row.edit" size="small" type="success" @click="save(scope.row)">
                  保存
                </el-button>
                <el-button v-if="!scope.row.edit" size="small" type="primary" @click="edit(scope.row)">
                  编辑
                </el-button>
                <el-button  size="small" type="danger" @click="del(scope.row)">
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
        </el-tab-pane>
        <el-tab-pane label="房间信息" name="third">
          <el-button type="primary" plain @click="add">添加记录</el-button>
          <el-table :data="room" style="width: 100%">
            <el-table-column prop="id" label="房间编号">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.id">{{ scope.row.id }}</el-input>
                <div v-else>{{ scope.row.id }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="buildingId" label="所属楼栋编号">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.buildingId">{{ scope.row.buildingId }}</el-input>
                <div v-else>{{ scope.row.buildingId }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="buildingName" label="所属楼栋名">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.buildingName">{{ scope.row.buildingName }}</el-input>
                <div v-else>{{ scope.row.buildingName }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="roomNumber" label="房间号">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.roomNumber">{{ scope.row.roomNumber }}</el-input>
                <div v-else>{{ scope.row.roomNumber }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="roomType" label="房间类型">
              <template #default="scope">
                <el-select v-if="scope.row.edit" v-model="scope.row.roomType">
                  <el-option
                      v-for="item in roomTypeSelection"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
                <div v-else>
                  <div v-if="scope.row.roomType === 0">寝室</div>
                  <div v-if="scope.row.roomType === 1">辅导员室</div>
                  <div v-if="scope.row.roomType === 2">门卫室</div>
                  <div v-if="scope.row.roomType === 3">办公室</div>
                  <div v-if="scope.row.roomType === 4">储藏室</div>
                  <div v-if="scope.row.roomType === 5">洗手间</div>
                  <div v-if="scope.row.roomType === 6">洗室</div>
                  <div v-if="scope.row.roomType === 7">服务台</div>
                  <div v-if="scope.row.roomType === 8">服务间</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="roomFloor" label="所在楼层">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.roomFloor">{{ scope.row.roomFloor }}</el-input>
                <div v-else>{{ scope.row.roomFloor }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="roomLocation" label="方位">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.roomLocation">{{ scope.row.roomLocation }}</el-input>
                <div v-else>{{ scope.row.roomLocation }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200px">
              <template #default="scope">
                <el-button v-if="scope.row.edit" size="small" type="success" @click="save(scope.row)">
                  保存
                </el-button>
                <el-button v-if="!scope.row.edit" size="small" type="primary" @click="edit(scope.row)">
                  编辑
                </el-button>
                <el-button  size="small" type="danger" @click="del(scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="床位信息" name="fourth">
          <el-button type="primary" plain @click="add">添加记录</el-button>
          <el-table :data="bed" style="width: 100%">
            <el-table-column label="学生/老师">
              <template #default="scope">
                <div v-if="scope.row.studentName !== null">{{scope.row.studentName}}</div>
                <div v-else-if="scope.row.teacherName !== null">{{scope.row.teacherName}}</div>
                <div v-else>空床位</div>
              </template>
            </el-table-column>
            <el-table-column prop="roomId" label="所属房间编号">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.roomId">{{ scope.row.roomId }}</el-input>
                <div v-else>{{ scope.row.roomId }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="roomNumber" label="所属房间">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.roomNumber">{{ scope.row.roomNumber }}</el-input>
                <div v-else>{{ scope.row.roomNumber }}</div>
              </template>
            </el-table-column>
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
            <el-table-column prop="bedNumber" label="床位号">
              <template #default="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.bedNumber">{{ scope.row.bedNumber }}</el-input>
                <div v-else>{{ scope.row.bedNumber }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200px">
              <template #default="scope">
                <el-button v-if="scope.row.edit" size="small" type="success" @click="save(scope.row)">
                  保存
                </el-button>
                <el-button v-if="!scope.row.edit" size="small" type="primary" @click="edit(scope.row)">
                  编辑
                </el-button>
                <el-button  size="small" type="danger" @click="del(scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import PaginationComponent from '@/components/PaginationComponent.vue'
import {getPark, getBuilding, getRoom, getBed
  , addPark, addBuilding, addRoom, addBed
  , updatePark, updateBuilding, updateRoom, updateBed
  , delPark, delBuilding, delRoom, delBed}
  from '@api/house'
import {mapGetters} from 'vuex'

export default {
  name: 'houseInfoMgmt',
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
      activeName: 'first',
      parkTypeSelection: [
        {value: 0, label: '教师园区'},
        {value: 1, label: '男生园区'},
        {value: 2, label: '女生园区'}
      ],
      roomTypeSelection: [
        {value: 0, label: '寝室'},
        {value: 1, label: '辅导员室'},
        {value: 2, label: '门卫室'},
        {value: 3, label: '办公室'},
        {value: 4, label: '储藏室'},
        {value: 5, label: '洗手间'},
        {value: 6, label: '洗室'},
        {value: 7, label: '服务台'},
        {value: 6, label: '服务间'}
      ]
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
    save (row) {
      this.$set(row, 'edit', false)
      if (row.id) {
        switch (this.activeName) {
          case 'first':
            updatePark(row).then(res => {
              if (res.status) {
                this.$message.success('保存成功')
                this.init()
              }
            })
            break
          case 'second':
            updateBuilding(row).then(res => {
              if (res.status) {
                this.$message.success('保存成功')
                this.init()
              }
            })
            break
          case 'third':
            updateRoom(row).then(res => {
              if (res.status) {
                this.$message.success('保存成功')
                this.init()
              }
            })
            break
          case 'fourth':
            updateBed(row).then(res => {
              if (res.status) {
                this.$message.success('保存成功')
                this.init()
              }
            })
            break
        }
      } else {
        switch (this.activeName) {
          case 'first':
            addPark(row).then(res => {
              if (res.status) {
                this.$message.success('添加成功')
                this.init()
              }
            })
            break
          case 'second':
            addBuilding(row).then(res => {
              if (res.status) {
                this.$message.success('添加成功')
                this.init()
              }
            })
            break
          case 'third':
            addRoom(row).then(res => {
              if (res.status) {
                this.$message.success('添加成功')
                this.init()
              }
            })
            break
          case 'fourth':
            addBed(row).then(res => {
              if (res.status) {
                this.$message.success('添加成功')
                this.init()
              }
            })
            break
        }
      }
      this.init()
    },
    del (row) {
      if (row.id) {
        this.$confirm('确认删除此条信息?', '提示', {
          'confirmButtonText': '确定',
          'cancelButtonText': '取消',
          'type': 'warning'
        }).then(() => {
          switch (this.activeName) {
            case 'first':
              delPark(row.id).then(res => {
                if (res.status) {
                  this.$message.success('删除成功')
                  this.init()
                }
              })
              break
            case 'second':
              delBuilding(row.id).then(res => {
                if (res.status) {
                  this.$message.success('删除成功')
                  this.init()
                }
              })
              break
            case 'third':
              delRoom(row.id).then(res => {
                if (res.status) {
                  this.$message.success('删除成功')
                  this.init()
                }
              })
              break
            case 'fourth':
              delBed(row.id).then(res => {
                if (res.status) {
                  this.$message.success('删除成功')
                  this.init()
                }
              })
              break
          }
        })
      } else {
        switch (this.activeName) {
          case 'first':
            this.park.pop()
            break
          case 'second':
            this.building.pop()
            break
          case 'third':
            this.room.pop()
            break
          case 'fourth':
            this.bed.pop()
            break
        }
      }
    },
    add () {
      switch (this.activeName) {
        case 'first':
          this.park.push({})
          break
        case 'second':
          this.building.push({})
          break
        case 'third':
          this.room.push({})
          break
        case 'fourth':
          this.bed.push({})
          break
      }
    },
    edit (row) {
      this.$set(row, 'edit', true)
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
