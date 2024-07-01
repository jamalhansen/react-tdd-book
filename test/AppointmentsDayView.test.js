import React from "react";
import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";
import {
  initializeReactContainer,
  render,
  click,
  element,
  elements,
  textOf,
  typeOf,
} from "./reactTestExtensions";

window.React = React;
describe("Appointment", () => {
  beforeEach(() => {
    initializeReactContainer();
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

  it("renders the customer first name", () => {
    render(<Appointment customer={ashley} />);

    expect(document.body).toContainText(ashley.firstName);
  });

  it("renders another customer first name", () => {
    render(<Appointment customer={tobias} />);

    expect(document.body).toContainText(tobias.lastName);
  });

  it("renders the customer last name", () => {
    render(<Appointment customer={ashley} />);

    expect(document.body).toContainText(ashley.lastName);
  });

  it("renders the stylist's name", () => {
    render(<Appointment {...appointment} />);

    expect(document.body).toContainText(appointment.stylist);
  });

  it("renders the service", () => {
    render(<Appointment {...appointment} />);

    expect(document.body).toContainText(appointment.service);
  });

  it("renders the notes", () => {
    const customer = { notes: "my notes" };
    render(<Appointment {...appointment} />);

    expect(document.body).toContainText(appointment.notes);
  });

  it("renders the appointment time prominantly", () => {
    render(<Appointment {...appointment} />);
    const header = element("h3");
    expect(header).toContainText("Today's appointment at 15:00");
  });
});

describe("AppointmentsDayView", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  const secondButton = () => elements("button")[1];

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

    expect(element("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders an ol element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(element("ol")).not.toBeNull();
  });

  it("renders an li element for each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(elements("ol > li")).toHaveLength(2);
  });

  it("renders the time of each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(textOf(elements("ol > li"))).toEqual(["12:00", "13:00"]);
  });

  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.body).toContainText(
      "There are no appointments scheduled for today."
    );
  });

  it("selectes the first appointment by default", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(document.body).toContainText("Ashley");
  });

  it("has a button element in each li", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(typeOf(elements("li > *"))).toEqual(["button", "button"]);
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    click(secondButton());
    expect(document.body).toContainText("Jordan");
  });

  it("has toggled class once clicked", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    click(secondButton());
    expect(secondButton().className).toContain("toggled");
  });

  it("does not have a toggled class when not selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(secondButton().className).not.toContain("toggled");
  });
});
