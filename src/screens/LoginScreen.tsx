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
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoBadge}>
                <Ionicons name="book" size={32} color="#E1306C" />
              </View>
              <Text style={styles.brandTitle}>AddressBook</Text>
              <Text style={styles.brandSubtitle}>
                Security Challenge Verification
              </Text>
            </View>

            {/* Elevated Card */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Sign In</Text>
                <Text style={styles.cardSubtitle}>
                  Enter any 4-digit code and the exact sum of its digits
                </Text>
              </View>

              {/* Hint Box with Vector Icon */}
              <View style={styles.hintBox}>
                <Ionicons name="bulb-outline" size={18} color="#D97706" style={styles.hintIcon} />
                <Text style={styles.hintText}>
                  Example: If you enter <Text style={styles.boldText}>1234</Text>, the sum is <Text style={styles.boldText}>10</Text> (1+2+3+4).
                </Text>
              </View>

              <FormField
                label="4-Digit Number"
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
              <Text style={styles.footerText}>
                Secure in-memory address management
              </Text>
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
    paddingVertical: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  brandSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.92)',
    fontWeight: '600',
    marginTop: 4,
    letterSpacing: 0.2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  hintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#FFEDD5',
    gap: 8,
  },
  hintIcon: {
    marginRight: 2,
  },
  hintText: {
    flex: 1,
    fontSize: 12,
    color: '#9A3412',
    lineHeight: 16,
  },
  boldText: {
    fontWeight: '800',
  },
  loginButton: {
    marginTop: 10,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
});
