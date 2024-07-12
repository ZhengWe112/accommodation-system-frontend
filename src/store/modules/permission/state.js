export default {
  whiteList: ['/', 'notFound', 'login', 'forbidden', 'badGateway'],
  // TODO: 这是6个角色允许访问的路由 现在都是全部 以后要改
  permissionMap: {
    1: {
      main: ['welcome', 'houseInfoMgmt', 'houseInfoSk', 'userInfoSk', 'userInfoMgmt', 'sanitaryLog', 'maintenanceLog', 'accommodationLog']
    },
    2: {
      main: ['welcome', 'maintenanceLog', 'maintenanceReview']
    },
    3: {
      main: ['welcome', 'houseInfoSk', 'accommodationLog', 'accommodationNotification', 'sanitaryLog', 'sanitaryMgmt', 'sanitaryMgmtDetail', 'sanitaryObjectionShow', 'sanitaryObjectionNotification', 'violationMgmt', 'violationSk']
    },
    4: {
      main: ['welcome', 'accommodationReview', 'accommodationBatch', 'accommodationLog', 'sanitaryPub', 'sanitaryObjectionReview', 'sanitaryMgmtDetail', 'sanitaryLog', 'violationReview', 'violationSk']
    },
    5: {
      main: ['welcome', 'accommodationApply', 'accommodationLog', 'violationSk', 'sanitaryLog', 'maintenanceApply', 'maintenanceLog']
    },
    6: {
      main: ['welcome', 'accommodationApply', 'accommodationLog', 'violationSk', 'violationWarn', 'sanitaryObjectionApply', 'sanitaryLog', 'maintenanceApply', 'maintenanceLog']
    }
  }
}
