
gdjs.evtsExt__Text3D__Text3D = gdjs.evtsExt__Text3D__Text3D || {};

/**
 * Object generated from 3D text
 */
gdjs.evtsExt__Text3D__Text3D.Text3D = class Text3D extends gdjs.CustomRuntimeObject3D {
  constructor(parentInstanceContainer, objectData) {
    super(parentInstanceContainer, objectData);
    this._parentInstanceContainer = parentInstanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._objectData = {};
    
    this._objectData.TextVerticalAnchorOrigin = "Top";
    this._objectData.TextVerticalAnchorTarget = "Top";
    this._objectData.LineSpacing = objectData.content.LineSpacing !== undefined ? objectData.content.LineSpacing : Number("0") || 0;
    this._objectData.IsGeometryUpToDate = false;
    

    // It calls the onCreated super implementation at the end.
    this.onCreated();
  }

  // Hot-reload:
  updateFromObjectData(oldObjectData, newObjectData) {
    super.updateFromObjectData(oldObjectData, newObjectData);
    if (oldObjectData.content.TextVerticalAnchorOrigin !== newObjectData.content.TextVerticalAnchorOrigin)
      this._objectData.TextVerticalAnchorOrigin = newObjectData.content.TextVerticalAnchorOrigin;
    if (oldObjectData.content.TextVerticalAnchorTarget !== newObjectData.content.TextVerticalAnchorTarget)
      this._objectData.TextVerticalAnchorTarget = newObjectData.content.TextVerticalAnchorTarget;
    if (oldObjectData.content.LineSpacing !== newObjectData.content.LineSpacing)
      this._objectData.LineSpacing = newObjectData.content.LineSpacing;
    if (oldObjectData.content.IsGeometryUpToDate !== newObjectData.content.IsGeometryUpToDate)
      this._objectData.IsGeometryUpToDate = newObjectData.content.IsGeometryUpToDate;

    this.onHotReloading(this._parentInstanceContainer);
    return true;
  }

  // Properties:
  
  _getTextVerticalAnchorOrigin() {
    return this._objectData.TextVerticalAnchorOrigin !== undefined ? this._objectData.TextVerticalAnchorOrigin : "Top";
  }
  _setTextVerticalAnchorOrigin(newValue) {
    this._objectData.TextVerticalAnchorOrigin = newValue;
  }
  _getTextVerticalAnchorTarget() {
    return this._objectData.TextVerticalAnchorTarget !== undefined ? this._objectData.TextVerticalAnchorTarget : "Top";
  }
  _setTextVerticalAnchorTarget(newValue) {
    this._objectData.TextVerticalAnchorTarget = newValue;
  }
  _getLineSpacing() {
    return this._objectData.LineSpacing !== undefined ? this._objectData.LineSpacing : Number("0") || 0;
  }
  _setLineSpacing(newValue) {
    this._objectData.LineSpacing = newValue;
  }
  _getIsGeometryUpToDate() {
    return this._objectData.IsGeometryUpToDate !== undefined ? this._objectData.IsGeometryUpToDate : false;
  }
  _setIsGeometryUpToDate(newValue) {
    this._objectData.IsGeometryUpToDate = newValue;
  }
  _toggleIsGeometryUpToDate() {
    this._setIsGeometryUpToDate(!this._getIsGeometryUpToDate());
  }

  

  
  // gdjs.TextContainer interface implementation
  _text = '';
  getText() {
    return this._text;
  }
  setText(text) {
    this._text = text;
  }

}

// Methods:
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546onCreatedContext_9546GDTextObjects1Objects = Hashtable.newFrom({"Text": gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDTextObjects1});
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{



}


{



}


};gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.userFunc0xcca378 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const { Text, Text3DRenderer } = gdjs.__text3DExtension;

/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
/** @type {gdjs.TextRuntimeObject} */
const textObject = eventsFunctionContext.getObjects("Text")[0];

