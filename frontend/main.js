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

function AutoPP() {
  if (inlogWaarde == 0) {
    alert("Je bent niet ingelogd");
  } else {
    showPage("reviewsPagina"),
      HidePage("mainPage"),
      HidePage("MwPagina"),
      HidePage("AutoPagina"),
      HidePage("ReservatiesPagina"),
      HidePage("ReserveerPage");
  }
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
    alert("Je bent niet ingelogd!");
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

async function Mee() {
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
    alert("Je bent niet ingelogd!");
  }
  if (Data.user.userroles_id == 1) {
    showPage("WijzigPage");
    HidePage("mainPage"),
      HidePage("reviewsPagina"),
      HidePage("ReservatiesPagina");
    HidePage("MwPagina");
  } else {
    alert("Je bent geen medewerker!");
  }
}

async function Reserveren(e) {
  if (inlogWaarde == 0) {
    alert("Je moet ingelogd zijn!");
  } else {
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
        optie1: getValue("optie1"),
        optie2: getValue("optie2"),
        optie3: getValue("optie3"),
      };
      if (inlogWaarde == 0) {
        alert("Geen rechten!");
      }

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
}

async function Wijzigen(e) {
  let id = getValue("AAAI");
  if (inlogWaarde == 0) {
    alert("Je moet ingelogd zijn!");
  } else {
    api("auto/" + id, "GET");

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
      const DData = {
        Model: getValue("Modell"),
        // begin_datum: getValue("BeginDatumm"),
        // eind_datum: getValue("EindDatumm"),
        Brandstof: getValue("brandstoff"),
        // levering: getValue("leveringg"),
        // auto_id: getValue("AAA"),
        Kleur: getValue("Kleurr"),
        // begin_datum: getValue("BeginDatumm"),
        // begin_datum: getValue("BeginDatumm"),
      };
      if (inlogWaarde == 0) {
        alert("Geen rechten!");
      }

      // Submit data to API
      api("auto/" + id, "PATCH", DData).then((res) => {
        if (res.message == "success") {
          alert("Het is gewijzig");
        }
      });
    } else {
      alert("Geen rechten!");
    }

    if (inlogWaarde == 0) {
      alert("Geen rechten!");
    }
  }
}

