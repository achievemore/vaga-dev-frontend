import { inject } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd/notification";

const notificationCreate = (status: "success" | "error", message: string) => {
  const notification = inject(NzNotificationService);

  notification.create(
    status,
    status === "success" ? "Sucesso" : "Erro",
    message,
    { nzPlacement: "top" }
  );
};

export { notificationCreate };
