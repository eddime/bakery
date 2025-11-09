
gdjs.evtsExt__Sprite3D__FogObject = gdjs.evtsExt__Sprite3D__FogObject || {};

/**
 * Object generated from 
 */
gdjs.evtsExt__Sprite3D__FogObject.FogObject = class FogObject extends gdjs.CustomRuntimeObject3D {
  constructor(parentInstanceContainer, objectData) {
    super(parentInstanceContainer, objectData);
    this._parentInstanceContainer = parentInstanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._objectData = {};
    
    

    // It calls the onCreated super implementation at the end.
    this.onCreated();
  }

  // Hot-reload:
  updateFromObjectData(oldObjectData, newObjectData) {
    super.updateFromObjectData(oldObjectData, newObjectData);

    this.onHotReloading(this._parentInstanceContainer);
    return true;
  }

  // Properties:
  

  

  
}

// Methods:
gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onCreatedContext = {};
gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onCreatedContext.GDObjectObjects2= [];


gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onCreatedContext.userFunc0xc0d770 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
// This code runs when a FogObject is created.
// It assumes the FogController class has already been defined by the first event.

/** @type {gdjs.CustomRuntimeObject} */
const object = objects[0];

// Create the controller only if this instance doesn't have one yet.
if (!object.__fogController) {
    // Because the "Define Helper Class" event runs first, this will always work.
    object.__fogController = new gdjs.__fogExtension.FogController(object);
}

};
gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{gdjs.evtsExt__Sprite3D__DefineHelperClassFog.func(runtimeScene, eventsFunctionContext);
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onCreatedContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onCreatedContext.GDObjectObjects1;
gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onCreatedContext.userFunc0xc0d770(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onCreated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Sprite3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Sprite3D"),
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

gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onCreatedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onCreatedContext.GDObjectObjects2.length = 0;

gdjs.CustomRuntimeObject.prototype.onCreated.call(this);

return;
}
gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onDestroyContext = {};
gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onDestroyContext.GDObjectObjects1= [];


gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onDestroyContext.userFunc0xc0e2b0 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
// This code runs once when a "FogObject" is deleted.
const object = objects[0];

for (const object of objects) {
    // If the controller exists, call its cleanup method.
    if (object.__fogController) {
        object.__fogController.destroy();
        delete object.__fogController; // Remove the reference
    }
}

};
gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onDestroyContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onDestroyContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onDestroyContext.GDObjectObjects1;
gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onDestroyContext.userFunc0xc0e2b0(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onDestroy = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Sprite3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Sprite3D"),
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

gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onDestroyContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onDestroyContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.onDestroyContext.GDObjectObjects1.length = 0;


return;
}

gdjs.evtsExt__Sprite3D__FogObject.FogObject.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
};


gdjs.registerObject("Sprite3D::FogObject", gdjs.evtsExt__Sprite3D__FogObject.FogObject);
