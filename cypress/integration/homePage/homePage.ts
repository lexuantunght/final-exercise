import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('I open PIM Tool', () => {
  cy.visit('/');
});

Then('I see some sections', () => {
  cy.get('span:contains("Overview")').should('be.visible');
  cy.get('span:contains("Recent projects")').should('be.visible');
});
