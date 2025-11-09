
if (typeof gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid !== "undefined") {
  gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid = {};
gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid.GDObjectObjects1= [];
gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid.GDObjectObjects2= [];


gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid.GDObjectObjects1[i].setPosition(eventsFunctionContext.getArgument("CellWidth") * Math.round(((gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid.GDObjectObjects1[i].getX()) - eventsFunctionContext.getArgument("OffsetX")) / eventsFunctionContext.getArgument("CellWidth")) + eventsFunctionContext.getArgument("OffsetX"),eventsFunctionContext.getArgument("CellHeight") * Math.round(((gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid.GDObjectObjects1[i].getY()) - eventsFunctionContext.getArgument("OffsetY")) / eventsFunctionContext.getArgument("CellHeight")) + eventsFunctionContext.getArgument("OffsetY"));
}
}
}

}


};

gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid.func = function(runtimeScene, Object, CellWidth, CellHeight, OffsetX, OffsetY, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": gdjs.objectsListsToArray(Object)
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("SnapToGrid"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("SnapToGrid"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
if (argName === "CellWidth") return CellWidth;
if (argName === "CellHeight") return CellHeight;
if (argName === "OffsetX") return OffsetX;
if (argName === "OffsetY") return OffsetY;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid.GDObjectObjects1.length = 0;
gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid.GDObjectObjects2.length = 0;

gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid.GDObjectObjects1.length = 0;
gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid.GDObjectObjects2.length = 0;


return;
}

gdjs.evtsExt__SnapToGrid__SnapObjectToVirtualGrid.registeredGdjsCallbacks = [];