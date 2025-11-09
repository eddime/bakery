
if (typeof gdjs.evtsExt__Tween3D__RgbMean !== "undefined") {
  gdjs.evtsExt__Tween3D__RgbMean.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Tween3D__RgbMean = {};


gdjs.evtsExt__Tween3D__RgbMean.userFunc0xe75710 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
const { rgbToHsl, hslToRgb } = gdjs.__tween3DExtension;

const [r1, g1, b1] = gdjs.hexNumberToRGBArray(eventsFunctionContext.getArgument("Color1"));
const [r2, g2, b2] = gdjs.hexNumberToRGBArray(eventsFunctionContext.getArgument("Color2"));
const ratio = eventsFunctionContext.getArgument("Ratio");

const [h1, s1, l1] = rgbToHsl(r1, g1, b1);
const [h2, s2, l2] = rgbToHsl(r2, g2, b2);

const h = h1 + ratio * (h2 - h1);
const s = s1 + ratio * (s2 - s1);
const l = l1 + ratio * (l2 - l1);

const [r, g, b] = hslToRgb(h, s, l);

eventsFunctionContext.returnValue = gdjs.rgbToHexNumber(r, g, b);

};
gdjs.evtsExt__Tween3D__RgbMean.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__Tween3D__RgbMean.userFunc0xe75710(runtimeScene, eventsFunctionContext);

}


};

gdjs.evtsExt__Tween3D__RgbMean.func = function(runtimeScene, Color1, Color2, Ratio, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
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
if (argName === "Color1") return Color1;
if (argName === "Color2") return Color2;
if (argName === "Ratio") return Ratio;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__Tween3D__RgbMean.eventsList0(runtimeScene, eventsFunctionContext);


return Number(eventsFunctionContext.returnValue) || 0;
}

gdjs.evtsExt__Tween3D__RgbMean.registeredGdjsCallbacks = [];