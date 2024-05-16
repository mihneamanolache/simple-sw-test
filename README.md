[![ProxyShare.io - 4G Mobile Proxies](https://github.com/mihneamanolache/puppeteer-extra-amazon-captcha/assets/43548656/c3efa5c2-848c-4c21-a184-c0190e6d6f35)](https://www.proxyshare.io/)

# Browserless ServiceWorkers Leak Test

[`puppeteer-extra-plugin-stealth`](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth) is definitely the leading project when it comes to headless browser evasion techniques. However, browser fingerprinting is not limited to window scoped techniques. `simple-sw-test` is designed to highlight the differences found in window scoped vs. [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) detection methods.

## Using `simple-sw-test`
To use `simple-sw-test`, all you need to do is access `https://mihneamanolache.github.io/simple-sw-test/` via your headless browser and check it's results. As a recommendation, for visual ease you can take a screenshot of the page and check the results, as in the example below:

![example](https://user-images.githubusercontent.com/43548656/205596362-1553eb07-5a63-4976-b101-7eb931473f9a.png)

## Browserless implementation scripts
### #1: Puppeteer
```javascript
import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer'
import StealthPlugin from 'puppeteer-extra-plugin-stealth' 

(async () => {
    puppeteer.use(StealthPlugin())
	const browser = await puppeteer.launch({
		headless: true,
		executablePath: executablePath(),
	})
	const page = await browser.newPage()
	await page.goto('https://mihneamanolache.github.io/simple-sw-test/')
	await page.waitForSelector('#doneTesting')
	await page.screenshot({
		path: 'simple-sw-test.png',
		fullPage: true 
	});
	browser.close();
})()
```

### #2: Selenium
```py
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium_stealth import stealth
from selenium.webdriver.support.ui import WebDriverWait

URL = 'https://mihneamanolache.github.io/simple-sw-test/'

options = Options()
options.headless = True
options.add_argument("start-maximized")
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option('useAutomationExtension', False)
driver = webdriver.Chrome(options=options)

wait = WebDriverWait(driver, 10)

stealth(driver,
        languages=["en-US", "en"],
        vendor="Google Inc.",
        platform="Win32",
        webgl_vendor="Intel Inc.",
        renderer="Intel Iris OpenGL Engine",
        fix_hairline=True)

driver.get(URL) 
driver.get_screenshot_as_file('simple-sw-test.png')
driver.quit()
```
