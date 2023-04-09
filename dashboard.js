const collapseButtonElem = document.querySelector(".sidebar__collapse-button");
const mainContent = document.querySelector(".content");
const sidebarElem = document.querySelector(".sidebar");
const navbarElem = document.querySelector(".navbar");
const seeAllNotificationsBtn = document.querySelector(".see-all-notification-btn");

const pageLinks = [...document.querySelectorAll('a[href*="#page"]')];
// const realPages = [...document.querySelectorAll('[id*="page"]')];

// let firstLoad = true;
const exerciseDropdowns = [...document.querySelectorAll(".exercise__dropdown")];

for (let exDropdown of exerciseDropdowns) {
  exDropdown.querySelector('.exercise__dropdown-header').addEventListener("click", (ev) => {
    exDropdown.classList.toggle("open");
  });
}

collapseButtonElem.addEventListener("click", () => {
  sidebarElem.classList.toggle("small-size");
  mainContent.classList.toggle("small-size");
  navbarElem.classList.toggle("small-size");
});

// const findPage = () => {
//   // get url hash and remove staring # in it
//   const urlHash = location.hash.trim().replace(/#/g, "");
//
//   // Remove All Pages and Make a Copy of Them
//   for (let page of realPages) {
//     page.style.display = "none";
//   }
//
//   // Check For URL Hash , if URL HASH exists find the page of URL HASH otherwise place first page in pages copy
//   if (urlHash) {
//     const pageOfHash = realPages.find((page) => page.getAttribute("id") === urlHash);
//
//     if (pageOfHash) pageOfHash.style.display = "";
//     else realPages[0].style.display = "";
//   } else {
//     realPages[0].style.display = "";
//   }
//
//   // In First Load Enable Style of a link in sidebar
//   if (firstLoad) {
//     for (let link of pageLinks) {
//       if (link.getAttribute("href").replace(/#/, "") === urlHash) link.classList.add("active");
//       else link.classList.remove("active");
//     }
//     if (!pageLinks.some((link) => link.classList.contains("active"))) {
//       pageLinks[0].classList.add("active");
//     }
//     firstLoad = false;
//   }
// };
//
// for (let currentLink of pageLinks) {
//   currentLink.addEventListener("click", (ev) => {
//     ev.preventDefault();
//     location.hash = currentLink.getAttribute("href");
//
//     for (let link of pageLinks) link.classList.remove("active");
//
//     currentLink.classList.add("active");
//   });
// }
//
// // On Hash Change Event Listener : Change Page With Animation
// window.addEventListener("hashchange", async (ev) => {
//   await mainContent.animate(
//     [
//       { scale: 1, opacity: 1 },
//       { scale: 0.95, opacity: 0 },
//     ],
//     {
//       duration: 300,
//       easing: "ease-in-out",
//     }
//   ).finished;
//
//   findPage();
//
//   await mainContent.animate(
//     [
//       { scale: 1.05, opacity: 0 },
//       { scale: 1, opacity: 1 },
//     ],
//     {
//       duration: 300,
//       easing: "ease-in-out",
//     }
//   ).finished;
// });

// UI Functionality
const sidebarToggleButton = document.querySelector(".navbar__toggle-sidebar-btn");

sidebarToggleButton.addEventListener("click", () => {
  sidebarElem.classList.toggle("sidebar--show");
});

seeAllNotificationsBtn.addEventListener("click", () => {
  const notificationLink = pageLinks.find((elem) => elem.getAttribute("href") === "#pageNotifications");
  if (notificationLink) notificationLink.click();
});

// Call findPage for Initial Page Load
// findPage();
