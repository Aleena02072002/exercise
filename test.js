import { Builder, By, Key, until } from "selenium-webdriver";
import assert from 'assert';

describe('Register page', function () {
  let driver;
  
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });
  
  it('Register fail', async function () {
    await driver.get('https://hoangduy0610.github.io/ncc-sg-automation-workshop-1/register.html');
  
    // moi khi findElement doi 500ms ~ 0.5s
    await driver.manage().setTimeouts({ implicit: 500 });
  
    let userName = await driver.findElement(By.id('email'));
    let password = await driver.findElement(By.id('password'));
    let submitButton = await driver.findElement(By.css('button'));
  
    await userName.sendKeys('Thytest01');
    await password.sendKeys('Thy123');
    await submitButton.click();
    await driver.manage().setTimeouts({ implicit: 1000 });

    let message = await driver.findElement(By.className('alert-danger'));
    let errorMessage = await message.getText();
  
    assert.equal(errorMessage, 'Username already exists');
  });
  
  it('Register success', async function () {
    await driver.get('https://hoangduy0610.github.io/ncc-sg-automation-workshop-1/register.html');
  
    // moi khi findElement doi 500ms ~ 0.5s
    await driver.manage().setTimeouts({ implicit: 500 });
  
    let userName = await driver.findElement(By.id('email'));
    let password = await driver.findElement(By.id('password'));
    let submitButton = await driver.findElement(By.css('button'));
  
    await userName.sendKeys('Thytest05');
    await password.sendKeys('Thy123');
    await submitButton.click();
    await driver.manage().setTimeouts({ implicit: 1000 });

    let message = await driver.findElement(By.className('alert-success'));
    let errorMessage = await message.getText();
  
    assert.equal(errorMessage, 'Registration successful');
  });

  it('Register to fail with the account has just been registered', async function () {
    await driver.get('https://hoangduy0610.github.io/ncc-sg-automation-workshop-1/register.html');
  
    // moi khi findElement doi 500ms ~ 0.5s
    await driver.manage().setTimeouts({ implicit: 500 });
  
    let userName = await driver.findElement(By.id('email'));
    let password = await driver.findElement(By.id('password'));
    let submitButton = await driver.findElement(By.css('button'));
  
    await userName.sendKeys('Thytest03');
    await password.sendKeys('Thy123');
    await submitButton.click();
    await driver.manage().setTimeouts({ implicit: 1000 });

    let message = await driver.findElement(By.className('alert-danger'));
    let errorMessage = await message.getText();
  
    assert.equal(errorMessage, 'Username already exists');
  });

  //Hong Di chua lam validation :v
  // it('Register with empty email and password field', async function () {
  //   await driver.get('https://hoangduy0610.github.io/ncc-sg-automation-workshop-1/register.html');
  
  //   // moi khi findElement doi 500ms ~ 0.5s
  //   await driver.manage().setTimeouts({ implicit: 500 });
  
  //   let submitButton = await driver.findElement(By.css('button'));

  //   await submitButton.click();
  //   await driver.manage().setTimeouts({ implicit: 1000 });

  //   let message = await driver.findElement(By.className('alert-danger'));
  //   let errorMessage = await message.getText();
  
  //   assert.equal(errorMessage, 'Registration failed');
  // });

  // it('Register with empty email field', async function () {
  //   await driver.get('https://hoangduy0610.github.io/ncc-sg-automation-workshop-1/register.html');
  
  //   // moi khi findElement doi 500ms ~ 0.5s
  //   await driver.manage().setTimeouts({ implicit: 500 });
  
  //   let password = await driver.findElement(By.id('password'));
  //   let submitButton = await driver.findElement(By.css('button'));
  
  //   await password.sendKeys('Thy123');
  //   await submitButton.click();
  //   await driver.manage().setTimeouts({ implicit: 1000 });

  //   let message = await driver.findElement(By.className('alert-danger'));
  //   let errorMessage = await message.getText();
  
  //   assert.equal(errorMessage, 'Registration failed');
  // });

  // it('Register with empty password field', async function () {
  //   await driver.get('https://hoangduy0610.github.io/ncc-sg-automation-workshop-1/register.html');
  
  //   // moi khi findElement doi 500ms ~ 0.5s
  //   await driver.manage().setTimeouts({ implicit: 500 });
  
  //   let userName = await driver.findElement(By.id('email'));
  //   let submitButton = await driver.findElement(By.css('button'));
  
  //   await userName.sendKeys('Thytest03');
  //   await submitButton.click();
  //   await driver.manage().setTimeouts({ implicit: 1000 });

  //   let message = await driver.findElement(By.className('alert-danger'));
  //   let errorMessage = await message.getText();
  
  //   assert.equal(errorMessage, 'Registration failed');
  // });
  
  after(async () => await driver.quit());
});