describe("About Us Page/Section", () => {
  const baseUrl = "https://tech-dex-informational-website.vercel.app";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.viewport(1280, 720);
    cy.wait(2000);
    cy.contains("a", "About Us", { matchCase: false }).click();
    cy.wait(2000);
  });

  it("TC-024: should display About Us section when navigated", () => {
    cy.url().should(
      "satisfy",
      (url) => url.includes("#about") || url.includes("#aboutus"),
    );
    cy.contains("WHAT WE DO", { matchCase: false }).should("be.visible");
  });

  it("TC-025: should display mission statement", () => {
    cy.contains("Our Mission", { matchCase: false }).should("be.visible");
    cy.contains("To revolutionize African agricultural trade").should(
      "be.visible",
    );
  });

  it("TC-026: should display What We Do section content", () => {
    cy.contains(
      "We are an innovative team dedicated to bridging engineering gaps",
    ).should("be.visible");
  });

  it("TC-027: should display Our Impact section", () => {
    cy.contains("Our Impact", { matchCase: false }).should("be.visible");
    cy.contains("Ishuko transforms Zambian agriculture").should("be.visible");
  });

  it("TC-028: should display Meet Our Team section with member cards", () => {
    cy.contains("Meet Our Team", { matchCase: false }).scrollIntoView();
    cy.wait(1000);
    cy.contains("Meet Our Team", { matchCase: false }).should("be.visible");
    cy.contains("The passionate minds behind Ishuko").should("be.visible");
    cy.contains("Meet Our Team", { matchCase: false })
      .parents("section")
      .find("img")
      .should("have.length.at.least", 4);
  });

  it("TC-029: should have transition on cards", () => {
    ["Our Mission", "Our Impact"].forEach((heading) => {
      cy.contains(heading, { matchCase: false })
        .parents('[class*="card"], div')
        .first()
        .then(($card) => {
          const prop = $card.css("transition-property");
          const duration = $card.css("transition-duration");
          expect(prop === "all" || prop.includes("transform")).to.be.true;
          expect(duration).to.not.equal("0s");
        });
    });
  });
});
