import { create } from 'zustand'
import { Dimensions } from 'react-native'
import { Region } from 'react-native-maps'
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
  handleRegion: (city: string) => void
  handleRegionChangeComplete: (region: Region) => void
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
  handleRegion: (city) =>
    set((state) => {
      const ratio = getRatioByProvince(city)
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
  handleRegionChangeComplete: (region) =>
    set(() => ({
      region: {
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      },
    })),
}))

export default useRegion
