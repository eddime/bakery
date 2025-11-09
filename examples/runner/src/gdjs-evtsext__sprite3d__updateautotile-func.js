
if (typeof gdjs.evtsExt__Sprite3D__UpdateAutotile !== "undefined") {
  gdjs.evtsExt__Sprite3D__UpdateAutotile.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Sprite3D__UpdateAutotile = {};
gdjs.evtsExt__Sprite3D__UpdateAutotile.GDTargetObjects1= [];
gdjs.evtsExt__Sprite3D__UpdateAutotile.GDTargetObjects2= [];


gdjs.evtsExt__Sprite3D__UpdateAutotile.userFunc0x109d818 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
// ================== Blob / 47-Autotile + Side-Texture (PERFORMANCE OPTIMIZED) ==================
const targets = eventsFunctionContext.getObjects("Target");
if (!targets?.length) return;

// --- EINSTELLUNG: Passen Sie diesen Wert an, um die Stärke der Kantenkorrektur zu justieren ---
const UV_CORRECTION = 0.15;


// --- OPTIMIERUNG: Performance Caches ---
if (!runtimeScene.autotileMeshCache) {
    runtimeScene.autotileMeshCache = new Map();
}
if (!runtimeScene.autotileStateCache) {
    runtimeScene.autotileStateCache = new Map();
}
const meshCache = runtimeScene.autotileMeshCache;
const tileStateCache = runtimeScene.autotileStateCache;

// --- Konstanten & Grid-Setup ---
const TOP_ATLAS_COLS = 12, TOP_ATLAS_ROWS = 4, SIDE_ATLAS_COLS = 4;
const tileW = targets[0].getWidth(), tileH = targets[0].getHeight();

const grid = new Map(targets.map(obj => [`${Math.round(obj.getX() / tileW)},${Math.round(obj.getY() / tileH)}`, { obj, gx: Math.round(obj.getX() / tileW), gy: Math.round(obj.getY() / tileH) }]));
const hasAt = (gx, gy) => grid.has(`${gx},${gy}`);

// --- Nachbar-Logik ---
const getNeighbors = (gx, gy) => ({
    n: hasAt(gx, gy - 1), e: hasAt(gx + 1, gy), s: hasAt(gx, gy + 1), w: hasAt(gx - 1, gy),
    nw: hasAt(gx - 1, gy - 1), ne: hasAt(gx + 1, gy - 1), sw: hasAt(gx - 1, gy + 1), se: hasAt(gx + 1, gy + 1)
});

const getTileZIndex = (obj) => {
    return obj.getZOrder ? obj.getZOrder() : 0;
};

const calcTileIndex = (nb) => (
    (nb.n | (nb.e << 1) | (nb.s << 2) | (nb.w << 3)) |
    (nb.n && nb.w && nb.nw ? 16 : 0) | (nb.n && nb.e && nb.ne ? 32 : 0) |
    (nb.s && nb.w && nb.sw ? 64 : 0) | (nb.s && nb.e && nb.se ? 128 : 0)
);

// --- 3D-Helfer ---
const findMeshes = (gdObj) => {
    const root = gdObj.get3DRendererObject?.();
    if (!root) return { topMesh: null, sideMeshes: [] };
    let topMesh = null;
    const allMeshes = [];
    root.traverse?.((n) => {
        if (n?.isMesh) allMeshes.push(n);
    });
    topMesh = allMeshes.find(m => m.name === "TopFace") || null;
    const sideMeshes = allMeshes.filter(m => m !== topMesh);
    return { topMesh, sideMeshes };
};

// --- UV- und Rotationsfunktionen ---
const setTopUV = (mesh, col, row, neighbors) => {
    if (!mesh) return;
    const tex = mesh.material?.map;
    if (!tex || !tex.image) return;

    const atlasWidth = tex.image.width;
    const atlasHeight = tex.image.height;

    const halfPixelU = UV_CORRECTION / atlasWidth;
    const halfPixelV = UV_CORRECTION / atlasHeight;

    const startU = (col - 1) / TOP_ATLAS_COLS;
    const startV = (row - 1) / TOP_ATLAS_ROWS;
    const sizeU = 1 / TOP_ATLAS_COLS;
    const sizeV = 1 / TOP_ATLAS_ROWS;

    const correctionLeft = neighbors.w ? halfPixelU : 0;
    const correctionRight = neighbors.e ? halfPixelU : 0;
    const correctionTop = neighbors.n ? halfPixelV : 0;
    const correctionBottom = neighbors.s ? halfPixelV : 0;

    tex.flipY = false;
    tex.offset.set(startU + correctionLeft, startV + correctionTop);
    tex.repeat.set(sizeU - correctionLeft - correctionRight, sizeV - correctionTop - correctionBottom);
    tex.needsUpdate = true;
};

// FINALE KORREKTUR: Behebt die Dicke der unteren Ränder.
const setSideUV = (sideMeshes, colIndex, neighbors) => {
    if (!sideMeshes?.length) return;
    const firstMesh = sideMeshes.find(m => m.material?.map?.image);
    if (!firstMesh) return;

    const tex = firstMesh.material.map;
    const atlasWidth = tex.image.width;
    const atlasHeight = tex.image.height;

    const halfPixelU = UV_CORRECTION / atlasWidth;
    const halfPixelV = UV_CORRECTION / atlasHeight;

    for (const mesh of sideMeshes) {
        if (!mesh.visible) continue;
        
        const meshTex = mesh.material?.map; 
        if (!meshTex) continue;
        
        const startU = colIndex / SIDE_ATLAS_COLS;
        const sizeU = 1 / SIDE_ATLAS_COLS;

        // Horizontale Korrektur (U-Achse), basierend auf Nachbarn:
        let u_offset = startU;
        let u_repeat = sizeU;
        
        switch (mesh.name) {
            case "FrontFace":
            case "BackFace":
                const corrW = neighbors.w ? halfPixelU : 0;
                const corrE = neighbors.e ? halfPixelU : 0;
                u_offset = startU + corrW;
                u_repeat = sizeU - corrW - corrE;
                break;
            case "LeftFace":
            case "RightFace":
                const corrN = neighbors.n ? halfPixelU : 0;
                const corrS = neighbors.s ? halfPixelU : 0;
                u_offset = startU + corrS;
                u_repeat = sizeU - corrS - corrN;
                break;
        }
        
        // Vertikale Korrektur (V-Achse) basierend auf der Ausrichtung der Wand
        let v_offset = 0;
        let v_repeat = 1.0;

        // KORREKTUR: Unterscheidet die Ausrichtung der Meshes
        if (mesh.name === 'FrontFace' || mesh.name === 'LeftFace') {
            // Bei diesen Meshes ist V=0 (unten) an der TopFace. Korrigiere den Start.
            v_offset = halfPixelV;
            v_repeat = 1.0 - halfPixelV;
        } else { // BackFace, RightFace
            // Bei diesen Meshes ist V=1 (oben) an der TopFace. Korrigiere die Wiederholung.
            v_offset = 0;
            v_repeat = 1.0 - halfPixelV;
        }

        meshTex.offset.set(u_offset, v_offset);
        meshTex.repeat.set(u_repeat, v_repeat);
        meshTex.needsUpdate = true;
    }
};

const applyRotation = (mesh, degrees) => {
    if (mesh) mesh.rotation.set(0, 0, degrees * (Math.PI / 180));
};

// --- TileMap ---
const tileMap = { 59:[9,3], 4:[0,0], 1:[0,2], 8:[3,3], 2:[1,3], 6:[1,0], 14:[2,0], 12:[3,0], 31:[4,0], 142:[5,0], 78:[6,0], 47:[7,0], 134:[8,0], 207:[9,0], 206:[10,0], 76:[11,0], 5:[0,1], 7:[1,1], 15:[2,1], 13:[3,1], 135:[4,1], 239:[5,1], 223:[6,1], 77:[7,1], 167:[8,1], 111:[9,1], 95:[11,1], 3:[1,2], 11:[2,2], 9:[3,2], 191:[5,2], 127:[6,2], 29:[7,2], 175:[8,2], 255:[9,2], 159:[10,2], 93:[11,2], 0:[0,3], 10:[2,3], 79:[4,3], 43:[5,3], 27:[6,3], 143:[7,3], 35:[8,3], 63:[10,3], 25:[11,3], 39:[4,2] };

// ==========================================================
// Finale Apply-Loop
// ==========================================================
for (const { obj, gx, gy } of grid.values()) {
    let cachedMeshes = meshCache.get(obj.id);
    if (!cachedMeshes) {
        cachedMeshes = findMeshes(obj);
        meshCache.set(obj.id, cachedMeshes);
    }
    const { topMesh, sideMeshes } = cachedMeshes;
    if (!topMesh && !sideMeshes.length) continue;

    const neighbors = getNeighbors(gx, gy);
    const topIdx = calcTileIndex(neighbors);
    const currentZIndex = getTileZIndex(obj);

    let variant = 0;
    const baseCoords = tileMap[topIdx];
    if (baseCoords && baseCoords[0] === 9 && baseCoords[1] === 2) {
        if ((gx + gy) % 2 === 0) variant = 1;
    }
    
    const gridKey = `${gx},${gy}`;
    const lastState = tileStateCache.get(gridKey);

    const currentState = { 
        topIdx, zIndex: currentZIndex, variant,
        n: neighbors.n, s: neighbors.s, e: neighbors.e, w: neighbors.w
    };

    if (lastState && 
        lastState.topIdx === currentState.topIdx && lastState.zIndex === currentState.zIndex &&
        lastState.variant === currentState.variant && lastState.n === currentState.n && 
        lastState.s === currentState.s && lastState.e === currentState.e && lastState.w === currentState.w) {
        continue;
    }

    tileStateCache.set(gridKey, currentState);

    if (topMesh) {
        let topCoords = tileMap[topIdx];
        if (topCoords) {
            if (topCoords[0] === 9 && topCoords[1] === 2 && currentState.variant === 1) {
                topCoords = [10, 1];
            }
            setTopUV(topMesh, topCoords[0] + 1, topCoords[1] + 1, neighbors); 
            applyRotation(topMesh, 0);
        }
    }

    if (sideMeshes.length > 0) {
        // KORREKTUR: Die fehlerhafte Logik für vertikale Tunnel wurde entfernt.
        let sideIdx = 0; // Standard: freistehende Wand
        if (neighbors.w && neighbors.e) {
            sideIdx = 2; // Horizontaler Tunnel
        } else if (neighbors.w) {
            sideIdx = 3; // Wand links
        } else if (neighbors.e) {
            sideIdx = 1; // Wand rechts
        }

        for (const mesh of sideMeshes) {
            let isVisible = false;
            switch (mesh.name) {
                case "FrontFace": isVisible = !neighbors.s; break;
                case "BackFace": isVisible = !neighbors.n; break;
                case "RightFace": isVisible = !neighbors.e; break;
                case "LeftFace": isVisible = !neighbors.w; break;
            }
            mesh.visible = isVisible;
        }

        const anySideVisible = !neighbors.n || !neighbors.s || !neighbors.e || !neighbors.w;
        if (anySideVisible) {
            setSideUV(sideMeshes, sideIdx, neighbors);
        }
    }
}

// Cache aufräumen
const allCurrentTileKeys = new Set(grid.keys());
for (const cachedKey of tileStateCache.keys()) {
    if (!allCurrentTileKeys.has(cachedKey)) {
        tileStateCache.delete(cachedKey);
    }
}

};
gdjs.evtsExt__Sprite3D__UpdateAutotile.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Target"), gdjs.evtsExt__Sprite3D__UpdateAutotile.GDTargetObjects1);

const objects = gdjs.evtsExt__Sprite3D__UpdateAutotile.GDTargetObjects1;
gdjs.evtsExt__Sprite3D__UpdateAutotile.userFunc0x109d818(runtimeScene, objects, eventsFunctionContext);

}


{


let isConditionTrue_0 = false;
{
}

}


};

gdjs.evtsExt__Sprite3D__UpdateAutotile.func = function(runtimeScene, Target, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"Target": Target
},
  _objectArraysMap: {
"Target": gdjs.objectsListsToArray(Target)
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

gdjs.evtsExt__Sprite3D__UpdateAutotile.GDTargetObjects1.length = 0;
gdjs.evtsExt__Sprite3D__UpdateAutotile.GDTargetObjects2.length = 0;

gdjs.evtsExt__Sprite3D__UpdateAutotile.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Sprite3D__UpdateAutotile.GDTargetObjects1.length = 0;
gdjs.evtsExt__Sprite3D__UpdateAutotile.GDTargetObjects2.length = 0;


return;
}

gdjs.evtsExt__Sprite3D__UpdateAutotile.registeredGdjsCallbacks = [];