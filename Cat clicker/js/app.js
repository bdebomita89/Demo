var model = {
  currentCat: {},
  cats: [
    {name: "one",
    clicks: 0,
    url: "img/cat1.jpg"},
    {name: "two",
    clicks: 0,
    url: "img/cat2.jpg"},
    {name: "three",
    clicks: 0,
    url: "img/cat3.jpg"},
    {name: "four",
    clicks: 0,
    url: "img/cat4.jpg"},
    {name: "five",
    clicks: 0,
    url: "img/cat5.jpg"}
  ]
};


var viewList = {
  createList: function () {
    let cats = octopus.getCats();
    cats.forEach(function(i) {
      let newcat = document.createElement("h4");
      newcat.innerHTML = i.name;
      newcat.setAttribute("class", 'cat');
      document.querySelector('.choose').appendChild(newcat);
      newcat.addEventListener('click', (function(catCopy) {
          return function() {
              octopus.setCurrentCat(catCopy);
              viewCat.render();
          };
      })(i));
    });
  }
};

var viewCat = {
  render: function() {
      var currentCat = octopus.getCurrentCat();
      let name = document.getElementById('name');
      let click = document.getElementById('clicks');
      let chooseC = document.getElementById('chooseC');
      const allC = document.querySelectorAll('.cat');

      name.innerHTML = "Name: " + currentCat.name;
      click.innerHTML = "Clicks: " + currentCat.clicks;
      chooseC.setAttribute("src", currentCat.url);

      chooseC.addEventListener('click', function() {
        let cli = octopus.addClick();
        click.innerHTML = "Clicks: " + cli;
      });
  }
};

var octopus = {
  init: function() {
      viewList.createList();
  },

  getCats: function () {
      return model.cats;
  },

  setCurrentCat: function(cat) {
      model.currentCat = cat;
  },

  getCurrentCat: function() {
      return model.currentCat;
  },

  storeClicks: function() {
      for (i in model.cats) {
        if (i.name === model.currentCat.name) {
            i.clicks = model.currentCat.clicks;
        };
      };
  },

  addClick: function () {
    model.currentCat.clicks++;
    octopus.storeClicks();
    return model.currentCat.clicks;
  }
};

octopus.init();
