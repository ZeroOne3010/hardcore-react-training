import { FC } from "react";
import { DuckType } from "../services/ducks";
import cx from "clsx";
import { duckClass, femaleClass, maleClass } from "./Duck.css";
//import styles from "./Duck.module.css";

//console.log(styles);

type Props = {
  duckValue: DuckType;
};

const Duck: FC<Props> = ({ duckValue }) => {
  const classes = cx(duckClass, {
    [maleClass]: duckValue.gender === 0,
    [femaleClass]: duckValue.gender === 1
  });

  //throw new Error("Aaaargh!");

  return (
    <div className={classes}>
      {duckValue.lastName}, {duckValue.firstName}
    </div>
  );
};

export default Duck;
