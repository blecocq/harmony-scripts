/*------------------------------------------------------------------------------------------------------------------------------------------------------------
ToonBoom Harmony script - drawing pivot to peg pivot

Description: transform a drawing pivot in pivot peg
Created: Blandine Lecocq 07/04/2023

Tested in Harmony V22
---------------------------------------------------------------------------------------------------------------------------------------------------------------*/


function BL_drawingPivotToPegPivot()
{
	scene.beginUndoRedoAccum("BL_drawingPivotToPegPivot");

	var aNode = selection.selectedNodes();
	for( i=0;i<aNode.length;i++)
	{
		if (node.type(aNode[i])=="READ")
		{
// get pivot to your drawing node and change the attribute pivot into "apply Embedded Pivot on Drawing Layer"			
			var nodeName = node.getName(aNode[i]);
			var nodeAttr = node.getTextAttr(aNode[i],frame.current(),"USE_DRAWING_PIVOT");

			var drawingPivotAttr = node.setTextAttr(aNode[i],"USE_DRAWING_PIVOT",frame.current(),"APPLY_ON_READ_TRANSFORM");

			var oNodePivot = node.getPivot(aNode[i],frame.current());
//reset the attribute pivot of the selected node drawing
			node.setTextAttr(aNode[i],"USE_DRAWING_PIVOT",frame.current(),nodeAttr);

			
//find the first peg attached to the selected drawing node
			var srcNode = node.srcNode(aNode[i],0);
			while (node.type(srcNode )!=="PEG")
			{
				newSrcNode = node.srcNode(srcNode,0);
				srcNode = newSrcNode;
			}
//paste your drawing pivot in your peg pivot 
			var nodeSrcName = node.getName(srcNode);
			var srcNodePivotX = node.setTextAttr( srcNode, "PIVOT.X", frame.current(), oNodePivot.x);  
			var srcNodePivotY = node.setTextAttr( srcNode, "PIVOT.Y", frame.current(), oNodePivot.y);      

//change the attribute pivot with the old attribute pivot

		}else
		{
			MessageBox.information("Select drawings node");
		}			
	}

	scene.endUndoRedoAccum();
}