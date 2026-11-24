// src/utils/validation.ts

export const sumOfDigits = (n: string): number =>
  n.split('').reduce((acc, d) => acc + Number(d), 0);

export interface LoginErrors {
  number?: string;
  sum?: string;
}

export const validateLogin = (number: string, sum: string): LoginErrors => {
  const errors: LoginErrors = {};
  if (!number) {
    errors.number = 'Please enter a 4-digit number.';
  } else if (!/^\d{4}$/.test(number)) {
    errors.number = 'Number must be exactly 4 digits.';
  }

  if (!sum) {
    errors.sum = 'Please enter the sum of the digits.';
  } else if (!/^\d+$/.test(sum)) {
    errors.sum = 'Sum must contain digits only.';
  } else if (!errors.number && Number(sum) !== sumOfDigits(number)) {
    errors.sum = 'Incorrect sum entered.';
  }

  return errors;
};

export interface AddressErrors {
  address?: string;
  landmark?: string;
  pincode?: string;
  city?: string;
  state?: string;
  country?: string;
}

export const validateAddress = (v: {
  address: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
}): AddressErrors => {
  const e: AddressErrors = {};

  if (!v.address.trim()) {
    e.address = 'Address is required.';
  } else if (v.address.trim().length > 70) {
    e.address = 'Address must be 70 characters or fewer.';
  }

  if (v.landmark.trim()) {
    if (v.landmark.trim().length > 50) {
      e.landmark = 'Landmark must be 50 characters or fewer.';
    } else if (!/^[A-Za-z0-9\s.,\-/']+$/.test(v.landmark.trim())) {
      e.landmark = 'Landmark contains invalid characters.';
    }
  }

  if (!v.pincode) {
    e.pincode = 'Pincode is required.';
  } else if (!/^\d{6}$/.test(v.pincode)) {
    e.pincode = 'Pincode must be exactly 6 digits.';
  }

  if (!v.city.trim()) {
    e.city = 'City is required.';
  }
  if (!v.state.trim()) {
    e.state = 'State is required.';
  }
  if (!v.country.trim()) {
    e.country = 'Country is required.';
  }

  return e;
};
