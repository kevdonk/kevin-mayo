(function() {
var DEFAULT_ROUTE = 'one';
var template = document.querySelector('#t');
var ajax, pages, scaffold;
var cache = {};

template.pages = [
  {name: 'Posts', icon: 'assignment', hash: 'one', url: '/posts/index.html'},
  {name: 'Projects', icon: 'folder', hash: 'two', url: '/projects/index.html'},
  {name: 'Reading List', icon: 'list', hash: 'three', url: 'reading-list.html'},
  {name: 'About', icon: 'info', hash: 'four', url: 'about.html'},
  ];

template.addEventListener('template-bound', function() {
  scaffold = document.querySelector('#scaffold');
  ajax = document.querySelector('#ajax');
  pages = document.querySelector('#pages');

  this.route = this.route || DEFAULT_ROUTE;  
});

template.menuItemSelected = function(e, detail, sender) {
  if (detail.isSelected) {
    this.async(function() {
      if (!cache[ajax.url]) {
        ajax.go();
      }
      scaffold.closeDrawer();
    });
  }
};

template.ajaxLoad = function(e, detail, sender) {
  e.preventDefault();
};

template.onResponse = function(e, detail, sender) {
  var article = detail.response.querySelector('article');
  var html = article.innerHTML;
  cache[ajax.url] = html;
  this.injectBoundHTML(html, pages.selectedItem.firstElementChild);
};

})();