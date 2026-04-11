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
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { registerStart, registerSuccess, registerFailure } from '../../redux/slices/authSlice';
import { authService } from '../../services/auth.service';
import { darkTheme } from '../../theme';
import { validators } from '../../utils/validators';
import { ERROR_MESSAGES } from '../../utils/constants';

interface RegisterScreenProps {
  navigation: any;
}

export function RegisterScreen({ navigation }: RegisterScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleValidation = (): boolean => {
    const newErrors: typeof errors = {};

    const nameError = validators.validateName(name);
    if (nameError) newErrors.name = nameError;

    const emailError = validators.validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validators.validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!handleValidation()) {
      return;
    }

    setApiError(null);
    dispatch(registerStart());

    try {
      const response = await authService.register(email, password, name);
      dispatch(
        registerSuccess({
          user: response.user || { email, name },
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        }),
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : ERROR_MESSAGES.AUTH_FAILED;
      setApiError(errorMessage);
      dispatch(registerFailure(errorMessage));
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join CanchaYa to book courts instantly</Text>
        </View>

        {/* Error Message */}
        {apiError && (
          <View style={[styles.errorBox, { borderColor: darkTheme.colors.error }]}>
            <Text style={[styles.errorText, { color: darkTheme.colors.error }]}>
              {apiError}
            </Text>
          </View>
        )}

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <TextInput
            label="Full Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setErrors({ ...errors, name: undefined });
            }}
            placeholder="John Doe"
            placeholderTextColor={darkTheme.colors.textSecondary}
            autoCapitalize="words"
            error={!!errors.name}
            style={styles.input}
            contentStyle={styles.inputContent}
            outlineColor={darkTheme.colors.border}
            activeOutlineColor={darkTheme.colors.primary}
          />
          {errors.name && (
            <Text style={[styles.errorLabel, { color: darkTheme.colors.error }]}>
              {errors.name}
            </Text>
          )}
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors({ ...errors, email: undefined });
            }}
            placeholder="your@email.com"
            placeholderTextColor={darkTheme.colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            error={!!errors.email}
            style={styles.input}
            contentStyle={styles.inputContent}
            outlineColor={darkTheme.colors.border}
            activeOutlineColor={darkTheme.colors.primary}
          />
          {errors.email && (
            <Text style={[styles.errorLabel, { color: darkTheme.colors.error }]}>
              {errors.email}
            </Text>
          )}
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors({ ...errors, password: undefined });
            }}
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            error={!!errors.password}
            style={styles.input}
            contentStyle={styles.inputContent}
            outlineColor={darkTheme.colors.border}
            activeOutlineColor={darkTheme.colors.primary}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
          {errors.password && (
            <Text style={[styles.errorLabel, { color: darkTheme.colors.error }]}>
              {errors.password}
            </Text>
          )}
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setErrors({ ...errors, confirmPassword: undefined });
            }}
            placeholder="••••••••"
            secureTextEntry={!showConfirmPassword}
            error={!!errors.confirmPassword}
            style={styles.input}
            contentStyle={styles.inputContent}
            outlineColor={darkTheme.colors.border}
            activeOutlineColor={darkTheme.colors.primary}
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
          />
          {errors.confirmPassword && (
            <Text style={[styles.errorLabel, { color: darkTheme.colors.error }]}>
              {errors.confirmPassword}
            </Text>
          )}
        </View>

        {/* Terms & Conditions Notice */}
        <Text style={[styles.termsText, { color: darkTheme.colors.textSecondary }]}>
          By signing up, you agree to our Terms & Conditions and Privacy Policy
        </Text>

        {/* Register Button */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleRegister}
            style={[
              styles.registerButton,
              { backgroundColor: darkTheme.colors.primary },
            ]}
            labelStyle={styles.buttonLabel}
          >
            Create Account
          </Button>
        </View>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: darkTheme.colors.textSecondary }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.loginLink, { color: darkTheme.colors.primary }]}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
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
  header: {
    marginBottom: darkTheme.spacing.xxl,
    alignItems: 'center',
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
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: darkTheme.spacing.lg,
    lineHeight: 18,
  },
  buttonContainer: {
    marginBottom: darkTheme.spacing.lg,
  },
  registerButton: {
    paddingVertical: darkTheme.spacing.md,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: darkTheme.spacing.lg,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
