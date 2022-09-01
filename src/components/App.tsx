import { FC, useEffect, useState } from "react";
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
import DuckList from "./DuckList";
import HireDuckForm from "./HireDuckForm";

const isGood = (duck: DuckType): boolean => {
  return duck.age < 5 && duck.migratesForWinters === false;
};

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

  const onFireDuck = async (duckId: string): Promise<void> => {
    console.log("Erotetaan ", duckId);

    await fireDuck(duckId);

    setDuckState((currentDucks) => currentDucks.filter((d) => d.id !== duckId));
  };

  const onHireDuck = async (prospect: DuckProspectType): Promise<void> => {
    console.log("Palkataan ", prospect.firstName);
    const hiredDuck = await hireDuck(prospect);
    setDuckState((currentDucks) => {
      return [...currentDucks, hiredDuck];
      //return currentDucks.concat(hiredDuck);
    });
  };

  const goodDucks = duckState.filter(isGood);
  const badDucks = duckState.filter((d) => !isGood(d));

  return (
    <main className={mainClass}>
      <h1>
        D<sup>uck</sup>ERP 3010
      </h1>
      <button
        disabled={cleansing}
        onClick={async () => {
          setCleansing(true);
          await cleanse();
          setCleansing(false);
        }}
      >
        {!cleansing ? "Puhdista kanta" : "Puhdistetaan kantaa..."}
      </button>
      <p>
        Ohjelmaa käytetty <strong>{counter}</strong> sekuntia.
      </p>
      <HireDuckForm onHireDuck={onHireDuck} />
      <h2>Pahat ankat</h2>
      <DuckList ducks={badDucks} showMetadata={true} fireDuck={onFireDuck} />

      <h2>Hyvät ankat</h2>
      <DuckList ducks={goodDucks} showMetadata={false} fireDuck={onFireDuck} />
      <img src={gaylordImage} alt="Gaylord McDuck" style={{ width: "200px" }} />
    </main>
  );
};

export default App;
