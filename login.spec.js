import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';

describe('Login page', function () {
  let driver;

  before(async function () {
    this.timeout(10000);
    driver = await new Builder().forBrowser('chrome').build();
    console.log('Chrome opened');
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  beforeEach(async function () {
    await driver.get('https://hoangduy0610.github.io/ncc-sg-automation-workshop-1/login.html');
  });

  it('Successful login with valid credentials', async function () {
    await driver.findElement(By.id('email')).sendKeys('Aleena0207');
    await driver.findElement(By.id('password')).sendKeys('Aleena02072002');
    await driver.findElement(By.css('button')).click();

    const h1 = await driver.wait(until.elementLocated(By.css('h1')), 5000);
    const text = await h1.getText();
    assert.equal(text, 'Hello world');
  });

  it('Fail login with incorrect password', async function () {
    await driver.findElement(By.id('email')).sendKeys('Aleena0207');
    await driver.findElement(By.id('password')).sendKeys('WrongPassword');
    await driver.findElement(By.css('button')).click();

    const alert = await driver.wait(until.elementLocated(By.css('.alert-danger')), 5000);
    const text = await alert.getText();
    assert.equal(text, 'Invalid username or password');
  });

  it('Fail login with empty email', async function () {
    await driver.findElement(By.id('password')).sendKeys('Aleena02072002');
    await driver.findElement(By.css('button')).click();

    const alert = await driver.wait(until.elementLocated(By.css('.alert-danger')), 5000);
    const text = await alert.getText();
    assert.equal(text, 'Invalid username or password');
  });

  it('Fail login with empty password', async function () {
    await driver.findElement(By.id('email')).sendKeys('Aleena0207');
    await driver.findElement(By.css('button')).click();

    const alert = await driver.wait(until.elementLocated(By.css('.alert-danger')), 5000);
    const text = await alert.getText();
    assert.equal(text, 'Invalid username or password');
  });

  it('Fail login with invalid email format', async function () {
    await driver.findElement(By.id('email')).sendKeys('notanemail');
    await driver.findElement(By.id('password')).sendKeys('Aleena02072002');
    await driver.findElement(By.css('button')).click();

    const alert = await driver.wait(until.elementLocated(By.css('.alert-danger')), 5000);
    const text = await alert.getText();
    assert.equal(text, 'Invalid username or password');
  });
});
