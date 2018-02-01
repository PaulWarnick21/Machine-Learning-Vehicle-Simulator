var nodeObject = require('./nodeObject.js');
var nodeArray = new Array();
function readNodeFile(){
	var fs = require('fs');
	var file = "./map/SiouxFalls_node.tntp";
	var lines = fs.readFileSync(file).toString();
  var line = lines.split("\n");
	for(var i = 0; i < line.length; i++){
		var word = line[i].split("\t");
		// console.log(word);
		var nodeId = word[0];
		var x = word[1];
		var y = word[2];
		if(word[0] != "Node" && word[0] != ''){
			var node = new nodeObject(nodeId, x, y);
			// console.log(node);
			nodeArray.push(node);
		}
	}
	// return nodeArray;
}
function orientationOfEdge(node1, node2){
	// console.log(node1);
	return nodeArray[node1];
}

module.exports = class edgeObject{
  constructor(edgeId, startNodeId, endNodeId, capacity, length, freeFlowTime, b, power, speedLimit, toll, type){
		this.edgeId = edgeId;
		this.startNodeId = startNodeId;
		this.endNodeId = endNodeId;
		this.capacity = capacity;
		this.length = length;
		this.freeFlowTime = freeFlowTime;
		this.b = b;
		this.power = power;
		this.speedLimit = speedLimit;
		this.toll = toll;
		this.type = type;
		if(nodeArray.length < 1){
			readNodeFile();
		}
		this._orientation = orientationOfEdge(this.startNodeId, this.endNodeId);
		// console.log(this._orientation);

  }

	get orientation(){
		// this._orientation = orientationOfEdge(this.startNodeId, this.endNodeId);
		return this._orientation;
	}
}
