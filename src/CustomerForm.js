import React from "react";

export const CustomerForm = ({ original }) => (
  <form>
    <label htmlFor="firstName">First Name</label>
    <input
      id="firstName"
      type="text"
      name="firstName"
      value={original.firstName}
      readOnly
    />
  </form>
);
