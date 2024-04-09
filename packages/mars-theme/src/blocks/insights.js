import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "@frontity/components/link"
import { css } from "frontity";
import InsightItem from "../components/partials/insight-item";

const InsightsBlock = ({ fields }) => {
  const [categories, setCategories] = useState([]);
  const [insights, setInsights] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        "https://wp-react.bato-webdesign.net/wp-json/wp/v2/insights-category"
      );
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  // Fetch insights
  useEffect(() => {
    const fetchInsights = async () => {
      let endpoint =
        "https://wp-react.bato-webdesign.net/wp-json/wp/v2/insights?per_page=4&status=publish";
      if (selectedCategoryId) {
        endpoint += `&insights-category=${selectedCategoryId}`;
      }

      const response = await axios.get(endpoint);
      setInsights(response.data);
    };

    fetchInsights();
  }, [selectedCategoryId]);

  return (
    <section className="insights" id="insights-list" css={styles}>
      <div className="site-container-small">
        <div className="insights__wrapper">
          {fields.title && (
            <h2 className="insights__title title-2">{fields.title}</h2>
          )}
          {fields.subtitle && (
            <p className="insights__subtitle text-l">{fields.subtitle}</p>
          )}

          <div className="insights__filter">
            <form>
              <label className="insights__filter-item">
                <span
                  className={
                    !selectedCategoryId ? "active item-filter" : "item-filter"
                  }
                  onClick={() => setSelectedCategoryId(null)}
                >
                  All insights
                </span>
              </label>
              {categories.map((cat) => (
                <label key={cat.id} className="insights__filter-item">
                  <input
                    type="radio"
                    name="cat_ids"
                    value={cat.id}
                    checked={selectedCategoryId === cat.id}
                    onChange={() => setSelectedCategoryId(cat.id)}
                    className="item-filter-input"
                  />
                  <span className="item-filter">{cat.name}</span>
                </label>
              ))}
            </form>
          </div>

          {insights.length > 0 && (
            <div className="insights__list">
              {insights.map((insight) => (
                <InsightItem key={insight.id} insight={insight} />
              ))}
            </div>
          )}

          <Link link="/insights-page" className="insights__cta white-cta">
            View all
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InsightsBlock;

const styles = css`
  padding: 16rem 0;
  background-color: var(--color-gray2);
  overflow: hidden;

  @media screen and (max-width: 1025px) {
    padding: 7.4rem 0 6.4rem;
  }

  .insights {
    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__title {
      margin-bottom: 1.6rem;
    }

    &__subtitle {
      max-width: 50rem;
      margin: 0 auto 6.4rem;
      text-align: center;
      font-weight: 400;
    }

    &__filter {
      margin-bottom: 5.6rem;

      @media screen and (max-width: 1025px) {
        width: 100%;
        margin-left: auto;
        margin-bottom: 3.6rem;
        overflow-x: scroll;
      }

      form {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        @media screen and (max-width: 768px) {
          justify-content: flex-start;
          padding-bottom: 1rem;
        }
      }

      &-item {
        display: flex;
        flex-shrink: 0;
        cursor: pointer;
        border-radius: 5.2rem;

        @media screen and (max-width: 1025px) {
          border: 1px solid var(--color-gray-light);
        }
      }

      .item-filter {
        height: 5.2rem;
        padding: 1.6rem 3.2rem;
        font-size: 1.6rem;
        font-weight: 500;
        color: var(--color-black);
        border-radius: 5.2rem;
        transition: all 0.3s ease-in-out;

        @media screen and (max-width: 1025px) {
          padding: 1.6rem 2.2rem;
        }

        &-input {
          margin: 0;
          width: 0;
          appearance: none;
          outline: 0;

          &:checked + .item-filter {
            color: #fff;
            background-color: var(--color-black);
            border-radius: 5.2rem;
          }
        }

        &.active {
          color: #fff;
          background-color: var(--color-black);
        }

        &:hover {
          color: #fff;
          background-color: var(--color-black);
        }
      }
    }

    &__list {
      display: flex;
      flex-flow: row wrap;
      gap: 8rem 4rem;

      @media screen and (max-width: 1025px) {
        gap: 4rem;
      }
    }

    &__item {
      width: 100%;
      max-width: calc(50% - 2rem);

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

    &__cta {
      margin-top: 6.4rem;

      &:hover {
        background-color: #313234;
        color: white;
      }
    }
  }

  .insights-page {
    padding: 12rem 0 8rem;

    @media screen and (max-width: 1025px) {
      padding: 6.4rem 0;
    }

    .insights__item:not(.small) {
      margin-bottom: 1rem;

      .insights__item-image {
        height: 44rem;

        @media screen and (max-width: 480px) {
          height: 33.5rem;
        }
      }

      .insights__item-title {
        font-size: 3.2rem;

        @media screen and (max-width: 1025px) {
          font-size: 2.4rem;
        }
      }

      @media screen and (max-width: 768px) {
        margin-bottom: 0;
      }
    }

    &-hero {
      position: relative;
      height: 93rem;

      @media screen and (max-width: 1025px) {
        height: 73rem;
      }

      &__image {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
      }

      .site-container {
        height: 100%;
      }

      &__wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        height: 100%;
      }

      &__recent {
        position: relative;
        max-width: 68rem;
        margin-bottom: 12rem;
        padding: 7.2rem 6.4rem;
        border-radius: 2.4rem;
        background-color: #fff;
        color: inherit;

        @media screen and (max-width: 1025px) {
          margin-bottom: 4rem;
          padding: 4rem 3.2rem;
        }

        &-title {
          @media screen and (max-width: 374px) {
            font-size: 3rem;
          }
        }

        &-cats {
          display: flex;
          align-items: center;
          gap: 2.4rem;
          margin-bottom: 2rem;
          color: var(--color-blue);
          font-family: "GeneralSans", sans-serif;
          font-weight: 600;
          font-size: 2rem;
          text-transform: lowercase;

          @media screen and (max-width: 1025px) {
            font-size: 1.6rem;
          }
        }
      }
    }

    &__wrapper {
      .insights__filter {
        form {
          justify-content: flex-start;
        }
      }
    }

    .pagination {
      margin-top: 8rem;
      padding: 1.6rem 0;
      border-top: 1px solid rgba(160, 160, 160, 0.5);

      &__list {
        display: flex;
        align-items: center;

        .page-numbers {
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "GeneralSans", sans-serif;
          margin: 0 8px;
          font-size: 1.6rem;
          font-weight: 400;
          color: var(--color-gray);

          &:hover {
            color: var(--color-black);
          }

          &.current {
            color: var(--color-black);
            font-weight: 500;
          }

          svg {
            path {
              stroke: var(--color-dark-gray);
            }
          }

          &:first-child {
            width: 4.8rem;
            height: 4.8rem;
            margin-right: auto;
            transform: rotate(-180deg);

            &:not(.disabled) {
              border-radius: 50%;
              border: 1px solid #e2e2e2;

              &:hover {
                background-color: var(--color-blue);
                border: 1px solid var(--color-blue);

                svg {
                  path {
                    stroke: #fff;
                  }
                }
              }

              &:active {
                background-color: #2151b6;
                border: 1px solid #2151b6;
              }
            }
          }

          &:last-child {
            width: 4.8rem;
            height: 4.8rem;
            margin-left: auto;

            &:not(.disabled) {
              border-radius: 50%;
              border: 1px solid #e2e2e2;

              &:hover {
                background-color: var(--color-blue);
                border: 1px solid var(--color-blue);

                svg {
                  path {
                    stroke: #fff;
                  }
                }
              }

              &:active {
                background-color: #2151b6;
                border: 1px solid #2151b6;
              }
            }
          }
        }
      }
    }
  }
`;
