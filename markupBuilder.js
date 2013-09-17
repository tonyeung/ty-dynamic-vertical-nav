function markupBuilder(menuData, template, isRecurse){
  var result = [];
  var mergedTemplate = template;
  var displayTopLevelNode = hasTopLevelNode(isRecurse, menuData.text);
  var displayMenuItem = hasValidMenuText(menuData.text);
  var displayChildren = hasChildren(menuData);
  
  if(displayTopLevelNode) {
    result.push('<ul>');
  }  
  
  for (var propertyName in menuData) {
    if (menuData.hasOwnProperty(propertyName)) {
      
      if (propertyName !== 'children') {
        mergedTemplate = mergedTemplate.replace(propertyName, menuData[propertyName]);
      }
      
      else {
        
        if (displayMenuItem) {
          result.push(mergedTemplate.replace('</li>',''));
        }
        
        if (displayChildren) {
          result.push('<ul>');
        
          for (var children in menuData[propertyName]) {
            var subMenu = markupBuilder(menuData[propertyName][children], template, true);
            result.push(subMenu);
          }
        
          result.push('</ul>');
        }
        
        if (displayMenuItem) {
          result.push('</li>');
        }
        
      }
      
    }
  }
  
  if(displayTopLevelNode) {
    result.push('</ul>');
  }  
    
  return result.join('\n');
}

function hasTopLevelNode(isRecurse, parentMenuText) {
  isRecurse = isRecurse || false;
  
  return !isRecurse && parentMenuText;
}

function hasValidMenuText(menuText) {
  var result = false;
  
  if (typeof menuText !== undefined && menuText.trim() !== '') {
    result = true;
  }
  
  return result;
}

function hasChildren(menuData){
  var result = false;
  
  if (menuData.children.length > 0) {
    result = true;
  }
  
  return result;
}
