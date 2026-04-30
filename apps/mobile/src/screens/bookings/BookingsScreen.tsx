import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { darkTheme } from '../../theme';
import { bookingsService } from '../../services/bookings.service';
import { Booking } from '@canchaya/types';

interface BookingsScreenProps {
  navigation: any;
}

export function BookingsScreen({ navigation }: BookingsScreenProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      if (user?.id) {
        const response = await bookingsService.getAll(user.id, page);
        setBookings(response.items || []);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await fetchBookings();
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return darkTheme.colors.success;
      case 'pending':
        return darkTheme.colors.warning;
      case 'completed':
        return darkTheme.colors.info;
      case 'cancelled':
        return darkTheme.colors.error;
      default:
        return darkTheme.colors.textSecondary;
    }
  };

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <TouchableOpacity
      style={[
        styles.bookingCard,
        { backgroundColor: darkTheme.colors.surfaceVariant },
      ]}
      onPress={() => {}}
    >
      <View style={styles.bookingContent}>
        <Text style={[styles.courtName, { color: darkTheme.colors.text }]}>
          {item.courtId || 'Court'}
        </Text>

        <View style={styles.detailsRow}>
          <MaterialCommunityIcons
            name="calendar"
            size={14}
            color={darkTheme.colors.textSecondary}
          />
          <Text style={[styles.detail, { color: darkTheme.colors.textSecondary }]}>
            {new Date(item.startTime).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: '2-digit',
            })}
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <MaterialCommunityIcons
            name="clock"
            size={14}
            color={darkTheme.colors.textSecondary}
          />
          <Text style={[styles.detail, { color: darkTheme.colors.textSecondary }]}>
            {new Date(item.startTime).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}{' '}
            -{' '}
            {new Date(item.endTime).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <MaterialCommunityIcons
            name="currency-usd"
            size={14}
            color={darkTheme.colors.textSecondary}
          />
          <Text style={[styles.detail, { color: darkTheme.colors.textSecondary }]}>
            ${item.totalPrice?.toFixed(2) || '0.00'}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(item.status) },
        ]}
      >
        <Text style={styles.statusText}>
          {item.status?.toUpperCase() || 'PENDING'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && bookings.length === 0) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: darkTheme.colors.surface,
            justifyContent: 'center',
          },
        ]}
      >
        <ActivityIndicator size="large" color={darkTheme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: darkTheme.colors.surface }]}>
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={darkTheme.colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="calendar-blank"
              size={48}
              color={darkTheme.colors.textSecondary}
            />
            <Text
              style={[
                styles.emptyText,
                { color: darkTheme.colors.textSecondary },
              ]}
            >
              No bookings yet
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('DiscoveryStack')}
              style={styles.discoverButton}
            >
              Start Booking
            </Button>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: darkTheme.spacing.lg,
    paddingVertical: darkTheme.spacing.lg,
    gap: darkTheme.spacing.md,
  },
  bookingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: darkTheme.spacing.md,
    borderRadius: darkTheme.borderRadius.md,
  },
  bookingContent: {
    flex: 1,
  },
  courtName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: darkTheme.spacing.sm,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: darkTheme.spacing.sm,
    marginBottom: 4,
  },
  detail: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: darkTheme.spacing.md,
    paddingVertical: 6,
    borderRadius: darkTheme.borderRadius.sm,
    marginLeft: darkTheme.spacing.md,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: darkTheme.spacing.md,
    marginBottom: darkTheme.spacing.lg,
  },
  discoverButton: {
    marginTop: darkTheme.spacing.md,
  },
});
