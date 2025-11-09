
gdjs.evtsExt__Extension__UpDownZAnim = gdjs.evtsExt__Extension__UpDownZAnim || {};

/**
 * Behavior generated from 
 */
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim = class UpDownZAnim extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.getSharedData(
      instanceContainer,
      behaviorData.name
    );
    
    this._behaviorData.Started = behaviorData.Started !== undefined ? behaviorData.Started : false;
    this._behaviorData.Property = behaviorData.Property !== undefined ? behaviorData.Property : "";
    this._behaviorData.Property2 = behaviorData.Property2 !== undefined ? behaviorData.Property2 : "";
    this._behaviorData.Height = behaviorData.Height !== undefined ? behaviorData.Height : Number("5") || 0;
    this._behaviorData.Duration = behaviorData.Duration !== undefined ? behaviorData.Duration : Number("1") || 0;
    this._behaviorData.InitialZ = behaviorData.InitialZ !== undefined ? behaviorData.InitialZ : Number("") || 0;
  }

  // Hot-reload:
  updateFromBehaviorData(oldBehaviorData, newBehaviorData) {
    
    if (oldBehaviorData.Started !== newBehaviorData.Started)
      this._behaviorData.Started = newBehaviorData.Started;
    if (oldBehaviorData.Property !== newBehaviorData.Property)
      this._behaviorData.Property = newBehaviorData.Property;
    if (oldBehaviorData.Property2 !== newBehaviorData.Property2)
      this._behaviorData.Property2 = newBehaviorData.Property2;
    if (oldBehaviorData.Height !== newBehaviorData.Height)
      this._behaviorData.Height = newBehaviorData.Height;
    if (oldBehaviorData.Duration !== newBehaviorData.Duration)
      this._behaviorData.Duration = newBehaviorData.Duration;
    if (oldBehaviorData.InitialZ !== newBehaviorData.InitialZ)
      this._behaviorData.InitialZ = newBehaviorData.InitialZ;

    return true;
  }

  // Network sync:
  getNetworkSyncData() {
    return {
      ...super.getNetworkSyncData(),
      props: {
        
    Started: this._behaviorData.Started,
    Property: this._behaviorData.Property,
    Property2: this._behaviorData.Property2,
    Height: this._behaviorData.Height,
    Duration: this._behaviorData.Duration,
    InitialZ: this._behaviorData.InitialZ,
      }
    };
  }
  updateFromNetworkSyncData(networkSyncData) {
    super.updateFromNetworkSyncData(networkSyncData);
    
    if (networkSyncData.props.Started !== undefined)
      this._behaviorData.Started = networkSyncData.props.Started;
    if (networkSyncData.props.Property !== undefined)
      this._behaviorData.Property = networkSyncData.props.Property;
    if (networkSyncData.props.Property2 !== undefined)
      this._behaviorData.Property2 = networkSyncData.props.Property2;
    if (networkSyncData.props.Height !== undefined)
      this._behaviorData.Height = networkSyncData.props.Height;
    if (networkSyncData.props.Duration !== undefined)
      this._behaviorData.Duration = networkSyncData.props.Duration;
    if (networkSyncData.props.InitialZ !== undefined)
      this._behaviorData.InitialZ = networkSyncData.props.InitialZ;
  }

  // Properties:
  
  _getStarted() {
    return this._behaviorData.Started !== undefined ? this._behaviorData.Started : false;
  }
  _setStarted(newValue) {
    this._behaviorData.Started = newValue;
  }
  _toggleStarted() {
    this._setStarted(!this._getStarted());
  }
  _getProperty() {
    return this._behaviorData.Property !== undefined ? this._behaviorData.Property : "";
  }
  _setProperty(newValue) {
    this._behaviorData.Property = newValue;
  }
  _getProperty2() {
    return this._behaviorData.Property2 !== undefined ? this._behaviorData.Property2 : "";
  }
  _setProperty2(newValue) {
    this._behaviorData.Property2 = newValue;
  }
  _getHeight() {
    return this._behaviorData.Height !== undefined ? this._behaviorData.Height : Number("5") || 0;
  }
  _setHeight(newValue) {
    this._behaviorData.Height = newValue;
  }
  _getDuration() {
    return this._behaviorData.Duration !== undefined ? this._behaviorData.Duration : Number("1") || 0;
  }
  _setDuration(newValue) {
    this._behaviorData.Duration = newValue;
  }
  _getInitialZ() {
    return this._behaviorData.InitialZ !== undefined ? this._behaviorData.InitialZ : Number("") || 0;
  }
  _setInitialZ(newValue) {
    this._behaviorData.InitialZ = newValue;
  }
}

