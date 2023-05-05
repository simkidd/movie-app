import React from "react";

const Video = ({ item, showTrailer, trailerKey }) => {
  return (
    <>
      {showTrailer && (
        <div className="trailer__video">
          <iframe
            title={`${item.title || item.name} Trailer`}
            width="760"
            height="435"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Video;
