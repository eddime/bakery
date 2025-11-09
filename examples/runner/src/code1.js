gdjs.GameOverCode = {};
gdjs.GameOverCode.localVariables = [];
gdjs.GameOverCode.forEachIndex2 = 0;

gdjs.GameOverCode.forEachObjects2 = [];

gdjs.GameOverCode.forEachTemporary2 = null;

gdjs.GameOverCode.forEachTotalCount2 = 0;

gdjs.GameOverCode.GDRainObjects1= [];
gdjs.GameOverCode.GDRainObjects2= [];
gdjs.GameOverCode.GDRainObjects3= [];
gdjs.GameOverCode.GDRainObjects4= [];
gdjs.GameOverCode.GDRain2Objects1= [];
gdjs.GameOverCode.GDRain2Objects2= [];
gdjs.GameOverCode.GDRain2Objects3= [];
gdjs.GameOverCode.GDRain2Objects4= [];
gdjs.GameOverCode.GDPatternUIObjects1= [];
gdjs.GameOverCode.GDPatternUIObjects2= [];
gdjs.GameOverCode.GDPatternUIObjects3= [];
gdjs.GameOverCode.GDPatternUIObjects4= [];
gdjs.GameOverCode.GDGameOverObjects1= [];
gdjs.GameOverCode.GDGameOverObjects2= [];
gdjs.GameOverCode.GDGameOverObjects3= [];
gdjs.GameOverCode.GDGameOverObjects4= [];
gdjs.GameOverCode.GDScoreObjects1= [];
gdjs.GameOverCode.GDScoreObjects2= [];
gdjs.GameOverCode.GDScoreObjects3= [];
gdjs.GameOverCode.GDScoreObjects4= [];
gdjs.GameOverCode.GDScoreTitleObjects1= [];
gdjs.GameOverCode.GDScoreTitleObjects2= [];
gdjs.GameOverCode.GDScoreTitleObjects3= [];
gdjs.GameOverCode.GDScoreTitleObjects4= [];
gdjs.GameOverCode.GDBulletObjects1= [];
gdjs.GameOverCode.GDBulletObjects2= [];
gdjs.GameOverCode.GDBulletObjects3= [];
gdjs.GameOverCode.GDBulletObjects4= [];
gdjs.GameOverCode.GDPlayerObjects1= [];
gdjs.GameOverCode.GDPlayerObjects2= [];
gdjs.GameOverCode.GDPlayerObjects3= [];
gdjs.GameOverCode.GDPlayerObjects4= [];
gdjs.GameOverCode.GDMaskObjects1= [];
gdjs.GameOverCode.GDMaskObjects2= [];
gdjs.GameOverCode.GDMaskObjects3= [];
gdjs.GameOverCode.GDMaskObjects4= [];
gdjs.GameOverCode.GDyellow_9595glowObjects1= [];
gdjs.GameOverCode.GDyellow_9595glowObjects2= [];
gdjs.GameOverCode.GDyellow_9595glowObjects3= [];
gdjs.GameOverCode.GDyellow_9595glowObjects4= [];


gdjs.GameOverCode.asyncCallback27921204 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.GameOverCode.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("Rain"), gdjs.GameOverCode.GDRainObjects3);

gdjs.copyArray(asyncObjectsList.getObjects("Rain2"), gdjs.GameOverCode.GDRain2Objects3);