/**
 * Shared data generated from 
 */
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.SharedData = class UpDownZAnimSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._Extension_UpDownZAnimSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._Extension_UpDownZAnimSharedData = new gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.SharedData(
      initialData
    );
  }
  return instanceContainer._Extension_UpDownZAnimSharedData;
}

// Methods:
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext = {};
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.GDObjectObjects2= [];


gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.asyncCallback26134132 = function (runtimeScene, eventsFunctionContext, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(eventsFunctionContext.localVariables);
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.GDObjectObjects2);
{for(var i = 0, len = gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.GDObjectObjects2[i].returnVariable(gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.GDObjectObjects2[i].getVariables().get("InitialZ")).setNumber((gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Property2")).getZ()));
}
}
eventsFunctionContext.localVariables.length = 0;
}
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(eventsFunctionContext.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0), (runtimeScene) => (gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.asyncCallback26134132(runtimeScene, eventsFunctionContext, asyncObjectsList)));
}
}

}


};gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{

{ //Subevents
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreated = function(parentEventsFunctionContext) {

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
, "Property": this._getProperty()
, "Property2": this._getProperty2()
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

gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.onCreatedContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext = {};
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects2= [];
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects3= [];


gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Property")).hasFinished("z2") ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects2[k] = gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(26134012);
}
}
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects2 */
{for(var i = 0, len = gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Property")).addObjectPositionZTween2(eventsFunctionContext.getBehaviorName(""), "z1", eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getInitialZ() - eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getHeight(), "easeOutSine", eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getDuration() / 2, false);
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Property")).hasFinished("z1") ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1[k] = gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(26129164);
}
}
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Property")).addObjectPositionZTween2(eventsFunctionContext.getBehaviorName(""), "z2", eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getInitialZ() + eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getHeight(), "easeInOutSine", eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getDuration() / 2, false);
}
}
}

}


};gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Property")).isPlaying("initial")) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1[k] = gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Property2")).setZ(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getInitialZ());
}
}
}

}


};gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.eventsList2 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getStarted();
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getStarted();
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.eventsList1(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEvents = function(parentEventsFunctionContext) {
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
, "Property": this._getProperty()
, "Property2": this._getProperty2()
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

gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects3.length = 0;

gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.eventsList2(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.doStepPreEventsContext.GDObjectObjects3.length = 0;


return;
}
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext = {};
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects1= [];
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects2= [];
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects3= [];


gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(26141532);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Property")).addObjectPositionZTween2(eventsFunctionContext.getBehaviorName(""), "z1", eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getInitialZ(), "easeOutSine", 0, false);
}
}
}

}


};gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects2.length;i<l;++i) {
    if ( gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Property2")).getZ() != eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getInitialZ() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects2[k] = gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(26143124);
}
}
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects2 */
{for(var i = 0, len = gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Property")).addObjectPositionZTween2(eventsFunctionContext.getBehaviorName(""), "initial", eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getInitialZ(), "easeOutSine", eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getDuration() / 2, false);
}
}
}

}


{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setStarted(false)
}
}

}


};gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.eventsList2 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(26140052);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects1[i].returnVariable(gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects1[i].getVariables().get("InitialZ")).setNumber((gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Property2")).getZ()));
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getArgument("StartStop");
}
if (isConditionTrue_0) {
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setStarted(true)
}

{ //Subevents
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !eventsFunctionContext.getArgument("StartStop");
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.eventsList1(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnim = function(StartStop, InitialZOrdner, parentEventsFunctionContext) {

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
, "Property": this._getProperty()
, "Property2": this._getProperty2()
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
if (argName === "StartStop") return StartStop;
if (argName === "InitialZOrdner") return InitialZOrdner;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects3.length = 0;

gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.eventsList2(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim.prototype.StartStopAnimContext.GDObjectObjects3.length = 0;


return;
}


gdjs.registerBehavior("Extension::UpDownZAnim", gdjs.evtsExt__Extension__UpDownZAnim.UpDownZAnim);
