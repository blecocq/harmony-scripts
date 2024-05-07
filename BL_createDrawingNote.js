/*------------------------------------------------------------------------------------------------------------------------------------------------------------
ToonBoom Harmony script - Create Drawing Note

Description: Use "BL_createDrawingNote" to quickly create a drawing for rough or layout information attached to the composite you choosed. 
Created: Blandine Lecocq 30/09/2019
Update: 25/05/2023 > choose to add a colour card 

Tested in Harmony V17,V22
---------------------------------------------------------------------------------------------------------------------------------------------------------------*/


function BL_createDrawingNote()

{

scene.beginUndoRedoAccum("BL_createDrawingNote"); // undo the entire list of operations in one action

var selNode = selection.selectedNodes();
if (selNode.length==1 && node.type(selNode[0])=="COMPOSITE"){

	var selNodeParent = node.parentNode(selNode[0]);
	var selNodeCoordX = node.coordX(selNode[0]);
	var selNodeCoordY = node.coordY(selNode[0]);

//dialog box
	var notesDialog = new Dialog();
		notesDialog.title = "create drawing notes";

		var userChoose = new ComboBox();
		userChoose.label = "Create Drawing Notes for";
		userChoose.itemList = ["Notes","Layout","Rough","Rtks"];

		var checkColourCard = new CheckBox();
		checkColourCard.text = "colour-card ? ";

		notesDialog.add(userChoose);
		notesDialog.add(checkColourCard);

			if (notesDialog.exec()){


				// Create a drawing offset from the selected composite
				var nameElementNode =userChoose.currentItem+"_";
				var newNameElementNode = nameElementNode+(getMaxIncColumn(nameElementNode)+1);
				var elementNode = element.add(newNameElementNode,"BW",scene.numberOfUnitsZ(),"SCAN","TVG");
				column.add(newNameElementNode,"DRAWING");
				column.setElementIdOfDrawing (newNameElementNode,elementNode);

				var drawingNode = node.add(selNodeParent,newNameElementNode,"READ",selNodeCoordX-500,selNodeCoordY-200,0);
				node.linkAttr(drawingNode, "DRAWING.ELEMENT", newNameElementNode);	
				node.setTextAttr( drawingNode, "canAnimate", frame.current(), "N" );    


				

				//change colour of your drawing node
				switch (userChoose.currentItem){
					case "Notes":
						var nodeColor = new ColorRGBA(165,33,163,255);
						break;
					case "Layout":
						var nodeColor = new ColorRGBA(108,14,156,255);
						break;
					case "Rough":
						var nodeColor = new ColorRGBA(13,107,88,255);
						break;
					case "Rtks":
						var nodeColor = new ColorRGBA(227,15,160,255);
						break;
					default:	
						var nodeColor =node.resetColor(drawingName);
				}

				var drawingColor = node.setColor(drawingNode,nodeColor);

				var drawingName = node.getName(drawingNode);
				var drawingCoordX = node.coordX(drawingNode);
				var drawingCoordY = node.coordY(drawingNode);
				var drawingWidth = node.width(drawingNode);
				var drawingHeight = node.height(drawingNode);
				var centerCoordX = drawingCoordX+(node.width(drawingNode)/2);

				// create colour card if "checkColourCard" is checked

				if (checkColourCard.checked){
					var colourCardNode = node.add(selNodeParent,"CC_"+drawingName,"COLOR_CARD",drawingCoordX+drawingWidth+30,drawingCoordY+drawingHeight,0);	
					node.setTextAttr(colourCardNode,"COLOR.ALPHA",frame.current(),100);

					var colourCardCoordX = node.coordX(colourCardNode);
					var colourCardWidth = node.width(colourCardNode);

					var centerCoordX = drawingCoordX+((colourCardCoordX+colourCardWidth-drawingCoordX)/2);

					var drawingWidth = drawingWidth+30+colourCardWidth;

				}

				//Create a composite centered on the drawing and/or color card created

				var compNode = node.add(selNodeParent,"Comp_"+drawingName,"COMPOSITE",drawingCoordX,drawingCoordY+100,0);
				var RBchecked = "compositePassthrough";
				node.setTextAttr( compNode, "compositeMode",frame.current(), RBchecked );
				var compCoordX = node.coordX(compNode);
				var compCoordY = node.coordY(compNode);
				var compCenterX =node.width(compNode)/2;
				var centerComp = centerCoordX-compCenterX;
				node.setCoord(compNode,centerCoordX-compCenterX,compCoordY);

				// Create a peg centered on the drawing and/or color card created
	
				var pegNode = node.add( selNodeParent,drawingName+"-P","PEG", drawingCoordX,drawingCoordY-50,0);
		
				var pegCoordX = node.coordX(pegNode);
				var pegCoordY = node.coordY(pegNode);
				var pegCenterX = node.width(pegNode)/2;
				node.setCoord(pegNode,centerCoordX-pegCenterX,pegCoordY);



				//link the different nodes created
				node.link(compNode,0,selNode,0);
				node.link(drawingNode,0,compNode,0);
				node.link(pegNode,0,drawingNode,0);	
				node.link(colourCardNode,0,compNode,0);
				node.link(pegNode,0,colourCardNode,0);
	
				//create Backdrop around your nodes
				var notesBackdrop = defaultBackdrop();
				notesBackdrop.title.text = userChoose.currentItem; 
				notesBackdrop.position ={"x": drawingCoordX-30, "y" :pegCoordY-20, "w":drawingWidth+60, "h":220};
				switch (userChoose.currentItem){
					case "Notes":
						notesBackdrop.color = fromRGBAtoInt(165, 33, 163, 255);
						break;
					case "Layout":
						notesBackdrop.color = fromRGBAtoInt(108, 14, 156, 255);
						break;
					case "Rough":
						notesBackdrop.color = fromRGBAtoInt(13, 107, 88, 255);
						break;
					case "Rtks":
						notesBackdrop.color = fromRGBAtoInt(227, 15, 160, 255);
						break;
					default:	
						notesBackdrop.color = fromRGBAtoInt(50, 50,50, 255);
				}


		Backdrop.addBackdrop(selNodeParent, notesBackdrop);	
		

			}


	}else{
		MessageBox.information("select one composite to link the note module");
	}


scene.endUndoRedoAccum(); 
}


//-------------------------------------- functions for this script ---------------------------------------------


function defaultBackdrop()	// default settings for backdrops created
{

var notesBackdrop =
	{
 	"position"    : {"x": 0, "y" :0, "w":0, "h":100},
 	"title"       : {"text" : "", "color" : fromRGBAtoInt(255, 100, 100, 255), "size" : 14, "font" : "Arial"},
	"description" : {"text" : "\n", "color" : fromRGBAtoInt(100, 255, 100, 255), "size" : 14, "font" : "Arial"},
  	"color"       : fromRGBAtoInt(50, 50, 50, 255)
	};
return notesBackdrop;
}


function fromRGBAtoInt(r, g, b, a)  // function for the backdrop's color
{
  return ((a & 0xff) << 24) | ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
}



function getMaxIncColumn(in_sName) // Get max incrementation of column
{
	iNbColumn = column.numberOf();
	var iMax = 0;
	for(i=0;i<iNbColumn;i++){
		sColumnName = column.getDisplayName(column.getName(i));
		if (sColumnName.search(in_sName) != -1 && (sColumnName.split(in_sName)[0]).length == 0 ){
			sInc = parseInt(sColumnName.split("_")[1],0);
			if (sInc>iMax){
				iMax=sInc;
			}	
		}
	}
	return iMax;
}






