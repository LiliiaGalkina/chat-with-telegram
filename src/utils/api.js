import axios from "axios";

const API_DOMAIN = "https://api.green-api.com";

//авторизация

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

//отправка сообщения

export const sendWhatsappMessage = async (
  instanceId,
  token,
  phoneNumber,
  text,
) => {
  // Проверка валидности номера
  if (!/^\d{10,15}$/.test(phoneNumber)) {
    throw new Error("Неверный формат номера");
  }

  try {
    // Форматируем номер как chatId
    const chatId = `${phoneNumber}@c.us`;

    // Делаем запрос к API
    const response = await axios.post(
      `${API_DOMAIN}/waInstance${instanceId}/sendMessage/${token}`,
      { chatId, message: text },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      "Ошибка при отправке:",
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data.errors[0] || "Не удалось отправить сообщение.",
    );
  }
};

//получение сообщения

export const getWhatsappMessages = async (
  instanceId,
  token,
  chatId, // Это номер собеседника + @c.us
) => {
  try {
    const response = await axios.get(
      `${API_DOMAIN}/waInstance${instanceId}/receive/ReceiveChat/${token}`,
      { params: { chatId } },
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении сообщений:", error);
    throw new Error(
      error.response?.data.errors[0] || "Не удалось загрузить историю.",
    );
  }
};

//загрузить историю переписки
export const getChatHistory = async (instanceId, token, chatId) => {
  try {
    const response = await axios.get(
      `${API_DOMAIN}/waInstance${instanceId}/receive/ReceiveChat/${token}`,
      { params: { chatId } },
    );
    return response.data.map((msg) => ({
      sender: msg.chatId === chatId ? "peer" : "me",
      text: msg.messageData.textMessageData?.text ?? "",
      timestamp: Date.parse(msg.timestamp),
    }));
  } catch (error) {
    console.error("Ошибка при получении истории:", error);
    throw new Error(
      error.response?.data.errors[0] || "Не удалось получить сообщения.",
    );
  }
};