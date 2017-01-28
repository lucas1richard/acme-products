// -
//  --
//   --- This is the main prototype
//  --
// -
function CustomMethods(obj) {
  for (var attr in obj) {
    if (!obj.hasOwnProperty(attr)) {
      continue;
    }
    this[attr] = obj[attr];
    switch (attr) {
      case 'trgt': {
        this.divObj.setAttribute('target', this.trgt);
        break;
      }
      case 'hrf': {
        this.divObj.setAttribute('href', this.hrf);
        break;
      }
      case 'clss': {
        this.divObj.setAttribute('class', this.clss);
        break;
      }
      case 'style': {
        this.divObj.setAttribute('style', this.style);
        break;
      }
      case 'identity': {
        this.divObj.setAttribute('id', this.identity);
        this.divObj.setAttribute('name', this.identity);
        break;
      }
      case 'txt': {
        this.divObj.innerText = this.txt;
        break;
      }
      case 'clck': {
        this.divObj.addEventListener('click', this.clck);
        break;
      }
      case 'chnge': {
        this.divObj.addEventListener('change', this.chnge);
        break;
      }
      case 'forInp': {
        this.divObj.setAttribute('for', this.forInp);
        break;
      }
      default: { continue; }
    }
  }

  if (this.appendTo) {
    this.appendSelf(this.appendTo);
    this.setParent(this.appendTo);
  }
}
CustomMethods.prototype.chngID = function(ID) {
  this.identity = ID;
  this.divObj.setAttribute('id', this.identity);
};
CustomMethods.prototype.setStyle = function(styleObj) {
  var styl = '';
  for (var attr in styleObj) {
    if (!styleObj.hasOwnProperty(attr)) {
      continue;
    }
    styl += attr + ': ' + styleObj[attr] + ';';
  }
  this.divObj.setAttribute('style', styl);
};
CustomMethods.prototype.changeClass = function(newClass) {
  this.clss = newClass;
  this.divObj.setAttribute('class', newClass);
};
CustomMethods.prototype.append = function(variable) {
  if (variable instanceof HTMLElement) this.divObj.appendChild(variable);
  else this.divObj.appendChild(variable.divObj);
};
CustomMethods.prototype.remove = function(variable) {
  this.divObj.removeChild(variable.divObj);
};
CustomMethods.prototype.setAttr = function(attr, val, obj) {
  if (typeof attr === 'object') {
    for (var key in attr) {
      if (!attr.hasOwnProperty(key)) continue;
      this[key] = attr[key];
      this.divObj.setAttribute(key, attr[key]);
    }
  } else {
  this[attr] = val;
  if (!obj) this.divObj.setAttribute(attr, val);
  }
};
CustomMethods.prototype.removeAttr = function(attr, obj) {
  this[attr] = null;
  if (!obj) this.divObj.removeAttribute(attr);
};
CustomMethods.prototype.val = function(value) {
  if (value) {
    this.divObj.value = value;
    this.value = value;
  } else if (this.divObj.type === 'number') {
    return parseFloat(this.divObj.value);
  } else {
    return this.divObj.value;
  }
};
CustomMethods.prototype.appendSelf = function(target) {
  if (target instanceof HTMLElement) {
    target.appendChild(this.divObj);
  } else {
    target.append(this);
  }
};
CustomMethods.prototype.removeSelf = function() {
  if (this.divObj.parentNode) {
    this.divObj.parentNode.removeChild(this.divObj);
  } else {
    console.log('The element below is not on the DOM: ');
    console.log(this.divObj);
  }
};
CustomMethods.prototype.css = function(cssChanges) {
  if (!cssChanges) {
    this.divObj.removeAttribute('style');
    return;
  }
  for (var key in cssChanges) {
    if (!cssChanges.hasOwnProperty(key)) continue;
    this.divObj.style[key] = cssChanges[key];
  }
};
CustomMethods.prototype.setParent = function(target) {
  if (typeof target === 'object') {
    this.parentObj = target;
    this.divObj.parentObj = target;
  } else {
    throw new TypeError('The target is not an object. You can set references with setAttr()');
  }
};
CustomMethods.prototype.addClass = function(clss) {
  this.divObj.className += ' ' + clss;
};


function KYM_Button(obj) {
  this.divObj = document.createElement('button');
  CustomMethods.call(this, obj);
  if (this.type) this.divObj.setAttribute('type', this.type);
}
KYM_Button.prototype = Object.create(CustomMethods.prototype);
KYM_Button.prototype.constructor = KYM_Button;


