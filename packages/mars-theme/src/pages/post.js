import React, { useState, useEffect } from "react";
import { connect, css } from "frontity";
import axios from "axios";
import BlockLoader from "../components/inc/insightsblockloader";
import RelevantPosts from "../components/partials/relevant-posts";

const Post = ({ post , state }) => {
  const [categories, setCategories] = useState([]);
  const blocks = post.acf.blocks;
  const date = new Date(post.date);
  const options = { month: "long", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  const featuredMediaId = post.featured_media;
  const featuredImage = state.source.attachment[featuredMediaId];
  const recentPostCategoryID = post['insights-category'][0];

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        "https://wp-react.bato-webdesign.net/wp-json/wp/v2/insights-category"
      );
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.name : null;
  };

  return (
    <>
    <article className="article" css={article_styles}>
      <div className="site-container-small">
        <div className="article__wrapper">
          <div className="article__cats">
            <span>#{formattedDate.replace(/\s/g, "")}</span>

            <span key={recentPostCategoryID}>#{getCategoryNameById(recentPostCategoryID)}</span>
          </div>

          <h1 className="article__title">{post.title.rendered}</h1>

          {featuredMediaId && featuredImage && (
            <div className="article__image">
              <img
                src={featuredImage.source_url}
                alt={featuredImage.alt_text || "Featured image"}
              />
            </div>
          )}

          <div className="article__content">
            <BlockLoader blocks={blocks || []} />
          </div>
        </div>
      </div>
    
    </article>
    <RelevantPosts fields={post} />
    </>
  );
};

export default connect(Post);

const article_styles = css`
  padding: 9rem 0 12rem;

  @media screen and (max-width: 1025px) {
    padding: 5rem 0 6.4rem;
  }

  .article {
    &__cats {
      display: flex;
      align-items: center;
      gap: 2.4rem;
      margin-bottom: 2.4rem;
      font-family: "GeneralSans", sans-serif;
      font-size: 2.4rem;
      font-weight: 600;
      color: var(--color-blue);
      text-transform: lowercase;

      @media screen and (max-width: 1025px) {
        margin-bottom: 2rem;
        font-size: 1.6rem;
      }
    }

    &__title {
      margin-bottom: 8rem;
      font-size: 8rem;
      font-weight: 700;
      line-height: 1.1;
      color: var(--color-black);

      @media screen and (max-width: 1025px) {
        margin-bottom: 4.8rem;
        font-size: 4rem;
      }
    }

    &__image {
      height: 60rem;
      margin-bottom: 6rem;
      border-radius: 2.4rem;
      overflow: hidden;

      @media screen and (max-width: 768px) {
        height: 28rem;
        margin-bottom: 4.8rem;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__text {
      margin-bottom: 4rem;

      @media screen and (max-width: 1025px) {
        margin-bottom: 3.2rem;
        font-size: 1.6rem;
      }
    }

    &__quote {
      margin-bottom: 4rem;
      font-weight: 600;
      color: var(--color-black);

      @media screen and (max-width: 1025px) {
        margin-bottom: 3.2rem;
        font-size: 1.8rem;
      }
    }

    &__subtitle {
      margin-top: 8rem;
      margin-bottom: 3.2rem;

      @media screen and (max-width: 1025px) {
        margin-bottom: 2.4rem;
        font-size: 2.8rem;
      }
    }

    &__image-text {
      display: flex;
      align-items: center;
      gap: 7rem;
      flex-wrap: wrap;
      margin-bottom: 6.4rem;

      @media screen and (max-width: 1025px) {
        gap: 3rem;
        margin-bottom: 4.8rem;
      }

      &__text {
        max-width: 42rem;
        margin-bottom: 0;
        margin-top: 4rem;

        @media screen and (max-width: 1025px) {
          max-width: 100%;
        }
      }

      &__image {
        height: 50rem;
        width: 49%;
        flex: 0 0 auto;
        border-radius: 2.4rem;
        overflow: hidden;

        @media screen and (max-width: 1025px) {
          width: 100%;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    &__links {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 7.4rem;
      gap: 1.6rem;

      @media screen and (max-width: 1025px) {
        margin-top: 6.4rem;
      }

      .link {
        padding: 2.2rem 4.2rem;

        span {
          height: 100%;
        }
      }
    }
  }
`;
