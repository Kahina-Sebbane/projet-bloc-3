/* ===== SOMMAIRE + NUMÉROS DE PAGES (par ID) – PAGED.JS ===== */

function esc(sel) {
  if (window.CSS && CSS.escape) return CSS.escape(sel);
  return sel.replace(/([ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, "\\$1");
}

class TOCPagesById extends Paged.Handler {
  afterRendered() {
    const pagesRoot = document.querySelector(".pagedjs_pages");
    if (!pagesRoot) {
      console.warn("Paged.js non actif (.pagedjs_pages introuvable)");
      return;
    }

    /* ===== 1) SOMMAIRE PDF AUTOMATIQUE ===== */
    const pdfToc = document.getElementById("pdf-toc");
    if (pdfToc) {
      pdfToc.innerHTML = "";

      const headings = pagesRoot.querySelectorAll("section > h3");
      const ul = document.createElement("ul");
      ul.style.listStyle = "none";
      ul.style.padding = "0";
      ul.style.margin = "0";

      headings.forEach((h) => {
        const page = h.closest(".pagedjs_page");
        if (!page) return;

        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.gap = "12px";
        li.style.padding = "4px 0";
        li.style.borderBottom = "1px dotted rgba(255,255,255,.35)";
        li.style.fontSize = "13px";

        li.innerHTML = `
          <span>${h.textContent}</span>
          <span style="opacity:.75;white-space:nowrap;">p. ${page.dataset.pageNumber}</span>
        `;

        ul.appendChild(li);
      });

      pdfToc.appendChild(ul);
    }

    /* ===== 2) NUMÉROS DE PAGE DANS TON SOMMAIRE ACCORDÉON ===== */
    const tocRoot = document.getElementById("toc-accordion");
    if (!tocRoot) return;

    const links = tocRoot.querySelectorAll('a[href^="#"]');

    links.forEach((a) => {
      const href = a.getAttribute("href") || "";
      const id = href.slice(1).trim();
      if (!id) return;

      // On cherche la section DANS les pages paged.js
      const target = pagesRoot.querySelector("#" + esc(id));
      if (!target) return;

      const page = target.closest(".pagedjs_page");
      if (!page) return;

      const slot = a.querySelector(".toc-page");
      if (slot) slot.textContent = `p. ${page.dataset.pageNumber}`;
    });

    console.log("✅ Numéros de pages TOC générés");
  }
}

Paged.registerHandlers(TOCPagesById);
