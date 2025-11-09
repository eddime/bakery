
gdjs.evtsExt__Extension__BulletBar = gdjs.evtsExt__Extension__BulletBar || {};

/**
 * Object generated from 
 */
gdjs.evtsExt__Extension__BulletBar.BulletBar = class BulletBar extends gdjs.CustomRuntimeObject2D {
  constructor(parentInstanceContainer, objectData) {
    super(parentInstanceContainer, objectData);
    this._parentInstanceContainer = parentInstanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._objectData = {};
    
    this._objectData.MaxLoad = objectData.content.MaxLoad !== undefined ? objectData.content.MaxLoad : Number("10") || 0;
    this._objectData.CurrentLoad = objectData.content.CurrentLoad !== undefined ? objectData.content.CurrentLoad : Number("10") || 0;
    

    // It calls the onCreated super implementation at the end.
    this.onCreated();
  }

  // Hot-reload:
  updateFromObjectData(oldObjectData, newObjectData) {
    super.updateFromObjectData(oldObjectData, newObjectData);
    if (oldObjectData.content.MaxLoad !== newObjectData.content.MaxLoad)
      this._objectData.MaxLoad = newObjectData.content.MaxLoad;
    if (oldObjectData.content.CurrentLoad !== newObjectData.content.CurrentLoad)
      this._objectData.CurrentLoad = newObjectData.content.CurrentLoad;

    this.onHotReloading(this._parentInstanceContainer);
    return true;
  }

  // Properties:
  
  _getMaxLoad() {
    return this._objectData.MaxLoad !== undefined ? this._objectData.MaxLoad : Number("10") || 0;
  }
  _setMaxLoad(newValue) {
    this._objectData.MaxLoad = newValue;
  }
  _getCurrentLoad() {
    return this._objectData.CurrentLoad !== undefined ? this._objectData.CurrentLoad : Number("10") || 0;
  }
  _setCurrentLoad(newValue) {
    this._objectData.CurrentLoad = newValue;
  }

  

  
}

// Methods:
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext = {};
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDObjectObjects2= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDBarObjects1= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDBarObjects2= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDFillObjects1= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDFillObjects2= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDMaskObjects1= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDMaskObjects2= [];


gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595BulletBar_9546BulletBar_9546prototype_9546onCreatedContext_9546GDFillObjects1Objects = Hashtable.newFrom({"Fill": gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDFillObjects1});
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595BulletBar_9546BulletBar_9546prototype_9546onCreatedContext_9546GDMaskObjects1Objects = Hashtable.newFrom({"Mask": gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDMaskObjects1});
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Fill"), gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDFillObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Mask"), gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDMaskObjects1);
{gdjs.evtsExt__SpriteMasking__Mask.func(runtimeScene, gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595BulletBar_9546BulletBar_9546prototype_9546onCreatedContext_9546GDFillObjects1Objects, gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595BulletBar_9546BulletBar_9546prototype_9546onCreatedContext_9546GDMaskObjects1Objects, eventsFunctionContext);
}
{for(var i = 0, len = gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDMaskObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDMaskObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).setHeight(0);
}
}
{eventsFunctionContext.getObjects("Object")[0]._setCurrentLoad(0)
}
}

}


};

gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDBarObjectsList = [...runtimeScene.getObjects("Bar")];
var GDBarObjects = Hashtable.newFrom({"Bar": thisGDBarObjectsList});
var thisGDFillObjectsList = [...runtimeScene.getObjects("Fill")];
var GDFillObjects = Hashtable.newFrom({"Fill": thisGDFillObjectsList});
var thisGDMaskObjectsList = [...runtimeScene.getObjects("Mask")];
var GDMaskObjects = Hashtable.newFrom({"Mask": thisGDMaskObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Bar": GDBarObjects
, "Fill": GDFillObjects
, "Mask": GDMaskObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Bar": thisGDBarObjectsList
, "Fill": thisGDFillObjectsList
, "Mask": thisGDMaskObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Extension"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Extension"),
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
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDBarObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDBarObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDFillObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDFillObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDMaskObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDMaskObjects2.length = 0;

gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDBarObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDBarObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDFillObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDFillObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDMaskObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.onCreatedContext.GDMaskObjects2.length = 0;

gdjs.CustomRuntimeObject.prototype.onCreated.call(this);

return;
}
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext = {};
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDObjectObjects2= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDBarObjects1= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDBarObjects2= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects1= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects2= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDMaskObjects1= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDMaskObjects2= [];


gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Fill"), gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Mask"), gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDMaskObjects1);
{for(var i = 0, len = gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDMaskObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDMaskObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).setHeight(gdjs.evtTools.common.lerp((gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDMaskObjects1[i].getHeight()), (( gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects1[0].getHeight()) * eventsFunctionContext.getObjects("Object")[0]._getCurrentLoad() / eventsFunctionContext.getObjects("Object")[0]._getMaxLoad(), 0.08));
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0]._getCurrentLoad() >= eventsFunctionContext.getObjects("Object")[0]._getMaxLoad());
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(26257100);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Bar"), gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDBarObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Fill"), gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects1);
{for(var i = 0, len = gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDBarObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDBarObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ShakeObject_PositionAngleScale")).ShakeObject_PositionAngleScale(0.25, 5, 5, 5, 5, 0.08, false, eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Animation")).setAnimationName("white");
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Flash")).Flash(0, eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0]._getCurrentLoad() < eventsFunctionContext.getObjects("Object")[0]._getMaxLoad());
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(26259900);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Fill"), gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects1);
{for(var i = 0, len = gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Flash")).Stop(eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Animation")).setAnimationName("default");
}
}
}

}


};

gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEvents = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDBarObjectsList = [...runtimeScene.getObjects("Bar")];
var GDBarObjects = Hashtable.newFrom({"Bar": thisGDBarObjectsList});
var thisGDFillObjectsList = [...runtimeScene.getObjects("Fill")];
var GDFillObjects = Hashtable.newFrom({"Fill": thisGDFillObjectsList});
var thisGDMaskObjectsList = [...runtimeScene.getObjects("Mask")];
var GDMaskObjects = Hashtable.newFrom({"Mask": thisGDMaskObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Bar": GDBarObjects
, "Fill": GDFillObjects
, "Mask": GDMaskObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Bar": thisGDBarObjectsList
, "Fill": thisGDFillObjectsList
, "Mask": thisGDMaskObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Extension"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Extension"),
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
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDBarObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDBarObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDMaskObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDMaskObjects2.length = 0;

gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDBarObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDBarObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDFillObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDMaskObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPostEventsContext.GDMaskObjects2.length = 0;


return;
}
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext = {};
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDObjectObjects1= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDObjectObjects2= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDBarObjects1= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDBarObjects2= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDFillObjects1= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDFillObjects2= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDMaskObjects1= [];
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDMaskObjects2= [];


gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.getObjects("Object")[0]._setCurrentLoad(eventsFunctionContext.getArgument("ChangeCurrentLoad"))
}
}

}


};

gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBar = function(ChangeCurrentLoad, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDBarObjectsList = [...runtimeScene.getObjects("Bar")];
var GDBarObjects = Hashtable.newFrom({"Bar": thisGDBarObjectsList});
var thisGDFillObjectsList = [...runtimeScene.getObjects("Fill")];
var GDFillObjects = Hashtable.newFrom({"Fill": thisGDFillObjectsList});
var thisGDMaskObjectsList = [...runtimeScene.getObjects("Mask")];
var GDMaskObjects = Hashtable.newFrom({"Mask": thisGDMaskObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Bar": GDBarObjects
, "Fill": GDFillObjects
, "Mask": GDMaskObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Bar": thisGDBarObjectsList
, "Fill": thisGDFillObjectsList
, "Mask": thisGDMaskObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Extension"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Extension"),
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
if (argName === "ChangeCurrentLoad") return ChangeCurrentLoad;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDBarObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDBarObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDFillObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDFillObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDMaskObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDMaskObjects2.length = 0;

gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDBarObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDBarObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDFillObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDFillObjects2.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDMaskObjects1.length = 0;
gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.UpdateBulletBarContext.GDMaskObjects2.length = 0;


return;
}

gdjs.evtsExt__Extension__BulletBar.BulletBar.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
};


gdjs.registerObject("Extension::BulletBar", gdjs.evtsExt__Extension__BulletBar.BulletBar);
