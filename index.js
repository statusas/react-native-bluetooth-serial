const ReactNative = require('react-native')
const { Buffer } = require('buffer')
const { NativeModules, DeviceEventEmitter } = ReactNative

const BluetoothSerial =
  NativeModules.BluetoothSerial ||
  NativeModules.RCTBluetoothSerial

if (!BluetoothSerial) {
  throw new Error(
    'react-native-bluetooth-serial-v2: native module not found. Tried NativeModules.BluetoothSerial and NativeModules.RCTBluetoothSerial.'
  )
}

BluetoothSerial.on = (eventName, handler) => {
  DeviceEventEmitter.addListener(eventName, handler)
}

BluetoothSerial.removeAllListeners = () => {
  DeviceEventEmitter.removeAllListeners()
}

BluetoothSerial.write = (data) => {
  if (typeof data === 'string') {
    data = Buffer.from(data)
  }
  return BluetoothSerial.writeToDevice(data.toString('base64'))
}

module.exports = BluetoothSerial