describe('service is available', () => {
    const burgerIngredients = '[data-test-id=ingredients]'
    const ingredientsTabs = '[data-test-id=ingredients-menu] .tab'
    const dropZone = '[data-test-id=drop-zone]'
    const login = 'test121123@test.ru'
    const password = '123456'

    beforeEach(() => {
        cy.intercept('GET', `https://norma.nomoreparties.space/api/ingredients`, {
          fixture: 'ingredients.json',
        }).as('ingredientsRequest')

        cy.viewport(1600, 1200);
        cy.visit('http://localhost:3000')
      })

      it('should tabs work', () => {
        cy.wait('@ingredientsRequest');
        cy.get(burgerIngredients).should('not.be.empty');
        cy.get(ingredientsTabs, { timeout: 5000 }).eq(2).click()
        cy.get(ingredientsTabs, { timeout: 5000 }).eq(0).click()
        cy.get(ingredientsTabs, { timeout: 5000 }).eq(1).click()
      })

      it('should check ingredients details in modal', () => {
        cy.wait('@ingredientsRequest')
        cy.get(burgerIngredients).should('not.be.empty').first().click()
        cy.get('[data-testid=ingredient-details] ').contains('Детали ингредиента')
        cy.get('[data-testid=close-modal] ').click()
          
      });

      it('should drag and drop', () => {
        cy.wait('@ingredientsRequest')
        cy.get(burgerIngredients).should('not.be.empty')
        cy.get(burgerIngredients).contains('Краторная булка N-200i').first().trigger('dragstart')
        cy.get(dropZone).first().trigger('drop')
        cy.wait(1000)
        cy.get('[data-test-id=topbun-check]').first().should('have.text', 'Краторная булка N-200i1255')
        cy.get('[data-test-id=bottombun-check]').first().should('have.text', 'Краторная булка N-200i1255')
        cy.get(burgerIngredients).contains('Флюоресцентная булка R2-D3').first().trigger('dragstart')
        cy.get(dropZone).first().trigger('drop')
        cy.get('[data-test-id=topbun-check]').first().should('have.text', 'Флюоресцентная булка R2-D3988')
        cy.get('[data-test-id=bottombun-check]').first().should('have.text', 'Флюоресцентная булка R2-D3988')
        cy.get(burgerIngredients).contains('Соус Spicy-X').first().trigger('dragstart')
        cy.get(dropZone).first().trigger('drop')
        cy.wait(1000)
        cy.get('[data-test-id=ingredient-check]').first().should('have.text', 'Соус Spicy-X90')
        cy.get(burgerIngredients).contains('Биокотлета из марсианской Магнолии').first().trigger('dragstart')
        cy.get(dropZone).should('exist').first().trigger('drop')
        
      });

      it('should do order', () => {
        cy.wait('@ingredientsRequest')
        cy.get(burgerIngredients).should('not.be.empty')
        cy.get(burgerIngredients).contains('Краторная булка N-200i').first().trigger('dragstart')
        cy.get(dropZone).first().trigger('drop')
        cy.wait(1000)
        cy.get('[data-testid=order-button]').should('be.not.disabled').click()
        cy.url().should('include', '/login')
        cy.get('[data-testid=login]').type(login)
        cy.get('[data-testid=password]').type(password)
        cy.get('[data-testid=submit]').should('be.not.disabled').click()
        cy.get('[data-testid=order-button]').should('be.not.disabled').click()
        cy.get('[data-test-id=wait-order]').first().should('have.text', 'Ваш заказ начали готовить')
        cy.get('[data-test-id=done-order]', { timeout: 20000 }).first().should('have.text', 'Ваш заказ готов')
        cy.get('[data-testid=close-modal]').click()
    });
    })