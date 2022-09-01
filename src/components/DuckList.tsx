import { FC, memo } from "react";
import { DuckType } from "../services/ducks";
import Duck from "./Duck";

type Props = {
  ducks: DuckType[];
  showMetadata: boolean;
  fireDuck: (id: string) => void;
};

const DuckList: FC<Props> = ({ ducks, showMetadata, fireDuck }) => {
  return (
    <div>
      {ducks.length === 0 && <p>No ducks</p>}
      {ducks.map((duck) => {
        return <Duck duckValue={duck} key={duck.id} fireDuck={fireDuck} />;
      })}
    </div>
  );
};

export default memo(DuckList);
