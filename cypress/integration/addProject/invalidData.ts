import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I open PIM Tool', () => {
  cy.visit('/');
});

When('I go to add project page', () => {
  cy.get('a:contains("Create")').click();
});

Then('I see the url is {word}', (url: string) => {
  cy.url().should('eq', `${Cypress.config().baseUrl}${url}`);
});

Then("I don't input and click create button", () => {
  cy.get('button:contains("Create")').click();
});

Then('I see error dialog', () => {
  cy.get('div:contains("Please input all required fields")').should(
    'be.visible'
  );
  cy.get('button:contains("Create")').should('be.disabled');
});
