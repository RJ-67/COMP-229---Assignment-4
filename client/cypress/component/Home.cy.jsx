import React from "react";
import Home from "../../src/pages/Home";
import { MemoryRouter } from "react-router-dom";

describe("Home Component Unit Test", () => {
  it("renders the home page correctly", () => {
    cy.mount(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    cy.contains(/welcome to my portfolio/i).should("be.visible");
    cy.contains(/aspiring software engineer/i).should("be.visible");
    cy.contains(/learn more about me/i).should("be.visible");
  });
});
