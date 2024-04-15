import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { LatLng, Marker } from 'react-native-maps'

import { RegionCountModel, UrbtyOfctlLttotPblancDetailData } from '@/model/home'
import useRegion from '@/store/useRegion'
import { getRegionCount } from '@/lib/utils'
import { initRegionLocation } from '@/data/init-region-location'
import useHome from '@/store/useHome'
import { Text, View } from '../Themed'

function MarkerComponent() {
  const homeData = useHome((state) => state.homeData)
  const convertHomeData = useHome((state) => state.convertHomeData)
  const region = useRegion((state) => state.region)

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

  const [isSelectRegion, setIsSelectRegion] = useState(false)

  const handleSelectRegion = useCallback(() => {
    setIsSelectRegion(true)
  }, [])

  useEffect(() => {
    if (region.latitudeDelta < 1) {
      setIsSelectRegion(false)
    }
  }, [region])

  if (isSelectRegion) {
    return (
      <>
        {convertHomeData.map((item, index) => {
          if (item) {
            return <MarkerListItem2 key={item.HOUSE_MANAGE_NO} {...item} index={index} />
          }
        })}
      </>
    )
  }

  return (
    <>
      {filteredRegionData.map((item) => (
        <MarkerListItem key={item.city} onSelectRegion={handleSelectRegion} {...item} />
      ))}
    </>
  )
}

type TestProps = RegionCountModel & {
  onSelectRegion: () => void
}

const MarkerListItem = React.memo((props: TestProps) => {
  const { city, lat, lng, count, onSelectRegion } = props
  const handleRegion = useRegion((state) => state.handleRegion)

  return (
    <Marker
      key={city}
      coordinate={{
        latitude: lat,
        longitude: lng,
      }}
      onPress={() => {
        handleRegion(city)
        onSelectRegion()
      }}
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

type MarkerListProps = UrbtyOfctlLttotPblancDetailData &
  LatLng & {
    index: number
  }

const MarkerListItem2 = React.memo((props: MarkerListProps) => {
  return (
    <Marker
      key={props.HOUSE_MANAGE_NO + String(props.index)}
      coordinate={{
        latitude: props.latitude,
        longitude: props.longitude,
      }}
      // onPress={() => props.onSelectRegion()}
    >
      <View
        style={{
          width: 160,
          flex: 1,
          shadowColor: 'black',
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          opacity: 0.9,
          borderRadius: 6,
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.cityTitle}>{props.HOUSE_DTL_SECD_NM}</Text>
        </View>
        <View>
          <Text style={styles.count} ellipsizeMode='tail' numberOfLines={2}>
            {props.HOUSE_NM}
          </Text>
        </View>
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
    flex: 1,
    borderRadius: 2,
    padding: 1,
    backgroundColor: '#113264',
  },
  cityTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#EFF1EF',
  },
  count: {
    textAlign: 'center',
    fontSize: 14,
    // color: '#202020',
  },
})

export default MarkerComponent
