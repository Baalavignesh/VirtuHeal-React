import RootApi from "./ApiRoute";

async function GetChatId(studentId, psychiatristId) {
  const response = await fetch(
    RootApi +
      `/Chat/GetChatId?studentId=${studentId}&psychiatristId=${psychiatristId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let responseData = await response.json();
  return responseData;
}

async function GetChatMessages(chatId) {
    const response = await fetch(
      RootApi +
        `/Chat/GetChat/${chatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let responseData = await response.json();
    return responseData;
  }

  async function AddChatMessage(chatObj) {
    const response = await fetch(
      RootApi +
        `/Chat/AddChatMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatObj)
      }
    );
    let responseData = await response.json();
    return responseData;
  }

export {GetChatId, GetChatMessages, AddChatMessage};