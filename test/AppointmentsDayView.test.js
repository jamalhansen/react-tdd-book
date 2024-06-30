import React, { act } from "react";
import ReactDOM from "react-dom/client";
import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";

window.React = React;
describe("Appointment", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const today = new Date();
  const ashley = { firstName: "Ashley", lastName: "Zashley" };
  const tobias = { firstName: "Tobias", lastName: "Turtledove" };
  const appointment = {
    startsAt: today.setHours(15, 0),
    customer: ashley,
    stylist: "Jo",
    service: "Cut",
    notes: "Use the nice smock",
  };

  const render = (component) => {
    act(() => ReactDOM.createRoot(container).render(component));
  };

  it("renders the customer first name", () => {
    render(<Appointment customer={ashley} />);

    expect(document.body.textContent).toContain(ashley.firstName);
  });

  it("renders another customer first name", () => {
    render(<Appointment customer={tobias} />);

    expect(document.body.textContent).toContain(tobias.lastName);
  });

  it("renders the customer last name", () => {
    render(<Appointment customer={ashley} />);

    expect(document.body.textContent).toContain(ashley.lastName);
  });

  it("renders the stylist's name", () => {
    render(<Appointment {...appointment} />);

    expect(document.body.textContent).toContain(appointment.stylist);
  });

  it("renders the service", () => {
    render(<Appointment {...appointment} />);

    expect(document.body.textContent).toContain(appointment.service);
  });

  it("renders the notes", () => {
    const customer = { notes: "my notes" };
    render(<Appointment {...appointment} />);

    expect(document.body.textContent).toContain(appointment.notes);
  });

  it("renders the appointment time prominantly", () => {
    render(<Appointment {...appointment} />);
    const header = document.querySelector("h3");
    expect(header.textContent).toEqual("Today's appointment at 15:00");
  });
});

describe("AppointmentsDayView", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const render = (component) => {
    act(() => ReactDOM.createRoot(container).render(component));
  };

  const today = new Date();
  const twoAppointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: "Ashley" },
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: "Jordan" },
    },
  ];

  it("renders with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(document.querySelector("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders an ol element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);
    const listElement = document.querySelector("ol");
    expect(listElement).not.toBeNull();
  });

  it("renders an li element for each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const listChildren = document.querySelectorAll("ol > li");
    expect(listChildren).toHaveLength(2);
  });

  it("renders the time of each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const listChildren = document.querySelectorAll("ol > li");
    expect(listChildren[0].textContent).toEqual("12:00");
    expect(listChildren[1].textContent).toEqual("13:00");
  });

  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.body.textContent).toContain(
      "There are no appointments scheduled for today."
    );
  });

  it("selectes the first appointment by default", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(document.body.textContent).toContain("Ashley");
  });

  it("has a button element in each li", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const buttons = document.querySelectorAll("li > button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].type).toEqual("button");
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const button = document.querySelectorAll("button")[1];
    act(() => button.click());
    expect(document.body.textContent).toContain("Jordan");
  });
});
