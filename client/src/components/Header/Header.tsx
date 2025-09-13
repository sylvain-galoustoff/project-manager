import { useLocation, useNavigate } from "react-router";
import styles from "./Header.module.css";
import { IoArrowBack, IoExit } from "react-icons/io5";
import { useEffect, useState, type JSX } from "react";
import { Avatar, Button } from "melogems";
import { useAuth } from "../../context/AuthContext";
import { AnimatePresence, motion } from "motion/react";
import { useToaster } from "../../context/ToasterContext";
import DashboardMenu from "./Menu/Dashboard/DashboardMenu";

interface HeaderProps {
  arrowBack?: boolean;
}

function Header({ arrowBack = true }: HeaderProps) {
  const [pageName, setPageName] = useState<string>("Page name");
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [additionalMenu, setAdditionalMenu] = useState<JSX.Element | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { addToast } = useToaster();

  useEffect(() => {
    switch (location.pathname) {
      case "/home/dashboard":
        setPageName("Tableau de bord");
        setAdditionalMenu(<DashboardMenu />);
        break;

      case "/home/project/add":
        setPageName("Ajouter un projet");
        setAdditionalMenu(undefined);
        break;

      case "/home/profile":
        setPageName("Profile");
        setAdditionalMenu(undefined);
        break;

      default:
        setPageName("");
        setAdditionalMenu(undefined);
        break;
    }
  }, [location.pathname]);

  const disconnect = () => {
    logout();
    addToast({
      variant: "primary",
      message: "Vous êtes déconnecté.",
    });
  };

  return (
    <div className={styles.header}>
      <motion.div layout className={styles.left}>
        <AnimatePresence initial={false}>
          {arrowBack && (
            <motion.div
              key="arrowBack"
              layout
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={styles.arrowBack}
              onClick={() => navigate(-1)}
            >
              <IoArrowBack />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout className={styles.leftContent}>
          <h2 className={styles.appName}>Projects Manager</h2>
          <h3 className={styles.pageName}>{pageName}</h3>
        </motion.div>
      </motion.div>

      <div className={styles.right}>
        {additionalMenu}
        <div
          className={`${styles.userMenu} ${showUserMenu ? styles.open : styles.closed}`}
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          {user !== undefined && (
            <Avatar
              name={user.displayName ? user.displayName : user.name}
              inverted={showUserMenu ? false : true}
            />
          )}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                key="links"
                initial={{ opacity: 0, y: "90%" }}
                animate={{ opacity: 1, y: "100%" }}
                exit={{ opacity: 0, y: "90%" }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className={styles.links}
              >
                <Button label="Déconnexion" iconAfter={<IoExit />} onClick={disconnect} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Header;
