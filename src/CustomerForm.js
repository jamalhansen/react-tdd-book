import React, { useState } from "react";

export const CustomerForm = ({ original, onSubmit }) => {
  const [customer, setCustomer] = useState(original);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onSubmit(customer);
  };

  const onChangeCustomer = ({ target }) =>
    setCustomer((customer) => ({ ...customer, [target.name]: target.value }));

  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        type="text"
        name="firstName"
        value={customer.firstName}
        onChange={onChangeCustomer}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        type="text"
        name="lastName"
        value={customer.lastName}
        onChange={onChangeCustomer}
      />
      <label htmlFor="phoneNumber">Phone Number</label>
      <input
        id="phoneNumber"
        type="text"
        name="phoneNumber"
        value={customer.phoneNumber}
        onChange={onChangeCustomer}
      />
      <input type="submit" value="Add" />
    </form>
  );
};
