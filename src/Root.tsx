import { VFC } from "react";
import App from "./components/App";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

const Root: VFC = () => {
  //

  // All React components must return one thing. A fragment (the empty tag <>) is such "one thing" that has no markup.
  return (
    <BrowserRouter>
      <ErrorBoundary
        fallbackRender={({ error }) => {
          return (
            <div>
              <h1>Oh noes!</h1>
              {error.message}
            </div>
          );
        }}
      >
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Root;
