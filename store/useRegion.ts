import { create } from 'zustand'
import { Dimensions } from 'react-native'
import { LatLng } from 'react-native-maps'
import { getCoordinateByProvince, getRatioByProvince } from '@/lib/utils'

type RegionModel = {
  region: {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
  }
}

type Action = {
  handleRegion: (coordinate: LatLng, city: string) => void
}

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const useRegion = create<RegionModel & Action>((set) => ({
  region: {
    latitude: 36,
    longitude: 127.8,
    latitudeDelta: 5.9, // 위도 범위
    longitudeDelta: 5.9 * ASPECT_RATIO, // 경도 범위,
  },
  handleRegion: (currentRegion, city) =>
    set((state) => {
      const ratio = getRatioByProvince(city)
      // console.log(city, ratio)
      const { latitude, longitude } = getCoordinateByProvince(city)
      return {
        region: {
          latitude: latitude,
          latitudeDelta: state.region.latitudeDelta * ratio,
          longitude: longitude,
          longitudeDelta: state.region.longitudeDelta * ratio,
        },
      }
    }),
}))

export default useRegion
