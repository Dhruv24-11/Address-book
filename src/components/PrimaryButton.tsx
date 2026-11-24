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
import { colors } from '../theme/colors';

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

  const iconColor = isDestructive
    ? colors.dangerText
    : isOutline
    ? colors.primary
    : isSecondary
    ? colors.textSecondary
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
          color={isDestructive ? colors.dangerText : isOutline ? colors.primary : '#FFFFFF'}
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
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 13,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 2,
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
    backgroundColor: colors.dangerLight,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    shadowOpacity: 0,
    elevation: 0,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  secondaryButton: {
    backgroundColor: colors.surfaceSubtle,
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
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  destructiveText: {
    color: colors.dangerText,
    fontWeight: '600',
  },
  outlineText: {
    color: colors.textPrimary,
  },
  secondaryText: {
    color: colors.textSecondary,
  },
  disabledText: {
    color: colors.textMuted,
  },
});
