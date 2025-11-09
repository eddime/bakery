
if (typeof gdjs.evtsExt__ShadowClones__DeleteShadowClones !== "undefined") {
  gdjs.evtsExt__ShadowClones__DeleteShadowClones.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__ShadowClones__DeleteShadowClones = {};
gdjs.evtsExt__ShadowClones__DeleteShadowClones.forEachIndex2 = 0;

gdjs.evtsExt__ShadowClones__DeleteShadowClones.forEachObjects2 = [];

gdjs.evtsExt__ShadowClones__DeleteShadowClones.forEachTemporary2 = null;

gdjs.evtsExt__ShadowClones__DeleteShadowClones.forEachTotalCount2 = 0;

gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects1= [];
gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects2= [];
gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDShadowClonesObjects1= [];
gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDShadowClonesObjects2= [];


gdjs.evtsExt__ShadowClones__DeleteShadowClones.mapOfGDgdjs_9546evtsExt_9595_9595ShadowClones_9595_9595DeleteShadowClones_9546GDShadowClonesObjects2Objects = Hashtable.newFrom({"ShadowClones": gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDShadowClonesObjects2});
gdjs.evtsExt__ShadowClones__DeleteShadowClones.eventsList0 = function(runtimeScene, eventsFunctionContext) {

};gdjs.evtsExt__ShadowClones__DeleteShadowClones.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("ShadowClones"), gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDShadowClonesObjects1);

for (gdjs.evtsExt__ShadowClones__DeleteShadowClones.forEachIndex2 = 0;gdjs.evtsExt__ShadowClones__DeleteShadowClones.forEachIndex2 < gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDShadowClonesObjects1.length;++gdjs.evtsExt__ShadowClones__DeleteShadowClones.forEachIndex2) {
gdjs.copyArray(eventsFunctionContext.getObjects("PrimaryObject"), gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects2);
gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDShadowClonesObjects2.length = 0;


gdjs.evtsExt__ShadowClones__DeleteShadowClones.forEachTemporary2 = gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDShadowClonesObjects1[gdjs.evtsExt__ShadowClones__DeleteShadowClones.forEachIndex2];
gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDShadowClonesObjects2.push(gdjs.evtsExt__ShadowClones__DeleteShadowClones.forEachTemporary2);
let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.linkedObjects.pickObjectsLinkedTo(runtimeScene, gdjs.evtsExt__ShadowClones__DeleteShadowClones.mapOfGDgdjs_9546evtsExt_9595_9595ShadowClones_9595_9595DeleteShadowClones_9546GDShadowClonesObjects2Objects, (gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects2.length !== 0 ? gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects2[0] : null), eventsFunctionContext);
if (isConditionTrue_0) {
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDShadowClonesObjects2.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDShadowClonesObjects2[i].deleteFromScene(runtimeScene);
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects2[i].returnVariable(gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects2[i].getVariables().get("ClonesCreated")).setNumber(0);
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects2[i].returnVariable(gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects2[i].getVariables().get("TotalShadowClones")).setNumber(0);
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects2[i].variableClearChildren(gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects2[i].getVariables().get("ObjectHistory"));
}
}
}
}

}


};

gdjs.evtsExt__ShadowClones__DeleteShadowClones.func = function(runtimeScene, PrimaryObject, ShadowClones, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"PrimaryObject": PrimaryObject
, "ShadowClones": ShadowClones
},
  _objectArraysMap: {
"PrimaryObject": gdjs.objectsListsToArray(PrimaryObject)
, "ShadowClones": gdjs.objectsListsToArray(ShadowClones)
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ShadowClones"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ShadowClones"),
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

gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects1.length = 0;
gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects2.length = 0;
gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDShadowClonesObjects1.length = 0;
gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDShadowClonesObjects2.length = 0;

gdjs.evtsExt__ShadowClones__DeleteShadowClones.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects1.length = 0;
gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDPrimaryObjectObjects2.length = 0;
gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDShadowClonesObjects1.length = 0;
gdjs.evtsExt__ShadowClones__DeleteShadowClones.GDShadowClonesObjects2.length = 0;


return;
}

gdjs.evtsExt__ShadowClones__DeleteShadowClones.registeredGdjsCallbacks = [];