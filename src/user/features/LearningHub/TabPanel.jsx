import { Link, Tabs } from "@chakra-ui/react"
import { Articles } from "./Articles"
import { VideosPage } from "./Videos"

export const TabPanel = () => {
  return (
    <Tabs.Root defaultValue="articles" bg={'#F5F6FA'}>
      <Tabs.List mx={4}>
        <Tabs.Trigger fontSize={{base:10,md:14}} value="articles" asChild>
          <Link unstyled href="#articles">
            Articles
          </Link>
        </Tabs.Trigger>
        <Tabs.Trigger fontSize={{base:10,md:14}} value="videos" asChild>
          <Link unstyled href="#videos">
            Videos
          </Link>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="articles">
        <Articles/>
        </Tabs.Content>
      <Tabs.Content value="videos">
       <VideosPage/>
        </Tabs.Content>
    </Tabs.Root>
  )
}
