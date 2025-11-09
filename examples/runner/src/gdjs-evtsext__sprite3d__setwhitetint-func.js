
if (typeof gdjs.evtsExt__Sprite3D__SetWhiteTint !== "undefined") {
  gdjs.evtsExt__Sprite3D__SetWhiteTint.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Sprite3D__SetWhiteTint = {};
gdjs.evtsExt__Sprite3D__SetWhiteTint.GDObjectObjects1= [];


gdjs.evtsExt__Sprite3D__SetWhiteTint.userFunc0xf44fa8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const durationInSeconds = parseFloat(eventsFunctionContext.getArgument("Duration")) || 1;
const durationInMilliseconds = durationInSeconds * 1000;

// Funktion um weiße Textur mit Alpha-Maske zu erstellen
function createWhiteAlphaTexture(originalTexture) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = originalTexture.image;
  
  canvas.width = img.width || 32;
  canvas.height = img.height || 32;
  
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 0) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

for (const object of objects) {
  const obj3D = object.get3DRendererObject();
  if (!obj3D) continue;
  
  obj3D.traverse((child) => {
    if (!child.material) return;
    
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    
    materials.forEach((material) => {
      // Speichere Original nur einmal
      if (!material.__originalMap) {
        material.__originalMap = material.map;
        material.__originalColor = material.color.clone();
      }
      
      // Lösche vorherigen Timeout
      if (material.__timeout) {
        clearTimeout(material.__timeout);
        material.__timeout = null;
      }
      
      // Erstelle und setze weiße Alpha-Textur
      if (material.__originalMap) {
        material.map = createWhiteAlphaTexture(material.__originalMap);
        material.transparent = true;
        material.alphaTest = 0.1;
      }
      
      material.color.setRGB(1, 1, 1);
      material.needsUpdate = true;
      
      // WICHTIG: Warte 2-3 Frames bis Textur wirklich angewendet ist
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            material.__timeout = setTimeout(() => {
              material.map = material.__originalMap;
              material.color.copy(material.__originalColor);
              material.needsUpdate = true;
              material.__timeout = null;
            }, durationInMilliseconds);
          });
        });
      });
    });
  });
}

};
gdjs.evtsExt__Sprite3D__SetWhiteTint.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Sprite3D__SetWhiteTint.GDObjectObjects1);

const objects = gdjs.evtsExt__Sprite3D__SetWhiteTint.GDObjectObjects1;
gdjs.evtsExt__Sprite3D__SetWhiteTint.userFunc0xf44fa8(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Sprite3D__SetWhiteTint.func = function(runtimeScene, Object, Color, Opacity, Duration, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": gdjs.objectsListsToArray(Object)
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
if (argName === "Color") return Color;
if (argName === "Opacity") return Opacity;
if (argName === "Duration") return Duration;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__Sprite3D__SetWhiteTint.GDObjectObjects1.length = 0;

gdjs.evtsExt__Sprite3D__SetWhiteTint.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Sprite3D__SetWhiteTint.GDObjectObjects1.length = 0;


return;
}

gdjs.evtsExt__Sprite3D__SetWhiteTint.registeredGdjsCallbacks = [];