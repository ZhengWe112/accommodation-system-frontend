export default {
  whiteList: ['/', 'notFound', 'login', 'forbidden', 'badGateway'],
  // TODO: 这是6个角色允许访问的路由 现在都是全部 以后要改
  permissionMap: {
    1: {
      main: ['*']
    },
    2: {
      main: ['*']
    },
    3: {
      main: ['*']
    },
    4: {
      main: ['*']
    },
    5: {
      main: ['*']
    },
    6: {
      main: ['*']
    }
  }
}
