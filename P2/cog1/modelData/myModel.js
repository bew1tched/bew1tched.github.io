/**
 * 3D Data Store for a model.
 * Missing properties/arrays (commented out)
 * are mixed in from data module.
 *
 * @namespace cog1.data
 * @module myModel
 */
define(["exports", "data"], function(exports, data) {
	"use strict";

	/**
	 * Create an instance of the model defined in this module.
	 *
	 * @parameter object with fields:
	 * @parameter scale is the edge length of the cube.
	 * @returns instance of this model.
	 */
	exports.create = function(parameter) {

		let color;
		let scale;
		if(parameter) {
			scale = parameter.scale;
			color = parameter.color;
		}
		// Set default values if parameter is undefined.
		if(scale === undefined){
			scale = 200;
		}
		if(color === undefined) {
			color = 8;
		}


		// Instance of the model to be returned.
		const instance = {};

		// Vertex indices:
		//   7----6
		//	/|   /|
		// 4----5 |
		// | 3--|-2
		// |/   |/
		// 0----1
		instance.vertices = [
			// bottom (y=-1)
			[-1,-1, 1],
			[ 1,-1, 1],
			[ 1,-1,-1],
			[-1,-1,-1],
			// top (y=+1)
			[-1,1, 1],
			[ 1,1, 1],
			[ 1,1,-1],
			[-1,1,-1],
			[0,2,0]
		];
		// Use default colors, implicitly.
		// instance.colors = data.colors;

		// Corners of the faces have to fit the texture coordinates.
		// Faces: bottom/down, top/up, front, right, back, left.
		instance.polygonVertices = [
			[3,2,1,0],
			[4,5,6,7],
			[4,0,1,5],
			[1,2,6,5],
			[6,2,3,7],
			[3,0,4,7],

			// x in walls
			[5,0,7,2,5],
			[4,1,6,3,4],
			// roof
			[4,8,5],
			[7,8,6]



		];

		instance.polygonColors = [0,1,2,3,4,5];

		data.applyScale.call(instance, scale);
		data.setColorForAllPolygons.call(instance, color);

		return instance;
	};
});