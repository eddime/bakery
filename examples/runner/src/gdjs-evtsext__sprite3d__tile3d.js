
gdjs.evtsExt__Sprite3D__Tile3D = gdjs.evtsExt__Sprite3D__Tile3D || {};

/**
 * Object generated from 3D Tile Cube
 */
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D = class Tile3D extends gdjs.CustomRuntimeObject3D {
  constructor(parentInstanceContainer, objectData) {
    super(parentInstanceContainer, objectData);
    this._parentInstanceContainer = parentInstanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._objectData = {};
    
    this._objectData.Width = objectData.content.Width !== undefined ? objectData.content.Width : Number("24") || 0;
    this._objectData.Height = objectData.content.Height !== undefined ? objectData.content.Height : Number("24") || 0;
    this._objectData.Depth = objectData.content.Depth !== undefined ? objectData.content.Depth : Number("24") || 0;
    

    // It calls the onCreated super implementation at the end.
    this.onCreated();
  }

  // Hot-reload:
  updateFromObjectData(oldObjectData, newObjectData) {
    super.updateFromObjectData(oldObjectData, newObjectData);
    if (oldObjectData.content.Width !== newObjectData.content.Width)
      this._objectData.Width = newObjectData.content.Width;
    if (oldObjectData.content.Height !== newObjectData.content.Height)
      this._objectData.Height = newObjectData.content.Height;
    if (oldObjectData.content.Depth !== newObjectData.content.Depth)
      this._objectData.Depth = newObjectData.content.Depth;

    this.onHotReloading(this._parentInstanceContainer);
    return true;
  }

  // Properties:
  
  _getWidth() {
    return this._objectData.Width !== undefined ? this._objectData.Width : Number("24") || 0;
  }
  _setWidth(newValue) {
    this._objectData.Width = newValue;
  }
  _getHeight() {
    return this._objectData.Height !== undefined ? this._objectData.Height : Number("24") || 0;
  }
  _setHeight(newValue) {
    this._objectData.Height = newValue;
  }
  _getDepth() {
    return this._objectData.Depth !== undefined ? this._objectData.Depth : Number("24") || 0;
  }
  _setDepth(newValue) {
    this._objectData.Depth = newValue;
  }

  

  
}

// Methods:
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext = {};
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDObjectObjects2= [];
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDTopObjects1= [];
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDTopObjects2= [];
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDSideObjects1= [];
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDSideObjects2= [];


gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.userFunc0xc06138 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject} */
const object = objects[0];

object.__tile3DExtension = {};
object.__tile3DExtension.tile3DRenderer = new gdjs.__tile3DExtension.Tile3DRenderer(object)

};
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{gdjs.evtsExt__Sprite3D__DefineHelperClassesTile.func(runtimeScene, eventsFunctionContext);
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDObjectObjects1;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.userFunc0xc06138(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTopObjectsList = [...runtimeScene.getObjects("Top")];
var GDTopObjects = Hashtable.newFrom({"Top": thisGDTopObjectsList});
var thisGDSideObjectsList = [...runtimeScene.getObjects("Side")];
var GDSideObjects = Hashtable.newFrom({"Side": thisGDSideObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Top": GDTopObjects
, "Side": GDSideObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Top": thisGDTopObjectsList
, "Side": thisGDSideObjectsList
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

gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDTopObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDTopObjects2.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDSideObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDSideObjects2.length = 0;

gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDTopObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDTopObjects2.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDSideObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.onCreatedContext.GDSideObjects2.length = 0;

gdjs.CustomRuntimeObject.prototype.onCreated.call(this);

return;
}
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext = {};
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDObjectObjects2= [];
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDTopObjects1= [];
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDTopObjects2= [];
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDSideObjects1= [];
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDSideObjects2= [];


gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(24643748);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).setSize(eventsFunctionContext.getObjects("Object")[0]._getWidth(), eventsFunctionContext.getObjects("Object")[0]._getHeight());
}
}
{for(var i = 0, len = gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).setDepth(eventsFunctionContext.getObjects("Object")[0]._getDepth());
}
}
{for(var i = 0, len = gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).setZ(-(eventsFunctionContext.getObjects("Object")[0]._getDepth()));
}
}
}

}


};

gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEvents = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTopObjectsList = [...runtimeScene.getObjects("Top")];
var GDTopObjects = Hashtable.newFrom({"Top": thisGDTopObjectsList});
var thisGDSideObjectsList = [...runtimeScene.getObjects("Side")];
var GDSideObjects = Hashtable.newFrom({"Side": thisGDSideObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Top": GDTopObjects
, "Side": GDSideObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Top": thisGDTopObjectsList
, "Side": thisGDSideObjectsList
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

gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDTopObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDTopObjects2.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDSideObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDSideObjects2.length = 0;

gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDTopObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDTopObjects2.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDSideObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPostEventsContext.GDSideObjects2.length = 0;


return;
}

gdjs.evtsExt__Sprite3D__Tile3D.Tile3D.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
};


gdjs.registerObject("Sprite3D::Tile3D", gdjs.evtsExt__Sprite3D__Tile3D.Tile3D);
