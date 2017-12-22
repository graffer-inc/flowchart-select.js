var Symbol = require('./flowchart.symbol');
var inherits = require('./flowchart.helpers').inherits;
var drawAPI = require('./flowchart.functions');
var drawPath = drawAPI.drawPath;

function Select(chart, options) {
  options = options || {};
  Symbol.call(this, chart, options);
  this.textMargin = this.getAttr('text-margin');
  this.yes_direction = 'bottom';
  this.no_direction = 'right';
  this.params = options.params;
  if (options.yes && options.direction_yes && options.no && !options.direction_no) {
    if (options.direction_yes === 'right') {
      this.no_direction = 'bottom';
      this.yes_direction = 'right';
    } else {
      this.no_direction = 'right';
      this.yes_direction = 'bottom';
    }
  } else if (options.yes && !options.direction_yes && options.no && options.direction_no) {
    if (options.direction_no === 'right') {
      this.yes_direction = 'bottom';
      this.no_direction = 'right';
    } else {
      this.yes_direction = 'right';
      this.no_direction = 'bottom';
    }
  } else {
    this.yes_direction = 'bottom';
    this.no_direction = 'right';
  }

  this.yes_direction = this.yes_direction || 'bottom';
  this.no_direction = this.no_direction || 'right';

  this.text.attr({
    x: this.textMargin * 2
  });

  var width = this.text.getBBox().width + 3 * this.textMargin;
  width += width / 2;
  var height = this.text.getBBox().height + 2 * this.textMargin;
  height += height / 2;
  height = Math.max(width * 0.5, height);
  var startX = width / 4;
  var startY = height / 4;

  this.text.attr({
    x: startX + this.textMargin / 2
  });

  var start = {x: startX, y: startY};
  var points = [
    {x: startX - width / 4, y: startY + height / 4},
    {x: startX - width / 4 + width / 2, y: startY + height / 4 + height / 2},
    {x: startX - width / 4 + width, y: startY + height / 4},
    {x: startX - width / 4 + width / 2, y: startY + height / 4 - height / 2},
    {x: startX - width / 4, y: startY + height / 4}
  ];

  var symbol = drawPath(chart, start, points);

  symbol.attr({
    stroke: this.getAttr('element-color'),
    'stroke-width': this.getAttr('line-width'),
    fill: this.getAttr('fill')
  });
  if (options.link) {
    symbol.attr('href', options.link);
  }
  if (options.target) {
    symbol.attr('target', options.target);
  }
  if (options.key) {
    symbol.node.id = options.key;
  }
  symbol.node.setAttribute('class', this.getAttr('class'));

  this.text.attr({
    y: symbol.getBBox().height / 2
  });

  this.group.push(symbol);
  symbol.insertBefore(this.text);

  this.initialize();
}

inherits(Select, Symbol);

Select.prototype.render = function () {

  var lineLength = this.getAttr('line-length');
  for (var j = 1; j < 11; j++) {
    var label = 'option' + j + '_symbol';

    if (this[label] && !this[label].isPositioned) {

      var bottomPoint = this.getBottom();

      this[label].shiftY(this.getY() + this.height + lineLength);
      this[label].setX(bottomPoint.x - this[label].width / 2 + (this.width + lineLength) * (j -1));

      this[label].isPositioned = true;

      this[label].render();
    }
  }

};

Select.prototype.renderLines = function () {

  for (var j = 1; j < 11; j++) {
    var label = 'option' + j;
    if (this[label + '_symbol']) {
      this.drawLineTo(this[label + '_symbol'], this.getAttr(label + '-text'), 'bottom');
    }
  }

};

module.exports = Select;
