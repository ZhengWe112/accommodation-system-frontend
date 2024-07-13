import http from '@http/http'

export const getMaintenanceRequest = (id, obj) => http.GET('/api/student/maintenance/' + id, obj)

export const addMaintenanceRequest = (obj) => http.POST('/api/student/maintenance/', obj)

// 已维修的
export const processedMaintenanceRecord = (obj) => http.GET('/api/student/list/', obj)

// 未维修的
export const processingMaintenanceRecord = (obj) => http.GET('/api/maintenanceAdministrator/view/', obj)

// process
export const processMaintenanceApply = (obj) => http.GET('/api/maintenanceAdministrator/process/', obj)
