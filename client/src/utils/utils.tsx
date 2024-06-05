
import Matchup from "@/types/matchup.types";


export function convertMatchup(myChamp:String, role:String, matchupData: string[]): Matchup {
    let winRate = parseFloat(matchupData[1].replace(/[^\d.-]/g, ''));
    let numOfGames = parseFloat(matchupData[2].replace(/[^\d.-]/g, ''));
    return {myChamp: myChamp, enemyChamp: matchupData[0], winRate: winRate, numOfGames: numOfGames, role:role}
}

