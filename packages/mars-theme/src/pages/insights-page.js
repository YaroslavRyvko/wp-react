import React, { useState, useEffect } from "react";
import axios from "axios";
import { css } from "frontity";
import InsightItem from "../components/partials/insight-item";
import Hero from "../components/partials/hero-item";

const InsightsPage = ({ props }) => {
  const [categories, setCategories] = useState([]);
  const [insights, setInsights] = useState([]);
  const [recentPost, setRecentPost] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [featuredImageUrl, setFeaturedImageUrl] = useState(null);
  const [recentPostTitle, setRecentPostTitle] = useState('');
  const [featuredImageDate, setFeaturedImageDate] = useState('');
  const [recentPostCategoryID, setRecentPostCategoryID] = useState([]);


  const formatDate = (dateString) => {
    const options = { month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return `#${date.toLocaleDateString('en-US', options).replace(/\s+/g, '')}`;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        "https://www.wp-react.bato-webdesign.net/wp-json/wp/v2/insights-category"
      );
      setCategories(response.data);
    };
    fetchCategories();

    const fetchRecentPost = async () => {
      const response = await axios.get(
        "https://www.wp-react.bato-webdesign.net/wp-json/wp/v2/insights?per_page=1&order=desc"
      );
      const post = response.data[0];
      setRecentPost(post);
      setRecentPostTitle(post.title.rendered)
      setFeaturedImageDate(formatDate(post.date));
      setRecentPostCategoryID(post['insights-category'][0]);

      if (post.featured_media) {
        const mediaResponse = await axios.get(
          `https://wp-react.bato-webdesign.net/wp-json/wp/v2/media/${post.featured_media}`
        );
        setFeaturedImageUrl(mediaResponse.data.source_url);
      }
    };
    fetchRecentPost();
  }, []);

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.name : null;
  };

  useEffect(() => {
    const fetchInsights = async () => {
      let endpoint = `https://wp-react.bato-webdesign.net/wp-json/wp/v2/insights?per_page=10&status=publish&page=${currentPage}`;
      if (selectedCategoryId) {
        endpoint += `&insights-category=${selectedCategoryId}`;
      }
      const response = await axios.get(endpoint);
      setInsights(response.data);
      const total = response.headers["x-wp-totalpages"];
      setTotalPages(parseInt(total, 10));
    };

    fetchInsights();
  }, [selectedCategoryId, currentPage]);

  console.log(recentPost);

  const handleCategoryChange = (catId) => {
    setSelectedCategoryId(catId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generate pagination links with new structure
  const paginationLinks = () => {
    let links = [];
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

    // Previous Page Link
    links.push(
      <a
        href="#"
        className={`page-numbers ${currentPage === 1 ? "disabled" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          handlePageChange(prevPage);
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 6.99986H13"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7 1L13 7L7 13"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </a>
    );

    // Current and adjacent page links
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        links.push(
          <span aria-current="page" className="page-numbers current">
            {i}
          </span>
        );
      } else {
        links.push(
          <a
            className="page-numbers"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </a>
        );
      }
    }

    // Next Page Link
    links.push(
      <a
        href="#"
        className={`next page-numbers ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={(e) => {
          e.preventDefault();
          handlePageChange(nextPage);
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 6.99986H13"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7 1L13 7L7 13"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </a>
    );

    return links;
  };

  return (
    <>
      <section class="insights-page-hero" css={hero}>
        <div class="insights-page-hero__image">
          {featuredImageUrl && <img src={featuredImageUrl} alt="Featured" />}
        </div>
        <div class="site-container insights-page-hero__container">
          <div class="insights-page-hero__wrapper">
            <a href="#" class="insights-page-hero__recent">
              <div class="insights-page-hero__recent-cats">
                <span>{featuredImageDate}</span>

                <span key={recentPostCategoryID}>#{getCategoryNameById(recentPostCategoryID)}</span>
              </div>
              {recentPostTitle &&  <h1 class="insights-page-hero__recent-title title-2"> {recentPostTitle}</h1>}
            </a>
          </div>
        </div>
      </section>
      <section className="insights-page" css={styles} id="insights-list">
        <div className="site-container">
          <div className="insights-page__wrapper">
            <div className="insights-page__filter">
              <form>
                <label className="insights-page__filter-item">
                  <span
                    className={
                      !selectedCategoryId ? "active item-filter" : "item-filter"
                    }
                    onClick={() => handleCategoryChange(null)}
                  >
                    All articles
                  </span>
                </label>
                {categories.map((cat) => (
                  <label key={cat.id} className="insights__filter-item">
                    <input
                      type="radio"
                      name="cat_ids"
                      value={cat.id}
                      checked={selectedCategoryId === cat.id}
                      onChange={() => handleCategoryChange(cat.id)}
                      className="item-filter-input"
                    />
                    <span className="item-filter">{cat.name}</span>
                  </label>
                ))}
              </form>
            </div>
            {insights.length > 0 && (
              <div className="insights-page__list">
                {insights.map((insight) => (
                  <InsightItem key={insight.id} insight={insight} />
                ))}
              </div>
            )}
          </div>
          <div className="pagination" css={pag}>
            <div className="pagination__wrapper container">
              <div className="pagination__list">{paginationLinks()}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InsightsPage;

const styles = css`
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

  .insights-page {
    &__list {
      display: flex;
      flex-flow: row wrap;
      gap: 8rem 4rem;

      @media screen and (max-width: 1025px) {
        gap: 4rem;
      }
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
        justify-content: flex-start;
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

const pag = css`
  margin-top: 8rem;
  padding: 1.6rem 0;
  border-top: 1px solid rgba(160, 160, 160, 0.5);

  .pagination {
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

        &.disabled {
          opacity: 0;
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
`;

const hero = css`
position: relative;
height: 93rem;

@media screen and (max-width: 1025px) {
  height: 73rem;
}
    .insights-page-hero {
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

    &__container{
      height:100%;
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
}
`