import React, { useEffect, useState } from "react";
import { css } from "frontity";
import Post from "./insight-item";

const RelevantPosts = ({ fields }) => {
  const [posts, setPosts] = useState([]);

  console.log(fields);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `http://ima-asia/wp-json/wp/v2/insights?per_page=3&exclude=${fields.id}&status=publish`
      );
      if (!response.ok) {
        console.error("Failed to fetch posts");
        return;
      }
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="relevant-posts" css={styles}>
      <div className="site-container">
        <div className="relevant-posts__wrapper">
          <h2 className="relevant-posts__title title-2">Most relevant</h2>
          <div className="relevant-posts__list">
            {posts.map((post) => (
              <Post key={post.id} insight={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelevantPosts;

const styles = css`
  padding: 17rem 0 15rem;
  background-color: var(--color-gray2);

  @media screen and (max-width: 1025px) {
    padding: 6.4rem 0;
  }

  .relevant-posts {
    &__title {
      margin-bottom: 6.4rem;

      @media screen and (max-width: 1025px) {
        margin-bottom: 4.8rem;
      }
    }

    &__list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 3rem;

      @media screen and (max-width: 1025px) {
        gap: 4.3rem;
      }

      .insights__item.small {
        max-width: calc(33.3% - 2rem);
        margin-bottom: 0;

        @media screen and (max-width: 1025px) {
          max-width: calc(50% - 2.2rem);
        }

        @media screen and (max-width: 768px) {
          max-width: 100%;
        }
      }
    }
  }
`;
