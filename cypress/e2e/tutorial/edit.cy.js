describe('/tutorial/edit', () => {
  beforeEach(() => {
    cy.intercept('GET', 'tutorial/1', { fixture: 'tutorial1.json' })

    cy.intercept('GET', 'tutorial/2', { fixture: 'tutorial2.json' })

    cy.intercept('GET', 'tutorial/3', { fixture: 'tutorial3.json' })

    cy.intercept('GET', 'tutorial/5', { fixture: 'tutorial5.json' })

    cy.intercept('GET', 'tutorial/invalid', { statusCode: 404, body: 'a tutorial could not be added' })

    cy.intercept('PUT', 'tutorial/5', { statusCode: 201, body: { rootId: 5 } })

    cy.visit('http://localhost:3000/tutorial/5/edit')
  })

  it('should display an error pop up if the URL id is invalid', () => {
    cy.visit('http://localhost:3000/tutorial/invalid/edit')

    cy.get('.error-popup').should('have.class', 'MuiModal-root')
    cy.get('.error-popup').find('h2').should('have.text', 'There was a problem saving your tutorial.')
  })

  it('should accept input text, create a new section, and embed a section', () => {
    cy.get('.heading-input input').should('have.attr', 'placeholder', 'Type a heading')
      .and('have.value', 'main heading')
    cy.get('.heading-input input').type('{end}+1')
    cy.get('.heading-input input').should('have.value', 'main heading+1')

    cy.get('p').should('have.text', 'main paragraph')
    cy.get('p').type('{end}+1')
    cy.get('p').should('have.text', 'main paragraph+1')

    cy.contains('Create Section').click()
    cy.get('.tutorial .tutorial .heading-input input').as('heading').should('have.attr', 'placeholder', 'Type a heading')
      .and('have.value', '')
    cy.get('@heading').type('new heading')
    cy.get('@heading').should('have.value', 'new heading')

    cy.get('.tutorial .tutorial .mce-content-body').should('have.attr', 'aria-placeholder', 'Write your tutorial')
    cy.get('.tutorial .tutorial p').as('paragraph').should('have.text', '')
    cy.get('@paragraph').type('new paragraph')
    cy.get('@paragraph').should('have.text', 'new paragraph')

    cy.get('p').first().click()
    cy.realPress(['Alt', 'F10']) // get the Embed Section button
    cy.realPress('Tab')
    cy.realPress('Enter')
    cy.realType('1')
    cy.realPress('Enter')
    cy.get('.tutorial .tutorial:first .heading-input input').should('have.value', 'embedded heading')
    cy.get('.tutorial .tutorial:first p').should('have.text', 'embedded paragraph')

    cy.get('.tutorial .delete-section-button').should('have.length', 2)

    cy.get('.delete-section-button').not('.tutorial .delete-section-button').should('have.length', 0)

    cy.get('#save_tutorial_button').should('include.text', 'Save Tutorial')
  })

  it('should be able to nest sections and display a text editing area above and below the section', () => {
    cy.get('p').click()
    cy.contains('Create Section').click()
    cy.get('.tutorial .tutorial p').type('paragraph layer 2')
    cy.realPress(['Alt', 'F10']) // get the nested Create Section button
    cy.realPress('Enter')
    cy.get('.tutorial:first p:first').should('have.text', 'main paragraph')

    cy.get('.tutorial .tutorial').find('.mce-content-body p:first').should('have.text', 'paragraph layer 2')
    cy.get('.tutorial:first p:last').should('have.text', '')
  })

  it('should be able to display multiple embedded sections and nested sections', () => {
    cy.get('p').click()
    cy.realPress(['Alt', 'F10']) // get the Embed Section button
    cy.realPress('Tab')
    cy.realPress('Enter')
    cy.realType('2')
    cy.realPress('Enter')

    cy.get('p').last().click()
    cy.realPress(['Alt', 'F10']) // get the Embed Section button
    cy.realPress('Tab')
    cy.realPress('Enter')
    cy.realType('3')
    cy.realPress('Enter')

    cy.get('.tutorial .tutorial:first').as('firstSection').find('.heading-input input').should('have.value', 'embedded heading 2')
    cy.get('@firstSection').find('p').should('have.text', 'embedded paragraph 2')
    cy.get('.tutorial .tutorial').eq(1).as('secondSection').find('.heading-input input').first().should('have.value', 'embedded heading 3')
    cy.get('@secondSection').find('p').first().should('have.text', 'embedded paragraph 3')
    cy.get('@secondSection').find('.tutorial').as('thirdSection').find('.heading-input input').should('have.value', 'embedded heading 4')
    cy.get('@thirdSection').find('p').first().should('have.text', 'embedded paragraph 4')
  })

  it('should insert the new section after the line that the cursor is on', () => {
    cy.get('p').type('{end}{enter}b{enter}c{enter}d')
    cy.get('p').contains('b').click()
    cy.contains('Create Section').click()

    cy.get('p').contains('c').click()
    cy.realPress(['Alt', 'F10']) // get the Embed Section button
    cy.realPress('Tab')
    cy.realPress('Enter')
    cy.realType('1')
    cy.realPress('Enter')

    cy.get('.mce-content-body:first').as('first').find('p:first').should('have.text', 'main paragraph')
    cy.get('@first').find('p:first').next().should('have.text', 'b')
    cy.get('@first').nextAll().filter('.tutorial').first().as('second').find('p').should('have.text', '')
    cy.get('@second').nextAll().filter('.mce-content-body').first().as('third').find('p').should('have.text', 'c')
    cy.get('@third').nextAll().filter('.tutorial').first().as('forth').find('p').should('have.text', 'embedded paragraph')
    cy.get('@forth').nextAll().filter('.mce-content-body').first().find('p').should('have.text', 'd')
  })

  it('should be able to delete new and existing sections', () => {
    cy.get('.tutorial .tutorial').should('have.length', 0)
    cy.get('p').click()
    cy.contains('Create Section').click()
    cy.get('.tutorial .tutorial p').type('new section')

    cy.get('p').first().click()
    cy.realPress(['Alt', 'F10']) // get the Embed Section button
    cy.realPress('Tab')
    cy.realPress('Enter')
    cy.realType('1')
    cy.realPress('Enter')

    cy.get('.tutorial .tutorial').should('have.length', 2)
    cy.get('.tutorial .tutorial:first').find('p').should('have.text', 'embedded paragraph')
    cy.get('.tutorial .tutorial:last').find('p').should('have.text', 'new section')
    cy.get('button.delete-section-button:first').click()
    cy.get('.tutorial .tutorial').should('have.length', 1)
    cy.get('.tutorial .tutorial:first').find('p').should('have.text', 'new section')
    cy.get('button.delete-section-button').click()
    cy.get('.tutorial .tutorial').should('have.length', 0)
  })

  it('should display a pop up error message on embedding when an id is invalid', () => {
    cy.get('p').click()
    cy.realPress(['Alt', 'F10']) // get the Embed Section button
    cy.realPress('Tab')
    cy.realPress('Enter')
    cy.realType('invalid')
    cy.realPress('Enter')

    cy.get('.error-popup').should('have.class', 'MuiModal-root')
    cy.get('.error-popup').find('h2').should('have.text', 'There was a problem saving your tutorial.')

    cy.get('body').click(0, 0)
    cy.get('.error-popup').should('have.length', 0)
    cy.get('.mce-content-body').should('have.length', 1)
  })

  it('should hide accordion details when the tutorial border is clicked', () => {
    cy.get('.MuiAccordionDetails-root').should('not.have.css', 'visibility', 'hidden')
    cy.get('.heading-input input').should('have.css', 'font-size', '32px')

    cy.get('.tutorial-border').click()
    cy.get('.MuiAccordionDetails-root').should('have.css', 'visibility', 'hidden')
    cy.get('.heading-input input').should('have.css', 'font-size', '24px')

    cy.get('.tutorial-border').click()
    cy.get('.MuiAccordionDetails-root').should('not.have.css', 'visibility', 'hidden')
    cy.get('.heading-input input').should('have.css', 'font-size', '32px')
  })

  it('should redirect to a tutorial page upon saving', () => {
    cy.get('#save_tutorial_button').click()
    cy.url().should('eq', 'http://localhost:3000/tutorial/5');
  })

  it('should be able to display saved nested sections from the url id', () => {
    cy.visit('http://localhost:3000/tutorial/3/edit')

    cy.get('.tutorial:first p:first').should('have.text', 'embedded paragraph 3')
    cy.get('.tutorial:first .tutorial p').should('have.text', 'embedded paragraph 4')
  })
})
