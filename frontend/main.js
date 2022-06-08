let inlogWaarde = 0;
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

async function ME() {
  const response = await fetch(APIME, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  });
  const Data = await response.json();
  if (inlogWaarde == 0) {
    alert("Geen rechten!");
  }
  if (Data.user.userroles_id == 1) {
    showPage("MwPagina");
    HidePage("mainPage"),
      HidePage("reviewsPagina"),
      HidePage("AutoPagina"),
      HidePage("ReservatiesPagina");
  } else {
    alert("Je bent geen medewerker!");
  }
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
  if ((Data.user.userroles_id == 1, 2)) {
    data = {
      user_id: Data.user.id,
      begin_datum: getValue("BeginDatum"),
      eind_datum: getValue("EindDatum"),
      vrije_kilometers: getValue("vrije_kilometers"),
      levering: getValue("levering"),
      auto_id: getValue("AAA"),
    };

    // Submit data to API
    api("orders", "POST", data).then((res) => {
      if (res.message == "success") {
        alert("User created");
      }
    });
  } else {
    alert("Geen rechten!");
  }

  if (inlogWaarde == 0) {
    alert("Geen rechten!");
  }
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
      showPage("LogoutLink");
      HidePage("LoginLink");
      inlogWaarde = 1;
      loggedIn(1);
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
  if (data.message == "success") {
    inlogWaarde = 1;
    loggedIn(1);
    showPage("mainPage");
  }

  if (data.user.userroles_id == 1) {
    showPage("MwPagina");
    HidePage("mainPage");
  }
  document.getElementById("naampje").textContent = data.user.firstname;
  document.getElementById("achternaampje").textContent = data.user.lastname;
  console.log(data);
}

// getUserr();
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

  document.getElementById("Autonaamm0").textContent = data[0].Naam;

  document.getElementById("Autonaamm1").textContent = data[1].Naam;
  document.getElementById("Autonaamm2").textContent = data[2].Naam;
  document.getElementById("Automodel0").textContent = data[0].Model;
  document.getElementById("Automodel1").textContent = data[1].Model;
  document.getElementById("Automodel2").textContent = data[2].Model;
  document.getElementById("Autokleur0").textContent = data[0].Kleur;
  document.getElementById("Autokleur1").textContent = data[1].Kleur;
  document.getElementById("Autokleur2").textContent = data[2].Kleur;
  document.getElementById("Autobrandstof2").textContent = data[2].Brandstof;
  document.getElementById("Autobrandstof0").textContent = data[0].Brandstof;
  document.getElementById("Autobrandstof1").textContent = data[1].Brandstof;
  document.getElementById("AutoID2").textContent = data[2].id;
  document.getElementById("AutoID0").textContent = data[0].id;
  document.getElementById("AutoID1").textContent = data[1].id;
}
getAuto();

