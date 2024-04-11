import React, { useCallback } from 'react'
import { Marker, MarkerSelectEvent } from 'react-native-maps'
import { StyleSheet } from 'react-native'
import { InitRegionLocationModel } from '.'
import { APTLttotPblancDetailData } from '@/model/home'
import { Text, View } from '../Themed'

type OptionalRegionLocation = {
  count?: number
  children?: APTLttotPblancDetailData[]
}
type RegionModel = InitRegionLocationModel & OptionalRegionLocation

type Props = {
  locationData: Array<RegionModel>
}

function MarkerComponent({ locationData }: Props) {
  const handleMarkerSelect = useCallback((event: MarkerSelectEvent) => {
    console.log(event)
  }, [])

  return (
    <>
      {locationData.map((item) => (
        <MarkerListItem {...item} onMarkerSelect={handleMarkerSelect} />
      ))}
    </>
  )
}

type MarkerListItemModel = RegionModel & {
  onMarkerSelect: (event: MarkerSelectEvent) => void
}

const MarkerListItem = React.memo((props: MarkerListItemModel) => {
  const { city, lat, lng, count, onMarkerSelect } = props

  return (
    <Marker
      key={city}
      coordinate={{
        latitude: lat,
        longitude: lng,
      }}
      title={city}
      onSelect={onMarkerSelect}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{city}</Text>
        <Text style={styles.title}>{count}</Text>
      </View>
    </Marker>
  )
})

const styles = StyleSheet.create({
  container: {
    width: 70,
    flex: 1,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    opacity: 0.9,
    padding: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default MarkerComponent
