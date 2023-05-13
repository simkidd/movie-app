import React from "react";
import "./skeleton.scss";

export const CardSkeleton = () => {
  return <div className="movie__card skeleton"></div>;
};

const Skeleton = () => {
  return (
    <div className="">
      <p>Skeleton loading...</p>
    </div>
  );
};

export default Skeleton;
