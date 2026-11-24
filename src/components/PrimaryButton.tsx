import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'destructive' | 'outline' | 'secondary';
  loading?: boolean;
  iconName?: keyof typeof Ionicons.glyphMap;
}

export default function PrimaryButton({
  title,
  variant = 'primary',
  loading = false,
  disabled,
  style,
  iconName,
  ...props
}: PrimaryButtonProps) {
  const isDestructive = variant === 'destructive';
  const isOutline = variant === 'outline';
  const isSecondary = variant === 'secondary';

  const iconColor = isOutline
    ? '#E1306C'
    : isSecondary
    ? '#374151'
    : '#FFFFFF';

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      disabled={disabled || loading}
      style={[
        styles.button,
        isDestructive && styles.destructiveButton,
        isOutline && styles.outlineButton,
        isSecondary && styles.secondaryButton,
        disabled && styles.disabledButton,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isOutline ? '#E1306C' : '#FFFFFF'}
        />
      ) : (
        <View style={styles.contentRow}>
          {iconName ? (
            <Ionicons name={iconName} size={18} color={iconColor} style={styles.buttonIcon} />
          ) : null}
          <Text
            style={[
              styles.text,
              isDestructive && styles.destructiveText,
              isOutline && styles.outlineText,
              isSecondary && styles.secondaryText,
              disabled && styles.disabledText,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: 12,
    backgroundColor: '#E1306C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    shadowColor: '#E1306C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonIcon: {
    marginRight: 2,
  },
  destructiveButton: {
    backgroundColor: '#DC2626',
    shadowColor: '#DC2626',
    shadowOpacity: 0.25,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#E1306C',
    shadowOpacity: 0,
    elevation: 0,
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
    shadowOpacity: 0,
    elevation: 0,
  },
  disabledButton: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  destructiveText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#E1306C',
  },
  secondaryText: {
    color: '#374151',
  },
  disabledText: {
    color: '#E5E7EB',
  },
});
