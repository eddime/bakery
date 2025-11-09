
if (typeof gdjs.evtsExt__ShadowClones__AnimateShadowClones !== "undefined") {
  gdjs.evtsExt__ShadowClones__AnimateShadowClones.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__ShadowClones__AnimateShadowClones = {};
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4_1final = [];

gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachIndex2 = 0;

gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachIndex4 = 0;

gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachObjects2 = [];

gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachObjects4 = [];

gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachTemporary2 = null;

gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachTemporary4 = null;

gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachTotalCount2 = 0;

gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachTotalCount4 = 0;

gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects1= [];
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2= [];
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3= [];
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4= [];
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5= [];
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6= [];
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects7= [];
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects1= [];
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects2= [];
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects3= [];
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects4= [];
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5= [];
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6= [];
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects7= [];


gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{



}


{

gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length;i<l;++i) {
    if ( gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("FramesBetweenShadowClones")) < 1 ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[k] = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i];
        ++k;
    }
}
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4 */
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("FramesBetweenShadowClones")).setNumber(1);
}
}
}

}


{



}


{


let isConditionTrue_0 = false;
{
/* Reuse gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3 */
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3[i].getVariables().get("MaxFramesBehind")).setNumber((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3[i].getVariables().get("TotalShadowClones"))) * (gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3[i].getVariables().get("FramesBetweenShadowClones"))));
}
}
}

}


};gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3);

{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3[i].getVariables().get("TotalShadowClones")).setNumber(eventsFunctionContext.getArgument("NumberOfShadowClones"));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3[i].getVariables().get("FramesBetweenShadowClones")).setNumber(eventsFunctionContext.getArgument("FramesBetweenShadowClones"));
}
}

{ //Subevents
gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};gdjs.evtsExt__ShadowClones__AnimateShadowClones.mapOfGDgdjs_9546evtsExt_9595_9595ShadowClones_9595_9595AnimateShadowClones_9546GDShadowCloneObjectObjects5Objects = Hashtable.newFrom({"ShadowCloneObject": gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5});
gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList2 = function(runtimeScene, eventsFunctionContext) {

{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5);

gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length = 0;

{gdjs.evtTools.object.createObjectOnScene(eventsFunctionContext, gdjs.evtsExt__ShadowClones__AnimateShadowClones.mapOfGDgdjs_9546evtsExt_9595_9595ShadowClones_9595_9595AnimateShadowClones_9546GDShadowCloneObjectObjects5Objects, (( gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length === 0 ) ? 0 :gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0].getX()), (( gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length === 0 ) ? 0 :gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0].getY()), eventsFunctionContext.getArgument("ShadowCloneLayer"));
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].getVariables().get("ShadowCloneOrder")).setNumber((gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0].getVariables()).get("ClonesCreated"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].setZOrder(eventsFunctionContext.getArgument("ShadowCloneZValue"));
}
}
{gdjs.evtTools.linkedObjects.linkObjects(runtimeScene, (gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length !== 0 ? gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0] : null), (gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length !== 0 ? gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[0] : null));
}
}

}


};gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList3 = function(runtimeScene, eventsFunctionContext) {

{



}


{


let stopDoWhile_0 = false;
do {
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length;i<l;++i) {
    if ( gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("ClonesCreated")) < (gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("TotalShadowClones"))) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[k] = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i];
        ++k;
    }
}
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4_1final.length = 0;
let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5);

for (var i = 0, k = 0, l = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length;i<l;++i) {
    if ( gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString(((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].getVariables().get("ClonesCreated"))) + 1) * (gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].getVariables().get("FramesBetweenShadowClones"))))).getChild("xpos")) != 0 ) {
        isConditionTrue_1 = true;
        gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[k] = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i];
        ++k;
    }
}
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length = k;
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
    for (let j = 0, jLen = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length; j < jLen ; ++j) {
        if ( gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4_1final.indexOf(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[j]) === -1 )
            gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4_1final.push(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[j]);
    }
}
}
{
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5);

for (var i = 0, k = 0, l = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length;i<l;++i) {
    if ( gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString(((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].getVariables().get("ClonesCreated"))) + 1) * (gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].getVariables().get("FramesBetweenShadowClones"))))).getChild("ypos")) != 0 ) {
        isConditionTrue_1 = true;
        gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[k] = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i];
        ++k;
    }
}
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length = k;
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
    for (let j = 0, jLen = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length; j < jLen ; ++j) {
        if ( gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4_1final.indexOf(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[j]) === -1 )
            gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4_1final.push(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[j]);
    }
}
}
{
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4_1final, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4);
}
}
}
if (isConditionTrue_0) {
let isConditionTrue_0 = false;
if (true) {
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("ClonesCreated")).add(1);
}
}

