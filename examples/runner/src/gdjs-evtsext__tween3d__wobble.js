
gdjs.evtsExt__Tween3D__Wobble = gdjs.evtsExt__Tween3D__Wobble || {};

/**
 * Behavior generated from 3D wobble
 */
gdjs.evtsExt__Tween3D__Wobble.Wobble = class Wobble extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__Tween3D__Wobble.Wobble.getSharedData(
      instanceContainer,
      behaviorData.name
    );
    
    this._behaviorData.ScaleMin = behaviorData.ScaleMin !== undefined ? behaviorData.ScaleMin : Number("0.75") || 0;
    this._behaviorData.ScaleMax = behaviorData.ScaleMax !== undefined ? behaviorData.ScaleMax : Number("1") || 0;
    this._behaviorData.PeriodDuration = behaviorData.PeriodDuration !== undefined ? behaviorData.PeriodDuration : Number("1") || 0;
    this._behaviorData.ScalePeriodOffset = behaviorData.ScalePeriodOffset !== undefined ? behaviorData.ScalePeriodOffset : Number("0") || 0;
    this._behaviorData.StretchMin = behaviorData.StretchMin !== undefined ? behaviorData.StretchMin : Number("1") || 0;
    this._behaviorData.StretchMax = behaviorData.StretchMax !== undefined ? behaviorData.StretchMax : Number("1.25") || 0;
    this._behaviorData.StretchPeriodOffset = behaviorData.StretchPeriodOffset !== undefined ? behaviorData.StretchPeriodOffset : Number("-0.25") || 0;
    this._behaviorData.Angle = Number("0") || 0;
    this._behaviorData.ScaleMinTweenTarget = Number("0") || 0;
    this._behaviorData.ScaleMinTweenDuration = Number("0") || 0;
    this._behaviorData.ScaleMinTweenEasing = "";
    this._behaviorData.ScaleMaxTweenTarget = Number("0") || 0;
    this._behaviorData.ScaleMaxTweenDuration = Number("0") || 0;
    this._behaviorData.ScaleMaxTweenEasing = "";
    this._behaviorData.ScaleMinTweenTime = Number("0") || 0;
    this._behaviorData.ScaleMaxTweenTime = Number("0") || 0;
    this._behaviorData.ScaleMinTweenInitialValue = Number("0") || 0;
    this._behaviorData.ScaleMaxTweenInitialValue = Number("0") || 0;
    this._behaviorData.Top = behaviorData.Top !== undefined ? behaviorData.Top : "Z+";
    this._behaviorData.Tween3D = behaviorData.Tween3D !== undefined ? behaviorData.Tween3D : "";
  }

  // Hot-reload:
  updateFromBehaviorData(oldBehaviorData, newBehaviorData) {
    
    if (oldBehaviorData.ScaleMin !== newBehaviorData.ScaleMin)
      this._behaviorData.ScaleMin = newBehaviorData.ScaleMin;
    if (oldBehaviorData.ScaleMax !== newBehaviorData.ScaleMax)
      this._behaviorData.ScaleMax = newBehaviorData.ScaleMax;
    if (oldBehaviorData.PeriodDuration !== newBehaviorData.PeriodDuration)
      this._behaviorData.PeriodDuration = newBehaviorData.PeriodDuration;
    if (oldBehaviorData.ScalePeriodOffset !== newBehaviorData.ScalePeriodOffset)
      this._behaviorData.ScalePeriodOffset = newBehaviorData.ScalePeriodOffset;
    if (oldBehaviorData.StretchMin !== newBehaviorData.StretchMin)
      this._behaviorData.StretchMin = newBehaviorData.StretchMin;
    if (oldBehaviorData.StretchMax !== newBehaviorData.StretchMax)
      this._behaviorData.StretchMax = newBehaviorData.StretchMax;
    if (oldBehaviorData.StretchPeriodOffset !== newBehaviorData.StretchPeriodOffset)
      this._behaviorData.StretchPeriodOffset = newBehaviorData.StretchPeriodOffset;
    if (oldBehaviorData.Angle !== newBehaviorData.Angle)
      this._behaviorData.Angle = newBehaviorData.Angle;
    if (oldBehaviorData.ScaleMinTweenTarget !== newBehaviorData.ScaleMinTweenTarget)
      this._behaviorData.ScaleMinTweenTarget = newBehaviorData.ScaleMinTweenTarget;
    if (oldBehaviorData.ScaleMinTweenDuration !== newBehaviorData.ScaleMinTweenDuration)
      this._behaviorData.ScaleMinTweenDuration = newBehaviorData.ScaleMinTweenDuration;
    if (oldBehaviorData.ScaleMinTweenEasing !== newBehaviorData.ScaleMinTweenEasing)
      this._behaviorData.ScaleMinTweenEasing = newBehaviorData.ScaleMinTweenEasing;
    if (oldBehaviorData.ScaleMaxTweenTarget !== newBehaviorData.ScaleMaxTweenTarget)
      this._behaviorData.ScaleMaxTweenTarget = newBehaviorData.ScaleMaxTweenTarget;
    if (oldBehaviorData.ScaleMaxTweenDuration !== newBehaviorData.ScaleMaxTweenDuration)
      this._behaviorData.ScaleMaxTweenDuration = newBehaviorData.ScaleMaxTweenDuration;
    if (oldBehaviorData.ScaleMaxTweenEasing !== newBehaviorData.ScaleMaxTweenEasing)
      this._behaviorData.ScaleMaxTweenEasing = newBehaviorData.ScaleMaxTweenEasing;
    if (oldBehaviorData.ScaleMinTweenTime !== newBehaviorData.ScaleMinTweenTime)
      this._behaviorData.ScaleMinTweenTime = newBehaviorData.ScaleMinTweenTime;
    if (oldBehaviorData.ScaleMaxTweenTime !== newBehaviorData.ScaleMaxTweenTime)
      this._behaviorData.ScaleMaxTweenTime = newBehaviorData.ScaleMaxTweenTime;
    if (oldBehaviorData.ScaleMinTweenInitialValue !== newBehaviorData.ScaleMinTweenInitialValue)
      this._behaviorData.ScaleMinTweenInitialValue = newBehaviorData.ScaleMinTweenInitialValue;
    if (oldBehaviorData.ScaleMaxTweenInitialValue !== newBehaviorData.ScaleMaxTweenInitialValue)
      this._behaviorData.ScaleMaxTweenInitialValue = newBehaviorData.ScaleMaxTweenInitialValue;
    if (oldBehaviorData.Top !== newBehaviorData.Top)
      this._behaviorData.Top = newBehaviorData.Top;
    if (oldBehaviorData.Tween3D !== newBehaviorData.Tween3D)
      this._behaviorData.Tween3D = newBehaviorData.Tween3D;

    return true;
  }

  // Network sync:
  getNetworkSyncData() {
    return {
      ...super.getNetworkSyncData(),
      props: {
        
    ScaleMin: this._behaviorData.ScaleMin,
    ScaleMax: this._behaviorData.ScaleMax,
    PeriodDuration: this._behaviorData.PeriodDuration,
    ScalePeriodOffset: this._behaviorData.ScalePeriodOffset,
    StretchMin: this._behaviorData.StretchMin,
    StretchMax: this._behaviorData.StretchMax,
    StretchPeriodOffset: this._behaviorData.StretchPeriodOffset,
    Angle: this._behaviorData.Angle,
    ScaleMinTweenTarget: this._behaviorData.ScaleMinTweenTarget,
    ScaleMinTweenDuration: this._behaviorData.ScaleMinTweenDuration,
    ScaleMinTweenEasing: this._behaviorData.ScaleMinTweenEasing,
    ScaleMaxTweenTarget: this._behaviorData.ScaleMaxTweenTarget,
    ScaleMaxTweenDuration: this._behaviorData.ScaleMaxTweenDuration,
    ScaleMaxTweenEasing: this._behaviorData.ScaleMaxTweenEasing,
    ScaleMinTweenTime: this._behaviorData.ScaleMinTweenTime,
    ScaleMaxTweenTime: this._behaviorData.ScaleMaxTweenTime,
    ScaleMinTweenInitialValue: this._behaviorData.ScaleMinTweenInitialValue,
    ScaleMaxTweenInitialValue: this._behaviorData.ScaleMaxTweenInitialValue,
    Top: this._behaviorData.Top,
    Tween3D: this._behaviorData.Tween3D,
      }
    };
  }
  updateFromNetworkSyncData(networkSyncData) {
    super.updateFromNetworkSyncData(networkSyncData);
    
    if (networkSyncData.props.ScaleMin !== undefined)
      this._behaviorData.ScaleMin = networkSyncData.props.ScaleMin;
    if (networkSyncData.props.ScaleMax !== undefined)
      this._behaviorData.ScaleMax = networkSyncData.props.ScaleMax;
    if (networkSyncData.props.PeriodDuration !== undefined)
      this._behaviorData.PeriodDuration = networkSyncData.props.PeriodDuration;
    if (networkSyncData.props.ScalePeriodOffset !== undefined)
      this._behaviorData.ScalePeriodOffset = networkSyncData.props.ScalePeriodOffset;
    if (networkSyncData.props.StretchMin !== undefined)
      this._behaviorData.StretchMin = networkSyncData.props.StretchMin;
    if (networkSyncData.props.StretchMax !== undefined)
      this._behaviorData.StretchMax = networkSyncData.props.StretchMax;
    if (networkSyncData.props.StretchPeriodOffset !== undefined)
      this._behaviorData.StretchPeriodOffset = networkSyncData.props.StretchPeriodOffset;
    if (networkSyncData.props.Angle !== undefined)
      this._behaviorData.Angle = networkSyncData.props.Angle;
    if (networkSyncData.props.ScaleMinTweenTarget !== undefined)
      this._behaviorData.ScaleMinTweenTarget = networkSyncData.props.ScaleMinTweenTarget;
    if (networkSyncData.props.ScaleMinTweenDuration !== undefined)
      this._behaviorData.ScaleMinTweenDuration = networkSyncData.props.ScaleMinTweenDuration;
    if (networkSyncData.props.ScaleMinTweenEasing !== undefined)
      this._behaviorData.ScaleMinTweenEasing = networkSyncData.props.ScaleMinTweenEasing;
    if (networkSyncData.props.ScaleMaxTweenTarget !== undefined)
      this._behaviorData.ScaleMaxTweenTarget = networkSyncData.props.ScaleMaxTweenTarget;
    if (networkSyncData.props.ScaleMaxTweenDuration !== undefined)
      this._behaviorData.ScaleMaxTweenDuration = networkSyncData.props.ScaleMaxTweenDuration;
    if (networkSyncData.props.ScaleMaxTweenEasing !== undefined)
      this._behaviorData.ScaleMaxTweenEasing = networkSyncData.props.ScaleMaxTweenEasing;
    if (networkSyncData.props.ScaleMinTweenTime !== undefined)
      this._behaviorData.ScaleMinTweenTime = networkSyncData.props.ScaleMinTweenTime;
    if (networkSyncData.props.ScaleMaxTweenTime !== undefined)
      this._behaviorData.ScaleMaxTweenTime = networkSyncData.props.ScaleMaxTweenTime;
    if (networkSyncData.props.ScaleMinTweenInitialValue !== undefined)
      this._behaviorData.ScaleMinTweenInitialValue = networkSyncData.props.ScaleMinTweenInitialValue;
    if (networkSyncData.props.ScaleMaxTweenInitialValue !== undefined)
      this._behaviorData.ScaleMaxTweenInitialValue = networkSyncData.props.ScaleMaxTweenInitialValue;
    if (networkSyncData.props.Top !== undefined)
      this._behaviorData.Top = networkSyncData.props.Top;
    if (networkSyncData.props.Tween3D !== undefined)
      this._behaviorData.Tween3D = networkSyncData.props.Tween3D;
  }

  // Properties:
  
  _getScaleMin() {
    return this._behaviorData.ScaleMin !== undefined ? this._behaviorData.ScaleMin : Number("0.75") || 0;
  }
  _setScaleMin(newValue) {
    this._behaviorData.ScaleMin = newValue;
  }
  _getScaleMax() {
    return this._behaviorData.ScaleMax !== undefined ? this._behaviorData.ScaleMax : Number("1") || 0;
  }
  _setScaleMax(newValue) {
    this._behaviorData.ScaleMax = newValue;
  }
  _getPeriodDuration() {
    return this._behaviorData.PeriodDuration !== undefined ? this._behaviorData.PeriodDuration : Number("1") || 0;
  }
  _setPeriodDuration(newValue) {
    this._behaviorData.PeriodDuration = newValue;
  }
  _getScalePeriodOffset() {
    return this._behaviorData.ScalePeriodOffset !== undefined ? this._behaviorData.ScalePeriodOffset : Number("0") || 0;
  }
  _setScalePeriodOffset(newValue) {
    this._behaviorData.ScalePeriodOffset = newValue;
  }
  _getStretchMin() {
    return this._behaviorData.StretchMin !== undefined ? this._behaviorData.StretchMin : Number("1") || 0;
  }
  _setStretchMin(newValue) {
    this._behaviorData.StretchMin = newValue;
  }
  _getStretchMax() {
    return this._behaviorData.StretchMax !== undefined ? this._behaviorData.StretchMax : Number("1.25") || 0;
  }
  _setStretchMax(newValue) {
    this._behaviorData.StretchMax = newValue;
  }
  _getStretchPeriodOffset() {
    return this._behaviorData.StretchPeriodOffset !== undefined ? this._behaviorData.StretchPeriodOffset : Number("-0.25") || 0;
  }
  _setStretchPeriodOffset(newValue) {
    this._behaviorData.StretchPeriodOffset = newValue;
  }
  _getAngle() {
    return this._behaviorData.Angle !== undefined ? this._behaviorData.Angle : Number("0") || 0;
  }
  _setAngle(newValue) {
    this._behaviorData.Angle = newValue;
  }
  _getScaleMinTweenTarget() {
    return this._behaviorData.ScaleMinTweenTarget !== undefined ? this._behaviorData.ScaleMinTweenTarget : Number("0") || 0;
  }
  _setScaleMinTweenTarget(newValue) {
    this._behaviorData.ScaleMinTweenTarget = newValue;
  }
  _getScaleMinTweenDuration() {
    return this._behaviorData.ScaleMinTweenDuration !== undefined ? this._behaviorData.ScaleMinTweenDuration : Number("0") || 0;
  }
  _setScaleMinTweenDuration(newValue) {
    this._behaviorData.ScaleMinTweenDuration = newValue;
  }
  _getScaleMinTweenEasing() {
    return this._behaviorData.ScaleMinTweenEasing !== undefined ? this._behaviorData.ScaleMinTweenEasing : "";
  }
  _setScaleMinTweenEasing(newValue) {
    this._behaviorData.ScaleMinTweenEasing = newValue;
  }
  _getScaleMaxTweenTarget() {
    return this._behaviorData.ScaleMaxTweenTarget !== undefined ? this._behaviorData.ScaleMaxTweenTarget : Number("0") || 0;
  }
  _setScaleMaxTweenTarget(newValue) {
    this._behaviorData.ScaleMaxTweenTarget = newValue;
  }
  _getScaleMaxTweenDuration() {
    return this._behaviorData.ScaleMaxTweenDuration !== undefined ? this._behaviorData.ScaleMaxTweenDuration : Number("0") || 0;
  }
  _setScaleMaxTweenDuration(newValue) {
    this._behaviorData.ScaleMaxTweenDuration = newValue;
  }
  _getScaleMaxTweenEasing() {
    return this._behaviorData.ScaleMaxTweenEasing !== undefined ? this._behaviorData.ScaleMaxTweenEasing : "";
  }
  _setScaleMaxTweenEasing(newValue) {
    this._behaviorData.ScaleMaxTweenEasing = newValue;
  }
  _getScaleMinTweenTime() {
    return this._behaviorData.ScaleMinTweenTime !== undefined ? this._behaviorData.ScaleMinTweenTime : Number("0") || 0;
  }
  _setScaleMinTweenTime(newValue) {
    this._behaviorData.ScaleMinTweenTime = newValue;
  }
  _getScaleMaxTweenTime() {
    return this._behaviorData.ScaleMaxTweenTime !== undefined ? this._behaviorData.ScaleMaxTweenTime : Number("0") || 0;
  }
  _setScaleMaxTweenTime(newValue) {
    this._behaviorData.ScaleMaxTweenTime = newValue;
  }
  _getScaleMinTweenInitialValue() {
    return this._behaviorData.ScaleMinTweenInitialValue !== undefined ? this._behaviorData.ScaleMinTweenInitialValue : Number("0") || 0;
  }
  _setScaleMinTweenInitialValue(newValue) {
    this._behaviorData.ScaleMinTweenInitialValue = newValue;
  }
  _getScaleMaxTweenInitialValue() {
    return this._behaviorData.ScaleMaxTweenInitialValue !== undefined ? this._behaviorData.ScaleMaxTweenInitialValue : Number("0") || 0;
  }
  _setScaleMaxTweenInitialValue(newValue) {
    this._behaviorData.ScaleMaxTweenInitialValue = newValue;
  }
  _getTop() {
    return this._behaviorData.Top !== undefined ? this._behaviorData.Top : "Z+";
  }
  _setTop(newValue) {
    this._behaviorData.Top = newValue;
  }
  _getTween3D() {
    return this._behaviorData.Tween3D !== undefined ? this._behaviorData.Tween3D : "";
  }
  _setTween3D(newValue) {
    this._behaviorData.Tween3D = newValue;
  }
}

