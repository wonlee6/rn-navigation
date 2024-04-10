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

// {
//   서울: APTLttotPblancDetailData[]
//   강원: APTLttotPblancDetailData[]
//   대전: APTLttotPblancDetailData[]
//   충남: APTLttotPblancDetailData[]
//   세종: APTLttotPblancDetailData[]
//   충북: APTLttotPblancDetailData[]
//   인천: APTLttotPblancDetailData[]
//   경기: APTLttotPblancDetailData[]
//   광주: APTLttotPblancDetailData[]
//   전남: APTLttotPblancDetailData[]
//   전북: APTLttotPblancDetailData[]
//   부산: APTLttotPblancDetailData[]
//   경남: APTLttotPblancDetailData[]
//   울산: APTLttotPblancDetailData[]
//   제주: APTLttotPblancDetailData[]
//   대구: APTLttotPblancDetailData[]
//   경북: APTLttotPblancDetailData[]
// }

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
