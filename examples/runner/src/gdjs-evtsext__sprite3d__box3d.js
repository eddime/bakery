
gdjs.evtsExt__Sprite3D__Box3D = gdjs.evtsExt__Sprite3D__Box3D || {};

/**
 * Object generated from 3D Box
 */
gdjs.evtsExt__Sprite3D__Box3D.Box3D = class Box3D extends gdjs.CustomRuntimeObject3D {
  constructor(parentInstanceContainer, objectData) {
    super(parentInstanceContainer, objectData);
    this._parentInstanceContainer = parentInstanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._objectData = {};
    
    this._objectData.ReceiveShadow = objectData.content.ReceiveShadow !== undefined ? objectData.content.ReceiveShadow : true;
    this._objectData.CastShadow = objectData.content.CastShadow !== undefined ? objectData.content.CastShadow : true;
    this._objectData.Outline = objectData.content.Outline !== undefined ? objectData.content.Outline : true;
    this._objectData.FillColor = objectData.content.FillColor !== undefined ? objectData.content.FillColor : "72;170;204";
    this._objectData.OutlineColor = objectData.content.OutlineColor !== undefined ? objectData.content.OutlineColor : "0;0;0";
    this._objectData.SpriteColor = objectData.content.SpriteColor !== undefined ? objectData.content.SpriteColor : "";
    
    this._animator = new gdjs.SpriteAnimator(
        objectData.animatable.animations,
        gdjs.CustomRuntimeObject3DRenderer.getAnimationFrameTextureManager(
            parentInstanceContainer.getGame().getImageManager()));


    // It calls the onCreated super implementation at the end.
    this.onCreated();
  }

  // Hot-reload:
  updateFromObjectData(oldObjectData, newObjectData) {
    super.updateFromObjectData(oldObjectData, newObjectData);
    if (oldObjectData.content.ReceiveShadow !== newObjectData.content.ReceiveShadow)
      this._objectData.ReceiveShadow = newObjectData.content.ReceiveShadow;
    if (oldObjectData.content.CastShadow !== newObjectData.content.CastShadow)
      this._objectData.CastShadow = newObjectData.content.CastShadow;
    if (oldObjectData.content.Outline !== newObjectData.content.Outline)
      this._objectData.Outline = newObjectData.content.Outline;
    if (oldObjectData.content.FillColor !== newObjectData.content.FillColor)
      this._objectData.FillColor = newObjectData.content.FillColor;
    if (oldObjectData.content.OutlineColor !== newObjectData.content.OutlineColor)
      this._objectData.OutlineColor = newObjectData.content.OutlineColor;
    if (oldObjectData.content.SpriteColor !== newObjectData.content.SpriteColor)
      this._objectData.SpriteColor = newObjectData.content.SpriteColor;

    this.onHotReloading(this._parentInstanceContainer);
    return true;
  }

  // Properties:
  
  _getReceiveShadow() {
    return this._objectData.ReceiveShadow !== undefined ? this._objectData.ReceiveShadow : true;
  }
  _setReceiveShadow(newValue) {
    this._objectData.ReceiveShadow = newValue;
  }
  _toggleReceiveShadow() {
    this._setReceiveShadow(!this._getReceiveShadow());
  }
  _getCastShadow() {
    return this._objectData.CastShadow !== undefined ? this._objectData.CastShadow : true;
  }
  _setCastShadow(newValue) {
    this._objectData.CastShadow = newValue;
  }
  _toggleCastShadow() {
    this._setCastShadow(!this._getCastShadow());
  }
  _getOutline() {
    return this._objectData.Outline !== undefined ? this._objectData.Outline : true;
  }
  _setOutline(newValue) {
    this._objectData.Outline = newValue;
  }
  _toggleOutline() {
    this._setOutline(!this._getOutline());
  }
  _getFillColor() {
    return this._objectData.FillColor !== undefined ? this._objectData.FillColor : "72;170;204";
  }
  _setFillColor(newValue) {
    this._objectData.FillColor = newValue;
  }
  _getOutlineColor() {
    return this._objectData.OutlineColor !== undefined ? this._objectData.OutlineColor : "0;0;0";
  }
  _setOutlineColor(newValue) {
    this._objectData.OutlineColor = newValue;
  }
  _getSpriteColor() {
    return this._objectData.SpriteColor !== undefined ? this._objectData.SpriteColor : "";
  }
  _setSpriteColor(newValue) {
    this._objectData.SpriteColor = newValue;
  }

  
  //  gdjs.Animatable interface implementation
  getAnimator() {
    return this._animator;
  }
  getAnimationIndex() {
    return this._animator.getAnimationIndex();
  }
  setAnimationIndex(animationIndex) {
    this._animator.setAnimationIndex(animationIndex);
  }
  getAnimationName() {
    return this._animator.getAnimationName();
  }
  setAnimationName(animationName) {
    this._animator.setAnimationName(animationName);
  }
  hasAnimationEnded() {
    return this._animator.hasAnimationEnded();
  }
  isAnimationPaused() {
    return this._animator.isAnimationPaused();
  }
  pauseAnimation() {
    this._animator.pauseAnimation();
  }
  resumeAnimation() {
    this._animator.resumeAnimation();
  }
  getAnimationSpeedScale() {
    return this._animator.getAnimationSpeedScale();
  }
  setAnimationSpeedScale(ratio) {
    this._animator.setAnimationSpeedScale(ratio);
  }
  getAnimationElapsedTime() {
    return this._animator.getAnimationElapsedTime();
  }
  setAnimationElapsedTime(time) {
    this._animator.setAnimationElapsedTime(time);
  }
  getAnimationDuration() {
    return this._animator.getAnimationDuration();
  }


  
}

