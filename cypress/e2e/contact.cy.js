describe("Contacts Page", () => {
  const baseUrl = "https://tech-dex-informational-website.vercel.app";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.viewport(1280, 720);
    cy.wait(2000);
    cy.contains("a", "Contacts", { matchCase: false }).click();
    cy.wait(2000);
  });

  it("TC-055: should display Contacts section when navigated", () => {
    cy.url().should(
      "satisfy",
      (url) => url.includes("#contact") || url.includes("#contacts"),
    );
    cy.contains("Talk to us.", { matchCase: false }).should("be.visible");
  });

  it("TC-056: should display heading text", () => {
    cy.contains("We'd love to", { matchCase: false }).should("be.visible");
    cy.contains("hear from you!", { matchCase: false }).should("be.visible");
  });

  it("TC-057: should display description paragraph", () => {
    cy.contains(
      "Have a question about our services, pricing, or need a custom solution",
    ).should("be.visible");
    cy.contains(
      "Drop us a line and our team will get back to you within 24 hours.",
    ).should("be.visible");
  });

  it("TC-058: should display Expert Consultation feature", () => {
    cy.contains("Expert Consultation", { matchCase: false }).should(
      "be.visible",
    );
    cy.contains(
      "Speak directly with our technical lead to map out your infrastructure needs.",
    ).should("be.visible");
  });

  it("TC-059: should display Transparent Pricing feature", () => {
    cy.contains("Transparent Pricing", { matchCase: false }).should(
      "be.visible",
    );
    cy.contains(
      "Receive clear, itemized quotes with no hidden platform or integration fees.",
    ).should("be.visible");
  });

  it("TC-060: should display 24-Hour Callback feature", () => {
    cy.contains("24-Hour Callback", { matchCase: false }).should("be.visible");
    cy.contains(
      "We value your time. Expect a detailed response or callback request within one business day.",
    ).should("be.visible");
  });

  it("TC-061: should display First Name field", () => {
    cy.contains("FIRST NAME", { matchCase: false }).should("be.visible");
    cy.get(
      'input[placeholder*="first name"], input[name*="first"], input[id*="first"]',
    ).should("be.visible");
  });

  it("TC-062: should display Last Name field", () => {
    cy.contains("LAST NAME", { matchCase: false }).should("be.visible");
    cy.get(
      'input[placeholder*="last name"], input[name*="last"], input[id*="last"]',
    ).should("be.visible");
  });

  it("TC-063: should display Business Email field", () => {
    cy.contains("BUSINESS EMAIL", { matchCase: false }).should("be.visible");
    cy.get(
      'input[placeholder*="email"], input[type="email"], input[name*="email"]',
    ).should("be.visible");
  });

  it("TC-064: should display Phone Number field", () => {
    cy.contains("PHONE NUMBER", { matchCase: false }).should("be.visible");
    cy.get(
      'input[placeholder*="phone"], input[type="tel"], input[name*="phone"]',
    ).should("be.visible");
  });

  it("TC-065: should display Message textarea", () => {
    cy.contains("MESSAGE", { matchCase: false }).should("be.visible");
    cy.get(
      'textarea[placeholder*="project"], textarea[placeholder*="inquiry"], textarea[name*="message"]',
    ).should("be.visible");
  });

  it("TC-066: should display Send Message button", () => {
    cy.contains("button", "Send Message", { matchCase: false }).should(
      "be.visible",
    );
  });

  it("TC-067: should have dark background on Send Message button", () => {
    cy.contains("button", "Send Message", { matchCase: false }).then(($btn) => {
      const bg = $btn.css("background-color");
      const isDark =
        bg.includes("15, 23") ||
        bg.includes("0, 0, 0") ||
        bg.includes("17, 24") ||
        bg.includes("30, 41");
      expect(isDark, `Expected dark button color but got ${bg}`).to.be.true;
    });
  });

  it("TC-068: should have white text on Send Message button", () => {
    cy.contains("button", "Send Message", { matchCase: false }).then(($btn) => {
      const color = $btn.css("color");
      const isWhite =
        color.includes("255, 255, 255") ||
        color.includes("248, 250") ||
        color.includes("241, 245");
      expect(isWhite, `Expected white text but got ${color}`).to.be.true;
    });
  });

  it("TC-069: should have border radius on form fields", () => {
    cy.get(
      'input[type="text"], input[type="email"], input[type="tel"], textarea',
    )
      .first()
      .should("have.css", "border-radius")
      .and("not.equal", "0px");
  });

  it("TC-070: should have border on form fields", () => {
    cy.get(
      'input[type="text"], input[type="email"], input[type="tel"], textarea',
    )
      .first()
      .should("have.css", "border")
      .and("not.equal", "none");
  });
  
  it("TC-072: should change border color from grey to green on focus", () => {
    cy.get(
      'input[type="text"], input[type="email"], input[type="tel"], textarea',
    )
      .first()
      .as("field");

    cy.get("@field").should("have.css", "border-color", "rgb(226, 232, 240)");

    cy.get("@field").type("test");

    cy.get("@field").should("have.css", "border-color", "rgb(5, 150, 105)");
  });

  it("TC-073: should have background color on form section", () => {
    cy.contains("Talk to us.", { matchCase: false })
      .parents("section, div, form")
      .first()
      .then(($section) => {
        const bg = $section.css("background-color");
        expect(bg).to.not.equal("rgba(0, 0, 0, 0)");
        expect(bg).to.not.equal("transparent");
      });
  });

  it("TC-074: should submit form and redirect to thanks page", () => {
    cy.get('input[name*="first"], input[placeholder*="first"]').type("Test");
    cy.get('input[name*="last"], input[placeholder*="last"]').type("User");
    cy.get('input[type="email"]').type("test@example.com");
    cy.get('input[type="tel"]').type("1234567890");
    cy.get("textarea").type("This is a test message");
    cy.get('button[type="submit"], button').contains("Send").click();
    cy.wait(5000);
    cy.origin("https://formspree.io", () => {
      cy.contains("Thanks!", { matchCase: false }).should("be.visible");
    });
  });

  it("TC-075: should navigate back to contact page from thanks page", () => {
    cy.get('input[name*="first"]').type("Test");
    cy.get('input[name*="last"]').type("User");
    cy.get('input[type="email"]').type("test@example.com");
    cy.get('input[type="tel"]').type("1234567890");
    cy.get("textarea").type("Test message");
    cy.get("button").contains("Send").click();
    cy.wait(5000);

    cy.origin("https://formspree.io", () => {
      cy.contains("Go back", { matchCase: false }).click();
    });
    cy.wait(2000);
    cy.url().should("include", "tech-dex");
  });

  it("TC-076: should have transition on form fields", () => {
    cy.get(
      'input[type="text"], input[type="email"], input[type="tel"], textarea',
    )
      .first()
      .then(($field) => {
        const prop = $field.css("transition-property");
        const duration = $field.css("transition-duration");
        expect(
          prop === "all" ||
            prop.includes("border") ||
            prop.includes("box-shadow"),
        ).to.be.true;
        expect(duration).to.not.equal("0s");
      });
  });

  it("TC-077: should have hover effect on Send Message button", () => {
    cy.contains("button", "Send Message", { matchCase: false }).then(($btn) => {
      const prop = $btn.css("transition-property");
      const duration = $btn.css("transition-duration");
      expect(
        prop === "all" ||
          prop.includes("transform") ||
          prop.includes("background"),
      ).to.be.true;
      expect(duration).to.not.equal("0s");
    });
  });

  it("TC-078: should have section background color different from page", () => {
    cy.get("body").then(($body) => {
      const bodyBg = $body.css("background-color") || "rgba(0, 0, 0, 0)";
      cy.get('section, [class*="contact"], form')
        .first()
        .then(($section) => {
          const sectionBg = $section.css("background-color");
          expect(sectionBg).to.not.equal(bodyBg);
        });
    });
  });

  it("TC-079: should have consistent form section styling", () => {
    cy.contains("Talk to us.", { matchCase: false })
      .parents("section, div, form")
      .first()
      .then(($section) => {
        const bg = $section.css("background-color");
        const radius = $section.css("border-radius");
        expect(bg).to.not.equal("rgba(0, 0, 0, 0)");
        expect(bg).to.not.equal("transparent");
        expect(radius).to.not.equal("0px");
      });
  });

  it("TC-080: should scroll to Contacts section from homepage", () => {
    cy.visit(baseUrl);
    cy.wait(1500);
    cy.contains("a", "Contacts", { matchCase: false }).click();
    cy.wait(2000);
    cy.url().should(
      "satisfy",
      (url) => url.includes("#contact") || url.includes("#contacts"),
    );
    cy.contains("Talk to us.", { matchCase: false }).should("be.visible");
  });
});
