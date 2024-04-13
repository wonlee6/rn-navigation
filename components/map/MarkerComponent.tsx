import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { LatLng, Marker } from 'react-native-maps'

import { RegionCountModel, UrbtyOfctlLttotPblancDetailData } from '@/model/home'
import useRegion from '@/store/useRegion'
import { getRegionCount } from '@/lib/utils'
import { initRegionLocation } from '@/data/init-region-location'
import useHome from '@/store/useHome'
import { Text, View } from '../Themed'

function MarkerComponent() {
  const region = useRegion((state) => state.region)
  const homeData = useHome((state) => state.homeData)
  const convertHomeData = useHome((state) => state.convertHomeData)

  // const handleComine = useCallback(
  //   (
  //     results: UseQueryResult<
  //       {
  //         lat: number
  //         lng: number
  //         houseNo: string
  //       },
  //       Error
  //     >[]
  //   ) => {
  //     return {
  //       data: results.map((result) => result.data),
  //       pending: results.some((result) => result.isPending),
  //     }
  //   },
  //   [homeData]
  // )

  // const [state, setState] = useState([])

  // const coordinateByHomeData = useQueries({
  //   queries: homeData.map((data) => {
  //     return {
  //       queryKey: ['homeData_Address', data.HOUSE_MANAGE_NO],
  //       queryFn: () => getCoordinateByAddress(data.HSSPLY_ADRES, data.HOUSE_MANAGE_NO),
  //     }
  //   }),
  //   combine: handleComine,
  // })

  // useEffect(() => {
  //   if (!coordinateByHomeData.pending) {
  //     const test = homeData.map((item) => {
  //       for (const i of coordinateByHomeData.data) {
  //         if (item.HOUSE_MANAGE_NO === i?.houseNo) {
  //           return {
  //             ...item,
  //             ...i,
  //           }
  //         }
  //         return item
  //       }
  //     })
  //     setState(test as any)
  //   }
  // }, [coordinateByHomeData])
  // const filteredHomeData: Array<UrbtyOfctlLttotPblancDetailData & { lat: number; lng: number; houseNo: string }> = useMemo(() => {
  //   if (!homeData) return []

  // }, [homeData, coordinateByHomeData])

  // useEffect(() => console.log(homeData), [homeData])
  const filteredRegionData = useMemo(() => {
    const convertMapData = getRegionCount(homeData)
    return initRegionLocation.map((item) => {
      const findItem = convertMapData.find((v) => v.city === item.city)
      return {
        ...item,
        count: findItem ? findItem.count : 0,
      }
    })
  }, [homeData])

  if (region.latitudeDelta < 3) {
    return (
      <>
        {convertHomeData.map((item, index) => {
          if (item) {
            return <MarkerListItem2 key={index} {...item} />
          }
        })}
      </>
    )
  }

  return (
    <>
      {filteredRegionData.map((item) => (
        <MarkerListItem key={item.city} {...item} />
      ))}
    </>
  )
}

const MarkerListItem2 = React.memo((props: UrbtyOfctlLttotPblancDetailData & LatLng) => {
  return (
    <Marker
      key={props.HOUSE_MANAGE_NO}
      coordinate={{
        latitude: props.latitude,
        longitude: props.longitude,
      }}
      // onPress={() => handleRegion(city)}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.cityTitle}>{props.HOUSE_SECD_NM}</Text>
        </View>
        <Text style={styles.count}>{props.HOUSE_NM}</Text>
      </View>
    </Marker>
  )
})

const MarkerListItem = React.memo((props: RegionCountModel) => {
  const { city, lat, lng, count } = props
  const handleRegion = useRegion((state) => state.handleRegion)

  return (
    <Marker
      key={city}
      coordinate={{
        latitude: lat,
        longitude: lng,
      }}
      onPress={() => handleRegion(city)}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.cityTitle}>{city}</Text>
        </View>
        <Text style={styles.count}>{count}</Text>
      </View>
    </Marker>
  )
})

const styles = StyleSheet.create({
  container: {
    width: 60,
    flex: 1,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    opacity: 0.9,
    borderRadius: 6,
  },
  titleContainer: {
    borderRadius: 2,
    padding: 1,
    backgroundColor: '#113264',
  },
  cityTitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#EFF1EF',
  },
  count: {
    textAlign: 'center',
    fontSize: 16,
    // color: '#202020',
  },
})

export default MarkerComponent