{for(var i = 0, len = gdjs.GameOverCode.GDRainObjects3.length ;i < len;++i) {
    gdjs.GameOverCode.GDRainObjects3[i].startEmission();
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDRain2Objects3.length ;i < len;++i) {
    gdjs.GameOverCode.GDRain2Objects3[i].startEmission();
}
}
gdjs.GameOverCode.localVariables.length = 0;
}
gdjs.GameOverCode.eventsList0 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.GameOverCode.localVariables);
for (const obj of gdjs.GameOverCode.GDRainObjects2) asyncObjectsList.addObject("Rain", obj);
for (const obj of gdjs.GameOverCode.GDRain2Objects2) asyncObjectsList.addObject("Rain2", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.2), (runtimeScene) => (gdjs.GameOverCode.asyncCallback27921204(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.GameOverCode.asyncCallback27922468 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.GameOverCode.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("Player"), gdjs.GameOverCode.GDPlayerObjects3);

{for(var i = 0, len = gdjs.GameOverCode.GDPlayerObjects3.length ;i < len;++i) {
    gdjs.GameOverCode.GDPlayerObjects3[i].activateBehavior("RectangleMovement", true);
}
}
gdjs.GameOverCode.localVariables.length = 0;
}
gdjs.GameOverCode.eventsList1 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.GameOverCode.localVariables);
for (const obj of gdjs.GameOverCode.GDPlayerObjects2) asyncObjectsList.addObject("Player", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.8), (runtimeScene) => (gdjs.GameOverCode.asyncCallback27922468(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.GameOverCode.asyncCallback27923428 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.GameOverCode.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("Bullet"), gdjs.GameOverCode.GDBulletObjects3);

{for(var i = 0, len = gdjs.GameOverCode.GDBulletObjects3.length ;i < len;++i) {
    gdjs.GameOverCode.GDBulletObjects3[i].getBehavior("Tween").addObjectPositionYTween2("y", (gdjs.GameOverCode.GDBulletObjects3[i].getPointY("")) + 500, "easeOutCirc", gdjs.randomInRange(1.4, 2), false);
}
}
gdjs.GameOverCode.localVariables.length = 0;
}
gdjs.GameOverCode.eventsList2 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.GameOverCode.localVariables);
for (const obj of gdjs.GameOverCode.GDBulletObjects2) asyncObjectsList.addObject("Bullet", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.1), (runtimeScene) => (gdjs.GameOverCode.asyncCallback27923428(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.GameOverCode.mapOfGDgdjs_9546GameOverCode_9546GDPatternUIObjects2Objects = Hashtable.newFrom({"PatternUI": gdjs.GameOverCode.GDPatternUIObjects2});
gdjs.GameOverCode.mapOfGDgdjs_9546GameOverCode_9546GDMaskObjects2Objects = Hashtable.newFrom({"Mask": gdjs.GameOverCode.GDMaskObjects2});
gdjs.GameOverCode.asyncCallback27928492 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.GameOverCode.localVariables);
{gdjs.evtTools.sound.playSound(runtimeScene, "STREAMING-video-game-magic-spell-ice-shatter-gamemaster-audio-2-2-00-01.mp3", false, 50, 1);
}
gdjs.GameOverCode.localVariables.length = 0;
}
gdjs.GameOverCode.eventsList3 = function(runtimeScene, asyncObjectsList) {

{


{
const parentAsyncObjectsList = asyncObjectsList;
{
const asyncObjectsList = gdjs.LongLivedObjectsList.from(parentAsyncObjectsList);
asyncObjectsList.backupLocalVariablesContainers(gdjs.GameOverCode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.25), (runtimeScene) => (gdjs.GameOverCode.asyncCallback27928492(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.GameOverCode.asyncCallback27927564 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.GameOverCode.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("Score"), gdjs.GameOverCode.GDScoreObjects3);

{for(var i = 0, len = gdjs.GameOverCode.GDScoreObjects3.length ;i < len;++i) {
    gdjs.GameOverCode.GDScoreObjects3[i].getBehavior("Scale").setScale(4);
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDScoreObjects3.length ;i < len;++i) {
    gdjs.GameOverCode.GDScoreObjects3[i].getBehavior("Tween").addObjectScaleTween3("scalo", 1, "easeInExpo", 0.25, false, false);
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDScoreObjects3.length ;i < len;++i) {
    gdjs.GameOverCode.GDScoreObjects3[i].hide(false);
}
}
{runtimeScene.getScene().getVariables().getFromIndex(0).setNumber(0);
}
{gdjs.evtTools.tween.tweenVariableNumber3(runtimeScene, "tweenscore", runtimeScene.getScene().getVariables().getFromIndex(0), 123123, "easeTo", 2);
}

{ //Subevents
gdjs.GameOverCode.eventsList3(runtimeScene, asyncObjectsList);} //End of subevents
gdjs.GameOverCode.localVariables.length = 0;
}
gdjs.GameOverCode.eventsList4 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.GameOverCode.localVariables);
for (const obj of gdjs.GameOverCode.GDScoreObjects2) asyncObjectsList.addObject("Score", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(1), (runtimeScene) => (gdjs.GameOverCode.asyncCallback27927564(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.GameOverCode.asyncCallback27929204 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.GameOverCode.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("ScoreTitle"), gdjs.GameOverCode.GDScoreTitleObjects2);

{for(var i = 0, len = gdjs.GameOverCode.GDScoreTitleObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDScoreTitleObjects2[i].getBehavior("Tween").addObjectOpacityTween2("opa", 255, "easeInSine", 0.2, false);
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDScoreTitleObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDScoreTitleObjects2[i].getBehavior("Tween").addObjectPositionYTween2("y", (gdjs.GameOverCode.GDScoreTitleObjects2[i].getY()) - 20, "easeInSine", 0.2, false);
}
}
gdjs.GameOverCode.localVariables.length = 0;
}
gdjs.GameOverCode.eventsList5 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.GameOverCode.localVariables);
for (const obj of gdjs.GameOverCode.GDScoreTitleObjects1) asyncObjectsList.addObject("ScoreTitle", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(1.2), (runtimeScene) => (gdjs.GameOverCode.asyncCallback27929204(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.GameOverCode.eventsList6 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Rain"), gdjs.GameOverCode.GDRainObjects2);
gdjs.copyArray(runtimeScene.getObjects("Rain2"), gdjs.GameOverCode.GDRain2Objects2);
{for(var i = 0, len = gdjs.GameOverCode.GDRainObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDRainObjects2[i].stopEmission();
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDRain2Objects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDRain2Objects2[i].stopEmission();
}
}

{ //Subevents
gdjs.GameOverCode.eventsList0(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.GameOverCode.GDPlayerObjects2);
{for(var i = 0, len = gdjs.GameOverCode.GDPlayerObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDPlayerObjects2[i].activateBehavior("RectangleMovement", false);
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDPlayerObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDPlayerObjects2[i].setY(gdjs.GameOverCode.GDPlayerObjects2[i].getY() - (500));
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDPlayerObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDPlayerObjects2[i].getBehavior("Tween").addObjectPositionYTween2("y", (gdjs.GameOverCode.GDPlayerObjects2[i].getPointY("")) + 500, "easeOutCirc", 0.8, false);
}
}

{ //Subevents
gdjs.GameOverCode.eventsList1(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Bullet"), gdjs.GameOverCode.GDBulletObjects2);
{for(var i = 0, len = gdjs.GameOverCode.GDBulletObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDBulletObjects2[i].setY(gdjs.GameOverCode.GDBulletObjects2[i].getY() - (500));
}
}

{ //Subevents
gdjs.GameOverCode.eventsList2(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Mask"), gdjs.GameOverCode.GDMaskObjects2);
gdjs.copyArray(runtimeScene.getObjects("PatternUI"), gdjs.GameOverCode.GDPatternUIObjects2);
{gdjs.evtsExt__SpriteMasking__Mask.func(runtimeScene, gdjs.GameOverCode.mapOfGDgdjs_9546GameOverCode_9546GDPatternUIObjects2Objects, gdjs.GameOverCode.mapOfGDgdjs_9546GameOverCode_9546GDMaskObjects2Objects, null);
}
{for(var i = 0, len = gdjs.GameOverCode.GDPatternUIObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDPatternUIObjects2[i].setColor("61;55;91");
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDPatternUIObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDPatternUIObjects2[i].getBehavior("Opacity").setOpacity(0);
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDPatternUIObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDPatternUIObjects2[i].getBehavior("Tween").addObjectOpacityTween2("opa", 225, "easeInSine", 1, false);
}
}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("GameOver"), gdjs.GameOverCode.GDGameOverObjects2);
{for(var i = 0, len = gdjs.GameOverCode.GDGameOverObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDGameOverObjects2[i].setY(gdjs.GameOverCode.GDGameOverObjects2[i].getY() - (500));
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDGameOverObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDGameOverObjects2[i].activateBehavior("ShakeObject_PositionAngleScale", false);
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDGameOverObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDGameOverObjects2[i].getBehavior("Tween").addObjectPositionYTween2("y", (gdjs.GameOverCode.GDGameOverObjects2[i].getY()) + 500, "easeOutBack", 1, false);
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDGameOverObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDGameOverObjects2[i].getBehavior("ShakeObject_PositionAngleScale").ShakeObject_PositionAngleScale(1, 5, 5, 5, 2, 1, true, null);
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDGameOverObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDGameOverObjects2[i].activateBehavior("ShakeObject_PositionAngleScale", true);
}
}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Score"), gdjs.GameOverCode.GDScoreObjects2);
{for(var i = 0, len = gdjs.GameOverCode.GDScoreObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDScoreObjects2[i].hide();
}
}

{ //Subevents
gdjs.GameOverCode.eventsList4(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("ScoreTitle"), gdjs.GameOverCode.GDScoreTitleObjects1);
{for(var i = 0, len = gdjs.GameOverCode.GDScoreTitleObjects1.length ;i < len;++i) {
    gdjs.GameOverCode.GDScoreTitleObjects1[i].getBehavior("Opacity").setOpacity(0);
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDScoreTitleObjects1.length ;i < len;++i) {
    gdjs.GameOverCode.GDScoreTitleObjects1[i].setY(gdjs.GameOverCode.GDScoreTitleObjects1[i].getY() + (20));
}
}

{ //Subevents
gdjs.GameOverCode.eventsList5(runtimeScene);} //End of subevents
}

}


};gdjs.GameOverCode.eventsList7 = function(runtimeScene) {

};gdjs.GameOverCode.asyncCallback27932988 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.GameOverCode.localVariables);
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Untitled scene", false);
}
gdjs.GameOverCode.localVariables.length = 0;
}
gdjs.GameOverCode.eventsList8 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.GameOverCode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(1), (runtimeScene) => (gdjs.GameOverCode.asyncCallback27932988(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.GameOverCode.mapOfGDgdjs_9546GameOverCode_9546GDyellow_95959595glowObjects2Objects = Hashtable.newFrom({"yellow_glow": gdjs.GameOverCode.GDyellow_9595glowObjects2});
gdjs.GameOverCode.mapOfGDgdjs_9546GameOverCode_9546GDBulletObjects2Objects = Hashtable.newFrom({"Bullet": gdjs.GameOverCode.GDBulletObjects2});
gdjs.GameOverCode.eventsList9 = function(runtimeScene) {

};gdjs.GameOverCode.eventsList10 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(27919876);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.prioritizeLoadingOfScene(runtimeScene, "Untitled scene");
}
{gdjs.evtTools.sound.playMusicOnChannel(runtimeScene, "STREAMING-memory-branch-ian-aisling-main-version-15642-02-47.mp3", 1, false, 30, 1);
}

{ //Subevents
gdjs.GameOverCode.eventsList6(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("PatternUI"), gdjs.GameOverCode.GDPatternUIObjects1);
gdjs.copyArray(runtimeScene.getObjects("Score"), gdjs.GameOverCode.GDScoreObjects1);
{for(var i = 0, len = gdjs.GameOverCode.GDPatternUIObjects1.length ;i < len;++i) {
    gdjs.GameOverCode.GDPatternUIObjects1[i].setYOffset(gdjs.GameOverCode.GDPatternUIObjects1[i].getYOffset() + (3));
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDScoreObjects1.length ;i < len;++i) {
    gdjs.GameOverCode.GDScoreObjects1[i].getBehavior("Text").setText(gdjs.evtTools.common.toString(Math.floor(runtimeScene.getScene().getVariables().getFromIndex(0).getAsNumber())));
}
}
}

}


{


let isConditionTrue_0 = false;
{
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Bullet"), gdjs.GameOverCode.GDBulletObjects1);

for (gdjs.GameOverCode.forEachIndex2 = 0;gdjs.GameOverCode.forEachIndex2 < gdjs.GameOverCode.GDBulletObjects1.length;++gdjs.GameOverCode.forEachIndex2) {
gdjs.GameOverCode.GDBulletObjects2.length = 0;


gdjs.GameOverCode.forEachTemporary2 = gdjs.GameOverCode.GDBulletObjects1[gdjs.GameOverCode.forEachIndex2];
gdjs.GameOverCode.GDBulletObjects2.push(gdjs.GameOverCode.forEachTemporary2);
let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(27932004);
}
if (isConditionTrue_0) {
{for(var i = 0, len = gdjs.GameOverCode.GDBulletObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDBulletObjects2[i].getBehavior("RectangleMovement").SetVerticalEdgeDuration(gdjs.randomInRange(1, 2), null);
}
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "k");
if (isConditionTrue_0) {

{ //Subevents
gdjs.GameOverCode.eventsList8(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Bullet"), gdjs.GameOverCode.GDBulletObjects1);

for (gdjs.GameOverCode.forEachIndex2 = 0;gdjs.GameOverCode.forEachIndex2 < gdjs.GameOverCode.GDBulletObjects1.length;++gdjs.GameOverCode.forEachIndex2) {
gdjs.GameOverCode.GDyellow_9595glowObjects2.length = 0;

gdjs.GameOverCode.GDBulletObjects2.length = 0;


gdjs.GameOverCode.forEachTemporary2 = gdjs.GameOverCode.GDBulletObjects1[gdjs.GameOverCode.forEachIndex2];
gdjs.GameOverCode.GDBulletObjects2.push(gdjs.GameOverCode.forEachTemporary2);
let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.GameOverCode.GDBulletObjects2.length;i<l;++i) {
    if ( gdjs.GameOverCode.GDBulletObjects2[i].getBehavior("OnCreate").Function(true, null) ) {
        isConditionTrue_0 = true;
        gdjs.GameOverCode.GDBulletObjects2[k] = gdjs.GameOverCode.GDBulletObjects2[i];
        ++k;
    }
}
gdjs.GameOverCode.GDBulletObjects2.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(27933916);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.object.createObjectOnScene(runtimeScene, gdjs.GameOverCode.mapOfGDgdjs_9546GameOverCode_9546GDyellow_95959595glowObjects2Objects, (( gdjs.GameOverCode.GDBulletObjects2.length === 0 ) ? 0 :gdjs.GameOverCode.GDBulletObjects2[0].getCenterXInScene()), (( gdjs.GameOverCode.GDBulletObjects2.length === 0 ) ? 0 :gdjs.GameOverCode.GDBulletObjects2[0].getCenterYInScene()), "");
}
{for(var i = 0, len = gdjs.GameOverCode.GDyellow_9595glowObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDyellow_9595glowObjects2[i].getBehavior("Opacity").setOpacity(0);
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDyellow_9595glowObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDyellow_9595glowObjects2[i].setZOrder((( gdjs.GameOverCode.GDBulletObjects2.length === 0 ) ? 0 :gdjs.GameOverCode.GDBulletObjects2[0].getZOrder()) - 1);
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDyellow_9595glowObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDyellow_9595glowObjects2[i].getBehavior("Scale").setScale(1.2);
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDyellow_9595glowObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDyellow_9595glowObjects2[i].setBlendMode(3);
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDyellow_9595glowObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDyellow_9595glowObjects2[i].getBehavior("ShakeObject_PositionAngleScale").ShakeObject_PositionAngleScale(2, 0, 0, 0, 100, 2, true, null);
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDyellow_9595glowObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDyellow_9595glowObjects2[i].getBehavior("Sticker").Stick(gdjs.GameOverCode.mapOfGDgdjs_9546GameOverCode_9546GDBulletObjects2Objects, null);
}
}
{for(var i = 0, len = gdjs.GameOverCode.GDyellow_9595glowObjects2.length ;i < len;++i) {
    gdjs.GameOverCode.GDyellow_9595glowObjects2[i].getBehavior("Tween").addObjectOpacityTween2("opa", 255, "easeOutSine", 3, false);
}
}
}
}

}


{


let isConditionTrue_0 = false;
{
}

}


};

gdjs.GameOverCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.GameOverCode.GDRainObjects1.length = 0;
gdjs.GameOverCode.GDRainObjects2.length = 0;
gdjs.GameOverCode.GDRainObjects3.length = 0;
gdjs.GameOverCode.GDRainObjects4.length = 0;
gdjs.GameOverCode.GDRain2Objects1.length = 0;
gdjs.GameOverCode.GDRain2Objects2.length = 0;
gdjs.GameOverCode.GDRain2Objects3.length = 0;
gdjs.GameOverCode.GDRain2Objects4.length = 0;
gdjs.GameOverCode.GDPatternUIObjects1.length = 0;
gdjs.GameOverCode.GDPatternUIObjects2.length = 0;
gdjs.GameOverCode.GDPatternUIObjects3.length = 0;
gdjs.GameOverCode.GDPatternUIObjects4.length = 0;
gdjs.GameOverCode.GDGameOverObjects1.length = 0;
gdjs.GameOverCode.GDGameOverObjects2.length = 0;
gdjs.GameOverCode.GDGameOverObjects3.length = 0;
gdjs.GameOverCode.GDGameOverObjects4.length = 0;
gdjs.GameOverCode.GDScoreObjects1.length = 0;
gdjs.GameOverCode.GDScoreObjects2.length = 0;
gdjs.GameOverCode.GDScoreObjects3.length = 0;
gdjs.GameOverCode.GDScoreObjects4.length = 0;
gdjs.GameOverCode.GDScoreTitleObjects1.length = 0;
gdjs.GameOverCode.GDScoreTitleObjects2.length = 0;
gdjs.GameOverCode.GDScoreTitleObjects3.length = 0;
gdjs.GameOverCode.GDScoreTitleObjects4.length = 0;
gdjs.GameOverCode.GDBulletObjects1.length = 0;
gdjs.GameOverCode.GDBulletObjects2.length = 0;
gdjs.GameOverCode.GDBulletObjects3.length = 0;
gdjs.GameOverCode.GDBulletObjects4.length = 0;
gdjs.GameOverCode.GDPlayerObjects1.length = 0;
gdjs.GameOverCode.GDPlayerObjects2.length = 0;
gdjs.GameOverCode.GDPlayerObjects3.length = 0;
gdjs.GameOverCode.GDPlayerObjects4.length = 0;
gdjs.GameOverCode.GDMaskObjects1.length = 0;
gdjs.GameOverCode.GDMaskObjects2.length = 0;
gdjs.GameOverCode.GDMaskObjects3.length = 0;
gdjs.GameOverCode.GDMaskObjects4.length = 0;
gdjs.GameOverCode.GDyellow_9595glowObjects1.length = 0;
gdjs.GameOverCode.GDyellow_9595glowObjects2.length = 0;
gdjs.GameOverCode.GDyellow_9595glowObjects3.length = 0;
gdjs.GameOverCode.GDyellow_9595glowObjects4.length = 0;

gdjs.GameOverCode.eventsList10(runtimeScene);
gdjs.GameOverCode.GDRainObjects1.length = 0;
gdjs.GameOverCode.GDRainObjects2.length = 0;
gdjs.GameOverCode.GDRainObjects3.length = 0;
gdjs.GameOverCode.GDRainObjects4.length = 0;
gdjs.GameOverCode.GDRain2Objects1.length = 0;
gdjs.GameOverCode.GDRain2Objects2.length = 0;
gdjs.GameOverCode.GDRain2Objects3.length = 0;
gdjs.GameOverCode.GDRain2Objects4.length = 0;
gdjs.GameOverCode.GDPatternUIObjects1.length = 0;
gdjs.GameOverCode.GDPatternUIObjects2.length = 0;
gdjs.GameOverCode.GDPatternUIObjects3.length = 0;
gdjs.GameOverCode.GDPatternUIObjects4.length = 0;
gdjs.GameOverCode.GDGameOverObjects1.length = 0;
gdjs.GameOverCode.GDGameOverObjects2.length = 0;
gdjs.GameOverCode.GDGameOverObjects3.length = 0;
gdjs.GameOverCode.GDGameOverObjects4.length = 0;
gdjs.GameOverCode.GDScoreObjects1.length = 0;
gdjs.GameOverCode.GDScoreObjects2.length = 0;
gdjs.GameOverCode.GDScoreObjects3.length = 0;
gdjs.GameOverCode.GDScoreObjects4.length = 0;
gdjs.GameOverCode.GDScoreTitleObjects1.length = 0;
gdjs.GameOverCode.GDScoreTitleObjects2.length = 0;
gdjs.GameOverCode.GDScoreTitleObjects3.length = 0;
gdjs.GameOverCode.GDScoreTitleObjects4.length = 0;
gdjs.GameOverCode.GDBulletObjects1.length = 0;
gdjs.GameOverCode.GDBulletObjects2.length = 0;
gdjs.GameOverCode.GDBulletObjects3.length = 0;
gdjs.GameOverCode.GDBulletObjects4.length = 0;
gdjs.GameOverCode.GDPlayerObjects1.length = 0;
gdjs.GameOverCode.GDPlayerObjects2.length = 0;
gdjs.GameOverCode.GDPlayerObjects3.length = 0;
gdjs.GameOverCode.GDPlayerObjects4.length = 0;
gdjs.GameOverCode.GDMaskObjects1.length = 0;
gdjs.GameOverCode.GDMaskObjects2.length = 0;
gdjs.GameOverCode.GDMaskObjects3.length = 0;
gdjs.GameOverCode.GDMaskObjects4.length = 0;
gdjs.GameOverCode.GDyellow_9595glowObjects1.length = 0;
gdjs.GameOverCode.GDyellow_9595glowObjects2.length = 0;
gdjs.GameOverCode.GDyellow_9595glowObjects3.length = 0;
gdjs.GameOverCode.GDyellow_9595glowObjects4.length = 0;


return;

}

gdjs['GameOverCode'] = gdjs.GameOverCode;
