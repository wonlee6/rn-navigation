import React, { useEffect, useMemo, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'

import MapView from 'react-native-maps'
import {
  APTLttotPblancDetail,
  APTLttotPblancDetailData,
  UrbtyOfctlLttotPblancDetailData,
} from '@/model/home'
import useLocationPermission from '@/hooks/useLocationPermission'
import MapContainer from './MapContainer'
import MarkerComponent from './MarkerComponent'
import { convertRegionData } from '@/lib/utils'

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
  longitudeDelta:number
}
export default function MapComponent({
  isLoading,
  mapData,
}: {
  isLoading: boolean
  mapData: APTLttotPblancDetail
}) {
  const location = useLocationPermission()
  // useEffect(() => console.log(location), [location])
  const { width, height } = Dimensions.get('window')
  const ASPECT_RATIO = width / height

  const [region, setRegion] = useState<RegionModel>({
    latitude: 36,
    longitude: 127.8,
    latitudeDelta: 5.9,
    longitudeDelta: 5.9 * ASPECT_RATIO,
  })

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
        //   provider={this.props.provider}
        style={styles.map}
        initialRegion={region}
        onRegionChange={(region, detail) => setRegion(region)}
        // customMapStyle={customStyle}
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
    lat: 37.540705,
    lng: 126.956764,
    city: '서울',
  },
  {
    lat: 37.469221,
    lng: 126.573234,
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
    lat: 36.321655,
    lng: 127.378953,
    city: '대전',
  },
  {
    lat: 35.198362,
    lng: 129.053922,
    city: '부산',
  },
  {
    lat: 37.567167,
    lng: 127.190292,
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
    lng: 128.664734,
    city: '경남',
  },
  {
    lat: 35.716705,
    lng: 127.144185,
    city: '전북',
  },
  {
    lat: 34.8194,
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
