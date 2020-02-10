describe("Student page navigation", () => {
    const studentLogin = "testowy uczeń";
    const studentPassword = "uczen";

    it('should redirect to subscriptions page', () => {
        cy.visit('/');
        cy.get('input[name="name"]').type(studentLogin).should('have.value', studentLogin);
        cy.get('input[name="password"]').type(studentPassword).should('have.value', studentPassword);
        cy.get('input[type="submit"]').click();
        cy.url().should('include', "/mySubscriptions");
    });

    it('should redirect to allSets page after button press', () => {
        cy.get('a').contains("Zapisz się").click();
        cy.url().should('include', "/allSets");
    });

    it('should redirect to mySubscriptions page after button press', () => {
        cy.get('a').contains("Moje zestawy").click();
        cy.url().should('include', "/mySubscriptions");
    });
});