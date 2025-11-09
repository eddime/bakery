
gdjs.evtsExt__Tween3D__Tween3D = gdjs.evtsExt__Tween3D__Tween3D || {};

/**
 * Behavior generated from Advanced 3D tween
 */
gdjs.evtsExt__Tween3D__Tween3D.Tween3D = class Tween3D extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.getSharedData(
      instanceContainer,
      behaviorData.name
    );
    
    this._behaviorData.Object3D = behaviorData.Object3D !== undefined ? behaviorData.Object3D : "";
    this._behaviorData.Scale = behaviorData.Scale !== undefined ? behaviorData.Scale : "";
    this._behaviorData.Tween = behaviorData.Tween !== undefined ? behaviorData.Tween : "";
  }

  // Hot-reload:
  updateFromBehaviorData(oldBehaviorData, newBehaviorData) {
    
    if (oldBehaviorData.Object3D !== newBehaviorData.Object3D)
      this._behaviorData.Object3D = newBehaviorData.Object3D;
    if (oldBehaviorData.Scale !== newBehaviorData.Scale)
      this._behaviorData.Scale = newBehaviorData.Scale;
    if (oldBehaviorData.Tween !== newBehaviorData.Tween)
      this._behaviorData.Tween = newBehaviorData.Tween;

    return true;
  }

  // Network sync:
  getNetworkSyncData() {
    return {
      ...super.getNetworkSyncData(),
      props: {
        
    Object3D: this._behaviorData.Object3D,
    Scale: this._behaviorData.Scale,
    Tween: this._behaviorData.Tween,
      }
    };
  }
  updateFromNetworkSyncData(networkSyncData) {
    super.updateFromNetworkSyncData(networkSyncData);
    
    if (networkSyncData.props.Object3D !== undefined)
      this._behaviorData.Object3D = networkSyncData.props.Object3D;
    if (networkSyncData.props.Scale !== undefined)
      this._behaviorData.Scale = networkSyncData.props.Scale;
    if (networkSyncData.props.Tween !== undefined)
      this._behaviorData.Tween = networkSyncData.props.Tween;
  }

  // Properties:
  
  _getObject3D() {
    return this._behaviorData.Object3D !== undefined ? this._behaviorData.Object3D : "";
  }
  _setObject3D(newValue) {
    this._behaviorData.Object3D = newValue;
  }
  _getScale() {
    return this._behaviorData.Scale !== undefined ? this._behaviorData.Scale : "";
  }
  _setScale(newValue) {
    this._behaviorData.Scale = newValue;
  }
  _getTween() {
    return this._behaviorData.Tween !== undefined ? this._behaviorData.Tween : "";
  }
  _setTween(newValue) {
    this._behaviorData.Tween = newValue;
  }
}

/**
 * Shared data generated from Advanced 3D tween
 */
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.SharedData = class Tween3DSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._Tween3D_Tween3DSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._Tween3D_Tween3DSharedData = new gdjs.evtsExt__Tween3D__Tween3D.Tween3D.SharedData(
      initialData
    );
  }
  return instanceContainer._Tween3D_Tween3DSharedData;
}

// Methods:
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.onCreatedContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.onCreatedContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{gdjs.evtsExt__Tween3D__DefineHelperClasses.func(runtimeScene, eventsFunctionContext);
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.onCreated = function(parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.onCreatedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.onCreatedContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects2= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects3= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.asyncCallback25645388 = function (runtimeScene, eventsFunctionContext, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(eventsFunctionContext.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects3);

{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects3.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).StartTween("y3", 1, 0.1, "easeOutQuint", "StretchY", eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects3.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).StartTween("z3", 1, 0.1, "easeOutQuint", "StretchZ", eventsFunctionContext);
}
}
eventsFunctionContext.localVariables.length = 0;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.eventsList0 = function(runtimeScene, eventsFunctionContext, asyncObjectsList) {

{


{
const parentAsyncObjectsList = asyncObjectsList;
{
const asyncObjectsList = gdjs.LongLivedObjectsList.from(parentAsyncObjectsList);
asyncObjectsList.backupLocalVariablesContainers(eventsFunctionContext.localVariables);
for (const obj of gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects2) asyncObjectsList.addObject("Object", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.1), (runtimeScene) => (gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.asyncCallback25645388(runtimeScene, eventsFunctionContext, asyncObjectsList)));
}
}

}


};gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.asyncCallback25644788 = function (runtimeScene, eventsFunctionContext, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(eventsFunctionContext.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects2);

{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).StartTween("y2", 1.2, 0.1, "easeOutQuint", "StretchY", eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).StartTween("z2", 1.2, 0.1, "easeOutQuint", "StretchZ", eventsFunctionContext);
}
}

