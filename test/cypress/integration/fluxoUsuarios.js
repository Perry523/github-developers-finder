describe("Fluxo normal", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  it('.should return profiles by repos', () => {
    cy.get('#v-step-1').click()
    cy.get('#repos').click()
    cy.get('#closeModal').click()
    cy.get('.q-field__native').type('20');
    cy.get('#input0').click();
    cy.wait(2000)
  });
})