import React from 'react'
import { Marker } from 'react-native-maps'
import { StyleSheet } from 'react-native'
import { APTLttotPblancDetailData, InitRegionLocationModel } from '@/model/home'
import { Text, View } from '../Themed'
import useRegion from '@/store/useRegion'

type OptionalRegionLocation = {
  count?: number
  children?: APTLttotPblancDetailData[]
}
type RegionModel = InitRegionLocationModel & OptionalRegionLocation

type Props = {
  locationData: Array<RegionModel>
}

function MarkerComponent({ locationData }: Props) {
  return (
    <>
      {locationData.map((item) => (
        <MarkerListItem {...item} key={item.city} />
      ))}
    </>
  )
}

type MarkerListItemModel = RegionModel & {}

const MarkerListItem = React.memo((props: MarkerListItemModel) => {
  const { city, lat, lng, count } = props
  const handleRegion = useRegion((state) => state.handleRegion)

  return (
    <Marker
      key={city}
      coordinate={{
        latitude: lat,
        longitude: lng,
      }}
      onPress={(event) => handleRegion(event.nativeEvent.coordinate, city)}
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
    color: '#202020',
  },
})

export default MarkerComponent
