const BASE_URL = 'https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/'

// 주택관리번호, 공고번호, 공급지역명, 모집공고일 값을 이용하여 APT 분양정보의 상세정보를 제공
const home1 = 'getAPTLttotPblancDetail'
// 주택관리번호, 공고번호 값을 이용하여 오피스텔/도시형/민간임대/생활숙박시설 분양정보 주택형별 상세정보를 제공
const home2 = 'getUrbtyOfctlLttotPblancDetail'

export const fetchHomeInfoDetailSvc = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}${home1}?page=1&perPage=30&serviceKey=${process.env.EXPO_PUBLIC_API_KEY}`,
      {
        method: 'GET',
      }
    )
    const data = await response.json()
    return data
  } catch (e) {
    console.error(e)
    return []
  }
}
