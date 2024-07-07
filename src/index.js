import React from "react";
import ReactDOM from "react-dom/client";
import { AppointmentsDayView } from "./AppointmentsDayView";
import { sampleAppointments } from "./sampleData";
import { CustomerForm } from "./CustomerForm";
import { AppointmentForm } from "./AppointmentForm";
import { blankCustomer } from "./sampleData";

const blankAppointment = {};
const oneDayInMs = 24 * 60 * 60 * 1000;
const today = new Date();
const tomorrow = new Date(today.getTime() + oneDayInMs);
const availableTimeSlots = [
  { startsAt: today.setHours(9, 0, 0, 0) },
  { startsAt: today.setHours(9, 30, 0, 0) },
  { startsAt: tomorrow.setHours(9, 30, 0, 0) },
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppointmentForm
    orignial={blankAppointment}
    salonOpensAt={9}
    salonClosesAt={11}
    today={today}
    availableTimeSlots={availableTimeSlots}
  />
);
