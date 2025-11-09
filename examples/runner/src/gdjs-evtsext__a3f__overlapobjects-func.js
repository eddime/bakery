
if (typeof gdjs.evtsExt__A3F__OverlapObjects !== "undefined") {
  gdjs.evtsExt__A3F__OverlapObjects.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__OverlapObjects = {};
gdjs.evtsExt__A3F__OverlapObjects.forEachIndex2 = 0;

gdjs.evtsExt__A3F__OverlapObjects.forEachObjects2 = [];

gdjs.evtsExt__A3F__OverlapObjects.forEachTemporary2 = null;

gdjs.evtsExt__A3F__OverlapObjects.forEachTotalCount2 = 0;

gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects1= [];
gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects2= [];
gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects3= [];
gdjs.evtsExt__A3F__OverlapObjects.GDObject3DObjects1= [];
gdjs.evtsExt__A3F__OverlapObjects.GDObject3DObjects2= [];
gdjs.evtsExt__A3F__OverlapObjects.GDObject3DObjects3= [];


gdjs.evtsExt__A3F__OverlapObjects.userFunc0x10a80d8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const AnyObject = objects[0];
const Hide = eventsFunctionContext.getArgument("Hide");
const Object3D = eventsFunctionContext.getObjects("Object3D")[0];
const OffsetX = eventsFunctionContext.getArgument("OffsetX");
const OffsetY = eventsFunctionContext.getArgument("OffsetY");
const OffsetZ = eventsFunctionContext.getArgument("OffsetZ");
const Offset3D = new THREE.Vector3(OffsetX, OffsetY, OffsetZ);
if (!Object3D) {
    return;
}
const Layer3D = Object3D.layer;
const RendererObject3D = Object3D.get3DRendererObject();
const Camera3D = runtimeScene.getLayer(Layer3D).getRenderer().getThreeCamera();
if (!Camera3D) {
    return;
}
//
let Position3D;
if (RendererObject3D) {
    // 3D
    Position3D = RendererObject3D.position.clone();
} else {
    // 2D
    Position3D = new THREE.Vector3(Object3D.getX(), Object3D.getY(), 0);
}
Position3D.add(Offset3D);
Position3D.y *= -1;
//
const Project = Position3D.clone().project(Camera3D);
const GameResolutionWidth = runtimeScene.getGame().getGameResolutionWidth();
const GameResolutionHeight = runtimeScene.getGame().getGameResolutionHeight();
const PointX = (GameResolutionWidth / 2) * (Project.x + 1.0);
const PointY = (GameResolutionHeight / 2) * ((Project.y * -1) + 1.0);
//
if (Hide) {
    const Frustum = new THREE.Frustum();
    const CloneCamera = Camera3D.clone();
    CloneCamera.rotateZ(gdjs.toRad(180));
    Frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(CloneCamera.projectionMatrix, CloneCamera.matrixWorldInverse));
    const Within = Frustum.containsPoint(Position3D);
    AnyObject.hide(!Within);
}
//
AnyObject.setPosition(PointX, PointY);


};
gdjs.evtsExt__A3F__OverlapObjects.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects2, gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects3);


const objects = gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects3;
gdjs.evtsExt__A3F__OverlapObjects.userFunc0x10a80d8(runtimeScene, objects, eventsFunctionContext);

}


};gdjs.evtsExt__A3F__OverlapObjects.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("AnyObject"), gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects1);

for (gdjs.evtsExt__A3F__OverlapObjects.forEachIndex2 = 0;gdjs.evtsExt__A3F__OverlapObjects.forEachIndex2 < gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects1.length;++gdjs.evtsExt__A3F__OverlapObjects.forEachIndex2) {
gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects2.length = 0;


gdjs.evtsExt__A3F__OverlapObjects.forEachTemporary2 = gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects1[gdjs.evtsExt__A3F__OverlapObjects.forEachIndex2];
gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects2.push(gdjs.evtsExt__A3F__OverlapObjects.forEachTemporary2);
let isConditionTrue_0 = false;
if (true) {

{ //Subevents: 
gdjs.evtsExt__A3F__OverlapObjects.eventsList0(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};

gdjs.evtsExt__A3F__OverlapObjects.func = function(runtimeScene, AnyObject, Hide, Object3D, Capability3D, OffsetX, OffsetY, OffsetZ, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"AnyObject": AnyObject
, "Object3D": Object3D
},
  _objectArraysMap: {
"AnyObject": gdjs.objectsListsToArray(AnyObject)
, "Object3D": gdjs.objectsListsToArray(Object3D)
},
  _behaviorNamesMap: {
"Capability3D": Capability3D
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
if (argName === "Hide") return Hide;
if (argName === "OffsetX") return OffsetX;
if (argName === "OffsetY") return OffsetY;
if (argName === "OffsetZ") return OffsetZ;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects1.length = 0;
gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects2.length = 0;
gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects3.length = 0;
gdjs.evtsExt__A3F__OverlapObjects.GDObject3DObjects1.length = 0;
gdjs.evtsExt__A3F__OverlapObjects.GDObject3DObjects2.length = 0;
gdjs.evtsExt__A3F__OverlapObjects.GDObject3DObjects3.length = 0;

gdjs.evtsExt__A3F__OverlapObjects.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects1.length = 0;
gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects2.length = 0;
gdjs.evtsExt__A3F__OverlapObjects.GDAnyObjectObjects3.length = 0;
gdjs.evtsExt__A3F__OverlapObjects.GDObject3DObjects1.length = 0;
gdjs.evtsExt__A3F__OverlapObjects.GDObject3DObjects2.length = 0;
gdjs.evtsExt__A3F__OverlapObjects.GDObject3DObjects3.length = 0;


return;
}

gdjs.evtsExt__A3F__OverlapObjects.registeredGdjsCallbacks = [];