function DivElem(obj) {
  if (obj.type) {
    this.divObj = document.createElement(obj.type);
  } else {
    this.divObj = document.createElement('div');
  }
  CustomMethods.call(this, obj);
}
DivElem.prototype = Object.create(CustomMethods.prototype);
DivElem.prototype.val = function(txt) {
  if (txt) {
    this.divObj.innerText = txt;
  } else {
    return this.divObj.innerText;
  }
};
DivElem.prototype.constructor = DivElem;


function LinkElem(obj) {
  this.hrf = '#';
  this.divObj = document.createElement('a');
  CustomMethods.call(this, obj);
}
LinkElem.prototype = Object.create(CustomMethods.prototype);
LinkElem.prototype.constructor = LinkElem;


function JSelection(obj) {
  for (var attr in obj) {
    if (!obj.hasOwnProperty(attr)) {
      continue;
    }
    this[attr] = obj[attr];
  }

  this.divObj = document.createElement('select');
  // if (this.identity) this.divObj.setAttribute('id', this.identity);
  // if (this.identity) this.divObj.setAttribute('name', this.identity);
  // if (this.clss) this.divObj.setAttribute('class', this.clss);
  // if (this.style) this.divObj.setAttribute('style', this.style);
  // if (this.type) this.divObj.setAttribute('type', this.type);
  // if (this.chnge) this.divObj.addEventListener('change', this.chnge);
  CustomMethods.call(this, obj);
  var i = 0;
  for (i = 0;i < this.options.length;i++) {
    if (this.options[i].val) {
      var option = document.createElement('option');
      option.setAttribute('value', this.options[i].val);
      var optTxt = document.createTextNode(this.options[i].txt);
      option.appendChild(optTxt);
      this.divObj.appendChild(option);
      if (this.options[i].sel) {
        option.setAttribute('selected', true);
      }
    } else if (this.options[i].sel) {
      option = document.createElement('option');
      option.setAttribute('value', this.options[i].txt);
      optTxt = document.createTextNode(this.options[i].txt);
      option.appendChild(optTxt);
      this.divObj.appendChild(option);
      if (this.options[i].sel) {
        option.setAttribute('selected', true);
      }
    } else {
      option = document.createElement('option');
      option.setAttribute('value', this.options[i]);
      optTxt = document.createTextNode(this.options[i]);
      option.appendChild(optTxt);
      this.divObj.appendChild(option);
    }
  }
  if (this.value) {
    this.divObj.value = this.value;
  }
  if (this.appendTo) {
    this.appendSelf(this.appendTo);
    this.setParent(this.appendTo);
  }
}
JSelection.prototype = Object.create(CustomMethods.prototype);
JSelection.prototype.removeOption = function(index) {
  this.divObj.removeChild(this.divObj.childNodes[index]);
};
JSelection.prototype.getTxt = function() {
  var selVal = this.val();
  for (var i = 0; i < this.options.length; i++) {
    if (this.options[i].val === selVal) {
      return this.options[i].txt;
    }
  }
};
JSelection.prototype.constructor = JSelection;


function NumInput(obj) {
  this.divObj = document.createElement('input');
  this.divObj.setAttribute('type', 'number');
  CustomMethods.call(this, obj);
  if (this.identity) {
    this.divObj.setAttribute('id', this.identity);
    this.divObj.setAttribute('name', this.identity);
  }
  if (this.min) this.divObj.setAttribute('min', parseFloat(this.min));
  if (this.max) this.divObj.setAttribute('max', parseFloat(this.max));
  if (this.step) this.divObj.setAttribute('step', this.step);
  if (this.clss) this.divObj.setAttribute('class', this.clss);
  if (this.chnge) this.divObj.addEventListener('change', this.chnge);
  if (this.style) this.divObj.setAttribute('style', this.style);
  if (this.placeholder) this.divObj.setAttribute('placeholder', this.placeholder);

  if (this.appendTo) {
    this.appendSelf(this.appendTo);
    this.setParent(this.appendTo);
  }
}
NumInput.prototype = Object.create(CustomMethods.prototype);
NumInput.prototype.constructor = NumInput;