{ //Subevents
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.eventsList0(runtimeScene, eventsFunctionContext, asyncObjectsList);} //End of subevents
eventsFunctionContext.localVariables.length = 0;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(eventsFunctionContext.localVariables);
for (const obj of gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects1) asyncObjectsList.addObject("Object", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.1), (runtimeScene) => (gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.asyncCallback25644788(runtimeScene, eventsFunctionContext, asyncObjectsList)));
}
}

}


};gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.eventsList2 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).StartTween("y", 0.6, 0.1, "easeOutQuint", "StretchY", eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).StartTween("z", 1.2, 0.1, "easeOutQuint", "StretchZ", eventsFunctionContext);
}
}

{ //Subevents
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.eventsList1(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimation = function(parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects3.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.eventsList2(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SqueezeStretchAnimationContext.GDObjectObjects3.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZContext.GDObjectObjects1);
{eventsFunctionContext.returnValue = (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).getScaleZ()) / Math.sqrt((( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).getScaleX()) * (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).getScaleY()));}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZ = function(parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchZContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = ((Number(eventsFunctionContext.getArgument("Value")) || 0) > 0);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1);
{runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Volume").setNumber((( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).ScaleVolume(eventsFunctionContext)));
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).setScaleZ(Math.pow(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Volume")) * eventsFunctionContext.getArgument("Value") * eventsFunctionContext.getArgument("Value"), 1 / 3));
}
}
{runtimeScene.getScene().getVariables().get("_Tween3D").getChild("SurfaceRatio").setNumber(Math.sqrt((gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Volume")) / (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).getScaleZ())) / ((( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).getScaleX()) * (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).getScaleY()))));
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).setScaleX(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).getScaleX() * (gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("SurfaceRatio"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).setScaleY(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).getScaleY() * (gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("SurfaceRatio"))));
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZ = function(Value, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchZContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchYContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchYContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchYContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchYContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchYContext.GDObjectObjects1);
{eventsFunctionContext.returnValue = (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchYContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchYContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).getScaleY()) / Math.sqrt((( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchYContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchYContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).getScaleX()) * (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchYContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchYContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).getScaleZ()));}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchY = function(parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchYContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchYContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchYContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchYContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StretchYContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = ((Number(eventsFunctionContext.getArgument("Value")) || 0) > 0);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1);
{runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Volume").setNumber((( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).ScaleVolume(eventsFunctionContext)));
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).setScaleY(Math.pow(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Volume")) * eventsFunctionContext.getArgument("Value") * eventsFunctionContext.getArgument("Value"), 1 / 3));
}
}
{runtimeScene.getScene().getVariables().get("_Tween3D").getChild("SurfaceRatio").setNumber(Math.sqrt((gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Volume")) / (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).getScaleZ())) / ((( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).getScaleX()) * (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).getScaleY()))));
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).setScaleX(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).getScaleX() * (gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("SurfaceRatio"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).setScaleZ(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).getScaleZ() * (gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("SurfaceRatio"))));
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchY = function(Value, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetStretchYContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolumeContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolumeContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolumeContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolumeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolumeContext.GDObjectObjects1);
{eventsFunctionContext.returnValue = (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolumeContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolumeContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).getScaleX()) * (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolumeContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolumeContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).getScaleY()) * (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolumeContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolumeContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).getScaleZ());}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolume = function(parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolumeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolumeContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolumeContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolumeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ScaleVolumeContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = ((Number(eventsFunctionContext.getArgument("Value")) || 0) > 0);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects1);
{runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Ratio").setNumber(Math.pow(eventsFunctionContext.getArgument("Value") / (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).ScaleVolume(eventsFunctionContext)), 1 / 3));
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).setScaleZ(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).getScaleZ() * (gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Ratio"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).setScaleY(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).getScaleY() * (gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Ratio"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).setScaleX(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).getScaleX() * (gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Ratio"))));
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolume = function(Value, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetScaleVolumeContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TintContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TintContext.GDObjectObjects1= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TintContext.userFunc0x98c888 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
if (!runtimeScene.__tween3DExtension) {
  runtimeScene.__tween3DExtension = {
    tintManagers: new Map()
  };
}
const { tintManagers } = runtimeScene.__tween3DExtension;
if (objects.length === 0) {
  eventsFunctionContext.returnValue = 0xffffff;
}
else {
  const object = objects[0];
  let manager = tintManagers.get(object.getName());
  if (!manager) {
    const { TintManager } = gdjs.__tween3DExtension;
    manager = new TintManager(object);
    tintManagers.set(object.getName(), manager);
  }
  eventsFunctionContext.returnValue = manager.getTint(object);
}

};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TintContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TintContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TintContext.GDObjectObjects1;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TintContext.userFunc0x98c888(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.Tint = function(parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TintContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TintContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TintContext.GDObjectObjects1.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchZContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchZContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchZContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchZContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchZContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchZContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchZContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).StartTween(eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext.getArgument("TargetedValue"), eventsFunctionContext.getArgument("Duration"), eventsFunctionContext.getArgument("Easing"), "StretchZ", eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchZ = function(TweenIdentifier, TargetedValue, Duration, Easing, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
if (argName === "TargetedValue") return TargetedValue;
if (argName === "Duration") return Duration;
if (argName === "Easing") return Easing;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchZContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchZContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchZContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchZContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchZContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchYContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchYContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchYContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchYContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchYContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchYContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchYContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).StartTween(eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext.getArgument("TargetedValue"), eventsFunctionContext.getArgument("Duration"), eventsFunctionContext.getArgument("Easing"), "StretchY", eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchY = function(TweenIdentifier, TargetedValue, Duration, Easing, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
if (argName === "TargetedValue") return TargetedValue;
if (argName === "Duration") return Duration;
if (argName === "Easing") return Easing;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchYContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchYContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchYContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchYContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenStretchYContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenScaleVolumeContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenScaleVolumeContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenScaleVolumeContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenScaleVolumeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenScaleVolumeContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenScaleVolumeContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenScaleVolumeContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).StartTween(eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext.getArgument("TargetedValue"), eventsFunctionContext.getArgument("Duration"), eventsFunctionContext.getArgument("Easing"), "ScaleVolume", eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenScaleVolume = function(TweenIdentifier, TargetedValue, Duration, Easing, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
if (argName === "TargetedValue") return TargetedValue;
if (argName === "Duration") return Duration;
if (argName === "Easing") return Easing;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenScaleVolumeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenScaleVolumeContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenScaleVolumeContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenScaleVolumeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenScaleVolumeContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenTintContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenTintContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenTintContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenTintContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenTintContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenTintContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenTintContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).StartTween(eventsFunctionContext.getArgument("TweenIdentifier"), gdjs.evtsExt__Tween3D__RgbToNumber.func(runtimeScene, eventsFunctionContext.getArgument("TargetedValue"), eventsFunctionContext), eventsFunctionContext.getArgument("Duration"), eventsFunctionContext.getArgument("Easing"), "Tint", eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenTint = function(TweenIdentifier, TargetedValue, Duration, Easing, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
if (argName === "TargetedValue") return TargetedValue;
if (argName === "Duration") return Duration;
if (argName === "Easing") return Easing;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenTintContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenTintContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenTintContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenTintContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenTintContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenPositionZContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenPositionZContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenPositionZContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenPositionZContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenPositionZContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenPositionZContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenPositionZContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionZTween2(eventsFunctionContext.getBehaviorName("Object3D"), eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext.getArgument("TargetedValue"), eventsFunctionContext.getArgument("Easing"), eventsFunctionContext.getArgument("Duration"), false);
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenPositionZ = function(TweenIdentifier, TargetedValue, Duration, Easing, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
if (argName === "TargetedValue") return TargetedValue;
if (argName === "Duration") return Duration;
if (argName === "Easing") return Easing;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenPositionZContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenPositionZContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenPositionZContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenPositionZContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenPositionZContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenDepthContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenDepthContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenDepthContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenDepthContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenDepthContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenDepthContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenDepthContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectDepthTween2(eventsFunctionContext.getBehaviorName("Object3D"), eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext.getArgument("TargetedValue"), eventsFunctionContext.getArgument("Easing"), eventsFunctionContext.getArgument("Duration"), false);
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenDepth = function(TweenIdentifier, TargetedValue, Duration, Easing, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
if (argName === "TargetedValue") return TargetedValue;
if (argName === "Duration") return Duration;
if (argName === "Easing") return Easing;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenDepthContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenDepthContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenDepthContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenDepthContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenDepthContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationXContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationXContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationXContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationXContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationXContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationXContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationXContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectRotationXTween(eventsFunctionContext.getBehaviorName("Object3D"), eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext.getArgument("TargetedValue"), eventsFunctionContext.getArgument("Easing"), eventsFunctionContext.getArgument("Duration"), false);
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationX = function(TweenIdentifier, TargetedValue, Duration, Easing, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
if (argName === "TargetedValue") return TargetedValue;
if (argName === "Duration") return Duration;
if (argName === "Easing") return Easing;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationXContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationXContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationXContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationXContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationXContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationYContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationYContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationYContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationYContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationYContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationYContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationYContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectRotationYTween(eventsFunctionContext.getBehaviorName("Object3D"), eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext.getArgument("TargetedValue"), eventsFunctionContext.getArgument("Easing"), eventsFunctionContext.getArgument("Duration"), false);
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationY = function(TweenIdentifier, TargetedValue, Duration, Easing, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
if (argName === "TargetedValue") return TargetedValue;
if (argName === "Duration") return Duration;
if (argName === "Easing") return Easing;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationYContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationYContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationYContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationYContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenRotationYContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects2= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects5= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.mapOfGDgdjs_9546evtsExt_9595_9595Tween3D_9595_9595Tween3D_9546Tween3D_9546prototype_9546doStepPreEventsContext_9546GDObjectObjects3Objects = Hashtable.newFrom({"Object": gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3});
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3, gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4.length;i<l;++i) {
    if ( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Type(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext) == "StretchZ" ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4 */
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetStretchZ((gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).ExponentTweenedValue(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext)), eventsFunctionContext);
}
}
}

}


{

gdjs.copyArray(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3, gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4.length;i<l;++i) {
    if ( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Type(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext) == "StretchY" ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4 */
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetStretchY((gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).ExponentTweenedValue(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext)), eventsFunctionContext);
}
}
}

}


{

gdjs.copyArray(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3, gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4.length;i<l;++i) {
    if ( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Type(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext) == "ScaleVolume" ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4 */
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetScaleVolume((gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).ExponentTweenedValue(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext)), eventsFunctionContext);
}
}
}

}


{

/* Reuse gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3.length;i<l;++i) {
    if ( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Type(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext) == "Tint" ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3 */
{gdjs.evtsExt__Tween3D__SetTintNumber.func(runtimeScene, gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.mapOfGDgdjs_9546evtsExt_9595_9595Tween3D_9595_9595Tween3D_9546Tween3D_9546prototype_9546doStepPreEventsContext_9546GDObjectObjects3Objects, eventsFunctionContext.getBehaviorName("Object3D"), (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).TweenedColor(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext)), eventsFunctionContext);
}
}

}


};gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects2, gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3.length;i<l;++i) {
    if ( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).IsPlaying(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3 */
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetTime(Math.min((gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Time(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext)) + gdjs.evtTools.runtimeScene.getElapsedTimeInSeconds(runtimeScene) * gdjs.evtTools.camera.getLayerTimeScale(runtimeScene, (gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3[i].getLayer())), (gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Duration(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext))), gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext);
}
}

