# 2FA Mini App

This is a self-contained mini app designed to be loaded into the host app via module federation. It includes both UI and native code to support time-based 2FA token generation.

## Responsibilities

- Exposes a native module that returns a unique device identifier
- Provides a setup screen where users can configure:
  - Secret value
  - Issuer name
  - Interval (in seconds)
- Stores the configuration persistently using `AsyncStorage`
- Generates a 6-digit token using `js-sha1`
- Returns the generated token to the host app when invoked

## Structure

```
apps/2fa-mini-app/
├── ios/                       # objective-C based native module
│   └── DeviceIdentifier.m
└── src/
    ├── native/DeviceIdentifier.js  # JS wrapper for native methods
    ├── utils/GenerateToken.js        # Genrate Token 
    └── screens/Setup2FAScreen.tsx   # UI for configuring the token
```

## React Native Bridging

- Native modules are defined in Objective C.
- They are exposed to JavaScript using the standard `NativeModules` API.
- The `getDeviceIdentifier()` method is used during token generation to provide device-specific disorder.

## Token Generation Logic

1. Configuration is saved via the setup screen.
2. `generateToken()` is called (either by mini app itself or host).
3. It loads config from storage and requests the device ID from the native module.
4. Combines secret + deviceId + issuer into a derived seed.
5. Uses `js-sha1` with the interval to generate a valid 6-digit token.

This mini app is not standalone; it is intended to be consumed by the host app via module federation.