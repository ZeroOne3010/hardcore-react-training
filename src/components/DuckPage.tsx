import { FC } from "react";
import { useParams } from "react-router";
import { DuckType } from "../services/ducks";

type Props = {
  ducks: DuckType[];
};

const DuckPage: FC<Props> = ({ ducks }) => {
  const { id } = useParams();
  const duck = ducks.find((d) => d.id === id);

  if (!duck) {
    return null;
  }

  return (
    <div>
      <h2>
        {duck.firstName} {duck.lastName}
      </h2>
      <p>Tämän ankan surullinen elämäntarina.</p>
    </div>
  );
};
export default DuckPage;
