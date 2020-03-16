/* eslint-disable func-names */
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
      .assert.not.visible('.col-md-4 card')
      .end();
  },
};
