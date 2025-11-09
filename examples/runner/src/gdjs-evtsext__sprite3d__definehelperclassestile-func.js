
if (typeof gdjs.evtsExt__Sprite3D__DefineHelperClassesTile !== "undefined") {
  gdjs.evtsExt__Sprite3D__DefineHelperClassesTile.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Sprite3D__DefineHelperClassesTile = {};


gdjs.evtsExt__Sprite3D__DefineHelperClassesTile.userFunc0x16ff4a8 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
if (gdjs.__tile3DExtension) {
    return;
}

class Tile3DRenderer {
    /** @type {gdjs.CustomRuntimeObject} */
    object;
    /** @type {THREE.Group} */
    meshGroup;
    
    constructor(object) {
        this.object = object;
        this.meshGroup = new THREE.Group();
        this.object.get3DRendererObject().add(this.meshGroup);
        
        const Items = this.object._instanceContainer._objects.items;
        const topTileData = Items.Top;
        const sideTileData = Items.Side;

        this.createTopFace(topTileData);
        this.createSideFaces(sideTileData);
        this.updateHitbox();
    }

    getObjectDimensions() {
        const width = this.object.getWidth();
        const height = this.object.getHeight();
        const depth = this.object.getDepth() ? this.object.getDepth() : (this.object._objectData.Depth || 24);
        return { width, height, depth };
    }

    getTileDimensions(tileData) {
        if (!tileData) return { width: 24, height: 24 };
        return { width: tileData.width, height: tileData.height };
    }

    updateHitbox() {
        const { width, height, depth } = this.getObjectDimensions();
        const aabb = this.object._unrotatedAABB;
        if (!aabb) return;

        aabb.min[0] = -width / 2;  aabb.max[0] = width / 2;
        aabb.min[1] = -height / 2; aabb.max[1] = height / 2;
        aabb.min[2] = 0;           aabb.max[2] = depth;

        this.object._isUntransformedHitBoxesDirty = false;
    }

    createTopFace(topTileData) {
        if (!topTileData?.texture) return;
        
        const { width, height, depth } = this.getObjectDimensions();
        const topTileDims = this.getTileDimensions(topTileData);
        
        const runtimeScene = this.object.getRuntimeScene();
        const pixiTexture = runtimeScene.getGame().getImageManager().getPIXITexture(topTileData.texture);
        if (!pixiTexture?.baseTexture?.resource) return;
        
        const sourceImage = pixiTexture.baseTexture.resource.source;
        const geometry = new THREE.PlaneGeometry(width, height);
        
        const texture = new THREE.Texture(sourceImage);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(topTileDims.width / sourceImage.width, topTileDims.height / sourceImage.height);
        texture.offset.set(0, 1 - (topTileDims.height / sourceImage.height) % 1);
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;
        
        const material = new THREE.MeshLambertMaterial({ 
            map: texture, 
            transparent: true, 
            alphaTest: 0.5, 
            side: THREE.DoubleSide 
        });
        
        const topMesh = new THREE.Mesh(geometry, material);
        topMesh.rotation.z = Math.PI / 2;
        topMesh.position.set(0, 0, depth);
        topMesh.castShadow = true;
        topMesh.receiveShadow = true;
        topMesh.name = "TopFace";

        this.meshGroup.add(topMesh);
    }

    createSideFaces(sideTileData) {
        if (!sideTileData?.texture) return;
        
        const { width, height, depth } = this.getObjectDimensions();
        const sideTileDims = this.getTileDimensions(sideTileData);
        
        const runtimeScene = this.object.getRuntimeScene();
        const pixiTexture = runtimeScene.getGame().getImageManager().getPIXITexture(sideTileData.texture);
        if (!pixiTexture?.baseTexture?.resource) return;
        
        const sourceImage = pixiTexture.baseTexture.resource.source;
        const zCenter = depth / 2;

        // KORREKTUR: Verwende width für ALLE Seiten (einheitliche Geometrie)
        const frontBackGeometry = new THREE.PlaneGeometry(width, depth);
        const leftRightGeometry = new THREE.PlaneGeometry(width, depth); // GEÄNDERT: width statt height!

        const createBasicTexture = (rotationInRadians = 0) => {
            const texture = new THREE.Texture(sourceImage);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.NearestFilter;
            texture.colorSpace = THREE.SRGBColorSpace;
            
            if (rotationInRadians !== 0) {
                texture.center.set(0.5, 0.5);
                texture.rotation = rotationInRadians;
            }

            texture.needsUpdate = true;
            return new THREE.MeshLambertMaterial({ 
                map: texture, 
                transparent: true, 
                alphaTest: 0.5, 
                side: THREE.DoubleSide 
            });
        };

        // Erstelle Materialien
        const frontBackMaterial = createBasicTexture(0);
        const leftMaterial = createBasicTexture(-Math.PI / 2);
        const rightMaterial = createBasicTexture(Math.PI / 2);

        // Erstelle Meshes - ALLE verwenden jetzt width-basierte Geometrie
        const frontMesh = new THREE.Mesh(frontBackGeometry, frontBackMaterial);
        frontMesh.position.set(0, height / 2, zCenter);
        frontMesh.rotation.x = Math.PI / 2;
        frontMesh.name = "FrontFace";

        const backMesh = new THREE.Mesh(frontBackGeometry, frontBackMaterial.clone());
        backMesh.position.set(0, -height / 2, zCenter);
        backMesh.rotation.x = -Math.PI / 2;
        backMesh.name = "BackFace";

        const rightMesh = new THREE.Mesh(leftRightGeometry, rightMaterial);
        rightMesh.position.set(width / 2, 0, zCenter);
        rightMesh.rotation.y = Math.PI / 2;
        rightMesh.name = "RightFace";

        const leftMesh = new THREE.Mesh(leftRightGeometry, leftMaterial);
        leftMesh.position.set(-width / 2, 0, zCenter);
        leftMesh.rotation.y = -Math.PI / 2;
        leftMesh.name = "LeftFace";

        [frontMesh, backMesh, rightMesh, leftMesh].forEach(mesh => {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.meshGroup.add(mesh);
        });
    }
}

gdjs.__tile3DExtension = {
    Tile3DRenderer: Tile3DRenderer
};

};
gdjs.evtsExt__Sprite3D__DefineHelperClassesTile.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__Sprite3D__DefineHelperClassesTile.userFunc0x16ff4a8(runtimeScene, eventsFunctionContext);

}


};

gdjs.evtsExt__Sprite3D__DefineHelperClassesTile.func = function(runtimeScene, parentEventsFunctionContext) {
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


gdjs.evtsExt__Sprite3D__DefineHelperClassesTile.eventsList0(runtimeScene, eventsFunctionContext);


return;
}

gdjs.evtsExt__Sprite3D__DefineHelperClassesTile.registeredGdjsCallbacks = [];