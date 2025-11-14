import React, { useEffect, useRef } from 'react';

// Declare Leaflet's global variable to TypeScript
declare const L: any;

interface TripRouteMapProps {
  coordinates: [number, number][];
}

const TripRouteMap: React.FC<TripRouteMapProps> = ({ coordinates }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null); // To hold the map instance

  useEffect(() => {
    // Ensure Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error("Leaflet is not loaded.");
        return;
    }
      
    if (mapContainer.current && !mapRef.current) { // Initialize map only once
      const map = L.map(mapContainer.current);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      if (coordinates && coordinates.length > 0) {
        const polyline = L.polyline(coordinates, { color: '#FF5722', weight: 4 }).addTo(map);
        map.fitBounds(polyline.getBounds().pad(0.1)); // Add padding

        // Start marker
        L.marker(coordinates[0]).addTo(map)
          .bindPopup('<b>Start</b>')
          .openPopup();
        
        // End marker
        if (coordinates.length > 1) {
            L.marker(coordinates[coordinates.length - 1]).addTo(map)
             .bindPopup('<b>End</b>');
        }
      }
    }
  }, [coordinates]); 

  return <div ref={mapContainer} style={{ height: '450px', width: '100%', borderRadius: '8px', zIndex: 0 }} />;
};

export default TripRouteMap;
