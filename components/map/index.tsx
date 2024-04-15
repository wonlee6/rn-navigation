import React, { useEffect } from 'react'
import { Dimensions, StyleSheet } from 'react-native'

import MapView from 'react-native-maps'
// import useLocationPermission from '@/hooks/useLocationPermission'
import MapContainer from './MapContainer'
import MarkerComponent from './MarkerComponent'
import useRegion from '@/store/useRegion'

export default function MapComponent({ isLoading }: { isLoading: boolean }) {
  // const location = useLocationPermission()
  // useEffect(() => console.log(location), [location])

  const region = useRegion((state) => state.region)

  const handleRegionChangeComplete = useRegion(
    (state) => state.handleRegionChangeComplete
  )

  // const getLocationData = async () => {
  // let arr: UrbtyOfctlLttotPblancDetailLocation[] = []
  // for (const item of mapData.data) {
  //   const { lat, lng } = await getLocation(item.HSSPLY_ADRES)
  //   arr = [...arr, { ...item, lat, lng }]
  // }
  // setMakerData(arr)
  // setMakerData(getAPTLttotPblancDetail as UrbtyOfctlLttotPblancDetailLocation[])
  // }

  // useEffect(() => {
  //   getLocationData()
  // }, [mapData])

  return (
    <MapContainer>
      <MapView
        provider={'google'}
        style={styles.map}
        initialRegion={region}
        // region={region}
        // onRegionChange={(region) => handleRegionChangeComplete(region)}
        onRegionChangeComplete={(region, details) => handleRegionChangeComplete(region)}
        // onMarkerPress={handlePressMarker}
        customMapStyle={customStyle}
        // loadingEnabled={isLoading}
        // loadingIndicatorColor='#666666'
        // loadingBackgroundColor='#eeeeee'
        // showsUserLocation
        // showsMyLocationButton
      >
        <MarkerComponent />
      </MapView>
    </MapContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
})

const customStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
]
