# End-to-end tests

The flows in `.maestro/` drive the app in Expo Go against the real Coople API, so they check labels and screen structure, never specific jobs. `favourite.yaml` stars a job and unstars it again, so it leaves no favourites behind.

## Requirements

- An Android phone with [Expo Go](https://expo.dev/go). A running Android emulator works the same way.
- `adb` from Android SDK Platform-Tools:
  - macOS: `brew install android-platform-tools`
  - Debian/Ubuntu: `sudo apt install adb`
  - Fedora: `sudo dnf install android-tools`
  - Windows: download [Platform-Tools](https://developer.android.com/tools/releases/platform-tools) and add the folder to `PATH`
- Java 17 or 21, and the Maestro CLI ([Windows and Homebrew options](https://docs.maestro.dev/maestro-cli/how-to-install-maestro-cli)). On macOS and Linux:

```bash
curl -fsSL "https://get.maestro.mobile.dev" | bash
```

## Phone setup (once)

1. Settings → About phone → tap **Build number** 7 times to unlock Developer options.
2. In Developer options, turn on **USB debugging** and **Stay awake** (Maestro can't get past the lock screen). On Xiaomi, also turn on **USB debugging (Security settings)**, or Maestro's taps are blocked.
3. Connect the phone over USB, unlock it, and allow USB debugging. The phone should be listed as `device`:

```bash
adb devices
```

## Run

```bash
npx expo start --android
```

This opens the app in Expo Go and forwards port 8081 to the phone, which the flows rely on. In another terminal:

```bash
maestro test .maestro
```

If Expo Go shows its developer menu introduction the first time, close it and run the flows again.
