# React Native Login + Address Book

A mobile application built with **React Native**, **Expo**, **TypeScript**, and **Redux Toolkit**.

## Features

### 1. Arithmetic Challenge Login
- Validates a 4-digit number against the sum of its digits client-side.
- Number field only allows digits (`0-9`) up to 4 characters. Leading zeroes supported (e.g., `0123` with sum `6`).
- Sum field only allows digits (`0-9`) up to 2 characters (max possible sum is `36`).
- Sequential validation order:
  1. Number empty -> `"Please enter a 4-digit number."`
  2. Number not 4 digits -> `"Number must be exactly 4 digits."`
  3. Sum empty -> `"Please enter the sum of the digits."`
  4. Sum not numeric -> `"Sum must contain digits only."`
  5. Sum does not match -> `"Incorrect sum. For 1234 the sum is 10."`
- Seamless navigation replace so users cannot navigate back to login once authenticated.

### 2. Address Book (CRUD)
- **List View**: Displays all saved addresses using React Native `FlatList`.
- **Empty State**: Friendly graphic and prompt with direct call-to-action to add an address.
- **Add / Edit Form**:
  - Address: Max 70 characters with real-time character counter (`n/70`).
  - Landmark: Optional, max 50 characters, letters/numbers/spaces and basic punctuation (`. , - / '`).
  - Pincode: Exactly 6 digits, preserves leading zeroes.
  - City, State, Country: Required, trimmed inputs.
  - Interactive validation on submit, live validation on subsequent edits.
  - `KeyboardAvoidingView` + `ScrollView` to prevent keyboard overlap on mobile devices.
- **Delete with Confirmation**: Native confirmation dialog (`Alert.alert`) before removing an address, accessible from both the list card and the edit screen.

## State Management
- Powered by **Redux Toolkit (`@reduxjs/toolkit`)** with typed hooks (`useAppDispatch`, `useAppSelector`).
- Single slice (`addressesSlice`) handling `addAddress`, `updateAddress`, and `deleteAddress`.

## Project Structure

```
├── App.tsx
├── PRD.md
├── README.md
├── eas.json
├── app.json
└── src
    ├── components
    │   ├── AddressCard.tsx
    │   ├── EmptyState.tsx
    │   ├── FormField.tsx
    │   └── PrimaryButton.tsx
    ├── navigation
    │   ├── AppNavigator.tsx
    │   └── types.ts
    ├── screens
    │   ├── AddressFormScreen.tsx
    │   ├── AddressListScreen.tsx
    │   └── LoginScreen.tsx
    ├── store
    │   ├── addressesSlice.ts
    │   ├── hooks.ts
    │   └── index.ts
    ├── types
    │   └── address.ts
    └── utils
        ├── confirmDelete.ts
        └── validation.ts
```

## Running the App

```bash
# Install dependencies
npm install

# Start the Expo development server
npx expo start

# Type checking
npx tsc --noEmit
```

## Building APK with EAS

```bash
# Configure and build APK
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

## Known Limitations
- Data is stored in memory via Redux store and resets when the app is restarted (no AsyncStorage / backend persistence as per brief requirements).
- Client-side arithmetic verification only (no external auth server).
- Tested primarily on Android environment.
