import Matchup from "../types/matchup.types";

export function convertMatchup(
  myChamp: string,
  role: string,
  matchupData: string[]
): Matchup {

  let enemyChamp = matchupData[0].replace(/['. ]/g, "");
  if (enemyChamp=='Wukong') {
    enemyChamp='MonkeyKing'
  } 
  let winRate = parseFloat(matchupData[1].replace(/[^\d.-]/g, ""));
  let numOfGames = parseFloat(matchupData[2].replace(/[^\d.-]/g, ""));
  return {
    myChamp: myChamp.toLowerCase(),
    enemyChamp: enemyChamp.toLowerCase(),
    winRate: winRate,
    numOfGames: numOfGames,
    role: role,
  };
}