// Here runtimeScene is the gdjs.CustomRuntimeObjectInstanceContainer inside the custom object.
const gameScene = object.getRuntimeScene();

const superExtraInitializationFromInitialInstance = object.extraInitializationFromInitialInstance.bind(object);
object.extraInitializationFromInitialInstance = initialInstanceData => {
    superExtraInitializationFromInitialInstance(initialInstanceData);
    if (initialInstanceData.customSize) {
        textObject.setWrappingWidth(initialInstanceData.width);
        textObject.setWrapping(true);
        object.__text3DExtension.threeText.maxWidth = initialInstanceData.width;
    }
};

// This is a hack that may break in future releases.
const layer = gameScene.getLayer(object.getLayer());
layer.getRenderer().remove3DRendererObject(object._renderer._threeGroup);
const text3DRenderer = new Text3DRenderer(object, object._instanceContainer, object.getInstanceContainer());
object._renderer = text3DRenderer;
layer.getRenderer().add3DRendererObject(text3DRenderer._threeGroup);

const threeText = new Text()
object.__text3DExtension = { threeText };
text3DRenderer._threeGroup.add(threeText);
threeText.scale.y = -1;

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDTextObjects1.length = 0;

{gdjs.evtsExt__Text3D__DefineHelperClasses.func(runtimeScene, eventsFunctionContext);
}
{gdjs.evtTools.object.createObjectOnScene(eventsFunctionContext, gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546onCreatedContext_9546GDTextObjects1Objects, 0, 0, "");
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDTextObjects1[i].hide();
}
}

{ //Subevents
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.userFunc0xcca378(runtimeScene, objects, eventsFunctionContext);

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDObjectObjects1[i].UpdateFromProperties(eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onCreatedContext.GDTextObjects2.length = 0;

gdjs.CustomRuntimeObject.prototype.onCreated.call(this);

return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.userFunc0xcc8c28 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];

// Ensure it stays true at least a whole frame for events.
object.__text3DExtension.hasGeometryUpdated = false;

if (object.__text3DExtension.hasSync) {
    object.__text3DExtension.hasSync = false;
    object.__text3DExtension.hasGeometryUpdated = true;
    object._renderer._isContainerDirty = true;
}

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects1[i].UpdateText((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Text")).getText()), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects1[i].UpdateGeometry(eventsFunctionContext);
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.userFunc0xcc8c28(runtimeScene, objects, eventsFunctionContext);

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects1[i].setRotationCenter3D((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects1[i].TextWidth(eventsFunctionContext)) / 2, (gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects1[i].TextHeight(eventsFunctionContext)) / 2, 0);
}
}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEvents = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPostEventsContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.userFunc0xcc8c28 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
const value = eventsFunctionContext.getArgument("Value");

object.__text3DExtension.threeText.text = value;
object._renderer._isContainerDirty = true;

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

/* Reuse gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDObjectObjects1 */

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.userFunc0xcc8c28(runtimeScene, objects, eventsFunctionContext);

}


};gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDObjectObjects1[i].IsTextUpToDate(eventsFunctionContext.getArgument("Value"), eventsFunctionContext)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.getObjects("Object")[0]._setIsGeometryUpToDate(false)
}

