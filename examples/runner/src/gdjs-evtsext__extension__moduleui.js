
gdjs.evtsExt__Extension__ModuleUI = gdjs.evtsExt__Extension__ModuleUI || {};

/**
 * Object generated from 
 */
gdjs.evtsExt__Extension__ModuleUI.ModuleUI = class ModuleUI extends gdjs.CustomRuntimeObject2D {
  constructor(parentInstanceContainer, objectData) {
    super(parentInstanceContainer, objectData);
    this._parentInstanceContainer = parentInstanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._objectData = {};
    
    this._objectData.ModuleName = "";
    this._objectData.ModuleDescription = "";
    this._objectData.ModuleCost = Number("") || 0;
    this._objectData.ModuleColor = "";
    this._objectData.ModuleSpriteColor = "";
    

    // It calls the onCreated super implementation at the end.
    this.onCreated();
  }

  // Hot-reload:
  updateFromObjectData(oldObjectData, newObjectData) {
    super.updateFromObjectData(oldObjectData, newObjectData);
    if (oldObjectData.content.ModuleName !== newObjectData.content.ModuleName)
      this._objectData.ModuleName = newObjectData.content.ModuleName;
    if (oldObjectData.content.ModuleDescription !== newObjectData.content.ModuleDescription)
      this._objectData.ModuleDescription = newObjectData.content.ModuleDescription;
    if (oldObjectData.content.ModuleCost !== newObjectData.content.ModuleCost)
      this._objectData.ModuleCost = newObjectData.content.ModuleCost;
    if (oldObjectData.content.ModuleColor !== newObjectData.content.ModuleColor)
      this._objectData.ModuleColor = newObjectData.content.ModuleColor;
    if (oldObjectData.content.ModuleSpriteColor !== newObjectData.content.ModuleSpriteColor)
      this._objectData.ModuleSpriteColor = newObjectData.content.ModuleSpriteColor;

    this.onHotReloading(this._parentInstanceContainer);
    return true;
  }

  // Properties:
  
  _getModuleName() {
    return this._objectData.ModuleName !== undefined ? this._objectData.ModuleName : "";
  }
  _setModuleName(newValue) {
    this._objectData.ModuleName = newValue;
  }
  _getModuleDescription() {
    return this._objectData.ModuleDescription !== undefined ? this._objectData.ModuleDescription : "";
  }
  _setModuleDescription(newValue) {
    this._objectData.ModuleDescription = newValue;
  }
  _getModuleCost() {
    return this._objectData.ModuleCost !== undefined ? this._objectData.ModuleCost : Number("") || 0;
  }
  _setModuleCost(newValue) {
    this._objectData.ModuleCost = newValue;
  }
  _getModuleColor() {
    return this._objectData.ModuleColor !== undefined ? this._objectData.ModuleColor : "";
  }
  _setModuleColor(newValue) {
    this._objectData.ModuleColor = newValue;
  }
  _getModuleSpriteColor() {
    return this._objectData.ModuleSpriteColor !== undefined ? this._objectData.ModuleSpriteColor : "";
  }
  _setModuleSpriteColor(newValue) {
    this._objectData.ModuleSpriteColor = newValue;
  }

  

  
}

// Methods:
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext = {};
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDObjectObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDObjectObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDObjectObjects4= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDObjectObjects5= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects4= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects5= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects4= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects5= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects4= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects5= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects4= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects5= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects4= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects5= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects4= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects5= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects4= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects5= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticleObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticleObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticleObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticleObjects4= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticleObjects5= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNewSpriteObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNewSpriteObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNewSpriteObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNewSpriteObjects4= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNewSpriteObjects5= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects4= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects5= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects4= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects5= [];


gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDPatternBGObjects2Objects = Hashtable.newFrom({"PatternBG": gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2});
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDMaskObjects2Objects = Hashtable.newFrom({"Mask": gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2});
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDPatternBGObjects2Objects = Hashtable.newFrom({"PatternBG": gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2});
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDMaskObjects2Objects = Hashtable.newFrom({"Mask": gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2});
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDParticle2Objects2Objects = Hashtable.newFrom({"Particle2": gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects2});
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDParticle2Objects2Objects = Hashtable.newFrom({"Particle2": gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects2});
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDMaskObjects2Objects = Hashtable.newFrom({"Mask": gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2});
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDSpriteItemObjects2Objects = Hashtable.newFrom({"SpriteItem": gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects2});
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDModuleBGObjects2Objects = Hashtable.newFrom({"ModuleBG": gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects2});
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDNameObjects2Objects = Hashtable.newFrom({"Name": gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2});
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDDescriptionObjects2Objects = Hashtable.newFrom({"Description": gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects2});
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDKeyObjects1Objects = Hashtable.newFrom({"Key": gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects1});
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{



}


