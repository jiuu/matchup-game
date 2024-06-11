import getMatchupData from "../utils/scrape";

async function scrape(): Promise<void> {
  let response = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/champion.json"
  );
  let data = await response.json();
  let champs = Object.keys(data.data).sort(); // Extracting champion names and sorting them
  console.log(champs);

  // champs = ["Zyra", "Ahri"];

  for (let champ of champs) {
    let matchupData = await getMatchupData(champ);
    for (let matchup of matchupData) {
      console.log(matchup);
      await fetch("https://matchup-game-server.vercel.app/api/matchups", {method: "PUT", body: JSON.stringify(matchup)})
    }
  }

  }
  console.log('hey')
  scrape();