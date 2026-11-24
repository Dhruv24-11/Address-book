import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';
import FormField from '../components/FormField';
import PrimaryButton from '../components/PrimaryButton';
import WavyBackground from '../components/WavyBackground';
import { LoginErrors, validateLogin } from '../utils/validation';
import { colors } from '../theme/colors';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: Props) {
  const [number, setNumber] = useState('');
  const [sum, setSum] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleNumberChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    setNumber(cleaned);
    if (errors.number) {
      setErrors((prev) => ({ ...prev, number: undefined }));
    }
  };

  const handleSumChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    setSum(cleaned);
    if (errors.sum) {
      setErrors((prev) => ({ ...prev, sum: undefined }));
    }
  };

  const handleLogin = () => {
    const validationErrors = validateLogin(number, sum);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      navigation.replace('AddressList');
    }
  };

  return (
    <WavyBackground>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoBadge}>
                <Ionicons name="shield-checkmark" size={30} color={colors.primary} />
              </View>
              <Text style={styles.brandTitle}>Address Book</Text>
            </View>

            {/* Elevated Card */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Sign In</Text>
                <Text style={styles.cardSubtitle}>
                  Enter a 4-digit code and the exact sum of its digits
                </Text>
              </View>

              {/* Hint Box with Vector Icon */}
              <View style={styles.hintBox}>
                <Ionicons name="information-circle" size={17} color={colors.primary} style={styles.hintIcon} />
                <Text style={styles.hintText}>
                  Example: If you enter <Text style={styles.boldText}>1234</Text>, the sum is <Text style={styles.boldText}>10</Text> (1+2+3+4).
                </Text>
              </View>

              <FormField
                label="4-Digit Number"
                required
                placeholder="e.g. 1234"
                value={number}
                onChangeText={handleNumberChange}
                keyboardType="number-pad"
                maxLength={4}
                iconName="keypad-outline"
                error={errors.number}
              />

              <FormField
                label="Sum of Digits"
                required
                placeholder="e.g. 10"
                value={sum}
                onChangeText={handleSumChange}
                keyboardType="number-pad"
                maxLength={2}
                iconName="calculator-outline"
                error={errors.sum}
              />

              <PrimaryButton
                title="Verify & Enter"
                onPress={handleLogin}
                style={styles.loginButton}
                iconName="arrow-forward"
              />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </WavyBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: -0.3,
  },
  brandSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: {
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  hintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    gap: 8,
  },
  hintIcon: {
    marginRight: 2,
  },
  hintText: {
    flex: 1,
    fontSize: 12,
    color: colors.primaryDark,
    lineHeight: 16,
  },
  boldText: {
    fontWeight: '700',
  },
  loginButton: {
    marginTop: 8,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
});
