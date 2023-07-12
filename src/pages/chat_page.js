import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  AddChatMessage,
  GetChatId,
  GetChatMessages,
} from "../api_calls/ChatApi";
import { reactLocalStorage } from "reactjs-localstorage";
import Navbar from "../components/navbar";
import { HubConnectionBuilder } from "@microsoft/signalr";

function ChatPage() {
  let [allMessages, setAllMessages] = useState([]);
  let [receiverName, setReceiverName] = useState();
  let [currentMessage, setCurrentMessage] = useState("");
  let location = useLocation();
  let [basicInfo, setBasicInfo] = useState();
  let [localInfo, setLocalInfo] = useState();
  let [connection, setConnection] = useState();

  let [firstTime, setFirstTime] = useState(true);

  const chatContainerRef = useRef(null);

  let getAllMessages = async (chatId) => {
    let allMessage = await GetChatMessages(chatId);
    setAllMessages(allMessage.data);
  };

  let getChatId = async (studentId, psychiatristId) => {
    let dbResponse = await GetChatId(studentId, psychiatristId);
    if (dbResponse.data !== null) {
      getAllMessages(dbResponse.data.myChatId);
    }
  };

  let handleInput = (e) => {
    setCurrentMessage(e.target.value);
  };

  let handleSend = async () => {
    if (currentMessage.length > 0) {
      let obj = {
        studentId: basicInfo.studentId,
        psychiatristId: basicInfo.psychiatristId,
        message: currentMessage,
        SenderRole: localInfo.role,
      };
      await AddChatMessage(obj);

      let newMessageSet = [
        ...allMessages,
        {
          senderRole: localInfo.role,
          message: currentMessage,
        },
      ];
      setAllMessages(newMessageSet);

      // Send message through socket
      if (connection) {
        console.log(connection);
        try {
          console.log("sending through socket");
          console.log(basicInfo.receiverId.toString(), currentMessage);
          await connection.send(
            "SendMessage",
            basicInfo.receiverId.toString(),
            currentMessage
          );
        } catch (e) {
          console.log(e);
        }
      } else {
        alert("No connection to server yet.");
      }

      setCurrentMessage(" ");
    }
  };

  let handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [allMessages]);

  useEffect(() => {
    setCurrentMessage("");
  }, [allMessages]);

  useEffect(() => {
    console.log(location.state);
    let { studentId, psychiatristId, receiverName } = location.state;

    let localInfo = reactLocalStorage.getObject("userInfo");
    setLocalInfo(localInfo);
    setBasicInfo(location.state);
    setReceiverName(receiverName);

    if (location.state?.chatId) {
      console.log("chat id found, fetch message directly");
      getAllMessages(location.state.chatId);
    } else {
      console.log("no chat id from state, so go and fetch chatid from the db");
      getChatId(studentId, psychiatristId);
    }


    let new_connection = new HubConnectionBuilder()
      .withUrl(
        `https://virtuhealappservice.azurewebsites.net/singleChatHub?userId=${localInfo.userId.toString()}`
      )
      .withAutomaticReconnect()
      .build();
    setConnection(new_connection);

    console.log(new_connection);
    //   setLoading(false);
  }, []);


  useEffect(() => {
    if (connection && firstTime) {
      console.log(firstTime);
      connection
        .start()
        .then(() => {
          console.log("Connected");
        })
        .catch((error) => {
          console.log("props.connection error:", error);
        });
      setFirstTime(false);
    } else {
    }

    const handleMessageReceived = (message, user) => {
      console.log("receiving");
      console.log("Message Received: ", user, message);

      let role =
        user == localInfo.userId == localInfo.role
          ? "student"
          : "psychiatrist";

      console.log(role);
      setAllMessages((oldMessages) => [
        ...oldMessages,
        {
          message: message,
          senderRole: role,
          timestamp: Date.now(),
        },
      ]);
    };
    console.log(connection);
    if (connection) {
      connection.on("ReceiveMessage", handleMessageReceived);

      return () => {
        connection.off("ReceiveMessage", handleMessageReceived);
      };
    }
  }, [connection]);

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className=" m-auto flex flex-col justify-between bg-gray-200 h-[88%] border-gray-50 p-4 container">
        <h2 className="p-6 border-b-2 text-white chatgradient rounded-lg">
          {receiverName}
        </h2>
        <div
          className="mr-6 ml-6 h-full mb-4  overflow-scroll "
          ref={chatContainerRef}
        >
          {allMessages.length > 0 && (
            <div className="flex flex-col justify-end">
              {allMessages.map((message, index) => {
                const date = new Date(message.timestamp);

                let hour = date.getHours();
                const minute = date.getMinutes();

                const period = hour >= 12 ? "PM" : "AM";
                hour = hour % 12 || 12;

                const timeString = `${hour}:${
                  minute < 10 ? "0" + minute : minute
                } ${period}`;
                return (
                  <div
                    className={`m-2 mr-6  ml-6  ${
                      message.senderRole === localInfo.role
                        ? "self-end"
                        : "self-start"
                    }`}
                    key={index}
                  >
                    <div className="textgradiant text-white w-fit p-2 rounded-lg">
                      {message.message}
                    </div>
                    <div className="text-xs float-right">{timeString}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex mr-6 ml-6">
          <input
            className="mt-1 px-6 py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-full"
            label="ChatBox"
            color="secondary"
            name="chatbox"
            placeholder="Type a message"
            type="text"
            value={currentMessage}
            onChange={handleInput}
            onKeyDown={handleEnterKey}
          />
          <button
            className="p-1 w-40 bg-white rounded-lg  text-lg  m-1 mb-0 mr-0 border-0 ml-2 hover:cursor-pointer hover:bg-[#146C94] hover:text-white ease-in-out duration-200"
            onClick={handleSend}
          >
            Send <i class="fa-solid fa-paper-plane ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
