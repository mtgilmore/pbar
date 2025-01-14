(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.sourcemapCodec = {}));
}(this, function (exports) { 'use strict';

	var charToInteger = {};
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	for (var i = 0; i < chars.length; i++) {
	    charToInteger[chars.charCodeAt(i)] = i;
	}
	function decode(mappings) {
	    var generatedCodeColumn = 0; // first field
	    var sourceFileIndex = 0; // second field
	    var sourceCodeLine = 0; // third field
	    var sourceCodeColumn = 0; // fourth field
	    var nameIndex = 0; // fifth field
	    var decoded = [];
	    var line = [];
	    var segment = [];
	    for (var i = 0, j = 0, shift = 0, value = 0, len = mappings.length; i < len; i++) {
	        var c = mappings.charCodeAt(i);
	        if (c === 44) { // ","
	            if (segment.length)
	                line.push(segment);
	            segment = [];
	            j = 0;
	        }
	        else if (c === 59) { // ";"
	            if (segment.length)
	                line.push(segment);
	            segment = [];
	            j = 0;
	            decoded.push(line);
	            line = [];
	            generatedCodeColumn = 0;
	        }
	        else {
	            var integer = charToInteger[c];
	            if (integer === undefined) {
	                throw new Error('Invalid character (' + String.fromCharCode(c) + ')');
	            }
	            var hasContinuationBit = integer & 32;
	            integer &= 31;
	            value += integer << shift;
	            if (hasContinuationBit) {
	                shift += 5;
	            }
	            else {
	                var shouldNegate = value & 1;
	                value >>>= 1;
	                if (shouldNegate) {
	                    value = -value;
	                    if (value === 0)
	                        value = -0x80000000;
	                }
	                if (j == 0) {
	                    generatedCodeColumn += value;
	                    segment.push(generatedCodeColumn);
	                }
	                else if (j === 1) {
	                    sourceFileIndex += value;
	                    segment.push(sourceFileIndex);
	                }
	                else if (j === 2) {
	                    sourceCodeLine += value;
	                    segment.push(sourceCodeLine);
	                }
	                else if (j === 3) {
	                    sourceCodeColumn += value;
	                    segment.push(sourceCodeColumn);
	                }
	                else if (j === 4) {
	                    nameIndex += value;
	                    segment.push(nameIndex);
	                }
	                j++;
	                value = shift = 0; // reset
	            }
	        }
	    }
	    if (segment.length)
	        line.push(segment);
	    decoded.push(line);
	    return decoded;
	}
	function encode(decoded) {
	    var sourceFileIndex = 0; // second field
	    var sourceCodeLine = 0; // third field
	    var sourceCodeColumn = 0; // fourth field
	    var nameIndex = 0; // fifth field
	    var mappings = '';
	    for (var i = 0; i < decoded.length; i++) {
	        var line = decoded[i];
	        if (i > 0)
	            mappings += ';';
	        if (line.length === 0)
	            continue;
	        var generatedCodeColumn = 0; // first field
	        var lineMappings = [];
	        for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
	            var segment = line_1[_i];
	            var segmentMappings = encodeInteger(segment[0] - generatedCodeColumn);
	            generatedCodeColumn = segment[0];
	            if (segment.length > 1) {
	                segmentMappings +=
	                    encodeInteger(segment[1] - sourceFileIndex) +
	                        encodeInteger(segment[2] - sourceCodeLine) +
	                        encodeInteger(segment[3] - sourceCodeColumn);
	                sourceFileIndex = segment[1];
	                sourceCodeLine = segment[2];
	                sourceCodeColumn = segment[3];
	            }
	            if (segment.length === 5) {
	                segmentMappings += encodeInteger(segment[4] - nameIndex);
	                nameIndex = segment[4];
	            }
	            lineMappings.push(segmentMappings);
	        }
	        mappings += lineMappings.join(',');
	    }
	    return mappings;
	}
	function encodeInteger(num) {
	    var result = '';
	    num = num < 0 ? (-num << 1) | 1 : num << 1;
	    do {
	        var clamped = num & 31;
	        num >>>= 5;
	        if (num > 0) {
	            clamped |= 32;
	        }
	        result += chars[clamped];
	    } while (num > 0);
	    return result;
	}

	exports.decode = decode;
	exports.encode = encode;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=sourcemap-codec.umd.js.map
