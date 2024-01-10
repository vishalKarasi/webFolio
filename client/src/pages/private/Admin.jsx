import React, { useEffect } from "react";
import "./admin.scss";
import "@components/button/button.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage, getMessage } from "@src/app/services/messageSlice.js";
import Button from "@src/components/button/Button.jsx";
import { Cancel } from "@src/assets/icons/ButtonIcons.jsx";
import Model from "@src/components/model/Model.jsx";

function Admin() {
  const dispatch = useDispatch();
  const { MESSAGES } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(getMessage());
  }, [dispatch]);

  return (
    <main id="admin">
      <h1>Messages</h1>
      <div className="messageContainer">
        {MESSAGES.length === 0 ? (
          <Model type="error" messaage="No messages" />
        ) : (
          MESSAGES.map((message) => (
            <article key={message._id} className="message">
              <div>
                <label>Name: </label>
                <p>{message.name}</p>
              </div>
              <div>
                <label>Email: </label>
                <p> {message.email}</p>
              </div>
              <div>
                <label>Subject: </label>
                <p> {message.subject}</p>
              </div>
              <div>
                <label>Message: </label>
                <p> {message.message}</p>
              </div>
              <Button
                icon={<Cancel />}
                className="closeBtn"
                onClick={() => {
                  dispatch(deleteMessage(message._id));
                }}
              />
            </article>
          ))
        )}
      </div>
    </main>
  );
}

export default Admin;
