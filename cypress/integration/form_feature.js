describe('Dynamic Form Builder', () => [
    it('should show edit button and other should be selected', () => {
        cy.visit('http://localhost:3000/');
        cy.contains('Edit').click();
        // cy.get(':nth-child(4) > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-4').click();
        cy.get('[value="other"]').should('be.checked');
        cy.contains('Cancel').click();

    }),
    // it('should show cancel button', () => {
    //     cy.contains('Edit').click();
    //     cy.contains('Cancel')
    // }),
    // it('should show edit mode after cancel is hit', () => {
    //     cy.contains('Cancel').click();
    //     cy.contains('Edit')
    // }),
    // it('should enter Form Details submit', () => {
    //     cy.contains('Edit').click();
    //     cy.get('.MuiTextField-root.pr-2 > .MuiInputBase-root > .MuiInputBase-input').click().type('Melissa');
    //     cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').click().type('Langhausen');
    //     cy.get('.nested-input input').click().type('Example Message');
    //     cy.get(':nth-child(2) > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-4').click();
    //     cy.get('.MuiSelect-root').click();
    //     cy.get('[data-value="us"]').click();
    //     cy.get('[rows="1"]').click().type('This is an example note.');
    //     cy.get(':nth-child(7) > .MuiFormGroup-root > .MuiFormControlLabel-root > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-4').click();
    //     cy.contains('Submit').click();
    //     cy.contains('Cancel').click();
    // }),
    // it('should enter Form Details cancel', () => {
    //     cy.contains('Edit').click();
    //     cy.get('.MuiTextField-root.pr-2 > .MuiInputBase-root > .MuiInputBase-input').click().type('Melissa');
    //     cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').click().type('Langhausen');
    //     cy.get('.nested-input input').click().type('Example Message');
    //     cy.get(':nth-child(2) > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-4').click();
    //     cy.get('.MuiSelect-root').click();
    //     cy.get('[data-value="us"]').click();
    //     cy.get('[rows="1"]').click().type('This is an example note.');
    //     cy.get(':nth-child(7) > .MuiFormGroup-root > .MuiFormControlLabel-root > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-4').click();
    //     cy.contains('Cancel').click();
    // })
])