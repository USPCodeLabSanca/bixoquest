import React from 'react'

import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'

// OL imports
import { Map, View } from 'ol'
import { fromLonLat } from 'ol/proj'
import { Style, Fill, Icon as IconStyle, Text as TextStyle, Stroke } from 'ol/style'
import { Point } from 'ol/geom'
import Feature from 'ol/Feature'
import { Vector as VectorSource } from 'ol/source'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import OSM from 'ol/source/OSM'

import LocationPin from './location-pin.png'

const style = {
  root: 'bg-tertiary h-full'
}

const userPositionFeature = new Feature(new Point([0, 0]))

userPositionFeature.setStyle(new Style({
  image: new IconStyle({
    scale: 0.1,
    offset: [0, 25.51],
    src: LocationPin
  }),
  text: new TextStyle({
    text: 'Você está aqui',
    fill: new Fill({ color: '#000000' }),
    stroke: new Stroke({ color: '#000000' }),
    offsetY: -30,
    font: '20px arial'
  })
}))

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

function HomePage ({ geolocation }) {
  const map = React.useRef()

  // Creates the map
  React.useEffect(() => {
    map.current = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [userPositionFeature]
          })
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 0
      })
    })
  }, [])

  // Updates user position
  React.useEffect(() => {
    if (!geolocation.isAvailable) return
    const { position: { coords } } = geolocation
    const center = fromLonLat([coords.longitude, coords.latitude])
    map.current.setView(new View({ center, zoom: 16 }))
    userPositionFeature.setGeometry(new Point(center))
  }, [geolocation])

  return (
    <div className={style.root} id='map'>
      <WarningPopup geolocation={geolocation} />
    </div>
  )
}

export default connect(state => ({ geolocation: state.geolocation }), null)(HomePage)