{


let isConditionTrue_0 = false;
{
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2.length = 0;

gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene(eventsFunctionContext, gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDPatternBGObjects2Objects, 0, 300, "");
}
{gdjs.evtTools.object.createObjectOnScene(eventsFunctionContext, gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDMaskObjects2Objects, 0, 300, "");
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).setSize(gdjs.evtTools.window.getWindowInnerWidth(), 300);
}
for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Resizable")).setSize(gdjs.evtTools.window.getWindowInnerWidth(), 300);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2[i].setZOrder(1);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2[i].setColor("61;55;91");
}
}
{gdjs.evtsExt__SpriteMasking__Mask.func(runtimeScene, gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDPatternBGObjects2Objects, gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDMaskObjects2Objects, eventsFunctionContext);
}
}

}


{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Mask"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2);
gdjs.copyArray(eventsFunctionContext.getObjects("PatternBG"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2);
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene(eventsFunctionContext, gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDParticle2Objects2Objects, (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2.length === 0 ) ? (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2.length === 0 ) ? 0 :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2[0].getCenterXInScene()) :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2[0].getCenterXInScene()) - 350, (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2.length === 0 ) ? (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2.length === 0 ) ? 0 :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2[0].getCenterYInScene()) :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2[0].getCenterYInScene()) + 20, "");
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects2[i].setAngle(-(90));
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects2[i].stopEmission();
}
}
{gdjs.evtsExt__SpriteMasking__Mask.func(runtimeScene, gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDParticle2Objects2Objects, gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDMaskObjects2Objects, eventsFunctionContext);
}
}

}


{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Mask"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2);
gdjs.copyArray(eventsFunctionContext.getObjects("PatternBG"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2);
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects2.length = 0;

gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene(eventsFunctionContext, gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDSpriteItemObjects2Objects, (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2.length === 0 ) ? (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2.length === 0 ) ? 0 :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2[0].getCenterXInScene()) :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2[0].getCenterXInScene()) - 350, (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2.length === 0 ) ? (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2.length === 0 ) ? 0 :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2[0].getCenterYInScene()) :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2[0].getCenterYInScene()) + 20, "");
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).setScale(8);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects2[i].setZOrder(2);
}
}
{gdjs.evtTools.object.createObjectOnScene(eventsFunctionContext, gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDModuleBGObjects2Objects, (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2.length === 0 ) ? (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2.length === 0 ) ? 0 :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2[0].getCenterXInScene()) :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2[0].getCenterXInScene()) - 350, (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2.length === 0 ) ? (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2.length === 0 ) ? 0 :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2[0].getCenterYInScene()) :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2[0].getCenterYInScene()) + 20, "");
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects2[i].setZOrder(3);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).setScale(1.8);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).setScaleX(0.6);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Opacity")).setOpacity(0);
}
}
}

}


{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Gold"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects2);
gdjs.copyArray(eventsFunctionContext.getObjects("Mask"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2);
gdjs.copyArray(eventsFunctionContext.getObjects("PatternBG"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2);
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects2.length = 0;

gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene(eventsFunctionContext, gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDNameObjects2Objects, (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2.length === 0 ) ? (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2.length === 0 ) ? 0 :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2[0].getCenterXInScene()) :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2[0].getCenterXInScene()) - 210, (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2.length === 0 ) ? (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2.length === 0 ) ? 0 :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2[0].getCenterYInScene()) :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2[0].getCenterYInScene()) - 45, "");
}
{gdjs.evtTools.object.createObjectOnScene(eventsFunctionContext, gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDDescriptionObjects2Objects, (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2.length === 0 ) ? 0 :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2[0].getX()) - 5, (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2.length === 0 ) ? 0 :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2[0].getY()) + 50, "");
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Opacity")).setOpacity(0);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Opacity")).setOpacity(0);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects2[i].setWrapping(true);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects2[i].setWrappingWidth(400);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects2[i].setZOrder(10);
}
for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2[i].setZOrder(10);
}
for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects2[i].setZOrder(10);
}
}
}

}


