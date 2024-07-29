// src/routes/api/webscraper/+server.js
import { json } from '@sveltejs/kit';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// Apply the stealth plugin to avoid being detected as a bot
puppeteer.use(StealthPlugin());

async function scrapeWholeWebpage(url) {
    console.log(`Scraping the webpage: ${url}`);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle0' });

        const pageTitle = await page.title() || "Title not found";
        const pageText = await page.evaluate(() => document.body.innerText) || "No content available";
        const links = await page.evaluate(() => {
            const anchorElements = Array.from(document.querySelectorAll('a'));
            return anchorElements.map(element => element.href).filter(href => href.startsWith('http://') || href.startsWith('https://'));
        });

        console.log(`Data for ${url} has been successfully scraped.`);
        return { title: pageTitle, content: pageText, links };
    } catch (error) {
        console.error(`Error during scraping ${url}:`, error);
        return { title: `Failed to load ${url}`, content: error.message, links: [] };
    } finally {
        await browser.close();
    }
}

export async function POST({ request }) {
    const { url } = await request.json();

    if (!url) {
        return json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        const data = await scrapeWholeWebpage(url);
        return json(data);
    } catch (error) {
        console.error('An error occurred during the scraping process:', error);
        return json({ error: 'Failed to scrape website' }, { status: 500 });
    }
}
