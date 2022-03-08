import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import HeaderBar from "./common/components/HeaderBar";
import ProjectList from "./screens/ProjectList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="p-3">
          <HeaderBar />
          <Switch>
            <Route path="/project-list">
              <ProjectList />
            </Route>
            <Route path="/home" exact>
              Home
            </Route>
            <Route path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
