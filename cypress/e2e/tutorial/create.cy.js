describe('/tutorial/create', () => {
  beforeEach(() => {
    cy.intercept('GET', 'tutorial/1', { fixture: 'tutorial1.json' })

    cy.intercept('GET', 'tutorial/2', { fixture: 'tutorial2.json' })

    cy.intercept('GET', 'tutorial/3', { fixture: 'tutorial3.json' })

    cy.intercept('GET', 'tutorial/invalid', { statusCode: 404, body: 'a tutorial could not be added' })

    cy.visit('http://localhost:3000/tutorial/create')
  })

  it('should accept input text, create a new section, and embed a section', () => {
    cy.get('input[class=heading-input]').should('have.attr', 'placeholder', 'Type a heading')
      .and('have.value', '')
    cy.get('input[class=heading-input]').type('test heading')
    cy.get('input[class=heading-input]').should('have.value', 'test heading')

    cy.get('div[class=mce-content-body]').should('have.attr', 'aria-placeholder', 'Write your tutorial')
    cy.get('p').should('have.text', '')
    cy.get('p').type('test paragraph')
    cy.get('p').should('have.text', 'test paragraph')

    cy.contains('Create Section').click()
    cy.get('div[class=tutorial] div[class=tutorial] input[class=heading-input]').as('heading').should('have.attr', 'placeholder', 'Type a heading')
      .and('have.value', '')
    cy.get('@heading').type('new heading')
    cy.get('@heading').should('have.value', 'new heading')

    cy.get('div[class=tutorial] div[class=tutorial] div[class=mce-content-body]').should('have.attr', 'aria-placeholder', 'Write your tutorial')
    cy.get('div[class=tutorial] div[class=tutorial] p').as('paragraph').should('have.text', '')
    cy.get('@paragraph').type('new paragraph')
    cy.get('@paragraph').should('have.text', 'new paragraph')

    cy.get('p').first().click()
    cy.realPress(['Alt', 'F10']) // get the Embed Section button
    cy.realPress('Tab')
    cy.realPress('Enter')
    cy.realType('1')
    cy.realPress('Enter')
    cy.get('div[class=tutorial] div[class=tutorial]:first input').should('have.value', 'embedded heading')
    cy.get('div[class=tutorial] div[class=tutorial]:first p').should('have.text', 'embedded paragraph')

    cy.get('div[class=tutorial] div[class=tutorial] button[class=delete-section-button]').should('have.length', 2)

    cy.get('div[class=tutorial] button[class=delete-section-button]').not('div[class=tutorial] div[class=tutorial] button[class=delete-section-button]').should('have.length', 0)

    cy.get('button[id=save_tutorial_button]').should('include.text', 'Save Tutorial')
  })

  it('should be able to nest sections and display a text editing area above and below the section', () => {
    cy.get('p').type('paragraph layer 1')
    cy.contains('Create Section').click()
    cy.get('div[class=tutorial] div[class=tutorial] p').type('paragraph layer 2')
    cy.realPress(['Alt', 'F10']) // get the nested Create Section button
    cy.realPress('Enter')
    cy.get('div[class=tutorial]:first p:first').should('have.text', 'paragraph layer 1')

    cy.get('div[class=tutorial] div[class=tutorial] div[class=mce-content-body]').as('firstSection').find('p').should('have.text', 'paragraph layer 2')
    cy.get('@firstSection').next().as('secondSection').should('have.class', 'tutorial')
    cy.get('@secondSection').next().find('p').should('have.text', '')
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

    cy.get('div[class=tutorial] div[class=tutorial]:first').as('firstSection').find('input').should('have.value', 'embedded heading 2')
    cy.get('@firstSection').find('p').should('have.text', 'embedded paragraph 2')
    cy.get('@firstSection').next().next().as('secondSection').find('input').first().should('have.value', 'embedded heading 3')
    cy.get('@secondSection').find('p').first().should('have.text', 'embedded paragraph 3')
    cy.get('@secondSection').find('div[class=tutorial]').as('thirdSection').find('input').should('have.value', 'embedded heading 4')
    cy.get('@thirdSection').find('p').first().should('have.text', 'embedded paragraph 4')
  })

  it('should insert the new section after the line that the cursor is on', () => {
    cy.get('p').type('a{enter}b{enter}c{enter}d')
    cy.get('p').contains('b').click()
    cy.contains('Create Section').click()

    cy.get('p').contains('c').click()
    cy.realPress(['Alt', 'F10']) // get the Embed Section button
    cy.realPress('Tab')
    cy.realPress('Enter')
    cy.realType('1')
    cy.realPress('Enter')

    cy.get('div[class=mce-content-body]:first p:first').should('have.text', 'a')
    cy.get('div[class=mce-content-body]:first p:first').next().should('have.text', 'b')
    cy.get('div[class=mce-content-body]:first').next().should('have.class', 'tutorial')
    cy.get('div[class=mce-content-body]:first').next().find('p').should('have.text', '')
    cy.get('div[class=mce-content-body]:first').next().next().find('p').should('have.text', 'c')
    cy.get('div[class=mce-content-body]:first').next().next().next().should('have.class', 'tutorial')
    cy.get('div[class=mce-content-body]:first').next().next().next().find('p').should('have.text', 'embedded paragraph')
    cy.get('div[class=mce-content-body]:first').next().next().next().next().find('p').should('have.text', 'd')
  })

  it('should be able to delete new and existing sections', () => {
    cy.get('div[class=tutorial] div[class=tutorial]').should('have.length', 0)
    cy.get('p').click()
    cy.contains('Create Section').click()
    cy.get('div[class=tutorial] div[class=tutorial] p').type('new section')

    cy.get('p').first().click()
    cy.realPress(['Alt', 'F10']) // get the Embed Section button
    cy.realPress('Tab')
    cy.realPress('Enter')
    cy.realType('1')
    cy.realPress('Enter')

    cy.get('div[class=tutorial] div[class=tutorial]').should('have.length', 2)
    cy.get('div[class=tutorial] div[class=tutorial]:first').find('p').should('have.text', 'embedded paragraph')
    cy.get('div[class=tutorial] div[class=tutorial]:last').find('p').should('have.text', 'new section')
    cy.get('button[class=delete-section-button]:first').click()
    cy.get('div[class=tutorial] div[class=tutorial]').should('have.length', 1)
    cy.get('div[class=tutorial] div[class=tutorial]:first').find('p').should('have.text', 'new section')
    cy.get('button[class=delete-section-button]').click()
    cy.get('div[class=tutorial] div[class=tutorial]').should('have.length', 0)
  })

  it('should display display the word "error" on embedding when an id is invalid', () => {
    cy.get('p').click()
    cy.realPress(['Alt', 'F10']) // get the Embed Section button
    cy.realPress('Tab')
    cy.realPress('Enter')
    cy.realType('invalid')
    cy.realPress('Enter')

    cy.contains('error').should('have.length', 1)
  })
})
