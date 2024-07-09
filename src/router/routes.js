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
              /* webpackChunkName: "Welcome" */ '../pages/main/routes/welcome/Welcome'
            )
      },
      {
        path: 'houseInfo/mgmt',
        name: 'houseInfoMgmt',
        component: () =>
            import(
              /* webpackChunkName: "HouseInfoMgmt" */ '../pages/main/routes/houseInfo/HouseInfoMgmt'
            )
      },
      {
        path: 'houseInfo/sk',
        name: 'houseInfoSk',
        component: () =>
            import(
              /* webpackChunkName: "houseInfoSk" */ '../pages/main/routes/houseInfo/houseInfoSk'
            )
      },
      {
        path: 'userInfo/sk',
        name: 'userInfoSk',
        component: () =>
            import(
              '../pages/main/routes/user/UserInfoSk'
            )
      },
      {
        path: 'userInfo/mgmt',
        name: 'userInfoSk',
        component: () =>
            import(
              '../pages/main/routes/user/UserInfoMgmt'
            )
      },
      {
        path: 'sanitary/log',
        name: 'sanitaryLog',
        component: () =>
            import(
              '../pages/main/routes/sanitary/SanitaryLog.vue'
            )
      },
      {
        path: 'sanitary/mgmt',
        name: 'sanitaryMgmt',
        component: () =>
            import(
              '../pages/main/routes/sanitary/SanitaryMgmt'
            )
      },
      {
        path: 'sanitary/mgmt/detail',
        name: 'sanitaryMgmtDetail',
        component: () =>
            import(
              '../pages/main/routes/sanitary/SanitaryMgmtDetail'
            )
      },
      {
        path: 'sanitary/objection/show',
        name: 'sanitaryObjectionShow',
        component: () =>
            import(
              '../pages/main/routes/sanitary/SanitaryObjectionShow.vue'
            )
      },
      {
        path: 'sanitary/objection/review',
        name: 'sanitaryObjectionReview',
        component: () =>
            import(
              '../pages/main/routes/sanitary/SanitaryObjectionReview'
            )
      },
      {
        path: 'sanitary/objection/notification',
        name: 'sanitaryObjectionNotification',
        component: () =>
            import(
              '../pages/main/routes/sanitary/SanitaryObjectionNotification'
            )
      },
      {
        path: 'sanitary/objection/apply',
        name: 'sanitaryObjectionApply',
        component: () =>
            import(
              '../pages/main/routes/sanitary/SanitaryObjectionApply'
            )
      },
      {
        path: 'sanitary/pub',
        name: 'sanitaryPub',
        component: () =>
            import(
              '../pages/main/routes/sanitary/SanitaryPub'
            )
      },
      {
        path: 'maintenance/log',
        name: 'maintenanceLog',
        component: () =>
            import(
              '../pages/main/routes/maintenance/MaintenanceLog'
            )
      },
      {
        path: 'maintenance/review',
        name: 'maintenanceReview',
        component: () =>
            import(
              '../pages/main/routes/maintenance/MaintenanceReview'
            )
      },
      {
        path: 'maintenance/apply',
        name: 'maintenanceApply',
        component: () =>
            import(
              '../pages/main/routes/maintenance/MaintenanceApply'
            )
      },
      {
        path: 'accommodation/notification',
        name: 'accommodationNotification',
        component: () =>
            import(
              '../pages/main/routes/accommodation/AccommodationNotification'
            )
      },
      {
        path: 'accommodation/log',
        name: 'accommodationLog',
        component: () =>
            import(
              '../pages/main/routes/accommodation/AccommodationLog'
            )
      },
      {
        path: 'accommodation/review',
        name: 'accommodationReview',
        component: () =>
            import(
              '../pages/main/routes/accommodation/AccommodationReview'
            )
      },
      {
        path: 'accommodation/batch',
        name: 'accommodationBatch',
        component: () =>
            import(
              '../pages/main/routes/accommodation/AccommodationBatch'
            )
      },
      {
        path: 'accommodation/apply',
        name: 'accommodationApply',
        component: () =>
            import(
              '../pages/main/routes/accommodation/AccommodationApply'
            )
      },
      {
        path: 'violation/mgmt',
        name: 'violationMgmt',
        component: () =>
            import(
              '../pages/main/routes/violation/ViolationMgmt'
            )
      },
      {
        path: 'violation/sk',
        name: 'violationSk',
        component: () =>
            import(
              '../pages/main/routes/violation/ViolationSk'
            )
      },
      {
        path: 'violation/review',
        name: 'violationReview',
        component: () =>
            import(
              '../pages/main/routes/violation/ViolationReview'
            )
      },
      {
        path: 'violation/warn',
        name: 'violationWarn',
        component: () =>
            import(
              '../pages/main/routes/violation/ViolationWarn'
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
