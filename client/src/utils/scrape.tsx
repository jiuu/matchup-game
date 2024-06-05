import puppeteer from 'puppeteer'
import { convertMatchup } from './utils';

export default async function getMatchupData(myChamp: string, enemyChamp: string, role: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage()
    let URL = `https://www.op.gg/champions/${myChamp}/counters/${role}?tier=diamond_plus&target_champion=${enemyChamp}` //move to assets(?) folder
    URL =   `https://u.gg/lol/champions/malphite/counter?patch=14_8` //move to assets(?) folder
    // might want to do matchups page instead of counter depending on how often u.gg updates page layouts

    //await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(URL, {waitUntil: 'networkidle2',});
    await page.content()
    await page.screenshot({path: './screenshot.png'});
    

    const counterData = await page.$$eval('a.best-win-rate', elements => elements.map(e => (e.innerText).split('\n')))
    const roleType = await page.$eval('.role-value', e => (e as HTMLElement).innerText)

    const matchupArr = counterData.slice(0,3).map(e => { //take worst 3 matchups for champ and convert to matchup type
        return convertMatchup(myChamp, roleType, e) 
    })
    console.log(matchupArr)

    return matchupArr
    
    // await page.evaluate(() => {
    //     return Array.from(document.querySelectorAll('a.best-win-rate')).length;
        
    // }).then(res =>{
    //     console.log(res)
    // })



    

}

