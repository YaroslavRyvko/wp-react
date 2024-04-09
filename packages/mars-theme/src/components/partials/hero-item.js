import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { css } from "frontity";

const HeroItem = ({ recentPost }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (insight._links['wp:featuredmedia']) {
      axios.get(insight._links['wp:featuredmedia'][0].href)
        .then(response => {
          setImageUrl(response.data.source_url);
        })
        .catch(error => console.error('Error fetching featured image:', error));
    }
  }, [insight]);

  return (
    <div className="insights__item" css={insights_styles}>
        <div className="insights__item-image">
          {imageUrl && <img src={imageUrl} alt={insight.title.rendered} />}
        </div>
    </div>
  );
};

export default HeroItem;


const insights_styles = css`
    width: 100%;
    max-width: calc(50% - 2rem);

    .insights__item{
    &.small {
      max-width: calc(33.3% - 2.7rem);
      margin-bottom: 1rem;

      @media screen and (max-width: 1100px) {
        max-width: calc(50% - 2rem);
      }

      .insights__item-image {
        height: 38rem;

        @media screen and (max-width: 480px) {
          height: 33.5rem;
        }
      }

      @media screen and (max-width: 768px) {
        max-width: 100%;
        margin-bottom: 0;
      }
    }

    @media screen and (max-width: 768px) {
      max-width: 100%;
    }

    &:hover {
      @media screen and (min-width: 1025px) {
        .insights__item-image img {
          transform: scale(1.2);
        }
      }
    }

    &-image {
      height: 47rem;
      margin-bottom: 2.4rem;
      border-radius: 2.4rem;
      overflow: hidden;
      isolation: isolate;

      @media screen and (max-width: 480px) {
        height: 33.5rem;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
    }

    &-category {
      margin-bottom: 1.6rem;
      font-size: 1.6rem;
      font-family: "GeneralSans", sans-serif;
      font-weight: 600;
      color: var(--color-blue);
    }

    &-title {
      color: var(--color-black);
    }
  }
`;