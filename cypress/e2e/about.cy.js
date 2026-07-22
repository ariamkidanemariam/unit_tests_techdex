describe("About Us Page/Section", () => {
  const baseUrl = "https://tech-dex-informational-website.vercel.app";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.viewport(1280, 720);
    cy.wait(2000);
    cy.contains("a", "About Us", { matchCase: false }).click();
    cy.wait(2000);
  });

  const urlHasAbout = (url) => url.includes("#about") || url.includes("#aboutus");

  it("TC-032 to TC-034: should display About Us section and content", () => {
    cy.url().should("satisfy", urlHasAbout);
    cy.contains("WHAT WE DO", { matchCase: false }).should("be.visible");
    cy.contains("Our Mission", { matchCase: false }).should("be.visible");
    cy.contains("To revolutionize African agricultural trade").should("be.visible");
  });

  it("TC-035 to TC-037: should display What We Do, Impact, and Team sections", () => {
    const sections = [
      { heading: "WHAT WE DO", text: "We are an innovative team dedicated to bridging engineering gaps" },
      { heading: "Our Impact", text: "Ishuko transforms Zambian agriculture" },
      { heading: "Meet Our Team", text: "The passionate minds behind Ishuko" },
    ];

    sections.forEach(({ heading, text }) => {
      cy.contains(heading, { matchCase: false }).scrollIntoView();
      cy.wait(500);
      cy.contains(heading, { matchCase: false }).should("be.visible");
      cy.contains(text).should("be.visible");
    });
  });

  it("TC-038: should have team member cards with images", () => {
    cy.contains("Meet Our Team", { matchCase: false }).scrollIntoView();
    cy.wait(1000);
    cy.contains("Meet Our Team", { matchCase: false })
      .parents("section")
      .find("img")
      .should("have.length.at.least", 4);
  });

  it("TC-039: should scroll to About Us section from homepage", () => {
    cy.visit(baseUrl);
    cy.wait(1500);
    cy.contains("a", "About Us", { matchCase: false }).click();
    cy.wait(2000);
    cy.url().should("satisfy", urlHasAbout);
    cy.contains("WHAT WE DO", { matchCase: false }).should("be.visible");
  });

  it("TC-040 to TC-043: should have correct card styling", () => {
    const cards = ["Our Mission", "Our Impact"];

    cards.forEach((heading) => {
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

    
    cy.contains("Our Mission", { matchCase: false })
      .parents('[class*="card"], div')
      .first()
      .then(($card) => {
        const bg = $card.css("background-color");
        expect(bg.includes("255, 255, 255") || bg.includes("transparent")).to.be.true;
      });

    cy.contains("Our Mission", { matchCase: false })
      .parents('[class*="card"], div')
      .first()
      .should("have.css", "box-shadow")
      .and("not.equal", "none");
  });
});