const apires = "http://localhost:5000/orders";
async function getReservering() {
  const response = await fetch(apires, {
    method: "GET",
    mode: "cors",
  });
  const data = await response.json();

  // document.getElementById("TestTest").textContent = data[0];
  // document.getElementById("Autonaamm0").textContent = data[0];

  // document.getElementById("AutoID01").textContent = data[1].auto_id;
  // document.getElementById("AutoID02").textContent = data[2].auto_id;

  // document.getElementById("ID01").textContent = data[1].id;
  // document.getElementById("ID02").textContent = data[2].id;
  // document.getElementById("userid00").textContent = data[0].orders.usersid;
  // document.getElementById("ID01").textContent = data[1].id;
  // document.getElementById("ID02").textContent = data[2].id;
  document.getElementById("AutoID00").textContent = data[0].auto_id;
  document.getElementById("ID00").textContent = data[0].id;
  document.getElementById("autokleur0").textContent = data[0].Kleur;
  document.getElementById("voornaamm0").textContent = data[0].firstname;
  document.getElementById("begindatumm0").textContent = data[0].begin_datum;
  document.getElementById("einddatumm0").textContent = data[0].eind_datum;
  document.getElementById("Autonaam0").textContent = data[0].Naam;
  document.getElementById("modell0").textContent = data[0].Model;
  document.getElementById("vrijekm0").textContent = data[0].vrije_kilometers;
  document.getElementById("userid0").textContent = data[0].user_id;

  document.getElementById("AutoID001").textContent = data[1].auto_id;
  document.getElementById("ID001").textContent = data[1].id;
  document.getElementById("autokleur01").textContent = data[1].Kleur;
  document.getElementById("voornaamm01").textContent = data[1].firstname;
  document.getElementById("begindatumm01").textContent = data[1].begin_datum;
  document.getElementById("einddatumm01").textContent = data[1].eind_datum;
  document.getElementById("Autonaam01").textContent = data[1].Naam;
  document.getElementById("modell01").textContent = data[1].Model;
  document.getElementById("vrijekm01").textContent = data[1].vrije_kilometers;
  document.getElementById("userid01").textContent = data[1].user_id;

  document.getElementById("AutoID002").textContent = data[2].auto_id;
  document.getElementById("ID002").textContent = data[2].id;
  document.getElementById("autokleur02").textContent = data[2].Kleur;
  document.getElementById("voornaamm02").textContent = data[2].firstname;
  document.getElementById("begindatumm02").textContent = data[2].begin_datum;
  document.getElementById("einddatumm02").textContent = data[2].eind_datum;
  document.getElementById("Autonaam02").textContent = data[2].Naam;
  document.getElementById("modell02").textContent = data[2].Model;
  document.getElementById("vrijekm02").textContent = data[2].vrije_kilometers;
  document.getElementById("userid02").textContent = data[2].user_id;

  document.getElementById("AutoID003").textContent = data[3].auto_id;
  document.getElementById("ID003").textContent = data[3].id;
  document.getElementById("autokleur03").textContent = data[3].Kleur;
  document.getElementById("voornaamm03").textContent = data[3].firstname;
  document.getElementById("begindatumm03").textContent = data[3].begin_datum;
  document.getElementById("einddatumm03").textContent = data[3].eind_datum;
  document.getElementById("Autonaam03").textContent = data[3].Naam;
  document.getElementById("modell03").textContent = data[3].Model;
  document.getElementById("vrijekm03").textContent = data[3].vrije_kilometers;
  document.getElementById("userid03").textContent = data[3].user_id;

  document.getElementById("AutoID00").textContent = data[0].auto_id;
  document.getElementById("ID00").textContent = data[0].id;
  document.getElementById("autokleur0").textContent = data[0].Kleur;
  document.getElementById("voornaamm0").textContent = data[0].firstname;
  document.getElementById("begindatumm0").textContent = data[0].begin_datum;
  document.getElementById("einddatumm0").textContent = data[0].eind_datum;
  document.getElementById("Autonaam0").textContent = data[0].Naam;
  document.getElementById("modell0").textContent = data[0].Model;
  document.getElementById("vrijekm0").textContent = data[0].vrije_kilometers;
  document.getElementById("userid0").textContent = data[0].user_id;

  document.getElementById("AutoID00").textContent = data[0].auto_id;
  document.getElementById("ID00").textContent = data[0].id;
  document.getElementById("autokleur0").textContent = data[0].Kleur;
  document.getElementById("voornaamm0").textContent = data[0].firstname;
  document.getElementById("begindatumm0").textContent = data[0].begin_datum;
  document.getElementById("einddatumm0").textContent = data[0].eind_datum;
  document.getElementById("Autonaam0").textContent = data[0].Naam;
  document.getElementById("modell0").textContent = data[0].Model;
  document.getElementById("vrijekm0").textContent = data[0].vrije_kilometers;
  document.getElementById("userid0").textContent = data[0].user_id;

  document.getElementById("AutoID00").textContent = data[0].auto_id;
  document.getElementById("ID00").textContent = data[0].id;
  document.getElementById("autokleur0").textContent = data[0].Kleur;
  document.getElementById("voornaamm0").textContent = data[0].firstname;
  document.getElementById("begindatumm0").textContent = data[0].begin_datum;
  document.getElementById("einddatumm0").textContent = data[0].eind_datum;
  document.getElementById("Autonaam0").textContent = data[0].Naam;
  document.getElementById("modell0").textContent = data[0].Model;
  document.getElementById("vrijekm0").textContent = data[0].vrije_kilometers;
  document.getElementById("userid0").textContent = data[0].user_id;

  document.getElementById("AutoID00").textContent = data[0].auto_id;
  document.getElementById("ID00").textContent = data[0].id;
  document.getElementById("autokleur0").textContent = data[0].Kleur;
  document.getElementById("voornaamm0").textContent = data[0].firstname;
  document.getElementById("begindatumm0").textContent = data[0].begin_datum;
  document.getElementById("einddatumm0").textContent = data[0].eind_datum;
  document.getElementById("Autonaam0").textContent = data[0].Naam;
  document.getElementById("modell0").textContent = data[0].Model;
  document.getElementById("vrijekm0").textContent = data[0].vrije_kilometers;
  document.getElementById("userid0").textContent = data[0].user_id;

  document.getElementById("AutoID00").textContent = data[0].auto_id;
  document.getElementById("ID00").textContent = data[0].id;
  document.getElementById("autokleur0").textContent = data[0].Kleur;
  document.getElementById("voornaamm0").textContent = data[0].firstname;
  document.getElementById("begindatumm0").textContent = data[0].begin_datum;
  document.getElementById("einddatumm0").textContent = data[0].eind_datum;
  document.getElementById("Autonaam0").textContent = data[0].Naam;
  document.getElementById("modell0").textContent = data[0].Model;
  document.getElementById("vrijekm0").textContent = data[0].vrije_kilometers;
  document.getElementById("userid0").textContent = data[0].user_id;

  document.getElementById("AutoID00").textContent = data[0].auto_id;
  document.getElementById("ID00").textContent = data[0].id;
  document.getElementById("autokleur0").textContent = data[0].Kleur;
  document.getElementById("voornaamm0").textContent = data[0].firstname;
  document.getElementById("begindatumm0").textContent = data[0].begin_datum;
  document.getElementById("einddatumm0").textContent = data[0].eind_datum;
  document.getElementById("Autonaam0").textContent = data[0].Naam;
  document.getElementById("modell0").textContent = data[0].Model;
  document.getElementById("vrijekm0").textContent = data[0].vrije_kilometers;
  document.getElementById("userid0").textContent = data[0].user_id;

  console.log(data);
}

getReservering();
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
  connectButton("logoutt", logout);
  enableSubmits();

  getUser();
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

function logout() {
  getCookie("token");
  deleteCookie("token");
  getUser();
  alert("Succesvol uitgelogd");
  loggedIn(0);
  HidePage("LogoutLink");
  showPage("LoginLink");

  inlogWaarde = 0;
}

// function hideAllPages() {
//   HidePage("mainPage"), HidePage("MwPagina"), HidePage("ReservatiesPagina");
//   HidePage("AutoPagina");
//   HidePage("reviewsPagina");
//   HidePage("registerPage");
//   HidePage("loginPage");
//   HidePage("ReserveerPage");
// }

function loggedIn(inlogWaarde) {
  if (inlogWaarde == 1) {
    console.log(`inlogWaarde is nu ${inlogWaarde}`);
    showPage("mainPage");
    showPage("LogoutLink");
    HidePage("LoginLink");

    return true;
  }
  if (inlogWaarde == 0) {
    console.log(`inlogWaarde is nu ${inlogWaarde}`);
    showPage("mainPage");
    HidePage("MwPagina");

    return false;
  }
}

bindEvents();
