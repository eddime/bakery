
gdjs.evtsExt__A3F__A3L = gdjs.evtsExt__A3F__A3L || {};

/**
 * Behavior generated from Advanced 3D Light
 */
gdjs.evtsExt__A3F__A3L.A3L = class A3L extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__A3F__A3L.A3L.getSharedData(
      instanceContainer,
      behaviorData.name
    );
    
    this._behaviorData.Capability3d = behaviorData.Capability3d !== undefined ? behaviorData.Capability3d : "";
    this._behaviorData.Type = behaviorData.Type !== undefined ? behaviorData.Type : "Directional Light";
    this._behaviorData.Color = behaviorData.Color !== undefined ? behaviorData.Color : "255;255;255";
    this._behaviorData.Intensity = behaviorData.Intensity !== undefined ? behaviorData.Intensity : Number("1") || 0;
    this._behaviorData.Distance = behaviorData.Distance !== undefined ? behaviorData.Distance : Number("0") || 0;
    this._behaviorData.SpotAngle = behaviorData.SpotAngle !== undefined ? behaviorData.SpotAngle : Number("45") || 0;
    this._behaviorData.SpotPenumbra = behaviorData.SpotPenumbra !== undefined ? behaviorData.SpotPenumbra : Number("0.5") || 0;
    this._behaviorData.CastShadow = behaviorData.CastShadow !== undefined ? behaviorData.CastShadow : false;
    this._behaviorData.ShadowMapSize = behaviorData.ShadowMapSize !== undefined ? behaviorData.ShadowMapSize : "512px";
    this._behaviorData.ShadowRange = behaviorData.ShadowRange !== undefined ? behaviorData.ShadowRange : Number("256") || 0;
    this._behaviorData.ShadowDepthBias = behaviorData.ShadowDepthBias !== undefined ? behaviorData.ShadowDepthBias : Number("0") || 0;
    this._behaviorData.ShadowNormalBias = behaviorData.ShadowNormalBias !== undefined ? behaviorData.ShadowNormalBias : Number("0") || 0;
    this._behaviorData.LightHelper = behaviorData.LightHelper !== undefined ? behaviorData.LightHelper : false;
    this._behaviorData.ShadowHelper = behaviorData.ShadowHelper !== undefined ? behaviorData.ShadowHelper : false;
  }

  // Hot-reload:
  updateFromBehaviorData(oldBehaviorData, newBehaviorData) {
    
    if (oldBehaviorData.Capability3d !== newBehaviorData.Capability3d)
      this._behaviorData.Capability3d = newBehaviorData.Capability3d;
    if (oldBehaviorData.Type !== newBehaviorData.Type)
      this._behaviorData.Type = newBehaviorData.Type;
    if (oldBehaviorData.Color !== newBehaviorData.Color)
      this._behaviorData.Color = newBehaviorData.Color;
    if (oldBehaviorData.Intensity !== newBehaviorData.Intensity)
      this._behaviorData.Intensity = newBehaviorData.Intensity;
    if (oldBehaviorData.Distance !== newBehaviorData.Distance)
      this._behaviorData.Distance = newBehaviorData.Distance;
    if (oldBehaviorData.SpotAngle !== newBehaviorData.SpotAngle)
      this._behaviorData.SpotAngle = newBehaviorData.SpotAngle;
    if (oldBehaviorData.SpotPenumbra !== newBehaviorData.SpotPenumbra)
      this._behaviorData.SpotPenumbra = newBehaviorData.SpotPenumbra;
    if (oldBehaviorData.CastShadow !== newBehaviorData.CastShadow)
      this._behaviorData.CastShadow = newBehaviorData.CastShadow;
    if (oldBehaviorData.ShadowMapSize !== newBehaviorData.ShadowMapSize)
      this._behaviorData.ShadowMapSize = newBehaviorData.ShadowMapSize;
    if (oldBehaviorData.ShadowRange !== newBehaviorData.ShadowRange)
      this._behaviorData.ShadowRange = newBehaviorData.ShadowRange;
    if (oldBehaviorData.ShadowDepthBias !== newBehaviorData.ShadowDepthBias)
      this._behaviorData.ShadowDepthBias = newBehaviorData.ShadowDepthBias;
    if (oldBehaviorData.ShadowNormalBias !== newBehaviorData.ShadowNormalBias)
      this._behaviorData.ShadowNormalBias = newBehaviorData.ShadowNormalBias;
    if (oldBehaviorData.LightHelper !== newBehaviorData.LightHelper)
      this._behaviorData.LightHelper = newBehaviorData.LightHelper;
    if (oldBehaviorData.ShadowHelper !== newBehaviorData.ShadowHelper)
      this._behaviorData.ShadowHelper = newBehaviorData.ShadowHelper;

    return true;
  }

  // Network sync:
  getNetworkSyncData() {
    return {
      ...super.getNetworkSyncData(),
      props: {
        
    Capability3d: this._behaviorData.Capability3d,
    Type: this._behaviorData.Type,
    Color: this._behaviorData.Color,
    Intensity: this._behaviorData.Intensity,
    Distance: this._behaviorData.Distance,
    SpotAngle: this._behaviorData.SpotAngle,
    SpotPenumbra: this._behaviorData.SpotPenumbra,
    CastShadow: this._behaviorData.CastShadow,
    ShadowMapSize: this._behaviorData.ShadowMapSize,
    ShadowRange: this._behaviorData.ShadowRange,
    ShadowDepthBias: this._behaviorData.ShadowDepthBias,
    ShadowNormalBias: this._behaviorData.ShadowNormalBias,
    LightHelper: this._behaviorData.LightHelper,
    ShadowHelper: this._behaviorData.ShadowHelper,
      }
    };
  }
  updateFromNetworkSyncData(networkSyncData) {
    super.updateFromNetworkSyncData(networkSyncData);
    
    if (networkSyncData.props.Capability3d !== undefined)
      this._behaviorData.Capability3d = networkSyncData.props.Capability3d;
    if (networkSyncData.props.Type !== undefined)
      this._behaviorData.Type = networkSyncData.props.Type;
    if (networkSyncData.props.Color !== undefined)
      this._behaviorData.Color = networkSyncData.props.Color;
    if (networkSyncData.props.Intensity !== undefined)
      this._behaviorData.Intensity = networkSyncData.props.Intensity;
    if (networkSyncData.props.Distance !== undefined)
      this._behaviorData.Distance = networkSyncData.props.Distance;
    if (networkSyncData.props.SpotAngle !== undefined)
      this._behaviorData.SpotAngle = networkSyncData.props.SpotAngle;
    if (networkSyncData.props.SpotPenumbra !== undefined)
      this._behaviorData.SpotPenumbra = networkSyncData.props.SpotPenumbra;
    if (networkSyncData.props.CastShadow !== undefined)
      this._behaviorData.CastShadow = networkSyncData.props.CastShadow;
    if (networkSyncData.props.ShadowMapSize !== undefined)
      this._behaviorData.ShadowMapSize = networkSyncData.props.ShadowMapSize;
    if (networkSyncData.props.ShadowRange !== undefined)
      this._behaviorData.ShadowRange = networkSyncData.props.ShadowRange;
    if (networkSyncData.props.ShadowDepthBias !== undefined)
      this._behaviorData.ShadowDepthBias = networkSyncData.props.ShadowDepthBias;
    if (networkSyncData.props.ShadowNormalBias !== undefined)
      this._behaviorData.ShadowNormalBias = networkSyncData.props.ShadowNormalBias;
    if (networkSyncData.props.LightHelper !== undefined)
      this._behaviorData.LightHelper = networkSyncData.props.LightHelper;
    if (networkSyncData.props.ShadowHelper !== undefined)
      this._behaviorData.ShadowHelper = networkSyncData.props.ShadowHelper;
  }

  // Properties:
  
  _getCapability3d() {
    return this._behaviorData.Capability3d !== undefined ? this._behaviorData.Capability3d : "";
  }
  _setCapability3d(newValue) {
    this._behaviorData.Capability3d = newValue;
  }
  _getType() {
    return this._behaviorData.Type !== undefined ? this._behaviorData.Type : "Directional Light";
  }
  _setType(newValue) {
    this._behaviorData.Type = newValue;
  }
  _getColor() {
    return this._behaviorData.Color !== undefined ? this._behaviorData.Color : "255;255;255";
  }
  _setColor(newValue) {
    this._behaviorData.Color = newValue;
  }
  _getIntensity() {
    return this._behaviorData.Intensity !== undefined ? this._behaviorData.Intensity : Number("1") || 0;
  }
  _setIntensity(newValue) {
    this._behaviorData.Intensity = newValue;
  }
  _getDistance() {
    return this._behaviorData.Distance !== undefined ? this._behaviorData.Distance : Number("0") || 0;
  }
  _setDistance(newValue) {
    this._behaviorData.Distance = newValue;
  }
  _getSpotAngle() {
    return this._behaviorData.SpotAngle !== undefined ? this._behaviorData.SpotAngle : Number("45") || 0;
  }
  _setSpotAngle(newValue) {
    this._behaviorData.SpotAngle = newValue;
  }
  _getSpotPenumbra() {
    return this._behaviorData.SpotPenumbra !== undefined ? this._behaviorData.SpotPenumbra : Number("0.5") || 0;
  }
  _setSpotPenumbra(newValue) {
    this._behaviorData.SpotPenumbra = newValue;
  }
  _getCastShadow() {
    return this._behaviorData.CastShadow !== undefined ? this._behaviorData.CastShadow : false;
  }
  _setCastShadow(newValue) {
    this._behaviorData.CastShadow = newValue;
  }
  _toggleCastShadow() {
    this._setCastShadow(!this._getCastShadow());
  }
  _getShadowMapSize() {
    return this._behaviorData.ShadowMapSize !== undefined ? this._behaviorData.ShadowMapSize : "512px";
  }
  _setShadowMapSize(newValue) {
    this._behaviorData.ShadowMapSize = newValue;
  }
  _getShadowRange() {
    return this._behaviorData.ShadowRange !== undefined ? this._behaviorData.ShadowRange : Number("256") || 0;
  }
  _setShadowRange(newValue) {
    this._behaviorData.ShadowRange = newValue;
  }
  _getShadowDepthBias() {
    return this._behaviorData.ShadowDepthBias !== undefined ? this._behaviorData.ShadowDepthBias : Number("0") || 0;
  }
  _setShadowDepthBias(newValue) {
    this._behaviorData.ShadowDepthBias = newValue;
  }
  _getShadowNormalBias() {
    return this._behaviorData.ShadowNormalBias !== undefined ? this._behaviorData.ShadowNormalBias : Number("0") || 0;
  }
  _setShadowNormalBias(newValue) {
    this._behaviorData.ShadowNormalBias = newValue;
  }
  _getLightHelper() {
    return this._behaviorData.LightHelper !== undefined ? this._behaviorData.LightHelper : false;
  }
  _setLightHelper(newValue) {
    this._behaviorData.LightHelper = newValue;
  }
  _toggleLightHelper() {
    this._setLightHelper(!this._getLightHelper());
  }
  _getShadowHelper() {
    return this._behaviorData.ShadowHelper !== undefined ? this._behaviorData.ShadowHelper : false;
  }
  _setShadowHelper(newValue) {
    this._behaviorData.ShadowHelper = newValue;
  }
  _toggleShadowHelper() {
    this._setShadowHelper(!this._getShadowHelper());
  }
}

