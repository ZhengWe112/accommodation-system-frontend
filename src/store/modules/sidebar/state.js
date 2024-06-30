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
              title: '寝室卫生日志'
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
      main: [
        {
          path: '/main/maintenance/review',
          icon: 'el-icon-setting',
          title: '维修管理',
          group: '2-1',
          children: [
            {
              path: '/main/maintenance/review',
              icon: 'suncaper-menu-unfold',
              title: '维修审核'
            },
            {
              path: '/main/maintenance/log',
              icon: 'suncaper-menu-unfold',
              title: '维修日志'
            }
          ]
        }
      ]
    },
    // 3是宿舍管理员
    3: {
      main: [
        {
          path: '/main/houseInfo/sk',
          icon: 'el-icon-setting',
          title: '房源信息',
          group: '3-1',
          children: [
            {
              path: '/main/houseInfo/sk',
              icon: 'suncaper-menu-unfold',
              title: '房源信息查询'
            }
          ]
        },
        {
          path: '/main/accommodation/log',
          icon: 'el-icon-setting',
          title: '住退宿管理',
          group: '3-2',
          children: [
            {
              path: '/main/accommodation/log',
              icon: 'suncaper-menu-unfold',
              title: '住退宿日志'
            },
            {
              path: '/main/accommodation/notification',
              icon: 'suncaper-menu-unfold',
              title: '住退宿通知'
            }
          ]
        },
        {
          path: '/main/sanitary/log',
          icon: 'el-icon-setting',
          title: '卫生管理',
          group: '3-3',
          children: [
            {
              path: '/main/sanitary/log',
              icon: 'suncaper-menu-unfold',
              title: '寝室卫生日志'
            },
            {
              path: '/main/sanitary/mgmt',
              icon: 'suncaper-menu-unfold',
              title: '寝室卫生管理'
            },
            {
              path: '/main/sanitary/objection/show',
              icon: 'suncaper-menu-unfold',
              title: '寝室卫生异议'
            },
            {
              path: '/main/sanitary/objection/notification',
              icon: 'suncaper-menu-unfold',
              title: '卫生异议反馈'
            }
          ]
        },
        {
          path: '/main/violation/mgmt',
          icon: 'el-icon-setting',
          title: '违规管理',
          group: '3-4',
          children: [
            {
              path: '/main/violation/mgmt',
              icon: 'suncaper-menu-unfold',
              title: '违规管理'
            },
            {
              path: '/main/violation/sk',
              icon: 'suncaper-menu-unfold',
              title: '违规查询'
            }
          ]
        }
      ]
    },
    // 4是分管领导
    4: {
      main: [
        {
          path: '/main/accommodation/review',
          icon: 'el-icon-setting',
          title: '住退宿审批',
          group: '4-1',
          children: [
            {
              path: '/main/accommodation/review',
              icon: 'suncaper-menu-unfold',
              title: '住退宿审批'
            },
            {
              path: '/main/accommodation/batch',
              icon: 'suncaper-menu-unfold',
              title: '批量排退宿'
            },
            {
              path: '/main/accommodation/log',
              icon: 'suncaper-menu-unfold',
              title: '住退宿日志'
            }
          ]
        },
        {
          path: '/main/sanitary/pub',
          icon: 'el-icon-setting',
          title: '卫生管理',
          group: '4-2',
          children: [
            {
              path: '/main/sanitary/pub',
              icon: 'suncaper-menu-unfold',
              title: '检查结果发布'
            },
            {
              path: '/main/sanitary/objection/review',
              icon: 'suncaper-menu-unfold',
              title: '卫生异议审核'
            },
            {
              path: '/main/sanitary/log',
              icon: 'suncaper-menu-unfold',
              title: '寝室卫生日志'
            }
          ]
        },
        {
          path: '/main/violation/mgmt',
          icon: 'el-icon-setting',
          title: '违规管理',
          group: '4-3',
          children: [
            {
              path: '/main/violation/review',
              icon: 'suncaper-menu-unfold',
              title: '违规审核'
            },
            {
              path: '/main/violation/sk',
              icon: 'suncaper-menu-unfold',
              title: '违规查询'
            }
          ]
        }
      ]
    },
    // 5是教师
    5: {
      main: [
        {
          path: '/main/accommodation/review',
          icon: 'el-icon-setting',
          title: '入退住申请',
          group: '5-1',
          children: [
            {
              path: '/main/accommodation/apply',
              icon: 'suncaper-menu-unfold',
              title: '住退宿申请'
            },
            {
              path: '/main/accommodation/log',
              icon: 'suncaper-menu-unfold',
              title: '住退宿日志'
            }
          ]
        },
        {
          path: '/main/violation/sk',
          icon: 'el-icon-setting',
          title: '学生违规查询',
          group: '5-2',
          children: [
            {
              path: '/main/violation/sk',
              icon: 'suncaper-menu-unfold',
              title: '违规查询'
            }
          ]
        },
        {
          path: '/main/sanitary/log',
          icon: 'el-icon-setting',
          title: '学生卫生查询',
          group: '5-3',
          children: [
            {
              path: '/main/sanitary/log',
              icon: 'suncaper-menu-unfold',
              title: '寝室卫生日志'
            }
          ]
        },
        {
          path: '/main/maintenance/apply',
          icon: 'el-icon-setting',
          title: '维修管理',
          group: '5-4',
          children: [
            {
              path: '/main/maintenance/apply',
              icon: 'suncaper-menu-unfold',
              title: '维修申请'
            },
            {
              path: '/main/maintenance/log',
              icon: 'suncaper-menu-unfold',
              title: '维修日志'
            }
          ]
        }
      ]
    },
    // 6是学生
    6: {
      main: [
        {
          path: '/main/accommodation/review',
          icon: 'el-icon-setting',
          title: '入退住申请',
          group: '6-1',
          children: [
            {
              path: '/main/accommodation/apply',
              icon: 'suncaper-menu-unfold',
              title: '住退宿申请'
            },
            {
              path: '/main/accommodation/log',
              icon: 'suncaper-menu-unfold',
              title: '住退宿日志'
            }
          ]
        },
        {
          path: '/main/violation/sk',
          icon: 'el-icon-setting',
          title: '违规记录',
          group: '6-2',
          children: [
            {
              path: '/main/violation/sk',
              icon: 'suncaper-menu-unfold',
              title: '违规查询'
            },
            {
              path: '/main/violation/warn',
              icon: 'suncaper-menu-unfold',
              title: '警告通知'
            }
          ]
        },
        {
          path: '/main/sanitary/objection/apply',
          icon: 'el-icon-setting',
          title: '卫生管理',
          group: '6-3',
          children: [
            {
              path: '/main/sanitary/objection/apply',
              icon: 'suncaper-menu-unfold',
              title: '卫生异议申请'
            },
            {
              path: '/main/sanitary/log',
              icon: 'suncaper-menu-unfold',
              title: '寝室卫生日志'
            }
          ]
        },
        {
          path: '/main/maintenance/apply',
          icon: 'el-icon-setting',
          title: '维修管理',
          group: '6-4',
          children: [
            {
              path: '/main/maintenance/apply',
              icon: 'suncaper-menu-unfold',
              title: '维修申请'
            },
            {
              path: '/main/maintenance/log',
              icon: 'suncaper-menu-unfold',
              title: '维修日志'
            }
          ]
        }
      ]
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
