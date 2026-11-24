import React, { useLayoutEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteAddress } from '../store/addressesSlice';
import { Address } from '../types/address';
import AddressCard from '../components/AddressCard';
import EmptyState from '../components/EmptyState';
import { confirmDelete } from '../utils/confirmDelete';
import { colors } from '../theme/colors';

type AddressListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddressList'
>;

interface Props {
  navigation: AddressListScreenNavigationProp;
}

export default function AddressListScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state) => state.addresses.items);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Address Book',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddressForm')}
          style={styles.headerButton}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Add Address"
        >
          <Ionicons name="add" size={17} color="#FFFFFF" />
          <Text style={styles.headerButtonText}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleEdit = (item: Address) => {
    navigation.navigate('AddressForm', { addressId: item.id });
  };

  const handleDelete = (id: string) => {
    confirmDelete(() => {
      dispatch(deleteAddress(id));
    });
  };

  const handleAddNew = () => {
    navigation.navigate('AddressForm');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {/* Subheader info bar */}
      {addresses.length > 0 && (
        <View style={styles.subHeader}>
          <Text style={styles.countText}>
            {addresses.length} {addresses.length === 1 ? 'Address' : 'Addresses'}
          </Text>
          <Text style={styles.subHeaderHint}>Manage entries below</Text>
        </View>
      )}

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AddressCard
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={
          addresses.length === 0 ? styles.emptyContainer : styles.listContent
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState onAddPress={handleAddNew} />}
      />

      {/* Floating Action Button */}
      {addresses.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={handleAddNew}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Add New Address"
        >
          <Ionicons name="add" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subHeaderHint: {
    fontSize: 12,
    color: colors.textMuted,
  },
  listContent: {
    paddingVertical: 10,
    paddingBottom: 80,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});
