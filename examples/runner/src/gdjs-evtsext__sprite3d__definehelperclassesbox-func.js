
if (typeof gdjs.evtsExt__Sprite3D__DefineHelperClassesBox !== "undefined") {
  gdjs.evtsExt__Sprite3D__DefineHelperClassesBox.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Sprite3D__DefineHelperClassesBox = {};


gdjs.evtsExt__Sprite3D__DefineHelperClassesBox.userFunc0xae5bb8 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
// Ensure the extension is not already loaded
if (gdjs.__box3DExtension) {
    return;
}

// --- Standalone Helper Functions ---
function applyUVPixelInset(texture) {
    if (texture && texture.image) {
        texture.generateMipmaps = false;
        const inset = 0.6 / Math.max(texture.image.width, texture.image.height);
        texture.offset.set(inset, inset);
        texture.repeat.set(1 - (2 * inset), 1 - (2 * inset));
    }
    return texture;
}

function parseGDevelopColor(gdevelopColor) {
    if (!gdevelopColor || gdevelopColor.indexOf(';') === -1) return [1, 1, 1];
    const rgb = gdevelopColor.split(';').map(Number);
    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];
}

/**
 * The renderer for a 3D Box object, optimized for performance.
 */
class Box3DRenderer {
    // --- Static constants ---
    static CHILD_TEXTURE_NAME = 'BoxTexture';
    static DEFAULT_FILL_COLOR = '255;0;0';
    static DEFAULT_OUTLINE_COLOR = '0;0;0';
    static DEFAULT_SPRITE_COLOR = '255;255;255';
    static DEFAULT_SIZE = 24;
    static OUTLINE_THICKNESS = 0.7;
    static BILLBOARD_SCALE_MODIFIER = 1.2;

    // --- Core Properties & Caching ---
    object;
    renderable = null;
    cubeSideLength = Box3DRenderer.DEFAULT_SIZE;
    
    // KORREKTUR: Zurück zu den separaten undefined Cache-Variablen wie im funktionierenden Code
    _cachedOutlineEnabled = undefined;
    _cachedFillColor = undefined;
    _cachedOutlineColor = undefined;
    _cachedSpriteColor = undefined;
    _cachedCastShadow = undefined;
    _cachedScaleX = undefined;
    _cachedScaleY = undefined;
    _cachedBaseDepth = undefined;

    constructor(object) {
        this.object = object;
        this.object.__box3DRendererInstance = this;
        this._bootstrap();
        this.object.getAnimator().setOnFrameChangeCallback(() => this.updateFrame());
        this.updateFrame();
        
        // KORREKTUR: Verwende setTimeout statt requestAnimationFrame (wie im funktionierenden Code)
        setTimeout(() => {
            this.updateFrame();
        }, 0);
    }
    
        // Füge diese Methode am Ende der Klasse hinzu:
    getBillboardTexture() {
        if (this.billboardSprite && this.billboardSprite.material) {
            return this.billboardSprite.material.map;
        }
        return null;
    }

    setMeshTexture(newTexture) {
        if (this.billboardSprite && this.billboardSprite.material && newTexture) {
            this.billboardSprite.material.map = newTexture;
            this.billboardSprite.material.needsUpdate = true;
        }
    }


    updateFrame() {
        if (!this.renderable) return;
        this._updateBillboardTexture();
        this._updateMaterialProperties();
        this._updateSizingAndHitbox();
    }

    // --- Private Initialization Methods ---
    _bootstrap() {
        this._fetchSizeAndTexture();
        const geometry = new THREE.BoxGeometry(1, 1, 1);

        // Kompakt: Direkte Erstellung mit Default-Materialien
        this.fillMesh = new THREE.Mesh(geometry.clone(), 
            new THREE.MeshBasicMaterial({ 
                color: new THREE.Color(...parseGDevelopColor(Box3DRenderer.DEFAULT_FILL_COLOR)).convertSRGBToLinear(),
                depthWrite: false, 
                side: THREE.DoubleSide 
            }));
        this.fillMesh.renderOrder = -1;

        this.outlineMesh = new THREE.Mesh(geometry.clone(),
            new THREE.MeshBasicMaterial({ 
                color: new THREE.Color(...parseGDevelopColor(Box3DRenderer.DEFAULT_OUTLINE_COLOR)).convertSRGBToLinear(),
                side: THREE.BackSide 
            }));
        this.outlineMesh.renderOrder = -2;

        this.spriteBox = new THREE.Mesh(geometry, this._createSpriteBoxMaterial());
        this.spriteBox.renderOrder = 0;

        this.billboardSprite = this._createBillboardSprite();

        this.renderable = new THREE.Group().add(this.outlineMesh, this.fillMesh, this.spriteBox, this.billboardSprite);

        const rendererObject = this.object.get3DRendererObject();
        this.renderable.rotation.order = rendererObject.rotation.order;
        rendererObject.add(this.renderable);
    }

