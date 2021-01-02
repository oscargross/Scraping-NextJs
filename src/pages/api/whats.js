
import puppeteer from 'puppeteer'


async function browserWhats(password, login, inicialDateFomated, finalDateFomated) {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ["--no-sandbox"]
        });
        const page = await browser.newPage();
        await page.goto('https://web.whatsapp.com/')
        await page.waitForSelector("#app > div > div > div.landing-window")
        let element = await page.$('#app > div > div > div.landing-window');

        await page.setViewport({ width: 100, height: 10 }); // This is ignored

        await element.screenshot({
            path: "./wiki.jpeg",
            clip: {
                x: 70,
                y: 70,
                width: 640,
                height: 640,
            },
            omitBackground: true,
        });

        await browser.close();



    } catch (e) {
        console.log(e)
        return 'Erro ao acessar'
    }

}

export default async function (req, res) {
    if (req.method === "POST") {
        await browserWhats(req.body.listNumbers, req.body.textarea)
        res.json({ message: returnMessage })
    } else {
        res.json({ message: "No permission to access" })
    }

}