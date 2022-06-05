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

async function Reserveren(e) {
  const response = await fetch(APIME, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  });
  const Data = await response.json();

  data = {
    user_id: Data.user.id,
    begin_datum: getValue("BeginDatum"),
    eind_datum: getValue("EindDatum"),
    auto_id: getValue("AAA"),
    vrije_kilometers: getValue("vrije_kilometers"),
  };

  // Submit data to API
  api("orders", "POST", data).then((res) => {
    if (res.message == "success") {
      alert("User created");
    }
  });
}

function addAuto(e) {
  // Fetch data from html

  data = {
    Naam: getValue("Naam"),
    Model: getValue("Model"),
    Kleur: getValue("Kleur"),
    Brandstof: getValue("Brandstof"),
    Transmissie: getValue("Transmissie"),
    GPS: getValue("GPS"),
    Bouwjaar: getValue("Bouwjaar"),
    Vermogen: getValue("Vermogen"),
    Categorie_id: getValue("Categorie_id"),
  };
  // Submit data to API
  api("auto", "POST", data).then((res) => {
    if (res.message == "success") {
      alert("Auto created");
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
      showPage("mainPage");
      getUser();
    }
  });
}

// function login() {
//   const roleId = req.users.userroles_id;
//   // Fetch data from html
//   data = {
//     password: getValue("password2"),
//     email: getValue("email2"),
//   };
//   // Submit data to API
//   api("auth", "POST", data).then((res) => {
//     if (roleId == 1) {
//       setCookie("token", res.access_token, 365);
//       showPage("mainPage");
//       getUser();
//     }
//   });
// }

// Fetch user data from API
const APIME = "http://localhost:5000/me";

async function getUser() {
  const response = await fetch(APIME, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  });
  const data = await response.json();

  if (data.user.userroles_id == 1) {
    showPage("MwPagina");
    HidePage("mainPage");
  }
  document.getElementById("naampje").textContent = data.user.firstname;
  document.getElementById("achternaampje").textContent = data.user.lastname;
  document.getElementById("user_id").textContent = data.user.id;

  console.log(data);
}

// {
//   setCookie("token", res.access_token, 365);
//   showPage("mainPage");
//   getUser() ;
// }

// Fetch user data from API
const APIAUTO = "http://localhost:5000/auto";

async function getAuto() {
  const response = await fetch(APIAUTO, {
    method: "GET",
    mode: "cors",
  });
  const data = await response.json();

  document.getElementById("Autonaam0").textContent = data[0].Naam;
  document.getElementById("Autonaam1").textContent = data[1].Naam;
  document.getElementById("Autonaam2").textContent = data[2].Naam;
  document.getElementById("Automodel0").textContent = data[0].Model;
  document.getElementById("Automodel1").textContent = data[1].Model;
  document.getElementById("Automodel2").textContent = data[2].Model;
  document.getElementById("Autokleur0").textContent = data[0].Kleur;
  document.getElementById("Autokleur1").textContent = data[1].Kleur;
  document.getElementById("Autokleur2").textContent = data[2].Kleur;
  document.getElementById("Autobrandstof2").textContent = data[2].Brandstof;
  document.getElementById("Autobrandstof0").textContent = data[0].Brandstof;
  document.getElementById("Autobrandstof1").textContent = data[1].Brandstof;
}
getAuto();

// function logout() {}

// Helper functions

function showPage(id) {
  let pages = document.getElementsByClassName("container");
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  document.getElementById(id).style.display = "block";
}

function HidePage(id) {
  let pages = document.getElementsByClassName("container");
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  document.getElementById(id).style.display = "none";
}

function bindEvents() {
  connectButton("register", register);
  connectButton("login", login);
  connectButton("toevoegen", addAuto);
  connectButton("reserveren", Reserveren);
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

// Cookie functions stolen from w3schools (https://www.w3schools.com/js/js_cookies.asp)
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
