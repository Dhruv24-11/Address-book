// src/types/address.ts
export interface Address {
  id: string;
  address: string; // required, max 70
  landmark: string; // optional, empty string if not provided
  pincode: string; // exactly 6 digits, stored as string to keep leading zeros
  city: string;
  state: string;
  country: string;
}

export type AddressInput = Omit<Address, 'id'>;
