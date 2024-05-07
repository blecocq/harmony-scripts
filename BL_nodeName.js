/*------------------------------------------------------------------------------------------------------------------------------------------------------------
ToonBoom Harmony script - node name

Description: Create nodes with the name of the node selected.
Works with many nodes
Created: Blandine Lecocq 27/01/2023
Updated : 07/01/2024
Tested V22
---------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function BL_nodeName()
{
scene.beginUndoRedoAccum(BL_nodeName);

/*--------------------------- Dialog box creation ----------------------------*/

var dialogNodeName = new Dialog();
	dialogNodeName.title = "Node Name";

var groupBoxArtLayer = new GroupBox();
groupBoxArtLayer.title = "art layer node";
dialogNodeName.add(groupBoxArtLayer);

	groupBoxArtLayer.addSpace( 15 );

	var userInputOL = new CheckBox();
	userInputOL.text = "Overlay node";
	groupBoxArtLayer.add( userInputOL );

	var userInputLA = new CheckBox();
	userInputLA.text = "Line-art node";
	groupBoxArtLayer.add( userInputLA );

	var userInputCA = new CheckBox();
	userInputCA.text = "Colour-art node";
	groupBoxArtLayer.add( userInputCA );

	var userInputUL = new CheckBox();
	userInputUL.text = "Underlay node";
	groupBoxArtLayer.add( userInputUL );

	groupBoxArtLayer.addSpace( 15 );
	var userInputLS = new CheckBox();
	userInputLS.text = "Layer selector node";
	groupBoxArtLayer.add( userInputLS );

	groupBoxArtLayer.addSpace( 15 );

	var userInputAP = new CheckBox();
	userInputAP.text = "Autopatch node";
	groupBoxArtLayer.add( userInputAP );

dialogNodeName.addSpace( 15 );
dialogNodeName.newColumn();

var groupBoxVariousLayer = new GroupBox();
groupBoxVariousLayer.title = "various node";
dialogNodeName.add(groupBoxVariousLayer);


	var userInputCompPassThrough = new CheckBox();
	userInputCompPassThrough.text = "Composite passthough node";
	groupBoxVariousLayer.add( userInputCompPassThrough );

	var userInputCompBitmap = new CheckBox();
	userInputCompBitmap.text = "Composite bitmap node";
	groupBoxVariousLayer.add( userInputCompBitmap );

	groupBoxVariousLayer.addSpace( 15 );


	var userInputCutter = new CheckBox();
	userInputCutter.text = "Cutter node";
	groupBoxVariousLayer.add( userInputCutter );

	var userInputInvCutter = new CheckBox();
	userInputInvCutter.text = "Inverse Cutter node";
	groupBoxVariousLayer.add( userInputInvCutter );

	groupBoxVariousLayer.addSpace( 15 );

	var userInputStatic = new CheckBox();
	userInputStatic.text = "Static node";
	groupBoxVariousLayer.add( userInputStatic );

	var userInputKinematic = new CheckBox();
	userInputKinematic.text = "Kinematic node";
	groupBoxVariousLayer.add( userInputKinematic );


