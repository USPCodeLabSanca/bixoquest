import API from '../../api'

export async function fetchNearbyMissions (lat, lng) {
  const { data: { data: missions } } = await API.fetchNearbyMissions(lat, lng)
  return {
    type: 'SET_NEARBY_MISSIONS',
    nearbyMissions: missions
  }
}

export async function completeMission (missionId, lat, lng) {
  await API.completeMission(missionId, lat, lng)
  return {
    type: 'COMPLETE_MISSION',
    missionId
  }
}
