import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from "./pages/home/Home";
import MovieDetail from "./pages/movie-detail/MovieDetail";
import Explore from "./pages/explore/Explore";
import NotFound from "./pages/not-found/NotFound";
import Watch from "./pages/watch/Watch";
import SearchResults from "./components/search/SearchResults";
import { MovieContext } from "./contexts/MovieContext";

const App = () => {
  const { searchQuery, searchResults } = useContext(MovieContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/:category/:id" element={<MovieDetail />} />
          <Route path="/:category/:id/watch" element={<Watch />} />
          <Route path="/search" element={<SearchResults results={searchResults} query={searchQuery} />} />
          {/* <Route path="/:category/search" element={<SearchResults results={searchResults} query={searchQuery} />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
