import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Marker, Circle, Popup } from 'react-leaflet'
import { icon, point } from 'leaflet'
import { getDistance } from 'geolib'
import { toast } from 'react-toastify'

import Map from '../../components/map'
import { fetchNearbyMissions } from '../../redux/actions/missions'
import MissionDialog from '../../components/modals/mission-dialog'
import { setCurrentModal } from '../../redux/actions/modal'
import MISSION_RANGE from '../../constants/missions-range'

import QuestionMark from '../../images/question-mark.png'
import ExclamationMark from '../../images/exclamation-mark.png'

const missionIconOutOfRange = icon({
  iconUrl: QuestionMark,
  iconSize: point(40, 40)
})

const missionIconInRange = icon({
  iconUrl: ExclamationMark,
  iconSize: point(40, 40)
})

function geoToLatLng (geolocation) {
  if (!geolocation.isAvailable) return [null, null]
  const { latitude, longitude } = geolocation.position.coords
  return [latitude, longitude]
}

export default function MapScreen () {
  const dispatch = useDispatch()
  const finishedMissions = useSelector(state => state.auth.user.completed_missions)
  const geolocation = useSelector(state => state.geolocation)
  const nearbyMissions = useSelector(state => state.missions.nearbyMissions)

  const userPosition = geoToLatLng(geolocation)

  React.useEffect(() => {
    if (!geolocation.isAvailable) return
    fetchNearbyMissions(...userPosition).then(dispatch)
  }, [geolocation.isAvailable, ...userPosition])

  function inRangeMissonMarker (mission) {
    return (
      <Marker
        zIndexOffset={10000}
        key={mission._id}
        icon={missionIconInRange}
        position={[mission.lat, mission.lng]}
        onClick={() => dispatch(setCurrentModal(<MissionDialog mission={mission} />))}
      />
    )
  }

  function outOfRangeMissonMarker (mission) {
    return (
      <Marker
        zIndexOffset={10000}
        key={mission._id}
        icon={missionIconOutOfRange}
        position={[mission.lat, mission.lng]}
      >
        <Popup>
          Venha até aqui para completar essa missão
        </Popup>
      </Marker>
    )
  }

  function resolveMissionMarker (mission) {
    if (
      getDistance(
        { latitude: mission.lat, longitude: mission.lng },
        { latitude: userPosition[0], longitude: userPosition[1] }
      ) < MISSION_RANGE
    ) return inRangeMissonMarker(mission)
    return outOfRangeMissonMarker(mission)
  }

  function renderMissionMarkers () {
    if (!nearbyMissions) return null
    const unfinishedMissions = nearbyMissions.filter(
      mission => !finishedMissions.some(finishedId => finishedId === mission._id)
    )
    return unfinishedMissions.map(resolveMissionMarker)
  }

  return (
    <Map initialConfiguration={{ center: userPosition, zoom: 19 }}>
      <Circle center={userPosition} radius={MISSION_RANGE} />
      <Marker position={userPosition} />
      {renderMissionMarkers()}
    </Map>
  )
}
