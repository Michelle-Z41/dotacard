game.states.unsupported = {
  build: function () {
    this.box = $('<div>').appendTo(this.el).addClass('box');
    this.logo = $('<div>').appendTo(this.box).addClass('logo slide');
    this.title = $('<img>').appendTo(this.logo).attr({alt: 'DOTA', src: 'img/title.png'}).addClass('h1');
    this.subtitle = $('<img>').appendTo(this.logo).attr({alt: 'CARD', src: 'img/subtitle.png'}).addClass('h2');
    this.h2 = $('<h1>').appendTo(this.box).html('DotaCard requires a <i>modern browser</i>');
    this.p = $('<p>').appendTo(this.box).html('<a href="http://whatbrowser.org/" target="_blank">How can I get a <i>modern browser</i>?</a>');
  }
};