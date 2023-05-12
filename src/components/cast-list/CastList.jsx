import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import styled from "styled-components";

const CastList = ({ id }) => {
  const { category } = useParams();
  const [casts, setcasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, id);
      setcasts(res.slice(0,6));
    };
    getCredits();
  }, [category, id]);

  return (
    <CastsWrapper>
      {casts.map((item, i) => {
        return (
          <div key={i} className="casts__item">
            <div
              className="casts__img"
              style={{
                backgroundImage: `url(${apiConfig.w500_image(
                  item.profile_path
                )})`,
              }}
            ></div>
            <p className="casts__name">{item.name} as <em style={{color: 'gray'}}>{item.character}</em></p>
          </div>
        );
      })}
    </CastsWrapper>
  );
};

export default CastList;

const CastsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 10px;
  @media screen and (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    /* Hide the scrollbar */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    /* Hide scrollbar on WebKit browsers */
    &::-webkit-scrollbar {
      display: none;
    }

  }

  .casts__item{
      .casts__img{
        padding-top: 130px;
        width: 100px;
        background-size: cover;
        margin-bottom: 0.5rem;
    }

    .casts__name{
        font-size: 0.8rem;
    }
  }
`;
