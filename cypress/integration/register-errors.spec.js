describe("Register process errors", () => {
    beforeEach(() => {
        cy.visit('/register');
    });

    it('should display empty fields error', () => {
        cy.get('input[type="submit"]').click();
        cy.get(".alert").contains("Pola nie mogą być puste");
    });

    const login = "test_login";
    const password = "test_password";
    const incorrectPassword = "zle_haslo";
    const incorrectEmail = "email";
    const correctEmail = "email@email.com";

    it('should not allow registration without proper email', () => {
        cy.get('input[name="name"]').type(login).should('have.value', login);
        cy.get('input[name="email"]').type(incorrectEmail).should('have.value', incorrectEmail);
        cy.get('input[name="password"]').type(password).should('have.value', password);
        cy.get('input[name="password2"]').type(password).should('have.value', password);
        cy.get('input[type="submit"]').click();
        cy.url().should('include', "/register");
    });

    it('should display mismatched password alert', () => {
        cy.get('input[name="name"]').type(login).should('have.value', login);
        cy.get('input[name="email"]').type(correctEmail).should('have.value', correctEmail);
        cy.get('input[name="password"]').type(password).should('have.value', password);
        cy.get('input[name="password2"]').type(incorrectPassword).should('have.value', incorrectPassword);
        cy.get('input[type="submit"]').click();
        cy.get(".alert").contains("Hasła muszą być identyczne");
    });
});
