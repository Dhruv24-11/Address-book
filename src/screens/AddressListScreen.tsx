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
import { RootStackParamList } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteAddress } from '../store/addressesSlice';
import { Address } from '../types/address';
import AddressCard from '../components/AddressCard';
import EmptyState from '../components/EmptyState';
import { confirmDelete } from '../utils/confirmDelete';

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
      headerTitle: 'Addresses',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddressForm')}
          style={styles.headerButton}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Add Address"
        >
          <Text style={styles.headerButtonText}>+ New</Text>
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
            {addresses.length} {addresses.length === 1 ? 'saved address' : 'saved addresses'}
          </Text>
          <Text style={styles.subHeaderHint}>Tap Edit or Delete to manage</Text>
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

      {/* Floating Add Action Button when list is populated */}
      {addresses.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={handleAddNew}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Add New Address"
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF5FF',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3E8FF',
  },
  countText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7C3AED',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subHeaderHint: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  listContent: {
    paddingVertical: 12,
    paddingBottom: 80,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  headerButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#E1306C',
    shadowColor: '#E1306C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.3,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#E1306C',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E1306C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
    marginTop: -2,
  },
});