/**
 * Shared data generated from 3D wobble
 */
gdjs.evtsExt__Tween3D__Wobble.Wobble.SharedData = class WobbleSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__Tween3D__Wobble.Wobble.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._Tween3D_WobbleSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._Tween3D_WobbleSharedData = new gdjs.evtsExt__Tween3D__Wobble.Wobble.SharedData(
      initialData
    );
  }
  return instanceContainer._Tween3D_WobbleSharedData;
}

// Methods:
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.onCreatedContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.onCreatedContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.onCreatedContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).UpdateScaleVolume(eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).UpdateStretch(eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.onCreated = function(parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.onCreatedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.onCreatedContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects2= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects3= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMinTweenTime() >= eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMinTweenDuration());
}
if (isConditionTrue_0) {
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMin(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMinTweenTarget())
}
}

}


};gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMaxTweenTime() >= eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMaxTweenDuration());
}
if (isConditionTrue_0) {
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMin(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMinTweenTarget())
}
}

}


};gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.eventsList2 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMinTweenTime() < eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMinTweenDuration());
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects2);
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMinTweenTime(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMinTweenTime()+(( gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects2.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects2[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).TimeDelta(eventsFunctionContext)))
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMin(gdjs.evtsExt__Tween3D__EaseExp.func(runtimeScene, eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMinTweenEasing(), eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMinTweenInitialValue(), eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMinTweenTarget(), eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMinTweenTime() / eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMinTweenDuration(), eventsFunctionContext))
}

