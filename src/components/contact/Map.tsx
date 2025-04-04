import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import { useMemo } from 'react';

const location = {
  lat: 26.359480, // Dammam coordinates
  lng: 50.114100
};

const mapOptions = {
  disableDefaultUI: true,
  clickableIcons: true,
  scrollwheel: false,
};

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const center = useMemo(() => location, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
        <div className="text-gray-400">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={center}
        mapContainerClassName="w-full h-full"
      >
        <MarkerF position={location} />
      </GoogleMap>
    </div>
  );
}