async function Verwijderen(e) {
  if (Data.user.userroles_id == 1) {
    showPage("VerwijderPage");
    HidePage("mainPage"), HidePage("reviewsPagina"), HidePage("AutoPagina");
    HidePage("MwPagina");

    let id = getValue("MeOrderID");
    if (inlogWaarde == 0) {
      alert("Je moet ingelogd zijn!");
    } else {
      api("me/orders/" + id, "GET");

      await fetch(APIME, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("token"),
        },
      });

      if (inlogWaarde == 0) {
        alert("Geen rechten!");
      }

      // Submit data to API
      api("me/orders/" + id, "DELETE").then((res) => {
        if (res.message == "success") {
          alert("Het is geannuleerd");
        }
      });
    }
  } else {
    inlogWaarde == 0;
    alert("Je moet ingelogd!");
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
  document.getElementById("Automodel0").textContent = data[0].Model;
  document.getElementById("Autokleur0").textContent = data[0].Kleur;
  document.getElementById("Autobrandstof0").textContent = data[0].Brandstof;
  document.getElementById("AutoID0").textContent = data[0].id;
  document.getElementById("Autonaamm1").textContent = data[1].Naam;
  document.getElementById("Autonaamm2").textContent = data[2].Naam;
  document.getElementById("Automodel1").textContent = data[1].Model;
  document.getElementById("Automodel2").textContent = data[2].Model;
  document.getElementById("Autokleur1").textContent = data[1].Kleur;
  document.getElementById("Autokleur2").textContent = data[2].Kleur;
  document.getElementById("Autobrandstof2").textContent = data[2].Brandstof;
  document.getElementById("Autobrandstof1").textContent = data[1].Brandstof;
  document.getElementById("AutoID2").textContent = data[2].id;
  document.getElementById("AutoID1").textContent = data[1].id;

  document.getElementById("Autonaamm3").textContent = data[3].Naam;
  document.getElementById("Automodel3").textContent = data[3].Model;
  document.getElementById("Autokleur3").textContent = data[3].Kleur;
  document.getElementById("Autobrandstof3").textContent = data[3].Brandstof;
  document.getElementById("AutoID3").textContent = data[3].id;

  document.getElementById("Autonaamm4").textContent = data[4].Naam;
  document.getElementById("Automodel4").textContent = data[4].Model;
  document.getElementById("Autokleur4").textContent = data[4].Kleur;
  document.getElementById("Autobrandstof4").textContent = data[4].Brandstof;
  document.getElementById("AutoID4").textContent = data[4].id;

  document.getElementById("Autonaamm5").textContent = data[5].Naam;
  document.getElementById("Automodel5").textContent = data[5].Model;
  document.getElementById("Autokleur5").textContent = data[5].Kleur;
  document.getElementById("Autobrandstof5").textContent = data[5].Brandstof;
  document.getElementById("AutoID5").textContent = data[5].id;

  document.getElementById("Autonaamm6").textContent = data[6].Naam;
  document.getElementById("Automodel6").textContent = data[6].Model;
  document.getElementById("Autokleur6").textContent = data[6].Kleur;
  document.getElementById("Autobrandstof6").textContent = data[6].Brandstof;
  document.getElementById("AutoID6").textContent = data[6].id;

  document.getElementById("Autonaamm7").textContent = data[7].Naam;
  document.getElementById("Automodel7").textContent = data[7].Model;
  document.getElementById("Autokleur7").textContent = data[7].Kleur;
  document.getElementById("Autobrandstof7").textContent = data[7].Brandstof;
  document.getElementById("AutoID7").textContent = data[7].id;

  document.getElementById("Autonaamm8").textContent = data[8].Naam;
  document.getElementById("Automodel8").textContent = data[8].Model;
  document.getElementById("Autokleur8").textContent = data[8].Kleur;
  document.getElementById("Autobrandstof8").textContent = data[8].Brandstof;
  document.getElementById("AutoID8").textContent = data[8].id;

  document.getElementById("Autonaamm9").textContent = data[9].Naam;
  document.getElementById("Automodel9").textContent = data[9].Model;
  document.getElementById("Autokleur9").textContent = data[9].Kleur;
  document.getElementById("Autobrandstof9").textContent = data[9].Brandstof;
  document.getElementById("AutoID9").textContent = data[9].id;

  document.getElementById("Autonaamm10").textContent = data[10].Naam;
  document.getElementById("Automodel10").textContent = data[10].Model;
  document.getElementById("Autokleur10").textContent = data[10].Kleur;
  document.getElementById("Autobrandstof10").textContent = data[10].Brandstof;
  document.getElementById("AutoID10").textContent = data[10].id;

  document.getElementById("Autonaamm11").textContent = data[11].Naam;
  document.getElementById("Automodel11").textContent = data[11].Model;
  document.getElementById("Autokleur11").textContent = data[11].Kleur;
  document.getElementById("Autobrandstof11").textContent = data[11].Brandstof;
  document.getElementById("AutoID11").textContent = data[11].id;

  // document.getElementById("Autonaamm12").textContent = data[12].Naam;
  // document.getElementById("Automodel12").textContent = data[12].Model;
  // document.getElementById("Autokleur12").textContent = data[12].Kleur;
  // document.getElementById("Autobrandstof12").textContent = data[12].Brandstof;
  // document.getElementById("AutoID12").textContent = data[12].id;
}
getAuto();

