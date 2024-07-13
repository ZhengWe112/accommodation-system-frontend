import http from '@http/http'

export const getPark = (obj) => http.GET('/api/park/list', obj)

export const getBuilding = (obj) => http.GET('/api/building/list', obj)

export const getRoom = (obj) => http.GET('/api/room/list', obj)

export const getBed = (obj) => http.GET('/api/bed/list', obj)
