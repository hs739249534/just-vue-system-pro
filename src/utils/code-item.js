const codeItem = {};

codeItem.setCodeList = function(list) {
  for (let i in list) {
    let code = list[i];
    let key = code.aaa100.toUpperCase() + "_" + code.aaa102.toUpperCase();
    localStorage.setItem(key, code.aaa103);
  }
};

codeItem.transCode = function(codeType, codeValue) {
  let returnValue;
  if (codeType === null || codeValue === null) {
    returnValue = "";
  } else {
    let key = codeType.toUpperCase() + "_" + codeValue.toUpperCase();
    returnValue = localStorage.getItem(key);
    if (returnValue === undefined || returnValue === null) {
      returnValue = "";
    }
  }
  return returnValue;
};

codeItem.getCodeList = function(codeType) {
  let codeList = [];
  if (codeType != null) {
    codeType = codeType + "_";
    for (let i = 0; i < localStorage.length; i++) {
      let name = localStorage.key(i);
      if (name.indexOf(codeType) === 0) {
        let key = name.substr(codeType.length);
        codeList.push({
          key: key,
          value: localStorage.getItem(name)
        });
      }
    }
  }
  return codeList;
};

codeItem.compare = function(property) {
  return function(a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  };
};

export default codeItem;
