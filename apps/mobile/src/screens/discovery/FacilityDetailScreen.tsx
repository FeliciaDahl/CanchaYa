import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Text, Button, Chip, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { darkTheme } from '../../theme';

interface FacilityDetailScreenProps {
  navigation: any;
  route: any;
}

export function FacilityDetailScreen({ navigation, route }: FacilityDetailScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCourt } = useSelector((state: RootState) => state.courts);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!selectedCourt) {
    return (
      <View style={[styles.container, { backgroundColor: darkTheme.colors.surface }]}>
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: darkTheme.colors.textSecondary }]}>
            Court not found
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.goBack()}
            style={{ marginTop: 16 }}
          >
            Go Back
          </Button>
        </View>
      </View>
    );
  }

  const handleBooking = () => {
    // Navigate to time slot selection
    navigation.navigate('TimeSlotSelection', { courtId: selectedCourt.id });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Save to favorites service
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: darkTheme.colors.surface }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Image */}
      <View style={[styles.headerImage, { backgroundColor: darkTheme.colors.surfaceVariant }]}>
        <MaterialCommunityIcons
          name="tennis"
          size={64}
          color={darkTheme.colors.primary}
        />
      </View>

      {/* Court Name & Rating */}
      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.courtName, { color: darkTheme.colors.text }]}>
              {selectedCourt.name}
            </Text>
            <View style={styles.locationRow}>
              <MaterialCommunityIcons
                name="map-marker"
                size={16}
                color={darkTheme.colors.textSecondary}
              />
              <Text style={[styles.location, { color: darkTheme.colors.textSecondary }]}>
                {selectedCourt.city || 'Location'} • {selectedCourt.distance?.toFixed(1)} km away
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
          >
            <MaterialCommunityIcons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? darkTheme.colors.error : darkTheme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <View style={styles.ratingBox}>
            <MaterialCommunityIcons
              name="star"
              size={20}
              color={darkTheme.colors.warning}
            />
            <Text style={[styles.ratingText, { color: darkTheme.colors.text }]}>
              {selectedCourt.rating?.toFixed(1) || 'N/A'}
            </Text>
            <Text style={[styles.reviewCount, { color: darkTheme.colors.textSecondary }]}>
              ({selectedCourt.reviewCount || 0} reviews)
            </Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: darkTheme.colors.primary }]}>
                {selectedCourt.availableCourts}
              </Text>
              <Text style={[styles.statLabel, { color: darkTheme.colors.textSecondary }]}>
                Available
              </Text>
            </View>
            <Divider />
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: darkTheme.colors.primary }]}>
                ${selectedCourt.pricePerHour}
              </Text>
              <Text style={[styles.statLabel, { color: darkTheme.colors.textSecondary }]}>
                Per Hour
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Amenities */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: darkTheme.colors.text }]}>
          Amenities
        </Text>
        <View style={styles.amenitiesGrid}>
          {selectedCourt.hasLights && (
            <View style={[styles.amenityItem, { backgroundColor: darkTheme.colors.surfaceVariant }]}>
              <MaterialCommunityIcons
                name="brightness-7"
                size={24}
                color={darkTheme.colors.success}
              />
              <Text style={[styles.amenityText, { color: darkTheme.colors.text }]}>
                Night Lights
              </Text>
            </View>
          )}
          {selectedCourt.hasParking && (
            <View style={[styles.amenityItem, { backgroundColor: darkTheme.colors.surfaceVariant }]}>
              <MaterialCommunityIcons
                name="parking"
                size={24}
                color={darkTheme.colors.primary}
              />
              <Text style={[styles.amenityText, { color: darkTheme.colors.text }]}>
                Parking
              </Text>
            </View>
          )}
          {selectedCourt.hasRestroom && (
            <View style={[styles.amenityItem, { backgroundColor: darkTheme.colors.surfaceVariant }]}>
              <MaterialCommunityIcons
                name="toilet"
                size={24}
                color={darkTheme.colors.primary}
              />
              <Text style={[styles.amenityText, { color: darkTheme.colors.text }]}>
                Restrooms
              </Text>
            </View>
          )}
          {selectedCourt.hasRefreshments && (
            <View style={[styles.amenityItem, { backgroundColor: darkTheme.colors.surfaceVariant }]}>
              <MaterialCommunityIcons
                name="coffee"
                size={24}
                color={darkTheme.colors.primary}
              />
              <Text style={[styles.amenityText, { color: darkTheme.colors.text }]}>
                Café
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Court Details */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: darkTheme.colors.text }]}>
          Court Details
        </Text>
        <View style={[styles.detailCard, { backgroundColor: darkTheme.colors.surfaceVariant }]}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="palette"
              size={20}
              color={darkTheme.colors.textSecondary}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.detailLabel, { color: darkTheme.colors.textSecondary }]}>
                Surface
              </Text>
              <Text style={[styles.detailValue, { color: darkTheme.colors.text }]}>
                {selectedCourt.surface || 'Unknown'}
              </Text>
            </View>
          </View>

          <Divider style={{ marginVertical: 12 }} />

          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="ruler"
              size={20}
              color={darkTheme.colors.textSecondary}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.detailLabel, { color: darkTheme.colors.textSecondary }]}>
                Court Size
              </Text>
              <Text style={[styles.detailValue, { color: darkTheme.colors.text }]}>
                {selectedCourt.courtSize || 'Standard'}
              </Text>
            </View>
          </View>

          <Divider style={{ marginVertical: 12 }} />

          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="clock"
              size={20}
              color={darkTheme.colors.textSecondary}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.detailLabel, { color: darkTheme.colors.textSecondary }]}>
                Operating Hours
              </Text>
              <Text style={[styles.detailValue, { color: darkTheme.colors.text }]}>
                {selectedCourt.operatingHours || '6:00 AM - 10:00 PM'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Pricing */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: darkTheme.colors.text }]}>
          Pricing
        </Text>
        <View
          style={[
            styles.pricingCard,
            { backgroundColor: darkTheme.colors.surfaceVariant },
          ]}
        >
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: darkTheme.colors.textSecondary }]}>
              Weekday
            </Text>
            <Text style={[styles.priceValue, { color: darkTheme.colors.primary }]}>
              ${selectedCourt.pricePerHour}/hour
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: darkTheme.colors.textSecondary }]}>
              Weekend
            </Text>
            <Text style={[styles.priceValue, { color: darkTheme.colors.primary }]}>
              ${(selectedCourt.pricePerHour * 1.2).toFixed(2)}/hour
            </Text>
          </View>
        </View>
      </View>

      {/* Booking Button */}
      <View style={styles.bookingSection}>
        <Button
          mode="contained"
          onPress={handleBooking}
          style={[
            styles.bookButton,
            { backgroundColor: darkTheme.colors.primary },
          ]}
          labelStyle={styles.bookButtonLabel}
        >
          Book Now
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  courtName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 13,
  },
  favoriteButton: {
    padding: 8,
  },
  ratingContainer: {
    gap: 12,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '600',
  },
  reviewCount: {
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    width: '48%',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    gap: 8,
  },
  amenityText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  detailCard: {
    borderRadius: 12,
    padding: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  pricingCard: {
    borderRadius: 12,
    padding: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  bookingSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  bookButton: {
    paddingVertical: 6,
  },
  bookButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 16,
  },
});
