Cypress.Commands.add("mockLogin", () => {
  localStorage.setItem(
    "jwt",
    JSON.stringify({
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTIyN2IwY2U3MTQ5MDQ4MjQxMTI5MzYiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2NDcyNjUzM30.dZaZkoqz7oHAg07uGjG4XNtfjGfk_mVmSNhcOSo5Zbw",
      user: {
        _id: "69227b0ce714904824112936",
        name: "Rob Johnson",
        email: "rob.johnson@yahoo.com",
        role: "user"
      }
    })
  );
});
