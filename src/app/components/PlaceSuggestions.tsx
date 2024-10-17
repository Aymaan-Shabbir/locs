/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import Link from "next/link"; // Import Link from next/link
import placesData from "../../../public/places.json"; // Make sure the path is correct
import { Place } from "../../types";

const SuggestPlaces = () => {
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [locationError, setLocationError] = useState<string>("");
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 0, longitude: 0 });

  const handleSuggestPlaces = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          // Map through placesData and calculate distance
          const nearbyPlaces: (Place & { distance: number })[] = placesData.map(
            (place: Place) => ({
              ...place,
              distance: calculateDistance(
                latitude,
                longitude,
                place.map.latitude,
                place.map.longitude
              ),
            })
          );

          // Sort by distance and get the nearest 6 places
          const sortedPlaces = nearbyPlaces.sort(
            (a, b) => a.distance - b.distance
          );

          const nearestPlaces = sortedPlaces.slice(0, 6); // Get the nearest 6

          // Set the suggestions
          setSuggestions(nearestPlaces);
        },
        (error) => {
          setLocationError("Error fetching location: " + error.message);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  const handleClearSuggestions = () => {
    setSuggestions([]);
    setUserLocation({ latitude: 0, longitude: 0 });
    setLocationError("");
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(2)); // Distance in km
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Nearby Places</h1>
      <p>
        BongTrials needs access to your location, make sure location services
        are allowed.
      </p>
      <button onClick={handleSuggestPlaces}>Suggest Places</button>
      <button onClick={handleClearSuggestions}>Clear Suggestions</button>
      {locationError && <p style={{ color: "red" }}>{locationError}</p>}
      <ul>
        {suggestions.length > 0 ? (
          suggestions.map((place, index) => (
            <li key={index}>
              <Link href={`/places/${place.slug}`} passHref>
                <span
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {place.name}
                </span>
              </Link>{" "}
              - Distance: {place.distance} km
            </li>
          ))
        ) : (
          <li>No suggestions available.</li>
        )}
      </ul>
    </div>
  );
};

export default SuggestPlaces;
