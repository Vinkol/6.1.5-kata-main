document.addEventListener('DOMContentLoaded', () => {
    // Класс для валидации формы
    class FormValidator {
      constructor(form) {
        this.form = form;
        this.inputs = this.form.querySelectorAll('.popup__input, .popup__textarea');
        this.errorMessages = {}; // Хранение ошибок
  
        this.init();
      }
  
      // Инициализация
      init() {
        this.inputs.forEach(input => {
          const errorElement = this.createErrorElement(input);
          this.errorMessages[input.classList[1]] = errorElement; // Используем класс как ключ для ошибок
  
          input.addEventListener('input', () => this.validateField(input)); // Валидация при вводе
        });
  
        // Обработчик отправки формы
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      }
  
      // Создание элемента для ошибки
      createErrorElement(input) {
        const errorElement = document.createElement('span');
        errorElement.classList.add('error-message');
        errorElement.classList.add(input.classList[1] + '-error');
        input.insertAdjacentElement('afterend', errorElement);
        return errorElement;
      }
  
      // Проверка валидности поля
      validateField(input) {
        switch (input.classList[1]) {
          case 'valid__name':
            return this.validateName(input);
          case 'valid__phone':
            return this.validatePhone(input);
          case 'valid__email':
            return this.validateEmail(input);
          case 'valid__message':
            return this.validateMessage(input);
          default:
            return true;
        }
      }
  
      // Валидация имени
      validateName(input) {
        const nameRegex = /^[A-Za-zА-Яа-яЁё\s'-]{2,50}$/; // Допустимые символы
        const value = input.value.trim();
  
        if (value === '') {
          this.showError(input, 'Имя не может быть пустым');
          return false;
        }
        if (!nameRegex.test(value)) {
          this.showError(input, 'Имя может содержать только буквы, пробелы, дефисы и быть от 2 до 50 символов');
          return false;
        }
        this.clearError(input);
        return true;
      }
  
      // Валидация телефона
      validatePhone(input) {
        const phoneRegex = /^[+]?[\d\s()-]{7,15}$/;
        if (!phoneRegex.test(input.value)) {
          this.showError(input, 'Введите корректный номер телефона');
          return false;
        }
        this.clearError(input);
        return true;
      }
  
      // Валидация email
      validateEmail(input) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(input.value)) {
          this.showError(input, 'Введите корректный email');
          return false;
        }
        this.clearError(input);
        return true;
      }
  
      // Валидация сообщения
      validateMessage(input) {
        if (input.value.trim() === '') {
          this.showError(input, 'Сообщение не может быть пустым');
          return false;
        }
        this.clearError(input);
        return true;
      }
  
      // Показ ошибки
      showError(input, message) {
        input.classList.add('error');
        this.errorMessages[input.classList[1]].textContent = message;
        this.errorMessages[input.classList[1]].style.display = 'block';
      }
  
      // Удаление ошибки
      clearError(input) {
        input.classList.remove('error');
        this.errorMessages[input.classList[1]].style.display = 'none';
      }
  
      // Обработчик отправки формы
      handleSubmit(e) {
        e.preventDefault(); // Предотвращаем отправку формы, если есть ошибки
  
        let isValid = true;
        this.inputs.forEach(input => {
          if (!this.validateField(input)) {
            isValid = false;
          }
        });
  
        // Если форма валидна, отправляем
        if (isValid) {
          alert('Форма успешно отправлена!');
          this.form.reset(); // Сбрасываем форму после успешной отправки
        }
      }
    }
  
    // Инициализация валидации для всех форм на странице
    const forms = document.querySelectorAll('.valid__form');
    forms.forEach(form => new FormValidator(form));
  });
  
  
  
  
  