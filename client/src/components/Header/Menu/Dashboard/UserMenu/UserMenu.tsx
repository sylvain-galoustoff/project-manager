import { motion } from "motion/react";
import styles from "./UserMenu.module.css";
import { IoExit, IoPerson } from "react-icons/io5";
import { useAuth } from "../../../../../context/AuthContext";
import { useToaster } from "../../../../../context/ToasterContext";
import { Link } from "react-router";

function UserMenu() {
  const { logout } = useAuth();
  const { addToast } = useToaster();

  const disconnect = () => {
    logout();
    addToast({
      variant: "primary",
      message: "Vous êtes déconnecté.",
    });
  };

  return (
    <motion.div
      key="links"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={styles.links}
    >
      <span className={styles.link} onClick={disconnect}>
        <IoExit />
        Déconnexion
      </span>
      <Link to="/home/profile" className={styles.link}>
        <IoPerson />
        Profile
      </Link>
    </motion.div>
  );
}

export default UserMenu;
