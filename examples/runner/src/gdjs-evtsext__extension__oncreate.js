
gdjs.evtsExt__Extension__OnCreate = gdjs.evtsExt__Extension__OnCreate || {};

/**
 * Behavior generated from 
 */
gdjs.evtsExt__Extension__OnCreate.OnCreate = class OnCreate extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__Extension__OnCreate.OnCreate.getSharedData(
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
 * Shared data generated from 
 */
gdjs.evtsExt__Extension__OnCreate.OnCreate.SharedData = class OnCreateSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__Extension__OnCreate.OnCreate.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._Extension_OnCreateSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._Extension_OnCreateSharedData = new gdjs.evtsExt__Extension__OnCreate.OnCreate.SharedData(
      initialData
    );
  }
  return instanceContainer._Extension_OnCreateSharedData;
}

// Methods:
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.onCreatedContext = {};
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.onCreatedContext.GDObjectObjects2= [];


gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.onCreatedContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.onCreatedContext.GDObjectObjects1[i].toggleVariableBoolean(gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.onCreatedContext.GDObjectObjects1[i].getVariables().get("ObjectCreated"));
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.onCreatedContext.GDObjectObjects1[i].resetTimer("SinceCreated");
}
}
}

}


};

gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.onCreated = function(parentEventsFunctionContext) {

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

gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.onCreatedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.onCreatedContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext = {};
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects2= [];


gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects1[i].getTimerElapsedTimeInSecondsOrNaN("SinceCreated") >= 0.03 ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects1[k] = gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(26130572);
}
}
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects1[i].toggleVariableBoolean(gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects1[i].getVariables().get("ObjectCreated"));
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects1[i].removeTimer("SinceCreated");
}
}
}

}


};

gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEvents = function(parentEventsFunctionContext) {
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

gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext = {};
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1= [];
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects2= [];


gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1[i].getVariableBoolean(gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1[i].getVariables().get("ObjectCreated"), true) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1[k] = gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = true;}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1[i].getVariableBoolean(gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1[i].getVariables().get("ObjectCreated"), false) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1[k] = gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = false;}
}

}


};

gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.Function = function(Is_Object_created, parentEventsFunctionContext) {

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
if (argName === "Is_Object_created") return Is_Object_created;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__OnCreate.OnCreate.prototype.FunctionContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}


gdjs.registerBehavior("Extension::OnCreate", gdjs.evtsExt__Extension__OnCreate.OnCreate);
