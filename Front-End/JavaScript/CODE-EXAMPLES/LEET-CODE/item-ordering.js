
const entries1 = [
  ['INSERT', 'milk', '4'],
  ['INSERT', 'coffee', '3'],
  ['VIEW', '-', '-'],
  ['INSERT', 'pizza', '5'],
  ['INSERT', 'gum', '1'],
  ['VIEW', '-', '-']
];

let viewIndex = 0;
let items = [];

function getItems(entries) {
  entries.forEach(([ type, product, cost ]) => {
    if (type === 'INSERT') {
      insertNewItem(product, cost);
    } else {
      getNextLowestItem();
    }
  });
}

function insertNewItem (product, cost) {
  items.push({ product, cost });
  items.sort(sortByCost);
  console.log('db - point in time', items);
}

function sortByCost (a, b) {
  if (a.cost < b.cost) return -1;
  if (a.cost > b.cost) return 1;
  if (a.product < b.product) return -1;
  if (a.product > b.product) return 1;
  return 0;
}

function getNextLowestItem() {
  console.log('- VIEW', items[viewIndex].product);
  viewIndex = viewIndex + 1;
}

getItems(entries1);
