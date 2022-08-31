import { VFC } from "react";
import App from "./components/App";
import { ErrorBoundary } from "react-error-boundary";

const Root: VFC = () => {
  //

  // All React components must return one thing. A fragment (the empty tag <>) is such "one thing" that has no markup.
  return (
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
  );
};

export default Root;
