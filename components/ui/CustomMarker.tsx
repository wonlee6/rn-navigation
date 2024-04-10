import React from 'react'
import { StyleSheet, View } from 'react-native'
import { InitRegionLocationModel, UrbtyOfctlLttotPblancDetailLocation } from '../map'
import { Text } from '../Themed'
import { APTLttotPblancDetailData } from '@/model/home'

type OptionalRegionLocation = {
  count?: number
  children?: APTLttotPblancDetailData[]
}

type Props = {
  locationData: Array<InitRegionLocationModel & OptionalRegionLocation>
}

export default function CustomMarker({ locationData }: Props) {
  return (
    <View style={styles.container}>
      <View>{/* <Text>{locationData.}</Text> */}</View>
      {/* <Text>{convertHouseType(props.SEARCH_HOUSE_SECD)}</Text> */}
      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    elevation: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    width: 100,
    height: 100,
  },
  title: {
    color: 'black',
  },
  count: {},
})

function convertHouseType(SEARCH_HOUSE_SECD: string) {
  switch (SEARCH_HOUSE_SECD) {
    case '0201':
      return '도시형생활주택'
    case '0202':
      return '오피스텔'
    case '0203':
      return '민간임대'
    case '0303':
      return '공공지원민간임대'
    default:
      return '주택'
  }
}
