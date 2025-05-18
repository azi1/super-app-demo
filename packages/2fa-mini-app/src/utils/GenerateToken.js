// mini-app/src/utils/generateToken.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import sha1 from 'js-sha1';
import { getDeviceIdentifier } from '../native/DeviceIdentifier';

// Your storage keys from Setup2FAScreen
const STORAGE_KEYS = {
  issuer:   '2FA_ISSUER',
  secret:   '2FA_SECRET',
  interval: '2FA_INTERVAL',  
};

export async function generateToken() {
  // 1. load config
  const [[, issuer], [, secret]] = await AsyncStorage.multiGet([
    STORAGE_KEYS.issuer,
    STORAGE_KEYS.secret,
  ]);

  if (!issuer || !secret) {
    throw new Error('Missing 2FA config');
  }

  // 2. get the per-device ID
  const deviceId = await getDeviceIdentifier();
  if (!deviceId) {
    throw new Error('Unable to fetch device identifier');
  }

  // 3. build the raw string
  const raw = `${secret}${deviceId}${issuer}`;

  // 4. hash it
  const hash = sha1(raw);               // 40-char hex string

  // 5. turn the last 6 hex chars into a number, mod 1e6
  const slice = hash.slice(-6);         // e.g. “a1b2c3”
  const num   = parseInt(slice, 16);    // parse as hex
  const otp   = (num % 1000000)         // ensure 6-digit
                .toString()
                .padStart(6, '0');

  return otp;                           // e.g. "492039"
}
