import { Builder, By, until } from "selenium-webdriver";
import assert from 'assert';

describe('Register page', function () {

    let driver;
    before(
        async function () {
            try {
                this.timeout(30000);
                driver = await new Builder().forBrowser('chrome').build();
            } catch (err) {
                console.error("fail to launch Chrome, ", err);
                throw err;
            }
        }
    )

    it('Successful Register', async function () {

        await driver.get('https://hoangduy0610.github.io/ncc-sg-automation-workshop-1/register.html');

        try {
            const emailBox = await driver.wait(until.elementLocated(By.id('email')), 5000);
            await emailBox.sendKeys('TrucLy');
            const passBox = await driver.wait(until.elementLocated(By.id('password')), 5000);
            await passBox.sendKeys('Aleena02072002');
            const registerButton = await driver.wait(until.elementLocated(By.css('button')), 5000);
            await registerButton.click();

            const successMessage = await driver.wait(until.elementLocated(By.className('alert-success'), 5000));
            const messageText = await successMessage.getText();

            assert.equal(messageText, 'Registration successful');


        } catch (err) {
            console.error('Register failed: ', err.message);
            assert.fail('Register failed');
        }
    })

    it('Fail to register with account already registered', async function () {
        await driver.get('https://hoangduy0610.github.io/ncc-sg-automation-workshop-1/register.html');

        try {
            const emailBox = await driver.wait(until.elementLocated(By.id('email')), 5000);
            await emailBox.sendKeys('Aleena0207');
            const passBox = await driver.wait(until.elementLocated(By.id('password')), 5000);
            await passBox.sendKeys('Aleena02072002');
            const registerButton = await driver.wait(until.elementLocated(By.css('button')), 5000);
            await registerButton.click();

            const successMessage = await driver.wait(until.elementLocated(By.className('alert-danger'), 5000));
            await successMessage.getText();
            const messageText = await successMessage.getText();

            assert.equal(messageText, 'Username already exists');


        } catch (err) {
            console.error('Test failed: ', err.message);
            assert.fail('Register with existing username');
        }
    })

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });
})

