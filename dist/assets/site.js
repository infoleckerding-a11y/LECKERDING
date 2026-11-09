// All meals and their details stay readable without JavaScript.
const bar = document.querySelector('[data-filters]');

if (bar) {
  const buttons = [...bar.querySelectorAll('[data-filter]')];
  const meals = [...document.querySelectorAll('article[data-category]')];
  const allergen = bar.querySelector('select');
  const count = bar.querySelector('.count');
  const empty = document.querySelector('[data-empty]');
  let category = 'alle';

  function update() {
    let visible = 0;
    for (const meal of meals) {
      const matchesCategory = category === 'alle' || meal.dataset.category === category;
      const allergens = meal.dataset.allergens.split(' ');
      meal.hidden = !matchesCategory || allergens.includes(allergen.value);
      if (!meal.hidden) visible += 1;
    }
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(category === button.dataset.filter));
    }
    count.textContent = visible === 1 ? '1 Gericht' : visible + ' Gerichte';
    empty.hidden = visible !== 0;
  }
  function reset() {
    category = 'alle';
    allergen.value = '';
    update();
  }
  for (const button of buttons) {
    button.addEventListener('click', () => {
      category = button.dataset.filter;
      update();
    });
  }
  allergen.addEventListener('change', update);
  empty.querySelector('button').addEventListener('click', () => {
    reset();
    buttons[0].focus();
  });
  window.addEventListener('hashchange', () => {
    const target = document.getElementById(location.hash.slice(1));
    if (target?.hidden && meals.includes(target)) {
      reset();
      target.scrollIntoView();
    }
  });
  update();
  bar.hidden = false;
}
