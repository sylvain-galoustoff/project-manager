export interface ToastEntity {
  variant: "primary" | "warning" | "danger" | "success";
  header?: string;
  message: string;
}
