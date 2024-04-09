import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "@frontity/components/link";
import { css } from "frontity";
import EventItem from "../components/partials/event-item";

const UpcomingMeetingsPage = ({ fields }) => {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchEvents = async (page) => {
    let endpoint = `https://wp-react.bato-webdesign.net/wp-json/wp/v2/events?per_page=9&page=${page}&status=publish`;
    if (selectedCategoryId) {
      endpoint += `&events-category=${selectedCategoryId}`;
    }

    try {
      const response = await axios.get(endpoint);
      if (page === 1) {
        setEvents(response.data);
      } else {
        setEvents(prevEvents => [...prevEvents, ...response.data]);
      }
      setHasMore(response.headers['x-wp-totalpages'] > page);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("https://wp-react.bato-webdesign.net/wp-json/wp/v2/events-category");
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setEvents([]);
    setCurrentPage(1);
    setHasMore(true);

    fetchEvents(1);
  }, [selectedCategoryId]);

  const handleLoadMore = () => {
    fetchEvents(currentPage + 1);
  };
  
  return (
    <section className="events" id="events-list" css={styles}>
      <div className="site-container">
        <div className="events__wrapper">
          {fields.title && (
            <h1 className="events__title">{fields.title}</h1>
          )}
          {fields.text && (
            <div className="events__text text-l">{fields.text}</div>
          )}

          <div className="events__filter">
            <form>
              <label className="events__filter-item">
                <span
                  className={!selectedCategoryId ? "active item-filter" : "item-filter"}
                  onClick={() => setSelectedCategoryId('')}
                >
                  All meetings
                </span>
              </label>
              {categories.map((cat) => (
                <label key={cat.id} className="events__filter-item">
                  <input
                    type="radio"
                    name="cat_slug"
                    value={cat.slug}
                    checked={selectedCategoryId === cat.id}
                    onChange={() => setSelectedCategoryId(cat.id)}
                    className="item-filter-input"
                  />
                  <span className="item-filter">{cat.name}</span>
                </label>
              ))}
            </form>
          </div>

          {events.length > 0 && (
            <div className="events__list">
              {events.map((event) => (
                <EventItem key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
        {events.length > 0 && hasMore && (
          <div className="alm-btn-wrap">
          <button onClick={handleLoadMore} className="alm-load-more-btn more">
           Load More
         </button>
       </div>
      )}
      </div>
    </section>
  );
};

export default UpcomingMeetingsPage;

const styles = css`
padding: 11rem 0 16rem;

@media screen and (max-width: 1025px) {
  padding: 5rem 0 12rem;
}

.events{
  &__title {
    margin-bottom: 1rem;
    font-size: 8rem;
    font-family: "HelveticaNow", sans-serif;
    font-weight: 700;
    color: var(--color-black);
    text-align: center;
  
    @media screen and (max-width: 1025px) {
      margin-bottom: 1.6rem;
      font-size: 4rem;
    }
  }
  
  &__text {
    max-width: 72rem;
    margin: 0 auto 12rem;
    font-weight: 400;
    text-align: center;
  
    @media screen and (max-width: 1025px) {
      margin: 0 auto 5.2rem;
    }
  }
  
  &__filter {
    margin-bottom: 5.6rem;
  
    @media screen and (max-width: 1200px) {
      width: 100%;
      margin-left: auto;
      overflow-x: scroll;
    }
  
    @media screen and (max-width: 1025px) {
      margin-bottom: 4rem;
    }
  
    form {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding-bottom: 1rem;
  
      @media screen and (max-width: 1200px) {
        justify-content: flex-start;
        overflow-x: scroll;
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
      padding: 1.6rem 2.4rem;
      font-family: "HelveticaNow", sans-serif;
      font-size: 1.6rem;
      font-weight: 500;
      color: var(--color-black);
      border-radius: 5.2rem;
      transition: all 0.3s ease-in-out;
  
      @media screen and (max-width: 1025px) {
        font-size: 1.4rem;
      }
  
      &-input {
        margin: 0;
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
        border-radius: 5.2rem;
        padding: 1.6rem 3.2rem;
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
    gap: 9.6rem 3rem;
  
    @media screen and (max-width: 768px) {
      gap: 4.8rem 0;
    }
  }
  
  &__item {
    width: 100%;
    max-width: calc(33.3% - 2rem);
  
    @media screen and (max-width: 1025px) {
      max-width: calc(50% - 1.5rem);
    }
  
    @media screen and (max-width: 768px) {
      max-width: 100%;
    }
  
    &-image {
      position: relative;
      height: 38rem;
      margin-bottom: 2.4rem;
      border-radius: 2.4rem;
      overflow: hidden;
  
      @media screen and (max-width: 768px) {
        height: 33.5rem;
        margin-bottom: 2.4rem;
      }
  
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  
    &-info {
      display: flex;
      gap: 2.4rem;
      flex-wrap: wrap;
      margin-bottom: 1.6rem;
      color: var(--color-blue);
      font-family: "GeneralSans", sans-serif;
      font-weight: 600;
      font-size: 1.6rem;
    }
  
    &-place {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 1.6rem;
      right: 1.6rem;
      height: 3.2rem;
      padding: 8px 1.6rem;
      border-radius: 5.1rem;
      font-family: "GeneralSans", sans-serif;
      font-size: 1.2rem;
      font-weight: 600;
      color: #fff;
      background-color: var(--color-black);
    }
  }
}

.ajax-load-more-wrap {
  width: 100%;
  margin-top: 9.6rem;

  @media screen and (max-width: 768px) {
    margin-top: 4.8rem;
  }
}

.alm-reveal {
  display: flex;
  flex-flow: row wrap;
  gap: 9.6rem 3rem;
}

.alm-load-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  margin: 9.8rem auto 0;
  padding: 2.2rem 5.6rem;
  height: 6.4rem;
  border: 1px solid var(--color-gray-light);
  border-radius: 6.4rem;
  background-color: transparent;
  color: var(--color-black);
  transition: background-color 0.5s ease;
  font-size: 1.6rem;
  font-weight: 500;

  &.done {
    display: none;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }

  @media screen and (max-width: 374px) {
    font-size: 1.4rem;
  }

  &:hover {
    background-color: var(--color-gray2);
  }

  &:active {
    color: var(--color-dark-gray);
    background-color: var(--color-gray2);
  }
}

.ajax-load-more-wrap {
  width: 100%;
  margin-top: 9.6rem;

  @media screen and (max-width: 768px) {
    margin-top: 4.8rem;
  }
}

.alm-reveal {
  display: flex;
  flex-flow: row wrap;
  gap: 9.6rem 3rem;
}

`;