
if (typeof gdjs.evtsExt__Sprite3D__SplitTexture3D !== "undefined") {
  gdjs.evtsExt__Sprite3D__SplitTexture3D.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Sprite3D__SplitTexture3D = {};
gdjs.evtsExt__Sprite3D__SplitTexture3D.GDsourceObjectObjects1= [];
gdjs.evtsExt__Sprite3D__SplitTexture3D.GDtargetObjectObjects1= [];


gdjs.evtsExt__Sprite3D__SplitTexture3D.userFunc0xf44818 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
// Get the arguments passed from the GDevelop event sheet
const sourceObjects = eventsFunctionContext.getObjects("sourceObject");
const targetObjects = eventsFunctionContext.getObjects("targetObject");
const columns = eventsFunctionContext.getArgument("columns");
const rows = eventsFunctionContext.getArgument("rows");

// Ensure that at least one source and one target object are provided
if (sourceObjects.length === 0 || targetObjects.length === 0) {
    console.error("Source or target object not specified.");
    return;
}

const sourceObj = sourceObjects[0];
const targetObjectName = targetObjects[0].getName();

// Get the main texture from the source object's renderer
const sourceAnimator = sourceObj.getAnimator();
if (!sourceAnimator) {
    console.error("Source object does not have an animator.");
    return;
}
const sourceFrame = sourceAnimator.getCurrentFrame();
if (!sourceFrame || !sourceFrame.texture || !sourceFrame.texture.map) {
    console.error("Could not get a valid texture from the source object.");
    return;
}
const sourceTexture = sourceFrame.texture.map; // This is the THREE.Texture

// Calculate the size of each tile
const tileWidth = sourceObj.getWidth() / columns;
const tileHeight = sourceObj.getHeight() / rows;

// Get the top-left position of the source object to align the grid
const startX = sourceObj.getX() - sourceObj.getWidth() / 2 + tileWidth / 2;
const startY = sourceObj.getY() - sourceObj.getHeight() / 2 + tileHeight / 2;

// Loop through each row and column to create the new objects
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
        // Create a new instance of the target object
        const newObject = runtimeScene.createObject(targetObjectName);

        // Position the new object in the grid
        newObject.setPosition(startX + col * tileWidth, startY + row * tileHeight);
        
        // Set the size of the new object to match the tile size
        newObject.setWidth(tileWidth);
        newObject.setHeight(tileHeight);
        
        // --- Create a new texture slice ---

        const newTexture = sourceTexture.clone();
        newTexture.needsUpdate = true; // Mark the texture for update

        // Scale the texture to show only one tile
        newTexture.repeat.set(1 / columns, 1 / rows);

        // Offset the texture to the correct tile position.
        // The V coordinate (Y-axis) in THREE.js textures starts from the bottom (0.0) and goes to the top (1.0).
        // Therefore, we need to invert the row calculation.
        const offsetX = col / columns;
        const offsetY = (rows - 1 - row) / rows;
        newTexture.offset.set(offsetX, offsetY);
        
        // --- THE KEY FIX: Apply the new texture to the object's animation frame ---

        const newAnimator = newObject.getAnimator();
        if (newAnimator) {
            const newFrame = newAnimator.getCurrentFrame();
            if (newFrame && newFrame.texture) {
                // By replacing the texture map on the frame itself,
                // the object's own updateFrame() will automatically use our new texture slice.
                newFrame.texture.map = newTexture;
                
                // Force the renderer to update its state immediately
                const renderer = newObject.getRenderer();
                if (renderer && renderer.updateFrame) {
                    renderer.updateFrame();
                }
            } else {
                console.warn("Could not get animation frame for the new object:", newObject.getName());
            }
        } else {
            console.warn("Could not get animator for the new object:", newObject.getName());
        }
    }
}

// Optionally, delete the original source object after splitting it
// sourceObj.deleteFromScene(runtimeScene);

};
gdjs.evtsExt__Sprite3D__SplitTexture3D.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__Sprite3D__SplitTexture3D.userFunc0xf44818(runtimeScene, eventsFunctionContext);

}


};

gdjs.evtsExt__Sprite3D__SplitTexture3D.func = function(runtimeScene, sourceObject, targetObject, rows, columns, OffsetX, OffsetY, Spacing, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"sourceObject": sourceObject
, "targetObject": targetObject
},
  _objectArraysMap: {
"sourceObject": gdjs.objectsListsToArray(sourceObject)
, "targetObject": gdjs.objectsListsToArray(targetObject)
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
if (argName === "rows") return rows;
if (argName === "columns") return columns;
if (argName === "OffsetX") return OffsetX;
if (argName === "OffsetY") return OffsetY;
if (argName === "Spacing") return Spacing;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__Sprite3D__SplitTexture3D.GDsourceObjectObjects1.length = 0;
gdjs.evtsExt__Sprite3D__SplitTexture3D.GDtargetObjectObjects1.length = 0;

gdjs.evtsExt__Sprite3D__SplitTexture3D.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Sprite3D__SplitTexture3D.GDsourceObjectObjects1.length = 0;
gdjs.evtsExt__Sprite3D__SplitTexture3D.GDtargetObjectObjects1.length = 0;


return;
}

gdjs.evtsExt__Sprite3D__SplitTexture3D.registeredGdjsCallbacks = [];