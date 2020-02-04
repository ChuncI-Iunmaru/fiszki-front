describe("Teacher login and logout", () => {
    const teacherLogin = "nauczyciel";
    const teacherPassword = "nauczyciel";

    it('should redirect to sets page', () => {
        cy.visit('/');
        cy.get('input[name="name"]').type(teacherLogin).should('have.value', teacherLogin);
        cy.get('input[name="password"]').type(teacherPassword).should('have.value', teacherPassword);
        cy.get('input[type="submit"]').click();
        cy.url().should('include', "/sets");
    });

    it('should redirect to login page after logout', () => {
        cy.get('a').contains("Wyloguj").click();
        cy.url().should('include', "/login");
    });
});