    _fetchSizeAndTexture() {
        const childData = this.object._instanceContainer._objects.items[Box3DRenderer.CHILD_TEXTURE_NAME];
        if (!childData) {
            console.error(`Child object "${Box3DRenderer.CHILD_TEXTURE_NAME}" not found!`);
            return;
        }

        try {
            const spriteData = childData.animations[0].directions[0].sprites[0];
            const maskPoints = spriteData.customCollisionMask[0];
            const xCoords = maskPoints.map(p => p.x);
            const yCoords = maskPoints.map(p => p.y);
            this.cubeSideLength = Math.max(
                Math.max(...xCoords) - Math.min(...xCoords),
                Math.max(...yCoords) - Math.min(...yCoords)
            );
            this.textureName = spriteData.image;
        } catch (e) {
            console.error(`Could not read data from "${Box3DRenderer.CHILD_TEXTURE_NAME}".`, e);
        }
    }

    // --- Private Update Methods ---
    _updateBillboardTexture() {
        const currentFrame = this.object.getAnimator().getCurrentFrame();
        if (!currentFrame) return;

        const newTexture = currentFrame.texture.map;
        if (this.billboardSprite.material.map !== newTexture) {
            this.billboardSprite.material.map = applyUVPixelInset(newTexture);
            this.billboardSprite.material.needsUpdate = true;
        }
    }

    /**
     * OPTIMIERTE Material-Aktualisierung mit Helper-Funktion
     */
    _updateMaterialProperties() {
        // Kompakte Farb-Updates mit Helper-Funktion
        this._updateColorIfChanged('_cachedSpriteColor', 
            this.object._getSpriteColor?.() ?? Box3DRenderer.DEFAULT_SPRITE_COLOR,
            this.billboardSprite.material);

        this._updateColorIfChanged('_cachedFillColor', 
            this.object._getFillColor?.() ?? Box3DRenderer.DEFAULT_FILL_COLOR,
            this.fillMesh.material);

        this._updateColorIfChanged('_cachedOutlineColor', 
            this.object._getOutlineColor?.() ?? Box3DRenderer.DEFAULT_OUTLINE_COLOR,
            this.outlineMesh.material);

        // Outline Sichtbarkeit
        const outlineEnabled = this.object._getOutline?.() ?? false;
        if (outlineEnabled !== this._cachedOutlineEnabled) {
            this.outlineMesh.visible = outlineEnabled;
            this._cachedOutlineEnabled = outlineEnabled;
        }

        // Shadow Update
        const castShadow = this.object._getCastShadow?.() ?? false;
        if (castShadow !== this._cachedCastShadow) {
            const receiveShadow = this.object._getReceiveShadow?.() ?? false;
            [this.spriteBox, this.fillMesh, this.outlineMesh].forEach(mesh => {
                mesh.castShadow = castShadow;
                mesh.receiveShadow = receiveShadow;
            });
            this._cachedCastShadow = castShadow;
        }
    }

    // Helper-Funktion für kompakte Farb-Updates
    _updateColorIfChanged(cacheProperty, newColorStr, material) {
        if (newColorStr !== this[cacheProperty]) {
            material.color.setRGB(...parseGDevelopColor(newColorStr)).convertSRGBToLinear();
            material.needsUpdate = true; // WICHTIG: Wie im funktionierenden Code
            this[cacheProperty] = newColorStr;
        }
    }

