const loginPage = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../pages/login/Login')
  }
]

const mainPage = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../pages/main/Main'),
    children: [
      {
        path: 'welcome',
        name: 'welcome',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/welcome/Welcome'
            )
      },
      {
        path: 'houseInfo/mgmt',
        name: 'houseInfoMgmt',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/houseInfo/HouseInfoMgmt'
            )
      },
      {
        path: 'houseInfo/sk',
        name: 'houseInfoSk',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/houseInfo/houseInfoSk'
            )
      },
      {
        path: 'userInfo/sk',
        name: 'userInfoSk',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/user/UserInfoSk.vue'
            )
      },
      {
        path: 'userInfo/mgmt',
        name: 'userInfoSk',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/user/UserInfoMgmt.vue'
            )
      },
      {
        path: 'sanitary/log',
        name: 'sanitaryLog',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/sanitary/SanitaryChkSk.vue'
            )
      },
      {
        path: 'maintenance/log',
        name: 'maintenanceLog',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/maintenance/MaintenanceLog.vue'
            )
      },
      {
        path: 'accommodation/log',
        name: 'accommodationLog',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/accommodation/AccommodationLog.vue'
            )
      }
    ]
  }
]

const errorPage = [
  {
    path: '/notFound',
    name: 'notFound',
    component: () =>
      import(/* webpackChunkName: "NotFound" */ '../pages/error/NotFound')
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () =>
      import(/* webpackChunkName: "Forbidden" */ '../pages/error/Forbidden')
  },
  {
    path: '/badGateway',
    name: 'badGateway',
    component: () =>
      import(/* webpackChunkName: "BadGateway" */ '../pages/error/BadGateway')
  },
  {
    path: '*',
    redirect: '/notFound'
  }
]
export default [...loginPage, ...mainPage, ...errorPage]