{ //Subevents
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateText = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateTextContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsTextUpToDateContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsTextUpToDateContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsTextUpToDateContext.GDTextObjects1= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsTextUpToDateContext.userFunc0xcc8c28 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
const value = eventsFunctionContext.getArgument("Value");

eventsFunctionContext.returnValue = object.__text3DExtension.threeText.text === value;

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsTextUpToDateContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsTextUpToDateContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsTextUpToDateContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsTextUpToDateContext.userFunc0xcc8c28(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsTextUpToDate = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsTextUpToDateContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsTextUpToDateContext.GDTextObjects1.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsTextUpToDateContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsTextUpToDateContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsTextUpToDateContext.GDTextObjects1.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.userFunc0xcc8c28 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];

object.__text3DExtension.threeText.sync(() => {
    object.__text3DExtension.hasSync = true;
});
};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.userFunc0xcc8c28(runtimeScene, objects, eventsFunctionContext);

}


};gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !eventsFunctionContext.getObjects("Object")[0]._getIsGeometryUpToDate();
}
if (isConditionTrue_0) {
{eventsFunctionContext.getObjects("Object")[0]._setIsGeometryUpToDate(true)
}

{ //Subevents
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometry = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateGeometryContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.HasGeometryUpdatedContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.HasGeometryUpdatedContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.HasGeometryUpdatedContext.GDTextObjects1= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.HasGeometryUpdatedContext.userFunc0xcc8c28 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];

eventsFunctionContext.returnValue =
    object.__text3DExtension.hasGeometryUpdated;

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.HasGeometryUpdatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.HasGeometryUpdatedContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.HasGeometryUpdatedContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.HasGeometryUpdatedContext.userFunc0xcc8c28(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.HasGeometryUpdated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.HasGeometryUpdatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.HasGeometryUpdatedContext.GDTextObjects1.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.HasGeometryUpdatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.HasGeometryUpdatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.HasGeometryUpdatedContext.GDTextObjects1.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.GDObjectObjects1[i].UpdateFromProperties(eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloading = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.onHotReloadingContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Text")).setText((( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDTextObjects1.length === 0 ) ? "" :gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDTextObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Text")).getText()));
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetFontSize((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].FontSize(eventsFunctionContext)), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetFont((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].Font(eventsFunctionContext)), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetColor((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].Color(eventsFunctionContext)), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetWrappingWidth((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].WrappingWidth(eventsFunctionContext)), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetTextAlignment((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].TextAlignment(eventsFunctionContext)), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetShadowColor((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].ShadowColor(eventsFunctionContext)), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetShadowAngle((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].ShadowAngle(eventsFunctionContext)), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetShadowDistance((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].ShadowDistance(eventsFunctionContext)), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetShadowBlurRadius((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].ShadowBlurRadius(eventsFunctionContext)), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetShadowOpacity((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].ShadowOpacity(eventsFunctionContext)), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetOutlineThickness((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].OutlineThickness(eventsFunctionContext)), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetOutlineColor((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].OutlineColor(eventsFunctionContext)), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetLineSpacing((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].LineSpacing(eventsFunctionContext)), eventsFunctionContext);
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].IsShadowEnabled(eventsFunctionContext)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetShadowEnabled(false, eventsFunctionContext);
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].IsOutlineEnabled(eventsFunctionContext)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetOutlineEnabled(false, eventsFunctionContext);
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].IsShadowEnabled(eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetShadowEnabled(true, eventsFunctionContext);
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].IsOutlineEnabled(eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetOutlineEnabled(true, eventsFunctionContext);
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].IsWrapping(eventsFunctionContext)) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetWrapping(false, eventsFunctionContext);
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].IsWrapping(eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1[i].SetWrapping(true, eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromProperties = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateFromPropertiesContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextWidthContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextWidthContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextWidthContext.GDTextObjects1= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextWidthContext.userFunc0xcc8c28 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];

const boundingBox = object.__text3DExtension.threeText.geometry.boundingBox;
eventsFunctionContext.returnValue = boundingBox.max.x - boundingBox.min.x;

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextWidthContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextWidthContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextWidthContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextWidthContext.userFunc0xcc8c28(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextWidth = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextWidthContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextWidthContext.GDTextObjects1.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextWidthContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextWidthContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextWidthContext.GDTextObjects1.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextHeightContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextHeightContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextHeightContext.GDTextObjects1= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextHeightContext.userFunc0xcc8c28 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];

const boundingBox = object.__text3DExtension.threeText.geometry.boundingBox;
eventsFunctionContext.returnValue = boundingBox.max.y - boundingBox.min.y;

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextHeightContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextHeightContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextHeightContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextHeightContext.userFunc0xcc8c28(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextHeight = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextHeightContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextHeightContext.GDTextObjects1.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextHeightContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextHeightContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextHeightContext.GDTextObjects1.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.GDTextObjects1);
{eventsFunctionContext.returnValue = (( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.GDTextObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.GDTextObjects1[0].getCharacterSize());}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSize = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontSizeContext.GDTextObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.userFunc0xcc8c28 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
const value = eventsFunctionContext.getArgument("Value");

object.__text3DExtension.threeText.fontSize = value;

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDObjectObjects1[i].FontSize(eventsFunctionContext) == eventsFunctionContext.getArgument("Value")) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDTextObjects1[i].setCharacterSize(eventsFunctionContext.getArgument("Value"));
}
}
{eventsFunctionContext.getObjects("Object")[0]._setIsGeometryUpToDate(false)
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.userFunc0xcc8c28(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSize = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontSizeContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDTextObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDTextObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDTextObjects1[i].isWrapping() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDTextObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDTextObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDTextObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = true;}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrapping = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsWrappingContext.GDTextObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !eventsFunctionContext.getArgument("Value");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDObjectObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDTextObjects1[i].setWrapping(false);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDObjectObjects1[i].UpdateWrappingWidth(0, eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getArgument("Value");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDObjectObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDTextObjects1[i].setWrapping(true);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDObjectObjects1[i].UpdateWrappingWidth((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDObjectObjects1[i].WrappingWidth(eventsFunctionContext)), eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrapping = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546WrappingWidthContext_9546GDTextObjects1Objects = Hashtable.newFrom({"Text": gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.GDTextObjects1});
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.GDTextObjects1);
{eventsFunctionContext.returnValue = gdjs.evtsExt__Text3D__WrappingWidth.func(runtimeScene, gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546WrappingWidthContext_9546GDTextObjects1Objects, eventsFunctionContext);}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidth = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.WrappingWidthContext.GDTextObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1[i].WrappingWidth(eventsFunctionContext) == eventsFunctionContext.getArgument("Value")) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDTextObjects1[i].setWrappingWidth(eventsFunctionContext.getArgument("Value"));
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1[i].IsWrapping(eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1[i].UpdateWrappingWidth((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1[i].WrappingWidth(eventsFunctionContext)), eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidth = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetWrappingWidthContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.userFunc0xcd1148 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
const value = eventsFunctionContext.getArgument("Value");

object.__text3DExtension.threeText.maxWidth = value || Number.POSITIVE_INFINITY;

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDObjectObjects1[i].WrappingWidth(eventsFunctionContext) == eventsFunctionContext.getArgument("Value")) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.getObjects("Object")[0]._setIsGeometryUpToDate(false)
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.userFunc0xcd1148(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidth = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateWrappingWidthContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546ColorContext_9546GDTextObjects1Objects = Hashtable.newFrom({"Text": gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.GDTextObjects1});
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.GDTextObjects1);
{eventsFunctionContext.returnValue = gdjs.evtsExt__Text3D__TextColor.func(runtimeScene, gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546ColorContext_9546GDTextObjects1Objects, eventsFunctionContext);}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.Color = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ColorContext.GDTextObjects2.length = 0;


return "" + eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.userFunc0xcd28c8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
const value = eventsFunctionContext.getArgument("Value");

object.__text3DExtension.threeText.color = gdjs.rgbOrHexStringToNumber(value);

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDTextObjects1[i].setColor(eventsFunctionContext.getArgument("Value"));
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.userFunc0xcd28c8(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColor = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetColorContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546FontContext_9546GDTextObjects1Objects = Hashtable.newFrom({"Text": gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.GDTextObjects1});
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.GDTextObjects1);
{eventsFunctionContext.returnValue = gdjs.evtsExt__Text3D__Font.func(runtimeScene, gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546FontContext_9546GDTextObjects1Objects, eventsFunctionContext);}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.Font = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.FontContext.GDTextObjects2.length = 0;


return "" + eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546SetFontContext_9546GDTextObjects1Objects = Hashtable.newFrom({"Text": gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDTextObjects1});
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.userFunc0xcd4920 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
const value = eventsFunctionContext.getArgument("Value");

object.__text3DExtension.threeText.font =
    runtimeScene.getGame().getFontManager().getFontFile(value);

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDObjectObjects1[i].Font(eventsFunctionContext) == eventsFunctionContext.getArgument("Value")) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDTextObjects1);
{gdjs.evtsExt__Text3D__SetFont.func(runtimeScene, gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546SetFontContext_9546GDTextObjects1Objects, eventsFunctionContext.getArgument("Value"), eventsFunctionContext);
}
{eventsFunctionContext.getObjects("Object")[0]._setIsGeometryUpToDate(false)
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.userFunc0xcd4920(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFont = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetFontContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.LineSpacingContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.LineSpacingContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.LineSpacingContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.LineSpacingContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.LineSpacingContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.LineSpacingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.returnValue = eventsFunctionContext.getObjects("Object")[0]._getLineSpacing();}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.LineSpacing = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.LineSpacingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.LineSpacingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.LineSpacingContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.LineSpacingContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.LineSpacingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.LineSpacingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.LineSpacingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.LineSpacingContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.LineSpacingContext.GDTextObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.userFunc0xd125b0 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
const value = eventsFunctionContext.getArgument("Value");

object.__text3DExtension.threeText.lineHeight = value || 'normal';

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDObjectObjects1[i].LineSpacing(eventsFunctionContext) == eventsFunctionContext.getArgument("Value")) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.getObjects("Object")[0]._setLineSpacing(eventsFunctionContext.getArgument("Value"))
}
{eventsFunctionContext.getObjects("Object")[0]._setIsGeometryUpToDate(false)
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.userFunc0xd125b0(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacing = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetLineSpacingContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDTextObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDTextObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDTextObjects1[i].isOutlineEnabled() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDTextObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDTextObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDTextObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = true;}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabled = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsOutlineEnabledContext.GDTextObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !eventsFunctionContext.getArgument("Value");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDObjectObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDTextObjects1[i].setOutlineEnabled(false);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDObjectObjects1[i].UpdateOutlineThickness(0, eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getArgument("Value");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDObjectObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDTextObjects1[i].setOutlineEnabled(true);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDObjectObjects1[i].UpdateOutlineThickness((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDObjectObjects1[i].OutlineThickness(eventsFunctionContext)), eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabled = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineEnabledContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546OutlineThicknessContext_9546GDTextObjects1Objects = Hashtable.newFrom({"Text": gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.GDTextObjects1});
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.GDTextObjects1);
{eventsFunctionContext.returnValue = gdjs.evtsExt__Text3D__OutlineThickness.func(runtimeScene, gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546OutlineThicknessContext_9546GDTextObjects1Objects, eventsFunctionContext);}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThickness = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineThicknessContext.GDTextObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDTextObjects1[i].setOutlineThickness(eventsFunctionContext.getArgument("Value"));
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDObjectObjects1[i].IsOutlineEnabled(eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDObjectObjects1[i].UpdateOutlineThickness(eventsFunctionContext.getArgument("Value"), eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThickness = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineThicknessContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.userFunc0xd14d58 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
const value = eventsFunctionContext.getArgument("Value");

object.__text3DExtension.threeText.outlineWidth = value / 2;

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDObjectObjects1[i].OutlineThickness(eventsFunctionContext) == eventsFunctionContext.getArgument("Value")) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.getObjects("Object")[0]._setIsGeometryUpToDate(false)
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.userFunc0xd14d58(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThickness = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateOutlineThicknessContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546OutlineColorContext_9546GDTextObjects1Objects = Hashtable.newFrom({"Text": gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.GDTextObjects1});
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.GDTextObjects1);
{eventsFunctionContext.returnValue = gdjs.evtsExt__Text3D__OutlineColor.func(runtimeScene, gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546OutlineColorContext_9546GDTextObjects1Objects, eventsFunctionContext);}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColor = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.OutlineColorContext.GDTextObjects2.length = 0;


return "" + eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.userFunc0xd16810 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
const value = eventsFunctionContext.getArgument("Value");

object.__text3DExtension.threeText.outlineColor = gdjs.rgbOrHexStringToNumber(value);

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

/* Reuse gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDObjectObjects1 */

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.userFunc0xd16810(runtimeScene, objects, eventsFunctionContext);

}


};gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDTextObjects1[i].setOutlineColor(eventsFunctionContext.getArgument("Value"));
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDObjectObjects1[i].IsOutlineEnabled(eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColor = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetOutlineColorContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDTextObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDTextObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDTextObjects1[i].isShadowEnabled() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDTextObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDTextObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDTextObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = true;}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabled = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsShadowEnabledContext.GDTextObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !eventsFunctionContext.getArgument("Value");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1[i].UpdateShadowOffset(0, 0, eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1[i].UpdateShadowBlurRadius(0, eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1[i].UpdateShadowOpacity(255, eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDTextObjects1[i].showShadow(false);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getArgument("Value");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1[i].UpdateShadowOffset((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1[i].ShadowAngle(eventsFunctionContext)), (gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1[i].ShadowDistance(eventsFunctionContext)), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1[i].UpdateShadowBlurRadius((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1[i].ShadowBlurRadius(eventsFunctionContext)), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1[i].UpdateShadowOpacity((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1[i].ShadowOpacity(eventsFunctionContext)), eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDTextObjects1[i].showShadow(true);
}
}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabled = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowEnabledContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546ShadowColorContext_9546GDTextObjects1Objects = Hashtable.newFrom({"Text": gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.GDTextObjects1});
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.GDTextObjects1);
{eventsFunctionContext.returnValue = gdjs.evtsExt__Text3D__ShadowColor.func(runtimeScene, gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546ShadowColorContext_9546GDTextObjects1Objects, eventsFunctionContext);}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColor = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowColorContext.GDTextObjects2.length = 0;


return "" + eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.userFunc0xd18948 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
const value = eventsFunctionContext.getArgument("Value");

object.__text3DExtension.threeText.outlineColor = gdjs.rgbOrHexStringToNumber(value);

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

/* Reuse gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDObjectObjects1 */

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.userFunc0xd18948(runtimeScene, objects, eventsFunctionContext);

}


};gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDTextObjects1[i].setShadowColor(eventsFunctionContext.getArgument("Value"));
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDObjectObjects1[i].IsShadowEnabled(eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColor = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowColorContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546ShadowDistanceContext_9546GDTextObjects1Objects = Hashtable.newFrom({"Text": gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.GDTextObjects1});
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.GDTextObjects1);
{eventsFunctionContext.returnValue = gdjs.evtsExt__Text3D__ShadowDistance.func(runtimeScene, gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546ShadowDistanceContext_9546GDTextObjects1Objects, eventsFunctionContext);}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistance = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowDistanceContext.GDTextObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDObjectObjects1[i].IsShadowEnabled(eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDObjectObjects1[i].UpdateShadowOffset((gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDObjectObjects1[i].ShadowAngle(eventsFunctionContext)), eventsFunctionContext.getArgument("Value"), eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDTextObjects1[i].setShadowDistance(eventsFunctionContext.getArgument("Value"));
}
}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistance = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowDistanceContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546ShadowAngleContext_9546GDTextObjects1Objects = Hashtable.newFrom({"Text": gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.GDTextObjects1});
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.GDTextObjects1);
{eventsFunctionContext.returnValue = gdjs.evtsExt__Text3D__ShadowAngle.func(runtimeScene, gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546ShadowAngleContext_9546GDTextObjects1Objects, eventsFunctionContext);}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngle = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowAngleContext.GDTextObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDObjectObjects1[i].IsShadowEnabled(eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDObjectObjects1[i].UpdateShadowOffset(eventsFunctionContext.getArgument("Value"), (gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDObjectObjects1[i].ShadowDistance(eventsFunctionContext)), eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDTextObjects1[i].setShadowAngle(eventsFunctionContext.getArgument("Value"));
}
}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngle = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowAngleContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects1_1final = [];

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.userFunc0xd1d318 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
const angle = eventsFunctionContext.getArgument("Angle");
const distance = eventsFunctionContext.getArgument("Distance");

object.__text3DExtension.threeText.outlineOffsetX = distance * Math.cos(gdjs.toRad(angle));
object.__text3DExtension.threeText.outlineOffsetY = distance * Math.sin(gdjs.toRad(angle));
};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects1.length = 0;


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects1_1final.length = 0;
let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2);
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2[i].ShadowAngle(eventsFunctionContext) == eventsFunctionContext.getArgument("Angle")) ) {
        isConditionTrue_1 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2.length = k;
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
    for (let j = 0, jLen = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2.length; j < jLen ; ++j) {
        if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects1_1final.indexOf(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2[j]) === -1 )
            gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects1_1final.push(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2[j]);
    }
}
}
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2);
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2[i].ShadowDistance(eventsFunctionContext) == eventsFunctionContext.getArgument("Distance")) ) {
        isConditionTrue_1 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2.length = k;
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
    for (let j = 0, jLen = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2.length; j < jLen ; ++j) {
        if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects1_1final.indexOf(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2[j]) === -1 )
            gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects1_1final.push(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2[j]);
    }
}
}
{
gdjs.copyArray(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects1_1final, gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects1);
}
}
if (isConditionTrue_0) {
{eventsFunctionContext.getObjects("Object")[0]._setIsGeometryUpToDate(false)
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.userFunc0xd1d318(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffset = function(Angle, Distance, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Angle") return Angle;
if (argName === "Distance") return Distance;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOffsetContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546ShadowBlurRadiusContext_9546GDTextObjects1Objects = Hashtable.newFrom({"Text": gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.GDTextObjects1});
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.GDTextObjects1);
{eventsFunctionContext.returnValue = gdjs.evtsExt__Text3D__ShadowBlurRadius.func(runtimeScene, gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546ShadowBlurRadiusContext_9546GDTextObjects1Objects, eventsFunctionContext);}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadius = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowBlurRadiusContext.GDTextObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDObjectObjects1[i].IsShadowEnabled(eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDObjectObjects1[i].UpdateShadowBlurRadius(eventsFunctionContext.getArgument("Value"), eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDTextObjects1[i].setShadowBlurRadius(eventsFunctionContext.getArgument("Value"));
}
}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadius = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowBlurRadiusContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.userFunc0xd1f338 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
const value = eventsFunctionContext.getArgument("Value");

object.__text3DExtension.threeText.outlineBlur = value;
object.__text3DExtension.threeText.outlineWidth = -value / 2;

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDObjectObjects1[i].ShadowBlurRadius(eventsFunctionContext) == eventsFunctionContext.getArgument("Value")) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.getObjects("Object")[0]._setIsGeometryUpToDate(false)
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.userFunc0xd1f338(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadius = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowBlurRadiusContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546ShadowOpacityContext_9546GDTextObjects1Objects = Hashtable.newFrom({"Text": gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.GDTextObjects1});
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.GDTextObjects1);
{eventsFunctionContext.returnValue = gdjs.evtsExt__Text3D__ShadowOpacity.func(runtimeScene, gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.mapOfGDgdjs_9546evtsExt_9595_9595Text3D_9595_9595Text3D_9546Text3D_9546prototype_9546ShadowOpacityContext_9546GDTextObjects1Objects, eventsFunctionContext);}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacity = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.ShadowOpacityContext.GDTextObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDObjectObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDObjectObjects1[i].IsShadowEnabled(eventsFunctionContext) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDObjectObjects1 */
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDObjectObjects1[i].UpdateShadowOpacity(eventsFunctionContext.getArgument("Value"), eventsFunctionContext);
}
}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDTextObjects1[i].setShadowOpacity(eventsFunctionContext.getArgument("Value"));
}
}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacity = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetShadowOpacityContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.userFunc0xd99030 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
const value = eventsFunctionContext.getArgument("Value");