/**
 * Shared data generated from Advanced 3D Light
 */
gdjs.evtsExt__A3F__A3L.A3L.SharedData = class A3LSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__A3F__A3L.A3L.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._A3F_A3LSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._A3F_A3LSharedData = new gdjs.evtsExt__A3F__A3L.A3L.SharedData(
      initialData
    );
  }
  return instanceContainer._A3F_A3LSharedData;
}

// Methods:
gdjs.evtsExt__A3F__A3L.A3L.prototype.onCreatedContext = {};
gdjs.evtsExt__A3F__A3L.A3L.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__A3F__A3L.A3L.prototype.onCreatedContext.GDObjectObjects2= [];


gdjs.evtsExt__A3F__A3L.A3L.prototype.onCreatedContext.userFunc0xba8eb8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const Object2D = objects[0];
const Object3D = Object2D.get3DRendererObject();
const Behavior = Object2D.getBehavior("A3L");
const Renderer = runtimeScene.getGame().getRenderer().getThreeRenderer();//runtimeScene.getRenderer()._threeRenderer;
const Scene = runtimeScene.getLayer(Object2D.getLayer()).getRenderer().getThreeScene();//runtimeScene.getLayer(Object2D.getLayer()).get3DRendererObject();
//
const LightType = Behavior._getType();
const Color = Behavior._getColor() || "255;255;255";
let Intensity = Behavior._getIntensity();
const Distance = Behavior._getDistance();
const Decay = 2;
const SpotAngle = Behavior._getSpotAngle() / 2;
const SpotPenumbra = Behavior._getSpotPenumbra();
const CastShadow = Behavior._getCastShadow();
const ShadowMapSize = {"128px": 128, "256px": 256, "512px": 512, "1024px": 1024, "2048px": 2048}[Behavior._getShadowMapSize()];
const ShadowRange = Behavior._getShadowRange();
const ShadowBias = Behavior._getShadowDepthBias();
const ShadowNormalBias = Behavior._getShadowNormalBias();
const LightHelper = Behavior._getLightHelper();
const ShadowHelper = Behavior._getShadowHelper();
//
const RGB = Color.split(";");
let Light;
if (LightType == "Directional Light") {
    Intensity *= gdjs._A3F.LightIntensityScale;
    Light = new THREE.DirectionalLight(`rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`, Intensity);
    const Target = new THREE.Group();
    Target.translateX(128);
    Light.add(Target);
    Light.target = Target;
    //
    Light.shadow.camera.top = ShadowRange / 2;
    Light.shadow.camera.right = ShadowRange / 2;
    Light.shadow.camera.bottom = -ShadowRange / 2;
    Light.shadow.camera.left = -ShadowRange / 2;
    Light.shadow.camera.near = 0.5;// default
    Light.shadow.camera.far = ShadowRange;
    //
    if (LightHelper) {
        const Geometry = new THREE.ConeGeometry(32, 128, 3);
        Geometry.translate(0, 64, 0);
        Geometry.rotateZ(gdjs.toRad(-90));
        const Material = new THREE.MeshBasicMaterial({color: `rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`, wireframe: true});
        const Cone = new THREE.Mesh(Geometry, Material);
        Cone.name = Object2D.name + Object2D.id + "_DirectionalLightHelper";
        Light.add(Cone);
        // const DirectionalLightHelper = new THREE.DirectionalLightHelper(Light, 128);
        // DirectionalLightHelper.name = Object2D.name + Object2D.id + "_DirectionalLightHelper";
        // Scene.add(DirectionalLightHelper);
    }
} else if (LightType == "Spot Light") {
    Intensity *= gdjs._A3F.LightIntensityCandela;
    Light = new THREE.SpotLight(`rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`, Intensity, Distance, gdjs.toRad(SpotAngle), SpotPenumbra, Decay);
    const Target = new THREE.Group();
    Target.translateX(1);
    Light.add(Target);
    Light.target = Target;
    //
    Light.shadow.camera.near = 0.5;// default
    Light.shadow.camera.far = ShadowRange;
    Light.shadow.focus = 1; // default
    //
    if (LightHelper && SpotAngle < 90) {
        const ConeHeight = Distance ? Distance : 1000;
		const ConeRadius = ConeHeight * Math.tan(gdjs.toRad(SpotAngle));
        const Geometry = new THREE.ConeGeometry(ConeRadius, ConeHeight, 8);
        Geometry.translate(0, -ConeHeight / 2, 0);
        Geometry.rotateZ(gdjs.toRad(90));
        const Material = new THREE.MeshBasicMaterial({color: `rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`, wireframe: true});
        const Cone = new THREE.Mesh(Geometry, Material);
        Cone.name = Object2D.name + Object2D.id + "_SpotLightHelper";
        Light.add(Cone);
        // const SpotLightHelper = new THREE.SpotLightHelper(Light);
        // SpotLightHelper.name = Object2D.name + Object2D.id + "_SpotLightHelper";
        // Scene.add(SpotLightHelper);
    }
} else {
    // Point
    Intensity *= gdjs._A3F.LightIntensityCandela;
    Light = new THREE.PointLight(`rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`, Intensity, Distance, Decay);
    //
    Light.shadow.camera.near = 0.5;// default
    Light.shadow.camera.far = ShadowRange;
    //
    if (LightHelper) {
        const Radius = Distance ? Distance : 1000;
        const Geometry = new THREE.IcosahedronGeometry(Radius, 2);
        const Material = new THREE.MeshBasicMaterial({color: `rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`, wireframe: true});
        const Icosahedron = new THREE.Mesh(Geometry, Material);
        Icosahedron.name = Object2D.name + Object2D.id + "_PointLightHelper";
        Light.add(Icosahedron);
        // const PointLightHelper = new THREE.PointLightHelper(Light, 16);
        // PointLightHelper.name = Object2D.name + Object2D.id + "_PointLightHelper";
        // Scene.add(PointLightHelper);
    }
}
Renderer.shadowMap.enabled = Renderer.shadowMap.enabled ? true : CastShadow;
Light.position.set(0, 0, 0);
Light.scale.x /= Object2D.getWidth();
Light.scale.y /= Object2D.getHeight();
Light.scale.z /= Object2D.getDepth();
Light.castShadow = CastShadow;
Light.shadow.mapSize.width = ShadowMapSize;
Light.shadow.mapSize.height = ShadowMapSize;
Light.shadow.bias = ShadowBias;
Light.shadow.normalBias = ShadowNormalBias;
Light.shadow.updateMatrices(Light);// 必須
Light.shadow.camera.updateProjectionMatrix();
//
Light.name = Object2D.name + Object2D.id + "_Light";
Object3D.add(Light);
//
if (ShadowHelper && CastShadow) {
    let CameraHelper;
    if (LightType == "Directional Light") {
        // const Geometry = new THREE.BoxGeometry(ShadowRange, ShadowRange, ShadowRange);
        const CylinderHeight = Light.shadow.camera.far;
        const CylinderRadius = Light.shadow.camera.top;
        const Geometry = new THREE.CylinderGeometry(CylinderRadius, CylinderRadius, CylinderHeight, 12, 1);
        Geometry.translate(0, -CylinderHeight / 2, 0);
        Geometry.rotateZ(gdjs.toRad(90));
        const Material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        CameraHelper = new THREE.Mesh(Geometry, Material);
        // CameraHelper = new THREE.CameraHelper(Light.shadow.camera);
        // Scene.add(CameraHelper);
    } else if (LightType == "Spot Light") {
        const ConeHeight = Light.shadow.camera.far;
		const ConeRadius = ConeHeight * Math.tan(gdjs.toRad(SpotAngle));
        const Geometry = new THREE.ConeGeometry(ConeRadius, ConeHeight, 4);
        Geometry.translate(0, -ConeHeight / 2, 0);
        Geometry.rotateZ(gdjs.toRad(90));
        const Material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        CameraHelper = new THREE.Mesh(Geometry, Material);
    } else {
        //Point
        const Geometry = new THREE.IcosahedronGeometry(Light.shadow.camera.far, 1);
        const Material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        CameraHelper = new THREE.Mesh(Geometry, Material);
    }
    CameraHelper.name = Object2D.name + Object2D.id + "_ShadowHelper";
    Light.add(CameraHelper);
}
};
gdjs.evtsExt__A3F__A3L.A3L.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{gdjs.evtsExt__A3F__Initialize.func(runtimeScene, eventsFunctionContext);
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__A3L.A3L.prototype.onCreatedContext.GDObjectObjects1);

