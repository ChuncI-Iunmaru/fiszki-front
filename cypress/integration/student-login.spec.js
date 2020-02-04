describe("Student login and logout", () => {
    const studentLogin = "testowy uczeń";
    const studentPassword = "uczen";

    it('should redirect to subscriptions page', () => {
        cy.visit('/');
        cy.get('input[name="name"]').type(studentLogin).should('have.value', studentLogin);
        cy.get('input[name="password"]').type(studentPassword).should('have.value', studentPassword);
        cy.get('input[type="submit"]').click();
        cy.url().should('include', "/mySubscriptions");
    });

    it('should redirect to login page after logout', () => {
        cy.get('a').contains("Wyloguj").click();
        cy.url().should('include', "/login");
    });
});