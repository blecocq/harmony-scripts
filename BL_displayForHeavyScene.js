/*------------------------------------------------------------------------------------------------------------------------------------------------------------
ToonBoom Harmony script - Create display for heavy scene

Description: With this script, you can add a display to isolate some puppet, bgs... for heavy scene
Created: Blandine Lecocq 18/04/2020
Update: 22/03/2023
Tested in Harmony V22
---------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function BL_displayForHeavyScene() 
{ 

scene.beginUndoRedoAccum("BL_displayForHeavyScene");

  var aSelNodes = selection.selectedNodes(); 
  var aPosXSelNodes = [];
  var aPosYSelNodes = [];

  for (var i = 0; i<aSelNodes.length; i++ ) 
  {
   	//keep coord of nodes in your array
		var posXSelNode = aPosXSelNodes.push(node.coordX(aSelNodes[i]));
		var posYSelNode = aPosYSelNodes.push(node.coordY(aSelNodes[i]));  
	
  }

 // keep your max value for coord of your selection 
	var posXSelNodeMax = Math.max.apply(Math,aPosXSelNodes);
	var posYSelNodeMax = Math.max.apply(Math,aPosYSelNodes);
	

	if (aSelNodes.length>0){
		//create a composite pass through
		var composite = node.add(node.parentNode(aSelNodes[0]),"Composite_Isolate","COMPOSITE",posXSelNodeMax+200,posYSelNodeMax+200,0);
		var posXComp = node.coordX(composite);
		var posYComp = node.coordY(composite);

		node.setTextAttr( composite, "compositeMode", 1, "compositePassthrough");


		//create a display attached to the composite
		var displayName = "DisplayIsolate";
		var display = node.add(node.parentNode(aSelNodes[0]),displayName,"DISPLAY",posXComp-50,posYComp+80,0);
		//name of your display if it already exists
		x=1;
		while (display==false)
		{
			display = node.add(node.parentNode(aSelNodes[0]),(displayName+"_"+x),"DISPLAY",posXComp-50,posYComp+80,0);
			x++;
		}
		node.link(composite, 0, display, 0);

		//create a backdrop around these elements
		var deleteBackdrop =
			{
 			"position"    : {"x": posXComp-60, "y" :posYComp-10, "w":250, "h":120},
 			"title"       : {"text" : "DELETE", "color" : fromRGBAtoInt(255, 100, 100, 255), "size" : 14, "font" : "Arial"},
			"description" : {"text" : "\n", "color" : fromRGBAtoInt(100, 255, 100, 255), "size" : 14, "font" : "Arial"},
  			"color"       : fromRGBAtoInt(78, 247, 185, 255)
			};
		Backdrop.addBackdrop(node.parentNode(composite), deleteBackdrop);	

    	for(var n = 0; n < aSelNodes.length; n++){ 
    		var currentNode = aSelNodes[n]; 
				//link the selection to the composite created
				node.link(currentNode, 0, composite, 0);
			}
			var displayValue= node.setAsGlobalDisplay(display);	
	}else{
			MessageBox.information("select nodes to isolate them");
	

	}


scene.endUndoRedoAccum();
}

//-------------------------------------- functions for this script ---------------------------------------------

function fromRGBAtoInt(r, g, b, a)  // function for the backdrop's color
{
  return ((a & 0xff) << 24) | ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
}

