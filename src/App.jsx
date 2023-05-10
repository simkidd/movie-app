import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from './Layouts/Layout';
import Home from './pages/home/Home';
import MovieDetail from './pages/movie-detail/MovieDetail';
import Explore from './pages/explore/Explore';
import NotFound from './pages/not-found/NotFound';
import Watch from './pages/watch/Watch';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          {/* <Route path='/:category' element={<Catalog />} /> */}
          <Route path='/:category/:id' element={<MovieDetail />} />
          <Route path='/:category/:id/watch' element={<Watch />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App