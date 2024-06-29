export default {
  sidebarMap: {
    // 1是系统管理员
    1: {
      main: [
        {
          path: '/main/houseInfo/mgmt',
          icon: 'el-icon-setting',
          title: '房源信息',
          group: '1-1',
          children: [
            {
              path: '/main/houseInfo/mgmt',
              icon: 'suncaper-menu-unfold',
              title: '房源信息管理'
            },
            {
              path: '/main/houseInfo/sk',
              icon: 'suncaper-menu-unfold',
              title: '房源信息查询'
            }
          ]
        },
        {
          path: '/main/userInfo/mgmt',
          icon: 'el-icon-setting',
          title: '用户信息管理',
          group: '1-2',
          children: [
            {
              path: '/main/userInfo/mgmt',
              icon: 'suncaper-menu-unfold',
              title: '用户信息管理'
            },
            {
              path: '/main/userInfo/sk',
              icon: 'suncaper-menu-unfold',
              title: '用户信息查询'
            }
          ]
        },
        {
          path: '/main/sanitary/log',
          icon: 'el-icon-setting',
          title: '业务查看',
          group: '1-3',
          children: [
            {
              path: '/main/sanitary/log',
              icon: 'suncaper-menu-unfold',
              title: '卫生检查'
            },
            {
              path: '/main/maintenance/log',
              icon: 'suncaper-menu-unfold',
              title: '维修日志'
            },
            {
              path: '/main/accommodation/log',
              icon: 'suncaper-menu-unfold',
              title: '住退宿日志'
            }
          ]
        }
      ]
    },
    // 2是维修管理员
    2: {

    },
    // 3是宿舍管理员
    3: {

    },
    // 4是分管领导
    4: {

    },
    // 5是教师
    5: {

    },
    // 6是学生
    6: {

    }
  },
  sidebarTheme: {
    dark: {
      background: '#1f2c35',
      text: '#ffffff',
      activeText: '#ffffff'
    },
    light: {
      background: '#ffffff',
      text: '#000000',
      activeText: '#1890ff'
    }
  }
}
