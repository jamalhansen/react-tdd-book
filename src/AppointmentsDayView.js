import React, { useState } from "react";

const appointmentTimeOfDay = (startsAt) => {
  const [h, m] = new Date(startsAt).toTimeString().split(":");
  return `${h}:${m}`;
};

export const Appointment = ({
  customer,
  stylist,
  service,
  notes,
  startsAt,
}) => {
  return (
    <>
      <h2>{`${appointmentTimeOfDay(startsAt)} Appointment`}</h2>
      <table>
        <thead>
          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Stylist</td>
            <td>Service</td>
            <td>Notes</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{customer.firstName}</td>
            <td>{customer.lastName}</td>
            <td>{stylist}</td>
            <td>{service}</td>
            <td>{notes}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export const AppointmentsDayView = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0);

  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment, i) => (
          <li key={appointment.startsAt}>
            <button type="button" onClick={() => setSelectedAppointment(i)}>
              {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today.</p>
      ) : (
        <Appointment {...appointments[selectedAppointment]} />
      )}
    </div>
  );
};
