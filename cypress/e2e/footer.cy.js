describe("Footer Section", () => {
  const baseUrl = "https://tech-dex-informational-website.vercel.app";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.viewport(1280, 720);
    cy.wait(2000);
    cy.scrollTo("bottom");
    cy.wait(1000);
  });

  it("TC-042: should display TechDex logo in footer", () => {
    cy.get('footer, [class*="footer"]')
      .find('img, svg, [class*="logo"], [class*="Logo"]')
      .should("be.visible");
    cy.contains("TechDex").should("be.visible");
  });

  it("TC-043: should display email address", () => {
    cy.get('footer, [class*="footer"]')
      .contains("techdex87@gmail.com", { matchCase: false })
      .should("be.visible");
  });

  it("TC-044: should display copyright text", () => {
    cy.get('footer, [class*="footer"]')
      .contains("2026 TechDex LTD", { matchCase: false })
      .should("be.visible");
    cy.get('footer, [class*="footer"]')
      .contains("All rights reserved", { matchCase: false })
      .should("be.visible");
  });

  it("TC-045: should have all footer sections visible", () => {
    cy.get('footer, [class*="footer"]').should("be.visible");
    cy.get('footer, [class*="footer"]')
      .find("div, section")
      .should("have.length.at.least", 3);
  });

  it("TC-046: should have email as clickable link", () => {
    cy.get('footer, [class*="footer"]')
      .contains('a[href*="mailto"], a', "techdex87@gmail.com", {
        matchCase: false,
      })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "mailto");
  });
});