{ //Subevents: 
gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList2(runtimeScene, eventsFunctionContext);} //Subevents end.
}
} else stopDoWhile_0 = true; 
} while (!stopDoWhile_0);

}


};gdjs.evtsExt__ShadowClones__AnimateShadowClones.mapOfGDgdjs_9546evtsExt_9595_9595ShadowClones_9595_9595AnimateShadowClones_9546GDPrimaryObjectObjects4Objects = Hashtable.newFrom({"PrimaryObject": gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4});
gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList4 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6.length;i<l;++i) {
    if ( gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6[i].getVariableBoolean(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6[i].getVariables().get("horizontalflip"), false) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6[k] = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6[i];
        ++k;
    }
}
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6.length = k;
if (isConditionTrue_0) {
{/* Mismatched object type - skipped. */}
}

}


{

/* Reuse gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length;i<l;++i) {
    if ( gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].getVariableBoolean(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].getVariables().get("horizontalflip"), true) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[k] = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i];
        ++k;
    }
}
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length = k;
if (isConditionTrue_0) {
{/* Mismatched object type - skipped. */}
}

}


};gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList5 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6.length;i<l;++i) {
    if ( gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6[i].getVariableBoolean(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6[i].getVariables().get("verticalflip"), false) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6[k] = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6[i];
        ++k;
    }
}
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6.length = k;
if (isConditionTrue_0) {
{/* Mismatched object type - skipped. */}
}

}


{

/* Reuse gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length;i<l;++i) {
    if ( gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].getVariableBoolean(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].getVariables().get("verticalflip"), true) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[k] = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i];
        ++k;
    }
}
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length = k;
if (isConditionTrue_0) {
{/* Mismatched object type - skipped. */}
}

}


};gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList6 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{/* Mismatched object type - skipped. */}
}

}


{


let isConditionTrue_0 = false;
{
{/* Mismatched object type - skipped. */}
}

}


};gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList7 = function(runtimeScene, eventsFunctionContext) {

{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5);

gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects4, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5);

{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].setPosition((gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0].getVariables()).get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].getVariables().get("ShadowCloneOrder"))) * (gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0].getVariables()).get("FramesBetweenShadowClones"))))).getChild("xpos"))),(gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0].getVariables()).get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].getVariables().get("ShadowCloneOrder"))) * (gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0].getVariables()).get("FramesBetweenShadowClones"))))).getChild("ypos"))));
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !!eventsFunctionContext.getArgument("MatchAngle");
}
if (isConditionTrue_0) {
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5);

gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects4, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5);

{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].setAngle((gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0].getVariables()).get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].getVariables().get("ShadowCloneOrder"))) * (gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0].getVariables()).get("FramesBetweenShadowClones"))))).getChild("angle"))));
}
}
}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !!eventsFunctionContext.getArgument("MatchScaleX");
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getArgument("ShrinkSpeed") == 0);
}
}
if (isConditionTrue_0) {
{/* Mismatched object type - skipped. */}
}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !!eventsFunctionContext.getArgument("MatchScaleY");
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getArgument("ShrinkSpeed") == 0);
}
}
if (isConditionTrue_0) {
{/* Mismatched object type - skipped. */}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !!eventsFunctionContext.getArgument("MatchAnimation");
}
if (isConditionTrue_0) {
{/* Mismatched object type - skipped. */}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !!eventsFunctionContext.getArgument("MatchAnimationFrame");
}
if (isConditionTrue_0) {
{/* Mismatched object type - skipped. */}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5);

gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects4, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5);

{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).setZ((gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0].getVariables()).get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].getVariables().get("ShadowCloneOrder"))) * (gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0].getVariables()).get("FramesBetweenShadowClones"))))).getChild("zorder"))));
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !!eventsFunctionContext.getArgument("MatchHorizontalFlip");
}
if (isConditionTrue_0) {
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5);

gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects4, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5);

{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].getVariables().get("horizontalflip")).setNumber((gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0].getVariables()).get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].getVariables().get("ShadowCloneOrder"))) * (gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0].getVariables()).get("FramesBetweenShadowClones"))))).getChild("horizontalflip"))));
}
}

{ //Subevents
gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList4(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !!eventsFunctionContext.getArgument("MatchVerticalFlip");
}
if (isConditionTrue_0) {
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5);

gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects4, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5);

{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].getVariables().get("verticalflip")).setNumber((gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0].getVariables()).get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].getVariables().get("ShadowCloneOrder"))) * (gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0].getVariables()).get("FramesBetweenShadowClones"))))).getChild("verticalflip"))));
}
}

