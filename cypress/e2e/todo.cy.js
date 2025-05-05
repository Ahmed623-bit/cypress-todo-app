describe('Todo App', () => {
  const task = 'Task to Delete';

  beforeEach(() => {
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
    cy.get('li').then($listBefore => {
      const countBefore = $listBefore.length;

      // حاول تضيف مهمة فاضية
      cy.get('input[placeholder="Add task"]').clear();
      cy.contains('Add').click();

      // تأكد أن عدد المهام ما تغير
      cy.get('li').should('have.length', countBefore);
    });
  });

  // إضافة حالة اختبار جديدة لضمان CI/CD:

  // 1. التأكد من أن الصفحة تعرض المهام بعد التحديث
  // 2. التأكد من أن المهام تُحفظ في التخزين المحلي (مثال: localStorage)

  it('stores tasks in localStorage', () => {
    // تأكد أن المهمة قد تم إضافتها وتخزينها في localStorage
    cy.contains(task).should('exist');

    // حاول الحصول على بيانات التخزين المحلي
    cy.window().then((win) => {
      const tasksInLocalStorage = win.localStorage.getItem('tasks');

      // تأكد من أن البيانات ليست فارغة
      expect(tasksInLocalStorage).to.not.be.null;

      // تحويل البيانات إلى مصفوفة
      const tasks = JSON.parse(tasksInLocalStorage);

      // طباعة المهام للتحقق من الهيكل
      cy.log(JSON.stringify(tasks));  // طباعة المهام في Cypress logs

      // تأكد من أن البيانات المخزنة تحتوي على المهمة بالشكل الصحيح
      expect(tasks).to.be.an('array');

      // تحقق من أن المهمة تتضمن العنوان والحالة (done)
      const taskInLocalStorage = tasks.find(t => t.title === task);
      expect(taskInLocalStorage).to.deep.include({ title: task, done: false });
    });
  });

});
