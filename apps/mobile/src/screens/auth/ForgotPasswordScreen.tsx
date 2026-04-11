import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { darkTheme } from '../../theme';
import { validators } from '../../utils/validators';
import { ERROR_MESSAGES } from '../../utils/constants';

interface ForgotPasswordScreenProps {
  navigation: any;
}

export function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleValidation = (): boolean => {
    const emailError = validators.validateEmail(email);
    setError(emailError);
    return !emailError;
  };

  const handleSubmit = async () => {
    if (!handleValidation()) {
      return;
    }

    setApiError(null);
    setLoading(true);

    try {
      // TODO: Call API to request password reset
      // await authService.requestPasswordReset(email);
      setSubmitted(true);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : ERROR_MESSAGES.NETWORK_ERROR,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={[styles.backButtonText, { color: darkTheme.colors.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>

        {!submitted ? (
          <>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>
                Enter your email address and we'll send you a link to reset your password
              </Text>
            </View>

            {/* Error Message */}
            {apiError && (
              <View style={[styles.errorBox, { borderColor: darkTheme.colors.error }]}>
                <Text style={[styles.errorText, { color: darkTheme.colors.error }]}>
                  {apiError}
                </Text>
              </View>
            )}

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <TextInput
                label="Email Address"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setError(null);
                }}
                placeholder="your@email.com"
                placeholderTextColor={darkTheme.colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
                error={!!error}
                style={styles.input}
                contentStyle={styles.inputContent}
                outlineColor={darkTheme.colors.border}
                activeOutlineColor={darkTheme.colors.primary}
              />
              {error && (
                <Text style={[styles.errorLabel, { color: darkTheme.colors.error }]}>
                  {error}
                </Text>
              )}
            </View>

            {/* Submit Button */}
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={loading}
                disabled={loading}
                style={[
                  styles.submitButton,
                  { backgroundColor: darkTheme.colors.primary },
                ]}
                labelStyle={styles.buttonLabel}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </View>
          </>
        ) : (
          <>
            {/* Success State */}
            <View style={styles.successContainer}>
              <Text style={[styles.successIcon, { color: darkTheme.colors.success }]}>
                ✓
              </Text>
              <Text style={styles.successTitle}>Check your email</Text>
              <Text style={[styles.successMessage, { color: darkTheme.colors.textSecondary }]}>
                We've sent a password reset link to {email}
              </Text>
              <Text style={[styles.successSubtext, { color: darkTheme.colors.textSecondary }]}>
                Click the link in the email to reset your password. If you don't see it, check
                your spam folder.
              </Text>
            </View>

            {/* Return to Login Button */}
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Login')}
                style={[
                  styles.submitButton,
                  { backgroundColor: darkTheme.colors.primary },
                ]}
                labelStyle={styles.buttonLabel}
              >
                Back to Sign In
              </Button>
            </View>

            {/* Resend Link */}
            <TouchableOpacity
              style={styles.resendContainer}
              onPress={() => {
                setSubmitted(false);
                setEmail('');
              }}
            >
              <Text style={[styles.resendText, { color: darkTheme.colors.textSecondary }]}>
                Didn't receive the email?{' '}
              </Text>
              <Text style={[styles.resendLink, { color: darkTheme.colors.primary }]}>
                Try again
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: darkTheme.spacing.lg,
    paddingVertical: darkTheme.spacing.lg,
  },
  backButton: {
    marginBottom: darkTheme.spacing.lg,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    marginBottom: darkTheme.spacing.xxl,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: darkTheme.colors.text,
    marginBottom: darkTheme.spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: darkTheme.colors.textSecondary,
    lineHeight: 20,
  },
  errorBox: {
    backgroundColor: darkTheme.colors.surface,
    borderWidth: 1,
    borderRadius: darkTheme.borderRadius.md,
    padding: darkTheme.spacing.md,
    marginBottom: darkTheme.spacing.lg,
  },
  errorText: {
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: darkTheme.spacing.lg,
  },
  input: {
    backgroundColor: darkTheme.colors.surfaceVariant,
  },
  inputContent: {
    color: darkTheme.colors.text,
  },
  errorLabel: {
    fontSize: 12,
    marginTop: darkTheme.spacing.sm,
    fontWeight: '500',
  },
  buttonContainer: {
    marginBottom: darkTheme.spacing.lg,
  },
  submitButton: {
    paddingVertical: darkTheme.spacing.md,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: darkTheme.spacing.xxl,
  },
  successIcon: {
    fontSize: 48,
    fontWeight: '600',
    marginBottom: darkTheme.spacing.lg,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: darkTheme.colors.text,
    marginBottom: darkTheme.spacing.md,
  },
  successMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: darkTheme.spacing.md,
    lineHeight: 22,
  },
  successSubtext: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: darkTheme.spacing.lg,
  },
  resendText: {
    fontSize: 14,
  },
  resendLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