{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Mask"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("PatternBG"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("SpriteItem"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects1);
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects1.length = 0;

{gdjs.evtTools.object.createObjectOnScene(eventsFunctionContext, gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546onCreatedContext_9546GDKeyObjects1Objects, (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects1.length === 0 ) ? (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects1[0].getCenterXInScene()) :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects1[0].getCenterXInScene()) + 350, (( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects1.length === 0 ) ? 0 :gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects1[0].getCenterYInScene()), "");
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).setScale(4);
}
}
}

}


};gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.eventsList1 = function(runtimeScene, eventsFunctionContext, asyncObjectsList) {

{

/* Reuse gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects4 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects4.length;i<l;++i) {
    if ( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Animation")).hasAnimationEnded() ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects4[k] = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects4[i];
        ++k;
    }
}
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects4.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(asyncObjectsList.getObjects("Particle2"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects4);

/* Reuse gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects4 */
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects4.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("ShakeObject_PositionAngleScale")).ShakeObject_PositionAngleScale(0.5, 0, 0, 2, 100, 0.5, true, eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects4.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects4[i].startEmission();
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects4.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects4[i].setZOrder(0);
}
}
}

}


};gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.asyncCallback26209004 = function (runtimeScene, eventsFunctionContext, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(eventsFunctionContext.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("Description"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects4);

gdjs.copyArray(eventsFunctionContext.getObjects("Key"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects4);
gdjs.copyArray(asyncObjectsList.getObjects("SpriteItem"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects4);

{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects4.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectOpacityTween2("tweenopacity", 255, "easeOutSine", 0.2, false);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects4.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectOpacityTween2("tweenopacity", 255, "easeOutSine", 0.4, false);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects4.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionYTween2("tweeny", (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects4[i].getPointY("")) - 300, "easeOutSine", 0.1, false);
}
}

{ //Subevents
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.eventsList1(runtimeScene, eventsFunctionContext, asyncObjectsList);} //End of subevents
eventsFunctionContext.localVariables.length = 0;
}
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.eventsList2 = function(runtimeScene, eventsFunctionContext, asyncObjectsList) {

{


{
const parentAsyncObjectsList = asyncObjectsList;
{
const asyncObjectsList = gdjs.LongLivedObjectsList.from(parentAsyncObjectsList);
asyncObjectsList.backupLocalVariablesContainers(eventsFunctionContext.localVariables);
for (const obj of gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects3) asyncObjectsList.addObject("Description", obj);
/* Don't save Particle2 as it will be provided by the parent asyncObjectsList. */
for (const obj of gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects3) asyncObjectsList.addObject("SpriteItem", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.2), (runtimeScene) => (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.asyncCallback26209004(runtimeScene, eventsFunctionContext, asyncObjectsList)));
}
}

}


};gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.asyncCallback26206516 = function (runtimeScene, eventsFunctionContext, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(eventsFunctionContext.localVariables);
gdjs.copyArray(eventsFunctionContext.getObjects("Description"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects3);
gdjs.copyArray(asyncObjectsList.getObjects("Name"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects3);

gdjs.copyArray(eventsFunctionContext.getObjects("SpriteItem"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects3);
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects3.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionYTween2("tweeny", (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects3[i].getPointY("")) - 300, "easeOutCirc", 0.3, false);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects3.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectOpacityTween2("tweenopacity", 255, "easeOutSine", 0.6, false);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects3.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionYTween2("tweeny", (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects3[i].getY()) - 300, "easeOutSine", 0.4, false);
}
}

{ //Subevents
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.eventsList2(runtimeScene, eventsFunctionContext, asyncObjectsList);} //End of subevents
eventsFunctionContext.localVariables.length = 0;
}
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.eventsList3 = function(runtimeScene, eventsFunctionContext, asyncObjectsList) {

{


{
const parentAsyncObjectsList = asyncObjectsList;
{
const asyncObjectsList = gdjs.LongLivedObjectsList.from(parentAsyncObjectsList);
asyncObjectsList.backupLocalVariablesContainers(eventsFunctionContext.localVariables);
for (const obj of gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2) asyncObjectsList.addObject("Name", obj);
for (const obj of gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects2) asyncObjectsList.addObject("Particle2", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.2), (runtimeScene) => (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.asyncCallback26206516(runtimeScene, eventsFunctionContext, asyncObjectsList)));
}
}

}


};gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.asyncCallback26203852 = function (runtimeScene, eventsFunctionContext, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(eventsFunctionContext.localVariables);
gdjs.copyArray(eventsFunctionContext.getObjects("ModuleBG"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects2);
gdjs.copyArray(eventsFunctionContext.getObjects("Name"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2);
gdjs.copyArray(eventsFunctionContext.getObjects("Particle2"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects2);
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionYTween2("tweeny", (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects2[i].getPointY("")) - 300, "easeOutCirc", 0.4, false);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectScaleXTween2("scalex", (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Scale")).getScaleY()), "easeOutBack", 0.25, false, true);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionYTween2("tweeny", (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects2[i].getY()) - 300, "easeOutCirc", 0.4, false);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionYTween2("tweeny", (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2[i].getY()) - 300, "easeOutSine", 0.6, false);
}
}

{ //Subevents
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.eventsList3(runtimeScene, eventsFunctionContext, asyncObjectsList);} //End of subevents
eventsFunctionContext.localVariables.length = 0;
}
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.eventsList4 = function(runtimeScene, eventsFunctionContext) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(eventsFunctionContext.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.3), (runtimeScene) => (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.asyncCallback26203852(runtimeScene, eventsFunctionContext, asyncObjectsList)));
}
}

}


};gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.eventsList5 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Mask"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("PatternBG"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects1);
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionYTween2("tweeny", (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects1[i].getY()) - 300, "easeOutSine", 0.8, false);
}
for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionYTween2("tweeny", (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects1[i].getY()) - 300, "easeOutSine", 0.8, false);
}
}

{ //Subevents
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.eventsList4(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.eventsList6 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
}


{


gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.eventsList5(runtimeScene, eventsFunctionContext);
}


};

gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDPatternBGObjectsList = [...runtimeScene.getObjects("PatternBG")];
var GDPatternBGObjects = Hashtable.newFrom({"PatternBG": thisGDPatternBGObjectsList});
var thisGDDescriptionObjectsList = [...runtimeScene.getObjects("Description")];
var GDDescriptionObjects = Hashtable.newFrom({"Description": thisGDDescriptionObjectsList});
var thisGDMaskObjectsList = [...runtimeScene.getObjects("Mask")];
var GDMaskObjects = Hashtable.newFrom({"Mask": thisGDMaskObjectsList});
var thisGDNameObjectsList = [...runtimeScene.getObjects("Name")];
var GDNameObjects = Hashtable.newFrom({"Name": thisGDNameObjectsList});
var thisGDGoldObjectsList = [...runtimeScene.getObjects("Gold")];
var GDGoldObjects = Hashtable.newFrom({"Gold": thisGDGoldObjectsList});
var thisGDSpriteItemObjectsList = [...runtimeScene.getObjects("SpriteItem")];
var GDSpriteItemObjects = Hashtable.newFrom({"SpriteItem": thisGDSpriteItemObjectsList});
var thisGDKeyObjectsList = [...runtimeScene.getObjects("Key")];
var GDKeyObjects = Hashtable.newFrom({"Key": thisGDKeyObjectsList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var thisGDNewSpriteObjectsList = [...runtimeScene.getObjects("NewSprite")];
var GDNewSpriteObjects = Hashtable.newFrom({"NewSprite": thisGDNewSpriteObjectsList});
var thisGDParticle2ObjectsList = [...runtimeScene.getObjects("Particle2")];
var GDParticle2Objects = Hashtable.newFrom({"Particle2": thisGDParticle2ObjectsList});
var thisGDModuleBGObjectsList = [...runtimeScene.getObjects("ModuleBG")];
var GDModuleBGObjects = Hashtable.newFrom({"ModuleBG": thisGDModuleBGObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "PatternBG": GDPatternBGObjects
, "Description": GDDescriptionObjects
, "Mask": GDMaskObjects
, "Name": GDNameObjects
, "Gold": GDGoldObjects
, "SpriteItem": GDSpriteItemObjects
, "Key": GDKeyObjects
, "Particle": GDParticleObjects
, "NewSprite": GDNewSpriteObjects
, "Particle2": GDParticle2Objects
, "ModuleBG": GDModuleBGObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "PatternBG": thisGDPatternBGObjectsList
, "Description": thisGDDescriptionObjectsList
, "Mask": thisGDMaskObjectsList
, "Name": thisGDNameObjectsList
, "Gold": thisGDGoldObjectsList
, "SpriteItem": thisGDSpriteItemObjectsList
, "Key": thisGDKeyObjectsList
, "Particle": thisGDParticleObjectsList
, "NewSprite": thisGDNewSpriteObjectsList
, "Particle2": thisGDParticle2ObjectsList
, "ModuleBG": thisGDModuleBGObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Extension"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Extension"),
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

gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDObjectObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDObjectObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticleObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticleObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticleObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticleObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNewSpriteObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNewSpriteObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNewSpriteObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNewSpriteObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNewSpriteObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects5.length = 0;

gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.eventsList6(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDObjectObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDObjectObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDPatternBGObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDDescriptionObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDMaskObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNameObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDGoldObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDSpriteItemObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDKeyObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticleObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticleObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticleObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticleObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNewSpriteObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNewSpriteObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNewSpriteObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNewSpriteObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDNewSpriteObjects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDParticle2Objects5.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects4.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.onCreatedContext.GDModuleBGObjects5.length = 0;

gdjs.CustomRuntimeObject.prototype.onCreated.call(this);

return;
}
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext = {};
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDObjectObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDObjectObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDPatternBGObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDPatternBGObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDDescriptionObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDDescriptionObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDMaskObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDMaskObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDNameObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDNameObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDGoldObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDGoldObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDSpriteItemObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDSpriteItemObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDKeyObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDKeyObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDParticleObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDParticleObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDNewSpriteObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDNewSpriteObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDParticle2Objects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDParticle2Objects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDModuleBGObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDModuleBGObjects2= [];


gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("PatternBG"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDPatternBGObjects1);
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDPatternBGObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDPatternBGObjects1[i].setXOffset(gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDPatternBGObjects1[i].getXOffset() - (0.3));
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDPatternBGObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDPatternBGObjects1[i].setYOffset(gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDPatternBGObjects1[i].getYOffset() + (0.3));
}
}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Description"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDDescriptionObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Name"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDNameObjects1);
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDNameObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDNameObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Text")).setText(eventsFunctionContext.getObjects("Object")[0]._getModuleName());
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDDescriptionObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDDescriptionObjects1[i].setBBText(eventsFunctionContext.getObjects("Object")[0]._getModuleDescription());
}
}
}

}


};

gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEvents = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDPatternBGObjectsList = [...runtimeScene.getObjects("PatternBG")];
var GDPatternBGObjects = Hashtable.newFrom({"PatternBG": thisGDPatternBGObjectsList});
var thisGDDescriptionObjectsList = [...runtimeScene.getObjects("Description")];
var GDDescriptionObjects = Hashtable.newFrom({"Description": thisGDDescriptionObjectsList});
var thisGDMaskObjectsList = [...runtimeScene.getObjects("Mask")];
var GDMaskObjects = Hashtable.newFrom({"Mask": thisGDMaskObjectsList});
var thisGDNameObjectsList = [...runtimeScene.getObjects("Name")];
var GDNameObjects = Hashtable.newFrom({"Name": thisGDNameObjectsList});
var thisGDGoldObjectsList = [...runtimeScene.getObjects("Gold")];
var GDGoldObjects = Hashtable.newFrom({"Gold": thisGDGoldObjectsList});
var thisGDSpriteItemObjectsList = [...runtimeScene.getObjects("SpriteItem")];
var GDSpriteItemObjects = Hashtable.newFrom({"SpriteItem": thisGDSpriteItemObjectsList});
var thisGDKeyObjectsList = [...runtimeScene.getObjects("Key")];
var GDKeyObjects = Hashtable.newFrom({"Key": thisGDKeyObjectsList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var thisGDNewSpriteObjectsList = [...runtimeScene.getObjects("NewSprite")];
var GDNewSpriteObjects = Hashtable.newFrom({"NewSprite": thisGDNewSpriteObjectsList});
var thisGDParticle2ObjectsList = [...runtimeScene.getObjects("Particle2")];
var GDParticle2Objects = Hashtable.newFrom({"Particle2": thisGDParticle2ObjectsList});
var thisGDModuleBGObjectsList = [...runtimeScene.getObjects("ModuleBG")];
var GDModuleBGObjects = Hashtable.newFrom({"ModuleBG": thisGDModuleBGObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "PatternBG": GDPatternBGObjects
, "Description": GDDescriptionObjects
, "Mask": GDMaskObjects
, "Name": GDNameObjects
, "Gold": GDGoldObjects
, "SpriteItem": GDSpriteItemObjects
, "Key": GDKeyObjects
, "Particle": GDParticleObjects
, "NewSprite": GDNewSpriteObjects
, "Particle2": GDParticle2Objects
, "ModuleBG": GDModuleBGObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "PatternBG": thisGDPatternBGObjectsList
, "Description": thisGDDescriptionObjectsList
, "Mask": thisGDMaskObjectsList
, "Name": thisGDNameObjectsList
, "Gold": thisGDGoldObjectsList
, "SpriteItem": thisGDSpriteItemObjectsList
, "Key": thisGDKeyObjectsList
, "Particle": thisGDParticleObjectsList
, "NewSprite": thisGDNewSpriteObjectsList
, "Particle2": thisGDParticle2ObjectsList
, "ModuleBG": thisGDModuleBGObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Extension"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Extension"),
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

gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDPatternBGObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDPatternBGObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDDescriptionObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDDescriptionObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDMaskObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDMaskObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDNameObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDNameObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDGoldObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDGoldObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDSpriteItemObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDSpriteItemObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDKeyObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDKeyObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDParticleObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDNewSpriteObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDNewSpriteObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDParticle2Objects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDParticle2Objects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDModuleBGObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDModuleBGObjects2.length = 0;

gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDPatternBGObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDPatternBGObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDDescriptionObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDDescriptionObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDMaskObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDMaskObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDNameObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDNameObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDGoldObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDGoldObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDSpriteItemObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDSpriteItemObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDKeyObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDKeyObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDParticleObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDNewSpriteObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDNewSpriteObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDParticle2Objects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDParticle2Objects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDModuleBGObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPostEventsContext.GDModuleBGObjects2.length = 0;


return;
}
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext = {};
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDObjectObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDObjectObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDPatternBGObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDPatternBGObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDDescriptionObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDDescriptionObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDMaskObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDMaskObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNameObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNameObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDGoldObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDGoldObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDSpriteItemObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDSpriteItemObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDKeyObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDKeyObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticleObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticleObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNewSpriteObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNewSpriteObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticle2Objects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticle2Objects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleBGObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleBGObjects2= [];


gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546UpdateModuleContext_9546GDModuleObjectObjects1Objects = Hashtable.newFrom({"ModuleObject": gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects1});
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546UpdateModuleContext_9546GDSpriteItemObjects1Objects = Hashtable.newFrom({"SpriteItem": gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDSpriteItemObjects1});
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("ModuleObject"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getObjects("Object")[0]._getModuleName() != gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("Upgrades").getChild("Starter").getChild((gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects1[0].getVariables()).get("ID")))).getChild("name")));
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(26216884);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Description"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDDescriptionObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("ModuleBG"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleBGObjects1);
/* Reuse gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects1 */
gdjs.copyArray(eventsFunctionContext.getObjects("Name"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNameObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("SpriteItem"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDSpriteItemObjects1);
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNameObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNameObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ShakeObject_PositionAngleScale")).StopShaking(eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleBGObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleBGObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ShakeObject_PositionAngleScale")).StopShaking(eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDDescriptionObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDDescriptionObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ShakeObject_PositionAngle")).StopShaking(eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleBGObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleBGObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ShakeObject_PositionAngleScale")).ShakeObject_PositionAngleScale(0.1, 5, 5, 10, 100, 0.1, false, eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNameObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNameObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ShakeObject_PositionAngleScale")).ShakeObject_PositionAngleScale(0.1, 3, 3, 0, 100, 0.1, false, eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDDescriptionObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDDescriptionObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ShakeObject_PositionAngle")).ShakeObject_PositionAngle(0.1, 0, 0, 3, 0.1, false, eventsFunctionContext);
}
}
{gdjs.evtsExt__Extension__CopyModuleSprite.func(runtimeScene, gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546UpdateModuleContext_9546GDModuleObjectObjects1Objects, gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595ModuleUI_9546ModuleUI_9546prototype_9546UpdateModuleContext_9546GDSpriteItemObjects1Objects, "SpriteItem", eventsFunctionContext);
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(26224028);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("ModuleObject"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects1);
{eventsFunctionContext.getObjects("Object")[0]._setModuleName(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("Upgrades").getChild("Starter").getChild((gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects1[0].getVariables()).get("ID")))).getChild("name")))
}
{eventsFunctionContext.getObjects("Object")[0]._setModuleDescription(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("Upgrades").getChild("Starter").getChild((gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects1[0].getVariables()).get("ID")))).getChild("description")))
}
{eventsFunctionContext.getObjects("Object")[0]._setModuleCost(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("Upgrades").getChild("Starter").getChild((gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects1[0].getVariables()).get("ID")))).getChild("cost")))
}
{eventsFunctionContext.getObjects("Object")[0]._setModuleColor(eventsFunctionContext.getArgument("ChangeColor"))
}
{eventsFunctionContext.getObjects("Object")[0]._setModuleSpriteColor(eventsFunctionContext.getArgument("ChangeSpriteColor"))
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(26228516);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Particle2"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticle2Objects1);
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticle2Objects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticle2Objects1[i].setParticleColor1(eventsFunctionContext.getObjects("Object")[0]._getModuleColor());
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticle2Objects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticle2Objects1[i].setParticleColor2(eventsFunctionContext.getObjects("Object")[0]._getModuleColor());
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(26229804);
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("ModuleBG"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleBGObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("SpriteItem"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDSpriteItemObjects1);
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleBGObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleBGObjects1[i].setColor(eventsFunctionContext.getObjects("Object")[0]._getModuleColor());
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDSpriteItemObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDSpriteItemObjects1[i].setColor(eventsFunctionContext.getArgument("ChangeSpriteColor"));
}
}
}

}


};

gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModule = function(ModuleObject, ChangeColor, ChangeSpriteColor, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDPatternBGObjectsList = [...runtimeScene.getObjects("PatternBG")];
var GDPatternBGObjects = Hashtable.newFrom({"PatternBG": thisGDPatternBGObjectsList});
var thisGDDescriptionObjectsList = [...runtimeScene.getObjects("Description")];
var GDDescriptionObjects = Hashtable.newFrom({"Description": thisGDDescriptionObjectsList});
var thisGDMaskObjectsList = [...runtimeScene.getObjects("Mask")];
var GDMaskObjects = Hashtable.newFrom({"Mask": thisGDMaskObjectsList});
var thisGDNameObjectsList = [...runtimeScene.getObjects("Name")];
var GDNameObjects = Hashtable.newFrom({"Name": thisGDNameObjectsList});
var thisGDGoldObjectsList = [...runtimeScene.getObjects("Gold")];
var GDGoldObjects = Hashtable.newFrom({"Gold": thisGDGoldObjectsList});
var thisGDSpriteItemObjectsList = [...runtimeScene.getObjects("SpriteItem")];
var GDSpriteItemObjects = Hashtable.newFrom({"SpriteItem": thisGDSpriteItemObjectsList});
var thisGDKeyObjectsList = [...runtimeScene.getObjects("Key")];
var GDKeyObjects = Hashtable.newFrom({"Key": thisGDKeyObjectsList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var thisGDNewSpriteObjectsList = [...runtimeScene.getObjects("NewSprite")];
var GDNewSpriteObjects = Hashtable.newFrom({"NewSprite": thisGDNewSpriteObjectsList});
var thisGDParticle2ObjectsList = [...runtimeScene.getObjects("Particle2")];
var GDParticle2Objects = Hashtable.newFrom({"Particle2": thisGDParticle2ObjectsList});
var thisGDModuleBGObjectsList = [...runtimeScene.getObjects("ModuleBG")];
var GDModuleBGObjects = Hashtable.newFrom({"ModuleBG": thisGDModuleBGObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "PatternBG": GDPatternBGObjects
, "Description": GDDescriptionObjects
, "Mask": GDMaskObjects
, "Name": GDNameObjects
, "Gold": GDGoldObjects
, "SpriteItem": GDSpriteItemObjects
, "Key": GDKeyObjects
, "Particle": GDParticleObjects
, "NewSprite": GDNewSpriteObjects
, "Particle2": GDParticle2Objects
, "ModuleBG": GDModuleBGObjects
, "ModuleObject": ModuleObject
},
  _objectArraysMap: {
"Object": thisObjectList
, "PatternBG": thisGDPatternBGObjectsList
, "Description": thisGDDescriptionObjectsList
, "Mask": thisGDMaskObjectsList
, "Name": thisGDNameObjectsList
, "Gold": thisGDGoldObjectsList
, "SpriteItem": thisGDSpriteItemObjectsList
, "Key": thisGDKeyObjectsList
, "Particle": thisGDParticleObjectsList
, "NewSprite": thisGDNewSpriteObjectsList
, "Particle2": thisGDParticle2ObjectsList
, "ModuleBG": thisGDModuleBGObjectsList
, "ModuleObject": gdjs.objectsListsToArray(ModuleObject)
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Extension"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Extension"),
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
if (argName === "ChangeColor") return ChangeColor;
if (argName === "ChangeSpriteColor") return ChangeSpriteColor;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDPatternBGObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDPatternBGObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDDescriptionObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDDescriptionObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDMaskObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDMaskObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNameObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNameObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDGoldObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDGoldObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDSpriteItemObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDSpriteItemObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDKeyObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDKeyObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticleObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNewSpriteObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNewSpriteObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticle2Objects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticle2Objects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleBGObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleBGObjects2.length = 0;

gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleObjectObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDPatternBGObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDPatternBGObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDDescriptionObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDDescriptionObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDMaskObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDMaskObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNameObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNameObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDGoldObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDGoldObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDSpriteItemObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDSpriteItemObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDKeyObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDKeyObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticleObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNewSpriteObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDNewSpriteObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticle2Objects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDParticle2Objects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleBGObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.UpdateModuleContext.GDModuleBGObjects2.length = 0;


return;
}
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext = {};
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDObjectObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDObjectObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDObjectObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDGoldObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDGoldObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDGoldObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDKeyObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDKeyObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDKeyObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticleObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticleObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticleObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNewSpriteObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNewSpriteObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNewSpriteObjects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticle2Objects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticle2Objects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticle2Objects3= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDModuleBGObjects1= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDModuleBGObjects2= [];
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDModuleBGObjects3= [];


gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.eventsList0 = function(runtimeScene, eventsFunctionContext, asyncObjectsList) {

{

gdjs.copyArray(asyncObjectsList.getObjects("Mask"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects2);

gdjs.copyArray(asyncObjectsList.getObjects("PatternBG"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects2.length;i<l;++i) {
    if ( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).hasFinished("tweeny") ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects2[k] = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects2.length = k;
for (var i = 0, k = 0, l = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects2.length;i<l;++i) {
    if ( gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).hasFinished("tweeny") ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects2[k] = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects2[i];
        ++k;
    }
}
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects2.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDObjectObjects2);
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDObjectObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDObjectObjects2[i].deleteFromScene(runtimeScene);
}
}
}

}


};gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.asyncCallback26237092 = function (runtimeScene, eventsFunctionContext, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(eventsFunctionContext.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("Description"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects2);

gdjs.copyArray(eventsFunctionContext.getObjects("Key"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDKeyObjects2);
gdjs.copyArray(asyncObjectsList.getObjects("Name"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects2);

{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionYTween2("tweeny", (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects2[i].getY()) + 300, "easeOutSine", 0.6, true);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDKeyObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDKeyObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionYTween2("tweeny", (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDKeyObjects2[i].getPointY("")) + 300, "easeOutSine", 0.1, true);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects2.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionYTween2("tweeny", (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects2[i].getY()) + 300, "easeOutSine", 0.4, true);
}
}

{ //Subevents
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.eventsList0(runtimeScene, eventsFunctionContext, asyncObjectsList);} //End of subevents
eventsFunctionContext.localVariables.length = 0;
}
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(eventsFunctionContext.localVariables);
for (const obj of gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects1) asyncObjectsList.addObject("Description", obj);
for (const obj of gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects1) asyncObjectsList.addObject("Mask", obj);
for (const obj of gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects1) asyncObjectsList.addObject("Name", obj);
for (const obj of gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects1) asyncObjectsList.addObject("PatternBG", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.3), (runtimeScene) => (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.asyncCallback26237092(runtimeScene, eventsFunctionContext, asyncObjectsList)));
}
}

}


};gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.eventsList2 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Description"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Mask"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("ModuleBG"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDModuleBGObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Name"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("PatternBG"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("SpriteItem"), gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects1);
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("ShakeObject_PositionAngleScale")).StopShaking(eventsFunctionContext);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionYTween2("tweeny", (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects1[i].getY()) + 300, "easeOutSine", 0.8, true);
}
for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionYTween2("tweeny", (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects1[i].getY()) + 300, "easeOutSine", 0.8, true);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectOpacityTween2("tweenopacity", 0, "easeOutSine", 0.3, true);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectOpacityTween2("tweenopacity", 0, "easeOutSine", 0.3, true);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectOpacityTween2("tweenopacity", 0, "easeOutSine", 0.3, true);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDModuleBGObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDModuleBGObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionYTween2("tweeny", (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDModuleBGObjects1[i].getPointY("")) + 300, "easeOutCirc", 0.3, true);
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Tween")).addObjectPositionYTween2("tweeny", (gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects1[i].getPointY("")) + 300, "easeOutCirc", 0.4, true);
}
}

