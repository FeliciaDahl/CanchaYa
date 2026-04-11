import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Text, Searchbar, Chip, FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  fetchCourtStart,
  fetchCourtSuccess,
  fetchCourtFailure,
  setUserLocation,
} from '../../redux/slices/courtsSlice';
import { geolocationService } from '../../services/geolocation.service';
import { courtsService } from '../../services/courts.service';
import { darkTheme } from '../../theme';
import { Court } from '../../types';

interface NearbyCourtScreenProps {
  navigation: any;
}

type SortBy = 'distance' | 'rating' | 'price';
type SurfaceType = 'all' | 'clay' | 'grass' | 'synthetic';

export function NearbyCourtScreen({ navigation }: NearbyCourtScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { courts, loading, error, userLocation } = useSelector(
    (state: RootState) => state.courts,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('distance');
  const [surface, setSurface] = useState<SurfaceType>('all');
  const [maxDistance, setMaxDistance] = useState(60); // km
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    requestLocationAndFetchCourts();
  }, []);

  const requestLocationAndFetchCourts = async () => {
    try {
      setLocationLoading(true);
      setLocationError(null);

      // Request location permission
      const permissionGranted = await geolocationService.requestPermissions();
      if (!permissionGranted) {
        setLocationError('Location permission denied');
        setLocationLoading(false);
        return;
      }

      // Get current location
      const location = await geolocationService.getCurrentLocation();
      dispatch(setUserLocation(location));

      // Fetch nearby courts
      await fetchNearbyCourtss(location.latitude, location.longitude);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to get location';
      setLocationError(errorMsg);
      dispatch(
        fetchCourtFailure(errorMsg),
      );
    } finally {
      setLocationLoading(false);
    }
  };

  const fetchNearbyCourtss = async (latitude: number, longitude: number) => {
    dispatch(fetchCourtStart());
    try {
      const response = await courtsService.getNearby(
        latitude,
        longitude,
        maxDistance,
      );
      dispatch(fetchCourtSuccess(response.courts));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch courts';
      dispatch(fetchCourtFailure(errorMsg));
    }
  };

  const handleRefresh = async () => {
    if (userLocation) {
      await fetchNearbyCourtss(userLocation.latitude, userLocation.longitude);
    } else {
      await requestLocationAndFetchCourts();
    }
  };

  const filteredAndSortedCourts = courts
    .filter((court) => {
      const matchesSearch = court.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSurface = surface === 'all' || court.surface === surface;
      return matchesSearch && matchesSurface;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') {
        return (a.distance || 0) - (b.distance || 0);
      } else if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      } else if (sortBy === 'price') {
        return (a.pricePerHour || 0) - (b.pricePerHour || 0);
      }
      return 0;
    });

  const renderCourtItem = ({ item }: { item: Court }) => (
    <TouchableOpacity
      style={[styles.courtCard, { backgroundColor: darkTheme.colors.surfaceVariant }]}
      onPress={() => {
        dispatch({ type: 'courts/selectCourt', payload: item });
        navigation.navigate('FacilityDetail', { courtId: item.id });
      }}
    >
      {/* Court Image Placeholder */}
      <View style={[styles.imageContainer, { backgroundColor: darkTheme.colors.surface }]}>
        <MaterialCommunityIcons
          name="tennis"
          size={40}
          color={darkTheme.colors.primary}
        />
      </View>

      {/* Court Info */}
      <View style={styles.infoContainer}>
        <Text style={[styles.courtName, { color: darkTheme.colors.text }]}>
          {item.name}
        </Text>

        <View style={styles.ratingRow}>
          <MaterialCommunityIcons
            name="star"
            size={16}
            color={darkTheme.colors.warning}
          />
          <Text style={[styles.rating, { color: darkTheme.colors.text }]}>
            {item.rating?.toFixed(1) || 'N/A'} ({item.reviewCount || 0})
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons
              name="map-marker"
              size={14}
              color={darkTheme.colors.textSecondary}
            />
            <Text style={[styles.detailText, { color: darkTheme.colors.textSecondary }]}>
              {item.distance?.toFixed(1) || '?'} km
            </Text>
          </View>

          <View style={styles.detailItem}>
            <MaterialCommunityIcons
              name="currency-usd"
              size={14}
              color={darkTheme.colors.textSecondary}
            />
            <Text style={[styles.detailText, { color: darkTheme.colors.textSecondary }]}>
              ${item.pricePerHour}/hr
            </Text>
          </View>

          <View style={styles.detailItem}>
            <MaterialCommunityIcons
              name="brightness-7"
              size={14}
              color={item.hasLights ? darkTheme.colors.success : darkTheme.colors.textSecondary}
            />
            <Text
              style={[
                styles.detailText,
                { color: item.hasLights ? darkTheme.colors.success : darkTheme.colors.textSecondary },
              ]}
            >
              {item.hasLights ? 'Lights' : 'No lights'}
            </Text>
          </View>
        </View>

        <Text style={[styles.surface, { color: darkTheme.colors.textSecondary }]}>
          {item.surface}
        </Text>
      </View>

      {/* Availability Badge */}
      <View
        style={[
          styles.availabilityBadge,
          {
            backgroundColor:
              item.availableCourts > 0
                ? darkTheme.colors.success
                : darkTheme.colors.error,
          },
        ]}
      >
        <Text style={styles.availabilityText}>{item.availableCourts}</Text>
      </View>
    </TouchableOpacity>
  );

  if (locationError && !courts.length) {
    return (
      <View style={[styles.container, { backgroundColor: darkTheme.colors.surface }]}>
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons
            name="map-marker-off"
            size={48}
            color={darkTheme.colors.error}
          />
          <Text style={[styles.errorTitle, { color: darkTheme.colors.text }]}>
            Location Not Available
          </Text>
          <Text style={[styles.errorMessage, { color: darkTheme.colors.textSecondary }]}>
            {locationError}
          </Text>
          <TouchableOpacity
            style={[
              styles.retryButton,
              { backgroundColor: darkTheme.colors.primary },
            ]}
            onPress={requestLocationAndFetchCourts}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: darkTheme.colors.surface }]}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search courts..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={[styles.searchBar, { backgroundColor: darkTheme.colors.surfaceVariant }]}
          inputStyle={{ color: darkTheme.colors.text }}
        />
      </View>

      {/* Filter Chips */}
      <View style={styles.filterContainer}>
        <View style={styles.filterRow}>
          <Text style={[styles.filterLabel, { color: darkTheme.colors.textSecondary }]}>
            Surface:
          </Text>
          <View style={styles.chipRow}>
            {(['all', 'clay', 'grass', 'synthetic'] as const).map((s) => (
              <Chip
                key={s}
                selected={surface === s}
                onPress={() => setSurface(s)}
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      surface === s
                        ? darkTheme.colors.primary
                        : darkTheme.colors.surfaceVariant,
                  },
                ]}
                textStyle={{
                  color:
                    surface === s
                      ? darkTheme.colors.onPrimary
                      : darkTheme.colors.textSecondary,
                  fontSize: 12,
                }}
                mode="flat"
              >
                {s}
              </Chip>
            ))}
          </View>
        </View>

        <View style={styles.filterRow}>
          <Text style={[styles.filterLabel, { color: darkTheme.colors.textSecondary }]}>
            Sort:
          </Text>
          <View style={styles.chipRow}>
            {(['distance', 'rating', 'price'] as const).map((s) => (
              <Chip
                key={s}
                selected={sortBy === s}
                onPress={() => setSortBy(s)}
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      sortBy === s
                        ? darkTheme.colors.primary
                        : darkTheme.colors.surfaceVariant,
                  },
                ]}
                textStyle={{
                  color:
                    sortBy === s
                      ? darkTheme.colors.onPrimary
                      : darkTheme.colors.textSecondary,
                  fontSize: 12,
                }}
                mode="flat"
              >
                {s}
              </Chip>
            ))}
          </View>
        </View>
      </View>

      {/* Courts List */}
      <FlatList
        data={filteredAndSortedCourts}
        renderItem={renderCourtItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor={darkTheme.colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="tennis"
              size={48}
              color={darkTheme.colors.textSecondary}
            />
            <Text style={[styles.emptyText, { color: darkTheme.colors.textSecondary }]}>
              {loading ? 'Loading courts...' : 'No courts found'}
            </Text>
          </View>
        }
      />

      {/* Location Button (Bottom Right) */}
      <FAB
        icon="crosshairs-gps"
        onPress={requestLocationAndFetchCourts}
        style={[
          styles.fab,
          { backgroundColor: darkTheme.colors.primary },
        ]}
        color={darkTheme.colors.onPrimary}
        loading={locationLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchBar: {
    borderRadius: 8,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  filterRow: {
    gap: 8,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    height: 32,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  courtCard: {
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 4,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  courtName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    fontWeight: '500',
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 11,
  },
  surface: {
    fontSize: 11,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  availabilityBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
  },
  errorMessage: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
