
if (typeof gdjs.evtsExt__Sprite3D__DefineHelperClasses !== "undefined") {
  gdjs.evtsExt__Sprite3D__DefineHelperClasses.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Sprite3D__DefineHelperClasses = {};


gdjs.evtsExt__Sprite3D__DefineHelperClasses.userFunc0x10d0dc0 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
// Ensure the extension is not already loaded
if (gdjs.__sprite3DExtension) {
    return;
}

/**
 * The renderer for a 3D sprite object, using THREE.js.
 */
class Sprite3DRenderer {
    /** @type {gdjs.CustomRuntimeObject} */
    object;
    /** @type {THREE.Group | THREE.Mesh | null} */
    renderable = null; 
    /** @type {THREE.Mesh | null} */
    mesh = null; // Only used for the Plane
    /** @type {THREE.Mesh | null} */
    outlineMesh = null; // The black outline box
    /** @type {THREE.Mesh | null} */
    fillMesh = null;    // The colored fill box that does NOT block objects
    /** @type {THREE.Mesh | null} */
    spriteBox = null;   // The main textured box with holes
    /** @type {string | null} */
    _lastAxis = null;
    /** @type {boolean} */
    _isBox = false;

    /**
     * @param {gdjs.CustomRuntimeObject} object The object to be rendered.
     */
    constructor(object) {
        this.object = object;
        const rendererObject = object.get3DRendererObject();

        if (this.object._getBox) {
            this._isBox = this.object._getBox();
        }

        const animationFrame = object.getAnimator().getCurrentFrame();
        if (animationFrame) {
            const texture = animationFrame.texture.map;

            if (this._isBox) {
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                
                // 1. Die vorderste Box mit der Textur (stanzt Löcher)
                const spriteMaterial = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    alphaTest: 0.5, // Dieser Teil ist entscheidend
                    side: THREE.DoubleSide
                });
                this.spriteBox = new THREE.Mesh(geometry, spriteMaterial);
                this.spriteBox.renderOrder = 0;

                // 2. Die mittlere Füll-Box (sichtbar durch die Löcher, aber blockiert nichts)
                const fillMaterial = new THREE.MeshBasicMaterial({
                    color: 'red',
                    depthWrite: false, // DER ENTSCHEIDENDE PUNKT!
                    side: THREE.DoubleSide
                });
                this.fillMesh = new THREE.Mesh(geometry.clone(), fillMaterial);
                this.fillMesh.renderOrder = -1; // Liegt hinter dem Sprite

                // 3. Die hinterste Outline-Box
                const outlineMaterial = new THREE.MeshBasicMaterial({ color: 'black', side: THREE.BackSide });
                this.outlineMesh = new THREE.Mesh(geometry.clone(), outlineMaterial);
                this.outlineMesh.renderOrder = -2; // Liegt ganz hinten

                const group = new THREE.Group();
                group.add(this.spriteBox);
                group.add(this.fillMesh);
                group.add(this.outlineMesh);
                
                this.renderable = group;
            } else {
                // --- UNVERÄNDERTE ORIGINAL-LOGIK FÜR DIE EBENE ---
                const geometry = new THREE.PlaneGeometry(1, 1);
                geometry.scale(1, -1, 1);
                const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide });
                
                const mesh = new THREE.Mesh(geometry, material);
                this.renderable = mesh;
                this.mesh = mesh;
            }
            
            this.renderable.rotation.order = rendererObject.rotation.order;
            rendererObject.add(this.renderable);
        }

        this.updateFrame();
        object.getAnimator().setOnFrameChangeCallback(() => this.updateFrame());
    }

    applyAxisRotation() {
        if (!this.mesh) return;
        let axis = 'Z';
        if (this.object._getAxis) axis = this.object._getAxis();
        if (axis === this._lastAxis) return;
        this._lastAxis = axis;
        this.mesh.rotation.set(0, 0, 0);
        switch (axis.toUpperCase()) {
            case 'X': this.mesh.rotation.y = Math.PI / 2; break;
            case 'Y': this.mesh.rotation.x = -Math.PI / 2; this.mesh.rotation.y = Math.PI; break;
        }
    }

    updateFrame() {
        if (!this.renderable) return;
        const frame = this.object.getAnimator().getCurrentFrame();
        if (!frame) { this.renderable.visible = false; return; }
        this.renderable.visible = true;

        const castShadow = this.object._getCastShadow ? this.object._getCastShadow() : false;
        const receiveShadow = this.object._getReceiveShadow ? this.object._getReceiveShadow() : false;
        this.renderable.traverse(child => { if (child.isMesh) { child.castShadow = castShadow; child.receiveShadow = receiveShadow; } });
        
        this.object.getVariables().get("CurrentFrame").setNumber(this.object.getAnimator()._currentFrameIndex);
        const texture = frame.texture.map;
        if (texture) texture.generateMipmaps = false;

        const image = texture.image;
        const width = image.width;
        const height = image.height;
        const origin = frame.origin;
        const scaleX = this.object.getScaleX();
        const scaleY = this.object.getScaleY();
        const finalScaleX = width * scaleX;
        let finalScaleY = height * scaleY;

        if (this._isBox) {
            const outlineEnabled = this.object._getOutline ? this.object._getOutline() : false;
            // Schalte Fill und Outline zusammen an/aus
            if (this.outlineMesh) this.outlineMesh.visible = outlineEnabled;
            if (this.fillMesh) this.fillMesh.visible = outlineEnabled;
            
            // Textur auf der Haupt-Box updaten
            if (this.spriteBox) {
                this.spriteBox.material.map = texture;
                this.spriteBox.material.map.magFilter = THREE.NearestFilter;
                this.spriteBox.material.map.minFilter = THREE.NearestFilter;
            }

            const depth = finalScaleX;
            this.renderable.position.set(-origin.x + width / 2, -origin.y + height / 2, 0);
            this.renderable.scale.set(finalScaleX, finalScaleY, depth);

            if (this.outlineMesh && outlineEnabled) {
                const outlineScaleX = 1 + (2 / width);
                const outlineScaleY = 1 + (2 / height);
                const outlineScaleZ = 1 + (2 / width);
                this.outlineMesh.scale.set(outlineScaleX, outlineScaleY, outlineScaleZ);
            }
        } else {
            this.applyAxisRotation();
            if (this._lastAxis && this._lastAxis.toUpperCase() === 'Y') finalScaleY = -height * scaleY;

            this.mesh.material.map = texture;
            this.mesh.material.map.magFilter = THREE.NearestFilter;
            this.mesh.material.map.minFilter = THREE.NearestFilter;
            this.renderable.position.set(-origin.x + width / 2, -origin.y + height / 2, -0.001);
            this.renderable.scale.set(finalScaleX, finalScaleY, 1);
        }

        const center = frame.center;
        this.object.setRotationCenter(center.x - origin.x, center.y - origin.y);

        const aabb = this.object._unrotatedAABB;
        aabb.min[0] = -origin.x; aabb.min[1] = -origin.y;
        aabb.max[0] = -origin.x + width; aabb.max[1] = -origin.y + height;
        if (this._isBox) { const depth = finalScaleX; aabb.min[2] = -depth / 2; aabb.max[2] = depth / 2; }

        this.object._isUntransformedHitBoxesDirty = false;
    }
}

// Register the renderer
gdjs.__sprite3DExtension = {
    Sprite3DRenderer
};

};
gdjs.evtsExt__Sprite3D__DefineHelperClasses.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__Sprite3D__DefineHelperClasses.userFunc0x10d0dc0(runtimeScene, eventsFunctionContext);

}


};

gdjs.evtsExt__Sprite3D__DefineHelperClasses.func = function(runtimeScene, parentEventsFunctionContext) {
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


gdjs.evtsExt__Sprite3D__DefineHelperClasses.eventsList0(runtimeScene, eventsFunctionContext);


return;
}

gdjs.evtsExt__Sprite3D__DefineHelperClasses.registeredGdjsCallbacks = [];