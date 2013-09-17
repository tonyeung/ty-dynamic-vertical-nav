// Code goes here

var tree = {
  text : "Parent",
  url: '/decendants/Child1',
  children: [{
    text : "Child1",
    url: '/decendants/Child1',
    children: []
    },{
    text: "Child2",
    url: '/decendants/Child2',
    children: [{
      text : "Grandchild1",
      url: '/decendants/Grandchild1',
      children: []
      },{
      text : "Grandchild2",
      url: '/decendants/Grandchild2',
      children: []
      },{
      text : "Grandchild3",
      url: '/decendants/Grandchild3',
      children: []
    }]
    },{
    text: "Child3",
    url: '/decendants/Child3',
    children: [{
      text : "Grandchild4",
      url: '/decendants/Grandchild4',
      children: []
      },{
      text : "Grandchild5",
      url: '/decendants/Grandchild5',
      children: []
      },{
      text : "Grandchild6",
      url: '/decendants/Grandchild6',
      children: []
    }]
  }]
};
    
var rawData = [];
    
$(document).ready(function(){
  var output = markUpBuilder(tree, '<li><a href="url">text</a></li>');
  
  $('.content').html(output);
});

function markUpBuilder(menuData, template, isRecurse){
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
            var subMenu = markUpBuilder(menuData[propertyName][children], template, true);
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