{ //Subevents
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.eventsList1(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.Destroy = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDPatternBGObjectsList = [...runtimeScene.getObjects("PatternBG")];
var GDPatternBGObjects = Hashtable.newFrom({"PatternBG": thisGDPatternBGObjectsList});
var thisGDDescriptionObjectsList = [...runtimeScene.getObjects("Description")];
var GDDescriptionObjects = Hashtable.newFrom({"Description": thisGDDescriptionObjectsList});
var thisGDMaskObjectsList = [...runtimeScene.getObjects("Mask")];
var GDMaskObjects = Hashtable.newFrom({"Mask": thisGDMaskObjectsList});
var thisGDNameObjectsList = [...runtimeScene.getObjects("Name")];
var GDNameObjects = Hashtable.newFrom({"Name": thisGDNameObjectsList});
var thisGDGoldObjectsList = [...runtimeScene.getObjects("Gold")];
var GDGoldObjects = Hashtable.newFrom({"Gold": thisGDGoldObjectsList});
var thisGDSpriteItemObjectsList = [...runtimeScene.getObjects("SpriteItem")];
var GDSpriteItemObjects = Hashtable.newFrom({"SpriteItem": thisGDSpriteItemObjectsList});
var thisGDKeyObjectsList = [...runtimeScene.getObjects("Key")];
var GDKeyObjects = Hashtable.newFrom({"Key": thisGDKeyObjectsList});
var thisGDParticleObjectsList = [...runtimeScene.getObjects("Particle")];
var GDParticleObjects = Hashtable.newFrom({"Particle": thisGDParticleObjectsList});
var thisGDNewSpriteObjectsList = [...runtimeScene.getObjects("NewSprite")];
var GDNewSpriteObjects = Hashtable.newFrom({"NewSprite": thisGDNewSpriteObjectsList});
var thisGDParticle2ObjectsList = [...runtimeScene.getObjects("Particle2")];
var GDParticle2Objects = Hashtable.newFrom({"Particle2": thisGDParticle2ObjectsList});
var thisGDModuleBGObjectsList = [...runtimeScene.getObjects("ModuleBG")];
var GDModuleBGObjects = Hashtable.newFrom({"ModuleBG": thisGDModuleBGObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "PatternBG": GDPatternBGObjects
, "Description": GDDescriptionObjects
, "Mask": GDMaskObjects
, "Name": GDNameObjects
, "Gold": GDGoldObjects
, "SpriteItem": GDSpriteItemObjects
, "Key": GDKeyObjects
, "Particle": GDParticleObjects
, "NewSprite": GDNewSpriteObjects
, "Particle2": GDParticle2Objects
, "ModuleBG": GDModuleBGObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "PatternBG": thisGDPatternBGObjectsList
, "Description": thisGDDescriptionObjectsList
, "Mask": thisGDMaskObjectsList
, "Name": thisGDNameObjectsList
, "Gold": thisGDGoldObjectsList
, "SpriteItem": thisGDSpriteItemObjectsList
, "Key": thisGDKeyObjectsList
, "Particle": thisGDParticleObjectsList
, "NewSprite": thisGDNewSpriteObjectsList
, "Particle2": thisGDParticle2ObjectsList
, "ModuleBG": thisGDModuleBGObjectsList
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Extension"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Extension"),
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

gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDGoldObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDGoldObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDGoldObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDKeyObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDKeyObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDKeyObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticleObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticleObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNewSpriteObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNewSpriteObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNewSpriteObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticle2Objects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticle2Objects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticle2Objects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDModuleBGObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDModuleBGObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDModuleBGObjects3.length = 0;

gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.eventsList2(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDObjectObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDObjectObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDPatternBGObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDDescriptionObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDMaskObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNameObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDGoldObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDGoldObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDGoldObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDSpriteItemObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDKeyObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDKeyObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDKeyObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticleObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticleObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticleObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNewSpriteObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNewSpriteObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDNewSpriteObjects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticle2Objects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticle2Objects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDParticle2Objects3.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDModuleBGObjects1.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDModuleBGObjects2.length = 0;
gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.DestroyContext.GDModuleBGObjects3.length = 0;


return;
}

gdjs.evtsExt__Extension__ModuleUI.ModuleUI.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
};


gdjs.registerObject("Extension::ModuleUI", gdjs.evtsExt__Extension__ModuleUI.ModuleUI);
