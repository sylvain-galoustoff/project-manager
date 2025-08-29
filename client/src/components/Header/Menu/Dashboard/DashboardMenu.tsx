import { Button } from "melogems";
import styles from "./DashboardMenu.module.css";
import { IoBulb } from "react-icons/io5";
import { useNavigate } from "react-router";

function DashboardMenu() {
  const navigate = useNavigate();

  return (
    <div className={styles.dashboardMenu}>
      <Button
        label={"Ajouter un projet"}
        variant="secondary"
        iconBefore={<IoBulb />}
        onClick={() => navigate("/home/project/add")}
      />
    </div>
  );
}

export default DashboardMenu;
