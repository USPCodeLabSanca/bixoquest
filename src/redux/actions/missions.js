import API from '../../api'
import { correctAllMissionCoords } from '../../lib/coords-corrector'

export async function fetchNearbyMissions (lat, lng) {
  const { data: { data: missions } } = await API.fetchNearbyMissions(lat, lng)

  correctAllMissionCoords(missions)

  return {
    type: 'SET_NEARBY_MISSIONS',
    nearbyMissions: missions
  }
}

export async function completeMission (mission, lat, lng) {
  await API.completeMission(mission._id, lat, lng)
  return {
    type: 'COMPLETE_MISSION',
    mission
  }
}
