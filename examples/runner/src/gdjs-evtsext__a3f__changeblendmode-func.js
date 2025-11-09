
if (typeof gdjs.evtsExt__A3F__ChangeBlendMode !== "undefined") {
  gdjs.evtsExt__A3F__ChangeBlendMode.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__ChangeBlendMode = {};
gdjs.evtsExt__A3F__ChangeBlendMode.forEachIndex2 = 0;

gdjs.evtsExt__A3F__ChangeBlendMode.forEachObjects2 = [];

gdjs.evtsExt__A3F__ChangeBlendMode.forEachTemporary2 = null;

gdjs.evtsExt__A3F__ChangeBlendMode.forEachTotalCount2 = 0;

gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects1= [];
gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects2= [];
gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects3= [];


gdjs.evtsExt__A3F__ChangeBlendMode.userFunc0xf17120 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const Object2D = objects[0];
const Object3D = Object2D.get3DRendererObject();
const BlendMode = eventsFunctionContext.getArgument("Blend");
//
//Blend mode
let Blend = null;//THREE.NoBlending === 0
if (BlendMode == "Normal") {
    Blend = THREE.NormalBlending;
} else if (BlendMode == "Additive") {
    Blend = THREE.AdditiveBlending;
} else if (BlendMode == "Subtractive") {
    Blend = THREE.SubtractiveBlending;
} else if (BlendMode == "Multiply") {
    Blend = THREE.MultiplyBlending;
}
if (Blend) {
    Object3D.traverse((Child) => {
        if (Child.material) {
            if (Array.isArray(Child.material)) {
                for (let i = 0; i < Child.material.length; i++) {
                    Child.material[i].blending = Blend;
                }
            } else {
                Child.material.blending = Blend;
            }
        }
    });
}
};
gdjs.evtsExt__A3F__ChangeBlendMode.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects2, gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects3);


const objects = gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects3;
gdjs.evtsExt__A3F__ChangeBlendMode.userFunc0xf17120(runtimeScene, objects, eventsFunctionContext);

}


};gdjs.evtsExt__A3F__ChangeBlendMode.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects1);

for (gdjs.evtsExt__A3F__ChangeBlendMode.forEachIndex2 = 0;gdjs.evtsExt__A3F__ChangeBlendMode.forEachIndex2 < gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects1.length;++gdjs.evtsExt__A3F__ChangeBlendMode.forEachIndex2) {
gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects2.length = 0;


gdjs.evtsExt__A3F__ChangeBlendMode.forEachTemporary2 = gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects1[gdjs.evtsExt__A3F__ChangeBlendMode.forEachIndex2];
gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects2.push(gdjs.evtsExt__A3F__ChangeBlendMode.forEachTemporary2);
let isConditionTrue_0 = false;
if (true) {

{ //Subevents: 
gdjs.evtsExt__A3F__ChangeBlendMode.eventsList0(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};

gdjs.evtsExt__A3F__ChangeBlendMode.func = function(runtimeScene, Object, Capability3d, Blend, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": gdjs.objectsListsToArray(Object)
},
  _behaviorNamesMap: {
"Capability3d": Capability3d
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("A3F"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("A3F"),
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
if (argName === "Blend") return Blend;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects3.length = 0;

gdjs.evtsExt__A3F__ChangeBlendMode.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__ChangeBlendMode.GDObjectObjects3.length = 0;


return;
}

gdjs.evtsExt__A3F__ChangeBlendMode.registeredGdjsCallbacks = [];