{ //Subevents
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMaxTweenTime() < eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMaxTweenDuration());
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects1);
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMaxTweenTime(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMaxTweenTime()+(( gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).TimeDelta(eventsFunctionContext)))
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMax(gdjs.evtsExt__Tween3D__EaseExp.func(runtimeScene, eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMaxTweenEasing(), eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMaxTweenInitialValue(), eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMaxTweenTarget(), eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMaxTweenTime() / eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMaxTweenDuration(), eventsFunctionContext))
}

{ //Subevents
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.eventsList1(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.eventsList3 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects2);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).UpdateScaleVolume(eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).UpdateStretch(eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects1);
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setAngle(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getAngle()+gdjs.evtTools.common.mod((( gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).TimeDelta(eventsFunctionContext)) * 2 * gdjs.evtTools.common.pi() / eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getPeriodDuration(), 2 * gdjs.evtTools.common.pi()))
}
}

}


};gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.eventsList4 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.eventsList2(runtimeScene, eventsFunctionContext);
}


{


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.eventsList3(runtimeScene, eventsFunctionContext);
}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEvents = function(parentEventsFunctionContext) {
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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects3.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.eventsList4(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.doStepPreEventsContext.GDObjectObjects3.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMinContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMinContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMinContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMinContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.returnValue = eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMin();}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMin = function(parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMinContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMinContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMinContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMinContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMinContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMinContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMinContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMin(eventsFunctionContext.getArgument("Value"))
}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMin = function(Value, parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMinContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMinContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMinContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMaxContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMaxContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMaxContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMaxContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.returnValue = eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMax();}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMax = function(parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMaxContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMaxContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScaleMaxContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMaxContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMaxContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMaxContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMaxContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMax(eventsFunctionContext.getArgument("Value"))
}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMax = function(Value, parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMaxContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMaxContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScaleMaxContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMinContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMinContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMinContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMinContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMinContext.GDObjectObjects1);
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMinTweenInitialValue((( gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMinContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMinContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).ScaleMin(eventsFunctionContext)))
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMinTweenTime(0)
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMinTweenTarget(eventsFunctionContext.getArgument("TargetedValue"))
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMinTweenDuration(eventsFunctionContext.getArgument("Duration"))
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMinTweenEasing(eventsFunctionContext.getArgument("Easing"))
}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMin = function(TargetedValue, Duration, Easing, parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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
if (argName === "TargetedValue") return TargetedValue;
if (argName === "Duration") return Duration;
if (argName === "Easing") return Easing;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMinContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMinContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMinContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMaxContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMaxContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMaxContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMaxContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMaxContext.GDObjectObjects1);
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMaxTweenInitialValue((( gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMaxContext.GDObjectObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMaxContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).ScaleMax(eventsFunctionContext)))
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMaxTweenTime(0)
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMaxTweenTarget(eventsFunctionContext.getArgument("TargetedValue"))
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMaxTweenDuration(eventsFunctionContext.getArgument("Duration"))
}
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScaleMaxTweenEasing(eventsFunctionContext.getArgument("Easing"))
}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMax = function(TargetedValue, Duration, Easing, parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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
if (argName === "TargetedValue") return TargetedValue;
if (argName === "Duration") return Duration;
if (argName === "Easing") return Easing;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMaxContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMaxContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TweenScaleMaxContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TimeDeltaContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TimeDeltaContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TimeDeltaContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TimeDeltaContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TimeDeltaContext.GDObjectObjects1);
{eventsFunctionContext.returnValue = gdjs.evtTools.runtimeScene.getElapsedTimeInSeconds(runtimeScene) * gdjs.evtTools.camera.getLayerTimeScale(runtimeScene, (( gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TimeDeltaContext.GDObjectObjects1.length === 0 ) ? "" :gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TimeDeltaContext.GDObjectObjects1[0].getLayer()));}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TimeDelta = function(parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TimeDeltaContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TimeDeltaContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TimeDeltaContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TimeDeltaContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.TimeDeltaContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateScaleVolumeContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateScaleVolumeContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateScaleVolumeContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateScaleVolumeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateScaleVolumeContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateScaleVolumeContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateScaleVolumeContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween3D")).SetScaleVolume(Math.exp(Math.log(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMin()) + (Math.log(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMax()) - Math.log(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScaleMin())) * Math.sin(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getAngle() + eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScalePeriodOffset() / eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getPeriodDuration() * 2 * gdjs.evtTools.common.pi())), eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateScaleVolume = function(parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateScaleVolumeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateScaleVolumeContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateScaleVolumeContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateScaleVolumeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateScaleVolumeContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateStretchContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateStretchContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateStretchContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateStretchContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTop() == "Z+");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateStretchContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateStretchContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateStretchContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween3D")).SetStretchZ(Math.exp(Math.log(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getStretchMin()) + (Math.log(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getStretchMax()) - Math.log(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getStretchMin())) * Math.sin(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getAngle() + eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getStretchPeriodOffset() / eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getPeriodDuration() * 2 * gdjs.evtTools.common.pi())), eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getTop() == "Y-");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateStretchContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateStretchContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateStretchContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween3D")).SetStretchY(Math.exp(Math.log(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getStretchMin()) + (Math.log(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getStretchMax()) - Math.log(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getStretchMin())) * Math.sin(eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getAngle() + eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getStretchPeriodOffset() / eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getPeriodDuration() * 2 * gdjs.evtTools.common.pi())), eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateStretch = function(parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateStretchContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateStretchContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateStretchContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateStretchContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.UpdateStretchContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.PeriodDurationContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.PeriodDurationContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.PeriodDurationContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.PeriodDurationContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.returnValue = eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getPeriodDuration();}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.PeriodDuration = function(parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.PeriodDurationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.PeriodDurationContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.PeriodDurationContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.PeriodDurationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.PeriodDurationContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetPeriodDurationContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetPeriodDurationContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetPeriodDurationContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetPeriodDurationContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setPeriodDuration(eventsFunctionContext.getArgument("Value"))
}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetPeriodDuration = function(Value, parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetPeriodDurationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetPeriodDurationContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetPeriodDurationContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetPeriodDurationContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetPeriodDurationContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScalePeriodOffsetContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScalePeriodOffsetContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScalePeriodOffsetContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScalePeriodOffsetContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.returnValue = eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getScalePeriodOffset();}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScalePeriodOffset = function(parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScalePeriodOffsetContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScalePeriodOffsetContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScalePeriodOffsetContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScalePeriodOffsetContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.ScalePeriodOffsetContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScalePeriodOffsetContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScalePeriodOffsetContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScalePeriodOffsetContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScalePeriodOffsetContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setScalePeriodOffset(eventsFunctionContext.getArgument("Value"))
}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScalePeriodOffset = function(Value, parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScalePeriodOffsetContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScalePeriodOffsetContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScalePeriodOffsetContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScalePeriodOffsetContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetScalePeriodOffsetContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMinContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMinContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMinContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMinContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.returnValue = eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getStretchMin();}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMin = function(parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMinContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMinContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMinContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMinContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMinContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMinContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMinContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setStretchMin(eventsFunctionContext.getArgument("Value"))
}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMin = function(Value, parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMinContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMinContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMinContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMinContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMaxContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMaxContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMaxContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMaxContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.returnValue = eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getStretchMax();}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMax = function(parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMaxContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMaxContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchMaxContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMaxContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMaxContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMaxContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMaxContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setStretchMax(eventsFunctionContext.getArgument("Value"))
}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMax = function(Value, parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMaxContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMaxContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMaxContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchMaxContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchPeriodOffsetContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchPeriodOffsetContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchPeriodOffsetContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchPeriodOffsetContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.returnValue = eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getStretchPeriodOffset();}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchPeriodOffset = function(parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchPeriodOffsetContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchPeriodOffsetContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchPeriodOffsetContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchPeriodOffsetContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.StretchPeriodOffsetContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchPeriodOffsetContext = {};
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchPeriodOffsetContext.GDObjectObjects1= [];
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchPeriodOffsetContext.GDObjectObjects2= [];


gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchPeriodOffsetContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.getObjects("Object")[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setStretchPeriodOffset(eventsFunctionContext.getArgument("Value"))
}
}

}


};

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchPeriodOffset = function(Value, parentEventsFunctionContext) {

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
, "Tween3D": this._getTween3D()
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

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchPeriodOffsetContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchPeriodOffsetContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchPeriodOffsetContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchPeriodOffsetContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Tween3D__Wobble.Wobble.prototype.SetStretchPeriodOffsetContext.GDObjectObjects2.length = 0;


return;
}


gdjs.registerBehavior("Tween3D::Wobble", gdjs.evtsExt__Tween3D__Wobble.Wobble);
