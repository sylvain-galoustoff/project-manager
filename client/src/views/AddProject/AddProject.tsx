import { Button, Input, Select, DatePicker } from "melogems";
import styles from "./AddProject.module.css";
import { IoPerson, IoCheckmark } from "react-icons/io5";
import { useEffect, useState } from "react";
import type { User } from "@meloprojects/shared";
import { fetchData } from "../../helpers/apiCalls";
import { useToaster } from "../../context/ToasterContext";

function AddProject() {
  const [options, setOptions] = useState<string[] | undefined>(undefined);
  const { addToast } = useToaster();

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetchData("http://localhost:3000/users");
      if (response.message === "Erreur lors de la récupération des utilisateurs") {
        addToast({
          variant: "danger",
          header: "Erreur",
          message: response.message,
        });
      } else if (response.message === "Liste des utilisateurs récupérée avec succès") {
        const usernames: string[] = [];
        (response.data as User[]).forEach((user) => usernames.push(user.name));
        setOptions(usernames);
      }
    };
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`page  ${styles.addProject}`}>
      <form className={styles.form}>
        <div className={`form-group`}>
          <label htmlFor="projectName">Nom du projet</label>
          <Input
            type={"text"}
            id="projectName"
            iconBefore={<IoPerson />}
            placeholder="Quel truc cool allez vous faire ?"
          />
        </div>
        <div className={`form-group`}>
          <label htmlFor="projectName">Attribuer des utilisateurs à ce projet</label>
          <Select options={["Pierre", "Paule", "Jacques"]} iconBefore={<IoPerson />} />
        </div>
        <div className={`form-group`}>
          <label htmlFor="deadline">Date d'échéance</label>
          <DatePicker id={"deadline"} />
        </div>
        <div className={`button-group`}>
          <Button
            variant="secondary"
            type="submit"
            label="Valider"
            iconBefore={<IoCheckmark />}
          />
        </div>
      </form>
    </div>
  );
}

export default AddProject;
