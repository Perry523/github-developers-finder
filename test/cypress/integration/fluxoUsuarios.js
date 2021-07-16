describe("Fluxo normal", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    it('.should return profile', () => {
    cy.get('input').type('perry523');
    cy.get('#input1').click()
  });
})