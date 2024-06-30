import React from "react";
import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";
import {
  initializeReactContainer,
  container,
  render,
  click,
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
    const header = document.querySelector("h3");
    expect(header).toContainText("Today's appointment at 15:00");
  });
});

describe("AppointmentsDayView", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

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
    expect(listChildren[0]).toContainText("12:00");
    expect(listChildren[1]).toContainText("13:00");
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
    const buttons = document.querySelectorAll("li > button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].type).toEqual("button");
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const button = document.querySelectorAll("button")[1];
    click(button);
    expect(document.body).toContainText("Jordan");
  });
});
