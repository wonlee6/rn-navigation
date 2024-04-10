import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function MapContainer({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1 }}>
      {children}
      {/* <View style={styles.buttonContainer}>
                <TouchableOpacity
                    // onPress={() => this.setState({markers: []})}
                    style={styles.bubble}
                >
                    <Text>Tap map to create a marker of random color</Text>
                </TouchableOpacity>
            </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
})
