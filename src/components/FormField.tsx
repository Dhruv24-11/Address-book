import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  showCounter?: boolean;
  maxLength?: number;
  icon?: string;
}

export default function FormField({
  label,
  error,
  value,
  showCounter,
  maxLength,
  style,
  icon,
  ...props
}: FormFieldProps) {
  const currentLength = value?.length ?? 0;
  const hasError = Boolean(error);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <View style={styles.labelWithIcon}>
          {icon ? <Text style={styles.icon}>{icon}</Text> : null}
          <Text style={styles.label}>{label}</Text>
        </View>
        {showCounter && maxLength !== undefined && (
          <Text
            style={[
              styles.counter,
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
          hasError && styles.inputError,
          props.multiline ? styles.multilineInput : null,
          style,
        ]}
        value={value}
        maxLength={maxLength}
        placeholderTextColor="#9CA3AF"
        selectionColor="#E1306C"
        {...props}
      />
      {error ? (
        <View style={styles.errorRow}>
          <Text style={styles.errorDot}>⚠️</Text>
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
    fontSize: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  counter: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E8E',
  },
  counterFull: {
    color: '#E1306C',
    fontWeight: '700',
  },
  input: {
    minHeight: 50,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#FAFAFA',
  },
  multilineInput: {
    minHeight: 78,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#E1306C',
    backgroundColor: '#FFF5F7',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 5,
  },
  errorDot: {
    fontSize: 11,
  },
  errorText: {
    color: '#E1306C',
    fontSize: 12,
    fontWeight: '600',
  },
});
