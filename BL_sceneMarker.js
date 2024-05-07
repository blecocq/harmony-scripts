/*------------------------------------------------------------------------------------------------------------------------------------------------------------
ToonBoom Harmony script - Scene Markers

Description: create or delete scene markers for character's rigg scene 
Created: Blandine Lecocq 20/10/2021
Updated: 22/11/2022
Tested in Harmony V22
---------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function BL_createSceneMarkers()
{

scene.beginUndoRedoAccum("BL_createSceneMarkers");

//timing of your markers, color and length
var aView = [1,50,100,150,200] , colorView = "purple", lengthView = "0";
var aBlink = [3,52,102] , colorBlink = "cyan", lengthBlink ="10";
var aExpression = [20,70,120] , colorExpression = "Pink", lengthExpression ="7";
var alips = [30,80,130] , colorLips = "yellow", lengthLips ="8";
var aEmptyDrawing = [250], colorEmptyDrawing = "white", lengthEmptyDrawing = "0";


	

	//view markers
	for (i=0; i<aView.length; i++)
	{
		var aCurrentMarker = TimelineMarker.getMarkersAtFrame(aView[i]);		
		if (aCurrentMarker.length===0){
				var viewMarker = {frame:aView[i], length:lengthView, color:colorView};
				TimelineMarker.createMarker(viewMarker);
			}
	}
	//blink markers
	for (i=0; i<aBlink.length; i++)
	{
		var aCurrentMarker = TimelineMarker.getMarkersAtFrame(aBlink[i]);	
		if (aCurrentMarker.length===0){
				var blinkMarker = {frame:aBlink[i], length:lengthBlink, color:colorBlink};
				TimelineMarker.createMarker(blinkMarker);
			}
	}
	//expression markers
	for (i=0; i<aExpression.length; i++)
	{
		var aCurrentMarker = TimelineMarker.getMarkersAtFrame(aExpression[i]);	
		if (aCurrentMarker.length===0){
				var expressionMarker = {frame:aExpression[i], length:lengthExpression, color:colorExpression};
				TimelineMarker.createMarker(expressionMarker);
			}
	}
	//lips markers
	for (i=0; i<alips.length; i++)
	{
		var aCurrentMarker = TimelineMarker.getMarkersAtFrame(alips[i]);	
		if (aCurrentMarker.length===0){
				var lipsMarker = {frame:alips[i], length:lengthLips, color:colorLips};
				TimelineMarker.createMarker(lipsMarker);
			}
	}
	//empty drawing markers
	for (i=0; i<aEmptyDrawing.length; i++)
	{

		var aCurrentMarker = TimelineMarker.getMarkersAtFrame(aEmptyDrawing[i]);	
		if (aCurrentMarker.length===0){
				var emptyDrawingMarker = {frame:aEmptyDrawing[i], length:lengthEmptyDrawing, color:colorEmptyDrawing};
				TimelineMarker.createMarker(emptyDrawingMarker);
			}
	}	
scene.endUndoRedoAccum();

}



function BL_deleteSceneMarkers()
{
var aAllMarkers = TimelineMarker.getAllMarkers();

	for (i=0; i<aAllMarkers.length; i++)
	{
		TimelineMarker.deleteMarker(aAllMarkers[i]);
	}
}