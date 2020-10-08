describe('Dynamic Form Builder', () => [
    it('should show edit button', () => {
        cy.visit('http://localhost:3000/');
        cy.contains('Edit')
    }),
    it('should show cancel button', () => {
        cy.contains('Edit').click();
        cy.contains('Cancel')
    }),
    it('should show edit mode after cancel is hit', () => {
        cy.contains('Cancel').click();
        cy.contains('Edit')
    })
])