
if (typeof gdjs.evtsExt__Tween3D__DefineHelperClasses !== "undefined") {
  gdjs.evtsExt__Tween3D__DefineHelperClasses.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Tween3D__DefineHelperClasses = {};


gdjs.evtsExt__Tween3D__DefineHelperClasses.userFunc0xe73460 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
if (gdjs.__tween3DExtension) {
  return;
}

class Tint {
  /**
   * Materials by material `id`.
   * @type {Map<number, THREE.Material>}
   */
  materials;
  usageCount = 0;

  /**
   * @param materials {Map<number, THREE.Material>}
   */
  constructor(materials) {
    this.materials = materials;
  }

  /**
   * @param object {gdjs.RuntimeObject3D}
   */
  applyTo(object) {
    object.get3DRendererObject().traverse((mesh) => {
      if (mesh.material) {
        const material = mesh.material;
        const originalId = material.originalId || material.id;
        const tintedMaterial = this.materials.get(originalId);
        if (tintedMaterial) {
          mesh.material = tintedMaterial;
        }
      }
    });
  }

  /**
   * @param tintColor {number}
   * @param originalTint {Tint}
   */
  setColor(tintColor, originalTint) {
    const originalMaterials = originalTint.materials;
    for (const [materialId, material] of this.materials) {
      const originalMaterial = originalMaterials.get(materialId);
      if (!originalMaterial) {
        // A new material may have been changed by another extension.
        continue;
      }
      const originalColor = originalMaterial.color;

      const color = material.color;
      color.setHex(tintColor);
      color.r *= originalColor.r;
      color.g *= originalColor.g;
      color.b *= originalColor.b;
    }
  }

  dispose() {
    for (const material of this.materials.values()) {
      material.dispose();
    }
  }
}

class TintManager {
  /**
   * Tints by color hex.
   * @type {Map<integer, Tint>}
   */
  tints = new Map();
  /**
   * Materials by material `id`.
   * @type {Tint}
   */
  originalTint;
  /**
   * @type {Array<THREE.Material>}
   */
  recycledTints = [];

  /**
   * @param {gdjs.RuntimeObject3D} object
   */
  constructor(object) {
    const materials = new Map();
    object.get3DRendererObject().traverse((mesh) => {
      if (mesh.material && mesh.material.color) {
        const material = mesh.material;
        materials.set(material.id, material);
      }
    });
    this.originalTint = new Tint(materials);
  }

  /**
   * @param {gdjs.RuntimeObject3D} object
   * @param {number} color
   */
  applyTint(object, color) {
    const previousColor = this.getTint(object);
    if (color === previousColor) {
      return;
    }
    if (previousColor !== 0xffffff) {
      const previousTint = this.tints.get(previousColor);
      previousTint.usageCount--;
      if (previousTint.usageCount === 0) {
        this.tints.delete(previousColor);
        this.recycledTints.push(previousTint);
      }
    }
    let tint = color === 0xffffff ? this.originalTint : this.tints.get(color);
    if (!tint) {
      tint = this.createTint(object, color);
      this.tints.set(color, tint);
    }
    tint.applyTo(object);
    tint.usageCount++;
    object.__tint3DExtension_tint = color;
  }

  /**
   * @param {gdjs.RuntimeObject3D} object
   * @return {number}
   */
  getTint(object) {
    return object.__tint3DExtension_tint === undefined ? 0xffffff : object.__tint3DExtension_tint;
  }

  /**
   * @param {gdjs.RuntimeObject3D} object
   * @param {number} color
   */
  createTint(object, color) {
    let tint;
    if (this.recycledTints.length > 0) {
      tint = this.recycledTints.pop();
      tint.usageCount = 0;
    }
    else {
      const materials = new Map();
      for (const [originalId, material] of this.originalTint.materials) {
        const tintedMaterial = material.clone();
        tintedMaterial.originalId = originalId;
        materials.set(originalId, tintedMaterial);
      }
      tint = new Tint(materials);
    }
    tint.setColor(color, this.originalTint);
    return tint;
  }

  dispose() {
    for (const tint of this.tints.values()) {
      tint.dispose();
    }
    this.tints.clear();
    for (const tint of this.recycledTints) {
      tint.dispose();
    }
    this.recycledTints.length = 0;
  }
}

gdjs.registerObjectDeletedFromSceneCallback(function (runtimeScene, deletedObject) {
  const extension = runtimeScene.__tween3DExtension;
  if (!extension) {
    return;
  }
  const managers = extension.tintManagers;
  const manager = managers.get(deletedObject.getName());
  if (manager) {
    manager.applyTint(deletedObject, 0xffffff);
  }
});


/**
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @return {number[]}
 */
const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  let v = Math.max(r, g, b),
    c = v - Math.min(r, g, b),
    f = 1 - Math.abs(v + v - c - 1);
  let h =
    c &&
    (v === r ? (g - b) / c : v === g ? 2 + (b - r) / c : 4 + (r - g) / c);
  return [
    Math.round(60 * (h < 0 ? h + 6 : h)),
    Math.round((f ? c / f : 0) * 100),
    Math.round(((v + v - c) / 2) * 100),
  ];
};

/**
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @return {number[]}
 */
const hslToRgb = (h, s, l) => {
  h = h %= 360;
  if (h < 0) {
    h += 360;
  }
  s = s / 100;
  l = l / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n = 0, k = (n + h / 30) % 12) =>
    l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [
    Math.round(f(0) * 255),
    Math.round(f(8) * 255),
    Math.round(f(4) * 255),
  ];
};

gdjs.__tween3DExtension = {
  TintManager,
  rgbToHsl,
  hslToRgb,
};

};
gdjs.evtsExt__Tween3D__DefineHelperClasses.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__Tween3D__DefineHelperClasses.userFunc0xe73460(runtimeScene, eventsFunctionContext);

}


};

gdjs.evtsExt__Tween3D__DefineHelperClasses.func = function(runtimeScene, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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


gdjs.evtsExt__Tween3D__DefineHelperClasses.eventsList0(runtimeScene, eventsFunctionContext);


return;
}

gdjs.evtsExt__Tween3D__DefineHelperClasses.registeredGdjsCallbacks = [];