{ //Subevents
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
{
{runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Index").add(1);
}
}

}


};gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.eventsList2 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Index").setNumber(0);
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects1);

const repeatCount2 = (gdjs.RuntimeObject.getVariableChildCount(((gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects1[0].getVariables()).get("_Tween3D").getChild("Tweens")));
for (let repeatIndex2 = 0;repeatIndex2 < repeatCount2;++repeatIndex2) {
gdjs.copyArray(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects1, gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects2);


let isConditionTrue_0 = false;
if (true)
{
{runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier").setString((( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects2.length === 0 ) ? "" :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects2[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).TweenIdentifier(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Index")), eventsFunctionContext)));
}

{ //Subevents: 
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.eventsList1(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEvents = function(parentEventsFunctionContext) {
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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects5.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.eventsList2(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects4.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.doStepPreEventsContext.GDObjectObjects5.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.GDObjectObjects1);
{eventsFunctionContext.returnValue = gdjs.evtTools.tween.ease((( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.GDObjectObjects1.length === 0 ) ? "" :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Easing(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext)), (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).InitialValue(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext)), (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).TargetedValue(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext)), (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Progress(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext)));}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValue = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedValueContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.GDObjectObjects1);
{eventsFunctionContext.returnValue = gdjs.evtsExt__Tween3D__RgbMean.func(runtimeScene, (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).InitialValue(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext)), (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).TargetedValue(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext)), gdjs.evtTools.tween.ease((( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.GDObjectObjects1.length === 0 ) ? "" :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Easing(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext)), 0, 1, (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Progress(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext))), eventsFunctionContext);}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColor = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenedColorContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.GDObjectObjects1);
{eventsFunctionContext.returnValue = gdjs.evtsExt__Tween3D__EaseExp.func(runtimeScene, (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.GDObjectObjects1.length === 0 ) ? "" :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Easing(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext)), (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).InitialValue(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext)), (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).TargetedValue(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext)), (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Progress(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("_Tween3D").getChild("Identifier")), eventsFunctionContext)), eventsFunctionContext);}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValue = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExponentTweenedValueContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Exists(eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).InvalidateTweenIdentifiers(eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetTime(0, eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetType(eventsFunctionContext.getArgument("Type"), eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetDuration(eventsFunctionContext.getArgument("Duration"), eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetEasing(eventsFunctionContext.getArgument("Easing"), eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetTargetedValue(eventsFunctionContext.getArgument("TargetedValue"), eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getArgument("Type") == "StretchZ");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetInitialValue((gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).StretchZ(eventsFunctionContext)), eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getArgument("Type") == "StretchY");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetInitialValue((gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).StretchY(eventsFunctionContext)), eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getArgument("Type") == "ScaleVolume");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetInitialValue((gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).ScaleVolume(eventsFunctionContext)), eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getArgument("Type") == "Tint");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetInitialValue((gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Tint(eventsFunctionContext)), eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTween = function(TweenIdentifier, TargetedValue, Duration, Easing, Type, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
if (argName === "TargetedValue") return TargetedValue;
if (argName === "Duration") return Duration;
if (argName === "Easing") return Easing;
if (argName === "Type") return Type;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StartTweenContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TypeContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TypeContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TypeContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TypeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TypeContext.GDObjectObjects1);
{eventsFunctionContext.returnValue = (gdjs.RuntimeObject.getVariableString(((gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TypeContext.GDObjectObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TypeContext.GDObjectObjects1[0].getVariables()).get("_Tween3D").getChild("Tweens").getChild(eventsFunctionContext.getArgument("TweenIdentifier")).getChild("Type")));}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.Type = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TypeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TypeContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TypeContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TypeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TypeContext.GDObjectObjects2.length = 0;


return "" + eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTypeContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTypeContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTypeContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTypeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTypeContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTypeContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTypeContext.GDObjectObjects1[i].returnVariable(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTypeContext.GDObjectObjects1[i].getVariables().get("_Tween3D").getChild("Tweens").getChild(eventsFunctionContext.getArgument("TweenIdentifier")).getChild("Type")).setString(eventsFunctionContext.getArgument("Value"));
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetType = function(Value, TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "Value") return Value;
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTypeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTypeContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTypeContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTypeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTypeContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TimeContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TimeContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TimeContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TimeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TimeContext.GDObjectObjects1);
{eventsFunctionContext.returnValue = (gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TimeContext.GDObjectObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TimeContext.GDObjectObjects1[0].getVariables()).get("_Tween3D").getChild("Tweens").getChild(eventsFunctionContext.getArgument("TweenIdentifier")).getChild("Time")));}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.Time = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TimeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TimeContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TimeContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TimeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TimeContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTimeContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTimeContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTimeContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTimeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTimeContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTimeContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTimeContext.GDObjectObjects1[i].returnVariable(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTimeContext.GDObjectObjects1[i].getVariables().get("_Tween3D").getChild("Tweens").getChild(eventsFunctionContext.getArgument("TweenIdentifier")).getChild("Time")).setNumber(eventsFunctionContext.getArgument("Value"));
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTime = function(Value, TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "Value") return Value;
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTimeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTimeContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTimeContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTimeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTimeContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.DurationContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.DurationContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.DurationContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.DurationContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.DurationContext.GDObjectObjects1);
{eventsFunctionContext.returnValue = (gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.DurationContext.GDObjectObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.DurationContext.GDObjectObjects1[0].getVariables()).get("_Tween3D").getChild("Tweens").getChild(eventsFunctionContext.getArgument("TweenIdentifier")).getChild("Duration")));}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.Duration = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.DurationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.DurationContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.DurationContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.DurationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.DurationContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetDurationContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetDurationContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetDurationContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetDurationContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetDurationContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetDurationContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetDurationContext.GDObjectObjects1[i].returnVariable(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetDurationContext.GDObjectObjects1[i].getVariables().get("_Tween3D").getChild("Tweens").getChild(eventsFunctionContext.getArgument("TweenIdentifier")).getChild("Duration")).setNumber(eventsFunctionContext.getArgument("Value"));
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetDuration = function(Value, TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "Value") return Value;
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetDurationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetDurationContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetDurationContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetDurationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetDurationContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.EasingContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.EasingContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.EasingContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.EasingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.EasingContext.GDObjectObjects1);
{eventsFunctionContext.returnValue = (gdjs.RuntimeObject.getVariableString(((gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.EasingContext.GDObjectObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.EasingContext.GDObjectObjects1[0].getVariables()).get("_Tween3D").getChild("Tweens").getChild(eventsFunctionContext.getArgument("TweenIdentifier")).getChild("Easing")));}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.Easing = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.EasingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.EasingContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.EasingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.EasingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.EasingContext.GDObjectObjects2.length = 0;


return "" + eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetEasingContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetEasingContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetEasingContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetEasingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetEasingContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetEasingContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetEasingContext.GDObjectObjects1[i].returnVariable(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetEasingContext.GDObjectObjects1[i].getVariables().get("_Tween3D").getChild("Tweens").getChild(eventsFunctionContext.getArgument("TweenIdentifier")).getChild("Easing")).setString(eventsFunctionContext.getArgument("Value"));
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetEasing = function(Value, TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "Value") return Value;
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetEasingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetEasingContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetEasingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetEasingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetEasingContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InitialValueContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InitialValueContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InitialValueContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InitialValueContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InitialValueContext.GDObjectObjects1);
{eventsFunctionContext.returnValue = (gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InitialValueContext.GDObjectObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InitialValueContext.GDObjectObjects1[0].getVariables()).get("_Tween3D").getChild("Tweens").getChild(eventsFunctionContext.getArgument("TweenIdentifier")).getChild("InitialValue")));}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InitialValue = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InitialValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InitialValueContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InitialValueContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InitialValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InitialValueContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetInitialValueContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetInitialValueContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetInitialValueContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetInitialValueContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetInitialValueContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetInitialValueContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetInitialValueContext.GDObjectObjects1[i].returnVariable(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetInitialValueContext.GDObjectObjects1[i].getVariables().get("_Tween3D").getChild("Tweens").getChild(eventsFunctionContext.getArgument("TweenIdentifier")).getChild("InitialValue")).setNumber(eventsFunctionContext.getArgument("Value"));
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetInitialValue = function(Value, TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "Value") return Value;
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetInitialValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetInitialValueContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetInitialValueContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetInitialValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetInitialValueContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TargetedValueContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TargetedValueContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TargetedValueContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TargetedValueContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TargetedValueContext.GDObjectObjects1);
{eventsFunctionContext.returnValue = (gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TargetedValueContext.GDObjectObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TargetedValueContext.GDObjectObjects1[0].getVariables()).get("_Tween3D").getChild("Tweens").getChild(eventsFunctionContext.getArgument("TweenIdentifier")).getChild("TargetedValue")));}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TargetedValue = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TargetedValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TargetedValueContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TargetedValueContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TargetedValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TargetedValueContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTargetedValueContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTargetedValueContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTargetedValueContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTargetedValueContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTargetedValueContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTargetedValueContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTargetedValueContext.GDObjectObjects1[i].returnVariable(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTargetedValueContext.GDObjectObjects1[i].getVariables().get("_Tween3D").getChild("Tweens").getChild(eventsFunctionContext.getArgument("TweenIdentifier")).getChild("TargetedValue")).setNumber(eventsFunctionContext.getArgument("Value"));
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTargetedValue = function(Value, TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "Value") return Value;
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTargetedValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTargetedValueContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTargetedValueContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTargetedValueContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetTargetedValueContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPausedContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPausedContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPausedContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPausedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPausedContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPausedContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPausedContext.GDObjectObjects1[i].getVariableBoolean(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPausedContext.GDObjectObjects1[i].getVariables().get("_Tween3D").getChild("Tweens").getChild(eventsFunctionContext.getArgument("TweenIdentifier")).getChild("IsPaused"), true) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPausedContext.GDObjectObjects1[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPausedContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPausedContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = true;}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPaused = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPausedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPausedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPausedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPausedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPausedContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getArgument("IsPaused");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext.GDObjectObjects1[i].setVariableBoolean(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext.GDObjectObjects1[i].getVariables().get("_Tween3D").getChild("Tweens").getChild(eventsFunctionContext.getArgument("TweenIdentifier")).getChild("IsPaused"), true);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !eventsFunctionContext.getArgument("IsPaused");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext.GDObjectObjects1[i].setVariableBoolean(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext.GDObjectObjects1[i].getVariables().get("_Tween3D").getChild("Tweens").getChild(eventsFunctionContext.getArgument("TweenIdentifier")).getChild("IsPaused"), false);
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPaused = function(TweenIdentifier, IsPaused, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
if (argName === "IsPaused") return IsPaused;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.SetPausedContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getArgument("JumpToEnd");
}
if (isConditionTrue_0) {
}

}


};gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Exists(eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.GDObjectObjects1[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetTime((gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Duration(eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext)), eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext);
}
}

