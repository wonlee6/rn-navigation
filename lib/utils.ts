import { APTLttotPblancDetailData, UrbtyOfctlLttotPblancDetailData } from '@/model/home'
import { LatLng } from 'react-native-maps'

export const getCoordinateByAddress = async (address: string): Promise<LatLng> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&region=kr&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`
  )
  const data = await response.json()
  const { lat, lng } = data.results[0].geometry.location
  return {
    latitude: lat,
    longitude: lng,
  }
}

type ReturnRegionCount = {
  city: string
  count: number
}

export function getRegionCount(
  data: UrbtyOfctlLttotPblancDetailData[]
): ReturnRegionCount[] {
  return data.reduce((acc: ReturnRegionCount[], cur) => {
    const cityName = convertCityName(cur.HSSPLY_ADRES.split(' ')[0])
    if (!acc.find((v) => v.city === cityName)) {
      return [...acc, { city: cityName, count: 1 }]
    }
    return acc.map((i) => {
      if (i.city === cityName) {
        return {
          ...i,
          count: i.count + 1,
        }
      }
      return i
    })
  }, [])
}

function convertCityName(SUBSCRPT_AREA_CODE: string): string {
  switch (SUBSCRPT_AREA_CODE) {
    case '서울특별시':
      return '서울'
    case '강원도':
      return '강원'
    case '대전광역시':
      return '대전'
    case '충청남도':
      return '충남'
    case '세종특별자치시':
      return '세종'
    case '충청북도':
      return '충북'
    case '인천광역시':
      return '인천'
    case '경기도':
      return '경기'
    case '광주광역시':
      return '광주'
    case '전라남도':
      return '전남'
    case '전라북도':
      return '전북'
    case '부산광역시':
      return '부산'
    case '경상남도':
      return '경남'
    case '울산광역시':
      return '울산'
    case '제주특별자치도':
      return '제주'
    case '대구광역시':
      return '대구'
    case '경상북도':
      return '경북'
    default:
      return ''
  }
}

type ReturnRegionData = Record<string, APTLttotPblancDetailData[]>

export function convertRegionData(data: APTLttotPblancDetailData[]): ReturnRegionData {
  return data.reduce(
    (acc: ReturnRegionData, cur) => {
      switch (cur.SUBSCRPT_AREA_CODE) {
        case '100':
          acc['서울']?.push(cur)
        case '200':
          acc['강원']?.push(cur)
        case '300':
          acc['대전']?.push(cur)
        case '312':
          acc['충남']?.push(cur)
        case '338':
          acc['세종']?.push(cur)
        case '360':
          acc['충북']?.push(cur)
        case '400':
          acc['인천']?.push(cur)
        case '410':
          acc['경기']?.push(cur)
        case '500':
          acc['광주']?.push(cur)
        case '513':
          acc['전남']?.push(cur)
        case '560':
          acc['전북']?.push(cur)
        case '600':
          acc['부산']?.push(cur)
        case '621':
          acc['경남']?.push(cur)
        case '680':
          acc['울산']?.push(cur)
        case '690':
          acc['제주']?.push(cur)
        case '700':
          acc['대구']?.push(cur)
        case '712':
          acc['경북']?.push(cur)
      }
      // if (cur.SUBSCRPT_AREA_CODE === "100") {
      //     acc["서울"]?.push(cur);
      // } else if (cur.SUBSCRPT_AREA_CODE === "200") {
      //     acc["강원"]?.push(cur);
      // } else if (cur.SUBSCRPT_AREA_CODE === "300") {
      //     acc["대전"]?.push(cur);
      // } else if (cur.SUBSCRPT_AREA_CODE === "312") {
      //     acc["충남"]?.push(cur);
      // } else if (cur.SUBSCRPT_AREA_CODE === "338") {
      //     acc["세종"]?.push(cur);
      // } else if (cur.SUBSCRPT_AREA_CODE === "360") {
      //     acc["충북"]?.push(cur);
      // } else if (cur.SUBSCRPT_AREA_CODE === "400") {
      //     acc["인천"]?.push(cur);
      // } else if (cur.SUBSCRPT_AREA_CODE === "410") {
      //     acc["경기"]?.push(cur);
      // } else if (cur.SUBSCRPT_AREA_CODE === "500") {
      //     acc["광주"]?.push(cur);
      // } else if (cur.SUBSCRPT_AREA_CODE === "513") {
      //     acc["전남"]?.push(cur);
      // } else if (cur.SUBSCRPT_AREA_CODE === "560") {
      //     acc["전남"]?.push(cur);
      // } else if (cur.SUBSCRPT_AREA_CODE === "600") {
      //     acc["부산"]?.push(cur);
      // } else if (cur.SUBSCRPT_AREA_CODE === "621") {
      //     acc["경남"]?.push(cur);
      // } else if (cur.SUBSCRPT_AREA_CODE === "680") {
      //     acc["울산"]?.push(cur);
      // } else if (cur.SUBSCRPT_AREA_CODE === "690") {
      //     acc["제주"]?.push(cur);
      // } else if (cur.SUBSCRPT_AREA_CODE === "700") {
      //     acc["대구"]?.push(cur);
      // } else if (cur.SUBSCRPT_AREA_CODE === "712") {
      //     acc["경북"]?.push(cur);
      // }
      return acc
    },
    {
      서울: [],
      강원: [],
      대전: [],
      충남: [],
      세종: [],
      충북: [],
      인천: [],
      경기: [],
      광주: [],
      전남: [],
      전북: [],
      부산: [],
      경남: [],
      울산: [],
      제주: [],
      대구: [],
      경북: [],
    }
  )
}

export function getCoordinateByProvince(province: string): {
  latitude: number
  longitude: number
} {
  switch (province) {
    case '서울':
      return {
        latitude: 37.52946700184102,
        longitude: 126.98338177953174,
      }
    case '강원':
      return {
        latitude: 37.58930507165609,
        longitude: 128.4720543368826,
      }
    case '대전':
      return {
        latitude: 36.339750047496786,
        longitude: 127.3943827411547,
      }
    case '충남':
      return {
        latitude: 36.63924021274023,
        longitude: 126.82446696967028,
      }
    case '세종':
      return {
        latitude: 36.515106645179976,
        longitude: 127.26286767069315,
      }
    case '충북':
      return {
        latitude: 36.77560946171977,
        longitude: 127.81026663881764,
      }
    case '인천':
      return {
        latitude: 37.48694394271754,
        longitude: 126.70737538180447,
      }
    case '경기':
      return {
        latitude: 37.535552270362494,
        longitude: 127.07219922714172,
      }
    case '광주':
      return {
        latitude: 35.15059988167678,
        longitude: 126.8316463479257,
      }
    case '전남':
      return {
        latitude: 34.873344729478546,
        longitude: 126.87696495144132,
      }
    case '전북':
      return {
        latitude: 35.81362171998036,
        longitude: 127.12965049831632,
      }
    case '부산':
      return {
        latitude: 35.12650750940228,
        longitude: 129.05706177989632,
      }
    case '경남':
      return {
        latitude: 35.43927447487706,
        longitude: 128.4367420056836,
      }
    case '울산':
      return {
        latitude: 35.55108290196517,
        longitude: 129.2991687634961,
      }
    case '제주':
      return {
        latitude: 33.40915344710227,
        longitude: 126.56388289599572,
      }
    case '대구':
      return {
        latitude: 35.8567409351135,
        longitude: 128.58890020970682,
      }
    case '경북':
      return {
        latitude: 36.531623307426514,
        longitude: 128.76441121439493,
      }
    default:
      return {
        latitude: 37.52946700184102,
        longitude: 126.98338177953174,
      }
  }
}

export function getRatioByProvince(province: string) {
  switch (province) {
    case '서울':
      return 0.09
    case '강원':
      return 0.4
    case '대전':
      return 0.035
    case '충남':
      return 0.3
    case '세종':
      return 0.025
    case '충북':
      return 0.24
    case '경기':
      return 0.2
    case '광주':
      return 0.06
    case '전남':
      return 0.5
    case '전북':
      return 0.3
    case '부산':
      return 0.09
    case '경남':
      return 0.4
    case '울산':
      return 0.2
    case '제주':
      return 0.3
    case '대구':
      return 0.07
    case '경북':
      return 0.4
    default:
      return 1
  }
}

// switch (SUBSCRPT_AREA_CODE) {
//   case '100':
//     return '서울'
//   case '200':
//     return '강원'
//   case '300':
//     return '대전'
//   case '312':
//     return '충남'
//   case '338':
//     return '세종'
//   case '360':
//     return '충북'
//   case '400':
//     return '인천'
//   case '410':
//     return '경기'
//   case '500':
//     return '광주'
//   case '513':
//     return '전남'
//   case '560':
//     return '전북'
//   case '600':
//     return '부산'
//   case '621':
//     return '경남'
//   case '680':
//     return '울산'
//   case '690':
//     return '제주'
//   case '700':
//     return '대구'
//   case '712':
//     return '경북'
//   default:
//     return ''
// }
