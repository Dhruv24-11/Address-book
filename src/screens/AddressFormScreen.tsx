import React, { useLayoutEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addAddress,
  deleteAddress,
  updateAddress,
} from '../store/addressesSlice';
import FormField from '../components/FormField';
import PrimaryButton from '../components/PrimaryButton';
import { AddressErrors, validateAddress } from '../utils/validation';
import { confirmDelete } from '../utils/confirmDelete';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'AddressForm'>;

export default function AddressFormScreen({ route, navigation }: Props) {
  const addressId = route.params?.addressId;
  const isEditing = Boolean(addressId);

  const dispatch = useAppDispatch();
  const existingAddress = useAppSelector((state) =>
    addressId
      ? state.addresses.items.find((item) => item.id === addressId)
      : undefined
  );

  const [form, setForm] = useState({
    address: existingAddress?.address ?? '',
    landmark: existingAddress?.landmark ?? '',
    pincode: existingAddress?.pincode ?? '',
    city: existingAddress?.city ?? '',
    state: existingAddress?.state ?? '',
    country: existingAddress?.country ?? '',
  });

  const [errors, setErrors] = useState<AddressErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Address' : 'New Address',
    });
  }, [navigation, isEditing]);

  const updateField = (field: keyof typeof form, value: string) => {
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);

    if (hasSubmitted) {
      const liveErrors = validateAddress(updatedForm);
      setErrors((prev) => ({
        ...prev,
        [field]: liveErrors[field],
      }));
    }
  };

  const handlePincodeChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    updateField('pincode', cleaned);
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    const validationErrors = validateAddress(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const payload = {
      address: form.address.trim(),
      landmark: form.landmark.trim(),
      pincode: form.pincode.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      country: form.country.trim(),
    };

    if (isEditing && addressId) {
      dispatch(updateAddress({ id: addressId, ...payload }));
    } else {
      dispatch(addAddress(payload));
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    if (!addressId) return;

    confirmDelete(() => {
      dispatch(deleteAddress(addressId));
      navigation.goBack();
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 80}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.card}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>
                {isEditing ? 'Update Details' : 'Address Details'}
              </Text>
              <Text style={styles.formSubtitle}>
                {isEditing
                  ? 'Update the address information below.'
                  : 'Enter the location details below.'}
              </Text>
            </View>

            <FormField
              label="Street Address *"
              placeholder="Flat/House No., Street name"
              value={form.address}
              onChangeText={(text) => updateField('address', text)}
              maxLength={70}
              showCounter
              multiline
              iconName="home-outline"
              error={errors.address}
            />

            <FormField
              label="Landmark"
              placeholder="Near park, station, etc."
              value={form.landmark}
              onChangeText={(text) => updateField('landmark', text)}
              maxLength={50}
              iconName="navigate-outline"
              error={errors.landmark}
            />

            <FormField
              label="Pincode *"
              placeholder="6-digit PIN code"
              value={form.pincode}
              onChangeText={handlePincodeChange}
              keyboardType="number-pad"
              maxLength={6}
              iconName="barcode-outline"
              error={errors.pincode}
            />

            <FormField
              label="City *"
              placeholder="City"
              value={form.city}
              onChangeText={(text) => updateField('city', text)}
              iconName="business-outline"
              error={errors.city}
            />

            <FormField
              label="State *"
              placeholder="State / Province"
              value={form.state}
              onChangeText={(text) => updateField('state', text)}
              iconName="map-outline"
              error={errors.state}
            />

            <FormField
              label="Country *"
              placeholder="Country"
              value={form.country}
              onChangeText={(text) => updateField('country', text)}
              iconName="globe-outline"
              error={errors.country}
            />

            <PrimaryButton
              title={isEditing ? 'Update Address' : 'Save Address'}
              iconName={isEditing ? 'checkmark' : 'add'}
              onPress={handleSubmit}
              style={styles.submitButton}
            />

            {isEditing ? (
              <PrimaryButton
                title="Delete Address"
                iconName="trash-outline"
                variant="destructive"
                onPress={handleDelete}
                style={styles.deleteButton}
              />
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  formHeader: {
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceSubtle,
    paddingBottom: 12,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  submitButton: {
    marginTop: 10,
  },
  deleteButton: {
    marginTop: 12,
  },
});
