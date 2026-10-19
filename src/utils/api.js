import axios from "axios";

const API_DOMAIN = "https://api.green-api.com";

export const checkInstanceState = async (id, token) => {
  if (!/^\d+$/.test(id)) {
    return {
      success: false,
      message: "Ошибка: ID должен содержать только цифры.",
    };
  }

  try {
    const response = await axios.get(
      `${API_DOMAIN}/waInstance${id}/getStateInstance/${token}`,
    );

    if (
      response.status === 200 &&
      response.data.stateInstance === "authorized"
    ) {
      return { success: true, message: "" };
    }

    return {
      success: false,
      message: "Ошибка: проверьте корректность введенных ID и токена.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        "Ошибка: сервер недоступен. Проверьте интернет и попробуйте позже.",
    };
  }
};


export const sendWhatsappMessage = async (id, token, phoneNumber, text) => {
    // Проверка на пустые значения, чтобы не слать мусор в API
    if (!id || !token || !phoneNumber || !text) {
        throw new Error("Не хватает данных для отправки сообщения");
    }

    try {
        // Документация Green API: 
        // POST /waInstance{ID}/sendMessage/{token}
        const response = await axios.post(
            `${API_DOMAIN}/waInstance${id}/sendMessage/${token}`,
            {
                // ВАЖНО: Для WhatsApp Green API требует формат с @c.us
                chatId: `${phoneNumber}@c.us`, 
                message: text,
            }
        );

        // Green API возвращает статус 200 и объект с idMessage
        if (response.status === 200) {
            return { 
                success: true, 
                data: response.data 
            };
        }

        throw new Error(`Ошибка API: ${response.statusText}`);

    } catch (error) {
        // Если сервер вернул ошибку (например, неверный формат номера)
        if (error.response) {
            throw new Error(`Ошибка отправки: ${error.response.data.errors || error.response.statusText}`);
        }
        // Если нет интернета
        throw new Error("Сервер недоступен. Проверьте интернет.");
    }
};