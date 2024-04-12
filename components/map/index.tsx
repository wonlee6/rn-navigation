import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'

import MapView, { LatLng, MarkerPressEvent } from 'react-native-maps'
import {
  APTLttotPblancDetail,
  APTLttotPblancDetailData,
  UrbtyOfctlLttotPblancDetailData,
} from '@/model/home'
import useLocationPermission from '@/hooks/useLocationPermission'
import MapContainer from './MapContainer'
import MarkerComponent from './MarkerComponent'
import { convertRegionData } from '@/lib/utils'
import useRegion from '@/store/useRegion'

type OptionalRegionLocation = {
  count?: number
  children?: APTLttotPblancDetailData[]
}
export type InitRegionLocationModel = {
  lat: number
  lng: number
  city: string
} & OptionalRegionLocation

type RegionModel = {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

export default function MapComponent({
  isLoading,
  mapData,
}: {
  isLoading: boolean
  mapData: APTLttotPblancDetail
}) {
  // const location = useLocationPermission()
  // useEffect(() => console.log(location), [location])

  const region = useRegion((state) => state.region)

  // const [region, setRegion] = useState<RegionModel>({
  //   latitude: 36,
  //   longitude: 127.8,
  //   latitudeDelta: 5.9, // 위도 범위
  //   longitudeDelta: 5.9 * ASPECT_RATIO, // 경도 범위
  // })

  // const handlePressMarker = useCallback(
  //   (event: MarkerPressEvent) => {
  //     const coodinate = event.nativeEvent.coordinate
  //     setRegion({
  //       // ...region,
  //       latitude: coodinate.latitude,
  //       latitudeDelta: region.latitudeDelta * 0.13,
  //       longitude: coodinate.longitude,
  //       longitudeDelta: region.longitudeDelta * 0.13,
  //     })
  //   },
  //   [region]
  // )

  const filteredRegionData = useMemo(() => {
    const regionData = convertRegionData(mapData.data)
    return initRegionLocation.map((item) => {
      return {
        ...item,
        count: regionData[item.city].length,
        // children: regionData[item.city],
      }
    })
  }, [mapData])

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
        // initialRegion={region}
        region={region}
        // onRegionChange={(region) => setRegion(region)}
        // onRegionChangeComplete={(region, details) => {
        //   console.log('latitudeDelta', region.latitudeDelta)
        //   console.log('longitudeDelta', region.longitudeDelta)
        //   console.log('ASPECT_RATIO', ASPECT_RATIO)
        // }}
        // onMarkerPress={handlePressMarker}
        customMapStyle={customStyle}
        loadingEnabled={isLoading}
        loadingIndicatorColor='#666666'
        loadingBackgroundColor='#eeeeee'
        // showsUserLocation
        // showsMyLocationButton
      >
        <MarkerComponent locationData={filteredRegionData} />
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

const initRegionLocation: InitRegionLocationModel[] = [
  {
    lat: 37.46615771219145,
    lng: 127.09904736234534,
    city: '서울',
  },
  {
    lat: 37.2593484544146,
    lng: 126.39466259672034,
    city: '인천',
  },
  {
    lat: 35.126033,
    lng: 126.831302,
    city: '광주',
  },
  {
    lat: 35.798838,
    lng: 128.583052,
    city: '대구',
  },
  {
    lat: 35.519301,
    lng: 129.239078,
    city: '울산',
  },
  {
    lat: 36.221655,
    lng: 127.378953,
    city: '대전',
  },
  {
    lat: 35.028362,
    lng: 129.053922,
    city: '부산',
  },
  {
    lat: 37.12842233974353,
    lng: 127.38850048734534,
    city: '경기',
  },
  {
    lat: 37.555837,
    lng: 128.209315,
    city: '강원',
  },
  {
    lat: 36.557229,
    lng: 126.779757,
    city: '충남',
  },
  {
    lat: 36.628503,
    lng: 127.929344,
    city: '충북',
  },
  {
    lat: 36.248647,
    lng: 128.664734,
    city: '경북',
  },
  {
    lat: 35.259787,
    lng: 128.364734,
    city: '경남',
  },
  {
    lat: 35.716705,
    lng: 127.144185,
    city: '전북',
  },
  {
    lat: 34.7194,
    lng: 126.893113,
    city: '전남',
  },
  {
    lat: 33.364805,
    lng: 126.542671,
    city: '제주',
  },
]

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
