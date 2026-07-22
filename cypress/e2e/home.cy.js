describe("Home Page", () => {
  const baseUrl = "https://tech-dex-informational-website.vercel.app";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.viewport(1280, 720);
    cy.wait(1500);
  });

  it("TC-006: should load the home page ", () => {
    cy.url().should("eq", baseUrl + "/");
    cy.get("body").should("be.visible");
    cy.get("nav, header").should("be.visible");
  });

  it("TC-007: should display the correct heading text", () => {
    cy.contains(
      'h1, h2, [class*="hero"]',
      "Providing AI Powered digital Solutions for the farmers",
      { matchCase: false },
    ).should("be.visible");
  });

  it("TC-008: should display hero background image", () => {
    cy.get('section, div, [class*="hero"]')
      .find('img, [class*="background"], [style*="background"]')
      .should("exist");
  });

  it("TC-009: should have correct hero section colors", () => {
    cy.get("h1, h2")
      .first()
      .should("have.css", "color")
      .then((color) => {
        cy.log("Heading Color:", color);
      });
  });

  it("TC-010: should display call-to-action buttons with correct colors", () => {
    cy.get("a, button")
      .contains(/how it works|contact us|about us/i)
      .should("exist")
      .and("have.css", "background-color")
      .then((bgColor) => {
        cy.log("CTA Button Background:", bgColor);
      });
  });

  it("TC-011: should have How It Works accessible for buyers", () => {
    cy.contains("a", "How it Works", { matchCase: false })
      .should("be.visible")
      .click();

    cy.wait(1000);
    cy.url().should("include", "#howitworks");
  });
  it("TC-012: should have About us accessible for buyers", () => {
    cy.contains("a", "About Us", { matchCase: false })
      .should("be.visible")
      .click();

    cy.wait(1000);
    cy.url().should("include", "#about");
  });

  it("TC-013: should have Contact section accessible for cooperatives", () => {
    cy.contains("a", "Contacts", { matchCase: false })
      .should("be.visible")
      .click();

    cy.wait(1000);
    cy.url().should("include", "#contacts");
  });
});
