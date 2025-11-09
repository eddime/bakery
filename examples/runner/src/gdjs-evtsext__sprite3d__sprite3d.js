
gdjs.evtsExt__Sprite3D__Sprite3D = gdjs.evtsExt__Sprite3D__Sprite3D || {};

/**
 * Object generated from 3D Sprite
 */
gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D = class Sprite3D extends gdjs.CustomRuntimeObject3D {
  constructor(parentInstanceContainer, objectData) {
    super(parentInstanceContainer, objectData);
    this._parentInstanceContainer = parentInstanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._objectData = {};
    
    this._objectData.ReceiveShadow = objectData.content.ReceiveShadow !== undefined ? objectData.content.ReceiveShadow : true;
    this._objectData.CastShadow = objectData.content.CastShadow !== undefined ? objectData.content.CastShadow : true;
    this._objectData.Axis = objectData.content.Axis !== undefined ? objectData.content.Axis : "Z";
    this._objectData.Box = objectData.content.Box !== undefined ? objectData.content.Box : false;
    this._objectData.Outline = objectData.content.Outline !== undefined ? objectData.content.Outline : false;
    this._objectData.FillColor = objectData.content.FillColor !== undefined ? objectData.content.FillColor : "255;0;0";
    
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
    if (oldObjectData.content.Axis !== newObjectData.content.Axis)
      this._objectData.Axis = newObjectData.content.Axis;
    if (oldObjectData.content.Box !== newObjectData.content.Box)
      this._objectData.Box = newObjectData.content.Box;
    if (oldObjectData.content.Outline !== newObjectData.content.Outline)
      this._objectData.Outline = newObjectData.content.Outline;
    if (oldObjectData.content.FillColor !== newObjectData.content.FillColor)
      this._objectData.FillColor = newObjectData.content.FillColor;

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
  _getAxis() {
    return this._objectData.Axis !== undefined ? this._objectData.Axis : "Z";
  }
  _setAxis(newValue) {
    this._objectData.Axis = newValue;
  }
  _getBox() {
    return this._objectData.Box !== undefined ? this._objectData.Box : false;
  }
  _setBox(newValue) {
    this._objectData.Box = newValue;
  }
  _toggleBox() {
    this._setBox(!this._getBox());
  }
  _getOutline() {
    return this._objectData.Outline !== undefined ? this._objectData.Outline : false;
  }
  _setOutline(newValue) {
    this._objectData.Outline = newValue;
  }
  _toggleOutline() {
    this._setOutline(!this._getOutline());
  }
  _getFillColor() {
    return this._objectData.FillColor !== undefined ? this._objectData.FillColor : "255;0;0";
  }
  _setFillColor(newValue) {
    this._objectData.FillColor = newValue;
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
gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D.prototype.onCreatedContext = {};
gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D.prototype.onCreatedContext.GDObjectObjects2= [];


gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D.prototype.onCreatedContext.userFunc0xbf0710 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject} */
const object = objects[0];

object.__sprite3DExtension = {};
object.__sprite3DExtension.sprite3DRenderer = new gdjs.__sprite3DExtension.Sprite3DRenderer(object)

};
gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{gdjs.evtsExt__Sprite3D__DefineHelperClasses.func(runtimeScene, eventsFunctionContext);
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D.prototype.onCreatedContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D.prototype.onCreatedContext.GDObjectObjects1;
gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D.prototype.onCreatedContext.userFunc0xbf0710(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D.prototype.onCreated = function(parentEventsFunctionContext) {

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

gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D.prototype.onCreatedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D.prototype.onCreatedContext.GDObjectObjects2.length = 0;

gdjs.CustomRuntimeObject.prototype.onCreated.call(this);

return;
}

gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
this._animator.step(this.getElapsedTime() / 1000);
};


gdjs.registerObject("Sprite3D::Sprite3D", gdjs.evtsExt__Sprite3D__Sprite3D.Sprite3D);
