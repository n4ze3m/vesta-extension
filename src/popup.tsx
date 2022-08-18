import { MantineProvider } from "@mantine/core"
import { QueryClient, QueryClientProvider } from "react-query"

import App from "~app"

import "./index.css"

const queryClient = new QueryClient()

function IndexPopup() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          fontFamily: "Montserrat"
        }}>
        <App />
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default IndexPopup
