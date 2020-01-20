import React from 'react'

import Paper from '@material-ui/core/Paper'

import { useSelector, useDispatch } from 'react-redux'
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet'

import { fetchNearbyMissions } from '../../redux/actions/missions'
import MissionDialog from '../../components/modals/mission-dialog'

const resolveErrorText = errorCode => {
  const defaultMessage = 'Ops! um erro desconhecido ocorreu. Por favor, tente novamente'
  const errorMessages = {
    // More details about the errors [here](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError)
    // User denied permission
    1: 'Parece que este site não tem aceeso à sua localização. Por favor, verifique se as permissões estão corretas',
    // Position unavailable
    2: 'Tivemos um problema ao buscar sua posição. Por favor, recarregue a página e tente novamente',
    // timeout
    3: 'Tivemos um problema ao buscar sua posição. Por favor, recarregue a página e tente novamente'
  }
  return errorMessages[errorCode] || defaultMessage
}

const resolveText = geolocation => {
  const loadingText = 'Buscando sua posição...'
  if (geolocation.isAvailable) return 'Sucesso!'
  else if (geolocation.error) return resolveErrorText(geolocation.error.code)
  else return loadingText
}

const WarningPopup = ({ geolocation }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [text, setText] = React.useState(resolveText(geolocation))

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(() => {})
    const isOpen = !geolocation.isAvailable || !!geolocation.error
    setIsOpen(isOpen)
    if (isOpen) setText(resolveText(geolocation))
  }, [geolocation])
  return (
    <Paper
      className='absolute z-10 p-2 text-center'
      elevation={3}
      style={Object.assign(
        { top: 64, left: 32, right: 32, transition: '1000ms' },
        isOpen ? {} : { top: -100 }
      )}
    >
      {text}
    </Paper>
  )
}

export default function MapScreen () {
  const [selectedMission, setSelectedMission] = React.useState(null)

  const dispatch = useDispatch()
  const geolocation = useSelector(state => state.geolocation)
  const nearbyMissions = useSelector(state => state.missions.nearbyMissions)

  let lat, lng, userPosition
  if (geolocation.isAvailable) {
    ({ latitude: lat, longitude: lng } = geolocation.position.coords)
    lat = -22.007348
    lng = -47.895196
    userPosition = [lat, lng]
  }

  React.useEffect(() => {
    if (!geolocation.isAvailable) return
    (async () => {
      const action = await fetchNearbyMissions(lat, lng)
      dispatch(action)
    })()
  }, [geolocation.isAvailable, dispatch, lat, lng])

  function renderMissions () {
    if (!nearbyMissions) return null
    return nearbyMissions.map(mission => (
      <Marker
        position={[mission.lat, mission.lng]}
        key={mission._id}
        onClick={() => setSelectedMission(mission)}
      />
    ))
  }

  function renderMap () {
    if (!geolocation.isAvailable) return null
    return (
      <Map center={userPosition} zoom={18} style={{ height: '100%' }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Circle center={userPosition} radius={10} />
        <Marker position={userPosition}>
          <Popup>
            <h1 className='text-lg'>Você está aqui</h1>
          </Popup>
        </Marker>
        {renderMissions()}
      </Map>
    )
  }

  function renderOverlayComponents () {
    if (selectedMission) {
      return (
        <MissionDialog
          mission={selectedMission}
          onRequestClose={() => setSelectedMission(null)}
          onSubmit={() => console.log('submit')}
        />
      )
    }
  }

  return (
    <>
      {renderOverlayComponents()}
      <WarningPopup geolocation={geolocation} />
      {renderMap()}
    </>
  )
}
