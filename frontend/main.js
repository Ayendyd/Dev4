function register(e) {
  // Check if passwords match
  if (getValue("password1") != getValue("confirm")) {
    alert("Passwords do not match");
    return;
  }
  // Fetch data from html
  data = {
    firstname: getValue("firstname"),
    Tussenvoegsel: getValue("Tussenvoegsel"),
    lastname: getValue("lastname"),
    email: getValue("email1"),
    password: getValue("password1"),
    Telefoonnummer: getValue("Telefoonnummer"),
    Straat: getValue("Straat"),
    Postcode: getValue("Postcode"),
  };
  // Submit data to API
  api("users", "POST", data).then((res) => {
    if (res.message == "success") {
      alert("User created");
    }
  });
}

function login() {
  // Fetch data from html
  data = {
    password: getValue("password2"),
    email: getValue("email2"),
  };
  // Submit data to API
  api("auth", "POST", data).then((res) => {
    if (res.message == "success") {
      setCookie("token", res.access_token, 365);
      showPage("Logged");
      getUser();
    }
  });
}

function getUser() {
  // Fetch user data from API
  fetch("http://localhost:5000/me")
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function logout() {}

function showPage(id) {
  let pages = document.getElementsByClassName("container");
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  document.getElementById(id).style.display = "block";
}

function bindEvents() {
  connectButton("register", register);
  connectButton("login", login);
  enableSubmits();
}

function enableSubmits() {
  document.body.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
      // if enter is pressed
      console.log(e);
      let target = e.target;
      while (!target.className.includes("input")) {
        console.log(target);
        target = target.parentElement;
      }
      target.parentElement.getElementsByTagName("button")[0].click(); // click the first button
    }
  });
}

function connectButton(id, event) {
  let element = document.getElementById(id);
  if (element) {
    element.addEventListener("click", event);
  }
}

function getValue(id) {
  let element = document.getElementById(id);
  if (element) {
    return element.value;
  }
  return "";
}
function getValue(id) {
  let element = document.getElementById(id);
  if (element) {
    return element.value;
  }
  return "";
}
function api(endpoint, method = "GET", data = {}) {
  const API = "http://localhost:5000/";
  return fetch(API + endpoint, {
    method: method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: method == "GET" ? null : JSON.stringify(data),
  }).then((res) => res.json());
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(cname) {
  setCookie(cname, "", -1);
}

bindEvents();
