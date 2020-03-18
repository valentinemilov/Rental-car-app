/* eslint-disable func-names */
const moment = require('moment');

const datenow = moment().format('YYYY-MM-DDTHH:mm');
const dateToReturn = moment().add(2, 'days').format('MM/DD/YYYY, h:mm a');

module.exports = {
  'Step one: navigate to Cars app': function (browser) {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('body')
      .assert.titleContains('React App');
  },

  'Step two: navigate to cars': function (browser) {
    browser
      .click('.navbar-toggler')
      .assert.visible('.navbar-brand')
      .click('link text', 'Dashboard')
      .assert.visible('.dashboard-table')
      .click('link text', 'Cars')
      .assert.visible('.search-form');
  },

  'Step three: search for Ford and check if nothing is found': function (browser) {
    browser
      .setValue('.search-form', 'Ford')
      .click('.btn-search')
      .assert.not.elementPresent('.car-card');
  },

  'Step four: search for Audi and make sure it is present': function (browser) {
    browser
      .clearValue('.search-form')
      .setValue('.search-form', 'Audi')
      .click('.btn-search')
      .assert.containsText('p.card-text', 'Audi')
      .assert.attributeContains('.card-img-top', 'src',
        'https://upload.wikimedia.org/wikipedia/commons/3/31/2018_Audi_A8_50_TDi_Quattro_Automatic_3.0.jpg');
  },

  'Step five: rent the Audi car and check if it is in the dashboard table': function (browser) {
    browser
      .click('link text', 'checkout')
      .assert.urlEquals('http://localhost:3000/cars/0e1b2ea4-28a0-4983-88d0-36cfb71f4c22')
      .setValue('input[data-name="firstName"]', 'Valentin')
      .setValue('input[data-name="lastName"]', 'Ivanov')
      .clearValue('input[data-name="age"]')
      .setValue('input[data-name="age"]', '29')
      .assert.value('input[data-name="estimatedReturnDate"]', datenow)
      .clearValue('input[data-name="estimatedReturnDate"]')
      .assert.value('input[data-name="estimatedReturnDate"]', '')
      .setValue('input[data-name="estimatedReturnDate"]', dateToReturn)
      // .assert.valueContains('input[data-name="estimatedReturnDate"]', dateToReturn)
      .click('.btn-submit')
      .assert.containsText('.dashboard-table tbody tr:last-child td:nth-child(1)', 'Audi');
  },

  'Step six: go to cars and make sure Audi is not available there': function (browser) {
    browser
      .click('link text', 'Cars')
      .setValue('.search-form', 'Audi')
      .assert.not.containsText('p.card-text', 'Audi')
      .assert.not.attributeContains('.card-img-top', 'src',
        'https://upload.wikimedia.org/wikipedia/commons/3/31/2018_Audi_A8_50_TDi_Quattro_Automatic_3.0.jpg')
      .end();
  },
};
