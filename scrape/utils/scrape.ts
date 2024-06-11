import puppeteer from "puppeteer";
import { convertMatchup } from "../../common/utils/utils";

export default async function getMatchupData(champion: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //let URL = `https://www.op.gg/champions/${myChamp}/counters/${role}?tier=diamond_plus&target_champion=${enemyChamp}`; //move to assets(?) folder
  let URL = `https://u.gg/lol/champions/${champion}/counter`; //move to assets(?) folder
  // might want to do matchups page instead of counter depending on how often u.gg updates page layouts

  //await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  await page.goto(URL, { waitUntil: "networkidle2" });
  await page.content();
  await page.screenshot({ path: "./screenshot.png" });

  const counterData = await page.$$eval("a.best-win-rate", (elements) =>
    elements.map((e) => e.innerText.split("\n"))
  );
  const roleType = await page.$eval(
    ".role-value",
    (e) => (e as HTMLElement).innerText
  );

  const matchupArr = counterData.slice(0, 3).map((e) => {
    //take worst 3 matchups for champ and convert to matchup type
    return convertMatchup(champion, roleType, e);
  });

  await browser.close();	


  return matchupArr;

  // await page.evaluate(() => {
  //     return Array.from(document.querySelectorAll('a.best-win-rate')).length;

  // }).then(res =>{
  //     console.log(res)
  // })
}
