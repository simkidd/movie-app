import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from "./pages/home/Home";
import MovieDetail from "./pages/movie-detail/MovieDetail";
import Explore from "./pages/explore/Explore";
import NotFound from "./pages/not-found/NotFound";
import Watch from "./pages/watch/Watch";
import SearchResults from "./components/search/SearchResults";
import { MovieContext } from "./contexts/MovieContext";
import Login from "./pages/login/Login";
import AuthLayout from "./Layouts/AuthLayout";
import Register from "./pages/register/Register";
import Landing from "./pages/landing/Landing";
import Profile from "./pages/profile/Profile";
import auth from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "./private/ProtectedRoute";

const App = () => {
  const { searchQuery, searchResults } = useContext(MovieContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/account" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {currentUser && (
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/:category/:id" element={<MovieDetail />} />
              <Route path="/:category/:id/watch" element={<Watch />} />
              <Route
                path="/search"
                element={
                  <SearchResults results={searchResults} query={searchQuery} />
                }
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default App;
