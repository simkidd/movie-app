import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import Video from "./Video";

const VideoList = ({ item, id }) => {
  const { category } = useParams();
  const [showTrailer, setShowTrailer] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const getTrailerKey = async () => {
      const res = await tmdbApi.getVideos(category, id);
      const videos = res;
      const trailer = videos.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setShowTrailer(true);
        setTrailerKey(trailer.key);
      } else {
        setShowTrailer(false);
      }
    };
    getTrailerKey();
  }, [category, id]);

  return (
    <>
      <Video item={item} showTrailer={showTrailer} trailerKey={trailerKey} />
    </>
  );
};

export default VideoList;
