// / <reference types="Cypress" />

describe('Event actions: Visual testing', () => {
    // eslint-disable-next-line no-undef
    before(() => {
        // Clean previous state and prepare Administration
        cy.setToInitialState()
            .then(() => {
                cy.loginViaApi();
            })
            .then(() => {
                cy.setLocaleToEnGb();
            })
            .then(() => {
                cy.openInitialPage(Cypress.env('admin'));
            });
    });

    it('@visual: @check appearance of event action workflow', () => {
        cy.intercept({
            url: `${Cypress.env('apiPath')}/search/event-action`,
            method: 'POST'
        }).as('getData');

        cy.get('.sw-dashboard-index__welcome-text').should('be.visible');
        cy.clickMainMenuItem({
            targetPath: '#/sw/settings/index',
            mainMenuId: 'sw-settings'
        });
        cy.get('#sw-event-action').click();
        cy.wait('@getData')
            .its('response.statusCode').should('equal', 200);

        cy.get('.sw-data-grid-skeleton').should('not.exist');
        cy.takeSnapshot('[Event action] Listing', '.sw-event-action-list__grid');

        cy.skipOnFeature('FEATURE_NEXT_8225', () => {
            cy.contains('.sw-data-grid__row--0 a', 'Guest account registered with double opt-in').click();
            cy.get('.sw-loader').should('not.exist');
            cy.takeSnapshot('[Event action] Detail', '.sw-event-action-detail');
        });
    });
});
