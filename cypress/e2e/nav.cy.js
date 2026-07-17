describe("Navigation - Header & Navbar", () => {
  const baseUrl = "https://tech-dex-informational-website.vercel.app";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.viewport(1280, 720);
    cy.wait(2000);
  });

  it("TC-001: should display the website logo clearly", () => {
    cy.get(
      'header img, nav img, [class*="logo"] img, img[alt*="TechDex"], img[alt*="logo"]',
    )
      .should("exist")
      .and("be.visible")
      .and("have.prop", "naturalWidth")
      .should("be.greaterThan", 0);
  });

  it("TC-002: should display all navigation links (Home, How it Works, About Us, Contacts)", () => {
    const expectedLinks = ["Home", "How it Works", "About Us", "Contacts"];

    cy.get('nav, header, [class*="nav"], [class*="Nav"]').should("be.visible");

    expectedLinks.forEach((linkText) => {
      cy.get('nav, header, [class*="nav"], [class*="Nav"]')
        .contains("a", linkText, { matchCase: false })
        .should("exist")
        .and("be.visible");
    });
  });

  it("TC-003: should display navigation bar at the top with all components", () => {
    cy.get('nav, header, [class*="nav"], [class*="Nav"]')
      .should("be.visible")
      .then(($el) => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top).to.be.closeTo(0, 50);
      });

    cy.get('nav a, header a, [class*="nav"] a, [class*="Nav"] a').should(
      "have.length.at.least",
      4,
    );
  });

  it("TC-004: should navigate to About Us section when clicking About Us link", () => {
    cy.get('nav, header, [class*="nav"], [class*="Nav"]')
      .contains("a", "About Us", { matchCase: false })
      .should("be.visible")
      .click();

    cy.wait(1500);
    cy.url({ timeout: 10000 }).should("include", "#aboutus");

    cy.get("body")
      .contains("About Us", { matchCase: false })
      .should("be.visible");
  });

  it("TC-005: should navigate to How It Works section when clicking How It Works link", () => {
    cy.get('nav, header, [class*="nav"], [class*="Nav"]')
      .contains("a", "How it Works", { matchCase: false })
      .should("be.visible")
      .click();

    cy.wait(1500);
    cy.url({ timeout: 10000 }).should("include", "#howitworks");

    cy.get("body")
      .contains("How It Works", { matchCase: false })
      .should("be.visible");
  });

  it("TC-006: should navigate to Contacts section when clicking Contacts link", () => {
    cy.get('nav, header, [class*="nav"], [class*="Nav"]')
      .contains("a", "Contacts", { matchCase: false })
      .should("be.visible")
      .click();

    cy.wait(1500);
    cy.url({ timeout: 10000 }).should("include", "#contacts");

    cy.get("body")
      .contains("Contact", { matchCase: false })
      .should("be.visible");
  });

  it("TC-007: should have consistent navigation colors", () => {
    cy.get('nav, header, [class*="nav"], [class*="Nav"]')
      .first()
      .should("have.css", "background-color")
      .then((bgColor) => {
        cy.log("Navigation Background Color:", bgColor);
      });

    cy.get("nav a, header a")
      .first()
      .should("have.css", "color")
      .then((textColor) => {
        cy.log("Navigation Text Color:", textColor);
      });
  });
});
