const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

const signupForm = select("#signupForm");
const loginForm = select("#loginForm");

function validateAll() {
  const inputs = selectAll("input.is-danger");
  inputs.forEach((input) => {
    input.classList.remove("is-danger");
    input.parentNode.nextElementSibling.innerText = "";
  });
}

const invalidate = (inputName, message = null) => {
  validateAll();
  select(`input[name="${inputName}"]`).classList.add("is-danger");
  select(`input[name="${inputName}"]`).parentNode.nextElementSibling.innerText =
    message;
};

select("#signupBtn") &&
  select("#signupBtn").addEventListener("click", () => {
    let formData = new FormData(signupForm);

    let data = {};

    for (var p of formData) {
      let name = p[0];
      let value = p[1].trim();

      data[name] = value;
    }

    if (!data.name) invalidate("name", "Name is required!");
    else if (data.name.length > 40)
      invalidate("name", "Max 40 characters allowed!");
    else if (!data.email) invalidate("email", "Email is required!");
    else if (data.email.length > 150)
      invalidate("email", "Max 150 characters allowed!");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      invalidate("email", "Invalid Email!");
    else if (!data.password) invalidate("password", "Password is required!");
    else if (data.password.length < 8)
      invalidate("password", "Password must be greater than 8 length!");
    else if (!data.cpassword)
      invalidate("cpassword", "Confirm Password is required!");
    else if (data.password != data.cpassword) {
      invalidate("cpassword", "Passwords do not match!");
    } else {
      validateAll();

      signupForm.submit();
    }
  });

select("#loginBtn") &&
  select("#loginBtn").addEventListener("click", () => {
    let formData = new FormData(loginForm);

    let data = {};

    for (var p of formData) {
      let name = p[0];
      let value = p[1].trim();

      data[name] = value;
    }

    if (!data.email) invalidate("email", "Email is required!");
    else if (data.email.length > 150)
      invalidate("email", "Max 150 characters allowed!");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      invalidate("email", "Invalid Email!");
    else if (!data.password) invalidate("password", "Password is required!");
    else {
      validateAll();

      loginForm.submit();
    }
  });
