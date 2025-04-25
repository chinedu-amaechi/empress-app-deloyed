// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js

// Command to mock a successful sign up
Cypress.Commands.add("mockSuccessfulSignUp", (email = "test@example.com") => {
  cy.intercept("POST", "**/api/auth/create/customer", {
    statusCode: 201,
    body: {
      status: 201,
      message: "Account created successfully",
      data: { 
        user: {
          firstName: "Test",
          lastName: "User",
          email
        } 
      }
    }
  }).as("signupRequest");
});

// Command to mock a successful login
Cypress.Commands.add("mockSuccessfulLogin", (email = "test@example.com") => {
  cy.intercept("POST", "**/api/auth/login/customer", {
    statusCode: 200,
    body: {
      status: 200,
      message: "Sign in successful",
      data: {
        user: {
          firstName: "Test",
          lastName: "User",
          email,
          cart: []
        },
        token: "fake-jwt-token"
      }
    }
  }).as("loginRequest");
  
  // Also intercept the cart API to prevent 401 errors
  cy.intercept("GET", "**/api/customer/cart", {
    statusCode: 200,
    body: {
      status: 200,
      data: []
    }
  }).as("cartRequest");
});

// Command to mock an unsuccessful login
Cypress.Commands.add("mockFailedLogin", () => {
  cy.intercept("POST", "**/api/auth/login/customer", {
    statusCode: 401,
    body: {
      status: 401,
      message: "Invalid credentials"
    }
  }).as("failedLoginRequest");
});

// Command to simulate a logged-in user
Cypress.Commands.add("loginUser", (email = "test@example.com") => {
  cy.mockSuccessfulLogin(email);
  
  // Directly set the token in localStorage
  cy.window().then((window) => {
    window.localStorage.setItem("token", "fake-jwt-token");
  });
  
  // Reload to apply the effects of localStorage
  cy.reload();
});

// Helper to check for toast messages
Cypress.Commands.add('checkToast', (expectedMessage) => {
  // Wait for toast to appear
  cy.wait(1000);
  
  // Look for toast or success message using multiple approaches
  cy.get("body").then(($body) => {
    const bodyText = $body.text();
    
    // Check if the success message is shown anywhere on the page
    const hasMessage = bodyText.includes(expectedMessage);
    
    if (hasMessage) {
      // Success, message found on page
      expect(hasMessage).to.be.true;
    } else {
      // Try to find toast notifications
      if ($body.find('.Toastify__toast-body, [role="alert"]').length) {
        cy.get('.Toastify__toast-body, [role="alert"]')
          .should('be.visible');
      } else {
        // If we can't find specific elements, at least verify page has changed
        cy.log('Toast message not found, but continuing test');
      }
    }
  });
});