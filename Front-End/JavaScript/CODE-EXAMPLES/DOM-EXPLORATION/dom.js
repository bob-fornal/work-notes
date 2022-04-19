
class Nodes {
  
  items = [];  
  container = null;
  
  index = 0;
  display = null;
  
  constructor(items) {
    this.items = [...items];
    this.container = document.getElementById('container');
    this.init();
    
    this.display = document.getElementById('display');
    this.displayItem();
    this.handleNextPreviousSetup();
  }
  
  displayItem = () => {
    this.checkIndex();
    if (this.items.length > 0) {
      this.display.innerText = this.items[this.index].title;      
    } else {
      this.display.innerText = 'NONE';
    }
  };
  
  checkIndex = () => {
    if (this.index > this.items.length - 1) {
      this.index = this.items.length - 1;
    }    
  };
  
  handleNextPreviousSetup = () => {
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    
    prev.addEventListener('click', () => {
      this.handlePrevClick();
    });
    next.addEventListener('click', () => {
      this.handleNextClick();
    });
  };
  
  handlePrevClick = () => {
    const newIndex = this.index - 1;
    this.index = newIndex < 0 ? this.items.length - 1 : newIndex;
    this.displayItem();
  };

  handleNextClick = () => {
    const newIndex = this.index + 1;
    this.index = newIndex === this.items.length ? 0 : newIndex;
    this.displayItem();
  };

  init = () => {
    const appendItems = [];
    for(let i = 0, len = this.items.length; i < len; i++) {
      const item = this.generateItem(this.items[i], i);
      appendItems.push(item);
    }
    this.container.append(...appendItems);
    this.initHandlers();
  };
  
  initHandlers = () => {
    const handlers = document.getElementsByClassName('remove-item');
    for(let item of handlers) {
      item.addEventListener('click', (event) => {
        this.handleClick(event);
      });
    }
  };
  
  removeHandlers = () => {
    const handlers = document.getElementsByClassName('remove-item');
    for(let item of handlers) {
      item.removeEventListener('click', (event) => {
        this.handleClick(event);
      });
    }
  };
  
  handleClick = (event) => {
    const parent = event.target.parentElement;
    const index = parent.getAttribute('data');

    this.removeHandlers();
    this.items.splice(index, 1);
    
    this.container.innerHTML = '';
    this.init();
    
    this.displayItem();
  };
  
  generateItem = (data, index) => {
    const item = document.createElement('div');
    this.generateMinus(item, data.title);

    item.classList.add('item');
    item.style.backgroundColor = data.bgcolor;
    item.setAttribute('data', index);

    // if (data.hasOwnProperty('fgcolor') === true) {
    if (('fgcolor' in data) === true) {
      item.style.color = data.fgcolor;
    }
    return item;
  };
  
  generateMinus = (item, title) => {
    const addTitle = document.createElement('span');
    addTitle.innerText = title;
    
    const addMinus = document.createElement('span');
    addMinus.classList.add('remove-item');
    addMinus.innerText = '-';
    
    item.append(addTitle, addMinus);
    return item;
  };
  
}

// const nodes = new Nodes(outerData);

class IndividualNode {

  element = null;

  constructor(index, container, title, bgcolor = 'white', fgcolor = 'black') {
    this.generate(index, container, bgcolor, fgcolor, title);
    this.display();
  }

  generate = (index, container, bgcolor, fgcolor, title = `${ this.index }`) => {
    const id = `item-${ index }`;

    const item = document.createElement('div');
    item.classList.add('item', 'hidden');
    item.setAttribute('id', id);

    item.innerText = title;
    item.style.backgroundColor = bgcolor;
    item.style.color = fgcolor;

    container.append(item);
    this.element = document.getElementById(id);
    this.generateClickEvents();
  };

  display = () => {
    this.element.classList.remove('hidden');
  };
  hide = () => {
    this.element.classList.add('hidden');
  };

  generateClickEvents = () => {
    this.element.addEventListener('click', () => {
      this.hide();
      setTimeout(() => {
        this.display();
      }, 5000);
    });
  };

}

const outerData = [
  { title: "One", bgcolor: 'red', fgcolor: 'white' },
  { title: "Two", bgcolor: 'green', fgcolor: 'white' },
  { title: "Three", bgcolor: 'lightblue', fgcolor: 'blue' },
  { title: "Four", bgcolor: 'salmon', fgcolor: 'white' },
  { title: "Five", bgcolor: 'tan' },
  { title: "Six", bgcolor: 'pink' }
];

class UseIndividualNodes {

  data = [];
  container = null;
  nodeHandler = IndividualNode;

  constructor(data) {
    this.data = data;
    this.container = document.getElementById('container');
    this.generateNodes();
  }

  generateNodes = () => {
    this.data.forEach((item, index) => {
      item.node = new IndividualNode(index, this.container, item.title, item.bgcolor, item.fgcolor || 'black');
    });
  };

}

const usingNodes = new UseIndividualNodes(outerData);
