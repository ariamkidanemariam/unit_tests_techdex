describe("How It Works Page", () => {
  const baseUrl = "https://tech-dex-informational-website.vercel.app";

  beforeEach(() => {
    cy.visit(baseUrl + "/#howitworks");
    cy.viewport(1280, 720);
    cy.wait(2000);
  });

  it("TC-016: should display How It Works section when navigated", () => {
    cy.url().should("include", "#howitworks");
    cy.contains("h1, h2, h3", "How the Ishuko App works", {
      matchCase: false,
    }).should("be.visible");
  });

  it("TC-017: should display navigation bar with correct links", () => {
    cy.get("header, nav").should("be.visible");
    cy.contains("a", "Home").should("be.visible");
    cy.contains("a", "How it Works").should("be.visible");
    cy.contains("a", "About Us").should("be.visible");
    cy.contains("a", "Contacts").should("be.visible");
  });

  it("TC-018: should display TechDex logo in navigation", () => {
    cy.get('header img, nav img, [class*="logo"], [class*="Logo"]').should(
      "be.visible",
    );
    cy.contains("TechDex").should("be.visible");
  });

  it("TC-019: should navigate to Home from How It Works page", () => {
    cy.contains("a", "Home").click();
    cy.wait(1500);
    cy.window().its("scrollY").should("equal", 0);
  });

  it("TC-020: should navigate to About Us from How It Works page", () => {
    cy.contains("a", "About Us").click();
    cy.wait(1500);
    cy.url().should("include", "#about");
    cy.contains("About Us", { matchCase: false }).should("be.visible");
  });

  it("TC-021: should navigate to Contacts from How It Works page", () => {
    cy.contains("a", "Contacts").click();
    cy.wait(1000);
    cy.url().should("include", "#contacts");
  });

  it("TC-022: should display How It Works header section", () => {
    cy.contains("h1, h2, h3", "How the Ishuko App works").should("be.visible");
    cy.get(
      '[class*="ishukoHeader"], [class*="header"], [class*="title"]',
    ).should("be.visible");
  });

  it("TC-023: should display How It Works description paragraph", () => {
    cy.contains(
      "p",
      "Ishuko is a mobile app powered by YOLOv8 AI scanning",
    ).should("be.visible");
    cy.contains("p", "completely eliminate human subjectivity").should(
      "be.visible",
    );
    cy.contains("p", "fair crop valuation").should("be.visible");
  });

  it("TC-024: should display all 5 step cards", () => {
    cy.get(
      '[class*="ishukoStepCard"], [class*="stepCard"], [class*="card"]',
    ).should("have.length.at.least", 5);
  });

  it("TC-025: should display step 1 - Download Ishuko App card", () => {
    cy.contains("h3, h4", "Download Ishuko App").should("be.visible");
    cy.contains(
      "p",
      "Visit Play Store, search for Ishuko App, then install it on your device.",
    ).should("be.visible");
    cy.contains("01").should("be.visible");
  });

  it("TC-026: should display step 2 - ISHUKO Registration card", () => {
    cy.contains("h3, h4", "ISHUKO Registration").should("be.visible");
    cy.contains(
      "p",
      "Register as a Buyer or Cooperative on the Ishuko app",
    ).should("be.visible");
    cy.contains("02").should("be.visible");
  });

  it("TC-027: should display step 3 - Quality Checking card", () => {
    cy.contains("h3, h4", "Quality Checking").should("be.visible");
    cy.contains("p", "evaluate crop quality and market price").should(
      "be.visible",
    );
    cy.contains("03").should("be.visible");
  });

  it("TC-028: should display step 4 - Post Crops card", () => {
    cy.contains("h3, h4", "Post Crops").should("be.visible");
    cy.contains(
      "p",
      "farmers can post their crops on the app for buyers to view and purchase",
    ).should("be.visible");
    cy.contains("04").should("be.visible");
  });

  it("TC-029: should display step 5 - Buyers Purchase card", () => {
    cy.contains("h3, h4", "Buyers Purchase").should("be.visible");
    cy.contains(
      "p",
      "Buyers can browse posted crops, view quality grades, and place purchase orders",
    ).should("be.visible");
    cy.contains("05").should("be.visible");
  });

  it("TC-030: should display step badges with correct numbers", () => {
    const steps = ["01", "02", "03", "04", "05"];
    steps.forEach((step) => {
      cy.contains('[class*="badge"], [class*="number"], div', step).should(
        "be.visible",
      );
    });
  });

  it("TC-031: should alternate card alignment left and right", () => {
    cy.get('[class*="ishukoStepCard"], [class*="stepCard"]').then(($cards) => {
      const count = $cards.length;
      expect(count).to.be.at.least(5);
      for (let i = 0; i < count; i++) {
        const card = $cards[i];
        const className = card.className || "";
        if (i % 2 === 0) {
          expect(className.toLowerCase()).to.satisfy(
            (c) => c.includes("left") || !c.includes("right"),
          );
        } else {
          expect(className.toLowerCase()).to.satisfy(
            (c) => c.includes("right") || !c.includes("left"),
          );
        }
      }
    });
  });

  it("TC-032: should have white background on step cards", () => {
    cy.get('[class*="ishukoStepCard"], [class*="stepCard"]')
      .first()
      .should("have.css", "background-color", "rgb(255, 255, 255)");
  });

  it("TC-033: should have correct border color on step cards", () => {
    cy.get('[class*="ishukoStepCard"], [class*="stepCard"]')
      .first()
      .should("have.css", "border-color", "rgb(241, 245, 249)");
  });

  it("TC-034: should have box shadow on step cards", () => {
    cy.get('[class*="ishukoStepCard"], [class*="stepCard"]')
      .first()
      .should("have.css", "box-shadow")
      .and("not.equal", "none");
  });

  it("TC-035: should have green background on odd step badges", () => {
    cy.get('[class*="ishukoBadge"], [class*="badge"]')
      .eq(0)
      .should("have.css", "background-color", "rgb(5, 150, 105)");
  });

  it("TC-036: should have dark background on even step badges", () => {
    cy.get('[class*="ishukoBadge"]')
      .not('[class*="BadgeText"]')
      .eq(1)
      .should("have.css", "background-color", "rgb(15, 23, 42)");
  });

  it("TC-037: should have hover transition effect on step card 1", () => {
    cy.get('[class*="ishukoStepCard"]')
      .eq(0)
      .then(($card) => {
        const prop = $card.css("transition-property");
        const duration = $card.css("transition-duration");
        expect(prop === "all" || prop.includes("transform")).to.be.true;
        expect(duration).to.not.equal("0s");
      });
  });

  it("TC-038: should have hover transition effect on step card 2", () => {
    cy.get('[class*="ishukoStepCard"]')
      .eq(1)
      .then(($card) => {
        const prop = $card.css("transition-property");
        const duration = $card.css("transition-duration");
        expect(prop === "all" || prop.includes("transform")).to.be.true;
        expect(duration).to.not.equal("0s");
      });
  });

  it("TC-039: should have hover transition effect on step card 3", () => {
    cy.get('[class*="ishukoStepCard"]')
      .eq(2)
      .then(($card) => {
        const prop = $card.css("transition-property");
        const duration = $card.css("transition-duration");
        expect(prop === "all" || prop.includes("transform")).to.be.true;
        expect(duration).to.not.equal("0s");
      });
  });

  it("TC-040: should have hover transition effect on step card 4", () => {
    cy.get('[class*="ishukoStepCard"]')
      .eq(3)
      .then(($card) => {
        const prop = $card.css("transition-property");
        const duration = $card.css("transition-duration");
        expect(prop === "all" || prop.includes("transform")).to.be.true;
        expect(duration).to.not.equal("0s");
      });
  });

  it("TC-041: should have hover transition effect on step card 5", () => {
    cy.get('[class*="ishukoStepCard"]')
      .eq(4)
      .then(($card) => {
        const prop = $card.css("transition-property");
        const duration = $card.css("transition-duration");
        expect(prop === "all" || prop.includes("transform")).to.be.true;
        expect(duration).to.not.equal("0s");
      });
  });

  it("TC-042: should display card content section", () => {
    cy.get('[class*="ishukoCardContent"], [class*="cardContent"]')
      .first()
      .should("be.visible");
  });

  it("TC-043: should verify all step numbers are visible", () => {
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
