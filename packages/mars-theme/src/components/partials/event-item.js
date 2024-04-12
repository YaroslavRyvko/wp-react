import React, { useState, useEffect } from "react";
import axios from "axios";
import { css } from "frontity";
import Link from "@frontity/components/link";

const EventItem = ({ event }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [categoryNames, setCategoryNames] = useState([]);

  // Fetch featured image URL
  useEffect(() => {
    if (event._links["wp:featuredmedia"]) {
      axios
        .get(event._links["wp:featuredmedia"][0].href)
        .then((response) => {
          // This assumes that the media details object has a 'source_url' field
          setImageUrl(response.data.source_url);
        })
        .catch((error) =>
          console.error("Error fetching featured image:", error)
        );
    }
  }, [event]);

  // Fetch category names
  useEffect(() => {
    if (event._links["wp:term"]) {
      const categoriesLink = event._links["wp:term"].find(
        (link) => link.taxonomy === "events-category"
      );
      if (categoriesLink) {
        axios
          .get(categoriesLink.href)
          .then((response) => {
            // Extract the names of the categories and set them in state
            setCategoryNames(response.data.map((category) => category.name));
          })
          .catch((error) => console.error("Error fetching categories:", error));
      }
    }
  }, [event]);

  return (
    <div className="events__item" css={styles}>
      <div className="events__item-image">
        {imageUrl && <img src={imageUrl} alt={event.title.rendered} />}
      </div>

      {categoryNames.length > 0 && (
        <div className="events__item-category">
          #{categoryNames.join(" #").toLowerCase()}
        </div>
      )}

      <h3 className="events__item-title title-5">{event.title.rendered}</h3>
    </div>
  );
};

export default EventItem;

const styles = css``;
