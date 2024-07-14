import http from '@http/http'

export const getPark = (obj) => http.GET('/api/park/list', obj)

export const getBuilding = (obj) => http.GET('/api/building/list', obj)

export const getRoom = (obj) => http.GET('/api/room/list', obj)

export const getBed = (obj) => http.GET('/api/bed/list', obj)

export const addPark = (obj) => http.POST('/api/systemAdministrator/parkManagement/insert', obj)

export const addBuilding = (obj) => http.POST('/api/systemAdministrator/buildingManagement/insert', obj)

export const addRoom = (obj) => http.POST('/api/systemAdministrator/roomManagement/insert', obj)

export const addBed = (obj) => http.POST('/api/systemAdministrator/bedManagement/insert', obj)

export const updatePark = (obj) => http.POST('/api/systemAdministrator/parkManagement/update', obj)

export const updateBuilding = (obj) => http.POST('/api/systemAdministrator/buildingManagement/update', obj)

export const updateRoom = (obj) => http.POST('/api/systemAdministrator/roomManagement/update', obj)

export const updateBed = (obj) => http.POST('/api/systemAdministrator/bedManagement/update', obj)

export const delPark = (id) => http.DELETE('/api/systemAdministrator/parkManagement/delete/' + id)

export const delBuilding = (id) => http.DELETE('/api/systemAdministrator/buildingManagement/delete/' + id)

export const delRoom = (id) => http.DELETE('/api/systemAdministrator/roomManagement/delete/' + id)

export const delBed = (id) => http.DELETE('/api/systemAdministrator/bedManagement/delete/' + id)