const objects = gdjs.evtsExt__A3F__A3L.A3L.prototype.onCreatedContext.GDObjectObjects1;
gdjs.evtsExt__A3F__A3L.A3L.prototype.onCreatedContext.userFunc0xba8eb8(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__A3F__A3L.A3L.prototype.onCreated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Capability3d": this._getCapability3d()
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__A3F__A3L.A3L.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__A3L.A3L.prototype.onCreatedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__A3F__A3L.A3L.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__A3L.A3L.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__A3L.A3L.prototype.onCreatedContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__A3F__A3L.A3L.prototype.onDestroyContext = {};
gdjs.evtsExt__A3F__A3L.A3L.prototype.onDestroyContext.GDObjectObjects1= [];


gdjs.evtsExt__A3F__A3L.A3L.prototype.onDestroyContext.userFunc0xbad6a0 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const Object2D = objects[0];
const Object3D = Object2D.get3DRendererObject();
Object3D.traverse((Child) => {
    // Light
    if (Child.isLight) {
        if (Child.castShadow) {
            Child.shadow.dispose();
        }
        Child.dispose();
    }
});
};
gdjs.evtsExt__A3F__A3L.A3L.prototype.onDestroyContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__A3L.A3L.prototype.onDestroyContext.GDObjectObjects1);

