import { Button, Input, Select, DatePicker, Avatar } from "melogems";
import styles from "./AddProject.module.css";
import { IoPerson, IoCheckmark } from "react-icons/io5";
import { useEffect, useState } from "react";
import type { User } from "@meloprojects/shared";
import { fetchData } from "../../helpers/apiCalls";
import { useToaster } from "../../context/ToasterContext";
import { useAuth } from "../../context/AuthContext";

function AddProject() {
  const [projectName, setProjectName] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);
  const [deadline, setDeadline] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const { addToast } = useToaster();
  const { user } = useAuth();

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

  const addUser = (value: string) => {
    setUsers((prev) => [...prev, value]);
  };

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
            onChange={(value) => setProjectName(value)}
          />
        </div>
        <div className={`form-group`}>
          <label htmlFor="projectName">Attribuer des utilisateurs à ce projet</label>
          <Select options={options} iconBefore={<IoPerson />} callback={addUser} />
        </div>
        <div className={`form-group`}>
          <label htmlFor="deadline">Date d'échéance (facultatif)</label>
          <DatePicker id={"deadline"} callback={(value) => setDeadline(value)} />
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
      <div className={styles.preview}>
        <div className={`form-group ${styles.previewGroup}`}>
          <p className={`label`}>Votre projet :</p>

          <div className={`card ${styles.previewCard}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.h2}>
                {projectName.length > 0 ? projectName : "Nom du projet"}
              </h2>
              <p className={`help`}>
                A terminer avant : {deadline.length > 0 ? deadline : "non défini"}
              </p>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.h3}>Assignés au projet :</h3>
              <div className={styles.avatars}>
                {user !== undefined && (
                  <div className={styles.owner}>
                    <p className={`help`}>Superviseur :</p>
                    <Avatar name={user.displayName ? user.displayName : user.name} />
                  </div>
                )}
                {users.length > 0 && <Avatar name={"Bernard"} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
