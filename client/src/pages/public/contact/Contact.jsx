import React from "react";
import "./contact.scss";
import "@components/form/form.scss";
import { useDispatch } from "react-redux";
import Redirect from "@components/Redirect.jsx";
import Input from "@src/components/input/Input.jsx";
import { Gmail, Whatsapp, Messenger } from "@assets/icons/SocialIcons.jsx";
import { Info, Send, Subject } from "@assets/icons/ButtonIcons.jsx";
import Button from "@src/components/button/Button.jsx";
import { createMessage } from "@src/app/services/messageSlice.js";

function Contact() {
  const dispatch = useDispatch();
  const INPUTS = [
    {
      label: "Name",
      type: "text",
      name: "name",
      icon: <Info />,
      errorMessage: "Invalid username",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      icon: <Gmail />,
      required: true,
      errorMessage: "Invalid email format",
    },
    {
      label: "Subject",
      type: "text",
      name: "subject",
      icon: <Subject />,
      errorMessage: "Invalid subject format",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = new FormData(event.target);
    dispatch(createMessage(message));
    event.target.reset();
  };

  return (
    <main id="contact">
      <section className="contactLinks">
        <h1>Get in Touch ^_^</h1>

        <Redirect
          icon={<Gmail />}
          link="mailto:vishalkarasi12902@gmail.com"
          label="Gmail.com"
        />

        <Redirect
          icon={<Whatsapp />}
          link="https://wa.me/qr/2PAS2MUX2DRUK1"
          label="Whatsapp.com"
        />

        <Redirect
          icon={<Messenger />}
          link="vishalbskarasi@gmail.com"
          label="Messenger.com"
        />

        <h2>Hey there Visitor!, Hope you liked what you saw.</h2>
      </section>

      <div className="orContainer">
        <div className="line"></div>
        <div className="or">or</div>
      </div>

      <section>
        <div className="formContainer">
          <h1>Fill the form</h1>
          <form
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="form"
          >
            {INPUTS.map((input) => (
              <Input key={input.label} {...input} />
            ))}
            <div className="inputField">
              <textarea
                rows="4"
                className="input"
                name="message"
                required
              ></textarea>
              <label className="inputLabel">Message</label>
            </div>
            <Button
              type="submit"
              label="Submit"
              icon={<Send />}
              className="btnPrimary"
            />
          </form>
        </div>
      </section>
    </main>
  );
}

export default Contact;
