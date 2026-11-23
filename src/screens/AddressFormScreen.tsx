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
import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
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
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>
                {isEditing ? 'Update Details' : 'Address Information'}
              </Text>
              <Text style={styles.formSubtitle}>
                {isEditing
                  ? 'Modify the address information below.'
                  : 'Enter the recipient details for your address.'}
              </Text>
            </View>

            <FormField
              label="Street Address *"
              placeholder="Flat/House No., Building, Street"
              value={form.address}
              onChangeText={(text) => updateField('address', text)}
              maxLength={70}
              showCounter
              multiline
              icon="🏠"
              error={errors.address}
            />

            <FormField
              label="Landmark"
              placeholder="Near Metro Station, Behind Mall..."
              value={form.landmark}
              onChangeText={(text) => updateField('landmark', text)}
              maxLength={50}
              icon="📍"
              error={errors.landmark}
            />

            <FormField
              label="Pincode *"
              placeholder="6-digit postal code"
              value={form.pincode}
              onChangeText={handlePincodeChange}
              keyboardType="number-pad"
              maxLength={6}
              icon="📮"
              error={errors.pincode}
            />

            <FormField
              label="City *"
              placeholder="e.g. Mumbai, New York"
              value={form.city}
              onChangeText={(text) => updateField('city', text)}
              icon="🏙️"
              error={errors.city}
            />

            <FormField
              label="State *"
              placeholder="e.g. Maharashtra, California"
              value={form.state}
              onChangeText={(text) => updateField('state', text)}
              icon="🗺️"
              error={errors.state}
            />

            <FormField
              label="Country *"
              placeholder="e.g. India, United States"
              value={form.country}
              onChangeText={(text) => updateField('country', text)}
              icon="🌍"
              error={errors.country}
            />

            <PrimaryButton
              title={isEditing ? 'Update Address' : 'Save Address'}
              icon={isEditing ? '💾' : '✨'}
              onPress={handleSubmit}
              style={styles.submitButton}
            />

            {isEditing ? (
              <PrimaryButton
                title="Delete This Address"
                icon="🗑️"
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
    backgroundColor: '#FAF5FF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: '#F0E7F5',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  formHeader: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 14,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  submitButton: {
    marginTop: 10,
  },
  deleteButton: {
    marginTop: 14,
  },
});
