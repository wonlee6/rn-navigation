import { create } from 'zustand'
import { UrbtyOfctlLttotPblancDetailData } from '@/model/home'
import { getCoordinateByAddress } from '@/lib/utils'
import { LatLng } from 'react-native-maps'

type RegionModel = {
  homeData: UrbtyOfctlLttotPblancDetailData[]
  convertHomeData: Array<UrbtyOfctlLttotPblancDetailData & LatLng>
}

type Action = {
  handleHome: (homeData: UrbtyOfctlLttotPblancDetailData[]) => void
}

const useHome = create<RegionModel & Action>()((set) => ({
  homeData: [],
  convertHomeData: [],
  handleHome: async (homeData) => {
    let arr: Array<UrbtyOfctlLttotPblancDetailData & LatLng> = []
    for (const item of homeData) {
      const aa = await getCoordinateByAddress(item.HSSPLY_ADRES)
      arr.push({ ...item, ...aa })
    }
    console.log(1)
    const test = arr.reduce(
      (
        acc: Array<UrbtyOfctlLttotPblancDetailData & LatLng>,
        cur: UrbtyOfctlLttotPblancDetailData & LatLng
      ) => {
        if (
          acc.find((v) => v.latitude === cur.latitude && v.longitude === cur.longitude)
        ) {
          acc.push({
            ...cur,
            latitude: cur.latitude + 0.003,
            longitude: cur.longitude + 0.003,
          })
        } else {
          acc.push(cur)
        }
        return acc
      },
      []
    )
    set(() => ({ homeData, convertHomeData: test }))
  },
}))

export default useHome
