import React from 'react'
import { Map, TileLayer } from 'react-leaflet'
import Paper from '@material-ui/core/Paper'
import { useSelector } from 'react-redux'

function WarningToast () {
  const geolocation = useSelector(state => state.geolocation)
  const [isOpen, setIsOpen] = React.useState(false)
  const [text, setText] = React.useState(resolveText(geolocation))

  function resolveText (geolocation) {
    if (geolocation.isAvailable) return 'Sucesso!'
    else if (geolocation.error) return geolocation.error.message
    else return 'Buscando sua localização...'
  }

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
        { top: 96, left: 32, right: 32, transition: '1000ms' },
        isOpen ? {} : { top: -100 }
      )}
    >
      {text}
    </Paper>
  )
}

const exist = e => e !== undefined && e !== null

function isPointValid (point) {
  if (!point) return false
  if (point instanceof Array && exist(point[0] && exist(point[1]))) return true
  return false
}

/**
@typedef { Object } MapProps
@prop {{
  center: [number, number],
  zoom: number
}} initialConfiguration
@argument { MapProps } props
*/
export default function CustomMap ({
  initialConfiguration: { center: initialCenter, zoom: initialZoom },
  children
}) {
  const geolocation = useSelector(state => state.geolocation)
  const [center, setCenter] = React.useState(isPointValid(initialCenter) && initialCenter)
  const [zoom, setZoom] = React.useState(exist(initialZoom) && initialZoom)

  React.useEffect(() => {
    if (!isPointValid(center) && isPointValid(initialCenter)) {
      setCenter(initialCenter)
    }
    if (!isPointValid(zoom) && isPointValid(initialZoom)) {
      setZoom(initialZoom)
    }
  }, [initialCenter, initialZoom])

  return (
    <>
      <WarningToast />
      {
        geolocation.isAvailable &&
          <Map
            center={center}
            zoom={zoom}
            zoomSnap={0.01}
            maxZoom={19} // Map cannot have more than 19 zoom without breaking
            style={{ height: '100%' }}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {children}
          </Map>
      }
    </>
  )
}
