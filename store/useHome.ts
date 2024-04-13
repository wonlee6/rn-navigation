import { create } from 'zustand'
import { UrbtyOfctlLttotPblancDetailData } from '@/model/home'
import { getCoordinateByAddress } from '@/lib/utils'
import { LatLng } from 'react-native-maps'

type RegionModel = {
  homeData: UrbtyOfctlLttotPblancDetailData[]
  convertHomeData: Array<UrbtyOfctlLttotPblancDetailData & LatLng>
}

type Action = {
  handleRegion: (homeData: UrbtyOfctlLttotPblancDetailData[]) => void
}

const useHome = create<RegionModel & Action>((set) => ({
  homeData: [],
  convertHomeData: [],
  handleRegion: async (homeData) => {
    let arr: Array<UrbtyOfctlLttotPblancDetailData & LatLng> = []
    for (const item of homeData) {
      const aa = await getCoordinateByAddress(item.HSSPLY_ADRES)
      arr.push({ ...item, ...aa })
    }
    set((state) => ({ homeData, convertHomeData: arr }))
  },
}))

export default useHome
