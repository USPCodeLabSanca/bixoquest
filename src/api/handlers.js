import API from './base-api'
import { withCustomError } from './error-message'

/** @template T @typedef { import('axios').AxiosResponse<T> } AxiosResponse */

/** @template T @typedef { Promise<AxiosResponse<{
  message: string,
  success: boolean,
  data: T
}>> } APIResponse */

const Handlers = {

  login: withCustomError(
    /** @argument {{ nusp: string, password: string }} userInfo
    @returns { APIResponse<{{ _id: string, nusp: string, name: string, course: string }}> } */
    (userInfo) => API.post('/auth', userInfo),
    { 401: 'Desculpe, Suas credenciais são inválidas! Por acaso você errou alguma coisa?' }
  ),

  fetchNearbyMissions: (lat, long) => API.get(`/missions?lat=${lat}&lng=${long}`),

  completeMission: (missionId, lat, lng) => API.post(`/missions/${missionId}/complete`, { lat, lng }),

  getAllMissions: () => API.get('/missions/all'),

  openPack: () => API.post('/packs/open')
}

export default Handlers
