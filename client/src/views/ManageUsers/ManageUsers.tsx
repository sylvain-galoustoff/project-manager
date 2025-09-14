import { Input, Button } from "melogems";
import styles from "./ManageUsers.module.css";
import { useState } from "react";
import { postData } from "../../helpers/apiCalls";
import { useToaster } from "../../context/ToasterContext";
import { IoCheckmark } from "react-icons/io5";

function ManageUsers() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const { addToast } = useToaster();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === confirm) {
      const response = await postData("/users/register", {
        name: username,
        password,
      });

      if (response.message === "Un utilisateur avec ce nom existe déjà") {
        addToast({
          variant: "danger",
          header: "Erreur",
          message: "L'utilisateur existe déjà.",
        });
      } else if (response.message === "Utilisateur enregistré avec succès") {
        setConfirm("");
        setPassword("");
        setUsername("");
        addToast({
          variant: "success",
          header: "Enregistrement terminé",
          message: `${username} a été ajouté.`,
        });
      } else if (
        response.message === "Erreur lors de l'enregistrement de l'utilisateur"
      ) {
        addToast({
          variant: "danger",
          header: "Erreur",
          message: "Erreur serveur",
        });
      }
    }
  };

  return (
    <div className={`page ${styles.addUser}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={`form-group`}>
          <label htmlFor="identifiant">Prénom</label>
          <Input
            type={"text"}
            value={username}
            onChange={(value) => setUsername(value)}
          />
        </div>
        <div className={`form-group`}>
          <label htmlFor="password">Mot de passe</label>
          <Input
            type={"password"}
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </div>
        <div className={`form-group`}>
          <label htmlFor="confirm">Confirmez le mot de passe</label>
          <Input
            type={"password"}
            value={confirm}
            onChange={(value) => setConfirm(value)}
          />
        </div>
        <div className={`form-group button-group`}>
          <Button
            type="submit"
            label={"Enregistrer"}
            iconBefore={<IoCheckmark />}
            variant={password.length > 3 && password === confirm ? "primary" : "disabled"}
          />
        </div>
      </form>
    </div>
  );
}

export default ManageUsers;
