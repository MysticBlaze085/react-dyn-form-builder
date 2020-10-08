describe('My First Test', () => {
    it('Should pass!', () => {
        expect(true).to.equal(true);
    })

    it('should direct me to url', () => {
        cy.visit('http://localhost:3000');
    })
})