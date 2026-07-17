describe('Footer Section', () => {
  const baseUrl = 'https://tech-dex-informational-website.vercel.app';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.viewport(1280, 720);
    cy.wait(2000);
    cy.scrollTo('bottom');
    cy.wait(1000);
  });

  it('TC-081: should display TechDex logo in footer', () => {
    cy.get('footer, [class*="footer"]')
      .find('img, svg, [class*="logo"], [class*="Logo"]')
      .should('be.visible');
    cy.contains('TechDex').should('be.visible');
  });

  it('TC-082: should display tagline text', () => {
    cy.get('footer, [class*="footer"]')
      .contains('Your solutions provider.', { matchCase: false })
      .should('be.visible');
  });

  it('TC-083: should display CONNECT section heading', () => {
    cy.get('footer, [class*="footer"]')
      .contains('CONNECT', { matchCase: false })
      .should('be.visible');
  });

  it('TC-084: should display Contact link under CONNECT', () => {
    cy.get('footer, [class*="footer"]')
      .contains('a', 'Contact', { matchCase: false })
      .should('be.visible');
  });

  it('TC-086: should display LOCATION section heading', () => {
    cy.get('footer, [class*="footer"]')
      .contains('LOCATION', { matchCase: false })
      .should('be.visible');
  });

  it('TC-087: should display Akirachix address', () => {
    cy.get('footer, [class*="footer"]')
      .contains('Akirachix', { matchCase: false })
      .should('be.visible');
  });

  it('TC-088: should display street address', () => {
    cy.get('footer, [class*="footer"]')
      .contains('616 Korongo road', { matchCase: false })
      .should('be.visible');
  });

  it('TC-089: should display city', () => {
    cy.get('footer, [class*="footer"]')
      .contains('Nairobi', { matchCase: false })
      .should('be.visible');
  });

  it('TC-090: should display email address', () => {
    cy.get('footer, [class*="footer"]')
      .contains('techdex87@gmail.com', { matchCase: false })
      .should('be.visible');
  });

  it('TC-091: should have green color on email link', () => {
    cy.get('footer, [class*="footer"]')
      .contains('techdex87@gmail.com', { matchCase: false })
      .then($email => {
        const color = $email.css('color');
        const isGreen = color.includes('5, 150') || color.includes('52, 211') || color.includes('0, 150') || color.includes('34, 197') || color.includes('22, 163') || color.includes('16, 185');
        expect(isGreen, `Expected green color but got ${color}`).to.be.true;
      });
  });

  it('TC-092: should display copyright text', () => {
    cy.get('footer, [class*="footer"]')
      .contains('2026 TechDex LTD', { matchCase: false })
      .should('be.visible');
    cy.get('footer, [class*="footer"]')
      .contains('All rights reserved', { matchCase: false })
      .should('be.visible');
  });

  it('TC-093: should have dark background on footer', () => {
    cy.get('footer, [class*="footer"]')
      .first()
      .then($footer => {
        const bg = $footer.css('background-color');
        const isDark = bg.includes('15, 23') || bg.includes('11, 19') || bg.includes('0, 0, 0') || bg.includes('17, 24') || bg.includes('30, 41') || bg.includes('2, 6');
        expect(isDark, `Expected dark background but got ${bg}`).to.be.true;
      });
  });

  it('TC-094: should have white text on footer', () => {
    cy.get('footer, [class*="footer"]')
      .first()
      .then($footer => {
        const color = $footer.css('color');
        const isLight = color.includes('255, 255') || color.includes('248, 250') || color.includes('241, 245');
        expect(isLight, `Expected light text but got ${color}`).to.be.true;
      });
  });

  it('TC-095: should have horizontal line separator', () => {
    cy.get('footer, [class*="footer"]')
      .find('hr, [class*="line"], [class*="divider"], [class*="border"]')
      .should('be.visible');
  });

  it('TC-096: should have all footer sections visible', () => {
    cy.get('footer, [class*="footer"]').should('be.visible');
    cy.get('footer, [class*="footer"]')
      .find('div, section')
      .should('have.length.at.least', 3);
  });

  it('TC-097: should have email as clickable link', () => {
    cy.get('footer, [class*="footer"]')
      .contains('a[href*="mailto"], a', 'techdex87@gmail.com', { matchCase: false })
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', 'mailto');
  });

  it('TC-098: should have correct footer layout', () => {
    cy.get('footer, [class*="footer"]')
      .should('have.css', 'display')
      .and('match', /flex|grid|block/);
  });

  it('TC-099: should have padding on footer', () => {
    cy.get('footer, [class*="footer"]')
      .first()
      .should('have.css', 'padding')
      .and('not.equal', '0px');
  });

  it('TC-100: should display footer on all pages', () => {
    const pages = ['/', '/#about', '/#howitworks', '/#contacts'];
    pages.forEach(page => {
      cy.visit(baseUrl + page);
      cy.wait(1500);
      cy.scrollTo('bottom');
      cy.wait(500);
      cy.get('footer, [class*="footer"]')
        .should('be.visible');
      cy.contains('2026 TechDex LTD', { matchCase: false })
        .should('be.visible');
    });
  });
});