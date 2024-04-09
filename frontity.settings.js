const settings = {
  name: "react-wp",
  state: {
    frontity: {
      url: "https://wp-react.bato-webdesign.net",
      title: "Test Frontity Blog",
      description: "WordPress installation for Frontity development",
    },
  },
  packages: [
    {
      name: "@frontity/mars-theme",
      state: {
        theme: {
          featured: {
            showOnList: false,
            showOnPost: false,
          },
        },
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "https://wp-react.bato-webdesign.net",
          homepage: "home",
          postTypes: [
            {
              type: "events",
              endpoint: "events",
              archive: "/events",
            },
            {
              type: "insights",
              endpoint: "insights",
              archive: "/insights",
            },
          ],
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
  ],
};

export default settings;
