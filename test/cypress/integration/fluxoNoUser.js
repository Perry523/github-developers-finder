describe("Fluxo erro", () => {
    beforeEach(() => {
      cy.visit("/");
    });
it('.should return profile', () => {
    cy.get('input').type('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz12');
    cy.get('#input1').click()
  });
})