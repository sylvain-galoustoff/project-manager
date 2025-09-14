import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { Button, Input } from "melogems";
import styles from "./Login.module.css";
import { IoPerson, IoShield } from "react-icons/io5";
import { useToaster } from "../../context/ToasterContext";
import { postData } from "../../helpers/apiCalls";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("Sylvain");
  const [password, setPassword] = useState<string>("123456");
  const { authToken, login, setUser } = useAuth();
  const { addToast } = useToaster();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await postData("/users/login", {
      name: username,
      password,
    });

    if (response.message === "Nom ou mot de passe incorrect") {
      addToast({
        variant: "danger",
        header: "Erreur",
        message: `Utilisateur ou mot de passe incorrect.`,
      });
    } else if (response.message === "Utilisateur connecté") {
      setUser(response.data);
      login("fake-token", response.data);
      addToast({
        variant: "primary",
        message: `Bienvenue ${response.data.name} !`,
      });
    } else if (response.message === "Erreur lors de la connexion") {
      addToast({
        variant: "warning",
        header: "Désolé :(",
        message: `Erreur réseau, réessayer plus tard.`,
      });
    }
  };

  useEffect(() => {
    if (authToken) {
      navigate("/home/dashboard");
    }
  }, [authToken, navigate]);

  return (
    <div className={`wrapper ${styles.wrapper}`} id="login">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={`form-group`}>
          <label htmlFor="identifiant">Identifiant</label>
          <Input
            type={"text"}
            iconBefore={<IoPerson />}
            value={username}
            onChange={(value) => setUsername(value)}
          />
        </div>
        <div className={`form-group`}>
          <label htmlFor="password">Mot de passe</label>
          <Input
            type={"password"}
            iconBefore={<IoShield />}
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </div>
        <div className={`form-group button-group`}>
          <Button type="submit" label={"Connexion"} />
        </div>
      </form>
    </div>
  );
};

export default Login;
