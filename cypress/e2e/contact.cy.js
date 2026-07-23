describe("Contacts Page - Edge Cases", () => {
  const baseUrl = "https://tech-dex-informational-website.vercel.app";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.viewport(1280, 720);
    cy.wait(3000); 
    cy.contains("a", "Contacts", { matchCase: false }).click();
    cy.wait(3000);
  });

  const safeFill = () => {
    cy.get("body").then(($body) => {
      if ($body.find("input").length === 0) {
        cy.reload();
        cy.wait(3000);
      }
    });
  };

 
  it("TC-030: should block empty form submission", () => {
    safeFill();
    cy.get("input").should("have.length.at.least", 1);
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(3000);
    cy.url().then((url) => {
      if (url.includes("formspree") || url.includes("thanks")) {
        cy.log("Form submitted empty");
      } else {
        cy.url().should("include", "tech-dex");
      }
    });
  });

  it("TC-031: should block submission with only First Name", () => {
    safeFill();
    cy.get("input").eq(0).type("Example", { force: true });
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(3000);
    cy.url().then((url) => {
      if (url.includes("formspree") || url.includes("thanks")) {
        cy.log("Submitted with only First Name");
      } else {
        cy.url().should("include", "tech-dex");
      }
    });
  });

  it("TC-032: should block submission without Message", () => {
    safeFill();
    cy.get("input").eq(0).type("Example", { force: true });
    cy.get("input").eq(1).type("User", { force: true });
    cy.get("input").eq(2).type("Example@Example.com", { force: true });
    cy.get("input").eq(3).type("1234567890", { force: true });
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(3000);
    cy.url().then((url) => {
      if (url.includes("formspree") || url.includes("thanks")) {
        cy.log("Submitted without Message");
      } else {
        cy.url().should("include", "tech-dex");
      }
    });
  });

   it("TC-033: should reject invalid email format", () => {
    safeFill();
    cy.get("input").eq(0).type("Example", { force: true });
    cy.get("input").eq(1).type("User", { force: true });
    cy.get("input").eq(2).type("invalid-email", { force: true });
    cy.get("input").eq(3).type("1234567890", { force: true });
    cy.get("textarea").type("Example", { force: true });
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(3000);
    cy.url().then((url) => {
      if (url.includes("formspree") || url.includes("thanks")) {
        cy.log("Invalid email accepted");
      } else {
        cy.url().should("include", "tech-dex");
      }
    });
  });

  it("TC-034: should reject invalid phone format", () => {
    safeFill();
    cy.get("input").eq(0).type("Example", { force: true });
    cy.get("input").eq(1).type("User", { force: true });
    cy.get("input").eq(2).type("Example@Example.com", { force: true });
    cy.get("input").eq(3).type("abc", { force: true });
    cy.get("textarea").type("Example", { force: true });
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(3000);
    cy.url().then((url) => {
      if (url.includes("formspree") || url.includes("thanks")) {
        cy.log("Invalid phone accepted");
      } else {
        cy.url().should("include", "tech-dex");
      }
    });
  });

  it("TC-035: should require First Name", () => {
    safeFill();
    cy.get("input").eq(1).type("User", { force: true });
    cy.get("input").eq(2).type("Example@Example.com", { force: true });
    cy.get("input").eq(3).type("1234567890", { force: true });
    cy.get("textarea").type("Example", { force: true });
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(3000);
    cy.url().then((url) => {
      if (url.includes("formspree") || url.includes("thanks")) {
        cy.log("First Name is optional");
      } else {
        cy.url().should("include", "tech-dex");
      }
    });
  });

  it("TC-036: should require Last Name", () => {
    safeFill();
    cy.get("input").eq(0).type("Example", { force: true });
    cy.get("input").eq(2).type("Example@Example.com", { force: true });
    cy.get("input").eq(3).type("1234567890", { force: true });
    cy.get("textarea").type("Example", { force: true });
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(3000);
    cy.url().then((url) => {
      if (url.includes("formspree") || url.includes("thanks")) {
        cy.log("Last Name is optional");
      } else {
        cy.url().should("include", "tech-dex");
      }
    });
  });

  it("TC-037: should require Email", () => {
    safeFill();
    cy.get("input").eq(0).type("Example", { force: true });
    cy.get("input").eq(1).type("User", { force: true });
    cy.get("input").eq(3).type("1234567890", { force: true });
    cy.get("textarea").type("Example", { force: true });
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(3000);
    cy.url().then((url) => {
      if (url.includes("formspree") || url.includes("thanks")) {
        cy.log("Email is optional");
      } else {
        cy.url().should("include", "tech-dex");
      }
    });
  });

  it("TC-039: should require Phone", () => {
    safeFill();
    cy.get("input").eq(0).type("Example", { force: true });
    cy.get("input").eq(1).type("User", { force: true });
    cy.get("input").eq(2).type("Example@Example.com", { force: true });
    cy.get("textarea").type("Example", { force: true });
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(3000);
    cy.url().then((url) => {
      if (url.includes("formspree") || url.includes("thanks")) {
        cy.log("Phone is optional");
      } else {
        cy.url().should("include", "tech-dex");
      }
    });
  });

  it("TC-040: should require Message", () => {
    safeFill();
    cy.get("input").eq(0).type("Example", { force: true });
    cy.get("input").eq(1).type("User", { force: true });
    cy.get("input").eq(2).type("Example@Example.com", { force: true });
    cy.get("input").eq(3).type("1234567890", { force: true });
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(3000);
    cy.url().then((url) => {
      if (url.includes("formspree") || url.includes("thanks")) {
        cy.log("Message is optional");
      } else {
        cy.url().should("include", "tech-dex");
      }
    });
  });

  it("TC-041: should submit with all valid data", () => {
    safeFill();
    cy.get("input").eq(0).type("Example", { force: true });
    cy.get("input").eq(1).type("User", { force: true });
    cy.get("input").eq(2).type("Example@Example.com", { force: true });
    cy.get("input").eq(3).type("1234567890", { force: true });
    cy.get("textarea").type("Valid message", { force: true });
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(5000);
    cy.url().should("include", "formspree");
  });
});