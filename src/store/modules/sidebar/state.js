export default {
  sidebarMap: {
    // 1是系统管理员 TODO: 这是老师给的菜单样例 需要更改为系统管理员的菜单
    1: {
      main: [
        {
          groupTitle: '分组1'
        },
        {
          path: '/main/first',
          icon: 'suncaper-menu-unfold',
          title: '一级菜单1'
        },
        {
          path: '/main/second',
          icon: 'suncaper-menu-unfold',
          title: '一级菜单2',
          group: 'second',
          children: [
            {
              path: '/main/second/second',
              icon: 'suncaper-menu-unfold',
              title: '二级菜单'
            }
          ]
        }
      ]
    },
    // 1是维修管理员
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