/*--------------------------- nodes creation ----------------------------*/

	if (dialogNodeName.exec())
	{
		var aNode = selection.selectedNodes();
		for( i=0;i<aNode.length;i++)
		{
			if (node.type(aNode[i])=="READ")
			{
				var aNodeName = node.getName(aNode[i]);
				var aNodePath = node.parentNode(aNode[i]);
				var aNodeCoordX = node.coordX(aNode[i]);
				var aNodeCoordY = node.coordY(aNode[i]);
				var aNodeWidth = node.width(aNode[i]);	
				var newNodeWidth = "";


				if (userInputCompPassThrough.checked)
				{
					var compPassthroughNodeId = node.add(aNodePath,"Comp_"+aNodeName,"COMPOSITE",aNodeCoordX,aNodeCoordY+200,0);
					var changeCompPassthroughAttr = node.setTextAttr (compPassthroughNodeId,"compositeMode",1,"compositePassthrgough"); 
					var compPassthroughNodeWidth = node.width(compPassthroughNodeId);
					var compPassthroughNodeCoordX = node.coordX(compPassthroughNodeId);
					var compPassthroughNodeCoordY = node.coordY(compPassthroughNodeId);
					node.setCoord(compPassthroughNodeId,(aNodeCoordX+(aNodeWidth/2))-(compPassthroughNodeWidth/2),compPassthroughNodeCoordY);

				}
				if (userInputCompBitmap.checked)
				{
					var compBitmapNodeId = node.add(aNodePath,"Comp_"+aNodeName,"COMPOSITE",aNodeCoordX,aNodeCoordY+200,0);
					var changeCompBitmapAttr = node.setTextAttr (compBitmapNodeId,"compositeMode",1,"compositeBitmap"); 
					var compBitmapNodeWidth = node.width(compBitmapNodeId);
					var compBitmapNodeCoordX = node.coordX(compBitmapNodeId);
					var compBitmapNodeCoordY = node.coordY(compBitmapNodeId);
					node.setCoord(compBitmapNodeId,(aNodeCoordX+(aNodeWidth/2))-(compBitmapNodeWidth/2),compPassthroughNodeCoordY);
				}
				if (userInputCutter.checked)
				{
					var createcutterNodeId = node.add(aNodePath,"Cut_"+aNodeName,"CUTTER",aNodeCoordX,aNodeCoordY+150,0);
					var changeCutterAttr = node.setTextAttr(createcutterNodeId,"inverted",1,"N");
				}
				if (userInputInvCutter.checked)
				{
					var invCutterNodeId = node.add(aNodePath,"InvCut_"+aNodeName,"CUTTER",aNodeCoordX,aNodeCoordY+150,0);
					var changeInvCutterAttr = node.setTextAttr(invCutterNodeId,"inverted",1,"Y");
				}
				if (userInputStatic.checked)
				{
					var staticNodeId = node.add(aNodePath,"Static_"+aNodeName,"StaticConstraint",aNodeCoordX,aNodeCoordY-150,0);
				}

				if (userInputKinematic.checked)
				{
					var kinematicNodeId = node.add(aNodePath,"KO_"+aNodeName,"KinematicOutputModule",aNodeCoordX,aNodeCoordY-150,0);
				}



				if (userInputLS.checked)
				{
					var LSNodeId = node.add(aNodePath,"LS_"+aNodeName,"LAYER_SELECTOR",aNodeCoordX,aNodeCoordY+100,0);
					var linkNode = node.link(aNode[i],0,LSNodeId,0);
					var LSNodeWidth = node.width(LSNodeId);
					var LSNodeCoordX = node.coordX(LSNodeId);
					var LSNodeCoordY = node.coordY(LSNodeId);
					node.setCoord(LSNodeId,(aNodeCoordX+(aNodeWidth/2))-(LSNodeWidth/2),LSNodeCoordY);

					newNodeWidth = node.width(LSNodeId);
					aNodeCoordX=aNodeCoordX+newNodeWidth+10;
				}				

				if (userInputOL.checked)
				{
					var OLNodeId = node.add(aNodePath,"OL_"+aNodeName,"OVERLAY",aNodeCoordX,aNodeCoordY+100,0);
					var linkNode = node.link(aNode[i],0,OLNodeId,0);
					newNodeWidth = node.width(OLNodeId);
					aNodeCoordX=aNodeCoordX+newNodeWidth+10;
				}
				if (userInputLA.checked)
				{
					var LANodeId = node.add(aNodePath,"LA_"+aNodeName,"LINE_ART",aNodeCoordX,aNodeCoordY+100,0); 
					var linkNode = node.link(aNode[i],0,LANodeId,0);
					newNodeWidth = node.width(LANodeId);
					aNodeCoordX=aNodeCoordX+newNodeWidth+10;
				}				
				if (userInputCA.checked)	
				{
					var CANodeId = node.add(aNodePath,"CA_"+aNodeName,"COLOR_ART",aNodeCoordX,aNodeCoordY+100,0);
					var linkNode = node.link(aNode[i],0,CANodeId,0);
					newNodeWidth = node.width(CANodeId);
					aNodeCoordX=aNodeCoordX+newNodeWidth+10;

				}
				if (userInputUL.checked)
				{
					var ULNodeId = node.add(aNodePath,"UL_"+aNodeName,"UNDERLAY",aNodeCoordX,aNodeCoordY+100,0);
					var linkNode = node.link(aNode[i],0,ULNodeId,0);
					newNodeWidth = node.width(ULNodeId);
					aNodeCoordX=aNodeCoordX+newNodeWidth+10;
				}
				
				if (userInputAP.checked)
				{
					var APNodeId = node.add(aNodePath,"AP_"+aNodeName,"AutoPatchModule",aNodeCoordX,aNodeCoordY+100,0);
					var linkNode = node.link(aNode[i],0,APNodeId,0);
					newNodeWidth = node.width(APNodeId);
					aNodeCoordX=aNodeCoordX+newNodeWidth+10;
				}

			}else{
				MessageBox.information("select one or several drawings ");
			}
		}			
	}

scene.endUndoRedoAccum();
}





