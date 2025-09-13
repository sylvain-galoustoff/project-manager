import { Button, Input } from "melogems";
import styles from "./Profile.module.css";
import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { postData } from "../../helpers/apiCalls";
import { useToaster } from "../../context/ToasterContext";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const [displayName, setDisplayName] = useState<string>("");
  const { addToast } = useToaster();
  const { user, setUser } = useAuth();

  const submitDisplayName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (displayName.length < 3) {
      addToast({
        variant: "danger",
        header: "Vérifiez le formulaire",
        message: "Votre nom affiché doit comporter au moins 3 caractères.",
      });
    } else {
      if (user === undefined) return;

      try {
        const response = await postData("/users/update", {
          name: user.name,
          updates: { displayName },
        });
        console.log(response);

        if (response.status === "success") {
          setUser(response.data);
        }
      } catch (error) {
        console.error(`[Profile] failed to update user profile`, error);
        addToast({
          variant: "danger",
          header: "Erreur",
          message: "Erreur serveur",
        });
      }
    }
  };

  return (
    <div className={`page  ${styles.profile}`}>
      <form className={`${styles.userInfos}`} onSubmit={submitDisplayName}>
        <div className={`form-group`}>
          <label htmlFor="displayname">Nom affiché</label>
          <p className={`help`}>
            Vous pouvez changer la façon dont votre nom s'affiche dans l'application
          </p>
          <Input
            id="displayname"
            type={"text"}
            value={displayName}
            onChange={(value) => setDisplayName(value)}
          />
        </div>
        <div className={`button-group`}>
          <Button label={"Modifier"} type="submit" iconBefore={<IoCheckmark />} />
        </div>
      </form>
    </div>
  );
}

export default Profile;