{ //Subevents
gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList5(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getArgument("FadeSpeed") != 0);
}
if (isConditionTrue_0) {
{/* Mismatched object type - skipped. */}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getArgument("FadeSpeed") == 0);
}
if (isConditionTrue_0) {
{/* Mismatched object type - skipped. */}
}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (eventsFunctionContext.getArgument("ShrinkSpeed") != 0);
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList6(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{



}


{

gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5);

gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects4, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length;i<l;++i) {
    if ( gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].getVariables().get("ShadowCloneOrder")) > (gdjs.RuntimeObject.getVariableNumber(((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[0].getVariables()).get("TotalShadowClones"))) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[k] = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i];
        ++k;
    }
}
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5 */
/* Reuse gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5 */
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5[i].deleteFromScene(runtimeScene);
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].getVariables().get("ClonesCreated")).sub(1);
}
}
}

}


};gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList8 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("ShadowCloneObject"), gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects3);

for (gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachIndex4 = 0;gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachIndex4 < gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects3.length;++gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachIndex4) {
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4);

gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects4.length = 0;


gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachTemporary4 = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects3[gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachIndex4];
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects4.push(gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachTemporary4);
let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.linkedObjects.pickObjectsLinkedTo(runtimeScene, gdjs.evtsExt__ShadowClones__AnimateShadowClones.mapOfGDgdjs_9546evtsExt_9595_9595ShadowClones_9595_9595AnimateShadowClones_9546GDPrimaryObjectObjects4Objects, (gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects4.length !== 0 ? gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects4[0] : null), eventsFunctionContext);
if (isConditionTrue_0) {

{ //Subevents: 
gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList7(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList9 = function(runtimeScene, eventsFunctionContext) {

};gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList10 = function(runtimeScene, eventsFunctionContext) {

{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6);

{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))))).getChild("xpos")).setNumber((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))) - 1)).getChild("xpos"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))))).getChild("ypos")).setNumber((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))) - 1)).getChild("ypos"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))))).getChild("angle")).setNumber((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))) - 1)).getChild("angle"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))))).getChild("animation")).setNumber((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))) - 1)).getChild("animation"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))))).getChild("frame")).setNumber((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))) - 1)).getChild("frame"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))))).getChild("xscale")).setNumber((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))) - 1)).getChild("xscale"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))))).getChild("yscale")).setNumber((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))) - 1)).getChild("yscale"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))))).getChild("width")).setNumber((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))) - 1)).getChild("width"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))))).getChild("height")).setNumber((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))) - 1)).getChild("height"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))))).getChild("zorder")).setNumber((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))) - 1)).getChild("zorder"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))))).getChild("horizontalflip")).setNumber((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))) - 1)).getChild("horizontalflip"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))))).getChild("verticalflip")).setNumber((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("ObjectHistory").getChild(gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter"))) - 1)).getChild("verticalflip"))));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6[i].getVariables().get("DataMoveCounter")).sub(1);
}
}
}

}


};gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList11 = function(runtimeScene, eventsFunctionContext) {

{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4);

{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("DataCleaningCounter")).setNumber((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("MaxFramesBehind"))) + 1);
}
}
}

}


{


let stopDoWhile_0 = false;
do {
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length;i<l;++i) {
    if ( gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].variableChildExists(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].getVariables().get("ObjectHistory"), gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].getVariables().get("DataCleaningCounter"))))) ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[k] = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i];
        ++k;
    }
}
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length = k;
if (isConditionTrue_0) {
let isConditionTrue_0 = false;
if (true) {
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].variableRemoveChild(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].getVariables().get("ObjectHistory"), gdjs.evtTools.common.toString((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].getVariables().get("DataCleaningCounter")))));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].getVariables().get("DataCleaningCounter")).add(1);
}
}

{ //Subevents: 
gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList9(runtimeScene, eventsFunctionContext);} //Subevents end.
}
} else stopDoWhile_0 = true; 
} while (!stopDoWhile_0);

}


{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4);

{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("DataMoveCounter")).setNumber((gdjs.RuntimeObject.getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("MaxFramesBehind"))));
}
}
}

}


{



}


{


let stopDoWhile_0 = false;
do {
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length;i<l;++i) {
    if ( gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].getVariableNumber(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i].getVariables().get("DataMoveCounter")) > 1 ) {
        isConditionTrue_0 = true;
        gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[k] = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5[i];
        ++k;
    }
}
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length = k;
if (isConditionTrue_0) {
let isConditionTrue_0 = false;
if (true) {

{ //Subevents: 
gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList10(runtimeScene, eventsFunctionContext);} //Subevents end.
}
} else stopDoWhile_0 = true; 
} while (!stopDoWhile_0);

}


{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4);

