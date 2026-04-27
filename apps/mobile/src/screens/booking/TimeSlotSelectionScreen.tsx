import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Text, Button, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { darkTheme } from '../../theme';
import { courtsService } from '../../services/courts.service';
import { TimeSlot } from '@canchaya/types';

interface TimeSlotSelectionScreenProps {
  navigation: any;
  route: any;
}

export function TimeSlotSelectionScreen({ navigation, route }: TimeSlotSelectionScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCourt } = useSelector((state: RootState) => state.courts);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const courtId = route?.params?.courtId;

  useEffect(() => {
    if (courtId) {
      fetchAvailability();
    }
  }, [courtId]);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get availability for next 7 days
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

      const startDate = today.toISOString().split('T')[0];
      const endDate = nextWeek.toISOString().split('T')[0];

      const response = await courtsService.getAvailability(courtId, startDate, endDate);
      const availability = response?.availability || [];
      setTimeSlots(availability.filter((slot: TimeSlot) => slot.available));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch time slots';
      setError(errorMsg);
      Alert.alert('Error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!selectedSlot) {
      Alert.alert('Selection Required', 'Please select a time slot');
      return;
    }

    navigation.navigate('BookingReview', {
      courtId,
      timeSlot: selectedSlot,
    });
  };

  const renderTimeSlot = ({ item }: { item: TimeSlot }) => {
    const isSelected = selectedSlot?.id === item.id;
    const startTime = new Date(item.startTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const endTime = new Date(item.endTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <TouchableOpacity
        style={[
          styles.slotCard,
          {
            backgroundColor: isSelected
              ? darkTheme.colors.primary
              : darkTheme.colors.surfaceVariant,
          },
        ]}
        onPress={() => setSelectedSlot(item)}
      >
        <View style={styles.slotContent}>
          <Text
            style={[
              styles.slotTime,
              { color: isSelected ? darkTheme.colors.surface : darkTheme.colors.text },
            ]}
          >
            {startTime} - {endTime}
          </Text>
          <Text
            style={[
              styles.slotPrice,
              {
                color: isSelected
                  ? darkTheme.colors.surface
                  : darkTheme.colors.textSecondary,
              },
            ]}
          >
            ${item.price.toFixed(2)}
          </Text>
        </View>
        {isSelected && (
          <MaterialCommunityIcons
            name="check-circle"
            size={24}
            color={darkTheme.colors.surface}
          />
        )}
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: darkTheme.colors.surface }]}>
        <ActivityIndicator size="large" color={darkTheme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: darkTheme.colors.surface }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: darkTheme.colors.text }]}>Select Time Slot</Text>
        <Text style={[styles.subtitle, { color: darkTheme.colors.textSecondary }]}>
          {selectedCourt?.name || 'Court'}
        </Text>
      </View>

      {/* Time Slots List */}
      <FlatList
        data={timeSlots}
        renderItem={renderTimeSlot}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="calendar-alert"
              size={64}
              color={darkTheme.colors.textSecondary}
            />
            <Text style={[styles.emptyText, { color: darkTheme.colors.textSecondary }]}>
              No available time slots
            </Text>
          </View>
        }
      />

      {/* Continue Button */}
      {timeSlots.length > 0 && (
        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={handleContinue}
            disabled={!selectedSlot}
            style={[styles.button, { opacity: selectedSlot ? 1 : 0.5 }]}
            labelStyle={styles.buttonLabel}
          >
            Continue to Review
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: darkTheme.spacing.lg,
    paddingTop: darkTheme.spacing.lg,
    paddingBottom: darkTheme.spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: darkTheme.spacing.sm,
  },
  subtitle: {
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: darkTheme.spacing.lg,
    paddingVertical: darkTheme.spacing.md,
  },
  slotCard: {
    borderRadius: darkTheme.borderRadius.md,
    padding: darkTheme.spacing.md,
    marginBottom: darkTheme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slotContent: {
    flex: 1,
  },
  slotTime: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: darkTheme.spacing.xs,
  },
  slotPrice: {
    fontSize: 14,
  },
  footer: {
    paddingHorizontal: darkTheme.spacing.lg,
    paddingVertical: darkTheme.spacing.lg,
    borderTopColor: darkTheme.colors.border,
    borderTopWidth: 1,
  },
  button: {
    paddingVertical: darkTheme.spacing.md,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: darkTheme.spacing.xl,
  },
  emptyText: {
    fontSize: 16,
    marginTop: darkTheme.spacing.md,
  },
});
