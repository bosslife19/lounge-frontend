import { Link, Tabs } from "@chakra-ui/react";
import { Articles } from "./Articles";
import { VideosPage } from "./Videos";

export const TabPanel = ({ articles, setArticles }) => {
  return (
    <Tabs.Root defaultValue="articles">
      <Tabs.List mx={4} gap={4}>
        <Tabs.Trigger
          fontSize={{ base: "9px", md: 14 }}
          value="articles"
          asChild
          px={0}
          py={1}
          display="inline-flex"
          w="fit-content"
          _selected={{
            color: "#2B362F",
            borderBottom: "2px solid",
            borderColor: "#2B362F",
          }}
        >
          <Link unstyled href="#articles">
            Articles
          </Link>
        </Tabs.Trigger>

        <Tabs.Trigger
          fontSize={{ base: 10, md: 14 }}
          value="videos"
          asChild
          px={0}
          py={1}
          display="inline-flex"
          w="fit-content"
          _selected={{
            color: "#2B362F",
            borderBottom: "2px solid",
            borderColor: "#2B362F",
          }}
        >
          <Link unstyled href="#videos">
            Videos
          </Link>
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="articles">
        <Articles articles={articles} setArticles={setArticles} />
      </Tabs.Content>

      <Tabs.Content value="videos">
        <VideosPage />
      </Tabs.Content>
    </Tabs.Root>
  );
};
