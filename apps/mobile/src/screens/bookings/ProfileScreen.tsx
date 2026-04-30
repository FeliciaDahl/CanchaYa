import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { Text, Button, Divider, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { logoutSuccess } from '../../redux/slices/authSlice';
import { darkTheme } from '../../theme';
import { authService } from '../../services/auth.service';
import { bookingsService } from '../../services/bookings.service';
import { webSocketService } from '../../services/websocket.service';
import { formatters } from '../../utils/formatters';
import { Booking } from '@canchaya/types';

interface ProfileScreenProps {
  navigation: any;
}

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUpcomingBookings();
  }, []);

  const fetchUpcomingBookings = async () => {
    try {
      setLoading(true);
      if (user?.id) {
        const bookings = await bookingsService.getUpcoming(user.id);
        setUpcomingBookings(bookings || []);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUpcomingBookings();
    setRefreshing(false);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            await authService.logout();
            webSocketService.disconnect();
            dispatch(logoutSuccess());
          } catch (error) {
            Alert.alert('Error', 'Failed to logout');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const handleCancelBooking = (bookingId: string) => {
    Alert.alert('Cancel Booking', 'Are you sure you want to cancel this booking?', [
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Yes, Cancel',
        onPress: async () => {
          try {
            setLoading(true);
            await bookingsService.cancel(bookingId);
            Alert.alert('Success', 'Booking cancelled');
            await fetchUpcomingBookings();
          } catch (error) {
            Alert.alert('Error', 'Failed to cancel booking');
          } finally {
            setLoading(false);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: darkTheme.colors.surface }]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={darkTheme.colors.primary}
        />
      }
    >
      {/* Profile Header */}
      <View
        style={[
          styles.profileHeader,
          { backgroundColor: darkTheme.colors.surfaceVariant },
        ]}
      >
        <View style={[styles.avatarContainer, { backgroundColor: darkTheme.colors.primary }]}>
          <MaterialCommunityIcons
            name="account"
            size={48}
            color={darkTheme.colors.onPrimary}
          />
        </View>

        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: darkTheme.colors.text }]}>
            {user?.name || 'User'}
          </Text>
          <Text style={[styles.userEmail, { color: darkTheme.colors.textSecondary }]}>
            {user?.email || 'No email'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {}}
        >
          <MaterialCommunityIcons
            name="cog"
            size={24}
            color={darkTheme.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View
          style={[
            styles.statCard,
            { backgroundColor: darkTheme.colors.surfaceVariant },
          ]}
        >
          <MaterialCommunityIcons
            name="calendar-check"
            size={32}
            color={darkTheme.colors.primary}
          />
          <Text style={[styles.statValue, { color: darkTheme.colors.text }]}>
            {upcomingBookings.length}
          </Text>
          <Text style={[styles.statLabel, { color: darkTheme.colors.textSecondary }]}>
            Upcoming
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            { backgroundColor: darkTheme.colors.surfaceVariant },
          ]}
        >
          <MaterialCommunityIcons
            name="heart"
            size={32}
            color={darkTheme.colors.error}
          />
          <Text style={[styles.statValue, { color: darkTheme.colors.text }]}>0</Text>
          <Text style={[styles.statLabel, { color: darkTheme.colors.textSecondary }]}>
            Favorites
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            { backgroundColor: darkTheme.colors.surfaceVariant },
          ]}
        >
          <MaterialCommunityIcons
            name="star"
            size={32}
            color={darkTheme.colors.warning}
          />
          <Text style={[styles.statValue, { color: darkTheme.colors.text }]}>0</Text>
          <Text style={[styles.statLabel, { color: darkTheme.colors.textSecondary }]}>
            Reviews
          </Text>
        </View>
      </View>

      {/* Upcoming Bookings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: darkTheme.colors.text }]}>
            Upcoming Bookings
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator color={darkTheme.colors.primary} />
        ) : upcomingBookings.length > 0 ? (
          upcomingBookings.slice(0, 3).map((booking) => (
            <View
              key={booking.id}
              style={[
                styles.bookingCard,
                { backgroundColor: darkTheme.colors.surfaceVariant },
              ]}
            >
              <View style={styles.bookingInfo}>
                <Text style={[styles.courtName, { color: darkTheme.colors.text }]}>
                  {booking.courtId || 'Court'}
                </Text>
                <Text style={[styles.bookingDate, { color: darkTheme.colors.textSecondary }]}>
                  {new Date(booking.startTime).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
                <Text style={[styles.bookingTime, { color: darkTheme.colors.textSecondary }]}>
                  {new Date(booking.startTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>

              <View style={styles.bookingStatus}>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        booking.status === 'confirmed'
                          ? darkTheme.colors.success
                          : darkTheme.colors.warning,
                    },
                  ]}
                >
                  <Text style={styles.statusText}>
                    {booking.status?.toUpperCase() || 'PENDING'}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => handleCancelBooking(booking.id)}
                  style={[
                    styles.cancelBtn,
                    { borderColor: darkTheme.colors.error },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={16}
                    color={darkTheme.colors.error}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={[styles.emptyText, { color: darkTheme.colors.textSecondary }]}>
            No upcoming bookings
          </Text>
        )}
      </View>

      {/* Menu Items */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[
            styles.menuItem,
            { backgroundColor: darkTheme.colors.surfaceVariant },
          ]}
        >
          <MaterialCommunityIcons
            name="heart"
            size={24}
            color={darkTheme.colors.primary}
          />
          <Text style={[styles.menuLabel, { color: darkTheme.colors.text }]}>
            Favorite Courts
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={darkTheme.colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuItem,
            { backgroundColor: darkTheme.colors.surfaceVariant },
          ]}
        >
          <MaterialCommunityIcons
            name="cog"
            size={24}
            color={darkTheme.colors.primary}
          />
          <Text style={[styles.menuLabel, { color: darkTheme.colors.text }]}>Settings</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={darkTheme.colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuItem,
            { backgroundColor: darkTheme.colors.surfaceVariant },
          ]}
        >
          <MaterialCommunityIcons
            name="help-circle"
            size={24}
            color={darkTheme.colors.primary}
          />
          <Text style={[styles.menuLabel, { color: darkTheme.colors.text }]}>Help</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={darkTheme.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutSection}>
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          labelStyle={{
            color: darkTheme.colors.error,
          }}
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: darkTheme.spacing.lg,
    paddingVertical: darkTheme.spacing.lg,
    marginTop: darkTheme.spacing.md,
    marginHorizontal: darkTheme.spacing.lg,
    borderRadius: darkTheme.borderRadius.lg,
    gap: darkTheme.spacing.md,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 12,
  },
  settingsButton: {
    padding: 8,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: darkTheme.spacing.lg,
    paddingVertical: darkTheme.spacing.lg,
    gap: darkTheme.spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: darkTheme.spacing.md,
    borderRadius: darkTheme.borderRadius.md,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: darkTheme.spacing.xs,
  },
  statLabel: {
    fontSize: 11,
    marginTop: darkTheme.spacing.xs,
  },
  section: {
    paddingHorizontal: darkTheme.spacing.lg,
    paddingVertical: darkTheme.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: darkTheme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '500',
  },
  bookingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: darkTheme.spacing.md,
    paddingVertical: darkTheme.spacing.md,
    borderRadius: darkTheme.borderRadius.md,
    marginBottom: darkTheme.spacing.sm,
  },
  bookingInfo: {
    flex: 1,
  },
  courtName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  bookingDate: {
    fontSize: 12,
    marginBottom: 2,
  },
  bookingTime: {
    fontSize: 12,
  },
  bookingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: darkTheme.spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: darkTheme.spacing.sm,
    paddingVertical: 4,
    borderRadius: darkTheme.borderRadius.sm,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  cancelBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: darkTheme.spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: darkTheme.spacing.md,
    paddingVertical: darkTheme.spacing.md,
    borderRadius: darkTheme.borderRadius.md,
    marginBottom: darkTheme.spacing.sm,
    gap: darkTheme.spacing.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  logoutSection: {
    paddingHorizontal: darkTheme.spacing.lg,
    paddingVertical: darkTheme.spacing.lg,
  },
  logoutButton: {
    borderColor: 'rgba(244, 67, 54, 0.5)',
  },
});
