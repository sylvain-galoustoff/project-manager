import { Button, Input, Select, DatePicker, Avatar } from "melogems";
import styles from "./AddProject.module.css";
import { IoPerson, IoCheckmark, IoTrash } from "react-icons/io5";
import { useEffect, useState } from "react";
import type { Project, User } from "@meloprojects/shared";
import { fetchData, postData } from "../../helpers/apiCalls";
import { useToaster } from "../../context/ToasterContext";
import { useAuth } from "../../context/AuthContext";
import { parse } from "date-fns";
import { useNavigate } from "react-router";

function AddProject() {
  const [projectName, setProjectName] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);
  const [deadline, setDeadline] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const { addToast } = useToaster();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const submitProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (projectName.length > 0 && user !== undefined) {
      const deadlineObj = parse(deadline, "dd/MM/yyyy", new Date());

      const dataObj: Project = {
        name: projectName,
        ownerId: user?.name,
        deadline: deadlineObj,
        users,
        createdAt: new Date(),
      };
      console.log(dataObj);

      const response = await postData("http://localhost:3000/project/register", dataObj);
      if (response.status === "error") {
        addToast({
          variant: "danger",
          header: "Erreur",
          message: response.message,
        });
      } else if (response.status === "success") {
        addToast({
          variant: "success",
          header: "Nouveau projet",
          message: `Le projet ${projectName} a été créé.`,
        });
        navigate(`/home/project/${projectName}`);
      }
      console.log(response);
    }
  };

  const removeWorker = (name: string) => {
    console.log(name);
    setUsers((prev) => prev.filter((user) => user !== name));
  };

  const renderWorkers = users.map((user) => (
    <div className={styles.workersWrapper} onClick={() => removeWorker(user)}>
      <Avatar key={user} name={user} />
      <div className={styles.removeWorker}>
        <IoTrash />
      </div>
    </div>
  ));

  return (
    <form className={`page  ${styles.addProject}`} onSubmit={submitProject}>
      <div className={styles.form}>
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
          <label htmlFor="deadline">Date d'échéance (facultatif)</label>
          <DatePicker id={"deadline"} callback={(value) => setDeadline(value)} />
        </div>
        <div className={`form-group`}>
          <label htmlFor="projectName">Attribuer des utilisateurs à ce projet</label>
          <Select options={options} iconBefore={<IoPerson />} callback={addUser} />
        </div>
      </div>

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
              {user !== undefined && (
                <div className={styles.owner}>
                  <p className={`help`}>Superviseur :</p>
                  <Avatar name={user.displayName ? user.displayName : user.name} />
                </div>
              )}
              {users.length > 0 ? (
                <div className={styles.workers}>
                  <p className={`help`}>Assigné.e.s au projet :</p>
                  {renderWorkers}
                </div>
              ) : (
                <p className={`help`}>Aucune autre personne n'est assignée au projet</p>
              )}
            </div>
            <div className={styles.cardFooter}>
              <Button type="submit" label="Valider" iconBefore={<IoCheckmark />} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddProject;
