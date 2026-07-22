describe("Contacts Page — Required Field Validation", () => {
  const baseUrl = "https://tech-dex-informational-website.vercel.app";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.viewport(1280, 720);
    cy.wait(2000);
    cy.contains("a", "Contacts", { matchCase: false }).click();
    cy.wait(2000);
  });

  const fillAllFields = () => {
    cy.get('input[name*="first"], input[placeholder*="first"]').type("Test");
    cy.get('input[name*="last"], input[placeholder*="last"]').type("User");
    cy.get('input[type="email"]').type("test@example.com");
    cy.get("textarea").type("This is a test message.");
  };
  const assertFormBlocked = (missingField) => {
    cy.url().then((url) => {
      if (url.includes("formspree.io") || url.includes("thanks")) {
        throw new Error(
          `Form submitted with missing ${missingField} — validation failed`
        );
      } else {
        cy.url().should("include", "tech-dex");
        cy.contains("Talk to us.", { matchCase: false }).should("be.visible");
      }
    });
  };

  const assertFormSubmitted = () => {
    cy.wait(5000);
    cy.origin("https://formspree.io", () => {
      cy.contains("Thanks!", { matchCase: false }).should("be.visible");
    });
  };

  it("TC-044: should NOT submit with empty First Name", () => {
    cy.get('input[name*="last"], input[placeholder*="last"]').type("User");
    cy.get('input[type="email"]').type("test@example.com");
    cy.get("textarea").type("This is a test message.");

    cy.get('button[type="submit"], button').contains("Send").click();
    assertFormBlocked("First Name");
  });

  it("TC-045: should NOT submit with empty Last Name", () => {
    cy.get('input[name*="first"], input[placeholder*="first"]').type("Test");
    cy.get('input[type="email"]').type("test@example.com");
    cy.get("textarea").type("This is a test message.");

    cy.get('button[type="submit"], button').contains("Send").click();
    assertFormBlocked("Last Name");
  });

  it("TC-046: should NOT submit with empty Email", () => {
    cy.get('input[name*="first"], input[placeholder*="first"]').type("Test");
    cy.get('input[name*="last"], input[placeholder*="last"]').type("User");
    cy.get("textarea").type("This is a test message.");

    cy.get('button[type="submit"], button').contains("Send").click();
    assertFormBlocked("Email");
  });

  it("TC-047: should NOT submit with empty Message", () => {
    cy.get('input[name*="first"], input[placeholder*="first"]').type("Test");
    cy.get('input[name*="last"], input[placeholder*="last"]').type("User");
    cy.get('input[type="email"]').type("test@example.com");

    cy.get('button[type="submit"], button').contains("Send").click();
    assertFormBlocked("Message");
  });

  it("TC-048: should NOT submit with multiple empty required fields", () => {
    cy.get('input[type="email"]').type("test@example.com");

    cy.get('button[type="submit"], button').contains("Send").click();
    assertFormBlocked("multiple fields");
  });

  it("TC-049: should NOT submit with all fields empty", () => {
    cy.get('button[type="submit"], button').contains("Send").click();
    assertFormBlocked("all fields");
  });

  it("TC-050: should submit successfully when all required fields are filled and redirect to thanks page", () => {
    fillAllFields();
    cy.get('button[type="submit"], button').contains("Send").click();
    assertFormSubmitted();
  });
});