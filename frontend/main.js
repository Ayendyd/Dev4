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
      showPage("mainPage");
      getUser();
    }
  });
}

function getUser() {
  // Fetch user data from API
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

let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".navbar");

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

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

document.querySelector("#login-btn").onclick = () => {
  document.querySelector(".login-form-container").classList.toggle("active");
};

document.querySelector("#close-login-form").onclick = () => {
  document.querySelector(".login-form-container").classList.remove("active");
};

document.querySelector("#register-btn").onclick = () => {
  document.querySelector(".register-form-container").classList.toggle("active");
};

document.querySelector("#close-register-form").onclick = () => {
  document.querySelector(".register-form-container").classList.remove("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");

  if (window.scrollY > 0) {
    document.querySelector(".header").classList.add("active");
  } else {
    document.querySelector(".header").classList.remove("active");
  }
};

var swiper = new Swiper(".review-slider", {
  grabCursor: true,
  centeredSlides: true,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

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
