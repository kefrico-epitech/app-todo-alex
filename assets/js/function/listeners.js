var formRegister = document.forms["register"];
var formLogin = document.forms["login"];
var firstname = document.forms[0]["firstname"];
var lastname = document.forms[0]["lastname"];
var email = document.forms[0]["email"];
var password = document.forms[0]["password"];
var passwordConfirm = document.forms[0]["passwordConfirm"];
var check = {};
const submitButton = document.querySelector(".submit");

// gestionnaire d'évènement
var listenerFunction = {
  toggleInputType: ev => {
    ev.target.classList.toggle("fa-eye-slash");
    var input = ev.target.parentNode.children[0];
    if (input.type == "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  },

  checkFirstname: ev => {
    var input = ev.target;
    var content = input.value.trim();
    document.getElementById("error-firstname").innerHTML = "";
    var error = "";
    if (!content) {
      error = "Your first name must not be empty";
    } else if (!/^[a-zA-Z]{2,15}$/.test(content)) {
      error = "your first name is not valid !";
    }
    if (error) {
      check = { ...check, firstname: false };
      document.getElementById("error-firstname").innerHTML = error;
    } else {
      check = { ...check, firstname: true };
    }

    setSubmitButton();
  },

  checkLastname: ev => {
    var input = ev.target;
    var content = input.value.trim();
    document.getElementById("error-lastname").innerHTML = "";
    var error = "";
    if (!content) {
      error = "Your last name must not be empty";
    } else if (!/^[a-zA-Z]{2,15}$/.test(content)) {
      error = "your last name is not valid !";
    }
    if (error) {
      check = { ...check, lastname: false };
      document.getElementById("error-lastname").innerHTML = error;
    } else {
      check = { ...check, lastname: true };
    }
    setSubmitButton();
  },
  checkEmail: ev => {
    var input = ev.target;
    var content = input.value.trim();
    document.getElementById("error-email").innerHTML = "";
    var error = "";
    if (!content) {
      error = "Your email must not be empty";
    } else if (!/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(content)) {
      error = "your email is not valid !";
    }
    if (error) {
      check = { ...check, email: false };
      document.getElementById("error-email").innerHTML = error;
    } else {
      check = { ...check, email: true };
    }
    setSubmitButton();
  },
  checkPassword: ev => {
    var input = ev.target;
    var content = input.value.trim();
    var regEmail = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    document.getElementById("error-password").innerHTML = "";
    var error = "";
    if (!content) {
      error = "Your password must not be empty";
    } else if (!regEmail.test(content)) {
      error = "your password is not valid !";
    }
    if (error) {
      check = { ...check, password: false };
      document.getElementById("error-password").innerHTML = error;
    } else {
      check = { ...check, password: true };
    }

    setSubmitButton();
  },
  checkPasswordConfirm: ev => {
    var input = ev.target;
    var content = input.value.trim();

    document.getElementById("error-confirm-password").innerHTML = "";
    var error = "";
    if (!content) {
      error = "Your confirm password must not be empty";
    } else if (content !== password.value) {
      error = "confirm password does not match entered password";
    }
    if (error) {
      check = { ...check, passwordConfirm: false };
      document.getElementById("error-confirm-password").innerHTML = error;
    } else {
      check = { ...check, passwordConfirm: true };
    }

    setSubmitButton();
  },
  submitLoginForm: ev => {
    ev.preventDefault();
    formData = new FormData(formLogin);
    //requète vers le serveur de traitement
  }
};

var checkFormValidity = () => {
  var result = true;

  if (formRegister) {
    if (Object.keys(check).length === 5) {
      for (const key in check) {
        const value = check[key];

        result = result && value;

        if (!result) return result;
      }
      return result;
    }
  }
  if (formLogin) {
    if (Object.keys(check).length === 2) {
      for (const key in check) {
        const value = check[key];

        result = result && value;

        if (!result) return result;
      }
      return result;
    }
  }

  return false;
};

var setSubmitButton = () => {
  if (formRegister) {
    if (checkFormValidity()) {
      if (formRegister.elements[5]) {
        formRegister.elements[5].disabled = false;

        formRegister.elements[5].addEventListener("click", function(e) {
          e.preventDefault(); // Empêchez la soumission par défaut du bouton
          window.location.href = "http://127.0.0.1:5500/login.html";
        });

        return;
      }
    }

    formRegister.elements[5].disabled = true;
  }

  if (formLogin) {
    if (checkFormValidity()) {
      if (formLogin.elements[2]) {
        formLogin.elements[2].disabled = false;

        return;
      }
    }

    formLogin.elements[2].disabled = true;
  }
};

//initialisation des abonnements

var setupListeners = () => {
  firstname ? (firstname.onkeyup = listenerFunction.checkFirstname) : null;
  lastname ? (lastname.onkeyup = listenerFunction.checkLastname) : null;
  email ? (email.onkeyup = listenerFunction.checkEmail) : null;
  password ? (password.onkeyup = listenerFunction.checkPassword) : null;
  passwordConfirm
    ? (passwordConfirm.onkeyup = listenerFunction.checkPasswordConfirm)
    : null;
  formLogin ? (formLogin.onsubmit = listenerFunction.submitLoginForm) : null;

  var icons = document.querySelectorAll("i.icon-password");
  for (let index = 0; index < icons.length; index++) {
    const icon = icons[index];
    icon.onclick = listenerFunction.toggleInputType;
  }
};
