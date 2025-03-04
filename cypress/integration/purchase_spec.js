const CHARGEBEE_URL = 'https://roadie-test.chargebee.com/hosted_pages/checkout';

describe('Purchasing', () => {
  it('the teams plan sends the user to chargebee', () => {
    cy.visit('/purchase/');
    cy.contains('$900 billed monthly');

    const quantity = 70;
    cy.get('#teams-plan-number-of-engineers').select(quantity.toString());
    cy.contains('$1,190 billed monthly');

    const PLAN_NAME = 'Roadie-Teams-Plan-USD-Monthly';
    cy.get('a#teams-plan-cta').should('have.attr', 'href', `${CHARGEBEE_URL}?subscription_items%5Bitem_price_id%5D%5B0%5D=${PLAN_NAME}&subscription_items%5Bquantity%5D%5B0%5D=${quantity}`);
  });

  it('the teams plan responds to currency changes', () => {
    cy.visit('/purchase/');
    cy.contains('$900 billed monthly');

    cy.get('button#currency-switcher-eur').click();
    cy.contains('€875 billed monthly');

    const PLAN_NAME = 'Roadie-Teams-Plan-EUR-Monthly';
    cy.get('a#teams-plan-cta').should('have.attr', 'href', `${CHARGEBEE_URL}?subscription_items%5Bitem_price_id%5D%5B0%5D=${PLAN_NAME}&subscription_items%5Bquantity%5D%5B0%5D=50`);
  });

  it('the growth plan sends the user to sales', () => {
    cy.visit('/purchase/');
    cy.contains('100 developers or more');

    const CALENDLY_URL = 'https://calendly.com/davidtuite/roadie-sales';
    cy.get('a#growth-plan-cta').should('have.attr', 'href', CALENDLY_URL);
  });
});
