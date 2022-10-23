describe("HOME ( Index ) Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Should display house welcome title and description", () => {
    cy.get("div").contains("Houses of Game of Thrones");
  });
});

export {};
