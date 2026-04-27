import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { addBooking } from '../../redux/slices/bookingsSlice';
import { darkTheme } from '../../theme';
import { bookingsService } from '../../services/bookings.service';
import { TimeSlot } from '@canchaya/types';

interface BookingReviewScreenProps {
  navigation: any;
  route: any;
}

export function BookingReviewScreen({ navigation, route }: BookingReviewScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCourt } = useSelector((state: RootState) => state.courts);
  const { user } = useSelector((state: RootState) => state.auth);

  const timeSlot: TimeSlot = route?.params?.timeSlot;
  const courtId: string = route?.params?.courtId;

  const [loading, setLoading] = useState(false);

  if (!timeSlot || !selectedCourt) {
    return (
      <View style={[styles.container, { backgroundColor: darkTheme.colors.surface }]}>
        <Text style={[styles.errorText, { color: darkTheme.colors.error }]}>
          Booking information missing
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Go Back
        </Button>
      </View>
    );
  }

  const startTime = new Date(timeSlot.startTime);
  const endTime = new Date(timeSlot.endTime);
  const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  const handleConfirmBooking = async () => {
    if (!timeSlot.id) {
      Alert.alert('Error', 'Invalid time slot');
      return;
    }

    setLoading(true);
    try {
      const booking = await bookingsService.create(timeSlot.id);
      dispatch(addBooking(booking));

      Alert.alert('Success', 'Booking confirmed!', [
        {
          text: 'View Booking',
          onPress: () => navigation.navigate('BookingDetail', { bookingId: booking.id }),
        },
        {
          text: 'Continue Browsing',
          onPress: () => navigation.navigate('DiscoveryStack'),
        },
      ]);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to create booking';
      Alert.alert('Booking Failed', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: darkTheme.colors.surface }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Booking Summary */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: darkTheme.colors.text }]}>Booking Summary</Text>

        {/* Court Info */}
        <View
          style={[
            styles.infoBox,
            { backgroundColor: darkTheme.colors.surfaceVariant, borderColor: darkTheme.colors.border },
          ]}
        >
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="tennis"
              size={24}
              color={darkTheme.colors.primary}
            />
            <View style={styles.infoContent}>
              <Text style={[styles.label, { color: darkTheme.colors.textSecondary }]}>Court</Text>
              <Text style={[styles.value, { color: darkTheme.colors.text }]}>
                {selectedCourt.name}
              </Text>
            </View>
          </View>

          <Divider style={[styles.divider, { backgroundColor: darkTheme.colors.border }]} />

          {/* Date & Time */}
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={24}
              color={darkTheme.colors.primary}
            />
            <View style={styles.infoContent}>
              <Text style={[styles.label, { color: darkTheme.colors.textSecondary }]}>Date & Time</Text>
              <Text style={[styles.value, { color: darkTheme.colors.text }]}>
                {startTime.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
              <Text style={[styles.value, { color: darkTheme.colors.text }]}>
                {startTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                {' - '}
                {endTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          </View>

          <Divider style={[styles.divider, { backgroundColor: darkTheme.colors.border }]} />

          {/* Player Info */}
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="account-circle"
              size={24}
              color={darkTheme.colors.primary}
            />
            <View style={styles.infoContent}>
              <Text style={[styles.label, { color: darkTheme.colors.textSecondary }]}>Player</Text>
              <Text style={[styles.value, { color: darkTheme.colors.text }]}>
                {user?.name || 'Unknown'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Price Breakdown */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: darkTheme.colors.text }]}>Price Breakdown</Text>

        <View
          style={[
            styles.priceBox,
            { backgroundColor: darkTheme.colors.surfaceVariant, borderColor: darkTheme.colors.border },
          ]}
        >
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: darkTheme.colors.textSecondary }]}>
              {duration}h × ${timeSlot.price.toFixed(2)}/h
            </Text>
            <Text style={[styles.priceValue, { color: darkTheme.colors.text }]}>
              ${(duration * timeSlot.price).toFixed(2)}
            </Text>
          </View>

          <Divider style={[styles.divider, { backgroundColor: darkTheme.colors.border }]} />

          <View style={styles.priceRow}>
            <Text style={[styles.totalLabel, { color: darkTheme.colors.text }]}>Total</Text>
            <Text style={[styles.totalValue, { color: darkTheme.colors.primary }]}>
              ${(duration * timeSlot.price).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          Change Time Slot
        </Button>
        <Button
          mode="contained"
          onPress={handleConfirmBooking}
          loading={loading}
          disabled={loading}
          style={styles.confirmButton}
          labelStyle={styles.buttonLabel}
        >
          Confirm Booking
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: darkTheme.spacing.lg,
  },
  section: {
    paddingHorizontal: darkTheme.spacing.lg,
    paddingVertical: darkTheme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: darkTheme.spacing.md,
  },
  infoBox: {
    borderWidth: 1,
    borderRadius: darkTheme.borderRadius.md,
    padding: darkTheme.spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: darkTheme.spacing.sm,
  },
  infoContent: {
    marginLeft: darkTheme.spacing.md,
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginBottom: darkTheme.spacing.xs,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    marginVertical: darkTheme.spacing.md,
  },
  priceBox: {
    borderWidth: 1,
    borderRadius: darkTheme.borderRadius.md,
    padding: darkTheme.spacing.lg,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: darkTheme.spacing.lg,
    gap: darkTheme.spacing.md,
  },
  cancelButton: {
    flex: 1,
  },
  confirmButton: {
    flex: 1,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: darkTheme.spacing.lg,
  },
  button: {
    marginTop: darkTheme.spacing.lg,
  },
});
