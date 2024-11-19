// import { Races } from '../../interface/races';

import { Races } from '../../interface/races';

export default function getArrayRaceNameByIds(ids: number[], races: any[]) {
  const racesArray: Races[] = [];
  const raceNameArray: string[] = [];
  for (const id of ids) {
    racesArray.push(races.find((element: { id: number; }) => element.id === id));
  }
  for (const names of racesArray) {
    raceNameArray.push(names.name);
  }
  return raceNameArray;
}
