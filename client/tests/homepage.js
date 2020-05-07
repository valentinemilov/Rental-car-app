/* eslint-disable func-names */
const moment = require('moment');

const dateTomorrow = moment().add(1, 'days').format('YYYY-MM-DDThh:mm');
const dateToReturn = moment().add(2, 'days').format('MM-DD-YYYY-h:m a');

module.exports = {
  'Step one: navigate to Cars app': function (browser) {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('body')
      .assert.titleContains('React App');
  },

  'Step two: navigate to cars': function (browser) {
    browser
      // .click('.navbar-toggler')
      .assert.visible('.navigation')
      .click('link text', 'Dashboard')
      .assert.visible('.dashboard-table')
      .click('link text', 'Cars')
      .assert.visible('.search-form');
  },

  'Step three: search for Ford and check if nothing is found': function (browser) {
    browser
      .setValue('.search-form', 'Ford')
      .assert.not.elementPresent('.car-card');
  },

  'Step four: search for Audi and make sure it is present': function (browser) {
    browser
      .clearValue('.search-form')
      .setValue('.search-form', 'Audi')
      .assert.containsText('p.card-text', 'Audi')
      .assert.attributeContains('.card-img-top', 'src',
        'http://localhost:3001/public/audi_RS3.jpg');
  },

  'Step five: rent the Audi car and check if it is in the dashboard table': function (browser) {
    browser
      .click('.fa-angle-double-right')
      .assert.urlEquals('http://localhost:3000/cars/780926fa-5ba8-4957-b024-109db158e1b2')
      .setValue('input[data-name="firstName"]', 'Valentin')
      .setValue('input[data-name="lastName"]', 'Ivanov')
      .clearValue('input[data-name="age"]')
      .setValue('input[data-name="age"]', '29')
      .assert.value('input[data-name="estimatedReturnDate"]', dateTomorrow)
      .clearValue('input[data-name="estimatedReturnDate"]')
      .assert.value('input[data-name="estimatedReturnDate"]', '')
      .setValue('input[data-name="estimatedReturnDate"]', dateToReturn)
      // .assert.valueContains('input[data-name="estimatedReturnDate"]', dateToReturn)
      .click('.fa-check-circle')
      .assert.containsText('.dashboard-table tbody tr:last-child td:nth-child(1)', 'Audi');
  },

  'Step six: go to cars and make sure Audi is not available there': function (browser) {
    browser
      .click('link text', 'Cars')
      .setValue('.search-form', 'Audi')
      .assert.not.elementPresent('.car-card')
      .end();
  },
};
