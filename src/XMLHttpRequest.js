// Функция получения данных
function getData(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка получения данных: ${response.status}`);
    }

    return response.json();
  });
}

// Функция отправки данных через XMLHttpRequest
function sendData(url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Настройка запроса
    xhr.open("POST", url);

    // Заголовок JSON
    xhr.setRequestHeader("Content-Type", "application/json");

    // Успешное завершение запроса
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);

        console.log("Данные успешно отправлены:", response);

        resolve(response);
      } else {
        reject(`Ошибка отправки данных: ${xhr.status}`);
      }
    };

    // Ошибка сети
    xhr.onerror = function () {
      reject("Ошибка сети");
    };

    // Отправка данных
    xhr.send(JSON.stringify(data));
  });
}

// Выполнение после загрузки страницы
window.addEventListener("DOMContentLoaded", async () => {
  try {
    // Получение данных из db.json
    const data = await getData("../db/db.json");

    console.log("Получены данные:", data);

    // Отправка данных
    await sendData("https://jsonplaceholder.typicode.com/posts", data);
  } catch (error) {
    console.error("Общая ошибка:", error);
  }
});
