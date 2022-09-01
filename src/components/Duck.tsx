import cx from "clsx";
import { FC, memo } from "react";
import { DuckType } from "../services/ducks";
import Button from "./Button";
import { duckClass, femaleClass, maleClass } from "./Duck.css";
import { Link } from "react-router-dom";
//import styles from "./Duck.module.css";

//console.log(styles);

type Props = {
  duckValue: DuckType;
  fireDuck: (id: string) => void;
};

const Duck: FC<Props> = ({ duckValue, fireDuck }) => {
  const classes = cx(duckClass, {
    [maleClass]: duckValue.gender === 0,
    [femaleClass]: duckValue.gender === 1
  });

  //throw new Error("Aaaargh!");

  return (
    <div className={classes}>
      <div>
        <Link to={`/duck/${duckValue.id}`}>
          {duckValue.lastName}, {duckValue.firstName}
        </Link>
      </div>
      <div>
        {duckValue.age.toFixed(2)}
        {" v, "}
        {duckValue.migratesForWinters ? "Muuttaa talveksi" : "Ei muuta"}
      </div>
      <div>
        <Button onClick={() => fireDuck(duckValue.id)} variant="secondary">
          Vapauta
        </Button>
      </div>
    </div>
  );
};

export default memo(Duck);
