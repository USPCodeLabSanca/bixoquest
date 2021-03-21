import API from './base-api'
import { withCustomError } from './error-message'

/** @template T @typedef { import('axios').AxiosResponse<T> } AxiosResponse */

/** @template T @typedef { Promise<AxiosResponse<{
  message: string,
  success: boolean,
  data: T
}>> } APIResponse */

const silentHandler = handler => withCustomError(handler, () => '_NO_ERROR_MESSAGE')

const Handlers = {
  fetchNearbyMissions: (lat, long) => API.get(`/missions?lat=${lat}&lng=${long}`),

  completeLocationMission: (missionId, lat, lng) => API.post(`/missions/${missionId}/complete`, { lat, lng }),

  completeQRCodeMission: (missionId, qrcode) => API.post(`/missions/${missionId}/complete`, { qrcode }),

  completeKeyMission: (missionId, key) => API.post(`/missions/${missionId}/complete`, { key }),

  getAllMissions: () => API.get('/missions/all'),

  openPack: () => API.post('/packs/open'),

  fetchDonationToken: (info) => API.post('/stickers/donate', info),

  sendQrCodeToken: (token) => API.post('/qrcode/scan', { token }),

  login: (email, password) => API.post('/auth/login', { email, password }),
}

export const silentHandlers = {
  tryAuthenticateWithUSPCookie: silentHandler(() => API.get('/auth/success', { withCredentials: true, headers: { 'Access-Control-Allow-Credentials': true } })),

  getUser: silentHandler(() => API.get('/user'))
}

export default Handlers
