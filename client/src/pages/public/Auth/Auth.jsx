import React from "react";
import "@components/form/form.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "@components/Input.jsx";
import Button from "@src/components/button/Button.jsx";
import { login } from "@app/services/authSlice.js";
import { Gmail } from "@assets/icons/SocialIcons.jsx";
import { Info, Login, Password } from "@assets/icons/ButtonIcons.jsx";

function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken, status } = useSelector((state) => state.auth);

  const INPUTS = [
    {
      label: "Username",
      type: "text",
      name: "username",
      icon: <Info />,
      pattern: "^[A-Za-z0-9]{4,16}$",
      errorMessage: "Please enter a valid username",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      icon: <Gmail />,
      errorMessage: "Please enter a valid email",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      icon: <Password />,
      pattern:
        "^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$",
      errorMessage: "Please enter a valid password",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const credential = new FormData(event.target);
    dispatch(login(credential)).then(() => {
      if (status === "success") navigate("/admin");
    });
  };

  return (
    <main id="auth" className="flex">
      <div className="formContainer">
        <form
          method="POST"
          encType="multipart/form-data"
          className="form"
          onSubmit={handleSubmit}
        >
          <h1>Admin Login</h1>

          {INPUTS.map((input, index) => (
            <Input key={index} {...input} show="" />
          ))}
          <Button
            type="submit"
            label="Login"
            icon={<Login />}
            className="btnPrimary"
          />
        </form>
      </div>
    </main>
  );
}

export default Auth;
