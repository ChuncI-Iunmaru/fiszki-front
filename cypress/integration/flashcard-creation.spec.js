describe("Flashcard creation process", () => {
        const teacherLogin = "nauczyciel";
        const teacherPassword = "nauczyciel";
        const text = "test";
        const incorrectTag = "abcdefghijklmnoprstquwxyz";

        it('should redirect to sets page', () => {
            cy.visit('/');
            cy.get('input[name="name"]').type(teacherLogin).should('have.value', teacherLogin);
            cy.get('input[name="password"]').type(teacherPassword).should('have.value', teacherPassword);
            cy.get('input[type="submit"]').click();
            cy.url().should('include', "/sets");
            cy.visit('/myFlashcards');
        });

        it('should show empty front/back alert', () => {
            cy.get('input[value="Dodaj"]').click();
            cy.get(".alert").contains(" Front i tył nie mogą być puste");
        });

        it('should show tag too long alert', () => {
            cy.get('input[name="frontText"]').type(text).should('have.value', text);
            cy.get('input[name="backText"]').type(text).should('have.value', text);
            cy.get('input[name="tags"]').type(incorrectTag).should('have.value', incorrectTag);
            cy.get('input[value="Dodaj"]').click();
            cy.get(".alert").contains("Maksymalna długość tagu to 20 znaków");
        });
    }
);