import React, { useEffect, useRef } from 'react';

// Declare Leaflet's global variable to TypeScript
declare const L: any;

interface TripRouteMapProps {
  coordinates: [number, number][];
}

const TripRouteMap: React.FC<TripRouteMapProps> = ({ coordinates }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null); // To hold the map instance
  const routeLayerRef = useRef<any>(null); // To hold the route layers

  useEffect(() => {
    // Ensure Leaflet is loaded and the container is ready
    if (typeof L === 'undefined' || !mapContainer.current) {
      console.error("Leaflet not loaded or map container not found.");
      return;
    }

    // Initialize map only once
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainer.current);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    const map = mapRef.current;

    // Clear previous route layers before drawing a new one
    if (routeLayerRef.current) {
      map.removeLayer(routeLayerRef.current);
    }

    if (coordinates && coordinates.length > 0) {
      // Create a new layer group to hold the polyline and markers
      const routeLayer = L.layerGroup().addTo(map);
      routeLayerRef.current = routeLayer;

      const polyline = L.polyline(coordinates, { color: '#FF5722', weight: 4 }).addTo(routeLayer);
      
      // Fit map bounds to the new polyline
      map.fitBounds(polyline.getBounds().pad(0.1));

      // Add start marker
      L.marker(coordinates[0]).addTo(routeLayer)
        .bindPopup('<b>Start</b>')
        .openPopup();
      
      // Add end marker
      if (coordinates.length > 1) {
        L.marker(coordinates[coordinates.length - 1]).addTo(routeLayer)
          .bindPopup('<b>End</b>');
      }
    }
  }, [coordinates]); // Re-run effect if coordinates change

  return <div ref={mapContainer} style={{ height: '450px', width: '100%', borderRadius: '8px', zIndex: 0 }} />;
};

export default TripRouteMap;
