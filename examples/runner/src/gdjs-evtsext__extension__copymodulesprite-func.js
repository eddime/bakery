
if (typeof gdjs.evtsExt__Extension__CopyModuleSprite !== "undefined") {
  gdjs.evtsExt__Extension__CopyModuleSprite.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Extension__CopyModuleSprite = {};
gdjs.evtsExt__Extension__CopyModuleSprite.GDSourceBoxObjects1= [];
gdjs.evtsExt__Extension__CopyModuleSprite.GDTargetObjectObjects1= [];


gdjs.evtsExt__Extension__CopyModuleSprite.userFunc0x1518998 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
// GDevelop Parameter: "SourceBox", "TargetObject"
const sourceObjects = eventsFunctionContext.getObjects("SourceBox");
const targetObjects = eventsFunctionContext.getObjects("TargetObject");

if (sourceObjects.length === 0 || targetObjects.length === 0) return;

const sourceObject = sourceObjects[0];
const targetObject = targetObjects[0];

// Hole THREE.js-Textur vom 3D-Billboard
const sourceRenderer = sourceObject.__box3DRendererInstance;
if (!sourceRenderer?.billboardSprite?.material?.map) return;

const imageElement = sourceRenderer.billboardSprite.material.map.source.data;
if (!imageElement) return;

// Erstelle scharfe PIXI-Textur
const baseTexture = new PIXI.BaseTexture(imageElement);
baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
baseTexture.mipmap = PIXI.MIPMAP_MODES.OFF;
const newPixiTexture = new PIXI.Texture(baseTexture);

// Setze Textur auf PIXI-Sprite
const pixiSprite = targetObject._renderer?._sprite;
if (!pixiSprite?.isSprite) return;

pixiSprite.texture = newPixiTexture;
pixiSprite._textureID = -1; // Erzwinge Update

// Aktualisiere Datenstrukturen
const animator = targetObject._animator;
if (animator) {
    animator._animationFrame.texture = newPixiTexture;
    animator._animationFrameDirty = true;
    
    if (animator._animations?.[0]?.directions?.[0]?.frames?.[0]) {
        animator._animations[0].directions[0].frames[0].texture = newPixiTexture;
    }
}

// Setze Dirty-Flags
targetObject._renderer._textureDirty = true;
targetObject._renderer._spriteDirty = true;

};
gdjs.evtsExt__Extension__CopyModuleSprite.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__Extension__CopyModuleSprite.userFunc0x1518998(runtimeScene, eventsFunctionContext);

}


};

gdjs.evtsExt__Extension__CopyModuleSprite.func = function(runtimeScene, SourceBox, TargetObject, ChildSpriteName, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"SourceBox": SourceBox
, "TargetObject": TargetObject
},
  _objectArraysMap: {
"SourceBox": gdjs.objectsListsToArray(SourceBox)
, "TargetObject": gdjs.objectsListsToArray(TargetObject)
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
if (argName === "ChildSpriteName") return ChildSpriteName;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__Extension__CopyModuleSprite.GDSourceBoxObjects1.length = 0;
gdjs.evtsExt__Extension__CopyModuleSprite.GDTargetObjectObjects1.length = 0;

gdjs.evtsExt__Extension__CopyModuleSprite.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__CopyModuleSprite.GDSourceBoxObjects1.length = 0;
gdjs.evtsExt__Extension__CopyModuleSprite.GDTargetObjectObjects1.length = 0;


return;
}

gdjs.evtsExt__Extension__CopyModuleSprite.registeredGdjsCallbacks = [];