object.__text3DExtension.threeText.outlineOpacity = value / 255;

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDObjectObjects1[i].ShadowOpacity(eventsFunctionContext) == eventsFunctionContext.getArgument("Value")) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.getObjects("Object")[0]._setIsGeometryUpToDate(false)
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.userFunc0xd99030(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacity = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.UpdateShadowOpacityContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDTextObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDTextObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDTextObjects1[i].isBold() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDTextObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDTextObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDTextObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = true;}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBold = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsBoldContext.GDTextObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.userFunc0xd98fb0 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
const value = eventsFunctionContext.getArgument("Value");

object.__text3DExtension.threeText.fontWeight = value ? "bold" : "normal";

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !eventsFunctionContext.getArgument("Value");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDTextObjects1[i].setBold(false);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getArgument("Value");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDTextObjects1[i].setBold(true);
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.userFunc0xd98fb0(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBold = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetBoldContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDTextObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDTextObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDTextObjects1[i].isItalic() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDTextObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDTextObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDTextObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = true;}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalic = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.IsItalicContext.GDTextObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.userFunc0xd98fb0 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
const value = eventsFunctionContext.getArgument("Value");

object.__text3DExtension.threeText.fontStyle = value ? "italic" : "normal";

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !eventsFunctionContext.getArgument("Value");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDTextObjects1[i].setItalic(false);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getArgument("Value");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDTextObjects1[i].setItalic(true);
}
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.userFunc0xd98fb0(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalic = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetItalicContext.GDTextObjects2.length = 0;


return;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1[i].getTextAlignment() == "left" ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = "left";}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1[i].getTextAlignment() == "center" ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = "center";}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1.length;i<l;++i) {
    if ( gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1[i].getTextAlignment() == "right" ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1.length = k;
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = "right";}
}

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignment = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.TextAlignmentContext.GDTextObjects2.length = 0;


