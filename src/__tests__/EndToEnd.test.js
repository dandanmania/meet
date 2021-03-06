import puppeteer from 'puppeteer';
import { mockData } from '../mock-data';

describe('show/hide an event details', () => {
    let browser;
    let page
    beforeAll(async () => {
        jest.setTimeout(30000);
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, //slow down by 250ms
            ignoreDefaultArgs: ['--disable-extensions'] //ignores default setting that causes timeout errors
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default.', async () => {
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    })

    test('User can expand an event to see its details', async () => {
        await page.click('.event .details-toggle');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    })

    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .details-toggle');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    })
});

describe('Filter events by city', () => {
    let browser;
    let page
    jest.setTimeout(70000);
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slow down by 250ms
            ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('When user hasn\'t searched for a city, show upcoming events from all cities.', async () => {
        const events = await page.$$eval('.event', (list) => list.length)
        expect(events).toBe(mockData.length);
    })

    test('User should see a list of suggestions when they search for a city', async () => {
        await page.click('.city');
        const defaultCities = await page.$$eval('.suggestions li', (suggestion) => suggestion.length);
        expect(defaultCities).toEqual(1);
        await page.type('.city', 'Berlin', {delay: 100});
        const cities = await page.$$eval('.suggestions li', (suggestion) => suggestion.length);
        expect(cities).toEqual(2);
    })

    test('User can select a city from the suggested list', async () => {
        await page.click('.suggestions li')
        const events = await page.$$eval('.event', (list) => list.length)
        expect(events).toEqual(1);
    })
})