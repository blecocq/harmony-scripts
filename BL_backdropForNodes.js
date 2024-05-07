/*------------------------------------------------------------------------------------------------------------------------------------------------------------
ToonBoom Harmony script - backdrop for nodes

Description: depending on  selected elements, create a backdrop to signal a particular node (with name and good color)
- Peg : for peg locked except in Zdepth : purple
- Static transformation : orange
- Colour override and colour selector : yellow

Created: Blandine Lecocq 20/04/2020
Tested in Harmony V20, V22
---------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function BL_backdropForNodes()
{
// choose colours of your specific backdrops
	var colorBackdropPeg = fromRGBAtoInt(108, 14, 156, 255);
	var colorBackdropStatic = fromRGBAtoInt(225, 107, 20, 255);
	var colorBackdropColors = fromRGBAtoInt(220, 170, 50, 255);


// undo the entire list of operations in one action
scene.beginUndoRedoAccum("BL_backdropForNodes"); 

var aSelNodes = selection.selectedNodes();

for( i=0;i<aSelNodes.length;i++)
	{
	var oSelNode = aSelNodes[i];
	var parentSelNode = node.parentNode(oSelNode);
	var selNodeName = node.getName(oSelNode);
	var posXoSelNode = node.coordX(oSelNode); 
	var posYoSelNode = node.coordY(oSelNode);  
	var widthOSelNode = node.width(oSelNode);

	// default settings for backdrops created
	var selBackdrop =
		{
 		"position"    : {"x": posXoSelNode-20, "y" :posYoSelNode-35, "w":widthOSelNode+40, "h":100},
 		"title"       : {"text" : "", "color" : fromRGBAtoInt(255, 100, 100, 255), "size" : 14, "font" : "Arial"},
		"description" : {"text" : "\n", "color" : fromRGBAtoInt(100, 255, 100, 255), "size" : 14, "font" : "Arial"},
  			"color"       : fromRGBAtoInt(50, 50, 50, 255)
		}
if ( node.type(oSelNode)=="PEG") //create Backdrop for PEGS locked
		{
			selBackdrop.title.text ="Z ONLY";
			selBackdrop.color = colorBackdropPeg;
			Backdrop.addBackdrop(parentSelNode, selBackdrop);	
	
		}
	else if ( node.type(oSelNode)=="StaticConstraint") //create Backdrop for STATIC TRANSFORMATION
		{

					selBackdrop.title.text ="STATIC";
					selBackdrop.color = colorBackdropStatic;
					Backdrop.addBackdrop(parentSelNode, selBackdrop);

		}
	else if ( node.type(oSelNode)=="COLOR_OVERRIDE_TVG" || node.type(oSelNode)=="TbdColorSelector") //create Backdrop for COLOUR NODES
		{
					selBackdrop.title.text ="COLOR CHANGE";
					selBackdrop.color = colorBackdropColors;
					Backdrop.addBackdrop(parentSelNode, selBackdrop);	
		}

	else // if others nodes are selected
		{	
			MessageBox.information("selection are not PEGS, STATICS, COLOURS  OVERRIDES, or COLOUR-SELECTORS ");
		}

	}
 scene.endUndoRedoAccum(); 
}

//-------------------------------------- functions for this script ---------------------------------------------

function fromRGBAtoInt(r, g, b, a)  // function for the backdrop's color
{
  return ((a & 0xff) << 24) | ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
}