const apires = "http://localhost:5000/orders";
async function getReservering() {
  const response = await fetch(apires, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
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
  document.getElementById("ID01").textContent = data[1].id;
  document.getElementById("autokleur01").textContent = data[1].Kleur;
  document.getElementById("voornaamm01").textContent = data[1].firstname;
  document.getElementById("begindatumm01").textContent = data[1].begin_datum;
  document.getElementById("einddatumm01").textContent = data[1].eind_datum;
  document.getElementById("Autonaam01").textContent = data[1].Naam;
  document.getElementById("modell01").textContent = data[1].Model;
  document.getElementById("vrijekm01").textContent = data[1].vrije_kilometers;
  document.getElementById("userid01").textContent = data[1].user_id;

  document.getElementById("AutoID002").textContent = data[2].auto_id;
  document.getElementById("ID02").textContent = data[2].id;
  document.getElementById("autokleur02").textContent = data[2].Kleur;
  document.getElementById("voornaamm02").textContent = data[2].firstname;
  document.getElementById("begindatumm02").textContent = data[2].begin_datum;
  document.getElementById("einddatumm02").textContent = data[2].eind_datum;
  document.getElementById("Autonaam02").textContent = data[2].Naam;
  document.getElementById("modell02").textContent = data[2].Model;
  document.getElementById("vrijekm02").textContent = data[2].vrije_kilometers;
  document.getElementById("userid02").textContent = data[2].user_id;

  document.getElementById("AutoID003").textContent = data[3].auto_id;
  document.getElementById("ID03").textContent = data[3].id;
  document.getElementById("autokleur03").textContent = data[3].Kleur;
  document.getElementById("voornaamm03").textContent = data[3].firstname;
  document.getElementById("begindatumm03").textContent = data[3].begin_datum;
  document.getElementById("einddatumm03").textContent = data[3].eind_datum;
  document.getElementById("Autonaam03").textContent = data[3].Naam;
  document.getElementById("modell03").textContent = data[3].Model;
  document.getElementById("vrijekm03").textContent = data[3].vrije_kilometers;
  document.getElementById("userid03").textContent = data[3].user_id;

  document.getElementById("AutoID004").textContent = data[4].auto_id;
  document.getElementById("ID04").textContent = data[4].id;
  document.getElementById("autokleur04").textContent = data[4].Kleur;
  document.getElementById("voornaamm04").textContent = data[4].firstname;
  document.getElementById("begindatumm04").textContent = data[4].begin_datum;
  document.getElementById("einddatumm04").textContent = data[4].eind_datum;
  document.getElementById("Autonaam04").textContent = data[4].Naam;
  document.getElementById("modell04").textContent = data[4].Model;
  document.getElementById("vrijekm04").textContent = data[4].vrije_kilometers;
  document.getElementById("userid04").textContent = data[4].user_id;

  document.getElementById("AutoID005").textContent = data[5].auto_id;
  document.getElementById("ID05").textContent = data[5].id;
  document.getElementById("autokleur05").textContent = data[5].Kleur;
  document.getElementById("voornaamm05").textContent = data[5].firstname;
  document.getElementById("begindatumm05").textContent = data[5].begin_datum;
  document.getElementById("einddatumm05").textContent = data[5].eind_datum;
  document.getElementById("Autonaam05").textContent = data[5].Naam;
  document.getElementById("modell05").textContent = data[5].Model;
  document.getElementById("vrijekm05").textContent = data[5].vrije_kilometers;
  document.getElementById("userid05").textContent = data[5].user_id;

  document.getElementById("AutoID006").textContent = data[6].auto_id;
  document.getElementById("ID06").textContent = data[6].id;
  document.getElementById("autokleur06").textContent = data[6].Kleur;
  document.getElementById("voornaamm06").textContent = data[6].firstname;
  document.getElementById("begindatumm06").textContent = data[6].begin_datum;
  document.getElementById("einddatumm06").textContent = data[6].eind_datum;
  document.getElementById("Autonaam06").textContent = data[6].Naam;
  document.getElementById("modell06").textContent = data[6].Model;
  document.getElementById("vrijekm06").textContent = data[6].vrije_kilometers;
  document.getElementById("userid06").textContent = data[6].user_id;

  document.getElementById("AutoID007").textContent = data[7].auto_id;
  document.getElementById("ID07").textContent = data[7].id;
  document.getElementById("autokleur07").textContent = data[7].Kleur;
  document.getElementById("voornaamm07").textContent = data[7].firstname;
  document.getElementById("begindatumm07").textContent = data[7].begin_datum;
  document.getElementById("einddatumm07").textContent = data[7].eind_datum;
  document.getElementById("Autonaam07").textContent = data[7].Naam;
  document.getElementById("modell07").textContent = data[7].Model;
  document.getElementById("vrijekm07").textContent = data[7].vrije_kilometers;
  document.getElementById("userid07").textContent = data[7].user_id;

  document.getElementById("AutoID008").textContent = data[8].auto_id;
  document.getElementById("ID08").textContent = data[8].id;
  document.getElementById("autokleur08").textContent = data[8].Kleur;
  document.getElementById("voornaamm08").textContent = data[8].firstname;
  document.getElementById("begindatumm08").textContent = data[8].begin_datum;
  document.getElementById("einddatumm08").textContent = data[8].eind_datum;
  document.getElementById("Autonaam08").textContent = data[8].Naam;
  document.getElementById("modell08").textContent = data[8].Model;
  document.getElementById("vrijekm08").textContent = data[8].vrije_kilometers;
  document.getElementById("userid08").textContent = data[8].user_id;

  document.getElementById("AutoID009").textContent = data[9].auto_id;
  document.getElementById("ID09").textContent = data[9].id;
  document.getElementById("autokleur09").textContent = data[9].Kleur;
  document.getElementById("voornaamm09").textContent = data[9].firstname;
  document.getElementById("begindatumm09").textContent = data[9].begin_datum;
  document.getElementById("einddatumm09").textContent = data[9].eind_datum;
  document.getElementById("Autonaam09").textContent = data[9].Naam;
  document.getElementById("modell09").textContent = data[9].Model;
  document.getElementById("vrijekm09").textContent = data[9].vrije_kilometers;
  document.getElementById("userid09").textContent = data[9].user_id;

  document.getElementById("AutoID0010").textContent = data[10].auto_id;
  document.getElementById("ID010").textContent = data[10].id;
  document.getElementById("autokleur010").textContent = data[10].Kleur;
  document.getElementById("voornaamm010").textContent = data[10].firstname;
  document.getElementById("begindatumm010").textContent = data[10].begin_datum;
  document.getElementById("einddatumm010").textContent = data[10].eind_datum;
  document.getElementById("Autonaam010").textContent = data[10].Naam;
  document.getElementById("modell010").textContent = data[10].Model;
  document.getElementById("vrijekm010").textContent = data[10].vrije_kilometers;
  document.getElementById("userid010").textContent = data[10].user_id;

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
  connectButton("Wijzigg", Wijzigen);
  connectButton("Verwijder", Verwijderen);
  enableSubmits();

  getUser();
}

const apiress = "http://localhost:5000/me/orders";
async function getReserveringMe() {
  const response = await fetch(apiress, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  });
  const data = await response.json();

  console.log(data);

  // document.getElementById("TestTest").textContent = data[0];
  // document.getElementById("Autonaamm0").textContent = data[0];

  // document.getElementById("AutoID01").textContent = data[1].auto_id;
  // document.getElementById("AutoID02").textContent = data[2].auto_id;

  // document.getElementById("ID01").textContent = data[1].id;
  // document.getElementById("ID02").textContent = data[2].id;
  // document.getElementById("userid00").textContent = data[0].orders.usersid;
  // document.getElementById("ID01").textContent = data[1].id;
  // document.getElementById("ID02").textContent = data[2].id;
  document.getElementById("AutoID00m").textContent = data[0].auto_id;
  document.getElementById("ID00m").textContent = data[0].id;
  document.getElementById("autokleur0m").textContent = data[0].Kleur;
  document.getElementById("voornaamm0m").textContent = data[0].firstname;
  document.getElementById("begindatumm0m").textContent = data[0].begin_datum;
  document.getElementById("einddatumm0m").textContent = data[0].eind_datum;
  document.getElementById("Autonaam0m").textContent = data[0].Naam;
  document.getElementById("modell0m").textContent = data[0].Model;
  document.getElementById("vrijekm0m").textContent = data[0].vrije_kilometers;
  document.getElementById("userid0m").textContent = data[0].user_id;

  document.getElementById("AutoID001m").textContent = data[1].auto_id;
  document.getElementById("ID01m").textContent = data[1].id;
  document.getElementById("autokleur01m").textContent = data[1].Kleur;
  document.getElementById("voornaamm01m").textContent = data[1].firstname;
  document.getElementById("begindatumm01m").textContent = data[1].begin_datum;
  document.getElementById("einddatumm01m").textContent = data[1].eind_datum;
  document.getElementById("Autonaam01m").textContent = data[1].Naam;
  document.getElementById("modell01m").textContent = data[1].Model;
  document.getElementById("vrijekm01m").textContent = data[1].vrije_kilometers;
  document.getElementById("userid01m").textContent = data[1].user_id;

  document.getElementById("AutoID002m").textContent = data[2].auto_id;
  document.getElementById("ID02m").textContent = data[2].id;
  document.getElementById("autokleur02m").textContent = data[2].Kleur;
  document.getElementById("voornaamm02m").textContent = data[2].firstname;
  document.getElementById("begindatumm02m").textContent = data[2].begin_datum;
  document.getElementById("einddatumm02m").textContent = data[2].eind_datum;
  document.getElementById("Autonaam02m").textContent = data[2].Naam;
  document.getElementById("modell02m").textContent = data[2].Model;
  document.getElementById("vrijekm02m").textContent = data[2].vrije_kilometers;
  document.getElementById("userid02m").textContent = data[2].user_id;

  document.getElementById("AutoID003m").textContent = data[3].auto_id;
  document.getElementById("ID03m").textContent = data[3].id;
  document.getElementById("autokleur03m").textContent = data[3].Kleur;
  document.getElementById("voornaamm03m").textContent = data[3].firstname;
  document.getElementById("begindatumm03m").textContent = data[3].begin_datum;
  document.getElementById("einddatumm03m").textContent = data[3].eind_datum;
  document.getElementById("Autonaam03m").textContent = data[3].Naam;
  document.getElementById("modell03m").textContent = data[3].Model;
  document.getElementById("vrijekm03m").textContent = data[3].vrije_kilometers;
  document.getElementById("userid03m").textContent = data[3].user_id;
}
getReserveringMe();

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
