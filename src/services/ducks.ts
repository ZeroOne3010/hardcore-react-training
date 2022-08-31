import axios from "axios";
import { getBaseUrl } from "./instance";

export type DuckType = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: 0 | 1 | 2;
};

// const ducks: DuckType[] = [
//   { id: "id-1", firstName: "Gaylord", lastName: "McDuck", age: 27, gender: 0 },
//   { id: "id-2", firstName: "Iines", lastName: "McDuck", age: 5, gender: 1 }
// ];

export const getDucks = async (): Promise<DuckType[]> => {
  //return [...ducks];

  try {
    const url = getBaseUrl();
    const ret = await axios.get<DuckType[]>(`${url}/duck`);
    return ret.data;
  } catch (e) {
    console.error("OMG:", e);
    throw e;
  }
};
