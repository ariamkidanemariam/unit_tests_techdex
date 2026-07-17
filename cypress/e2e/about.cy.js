describe("About Us Page/Section", () => {
  const baseUrl = "https://tech-dex-informational-website.vercel.app";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.viewport(1280, 720);
    cy.wait(2000);
    cy.contains("a", "About Us", { matchCase: false }).click();
    cy.wait(2000);
  });

  it("TC-044: should display About Us section when navigated", () => {
    cy.url().should(
      "satisfy",
      (url) => url.includes("#about") || url.includes("#aboutus"),
    );
    cy.contains("WHAT WE DO", { matchCase: false }).should("be.visible");
  });

  it("TC-045: should display mission statement", () => {
    cy.contains("Our Mission", { matchCase: false }).should("be.visible");
    cy.contains("To revolutionize African agricultural trade").should(
      "be.visible",
    );
  });

  it("TC-046: should display What We Do section", () => {
    cy.contains("WHAT WE DO", { matchCase: false }).should("be.visible");
    cy.contains(
      "We are an innovative team dedicated to bridging engineering gaps",
    ).should("be.visible");
  });

  it("TC-047: should display Our Impact section", () => {
    cy.contains("Our Impact", { matchCase: false }).should("be.visible");
    cy.contains("Ishuko transforms Zambian agriculture").should("be.visible");
  });

  it("TC-048: should display Meet Our Team section", () => {
    cy.contains("Meet Our Team", { matchCase: false }).scrollIntoView();
    cy.wait(1000);
    cy.contains("Meet Our Team", { matchCase: false }).should("be.visible");
    cy.contains("The passionate minds behind Ishuko").should("be.visible");
  });

  it("TC-049: should have team member cards", () => {
    cy.contains("Meet Our Team", { matchCase: false }).scrollIntoView();
    cy.wait(1000);
    cy.contains("Meet Our Team", { matchCase: false })
      .parents("section")
      .find("img")
      .should("have.length.at.least", 4);
  });

  it("TC-050: should scroll to About Us section from homepage", () => {
    cy.visit(baseUrl);
    cy.wait(1500);
    cy.contains("a", "About Us", { matchCase: false }).click();
    cy.wait(2000);
    cy.url().should(
      "satisfy",
      (url) => url.includes("#about") || url.includes("#aboutus"),
    );
    cy.contains("WHAT WE DO", { matchCase: false }).should("be.visible");
  });

  it("TC-051: should have transition on Mission card", () => {
    cy.contains("Our Mission", { matchCase: false })
      .parents('[class*="card"], div')
      .first()
      .then(($card) => {
        const prop = $card.css("transition-property");
        const duration = $card.css("transition-duration");
        expect(prop === "all" || prop.includes("transform")).to.be.true;
        expect(duration).to.not.equal("0s");
      });
  });

  it("TC-052: should have transition on Impact card", () => {
    cy.contains("Our Impact", { matchCase: false })
      .parents('[class*="card"], div')
      .first()
      .then(($card) => {
        const prop = $card.css("transition-property");
        const duration = $card.css("transition-duration");
        expect(prop === "all" || prop.includes("transform")).to.be.true;
        expect(duration).to.not.equal("0s");
      });
  });

  it("TC-053: should have white background on cards", () => {
    cy.contains("Our Mission", { matchCase: false })
      .parents('[class*="card"], div')
      .first()
      .then(($card) => {
        const bg = $card.css("background-color");
        expect(bg.includes("255, 255, 255") || bg.includes("transparent")).to.be
          .true;
      });
  });

  it("TC-054: should have box shadow on cards", () => {
    cy.contains("Our Mission", { matchCase: false })
      .parents('[class*="card"], div')
      .first()
      .should("have.css", "box-shadow")
      .and("not.equal", "none");
  });
});
