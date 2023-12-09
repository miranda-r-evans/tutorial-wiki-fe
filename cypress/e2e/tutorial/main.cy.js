describe('/tutorial/main', () => {
  beforeEach(() => {
    const baseUrl = 'http://localhost:5050/tutorial/'

    cy.intercept('GET', baseUrl + '3', { fixture: 'tutorial3.json' })

    cy.intercept('GET', baseUrl + 'invalid', { statusCode: 404, body: 'a tutorial could not be added' })

    cy.visit('http://localhost:3000/tutorial/3')
  })

  it('should display an error pop up if the URL id is invalid', () => {
    cy.visit('http://localhost:3000/tutorial/invalid')

    cy.get('.error-popup').should('have.class', 'MuiModal-root')
    cy.get('.error-popup').find('h2').should('have.text', 'There was a problem saving your tutorial.')
  })

  it('should display heading, text, and nested tutorials', () => {
    cy.get('.tutorial h2:first').should('have.text', 'embedded heading 3')
    cy.get('.tutorial p:first').should('have.text', 'embedded paragraph 3')

    cy.get('.tutorial .tutorial h2').should('have.text', 'embedded heading 4')
    cy.get('.tutorial .tutorial p').should('have.text', 'embedded paragraph 4')
  })

  it('should hide accordion details when the tutorial border is clicked', () => {
    cy.get('.MuiAccordionDetails-root').should('not.have.css', 'visibility', 'hidden')
    cy.get('h2:first').should('have.css', 'font-size', '32px')

    cy.get('.tutorial-border:first').click()
    cy.get('.MuiAccordionDetails-root:first').should('have.css', 'visibility', 'hidden')
    cy.get('h2:first').should('have.css', 'font-size', '24px')

    cy.get('.tutorial-border:first').click()
    cy.get('.MuiAccordionDetails-root:first').should('not.have.css', 'visibility', 'hidden')
    cy.get('h2:first').should('have.css', 'font-size', '32px')
  })
})