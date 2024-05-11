beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        cy.get('#username').type('johnDoe')
        cy.get('input[name="email"]').type('johnDoe@gmail.com')
        cy.get('input[name="name"]').type('Will')
        cy.get('input[name="lastName"]').type('Smith')
        cy.get('[data-testid="phoneNumberTestId"]').type('58138555')
        cy.get('input[name="password"]').type('YolO125')

        // Type confirmation password which is different from first password
        cy.get('[name="confirm"]').type('Password321')
        cy.get('h2').contains('Password').click()
        
        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that error message is visible
        cy.get('#password_error_message').should('be.visible')

        // Change the test, so the passwords would match
        cy.get('[name="confirm"]').scrollIntoView()
        cy.get('[name="confirm"]').clear()
        cy.get('[name="confirm"]').type('YolO125')
        cy.get('h2').contains('Password').click()

        // Add assertion, that error message is not visible anymore
        cy.get('#password_error_message').should('not.be.visible')

        // Add assertion, that submit button is now enabled
        cy.get('.submit_button').should('be.enabled')
    })
    
    it('User can submit form with all fields added', ()=>{
        cy.get('[data-cy="name"]').type('John')
        cy.get('input[name="lastName"]').type('Doe')
        cy.get('#username').type('johnDoe')
        cy.get('input[name="email"]').type('aurevoir@ipanema.ee')
        cy.get('[data-testid="phoneNumberTestId"]').type('1234567890')
        cy.get("input[name='password']").type('Yolo5646!')
        cy.get('[name="confirm"]').type('Yolo5646!')
    
        // Select radio button for favorite web language
        cy.get('#htmlFavLanguage').check()
    
        // Check checkboxes
        cy.get('#vehicle1').check()
        cy.get('#vehicle2').check()
        cy.get('#vehicle3').check()
    
        // Select from dropdowns
        cy.get('#cars').select('Volvo')
        cy.get('#animal').select('Dog')
    
        // Assert that submit button is enabled
        cy.get('.submit_button').should('not.be.disabled')
    
        // Submit the form
        cy.get('.submit_button').click()
    
        // Assert that successful message is visible
        cy.get('#success_message').should('be.visible').should('contain', 'User successfully submitted registration')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        cy.get('#username').type('johnDoe')
        cy.get('input[name="email"]').type('test@test.ee')
        cy.get('[data-cy="name"]').type('John')
        cy.get('input[name="lastName"]').type('Doe')
        cy.get('[data-testid="phoneNumberTestId"]').type('58138555')
        cy.get("input[name='password']").type('Yolo5646')
        cy.get('[name="confirm"]').type('Yolo5646')

        cy.get('h2').contains('Password').click()
        
        // Assert that submit button is enabled
        cy.get('.submit_button').should('not.be.disabled')
    
        // Submit the form
        cy.get('.submit_button').click()
    
        // Assert that successful message is visible
        cy.get('#success_message').should('be.visible').should('contain', 'User successfully submitted registration')
    })

        // Add at least 1 test for checking some mandatory field's absence
    it('User cannot submit form with mandatory field empty', ()=>{
        
        // Clear username field
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('username').click()

        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')
    })
})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)  
    })

    it('My test for second picture', () => {
        // Create similar test for checking the second picture
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)  
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Check that the link to Registration form 3 is correct
        cy.get('nav').children().eq(1) // this selects the second link
            .should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .and('contain', 'Registration form 3') // checks if the link text is correct
    
        // Verify that the link is clickable and opens the correct URL
        cy.get('nav').children().eq(1).click() // Click the second link
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })


    it('Check that checkbox list is correct', () => {
        // Verify that exactly 3 checkbox inputs are present
        cy.get('input[type="checkbox"]').should('have.length', 3)
    
        // Verify labels of each checkbox
        cy.get('label[for="vehicle1"]').should('contain', 'I have a bike')
        cy.get('label[for="vehicle2"]').should('contain', 'I have a car')
        cy.get('label[for="vehicle3"]').should('contain', 'I have a boat')
    
        // Verify default state of checkboxes (all should be unchecked initially)
        cy.get('#vehicle1').should('not.be.checked')
        cy.get('#vehicle2').should('not.be.checked')
        cy.get('#vehicle3').should('not.be.checked')
    
        // Mark the first checkbox as checked and assert its state
        cy.get('#vehicle1').check().should('be.checked')
    
        // Mark the second checkbox as checked and assert the state of the first and second checkboxes
        cy.get('#vehicle2').check().should('be.checked')
        cy.get('#vehicle1').should('be.checked') // First checkbox should still be checked
    })

    it('Favorite animal dropdown is correct', () => {
        // Verify that the dropdown has exactly 6 options
        cy.get('#animal').children().should('have.length', 6)
    
        // Check that each option in the dropdown has the correct text and value
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog').and('have.value', 'dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat').and('have.value', 'cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake').and('have.value', 'snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo').and('have.value', 'hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow').and('have.value', 'cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse').and('have.value', 'mouse')
    
    })


})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}