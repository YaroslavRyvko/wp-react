import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { css } from "frontity";
import Link from "@frontity/components/link"



const InsightItem = ({ insight }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [categoryNames, setCategoryNames] = useState([]);

  useEffect(() => {
    if (insight._links['wp:featuredmedia']) {
      axios.get(insight._links['wp:featuredmedia'][0].href)
        .then(response => {
          setImageUrl(response.data.source_url);
        })
        .catch(error => console.error('Error fetching featured image:', error));
    }
  }, [insight]);


  useEffect(() => {
    if (insight._links['wp:term']) {
      const categoriesLink = insight._links['wp:term'].find(link => link.taxonomy === 'insights-category');
      if (categoriesLink) {
        axios.get(categoriesLink.href)
          .then(response => {
            setCategoryNames(response.data.map(category => category.name));
          })
          .catch(error => console.error('Error fetching categories:', error));
      }
    }
  }, [insight]);

  return (
    <div className="insights__item" css={insights_styles}>
      <Link link={insight.link}>
        <div className="insights__item-image">
          {imageUrl && <img src={imageUrl} alt={insight.title.rendered} />}
        </div>

        {categoryNames.length > 0 && (
          <div className="insights__item-category">
            #{categoryNames.join(' #').toLowerCase()}
          </div>
        )}

        <h3 className="insights__item-title title-5">
          {insight.title.rendered}
        </h3>
        </Link>
    </div>
  );
};

export default InsightItem;


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