{ //Subevents
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTween = function(TweenIdentifier, JumpToEnd, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
if (argName === "JumpToEnd") return JumpToEnd;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.StopTweenContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Exists(eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.GDObjectObjects1[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetPaused(eventsFunctionContext.getArgument("TweenIdentifier"), true, eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTween = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.PauseTweenContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Exists(eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.GDObjectObjects1[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).SetPaused(eventsFunctionContext.getArgument("TweenIdentifier"), false, eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTween = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ResumeTweenContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Exists(eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects1[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects1[i].variableRemoveChild(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects1[i].getVariables().get("_Tween3D").getChild("Tweens"), eventsFunctionContext.getArgument("TweenIdentifier"));
}
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).InvalidateTweenIdentifiers(eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTween = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.RemoveTweenContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExistsContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExistsContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExistsContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExistsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExistsContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExistsContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExistsContext.GDObjectObjects1[i].variableChildExists(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExistsContext.GDObjectObjects1[i].getVariables().get("_Tween3D").getChild("Tweens"), eventsFunctionContext.getArgument("TweenIdentifier")) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExistsContext.GDObjectObjects1[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExistsContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExistsContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = true;}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.Exists = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExistsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExistsContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExistsContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExistsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ExistsContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Exists(eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).HasFinished(eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).IsPaused(eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1.length = k;
}
}
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = true;}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlaying = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.IsPlayingContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.HasFinishedContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.HasFinishedContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.HasFinishedContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.HasFinishedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.HasFinishedContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.HasFinishedContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.HasFinishedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Progress(eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext) >= 1 ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.HasFinishedContext.GDObjectObjects1[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.HasFinishedContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.HasFinishedContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = true;}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.HasFinished = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.HasFinishedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.HasFinishedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.HasFinishedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.HasFinishedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.HasFinishedContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Exists(eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects1[k] = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects1 */
{eventsFunctionContext.returnValue = (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Time(eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext)) / (( gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).Duration(eventsFunctionContext.getArgument("TweenIdentifier"), eventsFunctionContext));}
}

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.Progress = function(TweenIdentifier, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "TweenIdentifier") return TweenIdentifier;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.ProgressContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenIdentifierContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenIdentifierContext.GDObjectObjects1= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenIdentifierContext.userFunc0x9f1c28 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];

const childIndex = eventsFunctionContext.getArgument("ChildIndex");

object.__Tween3D = object.__Tween3D || {};
object.__Tween3D.variableIdentifiers =
    object.__Tween3D.variableIdentifiers
    || Object.keys(object.getVariables().get("_Tween3D").getChild("Tweens").getAllChildren());

eventsFunctionContext.returnValue = object.__Tween3D.variableIdentifiers[childIndex];

};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenIdentifierContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenIdentifierContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenIdentifierContext.GDObjectObjects1;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenIdentifierContext.userFunc0x9f1c28(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenIdentifier = function(ChildIndex, parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "ChildIndex") return ChildIndex;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenIdentifierContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenIdentifierContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.TweenIdentifierContext.GDObjectObjects1.length = 0;


return "" + eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InvalidateTweenIdentifiersContext = {};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InvalidateTweenIdentifiersContext.GDObjectObjects1= [];


gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InvalidateTweenIdentifiersContext.userFunc0x98c888 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const object = objects[0];

object.__Tween3D = object.__Tween3D || {};
object.__Tween3D.variableIdentifiers = null;

};
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InvalidateTweenIdentifiersContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InvalidateTweenIdentifiersContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InvalidateTweenIdentifiersContext.GDObjectObjects1;
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InvalidateTweenIdentifiersContext.userFunc0x98c888(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InvalidateTweenIdentifiers = function(parentEventsFunctionContext) {

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
, "Object3D": this._getObject3D()
, "Scale": this._getScale()
, "Tween": this._getTween()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InvalidateTweenIdentifiersContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InvalidateTweenIdentifiersContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Tween3D.Tween3D.prototype.InvalidateTweenIdentifiersContext.GDObjectObjects1.length = 0;


return;
}


gdjs.registerBehavior("Tween3D::Tween3D", gdjs.evtsExt__Tween3D__Tween3D.Tween3D);
