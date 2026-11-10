
(function () {
  "use strict";

  const root = document.getElementById("ld-meal-info");
  if (!root || root.dataset.initialized) return;
  root.dataset.initialized = "true";

  const query = root.querySelector("#ld-query");
  const allergen = root.querySelector("#ld-allergen");
  const count = root.querySelector("#ld-result-count");
  const empty = root.querySelector("#ld-empty");
  const buttons = Array.from(
    root.querySelectorAll("button[data-category]")
  );

  let category = "all";

  function normalize(value) {
    return String(value)
      .toLowerCase()
      .replace(/ß/g, "ss")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ae/g, "a")
      .replace(/oe/g, "o")
      .replace(/ue/g, "u");
  }

  function categoryMatches(meal, value) {
    if (value === "all") return true;

    if (value === "vegetarian") {
      return meal.category === "vegetarian" ||
             meal.category === "vegan";
    }

    if (value === "other") {
      return meal.category === "vegetarian-pending" ||
             meal.category === "animal-rennet";
    }

    return meal.category === value;
  }

  /*
    Der Filter liest die sichtbare Allergenübersicht, Spurenhinweise
    und Klärungshinweise. Diese Bereiche bei Rezeptänderungen
    vollständig aktualisieren.
  */
  const allergenPatterns = {
    gluten: /gluten|weizen|gerste|roggen|hafer|dinkel|kamut/,
    crustaceans: /krebstier|krestier|garnele|hummer|krabbe/,
    eggs: /\beier?\b|vollei|eigelb|eipulver|huhnerei/,
    fish: /\bfisch(?:e|en)?\b/,
    peanuts: /erdnuss/,
    soy: /soja/,
    milk: /\bmilch\b|kuhmilch|milchpulver|sahne|butter|kase|ricotta/,
    nuts: /schalenfrucht|\bnuss(?:e|en)?\b|mandel|haselnuss|walnuss|cashew|kaschu|pecannuss|paranuss|pistazie|macadamia|queenslandnuss/,
    celery: /sellerie/,
    mustard: /senf/,
    sesame: /sesam/,
    sulphites: /sulfit|schwefeldioxid/,
    lupin: /lupin/,
    molluscs: /weichtier|muschel|auster|schnecke|tintenfisch|calamari|oktopus/
  };

  const entries = Array.from(
    root.querySelectorAll(".ld-meal")
  ).map(function (card) {
    const allergyText = normalize(
      Array.from(
        card.querySelectorAll(".ld-allergens, .ld-traces, .ld-notes")
      ).map(function (section) {
        return section.textContent;
      }).join(" ")
    );

    return {
      card: card,
      meal: {
        id: card.id,
        category: card.dataset.category,
        enabled: card.dataset.enabled !== "false"
      },
      text: normalize(card.textContent),
      allergyText: allergyText,
      allergyUnresolved:
        /allergenangaben offen|allergenangaben unvollstandig|vollstandige allergenklarung.*nicht vor/
          .test(allergyText)
    };
  });

  const total = entries.filter(function (entry) {
    return entry.meal.enabled;
  }).length;

  function allergenMatches(entry, selectedAllergen) {
    if (selectedAllergen === "all") return true;

    const pattern = allergenPatterns[selectedAllergen];

    return Boolean(pattern) &&
           !entry.allergyUnresolved &&
           !pattern.test(entry.allergyText);
  }

  function matches(entry, search, selectedCategory, selectedAllergen) {
    const searchWords = normalize(search)
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    return entry.meal.enabled !== false &&
      categoryMatches(entry.meal, selectedCategory) &&
      allergenMatches(entry, selectedAllergen) &&
      searchWords.every(function (word) {
        return entry.text.includes(word);
      });
  }

  function render() {
    const selected = entries.filter(function (entry) {
      return matches(entry, query.value, category, allergen.value);
    });

    const selectedIds = new Set(
      selected.map(function (entry) {
        return entry.meal.id;
      })
    );

    entries.forEach(function (entry) {
      const visible = selectedIds.has(entry.meal.id);
      entry.card.hidden = !visible;

      if (query.value.trim()) {
        entry.card.open = visible && selected.length <= 3;
      }
    });

    buttons.forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.category === category)
      );
    });

    count.textContent =
      selected.length + " " +
      (selected.length === 1 ? "Gericht" : "Gerichte") +
      (selected.length !== total ? " von " + total : "");

    empty.hidden = selected.length !== 0;
  }

  function reset() {
    query.value = "";
    allergen.value = "all";
    category = "all";

    entries.forEach(function (entry) {
      entry.card.open = false;
    });

    render();
  }

  query.addEventListener("input", render);
  allergen.addEventListener("change", render);

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      category = button.dataset.category;
      render();
    });
  });

  root.querySelector("#ld-reset").addEventListener("click", function () {
    reset();
    query.focus();
  });

  root.querySelector("#ld-empty-reset").addEventListener("click", function () {
    reset();
    query.focus();
  });

  function openHash() {
    let id;

    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch (error) {
      return;
    }

    const entry = entries.find(function (item) {
      return item.meal.id === id && item.meal.enabled !== false;
    });

    if (!entry) return;

    reset();
    entry.card.open = true;

    requestAnimationFrame(function () {
      entry.card.scrollIntoView({ block: "start" });
    });
  }

  root.querySelectorAll(".ld-controls").forEach(function (control) {
    control.hidden = false;
  });

  render();
  openHash();
  window.addEventListener("hashchange", openHash);
})();
