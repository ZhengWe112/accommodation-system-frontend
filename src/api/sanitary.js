import http from '@http/http'

// 获取所有卫生检查记录
export const getSanitaryChkLst = () => http.GET('./api/sanitaryInspection', {})

// 查询某位宿管创建的卫生检查记录 path = '/api/sanitaryInspection/' + id
export const getSanitaryChkByDormId = (id) => http.GET('/api/sanitaryInspection/' + id, {})

// 查询所有已经送审的卫生检查
export const getSanitaryChkSubmitted = () => http.GET('./api/sanitaryInspection/submitted')

// 某位宿管创建卫生检查 path = '/api/sanitaryInspection/' + id
export const addSanitaryChk = (id) => http.PUT('/api/sanitaryInspection/' + id, {})

// 删除卫生检查 根据id path = '/api/sanitaryInspection/' + id
export const deleteSanitaryChk = (id) => http.DELETE('/api/sanitaryInspection/' + id)

// 送审某次卫生检查
export const submitSanitaryChk = (obj) => http.GET('./api/sanitaryInspection/submit', obj)

// 发布某次卫生检查
export const pubSanitaryChk = (obj) => http.GET('./api/sanitaryInspection/pub', obj)

// 查询某次卫生检查的明细 根据该次卫生记录的id
export const getSanitaryDetail = (obj) => http.GET('/api/sanitaryInspectionRecord/list', obj)

// 修改某条卫生检查记录明细
export const updateSanitaryDetail = (obj) => http.POST('./api/sanitaryInspectionRecord/update', obj)

// 删除某条卫生检查记录明细 path = '/api/sanitaryInspectionRecord/' + id
export const delSanitaryDetail = (obj) => http.GET('/api/sanitaryInspectionRecord/delete', obj)

// 添加一条卫生检查记录明细
export const addSanitaryDetail = (obj) => http.POST('./api/sanitaryInspectionRecord/add', obj)

// 查询卫生异议 查询条件 学生id 状态
export const getSanitaryObjection = (obj) => http.GET('./api/sanitationObjection/list', obj)

// 添加卫生异议
export const addSanitaryObjection = (obj) => http.POST('./api/sanitationObjection/add', obj)

// 提交卫生异议 （学生给宿管）
export const applySanitaryObjection = (obj) => http.GET('./api/sanitationObjection/apply', obj)

// 提交卫生异议 （宿管给分管领导）
export const submitSanitaryObjection = (obj) => http.GET('./api/sanitationObjection/submit', obj)

// 删除卫生异议
export const deleteSanitaryObjection = (obj) => http.GET('./api/sanitationObjection/del', obj)

// 同意（或拒绝）卫生异议
export const agreeSanitaryObjection = (obj) => http.GET('./api/sanitationObjection/agree', obj)

// 查询某位宿管收到的卫生异议反馈 来自分管领导的
export const getSanitaryObjectionNotification = (id) => http.GET('/api/sanitationObjectionReviewResultNotification/' + id, {})

// 处理某条卫生异议反馈 修改对应的成绩
export const processSanitaryObjection = (obj) => http.GET('/api/sanitationObjectionReviewResultNotification/process', obj)
