import http from '@http/http'

// 获得寝室评分字典
export const getDictionary = () => http.GET('./api/dormitoryRatingDictionary/list', {})

// 获取寝室卫生记录 可以添加查询条件 限制寝室 限制创建者
export const getDormSanitaryLst = (obj) => http.GET('/api/dormSanitaryInspectionLog/list', obj)