const objects = gdjs.evtsExt__A3F__A3L.A3L.prototype.onDestroyContext.GDObjectObjects1;
gdjs.evtsExt__A3F__A3L.A3L.prototype.onDestroyContext.userFunc0xbad6a0(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__A3F__A3L.A3L.prototype.onDestroy = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Capability3d": this._getCapability3d()
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__A3F__A3L.A3L.prototype.onDestroyContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__A3F__A3L.A3L.prototype.onDestroyContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__A3L.A3L.prototype.onDestroyContext.GDObjectObjects1.length = 0;


return;
}
gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeColorContext = {};
gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeColorContext.GDObjectObjects1= [];


gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeColorContext.userFunc0xbad7a8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const Object2D = objects[0];
const Object3D = Object2D.get3DRendererObject();
const LightName = Object2D.name + Object2D.id + "_Light";
const Color = eventsFunctionContext.getArgument("ToColor") || "255;255;255";
const Duration = eventsFunctionContext.getArgument("Duration") || 0;
const ColorSpace = eventsFunctionContext.getArgument("ColorSpace") || "RGB";
//
const Obj = Object3D.getObjectByName(LightName);
if (!Obj) {
    return;
}
const RGB = gdjs.rgbOrHexToRGBColor(Color);// Color.split(";");
if (Duration === 0) {
    Obj.color.set(`rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`);
} else {
    const FromRGB = Obj.color.clone().convertLinearToSRGB().multiplyScalar(255);
    let FromColor;
    let ToColor;
    let SetValueFunction;
    if (ColorSpace == "RGB") {
        FromColor = [Math.round(FromRGB.r), Math.round(FromRGB.g), Math.round(FromRGB.b)];
        ToColor = [RGB[0], RGB[1], RGB[2]];
        SetValueFunction = ([R, G, B]) => {
            Obj.color.set(`rgb(${Math.floor(R)}, ${Math.floor(G)}, ${Math.floor(B)})`);
        };
    } else {
        FromColor = gdjs.evtTools.tween.rgbToHsl(Math.round(FromRGB.r), Math.round(FromRGB.g), Math.round(FromRGB.b));
        ToColor = gdjs.evtTools.tween.rgbToHsl(RGB[0], RGB[1], RGB[2]);
        SetValueFunction = ([Hue, Saturation, Lightness]) => {
            Obj.color.set(`hsl(${Hue}, ${Saturation}%, ${Lightness}%)`);
        };
    }
    gdjs.evtTools.tween.getTweensMap(runtimeScene).addMultiTween(
        `_${LightName}Color`,
        runtimeScene,
        Duration,
        "linear",
        gdjs.evtTools.common.lerp,
        FromColor,
        ToColor,
        SetValueFunction,
        null
    );
}


};
gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeColorContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeColorContext.GDObjectObjects1);

