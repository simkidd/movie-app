import React from "react";
import "./video.scss";

const Video = ({ item, showTrailer, trailerKey }) => {
  return (
    <>
      {showTrailer ? (
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
      ) : (
        <div className="trailer__video">
          <div
            style={{ width: "760px", height: "435px", background: "#111", display:'flex', alignItems:'center', justifyContent:'center', color:'grey' }}
          > Not available</div>
        </div>
      )}
    </>
  );
};

export default Video;
