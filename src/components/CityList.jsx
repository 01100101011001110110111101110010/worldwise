import Spinner from './Spinner.jsx';
import CityItem from './CityItem.jsx';
import Message from './Message.jsx';
import styles from './CityList.module.css';

function CityList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities || cities.length === 0) {
    return <Message text='Add your first city by click on a city on the map' />;
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
