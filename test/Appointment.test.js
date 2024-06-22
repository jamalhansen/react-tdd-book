import React, { act } from 'react';
import ReactDOM from "react-dom/client";
import { Appointment } from "../src/Appointment";

window.React = React
describe("Appointment", () => {
    let container; 

    beforeEach(() => {
        container = document.createElement("div");
        document.body.replaceChildren(container);
    })

    const render = component => {
        act(() => 
            ReactDOM.createRoot(container).render(component)
        );
    }

    it("renders the customer first name", () => {
        const customer = { firstName: "Ashley" }
        render(<Appointment customer={customer} />)
        
        expect(document.body.textContent).toContain("Ashley");
    })

    it("renders another customer first name", () => {
        const customer = { firstName: "Jordan" }
        render(<Appointment customer={customer} />)

        expect(document.body.textContent).toContain("Jordan");
    })
})