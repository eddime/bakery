
if (typeof gdjs.evtsExt__A3F__LookAtPosition !== "undefined") {
  gdjs.evtsExt__A3F__LookAtPosition.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__LookAtPosition = {};
gdjs.evtsExt__A3F__LookAtPosition.forEachIndex2 = 0;

gdjs.evtsExt__A3F__LookAtPosition.forEachObjects2 = [];

gdjs.evtsExt__A3F__LookAtPosition.forEachTemporary2 = null;

gdjs.evtsExt__A3F__LookAtPosition.forEachTotalCount2 = 0;

gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects1= [];
gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects2= [];
gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects3= [];


gdjs.evtsExt__A3F__LookAtPosition.userFunc0xf0dc98 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const Object2D = objects[0];
const Object3D = Object2D.get3DRendererObject();
const Scene = runtimeScene.getLayer(Object2D.getLayer()).getRenderer().getThreeScene();
const X = eventsFunctionContext.getArgument("X");
const Y = eventsFunctionContext.getArgument("Y");
const Z = eventsFunctionContext.getArgument("Z");
//
Scene.scale.y = 1;
Object3D.up.set(0, 0, 1);
Object3D.lookAt(X, Y, Z);
Scene.scale.y = -1;
Object3D.up.set(0, 1, 0);
Object3D.updateWorldMatrix(true,false);// 必須
Object3D.rotateZ(-1.5707963267948966);//gdjs.toRad(90)
Object3D.rotateY(-1.5707963267948966);//gdjs.toRad(90)
//
Object2D._rotationX = gdjs.toDegrees(Object3D.rotation.x);
Object2D._rotationY = gdjs.toDegrees(Object3D.rotation.y);
Object2D.setAngle(gdjs.toDegrees(Object3D.rotation.z));

};
gdjs.evtsExt__A3F__LookAtPosition.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects2, gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects3);


const objects = gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects3;
gdjs.evtsExt__A3F__LookAtPosition.userFunc0xf0dc98(runtimeScene, objects, eventsFunctionContext);

}


};gdjs.evtsExt__A3F__LookAtPosition.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects1);

for (gdjs.evtsExt__A3F__LookAtPosition.forEachIndex2 = 0;gdjs.evtsExt__A3F__LookAtPosition.forEachIndex2 < gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects1.length;++gdjs.evtsExt__A3F__LookAtPosition.forEachIndex2) {
gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects2.length = 0;


gdjs.evtsExt__A3F__LookAtPosition.forEachTemporary2 = gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects1[gdjs.evtsExt__A3F__LookAtPosition.forEachIndex2];
gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects2.push(gdjs.evtsExt__A3F__LookAtPosition.forEachTemporary2);
let isConditionTrue_0 = false;
if (true) {

{ //Subevents: 
gdjs.evtsExt__A3F__LookAtPosition.eventsList0(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};

gdjs.evtsExt__A3F__LookAtPosition.func = function(runtimeScene, Object, Capability3d, X, Y, Z, parentEventsFunctionContext) {
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
if (argName === "X") return X;
if (argName === "Y") return Y;
if (argName === "Z") return Z;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects3.length = 0;

gdjs.evtsExt__A3F__LookAtPosition.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__LookAtPosition.GDObjectObjects3.length = 0;


return;
}

gdjs.evtsExt__A3F__LookAtPosition.registeredGdjsCallbacks = [];