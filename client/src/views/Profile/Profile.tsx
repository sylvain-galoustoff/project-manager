import { Button, Input } from "melogems";
import styles from "./Profile.module.css";
import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";

function AddProject() {
  const [displayName, setDisplayName] = useState<string>("");

  const submitDisplayName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

export default AddProject;
