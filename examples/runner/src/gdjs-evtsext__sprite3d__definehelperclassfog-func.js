
if (typeof gdjs.evtsExt__Sprite3D__DefineHelperClassFog !== "undefined") {
  gdjs.evtsExt__Sprite3D__DefineHelperClassFog.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Sprite3D__DefineHelperClassFog = {};


gdjs.evtsExt__Sprite3D__DefineHelperClassFog.userFunc0xf45cf0 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
// --- The Helper Class Definition ---
// This code's only job is to create the "blueprint" for our FogController.
// It MUST run before any "onCreate" event tries to use it.

// Create the namespace if it doesn't exist
if (!gdjs.__fogExtension) {
    gdjs.__fogExtension = {};
}

// Only define the class if it hasn't been defined yet
if (!gdjs.__fogExtension.FogController) {
    console.log("Defining FogController class...");

    gdjs.__fogExtension.FogController = class {
        constructor(ownerObject) {
            this.owner = ownerObject;
            this.fogPlanes = [];
            try {
                const sceneObject = this.owner.get3DRendererObject();
                if (!sceneObject) { return; }

                const layers = 10;
                for (let i = 0; i < layers; i++) {
                    const zPos = -100 + (i * 10);
                    const opacity = (layers - i) * 0.07;
                    const geometry = new THREE.PlaneGeometry(1300, 800);
                    const material = new THREE.MeshBasicMaterial({
                        color: 0x3D375B,
                        transparent: true,
                        opacity: opacity,
                        side: THREE.DoubleSide,
                        depthWrite: false
                    });

                    const fogPlane = new THREE.Mesh(geometry, material);
                    fogPlane.position.set(0, -100, zPos);
                    fogPlane.renderOrder = 999;
                    sceneObject.add(fogPlane);
                    this.fogPlanes.push(fogPlane);
                }
                console.log("FogController instance was successfully created.");
            } catch (error) {
                console.error("Error creating FogController instance:", error);
            }
        }

        // --- DIE LÖSUNG: HIER IST DIE FEHLENDE destroy()-METHODE ---
        /**
         * This method is called when the owner object is destroyed.
         * It cleans up the fog planes to prevent memory leaks.
         */
        destroy() {
            console.log("Destroying FogController and cleaning up planes...");
            try {
                // Get the parent 3D container
                const sceneObject = this.owner.get3DRendererObject();
                if (sceneObject) {
                    // Loop through all the stored fog planes and remove them from the scene
                    this.fogPlanes.forEach(plane => {
                        sceneObject.remove(plane);
                    });
                }
                // Clear the array
                this.fogPlanes = [];
                console.log("Fog planes cleaned up successfully.");
            } catch (error) {
                console.error("Error during FogController destruction:", error);
            }
        }
    };

    console.log("FogController class has been defined.");
}

};
gdjs.evtsExt__Sprite3D__DefineHelperClassFog.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__Sprite3D__DefineHelperClassFog.userFunc0xf45cf0(runtimeScene, eventsFunctionContext);

}


};

gdjs.evtsExt__Sprite3D__DefineHelperClassFog.func = function(runtimeScene, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
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
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__Sprite3D__DefineHelperClassFog.eventsList0(runtimeScene, eventsFunctionContext);


return;
}

gdjs.evtsExt__Sprite3D__DefineHelperClassFog.registeredGdjsCallbacks = [];