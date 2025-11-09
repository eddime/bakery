
if (typeof gdjs.evtsExt__A3F__Initialize !== "undefined") {
  gdjs.evtsExt__A3F__Initialize.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__Initialize = {};


gdjs.evtsExt__A3F__Initialize.userFunc0x16c4380 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
if (gdjs._A3F) return;
gdjs._A3F = {};
gdjs._A3F.MakeUniqueMaterial = function(Obj3D) {
    if (!Obj3D.userData.A3F) {
        Obj3D.userData.A3F = {};
    }
    if (!Obj3D.userData.A3F.UniqueMaterial) {
        Obj3D.userData.A3F.UniqueMaterial = true;
        //
        Obj3D.addEventListener("removed", gdjs._A3F.DisposeUniqueMaterial);
        //
        const CopyMat = {};
        Obj3D.traverse((Child) => {
            if (Child.material) {
                if (Array.isArray(Child.material)) {
                    for (let i = 0; i < Child.material.length; i++) {
                        if (!CopyMat[Child.material[i].uuid]) {
                            CopyMat[Child.material[i].uuid] = Child.material[i].clone();
                        }
                        Child.material[i] = CopyMat[Child.material[i].uuid];
                    }
                } else {
                    if (!CopyMat[Child.material.uuid]) {
                        CopyMat[Child.material.uuid] = Child.material.clone();
                    }
                    Child.material = CopyMat[Child.material.uuid];
                }
            }
        });
    }
};
//
gdjs._A3F.DisposeUniqueMaterial = function(Evt) {
    const Obj3D = Evt.target;// this
    Obj3D.traverse((Child) => {
        if (Child.material) {
            if (Array.isArray(Child.material)) {
                for (let i = 0; i < Child.material.length; i++) {
                    Child.material[i].dispose()
                }
            } else {
                Child.material.dispose()
            }
        }
    });
};
//
gdjs._A3F.LightIntensityScale = 1;//Math.PI// Three.js r160 だがRenderer.useLegacyLightsがTrueなので旧仕様のまま
gdjs._A3F.LightIntensityCandela = 1;//10000;//適当// Three.js r160 だがRenderer.useLegacyLightsがTrueなので旧仕様のまま
//
gdjs._A3F.DumpChildren = function(Obj3D, Depth = 0, Lines = []) {
    const indent = ' '.repeat(Depth);
    Lines.push(`${indent}${Obj3D.name || '(no name)'}`);
    Obj3D.children.forEach((child) => {
        gdjs._A3F.DumpChildren(child, Depth + 1, Lines);
    });
    return Lines;
}


};
gdjs.evtsExt__A3F__Initialize.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__A3F__Initialize.userFunc0x16c4380(runtimeScene, eventsFunctionContext);

}


};

gdjs.evtsExt__A3F__Initialize.func = function(runtimeScene, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
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
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__A3F__Initialize.eventsList0(runtimeScene, eventsFunctionContext);


return;
}

gdjs.evtsExt__A3F__Initialize.registeredGdjsCallbacks = [];