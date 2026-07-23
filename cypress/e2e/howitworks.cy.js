describe("How It Works Page", () => {
  const baseUrl = "https://tech-dex-informational-website.vercel.app";

  beforeEach(() => {
    cy.visit(baseUrl + "/#howitworks");
    cy.viewport(1280, 720);
    cy.wait(2000);
  });

  it("TC-012: should display How It Works section when navigated", () => {
    cy.url().should("include", "#howitworks");
    cy.contains("h1, h2, h3", "How the Ishuko App works", {
      matchCase: false,
    }).should("be.visible");
  });

  it("TC-013: should display navigation bar with correct links", () => {
    cy.get("header, nav").should("be.visible");
    cy.contains("a", "Home").should("be.visible");
    cy.contains("a", "How it Works").should("be.visible");
    cy.contains("a", "About Us").should("be.visible");
    cy.contains("a", "Contacts").should("be.visible");
  });

  it("TC-014: should navigate to Home from How It Works page", () => {
    cy.contains("a", "Home").click();
    cy.wait(1500);
    cy.window().its("scrollY").should("equal", 0);
  });

  it("TC-015: should navigate to About Us from How It Works page", () => {
    cy.contains("a", "About Us").click();
    cy.wait(1500);
    cy.url().should("include", "#about");
    cy.contains("About Us", { matchCase: false }).should("be.visible");
  });

  it("TC-016: should navigate to Contacts from How It Works page", () => {
    cy.contains("a", "Contacts").click();
    cy.wait(1000);
    cy.url().should("include", "#contacts");
  });

  it("TC-017: should display How It Works header section", () => {
    cy.contains("h1, h2, h3", "How the Ishuko App works").should("be.visible");
    cy.get(
      '[class*="ishukoHeader"], [class*="header"], [class*="title"]',
    ).should("be.visible");
  });

  it("TC-018: should display all 5 step cards", () => {
    cy.get(
      '[class*="ishukoStepCard"], [class*="stepCard"], [class*="card"]',
    ).should("have.length.at.least", 5);
  });

  it("TC-019: should have green background on odd step badges", () => {
    cy.get('[class*="ishukoBadge"], [class*="badge"]')
      .eq(0)
      .should("have.css", "background-color", "rgb(5, 150, 105)");
  });

  it("TC-020: should have dark background on even step badges", () => {
    cy.get('[class*="ishukoBadge"]')
      .not('[class*="BadgeText"]')
      .eq(1)
      .should("have.css", "background-color", "rgb(15, 23, 42)");
  });

  it("TC-021: should have hover transition effect on all step cards", () => {
    cy.get('[class*="ishukoStepCard"]')
      .should("have.length.at.least", 5)
      .each(($card) => {
        const prop = $card.css("transition-property");
        const duration = $card.css("transition-duration");
        expect(prop === "all" || prop.includes("transform")).to.be.true;
        expect(duration).to.not.equal("0s");
      });
  });

  it("TC-022: should verify all step numbers are visible", () => {
    cy.get('[class*="ishukoBadge"], [class*="badge"]').then(($badges) => {
      expect($badges.length).to.be.at.least(5);
      const numbers = [];
      $badges.each((i, el) => {
        numbers.push(el.textContent.trim());
      });
      expect(numbers).to.include("01");
      expect(numbers).to.include("02");
      expect(numbers).to.include("03");
      expect(numbers).to.include("04");
      expect(numbers).to.include("05");
    });
  });
});
