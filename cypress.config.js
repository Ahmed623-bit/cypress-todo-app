const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // تحديد الـ baseUrl
    setupNodeEvents(on, config) {
      // يمكن إضافة الإعدادات الخاصة بك هنا إذا لزم الأمر
    },
  },
});
