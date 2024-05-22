import logo from "./logo.svg";
import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import Router from "./router/Router";
import { queryClient } from "./query/CustomQueryClient";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  // const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
