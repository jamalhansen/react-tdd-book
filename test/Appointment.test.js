import React from "react";
import ReactDOM from "react-dom/client";
import { Appointment } from "../src/Appointment";
import { act } from "react";


describe("Appointment", () => {
    it("renders the customer first name", () => {
        const customer = { firstName: "Ashley" }
        const component = (
            <Appointment customer={customer} />
        )
        const container = document.createElement("div");
        document.body.appendChild(container);
        act(() => 
            ReactDOM.createRoot(container).render(component)
        );
        expect(document.body.textContent).toContain("Ashley");
    })
})