return "" + eventsFunctionContext.returnValue;
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext = {};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDObjectObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDObjectObjects2= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDTextObjects1= [];
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDTextObjects2= [];


gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.userFunc0xd99538 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.CustomRuntimeObject3D} */
const object = objects[0];
const value = eventsFunctionContext.getArgument("Value");

object.__text3DExtension.threeText.textAlign = value;

};
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDObjectObjects1[i].TextAlignment(eventsFunctionContext) == eventsFunctionContext.getArgument("Value")) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDObjectObjects1[k] = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDObjectObjects1[i];
        ++k;
    }
}
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Text"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDTextObjects1);
{for(var i = 0, len = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDTextObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDTextObjects1[i].setTextAlignment(eventsFunctionContext.getArgument("Value"));
}
}
{eventsFunctionContext.getObjects("Object")[0]._setIsGeometryUpToDate(false)
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDObjectObjects1;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.userFunc0xd99538(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignment = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDTextObjectsList = [...runtimeScene.getObjects("Text")];
var GDTextObjects = Hashtable.newFrom({"Text": thisGDTextObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Text": GDTextObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "Text": thisGDTextObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDTextObjects2.length = 0;

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDTextObjects1.length = 0;
gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.SetTextAlignmentContext.GDTextObjects2.length = 0;


return;
}

gdjs.evtsExt__Text3D__Text3D.Text3D.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
};


gdjs.registerObject("Text3D::Text3D", gdjs.evtsExt__Text3D__Text3D.Text3D);
