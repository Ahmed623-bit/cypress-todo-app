/// <reference types="cypress" />

// Ensure Cypress is installed and configured

describe('Todo App', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    cy.visit('http://localhost:3000');
  });

  it('adds a new task', () => {
    cy.get('input[placeholder="Add task"]').type('Learn Cypress');
    cy.contains('Add').click();
    cy.contains('Learn Cypress').should('exist');
  });

  it('marks task as done', () => {
    cy.get('input[placeholder="Add task"]').type('Test done task');
    cy.contains('Add').click();
    cy.contains('Test done task').click();
    cy.contains('Test done task')
      .should('have.css', 'text-decoration-line', 'line-through');
  });

  it.only('deletes a task', () => {
    cy.get('input[placeholder="Add task"]').type('Delete me');
    cy.contains('Add').click();
    cy.contains('Delete me').parent().find('button').click();
    cy.contains('Delete me').should('not.exist');
  });
});
