import { useToaster } from "../../context/ToasterContext";
import styles from "./Toaster.module.css";
import { Toast } from "melogems";

function Toaster() {
  const { toaster } = useToaster();

  const renderToast = toaster.map((toast, index) => (
    <Toast
      key={`toast-${index}`}
      variant={toast.variant}
      header={toast.header}
      message={toast.message}
    />
  ));

  return <div className={styles.toaster}>{toaster.length > 0 && renderToast}</div>;
}

export default Toaster;
