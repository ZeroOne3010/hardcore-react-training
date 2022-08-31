import { FC, useState, useEffect } from "react";
import { DuckType, getDucks } from "../services/ducks";
import Duck from "./Duck";
import gaylordImage from "../assets/gaylord-mcduck.jpg";
import { ErrorBoundary } from "react-error-boundary";

const App: FC = () => {
  const [duckState, setDuckState] = useState<DuckType[]>([]);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    getDucks().then((ducks) => {
      console.log("ducks", ducks);
      setDuckState(ducks);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((oldValue) => {
        return oldValue + 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log("duck state was changed");
  }, [duckState]);

  return (
    <div>
      <h1>
        D<sup>uck</sup>ERP 3010
      </h1>
      <p>
        Ohjelmaa käytetty <strong>{counter}</strong> sekuntia.
      </p>
      <main>
        {duckState.length === 0 && <p>No ducks</p>}

        {duckState.map((duck) => {
          return (
            <ErrorBoundary
              key={duck.id}
              fallbackRender={({ error }) => {
                return <div>{error.message}</div>;
              }}
            >
              <Duck duckValue={duck} />
            </ErrorBoundary>
          );
        })}
      </main>
      <img src={gaylordImage} alt="Gaylord McDuck" style={{ width: "200px" }} />
    </div>
  );
};

export default App;
