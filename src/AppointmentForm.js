import React from "react";

const defaultSelectableServices = [
  "Cut",
  "Blow-dry",
  "Cut & color",
  "Beard trim",
  "Cut & beard trim",
  "Extensions",
];

export const AppointmentForm = ({
  selectableServices = defaultSelectableServices,
  original = {},
} = {}) => (
  <form>
    <select name="service" value={original.service} readOnly>
      <option />
      {selectableServices.map((s) => (
        <option key={s}>{s}</option>
      ))}
    </select>
  </form>
);