{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("ObjectHistory").getChild("1").getChild("xpos")).setNumber((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getX()));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("ObjectHistory").getChild("1").getChild("ypos")).setNumber((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getY()));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("ObjectHistory").getChild("1").getChild("animation")).setNumber(0);
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("ObjectHistory").getChild("1").getChild("frame")).setNumber(0);
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("ObjectHistory").getChild("1").getChild("angle")).setNumber((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getAngle()));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("ObjectHistory").getChild("1").getChild("xscale")).setNumber((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getScaleX()));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("ObjectHistory").getChild("1").getChild("yscale")).setNumber((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getScaleY()));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("ObjectHistory").getChild("1").getChild("width")).setNumber((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getWidth()));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("ObjectHistory").getChild("1").getChild("height")).setNumber((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getHeight()));
}
}
{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].returnVariable(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("ObjectHistory").getChild("1").getChild("zorder")).setNumber((gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).getZ()));
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
/* Mismatched object type - skipped. */if (isConditionTrue_0) {
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4);

{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].setVariableBoolean(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("ObjectHistory").getChild("1").getChild("horizontalflip"), false);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
/* Mismatched object type - skipped. */if (isConditionTrue_0) {
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4);

{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].setVariableBoolean(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("ObjectHistory").getChild("1").getChild("horizontalflip"), true);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
/* Mismatched object type - skipped. */if (isConditionTrue_0) {
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4);

{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].setVariableBoolean(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4[i].getVariables().get("ObjectHistory").getChild("1").getChild("verticalflip"), false);
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
/* Mismatched object type - skipped. */if (isConditionTrue_0) {
gdjs.copyArray(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2, gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3);

{for(var i = 0, len = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3.length ;i < len;++i) {
    gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3[i].setVariableBoolean(gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3[i].getVariables().get("ObjectHistory").getChild("1").getChild("verticalflip"), true);
}
}
}

}


};gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList12 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList1(runtimeScene, eventsFunctionContext);
}


{


gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList3(runtimeScene, eventsFunctionContext);
}


{


gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList8(runtimeScene, eventsFunctionContext);
}


{


gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList11(runtimeScene, eventsFunctionContext);
}


};gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList13 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("PrimaryObject"), gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects1);

for (gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachIndex2 = 0;gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachIndex2 < gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects1.length;++gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachIndex2) {
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2.length = 0;


gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachTemporary2 = gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects1[gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachIndex2];
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2.push(gdjs.evtsExt__ShadowClones__AnimateShadowClones.forEachTemporary2);
let isConditionTrue_0 = false;
if (true) {

{ //Subevents: 
gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList12(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList14 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList13(runtimeScene, eventsFunctionContext);
}


{



}


};

gdjs.evtsExt__ShadowClones__AnimateShadowClones.func = function(runtimeScene, PrimaryObject, ShadowCloneObject, NumberOfShadowClones, FramesBetweenShadowClones, FadeSpeed, ShrinkSpeed, ShadowCloneLayer, ShadowCloneZValue, MatchScaleX, MatchScaleY, MatchAngle, MatchAnimation, MatchAnimationFrame, MatchVerticalFlip, MatchHorizontalFlip, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"PrimaryObject": PrimaryObject
, "ShadowCloneObject": ShadowCloneObject
},
  _objectArraysMap: {
"PrimaryObject": gdjs.objectsListsToArray(PrimaryObject)
, "ShadowCloneObject": gdjs.objectsListsToArray(ShadowCloneObject)
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
if (argName === "NumberOfShadowClones") return NumberOfShadowClones;
if (argName === "FramesBetweenShadowClones") return FramesBetweenShadowClones;
if (argName === "FadeSpeed") return FadeSpeed;
if (argName === "ShrinkSpeed") return ShrinkSpeed;
if (argName === "ShadowCloneLayer") return ShadowCloneLayer;
if (argName === "ShadowCloneZValue") return ShadowCloneZValue;
if (argName === "MatchScaleX") return MatchScaleX;
if (argName === "MatchScaleY") return MatchScaleY;
if (argName === "MatchAngle") return MatchAngle;
if (argName === "MatchAnimation") return MatchAnimation;
if (argName === "MatchAnimationFrame") return MatchAnimationFrame;
if (argName === "MatchVerticalFlip") return MatchVerticalFlip;
if (argName === "MatchHorizontalFlip") return MatchHorizontalFlip;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects1.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects7.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects1.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects2.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects3.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects4.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects7.length = 0;

gdjs.evtsExt__ShadowClones__AnimateShadowClones.eventsList14(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects1.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects2.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects3.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects4.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects5.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects6.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDPrimaryObjectObjects7.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects1.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects2.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects3.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects4.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects5.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects6.length = 0;
gdjs.evtsExt__ShadowClones__AnimateShadowClones.GDShadowCloneObjectObjects7.length = 0;


return;
}

gdjs.evtsExt__ShadowClones__AnimateShadowClones.registeredGdjsCallbacks = [];