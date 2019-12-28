import React from 'react'

import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

const style = {
  root: 'bg-tertiary h-full'
}
// TODO - use geolocation
export default function HomePage () {
  React.useMemo(() => setTimeout(() => {
    const map = new Map({
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
    })
    // Attempt to make IOS work

    // const child = (elem, level = 1) => {
    //   for (let i = 0; i < level; i++) elem = elem.children[0]
    //   return elem
    // }
    // setTimeout(() => {
    //   const mapElem = document.getElementById('map')
    //   child(mapElem, 1).style = ''
    //   console.log(child(mapElem, 1).children[2].remove())
    //   child(mapElem, 2).style = ''
    //   child(mapElem, 3).style = ''
    //   child(mapElem, 4).style = ''
    // }, 100)
    return map
  }), [])

  return (
    <div className={style.root} id='map' />
  )
}
