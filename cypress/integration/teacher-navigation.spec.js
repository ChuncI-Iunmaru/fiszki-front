describe("Teacher page navigation", () => {
    const teacherLogin = "nauczyciel";
    const teacherPassword = "nauczyciel";

    it('should redirect to sets page', () => {
        cy.visit('/');
        cy.get('input[name="name"]').type(teacherLogin).should('have.value', teacherLogin);
        cy.get('input[name="password"]').type(teacherPassword).should('have.value', teacherPassword);
        cy.get('input[type="submit"]').click();
        cy.url().should('include', "/sets");
    });

    it('should redirect to flashcards page after button press', () => {
        cy.get('a').contains("Fiszki").click();
        cy.url().should('include', "/myFlashcards");
    });

    it('should redirect to sets page after button press', () => {
        cy.get('a').contains("Zestawy").click();
        cy.url().should('include', "/sets");
    });

    it('should redirect to sets page after button press', () => {
        cy.get('a').contains("Zestawy").click();
        cy.url().should('include', "/sets");
    });

    it('should redirect to edit page after button press', () => {
        cy.get('button').contains("Nowy zestaw").click();
        cy.url().should('include', "/editSet");
    });
});