function TxtInput(obj) {
  for (var attr in obj) {
    if (!obj.hasOwnProperty(attr)) {
      continue;
    }
    this[attr] = obj[attr];
  }
  this.divObj = document.createElement('input');
  this.divObj.setAttribute('type', 'text');

  if (this.identity) {
    this.divObj.setAttribute('id', this.identity);
    this.divObj.setAttribute('name', this.identity);
  }
  if (this.clss) this.divObj.setAttribute('class', this.clss);
  if (this.chnge) this.divObj.addEventListener('change', this.chnge);
  if (this.placeholder) this.divObj.setAttribute('placeholder', this.placeholder);
  if (this.value) this.divObj.setAttribute('value', this.value);

  if (this.appendTo) {
    this.appendSelf(this.appendTo);
    this.setParent(this.appendTo);
  }
}
TxtInput.prototype = Object.create(CustomMethods.prototype);
NumInput.prototype.constructor = TxtInput;


function KYM_Text(obj) {
  for (var attr in obj) {
    if (!obj.hasOwnProperty(attr)) {
      continue;
    }
    this[attr] = obj[attr];
  }

  this.divObj = document.createTextNode(this.txt);
  if (this.appendTo) {
    this.appendSelf(this.appendTo);
  }
}
KYM_Text.prototype = Object.create(CustomMethods.prototype);
KYM_Text.prototype.val = function(txt) {
    var parent = this.divObj.parentNode;
    var tmp = document.createTextNode(txt);
    parent.replaceChild(tmp, this.divObj);
    this.divObj = tmp;
  };
KYM_Text.prototype.constructor = KYM_Text;


function Label(obj) {
  this.divObj = document.createElement('label');
  CustomMethods.call(this, obj);
}
Label.prototype = Object.create(CustomMethods.prototype);
Label.prototype.constructor = Label;


// Object should include the following parameters:
// - clss
// - title
// - bodyContent
// - footerContent
function Panel(obj) {
  this.clss = 'default';
  for (var attr in obj) {
    if (!obj.hasOwnProperty(attr)) {
      continue;
    }
    this[attr] = obj[attr];
  }

  this.thePanel = new DivElem({clss: 'panel panel-' + this.clss});

  this.divObj = this.thePanel.divObj;

  this.heading = new DivElem({appendTo: this.thePanel, clss: 'panel-heading'});
  if (this.panelBody !== false) this.panelBody = new DivElem({appendTo: this.thePanel, clss: 'panel-body'});
  this.footer = new DivElem({appendTo: this.thePanel, clss: 'panel-footer'});

  if (this.title) {
    var h4 = new DivElem({appendTo: this.heading, type: 'h4', clss: 'panel-title'});
    var title = new KYM_Text({appendTo: h4, txt: this.title});
  }
  if (this.bodyContent) {
    if (typeof this.bodyContent === 'string') {
      var bodyContent = new KYM_Text({appendTo: this.panelBody, txt: this.bodyContent});
    }
    if (typeof this.bodyContent === 'object') {
      this.bodyContent.appendSelf(this.panelBody);
    }
  }
  if (this.footerContent) {
    if (typeof this.footerContent === 'string') {
      var footerContent = new KYM_Text({appendTo: this.footer, txt: this.footerContent});
    }
    if (typeof this.footerContent === 'object') {
      this.footerContent.appendSelf(this.footer);
    }
  }
  if (this.appendTo) {
    this.appendSelf(this.appendTo);
    this.setParent(this.appendTo);
  }
}
Panel.prototype = Object.create(CustomMethods.prototype);
Panel.prototype.constructor = Panel;


