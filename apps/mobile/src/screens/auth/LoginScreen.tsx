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
import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/authSlice';
import { authService } from '../../services/auth.service';
import { darkTheme } from '../../theme';
import { validators } from '../../utils/validators';
import { ERROR_MESSAGES } from '../../utils/constants';

interface LoginScreenProps {
  navigation: any;
}

export function LoginScreen({ navigation }: LoginScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleValidation = (): boolean => {
    const validationResult = validators.validateLogin(email, password);
    setErrors(validationResult.errors);
    return validationResult.isValid;
  };

  const handleLogin = async () => {
    if (!handleValidation()) {
      return;
    }

    setApiError(null);
    dispatch(loginStart());

    try {
      const response = await authService.login(email, password);
      dispatch(
        loginSuccess({
          user: response.user || { email, name: email.split('@')[0] },
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        }),
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : ERROR_MESSAGES.AUTH_FAILED;
      setApiError(errorMessage);
      dispatch(loginFailure(errorMessage));
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
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your CanchaYa account</Text>
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

        {/* Forgot Password Link */}
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={[styles.forgotPasswordText, { color: darkTheme.colors.primary }]}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleLogin}
            style={[
              styles.loginButton,
              { backgroundColor: darkTheme.colors.primary },
            ]}
            labelStyle={styles.buttonLabel}
          >
            Sign In
          </Button>
        </View>

        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={[styles.registerText, { color: darkTheme.colors.textSecondary }]}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.registerLink, { color: darkTheme.colors.primary }]}>
              Sign up
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
  forgotPasswordButton: {
    alignItems: 'flex-end',
    marginBottom: darkTheme.spacing.xl,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    marginBottom: darkTheme.spacing.lg,
  },
  loginButton: {
    paddingVertical: darkTheme.spacing.md,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: darkTheme.spacing.lg,
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
