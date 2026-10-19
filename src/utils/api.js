import axios from "axios";

const BASE_URL = "https://4100.api.green-api.com/waInstance/";

export async function checkApiCredentials(apiInstance, apiToken) {
	
	try {
	  console.log("Проверяем ключи:", { apiInstance, apiToken });
    const url = `${BASE_URL}${apiInstance}/getSettings/${apiToken}`;
	console.log("URL:", url);
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${apiToken}` },
    });

    console.log("Статус ответа:", response.status); 
	console.log('Тело ответа:', response.data); 

    if (response.status !== 200 || !response.data.idInstance) {
      throw new Error("Неверные API-ключи");
    }

    return true;
  } catch (error) {
    console.error("Ошибка проверки:", error);

    let message;
    if (error.response) {
      message = `[${error.response?.status}] ${
        error.response.data.message || "Неизвестная ошибка"
      }`;
    } else {
      message = `Сетевая ошибка: ${error.message}`;
    }

    throw new Error(message);
  }
}
