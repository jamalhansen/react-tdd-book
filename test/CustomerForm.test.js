import React, { act } from "react";
import {
  initializeReactContainer,
  render,
  element,
  form,
  field,
  labelFor,
  click,
  submit,
  submitButton,
  change,
} from "./reactTestExtensions";
import { CustomerForm } from "../src/CustomerForm";

const blankCustomer = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

const itRendersAsTextBox = (fieldName) =>
  it("renders as a text box", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(field(fieldName)).not.toBeNull();
    expect(field(fieldName).tagName).toEqual("INPUT");
    expect(field(fieldName)).toBeInputFieldOfType("text");
  });

const itIncludesTheExistingValue = (fieldName, value) =>
  it("includes the existing value", () => {
    const customer = { [fieldName]: value };
    render(<CustomerForm original={customer} />);
    expect(field(fieldName).value).toEqual(value);
  });

const itRendersALabel = (fieldName, text) => {
  it("renders a label", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(labelFor(fieldName)).not.toBeNull();
  });

  it(`renders ${text} as the label content`, () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(labelFor(fieldName)).toContainText(text);
  });
};

const itAssignsAnIdThatMatchesTheLabelId = (fieldName) =>
  it("assigns an id that matches the label id", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(field(fieldName).id).toEqual(fieldName);
  });

const itSavesExistingValueWhenSubmitting = (fieldName, oldValue) =>
  it("saves existing value when submitted", () => {
    expect.hasAssertions();

    const customer = { [fieldName]: oldValue };
    render(
      <CustomerForm
        original={customer}
        onSubmit={(values) => expect(values[fieldName]).toEqual(oldValue)}
      />
    );
    click(submitButton());
  });

const itSavesNewValueWhenSubmitted = (fieldName, newValue) =>
  it("saves new value when submitted", () => {
    expect.hasAssertions();
    render(
      <CustomerForm
        original={blankCustomer}
        onSubmit={(values) => expect(values[fieldName]).toEqual(newValue)}
      />
    );
    change(field(fieldName), newValue);
    click(submitButton());
  });

describe("CustomerForm", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a form", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(form()).not.toBeNull();
  });

  it("prevents the default action when submitting a form", () => {
    render(<CustomerForm original={blankCustomer} onSubmit={() => {}} />);
    const event = submit(form());
    expect(event.defaultPrevented).toBe(true);
  });

  it("renders a submit button", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(submitButton()).not.toBeNull();
  });

  describe("first name field", () => {
    itRendersAsTextBox("firstName");
    itIncludesTheExistingValue("firstName", "Ashley");
    itRendersALabel("firstName", "First Name");
    itAssignsAnIdThatMatchesTheLabelId("firstName");
    itSavesExistingValueWhenSubmitting("firstName", "Ashley");
    itSavesNewValueWhenSubmitted("firstName", "Jamie");
  });

  describe("last name field", () => {
    itRendersAsTextBox("lastName");
    itIncludesTheExistingValue("lastName", "Ashley");
    itRendersALabel("lastName", "Last Name");
    itAssignsAnIdThatMatchesTheLabelId("lastName");
    itSavesExistingValueWhenSubmitting("lastName", "Jamison");
    itSavesNewValueWhenSubmitted("lastName", "Ashlington");
  });

  describe("phone number field", () => {
    itRendersAsTextBox("phoneNumber");
    itIncludesTheExistingValue("phoneNumber", "(900) 000-0000");
    itRendersALabel("phoneNumber", "Phone Number");
    itAssignsAnIdThatMatchesTheLabelId("phoneNumber");
    itSavesExistingValueWhenSubmitting("phoneNumber", "(800) 000-0000");
    itSavesNewValueWhenSubmitted("phoneNumber", "(900) 000-0000");
  });
});
