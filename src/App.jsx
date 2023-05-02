import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from './Layouts/Layout';
import Home from './pages/home/Home';
import MovieDetail from './pages/movie-detail/MovieDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/:category/:id' element={<MovieDetail />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App