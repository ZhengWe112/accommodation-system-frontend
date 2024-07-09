import http from '@http/http'

// 获取所有卫生检查记录
export const getSanitaryChkLst = () => http.GET('./api/sanitaryInspection', {})

// 查询某位宿管创建的卫生检查记录 path = '/api/sanitaryInspection/' + id
export const getSanitaryChkByDormId = (id) => http.GET('/api/sanitaryInspection/' + id, {})

// 某位宿管创建卫生检查 path = '/api/sanitaryInspection/' + id
export const addSanitaryChk = (id) => http.PUT('/api/sanitaryInspection/' + id, {})

// 删除卫生检查 根据id path = '/api/sanitaryInspection/' + id
export const deleteSanitaryChk = (id) => http.DELETE('/api/sanitaryInspection/' + id)

// 送审某次卫生检查
export const submitSanitaryChk = (obj) => http.GET('./api/sanitaryInspection/submit', obj)

// 查询某次卫生检查的明细 根据该次卫生记录的id
export const getSanitaryDetail = (obj) => http.GET('/api/sanitaryInspectionRecord/list', obj)

// 修改某条卫生检查记录明细
export const updateSanitaryDetail = (obj) => http.POST('./api/sanitaryInspectionRecord/update', obj)

// 删除某条卫生检查记录明细 path = '/api/sanitaryInspectionRecord/' + id
export const delSanitaryDetail = (id) => http.DELETE('/api/sanitaryInspectionRecord/' + id, {})

// 添加一条卫生检查记录明细
export const addSanitaryDetail = (obj) => http.POST('./api/sanitaryInspectionRecord/add', obj)
