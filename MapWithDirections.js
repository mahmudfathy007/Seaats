import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import polyline from '@mapbox/polyline';
import LocationInput from './LocationInput';
import useLocationSearch from './useLocationSearch';
import styles from './styles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MapWithDirections = () => {
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const mapRef = useRef(null);

  const {
    fromSuggestions,
    setFromSuggestions,
    toSuggestions,
    setToSuggestions,
    searchLocation,
  } = useLocationSearch();

  const handleSuggestionPress = (item, setLocation) => {
    const location = { lat: item.geometry.lat, lng: item.geometry.lng };
    setLocation(location);
    setFromSuggestions([]);
    setToSuggestions([]);
  };

  const getRouteCoordinates = async (from, to) => {
    try {
      const url = `http://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=polyline`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.routes.length > 0) {
        const points = polyline.decode(data.routes[0].geometry);
        const coords = points.map(point => ({
          latitude: point[0],
          longitude: point[1],
        }));
        setRouteCoordinates(coords);
      } else {
        console.error('OSRM Directions API error:', data.message);
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  useEffect(() => {
    if (fromLocation && toLocation) {
      getRouteCoordinates(fromLocation, toLocation);

      if (mapRef.current) {
        mapRef.current.fitToCoordinates([
          { latitude: fromLocation.lat, longitude: fromLocation.lng },
          { latitude: toLocation.lat, longitude: toLocation.lng },
        ], {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }
    }
  }, [fromLocation, toLocation]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.mainLabel}>Where to go</Text>
        <LocationInput
          label="From"
          placeholder="Enter starting location"
          onChangeText={query => {
            setFromLocation(null);
            searchLocation(query, setFromSuggestions);
          }}
          suggestions={fromSuggestions}
          onSuggestionPress={item => handleSuggestionPress(item, setFromLocation)}
        />
        <LocationInput
          label="To"
          placeholder="Enter destination"
          onChangeText={query => {
            setToLocation(null);
            searchLocation(query, setToSuggestions);
          }}
          suggestions={toSuggestions}
          onSuggestionPress={item => handleSuggestionPress(item, setToLocation)}
        />
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 26.8206, // Latitude of Egypt
          longitude: 30.8025, // Longitude of Egypt
          latitudeDelta: 8, // Zoom level
          longitudeDelta: 8, // Zoom level
        }}
      >
        {fromLocation && (
          <Marker
            coordinate={{
              latitude: fromLocation.lat,
              longitude: fromLocation.lng,
            }}
            title="From"
            pinColor="blue"
          />
        )}
        {toLocation && (
          <Marker
            coordinate={{
              latitude: toLocation.lat,
              longitude: toLocation.lng,
            }}
            title="To"
            pinColor="red"
          />
        )}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#2979FF"
            strokeWidth={4}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapWithDirections;
