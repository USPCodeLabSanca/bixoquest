import API from '../../api'

export async function fetchNearbyMissions (lat, long) {
  const { data: { data: missions } } = await API.fetchNearbyMissions(lat, long)
  return {
    type: 'SET_NEARBY_MISSIONS',
    nearbyMissions: missions
  }
}
