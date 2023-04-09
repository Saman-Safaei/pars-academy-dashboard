const sidebarLinksContainer = document.querySelector(".sidebar__links");
const sidebarLinks = [...sidebarLinksContainer.querySelectorAll(".sidebar__link")];
const pages = [...document.querySelectorAll('div[id*="page"]')];
const pagesContainer = document.querySelector(".content");

let isLinksActive = true;
let firstLoad = true;

const showTargetPage = async (hash) => {
  const pageID = hash.replace(/#/gi, "");
  isLinksActive = false;

  if (!firstLoad)
    await pagesContainer.animate(
      [
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 1.05 },
      ],
      {
        duration: 150,
        easing: "ease-in-out",
      }
    ).finished;

  for (let page of pages) page.style.display = "none";

  for (let link of sidebarLinks) link.classList.remove("active");

  for (let page of pages) if (page.getAttribute("id") === pageID) page.style.display = "";

  if (!pages.some((page) => page.style.display === "")) pages[0].style.display = "";

  const activeLink = sidebarLinks.find((link) => link.getAttribute("href") === `#${pageID}`);

  if (activeLink) activeLink.classList.add("active");
  else sidebarLinks[0].classList.add("active");

  if (!firstLoad)
    await pagesContainer.animate(
      [
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1 },
      ],
      {
        duration: 150,
        easing: "ease-in-out",
      }
    ).finished;

  isLinksActive = true;
  firstLoad = false;
};

for (let sidebarLink of sidebarLinks)
  sidebarLink.addEventListener("click", (ev) => {
    ev.preventDefault();
    if (!isLinksActive) return;

    const hash = sidebarLink.getAttribute("href");

    if (hash === location.hash) return

    history.pushState({ activePage: hash }, document.title, hash);
    showTargetPage(hash);
  });

window.addEventListener("popstate", (ev) => {
  const state = ev.state ?? { activePage: "#" };
  showTargetPage(state.activePage);
});

showTargetPage(location.hash);
