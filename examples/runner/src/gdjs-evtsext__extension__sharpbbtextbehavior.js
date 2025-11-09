
gdjs.evtsExt__Extension__SharpBBTextBehavior = gdjs.evtsExt__Extension__SharpBBTextBehavior || {};

/**
 * Behavior generated from Sharp BBText Behavior
 */
gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior = class SharpBBTextBehavior extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.getSharedData(
      instanceContainer,
      behaviorData.name
    );
    
  }

  // Hot-reload:
  updateFromBehaviorData(oldBehaviorData, newBehaviorData) {
    

    return true;
  }

  // Network sync:
  getNetworkSyncData() {
    return {
      ...super.getNetworkSyncData(),
      props: {
        
      }
    };
  }
  updateFromNetworkSyncData(networkSyncData) {
    super.updateFromNetworkSyncData(networkSyncData);
    
  }

  // Properties:
  
}

/**
 * Shared data generated from Sharp BBText Behavior
 */
gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.SharedData = class SharpBBTextBehaviorSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._Extension_SharpBBTextBehaviorSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._Extension_SharpBBTextBehaviorSharedData = new gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.SharedData(
      initialData
    );
  }
  return instanceContainer._Extension_SharpBBTextBehaviorSharedData;
}

// Methods:
gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.doStepPreEventsContext = {};
gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.doStepPreEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.doStepPreEventsContext.GDObjectObjects2= [];


gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.doStepPreEventsContext.userFunc0xa60c28 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
// =======================================================================
// FINALE, VEREINFACHTE LÖSUNG (NUR HOCHAUFLÖSENDE TEXTUR)
// =======================================================================

var objects = eventsFunctionContext.getObjects("Object");
if (objects.length > 0) {
    var o = objects[0];
    
    if (o._renderer && o._renderer._pixiObject) {
        
        // Führt die Modifikation nur EINMAL pro Objekt aus.
        if (!this._highResTextureApplied) {
            console.log("Applying high-resolution texture patch...");
            
            var pObj = o._renderer._pixiObject;
            
            if (pObj.style) {
                // Nur die Font-Größe für eine scharfe Textur hochsetzen.
                var originalSize = parseFloat(pObj.style.fontSize);
                var multiplier = 4;
                pObj.style.fontSize = originalSize * multiplier;
                
                // Alle Schärfe-Einstellungen anwenden.
                pObj.style.antialias = false;
                pObj.style.resolution = 1;
                if (pObj.texture) {
                    pObj.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
                }
                pObj.roundPixels = true;
                
                // Wichtig: Wir erzwingen ein Neuzeichnen, damit die große Textur erstellt wird.
                if (o.setBBText) {
                    o.setBBText(pObj.text);
                }
                
                this._highResTextureApplied = true;
                console.log("...High-resolution texture created. Font size is now", pObj.style.fontSize);
            }
        }
    }
}

};
gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.doStepPreEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.doStepPreEventsContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.doStepPreEventsContext.GDObjectObjects1;
gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.doStepPreEventsContext.userFunc0xa60c28(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.doStepPreEvents = function(parentEventsFunctionContext) {
this._onceTriggers.startNewFrame();
var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
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

gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.doStepPreEventsContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.FunctionContext = {};
gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.FunctionContext.GDObjectObjects1= [];


gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.FunctionContext.userFunc0xa60c98 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
// =======================================================================
// FINALE, VEREINFACHTE LÖSUNG (NUR HOCHAUFLÖSENDE TEXTUR)
// =======================================================================

var objects = eventsFunctionContext.getObjects("Object");
if (objects.length > 0) {
    var o = objects[0];
    
    if (o._renderer && o._renderer._pixiObject) {
        
        // Führt die Modifikation nur EINMAL pro Objekt aus.
        if (!this._highResTextureApplied) {
            console.log("Applying high-resolution texture patch...");
            
            var pObj = o._renderer._pixiObject;
            
            if (pObj.style) {
                // Nur die Font-Größe für eine scharfe Textur hochsetzen.
                var originalSize = parseFloat(pObj.style.fontSize);
                var multiplier = 20;
                pObj.style.fontSize = originalSize * multiplier;
                
                // Alle Schärfe-Einstellungen anwenden.
                pObj.style.antialias = false;
                pObj.style.resolution = 1;
                if (pObj.texture) {
                    pObj.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
                }
                pObj.roundPixels = true;
                
                // Wichtig: Wir erzwingen ein Neuzeichnen, damit die große Textur erstellt wird.
                if (o.setBBText) {
                    o.setBBText(pObj.text);
                }
                
                this._highResTextureApplied = true;
                console.log("...High-resolution texture created. Font size is now", pObj.style.fontSize);
            }
        }
    }
}

};
gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.FunctionContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.FunctionContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.FunctionContext.GDObjectObjects1;
gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.FunctionContext.userFunc0xa60c98(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.Function = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
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

gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.FunctionContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.FunctionContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior.prototype.FunctionContext.GDObjectObjects1.length = 0;


return;
}


gdjs.registerBehavior("Extension::SharpBBTextBehavior", gdjs.evtsExt__Extension__SharpBBTextBehavior.SharpBBTextBehavior);
