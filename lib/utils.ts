import { APTLttotPblancDetailData } from '@/model/home'

export const getLocation = async (
  address: string
): Promise<{ lat: number; lng: number }> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&region=kr&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`
  )
  const data = await response.json()
  const { lat, lng } = data.results[0].geometry.location as { lat: number; lng: number }

  return {
    lat,
    lng,
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
