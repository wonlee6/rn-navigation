import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
  LocationObject,
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location'
import MapView, { Marker } from 'react-native-maps'
import {
  UrbtyOfctlLttotPblancDetail,
  UrbtyOfctlLttotPblancDetailData,
} from '@/model/home'
import { getLocation } from '@/lib/utils'

type MMMM = UrbtyOfctlLttotPblancDetailData & {
  lat?: number
  lng?: number
}

export default function MapComponent({
  isLoading,
  mapData,
}: {
  isLoading: boolean
  mapData: UrbtyOfctlLttotPblancDetail
}) {
  const [LocationPermissionInfo, requestPermission] = useForegroundPermissions()
  const [currentLocation, setCurrentLocation] = useState<LocationObject | null>(null)

  const verifyPermission = async () => {
    if (LocationPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }
    if (LocationPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficent Permission',
        'You need to grant location permissions to use this app.'
      )
      return false
    }
    return true
  }

  const getLocationInfo = async () => {
    const hasPermission = await verifyPermission()
    if (!hasPermission) {
      return
    }
    const info = await getCurrentPositionAsync()
    setCurrentLocation(info)
  }

  useLayoutEffect(() => {
    getLocationInfo()
  }, [])

  const { width, height } = Dimensions.get('window')

  const ASPECT_RATIO = width / height
  const LATITUDE = 37.545783082491376
  const LONGITUDE = 126.99161878667414
  const LATITUDE_DELTA = 0.07
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

  // if (!currentLocation) {
  //   return <></>
  // }

  const [makerData, setMakerData] = useState<MMMM[]>([])

  const getlocationData = async () => {
    let arr: MMMM[] = []
    for (const item of mapData.data) {
      const { lat, lng } = await getLocation(item.HSSPLY_ADRES)
      arr = [...arr, { ...item, lat, lng }]
    }
    setMakerData(arr)
  }

  useEffect(() => {
    getlocationData()
  }, [mapData])

  return (
    <View style={styles.container}>
      <MapView
        //   provider={this.props.provider}
        style={styles.map}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        // customMapStyle={customStyle}
        loadingEnabled={isLoading}
        loadingIndicatorColor='#666666'
        loadingBackgroundColor='#eeeeee'
        // showsUserLocation
        // showsMyLocationButton
      >
        {makerData.map((item, index) => (
          <Marker
            key={item.HOUSE_MANAGE_NO}
            coordinate={{
              latitude: item.lat!,
              longitude: item.lng!,
            }}
            title={item.HOUSE_DTL_SECD_NM}
          />
        ))}
      </MapView>
      {/* <View style={styles.buttonContainer}>
                <TouchableOpacity
                    // onPress={() => this.setState({markers: []})}
                    style={styles.bubble}
                >
                    <Text>Tap map to create a marker of random color</Text>
                </TouchableOpacity>
            </View> */}
    </View>
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
