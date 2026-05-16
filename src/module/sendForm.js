const sendForm = ({ formId, someElem = [] }) => {
  const form = document.getElementById(formId);

  const statusBlock = document.createElement("div");

  const loadText = "Загрузка...";
  const errorText = "Ошибка...";
  const successText = "Спасибо! Наш менеджер с вами свяжется";

  // =========================
  // ВАЛИДАЦИЯ
  // =========================

  const validate = (list) => {
    let success = true;

    list.forEach((input) => {
      input.style.border = "";

      if (input.name === "user_name") {
        const value = input.value.trim();

        if (!/^[А-Яа-яЁё\s]+$/.test(value)) {
          success = false;
          input.style.border = "1px solid red";
        }
      }

      if (input.name === "user_phone") {
        const value = input.value.trim();

        if (!/^[0-9+()-\s]+$/.test(value)) {
          success = false;
          input.style.border = "1px solid red";
        }
      }

      if (input.name === "user_message") {
        const value = input.value.trim();

        if (!/^[А-Яа-яЁё0-9\s.,!?:;"'()\-]+$/.test(value)) {
          success = false;
          input.style.border = "1px solid red";
        }
      }
    });

    return success;
  };

  // =========================
  // ОГРАНИЧЕНИЕ ВВОДА
  // =========================

  const checkInput = () => {
    const nameInputs = form.querySelectorAll('[name="user_name"]');

    nameInputs.forEach((input) => {
      input.addEventListener("input", () => {
        input.value = input.value.replace(/[^А-Яа-яЁё\s]/g, "");
      });
    });

    const phoneInputs = form.querySelectorAll('[name="user_phone"]');

    phoneInputs.forEach((input) => {
      input.addEventListener("input", () => {
        input.value = input.value.replace(/[^0-9+()\-\s]/g, "");
      });
    });

    const messageInputs = form.querySelectorAll('[name="user_message"]');

    messageInputs.forEach((input) => {
      input.addEventListener("input", () => {
        input.value = input.value.replace(/[^А-Яа-яЁё0-9\s.,!?:;"'()\-]/g, "");
      });
    });
  };

  checkInput();

  // =========================
  // ОТПРАВКА ДАННЫХ
  // =========================

  const sendData = (data) => {
    return fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),

      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  const submitForm = () => {
    const formElements = form.querySelectorAll("input, textarea");

    const formData = new FormData(form);

    const formBody = {};

    statusBlock.textContent = loadText;

    form.append(statusBlock);

    formData.forEach((val, key) => {
      formBody[key] = val;
    });

    someElem.forEach((elem) => {
      const element = document.getElementById(elem.id);

      if (elem.type === "block") {
        formBody[elem.id] = element.textContent;
      }

      if (elem.type === "input") {
        formBody[elem.id] = element.value;
      }
    });

    if (validate(formElements)) {
      sendData(formBody)
        .then((data) => {
          statusBlock.textContent = successText;

          formElements.forEach((input) => {
            input.value = "";
          });
        })

        .catch((error) => {
          statusBlock.textContent = errorText;
        });
    } else {
      alert("Данные не валидны!");
    }
  };

  try {
    if (!form) {
      throw new Error("Верните форму на место, пожааалуйста))");
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      submitForm();
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default sendForm;
