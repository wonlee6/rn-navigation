import { useEffect } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'

import { Text, View } from '@/components/Themed'
import MapComponent from '@/components/map'
import { useQuery } from '@tanstack/react-query'
import { fetchHomeInfoDetailSvc } from '@/service/api'
import { UrbtyOfctlLttotPblancDetail } from '@/model/home'
import useHome from '@/store/useHome'

export default function TabOneScreen() {
  const { isPending, error, data, refetch, isLoading } = useQuery<
    UrbtyOfctlLttotPblancDetail,
    Error
  >({
    queryKey: ['getUrbtyOfctlLttotPblancDetail'],
    queryFn: fetchHomeInfoDetailSvc,
  })

  const handleRegion = useHome((state) => state.handleRegion)
  // const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)
  //   useRefreshOnFocus(refetch)

  useEffect(() => {
    if (!data) return
    handleRegion(data.data)
  }, [data])

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

  return <MapComponent isLoading={isLoading} />
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
