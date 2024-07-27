console.log("Made with 💜");

(function () {
  const App = {
    // les constantes
    isLiked: false,
    // les éléments du DOM
    DOM: {
      menuIcon: document.querySelector(".header-open-nav"),
      menuNav: document.querySelector(".header-nav"),
      btnLike: document.querySelector(".like"),
      btnOpenModal: document.querySelector(".share-btn"),
      btnCloseModal: document.querySelector(".share-modal-btn"),
      modal: document.querySelector(".share-modal"),
      socialBtns: document.querySelectorAll(".share-social-btn"),
      firstSocialBtn: document.querySelector("#share-social-btn1"),
      btnsAccordion: document.querySelectorAll(".accordion-btn"),
    },

    /**
     * Initialisation de l'application.
     */
    app_init: function () {
      App.app_handlers();
    },

    /**
     * Mise en place des gestionnaires d'évènements.
     */
    app_handlers: function () {
      window.addEventListener("resize", App.handleScreenResize);
      App.registerServiceWorker();
      App.handleOpenAccordion();
      App.DOM.menuIcon.addEventListener("click", App.handleMenuToggle);
      App.DOM.btnOpenModal?.addEventListener("click", App.handleOpenModal);
      App.DOM.btnCloseModal?.addEventListener("click", App.handleCloseModal);
      App.DOM.socialBtns?.forEach((btn) => {
        btn.addEventListener("click", App.handleShare);
      });
      // App.DOM.btnLike?.addEventListener("click", App.handleLikeToggle);
    },
    /**
     * Mise en place du service worker
     */
    registerServiceWorker: async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register(
            "/service-worker.js"
          );
          if (registration.installing) {
            console.log("Installation du service worker en cours");
          } else if (registration.waiting) {
            console.log("Service worker installé");
          } else if (registration.active) {
            console.log("Service worker actif");
          }
        } catch (error) {
          console.error(`L'enregistrement a échoué : ${error}`);
        }
      }
    },
    handleMenuToggle: () => {
      App.DOM.menuIcon.classList.toggle("is-open");
      App.DOM.menuNav.classList.toggle("is-open");
      document.documentElement.classList.toggle("scroll-locked");
      if (App.DOM.menuNav.classList.contains("is-open")) {
        App.DOM.menuNav.setAttribute("aria-hidden", true);
        App.DOM.menuIcon.setAttribute("aria-expanded", true);
      } else {
        App.DOM.menuNav.setAttribute("aria-hidden", false);
        App.DOM.menuIcon.setAttribute("aria-expanded", false);
      }
    },
    handleScreenResize: (e) => {
      if (e.target.matchMedia("(max-width:768px)").matches) {
        App.DOM.menuNav.setAttribute("aria-hidden", true);
      } else {
        App.DOM.menuNav.setAttribute("aria-hidden", false);
        App.DOM.menuIcon.setAttribute("aria-expanded", false);
      }
    },
    handleLikeToggle: async () => {
      if (!App.isLiked) {
        App.isLiked = true;
        App.DOM.btnLike.classList.add("isLiked");
      } else {
        App.isLiked = false;
        App.DOM.btnLike.classList.remove("isLiked");
      }
      console.log(App.isLiked);
    },
    handleOpenModal: () => {
      App.DOM.modal.classList.add("isOpen");
      App.DOM.modal.setAttribute("aria-hidden", false);
      App.DOM.btnOpenModal.setAttribute("aria-expanded", true);
      App.DOM.firstSocialBtn.focus();
    },
    handleCloseModal: () => {
      App.DOM.modal.classList.remove("isOpen");
      App.DOM.modal.setAttribute("aria-hidden", true);
      App.DOM.btnOpenModal.setAttribute("aria-expanded", false);
    },
    handleShare: (e) => {
      const social = e.currentTarget.dataset.social;
      const url = e.currentTarget.dataset.url;
      if (social == "facebook") {
        const navUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        window.open(navUrl, "_blank");
        return;
      }
      if (social == "twitter") {
        const navUrl = `https://twitter.com/intent/tweet?text=${url}`;
        window.open(navUrl, "_blank");
        return;
      }
      if (social == "linkedin") {
        const navUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        window.open(navUrl, "_blank");
        return;
      }
      if (social == "copy") {
        navigator.clipboard.writeText(url).then(() => {
          alert("Lien copié dans votre presse-papiers");
        });
        return;
      }
    },
    handleOpenAccordion: () => {
      for (let i = 0; i < App.DOM.btnsAccordion.length; i++) {
        const button = App.DOM.btnsAccordion[i];
        button.addEventListener("click", () => {
          for (let j = 0; j < App.DOM.btnsAccordion.length; j++) {
            if (j != i) {
              App.DOM.btnsAccordion[j].nextElementSibling.style.maxHeight =
                null;
              App.DOM.btnsAccordion[j].setAttribute("aria-expanded", false);
              App.DOM.btnsAccordion[j].classList.remove("isOpen");
            }
          }
          button.classList.toggle("isOpen");
          if (button.classList.contains("isOpen")) {
            button.setAttribute("aria-expanded", true);
          } else {
            button.setAttribute("aria-expanded", false);
          }
          const collapseElement = button.nextElementSibling;
          if (collapseElement.style.maxHeight) {
            collapseElement.style.maxHeight = null;
          } else {
            collapseElement.style.maxHeight = `${collapseElement.scrollHeight}px`;
          }
        });
      }
    },
  };

  window.addEventListener("DOMContentLoaded", App.app_init);
})();
