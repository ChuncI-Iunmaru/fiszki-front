describe("Login process errors", () => {
    const login = "testowy uczeń";
    const incorrectPassword = "zlehaslo";

    beforeEach(() => {
        cy.visit('/');
    });

    it('should redirect to login page', () => {
        cy.url().should('include', "/login");
    });

    it('should display empty field alert', () => {
        cy.get('input[type="submit"]').click();
        cy.get(".alert").contains("Pola nie mogą być puste");
    });

    it('should display invalid credentials alert', () => {
        cy.get('input[name="name"]').type(login).should('have.value', login);
        cy.get('input[name="password"]').type(incorrectPassword).should('have.value', incorrectPassword);
        cy.get('input[type="submit"]').click();
        cy.get(".alert").contains("Błędne dane logowania!");
    });
});