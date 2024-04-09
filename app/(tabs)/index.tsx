import { StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import MapComponent from '@/components/map'
import { useQuery } from '@tanstack/react-query'
import { fetchHomeInfoDetailSvc } from '@/service/api'
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus'
import { UrbtyOfctlLttotPblancDetail } from '@/model/home'

export default function TabOneScreen() {
  const { isPending, error, data, refetch, isLoading } = useQuery<
    UrbtyOfctlLttotPblancDetail,
    Error
  >({
    queryKey: ['UrbtyOfctlLttotPblancDetail'],
    queryFn: fetchHomeInfoDetailSvc,
  })
  //   const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)
  //   useRefreshOnFocus(refetch)

  return (
    <View style={styles.container}>
      <MapComponent data={data} isLoading={isLoading} />
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
