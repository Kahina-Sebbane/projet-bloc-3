/* ===== NUMÉROS DE PAGES DANS LE SOMMAIRE (via ID) – PAGED.JS ===== */

class TOCPagesById extends Paged.Handler {
  afterRendered() {
    const tocRoot = document.getElementById("toc-accordion");
    if (!tocRoot) return;

    // Tous les liens internes du sommaire
    const links = tocRoot.querySelectorAll('a[href^="#"]');

    links.forEach((a) => {
      const href = a.getAttribute("href") || "";
      const id = href.replace("#", "").trim();
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      // On cherche la page paged.js qui contient la section cible
      const pageEl = target.closest(".pagedjs_page");
      if (!pageEl || !pageEl.dataset.pageNumber) return;

      const pageNumber = pageEl.dataset.pageNumber;

      // On remplit le span .toc-page si présent
      const slot = a.querySelector(".toc-page");
      if (slot) slot.textContent = `p. ${pageNumber}`;
    });
  }
}

Paged.registerHandlers(TOCPagesById);
