import { Button } from "melogems";
import styles from "./NotFound.module.css";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.notFound}>
      <h1>Page non trouvée</h1>
      <Button label="Retour" iconBefore={<IoArrowBack />} onClick={() => navigate(-1)} />
    </div>
  );
}

export default NotFound;
