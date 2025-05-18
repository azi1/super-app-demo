import { NativeModules } from 'react-native';

const { DeviceIdentifier } = NativeModules;

/**
 * @returns {Promise<string>}
 */
export function getDeviceIdentifier() {
  return DeviceIdentifier.getDeviceIdentifier();
}