function Table(obj) {
  this.clss = 'table table-condensed';
  for (var attr in obj) {
    if (!obj.hasOwnProperty(attr)) {
      continue;
    }
    this[attr] = obj[attr];
  }

  this.divObj = document.createElement('table');

  this.head = document.createElement('thead');
  this.head.setAttribute('class', 'text-centered');
  this.body = document.createElement('tbody');
  this.caption = document.createElement('caption');

  this.divObj.appendChild(this.head);
  this.divObj.appendChild(this.body);
  this.divObj.setAttribute('class', this.clss);
  if (this.captionTxt) {
    this.captionTxt = new KYM_Text({appendTo: this.caption, txt: this.captionTxt});
    this.divObj.appendChild(this.caption);
  }
  if (this.heading) {
    var tr = document.createElement('tr');
    for (var i = 0; i < this.heading.length; i++) {
      var th = document.createElement('th');
      var txt = document.createTextNode(this.heading[i]);

      th.appendChild(txt);
      tr.appendChild(th);
    }
    this.head.appendChild(tr);
  }

  if (this.row) {
    for (i = 0; i < this.row.length; i++) {
      tr = document.createElement('tr');
      for (var j = 0; j < this.row[i].length; j++) {
        var td = document.createElement('td');
        if (this.row[i][j] instanceof HTMLElement) {
          td.appendChild(this.row[i][j]);
        }
        else if (typeof this.row[i][j] === 'string') {
          this.row[i][j] = new KYM_Text({txt: this.row[i][j], appendTo: td});
        }
        else if (typeof this.row[i][j] === 'number') {
          this.row[i][j] = new KYM_Text({txt: this.row[i][j], appendTo: td});
        }
        else if (typeof this.row[i][j] === 'object') {
          td = document.createElement('td');
          td.appendChild(this.row[i][j].divObj);
        }
        tr.appendChild(td);
      }
      this.body.appendChild(tr);
    }
  }
  if (this.appendTo) {
    this.appendSelf(this.appendTo);
    this.setParent(this.appendTo);
  }

}
Table.prototype = Object.create(CustomMethods.prototype);
Table.prototype.appendRow = function(rowArray, index) {
  if (!index) {
    this.row.push(rowArray);
    var tr = document.createElement('tr');
    for (var i = 0; i < rowArray.length; i++) {
      var td = document.createElement('td');
      if (rowArray[i] instanceof HTMLElement) {
        td.appendChild(rowArray[i]);
      } else if (typeof rowArray[i] === 'string' || typeof rowArray[i] === 'number') {
        this.row[this.row.length - 1][i] = new KYM_Text({txt: rowArray[i], appendTo: td});
      } else if (typeof rowArray[i] === 'object') {
        td.appendChild(rowArray[i].divObj);
      }
      tr.appendChild(td);
    }
    this.body.appendChild(tr);
  }
};
Table.prototype.appendHeading = function(headArray) {
  if (this.heading) this.heading.push(headArray);
  if (!this.heading) this.heading = headArray;
  var tr = document.createElement('tr');
  headArray.forEach(function(hd) {
    var th = document.createElement('th');
    if (hd instanceof HTMLElement) {
      th.appendChild(hd);
    } else if (typeof hd === 'string' || typeof hd === 'number') {
      var txt = document.createTextNode(hd);
      th.appendChild(txt);
    } else if (typeof hd === 'object') {
      th.appendChild(hd.divObj);
    }
    tr.appendChild(th);
  });
  this.head.appendChild(tr);
};
Table.prototype.changeCell = function(theRow, column, newThing) {
  theRow = parseInt(theRow, 10);
  column = parseInt(column, 10);
  var theCell = this.divObj.tBodies[0].rows[theRow].children[column];

  while (theCell.firstChild) theCell.removeChild(theCell.firstChild);
  theCell.appendChild(newThing.divObj);
  this.row[theRow][column] = newThing;
};
Table.prototype.cellAttribute = function(theRow, column, attribute, val) {
  theRow = parseInt(theRow, 10);
  column = parseInt(column, 10);
  var theCell = this.divObj.tBodies[0].rows[theRow].children[column];
  theCell.setAttribute(attribute, val);
};
Table.prototype.colAttribute = function(col, attr, val) {
  var column = parseInt(col, 10);
  for (var i = 0; i < this.row.length; i++) {
    var theCell = this.divObj.tBodies[0].rows[i].children[column];
    theCell.setAttribute(attr, val);
  }
};
Table.prototype.constructor = Table;


function cleanOut(element, del) {
  if (element instanceof HTMLElement) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  } else {
    while (element.divObj.firstChild) {
      element.divObj.removeChild(element.divObj.firstChild);
    }
  }
}


function Space(target) {
  this.divObj = document.createTextNode(' ');
  this.appendSelf(target);
}
Space.prototype = Object.create(CustomMethods.prototype);
Space.prototype.constructor = Space;


Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

var DateDiff = {
  inDays: function(d1, d2) {
    return parseFloat((d2.getTime() - d1.getTime()) / (24 * 3600 * 1000));
  },
  inWeeks: function(d1, d2) {
    return parseFloat((d2.getTime() - d1.getTime()) / (24 * 3600 * 1000));
  },
  inMonths: function(d1, d2) {
    return (d2.getMonth() + 12 * d2.getFullYear()) - (d1.getMonth() + 12 * d1.getFullYear());
  },
  inYears: function(d1, d2) {
    return d2.getFullYear() - d1.getFullYear();
  }
};

function formatDate(date) {
  var dt = new Date(date),
    month = '' + (dt.getMonth() + 1),
    day = '' + dt.getDate(),
    year = dt.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
