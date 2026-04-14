const scriptUrl = new URL(document.currentScript.src);
const siteRoot = new URL("..", scriptUrl);
const headerPath = new URL("../components/header.html", scriptUrl).href;

fetch(headerPath)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to load header: ${headerPath} (${res.status})`);
    }
    return res.text();
  })
  .then((data) => {
    document.getElementById("header").innerHTML = data;
    fixHeaderLinks();
    setSiteActiveFromLocation();
    onSite();
    initTheme();
  })
  .catch((error) => {
    console.error(error);
  });

let storedTheme = JSON.parse(localStorage.getItem("mode")) || { mode: "☼" };

function fixHeaderLinks() {
  const rootPath = siteRoot.pathname.endsWith("/")
    ? siteRoot.pathname
    : `${siteRoot.pathname}/`;
  const logoAnchor = document.querySelector(".logo-link");
  const logoImage = document.querySelector(".logo-link img");
  if (logoAnchor) {
    logoAnchor.href = `${rootPath}index.html`;
  }
  if (logoImage) {
    logoImage.src = `${rootPath}favicon.png`;
  }

  const navLinks = [
    { selector: ".about_button", target: "pages/about.html" },
    { selector: ".career_button", target: "pages/careers.html" },
    { selector: ".contact_button", target: "pages/contact.html" },
    { selector: ".plans_button", target: "pages/plans.html" },
  ];

  navLinks.forEach(({ selector, target }) => {
    const el = document.querySelector(selector);
    if (el) {
      el.href = `${rootPath}${target}`;
    }
  });

  const menuImage = document.querySelector(".menu_button img");
  if (menuImage) {
    menuImage.src = `${rootPath}elements/hamburger-menu.png`;
  }
}

/*function initTheme() {
  const themeButton = document.querySelector(".js-theme");

  if (storedTheme.mode === "☽") {
    document.body.classList.add("darkMode");
    if (themeButton) themeButton.textContent = "☽";
  } else {
    if (themeButton) themeButton.textContent = "☼";
  }

  if (themeButton) {
    themeButton.addEventListener("click", theme);
  }
}

function theme() {
  const themeButton = document.querySelector(".js-theme");

  if (storedTheme.mode === "☼") {
    storedTheme.mode = "☽";
    document.body.classList.add("darkMode");
    if (themeButton) themeButton.textContent = "☽";
  } else {
    storedTheme.mode = "☼";
    document.body.classList.remove("darkMode");
    if (themeButton) themeButton.textContent = "☼";
  }

  localStorage.setItem("mode", JSON.stringify(storedTheme));
}*/

let siteActive = "index_page";

function setSiteActiveFromLocation() {
  const pathname = window.location.pathname;
  const page = pathname.substring(pathname.lastIndexOf("/") + 1).toLowerCase();

  switch (page) {
    case "about.html":
      siteActive = "about_page";
      break;
    case "careers.html":
      siteActive = "career_page";
      break;
    case "contact.html":
      siteActive = "contact_page";
      break;
    case "plans.html":
      siteActive = "plans_page";
      break;
    case "sign-up.html":
      siteActive = "signUp_page";
      break;
    case "login.html":
      siteActive = "login_page";
      break;
    default:
      siteActive = "index_page";
  }
}

function clearSiteActiveClasses() {
  document.body.classList.remove(
    "aboutActive",
    "careerActive",
    "contactActive",
    "plansActive",
    "signUpActive",
    "loginActive",
  );
}

function onSite() {
  clearSiteActiveClasses();

  if (siteActive === "about_page") {
    document.body.classList.add("aboutActive");
  } else if (siteActive === "career_page") {
    document.body.classList.add("careerActive");
  } else if (siteActive === "contact_page") {
    document.body.classList.add("contactActive");
  } else if (siteActive === "plans_page") {
    document.body.classList.add("plansActive");
  } else if (siteActive === "signUp_page") {
    document.body.classList.add("signUpActive");
  } else if (siteActive === "login_page") {
    document.body.classList.add("loginActive");
  }
}
