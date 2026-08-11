import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Homepage from './pages/Homepage.jsx';
import Pricing from './pages/Pricing.jsx';
import Product from './pages/Product.jsx';
import Login from './pages/Login.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import AppLayout from './pages/AppLayout.jsx';
import CityList from './components/CityList.jsx';
import CountriesList from './components/CountriesList.jsx';
import City from './components/City.jsx';
const apiUrl = import.meta.env.VITE_API_URL;
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await fetch(`${apiUrl}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error('Error fetching cities:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='product' element={<Product />} />
        <Route path='login' element={<Login />} />
        <Route path='app' element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path='cities'
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path='cities/:id' element={<City />} />
          <Route
            path='countries'
            element={<CountriesList cities={cities} isLoading={isLoading} />}
          />
          <Route path='form' element={<p>Form </p>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
