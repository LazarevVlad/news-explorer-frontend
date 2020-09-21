/* eslint-disable no-param-reassign */
export default class Form {
  constructor(form) {
    this.form = form;
    this.button = this.form.querySelector('button');
  }

  checkInputValidity(input) {
    const errorElement = this.form.querySelector(`#error-${input.id}`);

    const words = {
      validationLenght: 'Должно быть от 2 до 30 символов',
      validationEmail: 'Неверный формат email',
      validationMissing: 'Это обязательное поле',
    };

    if (input.validity.valueMissing) {
      errorElement.textContent = words.validationMissing;
      input.parentNode.classList.add('popup__input-container__invalid');
      return false;
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      errorElement.textContent = words.validationLenght;
      input.parentNode.classList.add('popup__input-container__invalid');

      return false;
    }

    if (input.validity.typeMismatch) {
      errorElement.textContent = words.validationEmail;
      input.parentNode.classList.add('popup__input-container__invalid');

      return false;
    }

    input.parentNode.classList.remove('popup__input-container__invalid');
    input.textContent = '';

    return true;
  }

  setSubmitButtonState(state) {
    if (this.form.checkValidity()) {
      this.button.removeAttribute('disabled', state);
      this.button.classList.add('popup__button_abled');
    } else {
      this.button.setAttribute('disabled', state);
      this.button.classList.remove('popup__button_abled');
    }
  }

  serverError(err) {
    console.log(err.message);
    const errorElement = this.form.querySelector('#submit');
    if (err.message === '409') {
      errorElement.textContent = 'Такой email уже зарегистрирован';
      errorElement.classList.add('popup__button_error');
    } else if (err.message === '400') {
      errorElement.textContent = 'Неправильный запрос';
      errorElement.classList.add('popup__button_error');
    } else if (err.message === '401') {
      errorElement.textContent = 'Неправильная почта или пароль';
      errorElement.classList.add('popup__button_error');
    } else {
      errorElement.textContent = 'Ошибка сервера';
      errorElement.classList.add('popup__button_error');
    }
  }

  setEventListeners() {
    this.form.addEventListener('input', () => {
      const inputs = this.form.querySelectorAll('input');
      let isValid = true;
      inputs.forEach((input) => {
        if (!this.checkInputValidity(input)) {
          isValid = false;
        }
        this.setSubmitButtonState(isValid);
      });
    });
  }
}
