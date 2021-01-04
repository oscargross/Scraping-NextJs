
import puppeteer from 'puppeteer'


async function browserWhats() {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ["--no-sandbox"]
        });
        const page = await browser.newPage();
        await page.goto('https://web.whatsapp.com/')
        await page.waitForSelector("#app > div > div > div.landing-window")

        await page.waitForSelector("#app > div > div > div.landing-window > div.landing-main > div > div._3l6Cf > div > div > span")

        await page.screenshot({
            path: "./public/assets/qrcode.jpg",
            clip: {
                x: 210,
                y: 0,
                width: 550,
                height: 550,
            },
        });

        await page.waitForTimeout(15000)

        const inWhats = await page.evaluate(() => {
            try {
                if (document.querySelector("#app > div > div > div.landing-header > div").textContent === "WhatsApp Web"){return false
                }else{return true}
                
            } catch (error) {
                return true
            }            
          });
        if(inWhats) {return browser} 
        else {
            browser.close() 
            return inWhats
        }

        
    } catch (e) {
        console.log(e)
        return false
    }

}


async function whats(browser, numbers, msg) {
    const numberNotSend = []
    try {
        for (let i = 0; i < numbers.length; i++) {
            const page = await browser.newPage();

            try {
                await page.goto('https://web.whatsapp.com/send?phone=' + numbers[i] + '&text=' + msg);
                await page.waitForSelector('#main > footer > div._3SvgF._1mHgA.copyable-area > div:nth-child(3) > button')
                await page.waitForTimeout(3000)
                await page.click('#main > footer > div._3SvgF._1mHgA.copyable-area > div:nth-child(3) > button', { delay: 5000 });
                await page.waitForTimeout(10000)
                await page.close();

            } catch (e) {
                numberNotSend.push(numbers[i])
                await page.close()
            }
        }
    } catch (e) {
        browser.close()
        console.log(e)
        return {error: true , msg: 'Erro ao enviar msgs'}
    }
    browser.close()

    return {error: false, numbers: numberNotSend, msg:"Mensagens enviadas com sucesso.\n Os seguintes números estão incorretos ou apresetaram falha durante o processo de envio: "}
}


export default async function whatsAPI (req, res) {
    if (req.method === "POST") {

        const browser = await browserWhats()
        if(!browser) {
            res.json({ message: "Falha na conexão com o What'sApp" , numbers: req.body.numbers})
        }else{
            

            const numbersFormated = req.body.numbers.map((number) => {
                if (number != "") {
                    return '55' + number.replace(/[^\d]+/g, '')}
            })
            const successSending = await whats(browser, numbersFormated, req.body.textarea)
            successSending.error === false
                ? res.json({ message: false , numbers: successSending.numbers, msg: successSending.msg})
                : res.json({ message: successSending.msg })


        }

    } else {
        res.json({ message: "No permission to access" })
    }

}
