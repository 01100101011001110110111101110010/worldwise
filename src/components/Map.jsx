import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './Map.module.css';

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate('form');
      }}
    >
      <h1>Map</h1>
      <h1>Latitude: {lat}</h1>
      <h1>Longitude: {lng}</h1>
      <button
        onClick={() => {
          setSearchParams({ lat: 51.505, lng: -0.09 });
        }}
      >
        Set London
      </button>
    </div>
  );
}

export default Map;
