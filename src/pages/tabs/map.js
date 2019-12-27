import React from 'react'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

const style = {
  root: 'bg-tertiary h-full'
}
// TODO - use geolocation
export default function HomePage () {
  React.useMemo(() => setTimeout(() => new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: [0, 0],
      zoom: 0
    })
  })), [])

  return (
    <div className={style.root} id='map' />
  )
}
