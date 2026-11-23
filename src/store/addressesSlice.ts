import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address, AddressInput } from '../types/address';

interface AddressesState {
  items: Address[];
}

const initialState: AddressesState = { items: [] };

const makeId = () =>
  Date.now().toString() + Math.random().toString(36).slice(2, 7);

const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<AddressInput>) => {
      state.items.push({ id: makeId(), ...action.payload });
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      const index = state.items.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteAddress: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((a) => a.id !== action.payload);
    },
  },
});

export const { addAddress, updateAddress, deleteAddress } = addressesSlice.actions;
export default addressesSlice.reducer;