// Methods:
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext = {};
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.GDObjectObjects2= [];
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.GDBoxTextureObjects1= [];
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.GDBoxTextureObjects2= [];


gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.userFunc0xbfd2d8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject} */
const object = objects[0];

// Erstelle einen eigenen Namespace, um Konflikte zu vermeiden
object.__box3DExtension = {};
// Diese Klasse kommt aus der definehelperclass-Datei für die Box
object.__box3DExtension.renderer = new gdjs.__box3DExtension.Box3DRenderer(object);


};
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{gdjs.evtsExt__Sprite3D__DefineHelperClassesBox.func(runtimeScene, eventsFunctionContext);
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.GDObjectObjects1;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.userFunc0xbfd2d8(runtimeScene, objects, eventsFunctionContext);

}


{


let isConditionTrue_0 = false;
{
}

}


};

gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDBoxTextureObjectsList = [...runtimeScene.getObjects("BoxTexture")];
var GDBoxTextureObjects = Hashtable.newFrom({"BoxTexture": thisGDBoxTextureObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "BoxTexture": GDBoxTextureObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "BoxTexture": thisGDBoxTextureObjectsList
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

gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.GDBoxTextureObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.GDBoxTextureObjects2.length = 0;

gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.GDBoxTextureObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.onCreatedContext.GDBoxTextureObjects2.length = 0;

gdjs.CustomRuntimeObject.prototype.onCreated.call(this);

return;
}
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.GetColorContext = {};
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.GetColorContext.GDObjectObjects1= [];
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.GetColorContext.GDObjectObjects2= [];
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.GetColorContext.GDBoxTextureObjects1= [];
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.GetColorContext.GDBoxTextureObjects2= [];


gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.GetColorContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getArgument("GetColor") == "BoxColor");
}
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = eventsFunctionContext.getObjects("Object")[0]._getFillColor();}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getArgument("GetColor") == "SpriteColor");
}
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = eventsFunctionContext.getObjects("Object")[0]._getSpriteColor();}
}

}


};

gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.GetColor = function(GetColor, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDBoxTextureObjectsList = [...runtimeScene.getObjects("BoxTexture")];
var GDBoxTextureObjects = Hashtable.newFrom({"BoxTexture": thisGDBoxTextureObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "BoxTexture": GDBoxTextureObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "BoxTexture": thisGDBoxTextureObjectsList
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
if (argName === "GetColor") return GetColor;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.GetColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.GetColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.GetColorContext.GDBoxTextureObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.GetColorContext.GDBoxTextureObjects2.length = 0;

gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.GetColorContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.GetColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.GetColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.GetColorContext.GDBoxTextureObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.GetColorContext.GDBoxTextureObjects2.length = 0;


return "" + eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.ChangeColorContext = {};
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.ChangeColorContext.GDObjectObjects1= [];
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.ChangeColorContext.GDObjectObjects2= [];
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.ChangeColorContext.GDBoxTextureObjects1= [];
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.ChangeColorContext.GDBoxTextureObjects2= [];


gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.ChangeColorContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.getObjects("Object")[0]._setSpriteColor(eventsFunctionContext.getArgument("BillboardColor"))
}
}

}


{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.getObjects("Object")[0]._setFillColor(eventsFunctionContext.getArgument("BoxColor"))
}
}

}


};

gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.ChangeColor = function(BoxColor, BillboardColor, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDBoxTextureObjectsList = [...runtimeScene.getObjects("BoxTexture")];
var GDBoxTextureObjects = Hashtable.newFrom({"BoxTexture": thisGDBoxTextureObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "BoxTexture": GDBoxTextureObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "BoxTexture": thisGDBoxTextureObjectsList
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
if (argName === "BoxColor") return BoxColor;
if (argName === "BillboardColor") return BillboardColor;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.ChangeColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.ChangeColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.ChangeColorContext.GDBoxTextureObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.ChangeColorContext.GDBoxTextureObjects2.length = 0;

gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.ChangeColorContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.ChangeColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.ChangeColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.ChangeColorContext.GDBoxTextureObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.ChangeColorContext.GDBoxTextureObjects2.length = 0;


return;
}

gdjs.evtsExt__Sprite3D__Box3D.Box3D.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
this._animator.step(this.getElapsedTime() / 1000);
};


gdjs.registerObject("Sprite3D::Box3D", gdjs.evtsExt__Sprite3D__Box3D.Box3D);
