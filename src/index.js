import React from "react";
import ReactDOM from "react-dom/client";
import { AppointmentsDayView } from "./AppointmentsDayView";
import { sampleAppointments } from "./sampleData";
import { CustomerForm } from "./CustomerForm";
import { blankCustomer } from "./sampleData";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CustomerForm original={blankCustomer} />
);
