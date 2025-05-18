# Host App

This is the main container application in the Super App architecture. It loads mini apps at runtime using **Re.Pack with Webpack Module Federation**, and integrates with their JavaScript and native functionality.

## Responsibilities

- Provides the app container and navigation
- Dynamically loads mini apps via module federation
- Invokes methods exposed by mini apps
- Provides a UI to trigger token generation from the 2FA mini app

## Directory Structure

```
apps/host-app/
├── android/              # Native Android project
├── ios/                  # Native iOS project
└── src/
    ├── App.tsx           # Entry point and shell
    └── screens/          # Any host-specific UI screens
```

## Native Module Linking

To access native modules provided by mini apps (e.g., 2FA):

### iOS (`Podfile`)
```ruby
pod 'DeviceIdentifier', :path => '../../2fa-mini-app'
```

Then install pods:
```bash
cd ios && pod install
```


## Token Flow

1. The host app provides two buttons: **Generate 2FA Token** and **Setup 2FA**.

2. When the user taps **Setup 2FA**, the host app navigates to the 2FA mini app's configuration screen. This screen allows the user to input and save the `issuer`, `secret`, and `interval` values, which are stored locally in the device using `AsyncStorage`.

3. Once the setup is complete and the user returns to the host app, tapping **Generate 2FA Token** will invoke the `generateToken()` method exposed by the 2FA mini app.

4. The mini app loads the saved configuration, retrieves the device identifier via the native module (React Native bridging), and uses this data to generate token using `js-sha1`.

5. The resulting 6-digit token is returned to the host app and displayed in its UI.