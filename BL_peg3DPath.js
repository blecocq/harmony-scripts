/*------------------------------------------------------------------------------------------------------------------------------------------------------------
ToonBoom Harmony script - Peg in 3DPath mode

Description: With a selection, report the pegs in 3Dpath in a message box

Created: Blandine Lecocq 01/03/2023
Updated : 11/02/2024
Tested V22


---------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function BL_peg3dPath()
{
scene.beginUndoRedoAccum("peg3dPath");

var aPeg3dPath = [];

var aNode = selection.selectedNodes();
	for(i=0;i<aNode.length;i++){
		if (node.type(aNode[i])==="PEG"){

			var getAttrNode = node.getTextAttr(aNode[i],frame.current(),"POSITION.SEPARATE");
			var sNodeName = node.getName(aNode[i]);

			

			if (getAttrNode === "Off")
			{ 
				aPeg3dPath.push(sNodeName);	
			}		
		}
	}

var dialogPeg3dPath = new Dialog();
dialogPeg3dPath.title = "Pegs in 3Dpath";
var textDialogPeg3dPath = new Label();

	if (aPeg3dPath.length === 0) 
	{
		textDialogPeg3dPath.text ="No peg in 3Dpath";
	}
	else
	{
	textDialogPeg3dPath.text =aPeg3dPath +" are in 3Dpath";
	}
dialogPeg3dPath.add(textDialogPeg3dPath);
dialogPeg3dPath.exec();


scene.endUndoRedoAccum("peg3dPath");

}
