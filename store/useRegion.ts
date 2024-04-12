import { create } from 'zustand'
import { Dimensions } from 'react-native'
import { LatLng } from 'react-native-maps'

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
      console.log(city, ratio)
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

function getCoordinateByProvince(province: string): {
  latitude: number
  longitude: number
} {
  switch (province) {
    case '서울':
      return {
        latitude: 37.52946700184102,
        longitude: 126.98338177953174,
      }
    default:
      return {
        latitude: 37.52946700184102,
        longitude: 126.98338177953174,
      }
  }
}

function getRatioByProvince(province: string) {
  switch (province) {
    case '서울':
      return 0.09
    default:
      return 0.13
  }
}
// 서울
// 강원
// 대전
// 충남
// 세종
// 충북
// 인천
// 경기
// 광주
// 전남
// 전북
// 부산
// 경남
// 울산
// 제주
// 대구
// 경북
// if (
//   province === '강원' ||
//   province === '충남' ||
//   province === '충북' ||
//   province === '전남' ||
//   province === '전북' ||
//   province === '경남' ||
//   province === '경북'
// ) {
//   return 0.38
// }
