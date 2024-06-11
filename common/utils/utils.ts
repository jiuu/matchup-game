import Matchup from "../types/matchup.types";

export function convertMatchup(
  myChamp: String,
  role: String,
  matchupData: string[]
): Matchup {
  let enemyChamp = matchupData[0].replace(/['. ]/g, "");
  let winRate = parseFloat(matchupData[1].replace(/[^\d.-]/g, ""));
  let numOfGames = parseFloat(matchupData[2].replace(/[^\d.-]/g, ""));
  return {
    myChamp: myChamp,
    enemyChamp: enemyChamp,
    winRate: winRate,
    numOfGames: numOfGames,
    role: role,
  };
}
