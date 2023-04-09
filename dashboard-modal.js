const modalElem = document.getElementById("modal");
const closeBtn = modalElem.querySelector(".modal__submit-btn");
const modalInputElem = modalElem.querySelector('input[type="file"]');

const modalTextPlaceholder = modalElem.querySelector('.modal__file-name');
const modalBackdropElem = modalElem.querySelector("div.backdrop");
const modalFormElem = modalElem.querySelector("form.modal-form");

const fadeOutKeyframes = [{ opacity: 1 }, { opacity: 0 }];
const fadeInKeyframes = [{ opacity: 0 }, { opacity: 1 }];
const animationOptions = { duration: 300, easing: "ease-in-out" };

const closeModalHandler = async () => {
  modalBackdropElem.animate(fadeOutKeyframes, animationOptions).finished;
  await modalFormElem.animate(fadeOutKeyframes, animationOptions).finished;
  modalTextPlaceholder.innerText = 'برای انتخاب فایل کلیک کنید'
  modalElem.style.display = "none";
};
const openModalHandler = async (url) => {
  modalInputElem.value = "";
  modalElem.style.display = "";
  modalFormElem.setAttribute('action', url)
  modalBackdropElem.animate(fadeInKeyframes, animationOptions).finished;
  await modalFormElem.animate(fadeInKeyframes, animationOptions).finished;
};

modalInputElem.addEventListener('change', (ev) => {
  const file = ev.target?.files[0];

  if (file) {
    modalTextPlaceholder.innerText = file.name;
  }
})

closeBtn.addEventListener("click", closeModalHandler);
