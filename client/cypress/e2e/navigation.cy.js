describe("Portfolio Navigation E2E Test", () => {
  it("navigates from Home to About page", () => {
    cy.mockLogin(); 
    cy.visit("/");

    cy.contains(/learn more/i).click();
    cy.url().should("include", "/about");
    cy.contains(/about/i).should("be.visible");
  });
});