    _updateSizingAndHitbox() {
        const scaleX = this.object.getScaleX();
        const scaleY = this.object.getScaleY();
        const baseDepthToUse = (this.object._objectData.Depth > 0) ? this.object._objectData.Depth : this.cubeSideLength;

        if (scaleX === this._cachedScaleX && 
            scaleY === this._cachedScaleY && 
            baseDepthToUse === this._cachedBaseDepth) return;

        const finalSizeX = this.cubeSideLength * scaleX;
        const finalSizeY = this.cubeSideLength * scaleY;
        const finalDepth = baseDepthToUse * scaleX;

        this.spriteBox.scale.set(finalSizeX, finalSizeY, finalDepth);
        this.fillMesh.scale.set(finalSizeX, finalSizeY, finalDepth);
        this.billboardSprite.scale.set(
            finalSizeX * Box3DRenderer.BILLBOARD_SCALE_MODIFIER,
            finalSizeY * Box3DRenderer.BILLBOARD_SCALE_MODIFIER,
            1
        );

        if (this.outlineMesh.visible) {
            const outline = Box3DRenderer.OUTLINE_THICKNESS;
            this.outlineMesh.scale.set(
                finalSizeX + (outline * 2 * scaleX),
                finalSizeY + (outline * 2 * scaleY),
                finalDepth + (outline * 2 * scaleX)
            );
        }

        const aabb = this.object._unrotatedAABB;
        aabb.min[0] = -finalSizeX / 2; aabb.max[0] = finalSizeX / 2;
        aabb.min[1] = -finalSizeY / 2; aabb.max[1] = finalSizeY / 2;
        aabb.min[2] = -finalDepth / 2; aabb.max[2] = finalDepth / 2;
        this.object._isUntransformedHitBoxesDirty = false;

        this.object.setWidth(finalSizeX);
        this.object.setHeight(finalSizeY);

        this._cachedScaleX = scaleX;
        this._cachedScaleY = scaleY;
        this._cachedBaseDepth = baseDepthToUse;
    }

    // --- Private Factory Methods ---
    _createSpriteBoxMaterial() {
        if (!this.textureName) return new THREE.MeshBasicMaterial({ color: 0x888888 });

        const pixiTexture = this.object.getRuntimeScene().getGame().getImageManager().getPIXITexture(this.textureName);
        const threeTexture = new THREE.Texture(pixiTexture.baseTexture.resource.source);
        applyUVPixelInset(threeTexture);
        threeTexture.magFilter = THREE.NearestFilter;
        threeTexture.minFilter = THREE.NearestFilter;
        threeTexture.colorSpace = THREE.SRGBColorSpace;
        threeTexture.needsUpdate = true;

        return new THREE.MeshBasicMaterial({ 
            map: threeTexture, 
            transparent: true, 
            alphaTest: 0.5, 
            side: THREE.DoubleSide 
        });
    }

    _createBillboardSprite() {
        const frame = this.object.getAnimator().getCurrentFrame();
        const initialColor = new THREE.Color(...parseGDevelopColor(Box3DRenderer.DEFAULT_SPRITE_COLOR));
        initialColor.convertSRGBToLinear();

        const material = new THREE.SpriteMaterial({
            map: frame ? applyUVPixelInset(frame.texture.map) : null,
            color: initialColor,
            transparent: true,
            alphaTest: 0.5,
            magFilter: THREE.NearestFilter,
            minFilter: THREE.NearestFilter,
        });

        if (material.map) {
            material.map.colorSpace = THREE.SRGBColorSpace;
        }

        return new THREE.Sprite(material);
    }
}

// Register the final, optimized renderer
gdjs.__box3DExtension = {
    Box3DRenderer
};

};
gdjs.evtsExt__Sprite3D__DefineHelperClassesBox.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__Sprite3D__DefineHelperClassesBox.userFunc0xae5bb8(runtimeScene, eventsFunctionContext);

}


};

gdjs.evtsExt__Sprite3D__DefineHelperClassesBox.func = function(runtimeScene, parentEventsFunctionContext) {
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


gdjs.evtsExt__Sprite3D__DefineHelperClassesBox.eventsList0(runtimeScene, eventsFunctionContext);


return;
}

gdjs.evtsExt__Sprite3D__DefineHelperClassesBox.registeredGdjsCallbacks = [];