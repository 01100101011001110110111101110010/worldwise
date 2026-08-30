import { useEffect, createContext, useContext, useReducer } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };

    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities.filter((city) => city.id !== action.payload)],
      };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: 'loading' });

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await fetch(`${apiUrl}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading cities...',
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    console.log(id, currentCity.id);
    if (Number(id) === Number(currentCity.id)) return;
    dispatch({ type: 'loading' });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await fetch(`${apiUrl}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading the city...',
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await fetch(`${apiUrl}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: 'city/created', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating city...',
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await fetch(`${apiUrl}/cities/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: 'city/deleted', payload: id, currentCity: {} });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting city...',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        getCity,
        cities,
        isLoading,
        currentCity,
        error,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext use outside of the CitiesProvider');
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
