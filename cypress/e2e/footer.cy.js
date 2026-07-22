describe('Footer Section', () => {
  const baseUrl = 'https://tech-dex-informational-website.vercel.app';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.viewport(1280, 720);
    cy.wait(2000);
    cy.scrollTo('bottom');
    cy.wait(1000);
  });
  it("TC-051: should have clickable footer link on Contacts page", () => {
 

  cy.get('footer, [class*="footer"]').as('footer');
  cy.get('@footer')
    .find('a')
    .should('be.visible')
    .and('have.attr', 'href')
    .and('not.be.empty');

  });


  it('TC-052: should have email as clickable link', () => {
    cy.get('footer, [class*="footer"]')
      .contains('a[href*="mailto"], a', 'techdex87@gmail.com', { matchCase: false })
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', 'mailto');
  });

  

 
});