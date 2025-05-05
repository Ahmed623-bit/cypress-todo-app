describe('Todo App', () => {
  const task = 'Task to Delete';

  beforeEach(() => {
    // ما في داعي لكتابة العنوان كامل لأنو موجود في baseUrl
    cy.visit('/');

    // أضف مهمة جديدة
    cy.get('input[placeholder="Add task"]').type(task);
    cy.contains('Add').click();

    // تأكد من ظهور المهمة
    cy.contains(task).should('be.visible');
  });

  it('adds a task', () => {
    cy.contains(task).should('exist');
  });

  it('toggles a task', () => {
    cy.contains(task).click();
    cy.contains(task).should('have.css', 'text-decoration').and('include', 'line-through');

    // إلغاء التحديد
    cy.contains(task).click();
    cy.contains(task).should('have.css', 'text-decoration').and('not.include', 'line-through');
  });

  it('deletes a task', () => {
    cy.contains(task)
      .parents('li')
      .find('button') // هذا الزر هو زر الحذف ❌
      .click();

    cy.contains(task).should('not.exist');
  });
  it('does not add an empty task', () => {
    // تأكد من أن عدد المهام الحالي
    cy.get('li').then($listBefore => {
      const countBefore = $listBefore.length;

      // حاول تضيف مهمة فاضية
      cy.get('input[placeholder="Add task"]').clear();
      cy.contains('Add').click();

      // تأكد أن عدد المهام ما تغير
      cy.get('li').should('have.length', countBefore);
    });
  });

});
