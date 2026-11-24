import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  showCounter?: boolean;
  maxLength?: number;
  iconName?: keyof typeof Ionicons.glyphMap;
  variant?: 'light' | 'dark';
  required?: boolean;
}

export default function FormField({
  label,
  error,
  value,
  showCounter,
  maxLength,
  style,
  iconName,
  variant = 'light',
  required,
  ...props
}: FormFieldProps) {
  const currentLength = value?.length ?? 0;
  const hasError = Boolean(error);
  const isDark = variant === 'dark';

  // Check if label contains an asterisk or if required prop is passed
  const isRequired = required || label.includes('*');
  const cleanLabel = label.replace(/\s*\*/g, '').trim();

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <View style={styles.labelWithIcon}>
          {iconName ? (
            <Ionicons
              name={iconName}
              size={15}
              color={colors.textLabel}
              style={styles.icon}
            />
          ) : null}
          <Text style={[styles.label, isDark && styles.labelDark]}>
            {cleanLabel}
            {isRequired ? <Text style={styles.requiredAsterisk}> *</Text> : null}
          </Text>
        </View>
        {showCounter && maxLength !== undefined && (
          <Text
            style={[
              styles.counter,
              isDark && styles.counterDark,
              currentLength >= maxLength ? styles.counterFull : null,
            ]}
          >
            {currentLength}/{maxLength}
          </Text>
        )}
      </View>
      <TextInput
        style={[
          styles.input,
          isDark && styles.inputDark,
          hasError && styles.inputError,
          props.multiline ? styles.multilineInput : null,
          style,
        ]}
        value={value}
        maxLength={maxLength}
        placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
        selectionColor={colors.primary}
        {...props}
      />
      {error ? (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle" size={14} color={colors.danger} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    marginRight: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textLabel,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  requiredAsterisk: {
    color: '#EF4444', // Prominent red asterisk
    fontWeight: '900',
    fontSize: 13,
  },
  labelDark: {
    color: '#94A3B8',
  },
  counter: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  counterDark: {
    color: '#94A3B8',
  },
  counterFull: {
    color: colors.danger,
    fontWeight: '700',
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: '#F8FAFC', // Light gray background
  },
  inputDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
    color: '#F8FAFC',
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerLight,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 5,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '600',
  },
});
