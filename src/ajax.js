// Функция получения данных
async function getData(url) {
  try {
    const response = await fetch(url);

    // Проверка успешности запроса
    if (!response.ok) {
      throw new Error(`Ошибка получения данных: ${response.status}`);
    }

    // Преобразуем ответ в JSON
    const data = await response.json();

    console.log("Получены данные:", data);

    return data;
  } catch (error) {
    console.error("Ошибка в getData:", error);
    throw error;
  }
}

// Функция отправки данных
async function sendData(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Проверка успешности отправки
    if (!response.ok) {
      throw new Error(`Ошибка отправки данных: ${response.status}`);
    }

    const result = await response.json();

    console.log("Данные успешно отправлены:", result);

    return result;
  } catch (error) {
    console.error("Ошибка в sendData:", error);
    throw error;
  }
}

// Выполнение при загрузке страницы
window.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1. Получаем данные из db.json
    const data = await getData("../db/db.json");

    // 2. Отправляем полученные данные
    await sendData("https://jsonplaceholder.typicode.com/posts", data);
  } catch (error) {
    console.error("Общая ошибка:", error);
  }
});
