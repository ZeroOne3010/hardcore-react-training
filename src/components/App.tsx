import { FC, useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import gaylordImage from "../assets/gaylord-mcduck.jpg";
import {
  DuckProspectType,
  DuckType,
  fireDuck,
  getDucks,
  hireDuck
} from "../services/ducks";
import { cleanse } from "../services/instance";
import { mainClass } from "./App.css";
import Button from "./Button";
import DuckPage from "./DuckPage";
import IndexPage from "./IndexPage";

const App: FC = () => {
  const [duckState, setDuckState] = useState<DuckType[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const [cleansing, setCleansing] = useState<boolean>(false);

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

  const onFireDuck = useCallback(
    async (duckId: string): Promise<void> => {
      console.log("Erotetaan ", duckId);

      await fireDuck(duckId);

      setDuckState((currentDucks) =>
        currentDucks.filter((d) => d.id !== duckId)
      );
    },
    [setDuckState]
  );

  const onHireDuck = useCallback(
    async (prospect: DuckProspectType): Promise<void> => {
      console.log("Palkataan ", prospect.firstName);
      const hiredDuck = await hireDuck(prospect);
      setDuckState((currentDucks) => {
        return [...currentDucks, hiredDuck];
        //return currentDucks.concat(hiredDuck);
      });
    },
    [setDuckState]
  );

  return (
    <main className={mainClass}>
      <h1>
        D<sup>uck</sup>ERP 3010
      </h1>
      <Button
        disabled={cleansing}
        onClick={async () => {
          setCleansing(true);
          await cleanse();
          setCleansing(false);
        }}
      >
        {!cleansing ? "🧹 Puhdista kanta" : "⏳ Puhdistetaan kantaa..."}
      </Button>
      <p>
        Ohjelmaa käytetty <strong>{counter}</strong> sekuntia.
      </p>
      <img src={gaylordImage} alt="Gaylord McDuck" style={{ width: "120px" }} />

      <Routes>
        <Route
          index
          element={
            <IndexPage
              duckState={duckState}
              onHireDuck={onHireDuck}
              onFireDuck={onFireDuck}
            />
          }
        />
        <Route path="/duck/:id" element={<DuckPage ducks={duckState} />} />
      </Routes>
    </main>
  );
};

export default App;
