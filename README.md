# Super App Demo

This repository demonstrates a modular Super App architecture in React Native, using **Re.Pack and Webpack Module Federation** to integrate multiple independently developed mini apps into a single host application.

The primary objective is to showcase how mini apps can be structured, built, and dynamically loaded within a host app using module federation in a mobile context.

In addition to module federation, the project highlights:

- Host-to-mini app communication via shared JavaScript interfaces
- React Native bridging using custom native modules (Swift)
- Runtime integration of native and JavaScript logic across app boundaries

The codebase follows a monorepo structure using Yarn Workspaces, and the 2FA mini app is compiled and bundled separately. The 2FA token generation feature is implemented entirely on-device, using device-specific identifiers from native code and a demo TOTP algorithm. No backend services are involved.
## Super App Demo Video

<img
  src="assets/super-app-demo.gif"
  alt="Super App Demo"
  width="400"
  height="600"
/>


## Feature Summary

- The host app provides a landing page and UI to trigger token generation.
- The host app invokes the 2FA mini app to generate a secure 2FA token.
- The 2FA mini app encapsulates the full implementation for token generation.
- The 2FA mini app includes a native module that exposes device information using React Native bridging.
- The 2FA mini app includes a configuration screen to set the 2FA secret, issuer, and time interval.
- The 2FA mini app stores the configuration securely using device storage (AsyncStorage).


## Project Structure

```
super-app-demo/
├── apps/
│   ├── host-app/         # Host container app
│   └── 2fa-mini-app/     # Mini app with native 2FA logic and config UI
├── metro.config.js       # Custom Metro config with Re.Pack
└── package.json
```

## Technologies

- React Native
- Yarn Workspaces
- Re.Pack (Webpack Module Federation)
- React Native Native Modules (Swift)
- AsyncStorage for persistent configuration
- js-sha1 for token generation

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/azi1/super-app-demo.git
cd super-app-demo
```

2. Install dependencies and native pods:
```bash
yarn bootstrap
```

## Running the Application

Start all Metro servers:
```bash
yarn start
```

Then launch the host app:
```bash
yarn run:host-app:ios
# or
yarn run:host-app:android
```

## Key Demonstrations

- The host app dynamically loads mini apps using Re.Pack.
- The 2FA mini app has a UI to configure token settings (secret, issuer, interval).
- These configs are persisted using AsyncStorage.
- The native module in the mini app exposes device ID to JS via React Native bridging.
- The host app calls the mini app's `generateToken()` method, which uses the stored config and device ID to produce token.

## App-level Documentation

- [Host App](./packages/host-app/README.md)
- [2FA Mini App](./packages/2fa-mini-app/README.md)


## Areas for Improvement

- Advanced Device Fingerprinting: Replace basic device information with a customizable fingerprinting mechanism to enhance security and resist spoofing.

- Conditional Token Generation UI: Hide the "Refresh Token" button until the initial setup is completed, preventing premature interactions.

- Android Native Support: Complete Android bridge.

- Automated Token Refresh: Add a manual refresh control and enable automatic token regeneration based on the configured interval for seamless UX.

- Upgrade to Re.Pack v5: Migrate the build setup to Re.Pack version 5 to benefit from the latest performance improvements and bug fixes.

- Leverage Turbo Modules: Transition native modules to React Native Turbo Modules to improve startup speed and native-JS communication efficiency.

