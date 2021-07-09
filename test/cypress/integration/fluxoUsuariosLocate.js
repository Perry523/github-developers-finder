describe("Fluxo Locate", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  it('.should return profiles', () => {
    cy.get('#v-step-1').click()
    cy.get('#locate').click()
    cy.get('#closeModal').click()
    cy.get('.q-field__native').click();
    cy.get('.q-item__label').contains('Brasil').click()
    cy.get('#input0').click();
    cy.wait(2000)
    cy.get('.text-h6').contains('diego3g').click()
    cy.get('#favoritar').click()
  });
})