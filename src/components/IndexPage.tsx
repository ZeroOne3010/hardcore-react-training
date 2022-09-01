import { FC, useMemo } from "react";
import { DuckProspectType, DuckType } from "../services/ducks";
import DuckList from "./DuckList";
import HireDuckForm from "./HireDuckForm";

const isGood = (duck: DuckType): boolean => {
  return duck.age < 5 && duck.migratesForWinters === false;
};

type Props = {
  duckState: DuckType[];
  onHireDuck: (prospect: DuckProspectType) => void;
  onFireDuck: (id: string) => void;
};

const IndexPage: FC<Props> = ({ duckState, onHireDuck, onFireDuck }) => {
  const goodDucks = useMemo(() => duckState.filter(isGood), [duckState]);
  const badDucks = useMemo(
    () => duckState.filter((d) => !isGood(d)),
    [duckState]
  );

  return (
    <div>
      <HireDuckForm onHireDuck={onHireDuck} />
      <h2>Pahat ankat</h2>
      <DuckList ducks={badDucks} showMetadata={true} fireDuck={onFireDuck} />

      <h2>Hyvät ankat</h2>
      <DuckList ducks={goodDucks} showMetadata={false} fireDuck={onFireDuck} />
    </div>
  );
};
export default IndexPage;