const objects = gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeColorContext.GDObjectObjects1;
gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeColorContext.userFunc0xbad7a8(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeColor = function(ToColor, Duration, ColorSpace, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Capability3d": this._getCapability3d()
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
if (argName === "ToColor") return ToColor;
if (argName === "Duration") return Duration;
if (argName === "ColorSpace") return ColorSpace;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeColorContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeColorContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeColorContext.GDObjectObjects1.length = 0;


return;
}
gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeIntensityContext = {};
gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeIntensityContext.GDObjectObjects1= [];


gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeIntensityContext.userFunc0xbad760 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const Object2D = objects[0];
const Object3D = Object2D.get3DRendererObject();
const LightName = Object2D.name + Object2D.id + "_Light";
let Intensity = eventsFunctionContext.getArgument("ToIntensity");
const Duration = eventsFunctionContext.getArgument("Duration") || 0;
//
const Obj = Object3D.getObjectByName(LightName);
if (!Obj) {
    return;
}
if (Obj.isDirectionalLight) {
    Intensity *= gdjs._A3F.LightIntensityScale;// Three.js r160
} else if (Obj.isSpotLight) {
    Intensity *= gdjs._A3F.LightIntensityCandela;// Three.js r160
} else if (Obj.isPointLight) {
    Intensity *= gdjs._A3F.LightIntensityCandela;// Three.js r160
} else {
    return;
}
if (Duration === 0) {
    Obj.intensity = Intensity;
} else {
    gdjs.evtTools.tween.getTweensMap(runtimeScene).addSimpleTween(
        `_${LightName}Intensity`,
        runtimeScene,
        Duration,
        "linear",
        gdjs.evtTools.common.lerp,
        Obj.intensity,
        Intensity,
        (V) => Obj.intensity = V,
        null
    );
}


};
gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeIntensityContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeIntensityContext.GDObjectObjects1);

const objects = gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeIntensityContext.GDObjectObjects1;
gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeIntensityContext.userFunc0xbad760(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeIntensity = function(ToIntensity, Duration, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Capability3d": this._getCapability3d()
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
if (argName === "ToIntensity") return ToIntensity;
if (argName === "Duration") return Duration;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeIntensityContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeIntensityContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__A3L.A3L.prototype.ChangeIntensityContext.GDObjectObjects1.length = 0;


return;
}

gdjs.evtsExt__A3F__A3L.A3L.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
};


gdjs.registerBehavior("A3F::A3L", gdjs.evtsExt__A3F__A3L.A3L);
