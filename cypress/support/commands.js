Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(userName,userLastName,userMail,userComment){
    cy.get('#firstName').type(userName, { delay: 0 })
    cy.get('#lastName').type(userLastName, { delay: 0 })
    cy.get('#email').type(userMail, { delay: 0 })
    cy.get('#open-text-area').type(userComment, { delay: 0 })
    cy.contains('button','Enviar').click()
})