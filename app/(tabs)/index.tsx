import { StyleSheet, ActivityIndicator } from 'react-native'

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

  if (isPending) {
    return <ActivityIndicator size='large' />
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error</Text>
      </View>
    )
  }

  return <MapComponent mapData={data} isLoading={isLoading} />
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
})
