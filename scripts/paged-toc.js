/* ===== NUMÉROS DE PAGES DANS LE SOMMAIRE (liés aux href="#id") ===== */

function esc(sel) {
  if (window.CSS && CSS.escape) return CSS.escape(sel);
  return sel.replace(/([ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, "\\$1");
}

class TOCPages extends Paged.Handler {
  afterRendered() {
    const pagesRoot = document.querySelector(".pagedjs_pages");
    if (!pagesRoot) {
      console.warn("Paged.js non actif");
      return;
    }

    // On prend TOUS les liens du sommaire accordéon
    const toc = document.getElementById("toc-accordion");
    if (!toc) return;

    const links = toc.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      const id = link.getAttribute("href").replace("#", "");
      if (!id) return;

      // On cherche la section CLONÉE dans pagedjs_pages
      const section = pagesRoot.querySelector("#" + esc(id));
      if (!section) return;

      const page = section.closest(".pagedjs_page");
      if (!page) return;

      const pageNumber = page.dataset.pageNumber;

      const slot = link.querySelector(".toc-page");
      if (slot) {
        slot.textContent = `p. ${pageNumber}`;
      }
    });

    console.log("✅ Pages ajoutées au sommaire (accordéon)");
  }
}

Paged.registerHandlers(TOCPages);
