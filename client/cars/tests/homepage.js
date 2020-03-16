/* eslint-disable func-names */
// import moment from 'moment';
// module.exports = {
//   'Demo test ecosia.org' : function (browser) {
//     browser
//       .url('https://www.ecosia.org/')
//       .waitForElementVisible('body')
//       .assert.titleContains('Ecosia')
//       .assert.visible('input[type=search]')
//       .setValue('input[type=search]', 'nightwatch')
//       .assert.visible('button[type=submit]')
//       .click('button[type=submit]')
//       .assert.containsText('.mainline-results', 'Nightwatch.js')
//       .end();
//   }
// };
const date = new Date();
date.setDate(date.getDate() + 5);
const dateToReturn = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
console.log(dateToReturn);

module.exports = {
  'Demo test cars': function (browser) {
    browser
      .url('http://localhost:3000/')
      .waitForElementVisible('body')
      .assert.titleContains('React App')
      .click('button[type=button]')
      .assert.visible('.navbar-brand')
      .click('link text', 'Dashboard')
      .assert.visible('.table-responsive-md')
      .click('link text', 'Cars')
      .assert.visible('input[type=text]')
      .setValue('input[type=text]', 'Ford')
      .click('button[type=submit]')
      .assert.not.elementPresent('.col-md-4 card')
      .clearValue('input[type=text]')
      .setValue('input[type=text]', 'Audi')
      .click('button[type=submit]')
      .assert.containsText('p.card-text', 'Audi')
      .click('link text', 'checkout')
      .assert.urlEquals('http://localhost:3000/cars/0e1b2ea4-28a0-4983-88d0-36cfb71f4c22')
      .setValue('input[name=firstName]', 'Valentin')
      .setValue('input[name=lastName]', 'Ivanov')
      .clearValue('input[type=number]')
      .setValue('input[type=number]', '29')
      // .clearValue('input[type=datetime-local]')
      .setValue('input[type=datetime-local]', dateToReturn)
      .click('button[type=submit]')
      .assert.containsText('tbody', 'Audi')
      .end();
  },
};
