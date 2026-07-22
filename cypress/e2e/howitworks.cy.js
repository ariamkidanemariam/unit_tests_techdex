describe("How It Works Page", () => {
  const baseUrl = "https://tech-dex-informational-website.vercel.app";

  beforeEach(() => {
    cy.visit(`${baseUrl}/#howitworks`);
    cy.viewport(1280, 720);
    cy.wait(2000);
  });

  it("TC-014: should display How It Works section when navigated", () => {
    cy.url().should("include", "#howitworks");
    cy.contains("h1, h2, h3", "How the Ishuko App works", { matchCase: false })
      .should("be.visible");
  });

  it("TC-015 to TC-017: should navigate to other sections from How It Works", () => {
    const navTests = [
      { link: "Home", wait: 1500, assertion: () => cy.window().its("scrollY").should("equal", 0) },
      { link: "About Us", wait: 1500, url: "#about", visible: "About Us" },
      { link: "Contacts", wait: 1000, url: "#contacts" },
    ];

    navTests.forEach(({ link, wait, url, visible, assertion }) => {
      cy.contains("a", link).click();
      cy.wait(wait);
      if (url) cy.url().should("include", url);
      if (visible) cy.contains(visible, { matchCase: false }).should("be.visible");
      if (assertion) assertion();
      cy.visit(`${baseUrl}/#howitworks`); // reset for next test
      cy.wait(1000);
    });
  });

  it("TC-018 to TC-019: should display header and description", () => {
    cy.contains("h1, h2, h3", "How the Ishuko App works").should("be.visible");
    cy.get('[class*="ishukoHeader"], [class*="header"], [class*="title"]').should("be.visible");
    
    cy.contains("p", "Ishuko is a mobile app powered by YOLOv8 AI scanning").should("be.visible");
    cy.contains("p", "completely eliminate human subjectivity").should("be.visible");
    cy.contains("p", "fair crop valuation").should("be.visible");
  });

  it("TC-020: should alternate card alignment left and right", () => {
    cy.get('[class*="ishukoStepCard"], [class*="stepCard"]').should("have.length.at.least", 5)
      .each(($card, i) => {
        const className = $card.attr("class")?.toLowerCase() || "";
        const isEven = i % 2 === 0;
        expect(className.includes("left") || !className.includes("right")).to.equal(isEven);
      });
  });

  it("TC-021 to TC-022: should have white background and box shadow on step cards", () => {
    cy.get('[class*="ishukoStepCard"], [class*="stepCard"]').first()
      .should("have.css", "background-color", "rgb(255, 255, 255)")
      .and("have.css", "box-shadow")
      .and("not.equal", "none");
  });

  it("TC-023 to TC-024: should have correct badge colors", () => {
    cy.get('[class*="ishukoBadge"]').not('[class*="BadgeText"]').eq(0)
      .should("have.css", "background-color", "rgb(5, 150, 105)");
    cy.get('[class*="ishukoBadge"]').not('[class*="BadgeText"]').eq(1)
      .should("have.css", "background-color", "rgb(15, 23, 42)");
  });

  it("TC-025 to TC-029: should have hover transition effect on all step cards", () => {
    cy.get('[class*="ishukoStepCard"]').each(($card) => {
      const prop = $card.css("transition-property");
      const duration = $card.css("transition-duration");
      expect(prop === "all" || prop.includes("transform")).to.be.true;
      expect(duration).to.not.equal("0s");
    });
  });

  it("TC-030 to TC-031: should display card content and verify step numbers", () => {
    cy.get('[class*="ishukoCardContent"], [class*="cardContent"]').first().should("be.visible");
    
    cy.get('[class*="ishukoBadge"], [class*="badge"]').should("have.length.at.least", 5)
      .then(($badges) => {
        const numbers = [...$badges].map(el => el.textContent.trim());
        ["01", "02", "03", "04", "05"].forEach(n => expect(numbers).to.include(n));
      });
  });
});