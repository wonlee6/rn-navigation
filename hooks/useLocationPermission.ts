import { useLayoutEffect, useState } from 'react'
import { Alert } from 'react-native'
import {
  LocationObject,
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location'

export default function useLocationPermission() {
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

  return currentLocation
}
