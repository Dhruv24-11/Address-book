import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Address } from '../types/address';

interface AddressCardProps {
  item: Address;
  onEdit: (item: Address) => void;
  onDelete: (id: string) => void;
}

export default function AddressCard({
  item,
  onEdit,
  onDelete,
}: AddressCardProps) {
  return (
    <View style={styles.card}>
      {/* Accent gradient-like top border */}
      <View style={styles.accentBar} />

      <View style={styles.cardHeader}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>📍 {item.city}</Text>
        </View>
        <Text style={styles.pincodeTag}>PIN: {item.pincode}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.addressText}>{item.address}</Text>

        {item.landmark ? (
          <View style={styles.landmarkRow}>
            <Text style={styles.landmarkIcon}>🧭</Text>
            <Text style={styles.landmarkText}>{item.landmark}</Text>
          </View>
        ) : null}

        <View style={styles.locationDetails}>
          <Text style={styles.regionText}>
            {item.city}, {item.state}
          </Text>
          <Text style={styles.countryText}>{item.country}</Text>
        </View>
      </View>

      {/* Action buttons with Instagram style pill designs */}
      <View style={styles.actions}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onEdit(item)}
          style={[styles.actionBtn, styles.editBtn]}
          accessibilityRole="button"
          accessibilityLabel="Edit address"
        >
          <Text style={styles.editBtnText}>✏️ Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onDelete(item.id)}
          style={[styles.actionBtn, styles.deleteBtn]}
          accessibilityRole="button"
          accessibilityLabel="Delete address"
        >
          <Text style={styles.deleteBtnText}>🗑️ Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#F0E7F5',
    overflow: 'hidden',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  accentBar: {
    height: 4,
    backgroundColor: '#E1306C',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  badge: {
    backgroundColor: '#FDF2F8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  badgeText: {
    color: '#BE185D',
    fontSize: 12,
    fontWeight: '700',
  },
  pincodeTag: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  addressText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    lineHeight: 22,
    marginBottom: 6,
  },
  landmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  landmarkIcon: {
    fontSize: 12,
  },
  landmarkText: {
    fontSize: 13,
    color: '#92400E',
    fontWeight: '500',
  },
  locationDetails: {
    marginTop: 4,
  },
  regionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  countryText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FAFAFA',
    gap: 10,
  },
  actionBtn: {
    minHeight: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  editBtn: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
  },
  editBtnText: {
    color: '#374151',
    fontWeight: '700',
    fontSize: 13,
  },
  deleteBtn: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FEE2E2',
  },
  deleteBtnText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 13,
  },
});
