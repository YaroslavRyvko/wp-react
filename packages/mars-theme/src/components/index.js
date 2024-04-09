import { useState, useEffect } from "react";
// Frontity
import { connect, Head } from "frontity";
import Switch from "@frontity/components/switch";

import Post from "../pages/post";
import ContactPage from "../pages/contact";
import UpcomingMeetingsPage from "../pages/upcoming-meetings";
import InsightsPage from "../pages/insights-page";

// Components
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import BlockLoader from "./inc/blockloader";

// Styles
import { Styles } from "../styles/main";

const Theme = ({ state }) => {
  const [blocks, setBlocks] = useState([]);
  const [fields, setFields] = useState({});
  const [page, setPage] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await state.source.get(state.router.link);
      const waitForReady = async (data, timeout = 100, maxAttempts = 50) => {
        let attempts = 0;
        while (!data.isReady && attempts < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, timeout));
          attempts++;
        }
        if (attempts >= maxAttempts) {
          throw new Error("Timeout waiting for data to be ready");
        }
      };

      await waitForReady(data);

      if (data.isReady) {
        const page = state.source[data.type][data.id];
        setPage(page);
        setBlocks(page.acf.blocks || []);
        setFields(page.acf || {});
      } else {
        console.error(
          "Failed to load data: Data is not ready after maximum attempts"
        );
      }
    };

    fetchData();
  }, [state.router.link]);

  if (!page) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      <Styles />

      <Header />

      <main className="main">
        <BlockLoader blocks={blocks} />
        <Switch>
          <Post post={page} when={page.type === "insights"} />
          <ContactPage fields={fields} when={page.id === 328} />
          <InsightsPage props={state} when={page.id === 153} />
          <UpcomingMeetingsPage fields={fields} when={page.id === 178} />
        </Switch>
      </main>

      <Footer />
    </>
  );
};

export default connect(Theme);