import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Address } from '../types/address';
import { colors } from '../theme/colors';

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
      {/* Top Header Row */}
      <View style={styles.cardHeader}>
        <View style={styles.locationGroup}>
          <View style={styles.cityPill}>
            <Ionicons name="location" size={13} color={colors.primary} />
            <Text style={styles.cityText}>{item.city}</Text>
          </View>
          <Text style={styles.stateCountryText}>{item.state}, {item.country}</Text>
        </View>

        <View style={styles.pincodeTag}>
          <Ionicons name="barcode-outline" size={13} color={colors.textLabel} />
          <Text style={styles.pincodeText}>{item.pincode}</Text>
        </View>
      </View>

      {/* Main Street Address */}
      <View style={styles.content}>
        <Text style={styles.addressLabel}>ADDRESS</Text>
        <Text style={styles.addressText}>{item.address}</Text>

        {/* Landmark Row (if provided) */}
        {item.landmark ? (
          <View style={styles.landmarkBox}>
            <Ionicons name="navigate-outline" size={14} color={colors.textLabel} />
            <Text style={styles.landmarkText}>
              <Text style={styles.landmarkLabel}>NEAR: </Text>
              {item.landmark}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Action Footer */}
      <View style={styles.actions}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onEdit(item)}
          style={[styles.actionBtn, styles.editBtn]}
          accessibilityRole="button"
          accessibilityLabel="Edit address"
        >
          <Ionicons name="pencil-sharp" size={14} color={colors.textSecondary} />
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onDelete(item.id)}
          style={[styles.actionBtn, styles.deleteBtn]}
          accessibilityRole="button"
          accessibilityLabel="Delete address"
        >
          <Ionicons name="trash-outline" size={14} color={colors.dangerText} />
          <Text style={styles.deleteBtnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 7,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    flex: 1,
  },
  cityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cityText: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '700',
  },
  stateCountryText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  pincodeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pincodeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    fontFamily: 'monospace',
  },
  content: {
    marginBottom: 14,
  },
  addressLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textLabel,
    letterSpacing: 0.8,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  addressText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 23,
    marginBottom: 8,
  },
  landmarkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  landmarkLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textLabel,
    textTransform: 'uppercase',
  },
  landmarkText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceSubtle,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    minHeight: 36,
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: 'center',
    borderWidth: 1,
  },
  editBtn: {
    backgroundColor: '#FFFFFF',
    borderColor: colors.border,
  },
  editBtnText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 13,
  },
  deleteBtn: {
    backgroundColor: colors.dangerLight,
    borderColor: colors.dangerBorder,
  },
  deleteBtnText: {
    color: colors.dangerText,
    fontWeight: '600',
    fontSize: 13,
  },
});
