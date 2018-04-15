const puppeteer = require('puppeteer');

const urlDef = 'https://jsonplaceholder.typicode.com/posts/1';

const baseUrl = 'https://translate.google.ru/translate_tts?'

const url = 'ie=UTF-8 & q=hello%20beautiful%20world & tl=en & total=1 & idx=0 & textlen=21 & tk=581743.955679 & client=t & prev=input & ttsspeed=0.24';

// const url2 = '/translate_tts?ie=UTF-8&q=hello%20world%20wow%20surprise%20motherfucker&tl=en&total=1&idx=0&textlen=37&tk=361935.258239&client=t&prev=input';

const getUrl = ({ encoding = 'UTF-8', text = '', lang = 'en', total = '1', idx = '0' }) => {
  const urlParams = new Map([
    ['ie', encoding],
    ['q', encodeURIComponent(text)],
    ['tl', lang],
    ['total', total],
    ['idx', idx],
    ['textlen', String(text.length)],
  ]);
  const url = `${baseUrl}ie=${encoding}&q=${encodeURIComponent(text)}&tl=${lang}&total=1&idx=0&textlen=${text.length}&`
};

const makerequest = () => {
  return fetch(url).then(res => res.json()).catch(err => console.error(err));
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://google.com');
  const result = await page.evaluate(makerequest);
  console.log(result);
  await browser.close();
})();
