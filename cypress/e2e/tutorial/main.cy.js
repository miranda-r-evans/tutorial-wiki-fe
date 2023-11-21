describe('/tutorial/main', () => {
  beforeEach(() => {
    const baseUrl = 'http://localhost:5050/tutorial/'

    cy.intercept('GET', baseUrl + '3', { fixture: 'tutorial3.json' })

    cy.intercept('GET', baseUrl + 'invalid', { fixture: 'tutorialInvalid.json' })

    cy.intercept('GET', 'http://localhost:5050/tutorial/3', [
      {
        id: 3,
        heading: 'embedded heading 3',
        sections: [
          {
            type: 'text',
            value: '<p>embedded paragraph 3</p>'
          },
          {
            type: 'tutorial',
            id: 4
          },
          {
            type: 'text',
            value: ''
          }
        ],
        is_top_level: null,
        top_parent: null,
        createdAt: '2023-11-07T05:24:23.918Z',
        updatedAt: '2023-11-10T05:39:10.612Z'
      },
      {
        id: 4,
        heading: 'embedded heading 4',
        sections: [
          {
            type: 'text',
            value: '<p>embedded paragraph 4</p>'
          }
        ],
        is_top_level: null,
        top_parent: null,
        createdAt: '2023-11-07T05:24:23.918Z',
        updatedAt: '2023-11-10T05:39:10.612Z'
      }
    ]
    )

    cy.intercept('GET', 'http://localhost:5050/tutorial/invalid', { statusCode: 404, body: 'a tutorial could not be added' }
    )
  })

  it('should display display the word "error" if the URL id is invalid', () => {
    cy.visit('http://localhost:3000/tutorial/invalid')

    cy.contains('error').should('have.length', 1)
  })

  it('should display heading, text, and nested tutorials', () => {
    cy.visit('http://localhost:3000/tutorial/3')

    cy.get('div[class=tutorial] h1:first').should('have.text', 'embedded heading 3')
    cy.get('div[class=tutorial] p:first').should('have.text', 'embedded paragraph 3')

    cy.get('div[class=tutorial] div[class=tutorial] h1').should('have.text', 'embedded heading 4')
    cy.get('div[class=tutorial] div[class=tutorial] p').should('have.text', 'embedded paragraph 4')
  })
})