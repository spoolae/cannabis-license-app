import React from "react";
import axios from "axios";

export const Test1 = () => {
  // Задайте константы для email и password
  const email = "john.doe@example.com";
  const password = "securepassword";

  const handleAuthentication = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/authenticate",
        {
          email,
          password,
        }
      );

      // Вывести результат в консоль
      console.log("Authentication Result:", response.data);
    } catch (error) {
      // Обработка ошибок, например, вывод их в консоль
      console.error("Authentication Error:", error.message);
    }
  };

  return (
    <div>
      <h1>Test1</h1>
      {/* Убрать форму и поля ввода, оставить только кнопку */}
      <button type="button" onClick={handleAuthentication}>
        Authenticate
      </button>
    </div>
  );
};
