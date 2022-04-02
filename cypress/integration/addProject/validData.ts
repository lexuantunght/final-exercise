import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I open PIM Tool', () => {
  cy.visit('/');
});

When('I go to add project page', () => {
  cy.get('a:contains("Create")').click();
});

Then('I input valid data', () => {
  cy.get('input[name="number"]')
    .type('1010')
    .get('input[name="name"]')
    .type('Gravity super project')
    .get('input[name="customer"')
    .type('Super Idol')
    .get('form div div')
    .eq(0)
    .click()
    .get('li:contains("C/C++")')
    .click()
    .get('input[name="members"]')
    .type('tlx')
    .get('li:contains("Le Xuan Tung")')
    .click()
    .get('form div div')
    .eq(7)
    .click()
    .get('li:contains("New")')
    .click()
    .get('input[name="endDate"]')
    .clear()
    .type('04/09/2023');
});

Then('I click add and see successful message', () => {
  cy.get('button:contains("Create")').click();
  cy.get('div:contains("Project was added successfully")').should('be.visible');
});

When('I go back project list', () => {
  cy.get('a:contains("Project list")').click();
});

Then('I see the project that I have recently added', () => {
  cy.get('td:contains("Gravity super project")').should('be.visible');
  cy.get('td:contains("1010")').should('be.visible');
  cy.get('td:contains("Super Idol")').should('be.visible');
});
