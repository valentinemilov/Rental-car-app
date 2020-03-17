/* eslint-disable func-names */
const moment = require('moment');

const datenow = moment().format('YYYY-MM-DDTHH:mm');
const dateToReturn = moment().add(2, 'days').format('MM/DD/YYYY, h:mm a');
console.log(dateToReturn);
console.log(datenow);

module.exports = {
  'Demo test cars': function (browser) {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('body')
      .assert.titleContains('React App')
      .click('button[type=button]')
      .assert.visible('.navbar-brand')
      .click('link text', 'Dashboard')
      .assert.visible('.dashboard-table')
      .click('link text', 'Cars')
      .assert.visible('.search-form')
      .setValue('.search-form', 'Ford')
      .click('button[type=submit]')
      .assert.not.elementPresent('.car-card')
      .clearValue('.search-form')
      .setValue('.search-form', 'Audi')
      .click('button[type=submit]')
      .assert.containsText('p.card-text', 'Audi')
      .assert.attributeContains('.card-img-top', 'src', 'https://upload.wikimedia.org/wikipedia/commons/3/31/2018_Audi_A8_50_TDi_Quattro_Automatic_3.0.jpg')
      .click('link text', 'checkout')
      .assert.urlEquals('http://localhost:3000/cars/0e1b2ea4-28a0-4983-88d0-36cfb71f4c22')
      .setValue('input[name=firstName]', 'Valentin')
      .setValue('input[name=lastName]', 'Ivanov')
      .clearValue('input[type=number]')
      .setValue('input[type=number]', '29')
      .assert.value('input[type=datetime-local]', datenow)
      .clearValue('input[type=datetime-local]')
      .assert.value('input[type=datetime-local]', '')
      .setValue('input[type=datetime-local]', dateToReturn)
      // .assert.valueContains('input[type=datetime-local]', dateToReturn)
      .click('button[type=submit]')
      // .assert.containsText('.dashboard-table tbody tr td:nth-child(1)', 'Audi')
      .assert.containsText('tbody', 'Audi')
      .click('link text', 'Cars')
      .setValue('.search-form', 'Audi')
      .assert.not.containsText('p.card-text', 'Audi')
      .assert.not.attributeContains('.card-img-top', 'src', 'https://upload.wikimedia.org/wikipedia/commons/3/31/2018_Audi_A8_50_TDi_Quattro_Automatic_3.0.jpg')
      .end();
  },
};
