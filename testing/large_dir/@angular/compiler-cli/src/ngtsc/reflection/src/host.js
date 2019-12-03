/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngtsc/reflection/src/host", ["require", "exports", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ts = require("typescript");
    function isDecoratorIdentifier(exp) {
        return ts.isIdentifier(exp) ||
            ts.isPropertyAccessExpression(exp) && ts.isIdentifier(exp.expression);
    }
    exports.isDecoratorIdentifier = isDecoratorIdentifier;
    /**
     * An enumeration of possible kinds of class members.
     */
    var ClassMemberKind;
    (function (ClassMemberKind) {
        ClassMemberKind[ClassMemberKind["Constructor"] = 0] = "Constructor";
        ClassMemberKind[ClassMemberKind["Getter"] = 1] = "Getter";
        ClassMemberKind[ClassMemberKind["Setter"] = 2] = "Setter";
        ClassMemberKind[ClassMemberKind["Property"] = 3] = "Property";
        ClassMemberKind[ClassMemberKind["Method"] = 4] = "Method";
    })(ClassMemberKind = exports.ClassMemberKind || (exports.ClassMemberKind = {}));
    /**
     * Possible functions from TypeScript's helper library.
     */
    var TsHelperFn;
    (function (TsHelperFn) {
        /**
         * Indicates the `__spread` function.
         */
        TsHelperFn[TsHelperFn["Spread"] = 0] = "Spread";
    })(TsHelperFn = exports.TsHelperFn || (exports.TsHelperFn = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvcmVmbGVjdGlvbi9zcmMvaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILCtCQUFpQztJQTBDakMsU0FBZ0IscUJBQXFCLENBQUMsR0FBa0I7UUFDdEQsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztZQUN2QixFQUFFLENBQUMsMEJBQTBCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUhELHNEQUdDO0lBeUJEOztPQUVHO0lBQ0gsSUFBWSxlQU1YO0lBTkQsV0FBWSxlQUFlO1FBQ3pCLG1FQUFXLENBQUE7UUFDWCx5REFBTSxDQUFBO1FBQ04seURBQU0sQ0FBQTtRQUNOLDZEQUFRLENBQUE7UUFDUix5REFBTSxDQUFBO0lBQ1IsQ0FBQyxFQU5XLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBTTFCO0lBZ05EOztPQUVHO0lBQ0gsSUFBWSxVQUtYO0lBTEQsV0FBWSxVQUFVO1FBQ3BCOztXQUVHO1FBQ0gsK0NBQU0sQ0FBQTtJQUNSLENBQUMsRUFMVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUtyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbi8qKlxuICogTWV0YWRhdGEgZXh0cmFjdGVkIGZyb20gYW4gaW5zdGFuY2Ugb2YgYSBkZWNvcmF0b3Igb24gYW5vdGhlciBkZWNsYXJhdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEZWNvcmF0b3Ige1xuICAvKipcbiAgICogTmFtZSBieSB3aGljaCB0aGUgZGVjb3JhdG9yIHdhcyBpbnZva2VkIGluIHRoZSB1c2VyJ3MgY29kZS5cbiAgICpcbiAgICogVGhpcyBpcyBkaXN0aW5jdCBmcm9tIHRoZSBuYW1lIGJ5IHdoaWNoIHRoZSBkZWNvcmF0b3Igd2FzIGltcG9ydGVkICh0aG91Z2ggaW4gcHJhY3RpY2UgdGhleVxuICAgKiB3aWxsIHVzdWFsbHkgYmUgdGhlIHNhbWUpLlxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJZGVudGlmaWVyIHdoaWNoIHJlZmVycyB0byB0aGUgZGVjb3JhdG9yIGluIHRoZSB1c2VyJ3MgY29kZS5cbiAgICovXG4gIGlkZW50aWZpZXI6IERlY29yYXRvcklkZW50aWZpZXI7XG5cbiAgLyoqXG4gICAqIGBJbXBvcnRgIGJ5IHdoaWNoIHRoZSBkZWNvcmF0b3Igd2FzIGJyb3VnaHQgaW50byB0aGUgbW9kdWxlIGluIHdoaWNoIGl0IHdhcyBpbnZva2VkLCBvciBgbnVsbGBcbiAgICogaWYgdGhlIGRlY29yYXRvciB3YXMgZGVjbGFyZWQgaW4gdGhlIHNhbWUgbW9kdWxlIGFuZCBub3QgaW1wb3J0ZWQuXG4gICAqL1xuICBpbXBvcnQgOiBJbXBvcnQgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBUeXBlU2NyaXB0IHJlZmVyZW5jZSB0byB0aGUgZGVjb3JhdG9yIGl0c2VsZi5cbiAgICovXG4gIG5vZGU6IHRzLk5vZGU7XG5cbiAgLyoqXG4gICAqIEFyZ3VtZW50cyBvZiB0aGUgaW52b2NhdGlvbiBvZiB0aGUgZGVjb3JhdG9yLCBpZiB0aGUgZGVjb3JhdG9yIGlzIGludm9rZWQsIG9yIGBudWxsYCBvdGhlcndpc2UuXG4gICAqL1xuICBhcmdzOiB0cy5FeHByZXNzaW9uW118bnVsbDtcbn1cblxuLyoqXG4gKiBBIGRlY29yYXRvciBpcyBpZGVudGlmaWVkIGJ5IGVpdGhlciBhIHNpbXBsZSBpZGVudGlmaWVyIChlLmcuIGBEZWNvcmF0b3JgKSBvciwgaW4gc29tZSBjYXNlcyxcbiAqIGEgbmFtZXNwYWNlZCBwcm9wZXJ0eSBhY2Nlc3MgKGUuZy4gYGNvcmUuRGVjb3JhdG9yYCkuXG4gKi9cbmV4cG9ydCB0eXBlIERlY29yYXRvcklkZW50aWZpZXIgPSB0cy5JZGVudGlmaWVyIHwgTmFtZXNwYWNlZElkZW50aWZpZXI7XG5leHBvcnQgdHlwZSBOYW1lc3BhY2VkSWRlbnRpZmllciA9IHRzLlByb3BlcnR5QWNjZXNzRXhwcmVzc2lvbiAmIHtleHByZXNzaW9uOiB0cy5JZGVudGlmaWVyfTtcbmV4cG9ydCBmdW5jdGlvbiBpc0RlY29yYXRvcklkZW50aWZpZXIoZXhwOiB0cy5FeHByZXNzaW9uKTogZXhwIGlzIERlY29yYXRvcklkZW50aWZpZXIge1xuICByZXR1cm4gdHMuaXNJZGVudGlmaWVyKGV4cCkgfHxcbiAgICAgIHRzLmlzUHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uKGV4cCkgJiYgdHMuaXNJZGVudGlmaWVyKGV4cC5leHByZXNzaW9uKTtcbn1cblxuLyoqXG4gKiBUaGUgYHRzLkRlY2xhcmF0aW9uYCBvZiBhIFwiY2xhc3NcIi5cbiAqXG4gKiBDbGFzc2VzIGFyZSByZXByZXNlbnRlZCBkaWZmZXJlbnRseSBpbiBkaWZmZXJlbnQgY29kZSBmb3JtYXRzOlxuICogLSBJbiBUUyBjb2RlLCB0aGV5IGFyZSB0eXBpY2FsbHkgZGVmaW5lZCB1c2luZyB0aGUgYGNsYXNzYCBrZXl3b3JkLlxuICogLSBJbiBFUzIwMTUgY29kZSwgdGhleSBhcmUgdXN1YWxseSBkZWZpbmVkIHVzaW5nIHRoZSBgY2xhc3NgIGtleXdvcmQsIGJ1dCB0aGV5IGNhbiBhbHNvIGJlXG4gKiAgIHZhcmlhYmxlIGRlY2xhcmF0aW9ucywgd2hpY2ggYXJlIGluaXRpYWxpemVkIHRvIGEgY2xhc3MgZXhwcmVzc2lvbiAoZS5nLlxuICogICBgbGV0IEZvbyA9IEZvbzEgPSBjbGFzcyBGb28ge31gKS5cbiAqIC0gSW4gRVM1IGNvZGUsIHRoZXkgYXJlIHR5cGljYWxseSBkZWZpbmVkIGFzIHZhcmlhYmxlIGRlY2xhcmF0aW9ucyBiZWluZyBhc3NpZ25lZCB0aGUgcmV0dXJuXG4gKiAgIHZhbHVlIG9mIGFuIElJRkUuIFRoZSBhY3R1YWwgXCJjbGFzc1wiIGlzIGltcGxlbWVudGVkIGFzIGEgY29uc3RydWN0b3IgZnVuY3Rpb24gaW5zaWRlIHRoZSBJSUZFLFxuICogICBidXQgdGhlIG91dGVyIHZhcmlhYmxlIGRlY2xhcmF0aW9uIHJlcHJlc2VudHMgdGhlIFwiY2xhc3NcIiB0byB0aGUgcmVzdCBvZiB0aGUgcHJvZ3JhbS5cbiAqXG4gKiBGb3IgYFJlZmxlY3Rpb25Ib3N0YCBwdXJwb3NlcywgYSBjbGFzcyBkZWNsYXJhdGlvbiBzaG91bGQgYWx3YXlzIGhhdmUgYSBgbmFtZWAgaWRlbnRpZmllcixcbiAqIGJlY2F1c2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIHJlZmVyZW5jZSBpdCBpbiBvdGhlciBwYXJ0cyBvZiB0aGUgcHJvZ3JhbS5cbiAqL1xuZXhwb3J0IHR5cGUgQ2xhc3NEZWNsYXJhdGlvbjxUIGV4dGVuZHMgdHMuRGVjbGFyYXRpb24gPSB0cy5EZWNsYXJhdGlvbj4gPSBUICYge25hbWU6IHRzLklkZW50aWZpZXJ9O1xuXG4vKipcbiAqIFRoZSBzeW1ib2wgY29ycmVzcG9uZGluZyB0byBhIFwiY2xhc3NcIiBkZWNsYXJhdGlvbi4gSS5lLiBhIGB0cy5TeW1ib2xgIHdob3NlIGB2YWx1ZURlY2xhcmF0aW9uYCBpc1xuICogYSBgQ2xhc3NEZWNsYXJhdGlvbmAuXG4gKi9cbmV4cG9ydCB0eXBlIENsYXNzU3ltYm9sID0gdHMuU3ltYm9sICYge3ZhbHVlRGVjbGFyYXRpb246IENsYXNzRGVjbGFyYXRpb259O1xuXG4vKipcbiAqIEFuIGVudW1lcmF0aW9uIG9mIHBvc3NpYmxlIGtpbmRzIG9mIGNsYXNzIG1lbWJlcnMuXG4gKi9cbmV4cG9ydCBlbnVtIENsYXNzTWVtYmVyS2luZCB7XG4gIENvbnN0cnVjdG9yLFxuICBHZXR0ZXIsXG4gIFNldHRlcixcbiAgUHJvcGVydHksXG4gIE1ldGhvZCxcbn1cblxuLyoqXG4gKiBBIG1lbWJlciBvZiBhIGNsYXNzLCBzdWNoIGFzIGEgcHJvcGVydHksIG1ldGhvZCwgb3IgY29uc3RydWN0b3IuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ2xhc3NNZW1iZXIge1xuICAvKipcbiAgICogVHlwZVNjcmlwdCByZWZlcmVuY2UgdG8gdGhlIGNsYXNzIG1lbWJlciBpdHNlbGYsIG9yIG51bGwgaWYgaXQgaXMgbm90IGFwcGxpY2FibGUuXG4gICAqL1xuICBub2RlOiB0cy5Ob2RlfG51bGw7XG5cbiAgLyoqXG4gICAqIEluZGljYXRpb24gb2Ygd2hpY2ggdHlwZSBvZiBtZW1iZXIgdGhpcyBpcyAocHJvcGVydHksIG1ldGhvZCwgZXRjKS5cbiAgICovXG4gIGtpbmQ6IENsYXNzTWVtYmVyS2luZDtcblxuICAvKipcbiAgICogVHlwZVNjcmlwdCBgdHMuVHlwZU5vZGVgIHJlcHJlc2VudGluZyB0aGUgdHlwZSBvZiB0aGUgbWVtYmVyLCBvciBgbnVsbGAgaWYgbm90IHByZXNlbnQgb3JcbiAgICogYXBwbGljYWJsZS5cbiAgICovXG4gIHR5cGU6IHRzLlR5cGVOb2RlfG51bGw7XG5cbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhlIGNsYXNzIG1lbWJlci5cbiAgICovXG4gIG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogVHlwZVNjcmlwdCBgdHMuSWRlbnRpZmllcmAgcmVwcmVzZW50aW5nIHRoZSBuYW1lIG9mIHRoZSBtZW1iZXIsIG9yIGBudWxsYCBpZiBubyBzdWNoIG5vZGVcbiAgICogaXMgcHJlc2VudC5cbiAgICpcbiAgICogVGhlIGBuYW1lTm9kZWAgaXMgdXNlZnVsIGluIHdyaXRpbmcgcmVmZXJlbmNlcyB0byB0aGlzIG1lbWJlciB0aGF0IHdpbGwgYmUgY29ycmVjdGx5IHNvdXJjZS1cbiAgICogbWFwcGVkIGJhY2sgdG8gdGhlIG9yaWdpbmFsIGZpbGUuXG4gICAqL1xuICBuYW1lTm9kZTogdHMuSWRlbnRpZmllcnxudWxsO1xuXG4gIC8qKlxuICAgKiBUeXBlU2NyaXB0IGB0cy5FeHByZXNzaW9uYCB3aGljaCByZXByZXNlbnRzIHRoZSB2YWx1ZSBvZiB0aGUgbWVtYmVyLlxuICAgKlxuICAgKiBJZiB0aGUgbWVtYmVyIGlzIGEgcHJvcGVydHksIHRoaXMgd2lsbCBiZSB0aGUgcHJvcGVydHkgaW5pdGlhbGl6ZXIgaWYgdGhlcmUgaXMgb25lLCBvciBudWxsXG4gICAqIG90aGVyd2lzZS5cbiAgICovXG4gIHZhbHVlOiB0cy5FeHByZXNzaW9ufG51bGw7XG5cbiAgLyoqXG4gICAqIFR5cGVTY3JpcHQgYHRzLkRlY2xhcmF0aW9uYCB3aGljaCByZXByZXNlbnRzIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgbWVtYmVyLlxuICAgKlxuICAgKiBJbiBUeXBlU2NyaXB0IGNvZGUgdGhpcyBpcyBpZGVudGljYWwgdG8gdGhlIG5vZGUsIGJ1dCBpbiBkb3dubGV2ZWxlZCBjb2RlIHRoaXMgc2hvdWxkIGFsd2F5cyBiZVxuICAgKiB0aGUgRGVjbGFyYXRpb24gd2hpY2ggYWN0dWFsbHkgcmVwcmVzZW50cyB0aGUgbWVtYmVyJ3MgcnVudGltZSB2YWx1ZS5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIHRoZSBUUyBjb2RlOlxuICAgKlxuICAgKiBgYGBcbiAgICogY2xhc3MgQ2xhenoge1xuICAgKiAgIHN0YXRpYyBnZXQgcHJvcGVydHkoKTogc3RyaW5nIHtcbiAgICogICAgIHJldHVybiAndmFsdWUnO1xuICAgKiAgIH1cbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogRG93bmxldmVscyB0bzpcbiAgICpcbiAgICogYGBgXG4gICAqIHZhciBDbGF6eiA9IChmdW5jdGlvbiAoKSB7XG4gICAqICAgZnVuY3Rpb24gQ2xhenooKSB7XG4gICAqICAgfVxuICAgKiAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6eiwgXCJwcm9wZXJ0eVwiLCB7XG4gICAqICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgKiAgICAgICAgICAgcmV0dXJuICd2YWx1ZSc7XG4gICAqICAgICAgIH0sXG4gICAqICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAqICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgKiAgIH0pO1xuICAgKiAgIHJldHVybiBDbGF6ejtcbiAgICogfSgpKTtcbiAgICogYGBgXG4gICAqXG4gICAqIEluIHRoaXMgZXhhbXBsZSwgZm9yIHRoZSBwcm9wZXJ0eSBcInByb3BlcnR5XCIsIHRoZSBub2RlIHdvdWxkIGJlIHRoZSBlbnRpcmVcbiAgICogT2JqZWN0LmRlZmluZVByb3BlcnR5IEV4cHJlc3Npb25TdGF0ZW1lbnQsIGJ1dCB0aGUgaW1wbGVtZW50YXRpb24gd291bGQgYmUgdGhpc1xuICAgKiBGdW5jdGlvbkRlY2xhcmF0aW9uOlxuICAgKlxuICAgKiBgYGBcbiAgICogZnVuY3Rpb24gKCkge1xuICAgKiAgIHJldHVybiAndmFsdWUnO1xuICAgKiB9LFxuICAgKiBgYGBcbiAgICovXG4gIGltcGxlbWVudGF0aW9uOiB0cy5EZWNsYXJhdGlvbnxudWxsO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBtZW1iZXIgaXMgc3RhdGljIG9yIG5vdC5cbiAgICovXG4gIGlzU3RhdGljOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBbnkgYERlY29yYXRvcmBzIHdoaWNoIGFyZSBwcmVzZW50IG9uIHRoZSBtZW1iZXIsIG9yIGBudWxsYCBpZiBub25lIGFyZSBwcmVzZW50LlxuICAgKi9cbiAgZGVjb3JhdG9yczogRGVjb3JhdG9yW118bnVsbDtcbn1cblxuLyoqXG4gKiBBIHJlZmVyZW5jZSB0byBhIHZhbHVlIHRoYXQgb3JpZ2luYXRlZCBmcm9tIGEgdHlwZSBwb3NpdGlvbi5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgYSBjb25zdHJ1Y3RvciBwYXJhbWV0ZXIgY291bGQgYmUgZGVjbGFyZWQgYXMgYGZvbzogRm9vYC4gQSBgVHlwZVZhbHVlUmVmZXJlbmNlYFxuICogZXh0cmFjdGVkIGZyb20gdGhpcyB3b3VsZCByZWZlciB0byB0aGUgdmFsdWUgb2YgdGhlIGNsYXNzIGBGb29gIChhc3N1bWluZyBpdCB3YXMgYWN0dWFsbHkgYVxuICogdHlwZSkuXG4gKlxuICogVGhlcmUgYXJlIHR3byBraW5kcyBvZiBzdWNoIHJlZmVyZW5jZXMuIEEgcmVmZXJlbmNlIHdpdGggYGxvY2FsOiBmYWxzZWAgcmVmZXJzIHRvIGEgdHlwZSB0aGF0IHdhc1xuICogaW1wb3J0ZWQsIGFuZCBnaXZlcyB0aGUgc3ltYm9sIGBuYW1lYCBhbmQgdGhlIGBtb2R1bGVOYW1lYCBvZiB0aGUgaW1wb3J0LiBOb3RlIHRoYXQgdGhpc1xuICogYG1vZHVsZU5hbWVgIG1heSBiZSBhIHJlbGF0aXZlIHBhdGgsIGFuZCB0aHVzIGlzIGxpa2VseSBvbmx5IHZhbGlkIHdpdGhpbiB0aGUgY29udGV4dCBvZiB0aGUgZmlsZVxuICogd2hpY2ggY29udGFpbmVkIHRoZSBvcmlnaW5hbCB0eXBlIHJlZmVyZW5jZS5cbiAqXG4gKiBBIHJlZmVyZW5jZSB3aXRoIGBsb2NhbDogdHJ1ZWAgcmVmZXJzIHRvIGFueSBvdGhlciBraW5kIG9mIHR5cGUgdmlhIGEgYHRzLkV4cHJlc3Npb25gIHRoYXQnc1xuICogdmFsaWQgd2l0aGluIHRoZSBsb2NhbCBmaWxlIHdoZXJlIHRoZSB0eXBlIHdhcyByZWZlcmVuY2VkLlxuICovXG5leHBvcnQgdHlwZSBUeXBlVmFsdWVSZWZlcmVuY2UgPSB7XG4gIGxvY2FsOiB0cnVlOyBleHByZXNzaW9uOiB0cy5FeHByZXNzaW9uOyBkZWZhdWx0SW1wb3J0U3RhdGVtZW50OiB0cy5JbXBvcnREZWNsYXJhdGlvbiB8IG51bGw7XG59IHxcbntcbiAgbG9jYWw6IGZhbHNlO1xuICBuYW1lOiBzdHJpbmc7XG4gIG1vZHVsZU5hbWU6IHN0cmluZztcbiAgdmFsdWVEZWNsYXJhdGlvbjogdHMuRGVjbGFyYXRpb247XG59O1xuXG4vKipcbiAqIEEgcGFyYW1ldGVyIHRvIGEgY29uc3RydWN0b3IuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ3RvclBhcmFtZXRlciB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoZSBwYXJhbWV0ZXIsIGlmIGF2YWlsYWJsZS5cbiAgICpcbiAgICogU29tZSBwYXJhbWV0ZXJzIGRvbid0IGhhdmUgYSBzaW1wbGUgc3RyaW5nIG5hbWUgKGZvciBleGFtcGxlLCBwYXJhbWV0ZXJzIHdoaWNoIGFyZSBkZXN0cnVjdHVyZWRcbiAgICogaW50byBtdWx0aXBsZSB2YXJpYWJsZXMpLiBJbiB0aGVzZSBjYXNlcywgYG5hbWVgIGNhbiBiZSBgbnVsbGAuXG4gICAqL1xuICBuYW1lOiBzdHJpbmd8bnVsbDtcblxuICAvKipcbiAgICogVHlwZVNjcmlwdCBgdHMuQmluZGluZ05hbWVgIHJlcHJlc2VudGluZyB0aGUgbmFtZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKlxuICAgKiBUaGUgYG5hbWVOb2RlYCBpcyB1c2VmdWwgaW4gd3JpdGluZyByZWZlcmVuY2VzIHRvIHRoaXMgbWVtYmVyIHRoYXQgd2lsbCBiZSBjb3JyZWN0bHkgc291cmNlLVxuICAgKiBtYXBwZWQgYmFjayB0byB0aGUgb3JpZ2luYWwgZmlsZS5cbiAgICovXG4gIG5hbWVOb2RlOiB0cy5CaW5kaW5nTmFtZTtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyJ3MgdHlwZSBhbm5vdGF0aW9uLCBpZiBpdCdzIHBvc3NpYmxlIHRvIHJlZmVyIHRvIHRoZVxuICAgKiBwYXJhbWV0ZXIncyB0eXBlIGFzIGEgdmFsdWUuXG4gICAqXG4gICAqIFRoaXMgY2FuIGVpdGhlciBiZSBhIHJlZmVyZW5jZSB0byBhIGxvY2FsIHZhbHVlLCBpbiB3aGljaCBjYXNlIGl0IGhhcyBgbG9jYWxgIHNldCB0byBgdHJ1ZWAgYW5kXG4gICAqIGNvbnRhaW5zIGEgYHRzLkV4cHJlc3Npb25gLCBvciBpdCdzIGEgcmVmZXJlbmNlIHRvIGFuIGltcG9ydGVkIHZhbHVlLCBpbiB3aGljaCBjYXNlIGBsb2NhbGAgaXNcbiAgICogc2V0IHRvIGBmYWxzZWAgYW5kIHRoZSBzeW1ib2wgYW5kIG1vZHVsZSBuYW1lIG9mIHRoZSBpbXBvcnRlZCB2YWx1ZSBhcmUgcHJvdmlkZWQgaW5zdGVhZC5cbiAgICpcbiAgICogSWYgdGhlIHR5cGUgaXMgbm90IHByZXNlbnQgb3IgY2Fubm90IGJlIHJlcHJlc2VudGVkIGFzIGFuIGV4cHJlc3Npb24sIGB0eXBlVmFsdWVSZWZlcmVuY2VgIGlzXG4gICAqIGBudWxsYC5cbiAgICovXG4gIHR5cGVWYWx1ZVJlZmVyZW5jZTogVHlwZVZhbHVlUmVmZXJlbmNlfG51bGw7XG5cbiAgLyoqXG4gICAqIFR5cGVTY3JpcHQgYHRzLlR5cGVOb2RlYCByZXByZXNlbnRpbmcgdGhlIHR5cGUgbm9kZSBmb3VuZCBpbiB0aGUgdHlwZSBwb3NpdGlvbi5cbiAgICpcbiAgICogVGhpcyBmaWVsZCBjYW4gYmUgdXNlZCBmb3IgZGlhZ25vc3RpY3MgcmVwb3J0aW5nIGlmIGB0eXBlVmFsdWVSZWZlcmVuY2VgIGlzIGBudWxsYC5cbiAgICpcbiAgICogQ2FuIGJlIG51bGwsIGlmIHRoZSBwYXJhbSBoYXMgbm8gdHlwZSBkZWNsYXJlZC5cbiAgICovXG4gIHR5cGVOb2RlOiB0cy5UeXBlTm9kZXxudWxsO1xuXG4gIC8qKlxuICAgKiBBbnkgYERlY29yYXRvcmBzIHdoaWNoIGFyZSBwcmVzZW50IG9uIHRoZSBwYXJhbWV0ZXIsIG9yIGBudWxsYCBpZiBub25lIGFyZSBwcmVzZW50LlxuICAgKi9cbiAgZGVjb3JhdG9yczogRGVjb3JhdG9yW118bnVsbDtcbn1cblxuLyoqXG4gKiBEZWZpbml0aW9uIG9mIGEgZnVuY3Rpb24gb3IgbWV0aG9kLCBpbmNsdWRpbmcgaXRzIGJvZHkgaWYgcHJlc2VudCBhbmQgYW55IHBhcmFtZXRlcnMuXG4gKlxuICogSW4gVHlwZVNjcmlwdCBjb2RlIHRoaXMgbWV0YWRhdGEgd2lsbCBiZSBhIHNpbXBsZSByZWZsZWN0aW9uIG9mIHRoZSBkZWNsYXJhdGlvbnMgaW4gdGhlIG5vZGVcbiAqIGl0c2VsZi4gSW4gRVM1IGNvZGUgdGhpcyBjYW4gYmUgbW9yZSBjb21wbGljYXRlZCwgYXMgdGhlIGRlZmF1bHQgdmFsdWVzIGZvciBwYXJhbWV0ZXJzIG1heVxuICogYmUgZXh0cmFjdGVkIGZyb20gY2VydGFpbiBib2R5IHN0YXRlbWVudHMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRnVuY3Rpb25EZWZpbml0aW9uIHtcbiAgLyoqXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBub2RlIHdoaWNoIGRlY2xhcmVzIHRoZSBmdW5jdGlvbi5cbiAgICovXG4gIG5vZGU6IHRzLk1ldGhvZERlY2xhcmF0aW9ufHRzLkZ1bmN0aW9uRGVjbGFyYXRpb258dHMuRnVuY3Rpb25FeHByZXNzaW9ufHRzLlZhcmlhYmxlRGVjbGFyYXRpb247XG5cbiAgLyoqXG4gICAqIFN0YXRlbWVudHMgb2YgdGhlIGZ1bmN0aW9uIGJvZHksIGlmIGEgYm9keSBpcyBwcmVzZW50LCBvciBudWxsIGlmIG5vIGJvZHkgaXMgcHJlc2VudCBvciB0aGVcbiAgICogZnVuY3Rpb24gaXMgaWRlbnRpZmllZCB0byByZXByZXNlbnQgYSB0c2xpYiBoZWxwZXIgZnVuY3Rpb24sIGluIHdoaWNoIGNhc2UgYGhlbHBlcmAgd2lsbFxuICAgKiBpbmRpY2F0ZSB3aGljaCBoZWxwZXIgdGhpcyBmdW5jdGlvbiByZXByZXNlbnRzLlxuICAgKlxuICAgKiBUaGlzIGxpc3QgbWF5IGhhdmUgYmVlbiBmaWx0ZXJlZCB0byBleGNsdWRlIHN0YXRlbWVudHMgd2hpY2ggcGVyZm9ybSBwYXJhbWV0ZXIgZGVmYXVsdCB2YWx1ZVxuICAgKiBpbml0aWFsaXphdGlvbi5cbiAgICovXG4gIGJvZHk6IHRzLlN0YXRlbWVudFtdfG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIHRzbGliIGhlbHBlciBmdW5jdGlvbiwgaWYgdGhlIGZ1bmN0aW9uIGlzIGRldGVybWluZWQgdG8gcmVwcmVzZW50IGEgdHNsaWIgaGVscGVyXG4gICAqIGZ1bmN0aW9uLiBPdGhlcndpc2UsIHRoaXMgd2lsbCBiZSBudWxsLlxuICAgKi9cbiAgaGVscGVyOiBUc0hlbHBlckZufG51bGw7XG5cbiAgLyoqXG4gICAqIE1ldGFkYXRhIHJlZ2FyZGluZyB0aGUgZnVuY3Rpb24ncyBwYXJhbWV0ZXJzLCBpbmNsdWRpbmcgcG9zc2libGUgZGVmYXVsdCB2YWx1ZSBleHByZXNzaW9ucy5cbiAgICovXG4gIHBhcmFtZXRlcnM6IFBhcmFtZXRlcltdO1xufVxuXG4vKipcbiAqIFBvc3NpYmxlIGZ1bmN0aW9ucyBmcm9tIFR5cGVTY3JpcHQncyBoZWxwZXIgbGlicmFyeS5cbiAqL1xuZXhwb3J0IGVudW0gVHNIZWxwZXJGbiB7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhlIGBfX3NwcmVhZGAgZnVuY3Rpb24uXG4gICAqL1xuICBTcHJlYWQsXG59XG5cbi8qKlxuICogQSBwYXJhbWV0ZXIgdG8gYSBmdW5jdGlvbiBvciBtZXRob2QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGFyYW1ldGVyIHtcbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhlIHBhcmFtZXRlciwgaWYgYXZhaWxhYmxlLlxuICAgKi9cbiAgbmFtZTogc3RyaW5nfG51bGw7XG5cbiAgLyoqXG4gICAqIERlY2xhcmF0aW9uIHdoaWNoIGNyZWF0ZWQgdGhpcyBwYXJhbWV0ZXIuXG4gICAqL1xuICBub2RlOiB0cy5QYXJhbWV0ZXJEZWNsYXJhdGlvbjtcblxuICAvKipcbiAgICogRXhwcmVzc2lvbiB3aGljaCByZXByZXNlbnRzIHRoZSBkZWZhdWx0IHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIsIGlmIGFueS5cbiAgICovXG4gIGluaXRpYWxpemVyOiB0cy5FeHByZXNzaW9ufG51bGw7XG59XG5cbi8qKlxuICogVGhlIHNvdXJjZSBvZiBhbiBpbXBvcnRlZCBzeW1ib2wsIGluY2x1ZGluZyB0aGUgb3JpZ2luYWwgc3ltYm9sIG5hbWUgYW5kIHRoZSBtb2R1bGUgZnJvbSB3aGljaCBpdFxuICogd2FzIGltcG9ydGVkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEltcG9ydCB7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgaW1wb3J0ZWQgc3ltYm9sIHVuZGVyIHdoaWNoIGl0IHdhcyBleHBvcnRlZCAobm90IGltcG9ydGVkKS5cbiAgICovXG4gIG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIG1vZHVsZSBmcm9tIHdoaWNoIHRoZSBzeW1ib2wgd2FzIGltcG9ydGVkLlxuICAgKlxuICAgKiBUaGlzIGNvdWxkIGVpdGhlciBiZSBhbiBhYnNvbHV0ZSBtb2R1bGUgbmFtZSAoQGFuZ3VsYXIvY29yZSBmb3IgZXhhbXBsZSkgb3IgYSByZWxhdGl2ZSBwYXRoLlxuICAgKi9cbiAgZnJvbTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoZSBkZWNsYXJhdGlvbiBvZiBhIHN5bWJvbCwgYWxvbmcgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCBob3cgaXQgd2FzIGltcG9ydGVkIGludG8gdGhlXG4gKiBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEZWNsYXJhdGlvbjxUIGV4dGVuZHMgdHMuRGVjbGFyYXRpb24gPSB0cy5EZWNsYXJhdGlvbj4ge1xuICAvKipcbiAgICogVHlwZVNjcmlwdCByZWZlcmVuY2UgdG8gdGhlIGRlY2xhcmF0aW9uIGl0c2VsZi5cbiAgICovXG4gIG5vZGU6IFQ7XG5cbiAgLyoqXG4gICAqIFRoZSBhYnNvbHV0ZSBtb2R1bGUgcGF0aCBmcm9tIHdoaWNoIHRoZSBzeW1ib2wgd2FzIGltcG9ydGVkIGludG8gdGhlIGFwcGxpY2F0aW9uLCBpZiB0aGUgc3ltYm9sXG4gICAqIHdhcyBpbXBvcnRlZCB2aWEgYW4gYWJzb2x1dGUgbW9kdWxlIChldmVuIHRocm91Z2ggYSBjaGFpbiBvZiByZS1leHBvcnRzKS4gSWYgdGhlIHN5bWJvbCBpcyBwYXJ0XG4gICAqIG9mIHRoZSBhcHBsaWNhdGlvbiBhbmQgd2FzIG5vdCBpbXBvcnRlZCBmcm9tIGFuIGFic29sdXRlIHBhdGgsIHRoaXMgd2lsbCBiZSBgbnVsbGAuXG4gICAqL1xuICB2aWFNb2R1bGU6IHN0cmluZ3xudWxsO1xufVxuXG4vKipcbiAqIEFic3RyYWN0cyByZWZsZWN0aW9uIG9wZXJhdGlvbnMgb24gYSBUeXBlU2NyaXB0IEFTVC5cbiAqXG4gKiBEZXBlbmRpbmcgb24gdGhlIGZvcm1hdCBvZiB0aGUgY29kZSBiZWluZyBpbnRlcnByZXRlZCwgZGlmZmVyZW50IGNvbmNlcHRzIGFyZSByZXByZXNlbnRlZCB3aXRoXG4gKiBkaWZmZXJlbnQgc3ludGFjdGljYWwgc3RydWN0dXJlcy4gVGhlIGBSZWZsZWN0aW9uSG9zdGAgYWJzdHJhY3RzIG92ZXIgdGhvc2UgZGlmZmVyZW5jZXMgYW5kXG4gKiBwcmVzZW50cyBhIHNpbmdsZSBBUEkgYnkgd2hpY2ggdGhlIGNvbXBpbGVyIGNhbiBxdWVyeSBzcGVjaWZpYyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgQVNULlxuICpcbiAqIEFsbCBvcGVyYXRpb25zIG9uIHRoZSBgUmVmbGVjdGlvbkhvc3RgIHJlcXVpcmUgdGhlIHVzZSBvZiBUeXBlU2NyaXB0IGB0cy5Ob2RlYHMgd2l0aCBiaW5kaW5nXG4gKiBpbmZvcm1hdGlvbiBhbHJlYWR5IGF2YWlsYWJsZSAodGhhdCBpcywgbm9kZXMgdGhhdCBjb21lIGZyb20gYSBgdHMuUHJvZ3JhbWAgdGhhdCBoYXMgYmVlblxuICogdHlwZS1jaGVja2VkLCBhbmQgYXJlIG5vdCBzeW50aGV0aWNhbGx5IGNyZWF0ZWQpLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlZmxlY3Rpb25Ib3N0IHtcbiAgLyoqXG4gICAqIEV4YW1pbmUgYSBkZWNsYXJhdGlvbiAoZm9yIGV4YW1wbGUsIG9mIGEgY2xhc3Mgb3IgZnVuY3Rpb24pIGFuZCByZXR1cm4gbWV0YWRhdGEgYWJvdXQgYW55XG4gICAqIGRlY29yYXRvcnMgcHJlc2VudCBvbiB0aGUgZGVjbGFyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSBkZWNsYXJhdGlvbiBhIFR5cGVTY3JpcHQgYHRzLkRlY2xhcmF0aW9uYCBub2RlIHJlcHJlc2VudGluZyB0aGUgY2xhc3Mgb3IgZnVuY3Rpb24gb3ZlclxuICAgKiB3aGljaCB0byByZWZsZWN0LiBGb3IgZXhhbXBsZSwgaWYgdGhlIGludGVudCBpcyB0byByZWZsZWN0IHRoZSBkZWNvcmF0b3JzIG9mIGEgY2xhc3MgYW5kIHRoZVxuICAgKiBzb3VyY2UgaXMgaW4gRVM2IGZvcm1hdCwgdGhpcyB3aWxsIGJlIGEgYHRzLkNsYXNzRGVjbGFyYXRpb25gIG5vZGUuIElmIHRoZSBzb3VyY2UgaXMgaW4gRVM1XG4gICAqIGZvcm1hdCwgdGhpcyBtaWdodCBiZSBhIGB0cy5WYXJpYWJsZURlY2xhcmF0aW9uYCBhcyBjbGFzc2VzIGluIEVTNSBhcmUgcmVwcmVzZW50ZWQgYXMgdGhlXG4gICAqIHJlc3VsdCBvZiBhbiBJSUZFIGV4ZWN1dGlvbi5cbiAgICpcbiAgICogQHJldHVybnMgYW4gYXJyYXkgb2YgYERlY29yYXRvcmAgbWV0YWRhdGEgaWYgZGVjb3JhdG9ycyBhcmUgcHJlc2VudCBvbiB0aGUgZGVjbGFyYXRpb24sIG9yXG4gICAqIGBudWxsYCBpZiBlaXRoZXIgbm8gZGVjb3JhdG9ycyB3ZXJlIHByZXNlbnQgb3IgaWYgdGhlIGRlY2xhcmF0aW9uIGlzIG5vdCBvZiBhIGRlY29yYXRhYmxlIHR5cGUuXG4gICAqL1xuICBnZXREZWNvcmF0b3JzT2ZEZWNsYXJhdGlvbihkZWNsYXJhdGlvbjogdHMuRGVjbGFyYXRpb24pOiBEZWNvcmF0b3JbXXxudWxsO1xuXG4gIC8qKlxuICAgKiBFeGFtaW5lIGEgZGVjbGFyYXRpb24gd2hpY2ggc2hvdWxkIGJlIG9mIGEgY2xhc3MsIGFuZCByZXR1cm4gbWV0YWRhdGEgYWJvdXQgdGhlIG1lbWJlcnMgb2YgdGhlXG4gICAqIGNsYXNzLlxuICAgKlxuICAgKiBAcGFyYW0gY2xhenogYSBgQ2xhc3NEZWNsYXJhdGlvbmAgcmVwcmVzZW50aW5nIHRoZSBjbGFzcyBvdmVyIHdoaWNoIHRvIHJlZmxlY3QuXG4gICAqXG4gICAqIEByZXR1cm5zIGFuIGFycmF5IG9mIGBDbGFzc01lbWJlcmAgbWV0YWRhdGEgcmVwcmVzZW50aW5nIHRoZSBtZW1iZXJzIG9mIHRoZSBjbGFzcy5cbiAgICpcbiAgICogQHRocm93cyBpZiBgZGVjbGFyYXRpb25gIGRvZXMgbm90IHJlc29sdmUgdG8gYSBjbGFzcyBkZWNsYXJhdGlvbi5cbiAgICovXG4gIGdldE1lbWJlcnNPZkNsYXNzKGNsYXp6OiBDbGFzc0RlY2xhcmF0aW9uKTogQ2xhc3NNZW1iZXJbXTtcblxuICAvKipcbiAgICogUmVmbGVjdCBvdmVyIHRoZSBjb25zdHJ1Y3RvciBvZiBhIGNsYXNzIGFuZCByZXR1cm4gbWV0YWRhdGEgYWJvdXQgaXRzIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIG9ubHkgbG9va3MgYXQgdGhlIGNvbnN0cnVjdG9yIG9mIGEgY2xhc3MgZGlyZWN0bHkgYW5kIG5vdCBhdCBhbnkgaW5oZXJpdGVkXG4gICAqIGNvbnN0cnVjdG9ycy5cbiAgICpcbiAgICogQHBhcmFtIGNsYXp6IGEgYENsYXNzRGVjbGFyYXRpb25gIHJlcHJlc2VudGluZyB0aGUgY2xhc3Mgb3ZlciB3aGljaCB0byByZWZsZWN0LlxuICAgKlxuICAgKiBAcmV0dXJucyBhbiBhcnJheSBvZiBgUGFyYW1ldGVyYCBtZXRhZGF0YSByZXByZXNlbnRpbmcgdGhlIHBhcmFtZXRlcnMgb2YgdGhlIGNvbnN0cnVjdG9yLCBpZlxuICAgKiBhIGNvbnN0cnVjdG9yIGV4aXN0cy4gSWYgdGhlIGNvbnN0cnVjdG9yIGV4aXN0cyBhbmQgaGFzIDAgcGFyYW1ldGVycywgdGhpcyBhcnJheSB3aWxsIGJlIGVtcHR5LlxuICAgKiBJZiB0aGUgY2xhc3MgaGFzIG5vIGNvbnN0cnVjdG9yLCB0aGlzIG1ldGhvZCByZXR1cm5zIGBudWxsYC5cbiAgICovXG4gIGdldENvbnN0cnVjdG9yUGFyYW1ldGVycyhjbGF6ejogQ2xhc3NEZWNsYXJhdGlvbik6IEN0b3JQYXJhbWV0ZXJbXXxudWxsO1xuXG4gIC8qKlxuICAgKiBSZWZsZWN0IG92ZXIgYSBmdW5jdGlvbiBhbmQgcmV0dXJuIG1ldGFkYXRhIGFib3V0IGl0cyBwYXJhbWV0ZXJzIGFuZCBib2R5LlxuICAgKlxuICAgKiBGdW5jdGlvbnMgaW4gVHlwZVNjcmlwdCBhbmQgRVM1IGNvZGUgaGF2ZSBkaWZmZXJlbnQgQVNUIHJlcHJlc2VudGF0aW9ucywgaW4gcGFydGljdWxhciBhcm91bmRcbiAgICogZGVmYXVsdCB2YWx1ZXMgZm9yIHBhcmFtZXRlcnMuIEEgVHlwZVNjcmlwdCBmdW5jdGlvbiBoYXMgaXRzIGRlZmF1bHQgdmFsdWUgYXMgdGhlIGluaXRpYWxpemVyXG4gICAqIG9uIHRoZSBwYXJhbWV0ZXIgZGVjbGFyYXRpb24sIHdoZXJlYXMgYW4gRVM1IGZ1bmN0aW9uIGhhcyBpdHMgZGVmYXVsdCB2YWx1ZSBzZXQgaW4gYSBzdGF0ZW1lbnRcbiAgICogb2YgdGhlIGZvcm06XG4gICAqXG4gICAqIGlmIChwYXJhbSA9PT0gdm9pZCAwKSB7IHBhcmFtID0gMzsgfVxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBhYnN0cmFjdHMgb3ZlciB0aGVzZSBkZXRhaWxzLCBhbmQgaW50ZXJwcmV0cyB0aGUgZnVuY3Rpb24gZGVjbGFyYXRpb24gYW5kIGJvZHkgdG9cbiAgICogZXh0cmFjdCBwYXJhbWV0ZXIgZGVmYXVsdCB2YWx1ZXMgYW5kIHRoZSBcInJlYWxcIiBib2R5LlxuICAgKlxuICAgKiBBIGN1cnJlbnQgbGltaXRhdGlvbiBpcyB0aGF0IHRoaXMgbWV0YWRhdGEgaGFzIG5vIHJlcHJlc2VudGF0aW9uIGZvciBzaG9ydGhhbmQgYXNzaWdubWVudCBvZlxuICAgKiBwYXJhbWV0ZXIgb2JqZWN0cyBpbiB0aGUgZnVuY3Rpb24gc2lnbmF0dXJlLlxuICAgKlxuICAgKiBAcGFyYW0gZm4gYSBUeXBlU2NyaXB0IGB0cy5EZWNsYXJhdGlvbmAgbm9kZSByZXByZXNlbnRpbmcgdGhlIGZ1bmN0aW9uIG92ZXIgd2hpY2ggdG8gcmVmbGVjdC5cbiAgICpcbiAgICogQHJldHVybnMgYSBgRnVuY3Rpb25EZWZpbml0aW9uYCBnaXZpbmcgbWV0YWRhdGEgYWJvdXQgdGhlIGZ1bmN0aW9uIGRlZmluaXRpb24uXG4gICAqL1xuICBnZXREZWZpbml0aW9uT2ZGdW5jdGlvbihmbjogdHMuTm9kZSk6IEZ1bmN0aW9uRGVmaW5pdGlvbnxudWxsO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgaWYgYW4gaWRlbnRpZmllciB3YXMgaW1wb3J0ZWQgZnJvbSBhbm90aGVyIG1vZHVsZSBhbmQgcmV0dXJuIGBJbXBvcnRgIG1ldGFkYXRhXG4gICAqIGRlc2NyaWJpbmcgaXRzIG9yaWdpbi5cbiAgICpcbiAgICogQHBhcmFtIGlkIGEgVHlwZVNjcmlwdCBgdHMuSWRlbnRpZmVyYCB0byByZWZsZWN0LlxuICAgKlxuICAgKiBAcmV0dXJucyBtZXRhZGF0YSBhYm91dCB0aGUgYEltcG9ydGAgaWYgdGhlIGlkZW50aWZpZXIgd2FzIGltcG9ydGVkIGZyb20gYW5vdGhlciBtb2R1bGUsIG9yXG4gICAqIGBudWxsYCBpZiB0aGUgaWRlbnRpZmllciBkb2Vzbid0IHJlc29sdmUgdG8gYW4gaW1wb3J0IGJ1dCBpbnN0ZWFkIGlzIGxvY2FsbHkgZGVmaW5lZC5cbiAgICovXG4gIGdldEltcG9ydE9mSWRlbnRpZmllcihpZDogdHMuSWRlbnRpZmllcik6IEltcG9ydHxudWxsO1xuXG4gIC8qKlxuICAgKiBUcmFjZSBhbiBpZGVudGlmaWVyIHRvIGl0cyBkZWNsYXJhdGlvbiwgaWYgcG9zc2libGUuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGF0dGVtcHRzIHRvIHJlc29sdmUgdGhlIGRlY2xhcmF0aW9uIG9mIHRoZSBnaXZlbiBpZGVudGlmaWVyLCB0cmFjaW5nIGJhY2sgdGhyb3VnaFxuICAgKiBpbXBvcnRzIGFuZCByZS1leHBvcnRzIHVudGlsIHRoZSBvcmlnaW5hbCBkZWNsYXJhdGlvbiBzdGF0ZW1lbnQgaXMgZm91bmQuIEEgYERlY2xhcmF0aW9uYFxuICAgKiBvYmplY3QgaXMgcmV0dXJuZWQgaWYgdGhlIG9yaWdpbmFsIGRlY2xhcmF0aW9uIGlzIGZvdW5kLCBvciBgbnVsbGAgaXMgcmV0dXJuZWQgb3RoZXJ3aXNlLlxuICAgKlxuICAgKiBJZiB0aGUgZGVjbGFyYXRpb24gaXMgaW4gYSBkaWZmZXJlbnQgbW9kdWxlLCBhbmQgdGhhdCBtb2R1bGUgaXMgaW1wb3J0ZWQgdmlhIGFuIGFic29sdXRlIHBhdGgsXG4gICAqIHRoaXMgbWV0aG9kIGFsc28gcmV0dXJucyB0aGUgYWJzb2x1dGUgcGF0aCBvZiB0aGUgaW1wb3J0ZWQgbW9kdWxlLiBGb3IgZXhhbXBsZSwgaWYgdGhlIGNvZGUgaXM6XG4gICAqXG4gICAqIGBgYFxuICAgKiBpbXBvcnQge1JvdXRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gICAqXG4gICAqIGV4cG9ydCBjb25zdCBST1VURVMgPSBSb3V0ZXJNb2R1bGUuZm9yUm9vdChbLi4uXSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBhbmQgaWYgYGdldERlY2xhcmF0aW9uT2ZJZGVudGlmaWVyYCBpcyBjYWxsZWQgb24gYFJvdXRlck1vZHVsZWAgaW4gdGhlIGBST1VURVNgIGV4cHJlc3Npb24sXG4gICAqIHRoZW4gaXQgd291bGQgdHJhY2UgYFJvdXRlck1vZHVsZWAgdmlhIGl0cyBpbXBvcnQgZnJvbSBgQGFuZ3VsYXIvY29yZWAsIGFuZCBub3RlIHRoYXQgdGhlXG4gICAqIGRlZmluaXRpb24gd2FzIGltcG9ydGVkIGZyb20gYEBhbmd1bGFyL2NvcmVgIGludG8gdGhlIGFwcGxpY2F0aW9uIHdoZXJlIGl0IHdhcyByZWZlcmVuY2VkLlxuICAgKlxuICAgKiBJZiB0aGUgZGVmaW5pdGlvbiBpcyByZS1leHBvcnRlZCBzZXZlcmFsIHRpbWVzIGZyb20gZGlmZmVyZW50IGFic29sdXRlIG1vZHVsZSBuYW1lcywgb25seVxuICAgKiB0aGUgZmlyc3Qgb25lICh0aGUgb25lIGJ5IHdoaWNoIHRoZSBhcHBsaWNhdGlvbiByZWZlcnMgdG8gdGhlIG1vZHVsZSkgaXMgcmV0dXJuZWQuXG4gICAqXG4gICAqIFRoaXMgbW9kdWxlIG5hbWUgaXMgcmV0dXJuZWQgaW4gdGhlIGB2aWFNb2R1bGVgIGZpZWxkIG9mIHRoZSBgRGVjbGFyYXRpb25gLiBJZiBUaGUgZGVjbGFyYXRpb25cbiAgICogaXMgcmVsYXRpdmUgdG8gdGhlIGFwcGxpY2F0aW9uIGl0c2VsZiBhbmQgdGhlcmUgd2FzIG5vIGltcG9ydCB0aHJvdWdoIGFuIGFic29sdXRlIHBhdGgsIHRoZW5cbiAgICogYHZpYU1vZHVsZWAgaXMgYG51bGxgLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgYSBUeXBlU2NyaXB0IGB0cy5JZGVudGlmaWVyYCB0byB0cmFjZSBiYWNrIHRvIGEgZGVjbGFyYXRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIG1ldGFkYXRhIGFib3V0IHRoZSBgRGVjbGFyYXRpb25gIGlmIHRoZSBvcmlnaW5hbCBkZWNsYXJhdGlvbiBpcyBmb3VuZCwgb3IgYG51bGxgXG4gICAqIG90aGVyd2lzZS5cbiAgICovXG4gIGdldERlY2xhcmF0aW9uT2ZJZGVudGlmaWVyKGlkOiB0cy5JZGVudGlmaWVyKTogRGVjbGFyYXRpb258bnVsbDtcblxuICAvKipcbiAgICogQ29sbGVjdCB0aGUgZGVjbGFyYXRpb25zIGV4cG9ydGVkIGZyb20gYSBtb2R1bGUgYnkgbmFtZS5cbiAgICpcbiAgICogSXRlcmF0ZXMgb3ZlciB0aGUgZXhwb3J0cyBvZiBhIG1vZHVsZSAoaW5jbHVkaW5nIHJlLWV4cG9ydHMpIGFuZCByZXR1cm5zIGEgbWFwIG9mIGV4cG9ydFxuICAgKiBuYW1lIHRvIGl0cyBgRGVjbGFyYXRpb25gLiBJZiBhbiBleHBvcnRlZCB2YWx1ZSBpcyBpdHNlbGYgcmUtZXhwb3J0ZWQgZnJvbSBhbm90aGVyIG1vZHVsZSxcbiAgICogdGhlIGBEZWNsYXJhdGlvbmAncyBgdmlhTW9kdWxlYCB3aWxsIHJlZmxlY3QgdGhhdC5cbiAgICpcbiAgICogQHBhcmFtIG5vZGUgYSBUeXBlU2NyaXB0IGB0cy5Ob2RlYCByZXByZXNlbnRpbmcgdGhlIG1vZHVsZSAoZm9yIGV4YW1wbGUgYSBgdHMuU291cmNlRmlsZWApIGZvclxuICAgKiB3aGljaCB0byBjb2xsZWN0IGV4cG9ydHMuXG4gICAqXG4gICAqIEByZXR1cm5zIGEgbWFwIG9mIGBEZWNsYXJhdGlvbmBzIGZvciB0aGUgbW9kdWxlJ3MgZXhwb3J0cywgYnkgbmFtZS5cbiAgICovXG4gIGdldEV4cG9ydHNPZk1vZHVsZShtb2R1bGU6IHRzLk5vZGUpOiBNYXA8c3RyaW5nLCBEZWNsYXJhdGlvbj58bnVsbDtcblxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciB0aGUgZ2l2ZW4gbm9kZSBhY3R1YWxseSByZXByZXNlbnRzIGEgY2xhc3MuXG4gICAqL1xuICBpc0NsYXNzKG5vZGU6IHRzLk5vZGUpOiBub2RlIGlzIENsYXNzRGVjbGFyYXRpb247XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciB0aGUgZ2l2ZW4gZGVjbGFyYXRpb24sIHdoaWNoIHNob3VsZCBiZSBhIGNsYXNzLCBoYXMgYSBiYXNlIGNsYXNzLlxuICAgKlxuICAgKiBAcGFyYW0gY2xhenogYSBgQ2xhc3NEZWNsYXJhdGlvbmAgcmVwcmVzZW50aW5nIHRoZSBjbGFzcyBvdmVyIHdoaWNoIHRvIHJlZmxlY3QuXG4gICAqL1xuICBoYXNCYXNlQ2xhc3MoY2xheno6IENsYXNzRGVjbGFyYXRpb24pOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBHZXQgYW4gZXhwcmVzc2lvbiByZXByZXNlbnRpbmcgdGhlIGJhc2UgY2xhc3MgKGlmIGFueSkgb2YgdGhlIGdpdmVuIGBjbGF6emAuXG4gICAqXG4gICAqIFRoaXMgZXhwcmVzc2lvbiBpcyBtb3N0IGNvbW1vbmx5IGFuIElkZW50aWZpZXIsIGJ1dCBpcyBwb3NzaWJsZSB0byBpbmhlcml0IGZyb20gYSBtb3JlIGR5bmFtaWNcbiAgICogZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIGNsYXp6IHRoZSBjbGFzcyB3aG9zZSBiYXNlIHdlIHdhbnQgdG8gZ2V0LlxuICAgKi9cbiAgZ2V0QmFzZUNsYXNzRXhwcmVzc2lvbihjbGF6ejogQ2xhc3NEZWNsYXJhdGlvbik6IHRzLkV4cHJlc3Npb258bnVsbDtcblxuICAvKipcbiAgICogR2V0IHRoZSBudW1iZXIgb2YgZ2VuZXJpYyB0eXBlIHBhcmFtZXRlcnMgb2YgYSBnaXZlbiBjbGFzcy5cbiAgICpcbiAgICogQHBhcmFtIGNsYXp6IGEgYENsYXNzRGVjbGFyYXRpb25gIHJlcHJlc2VudGluZyB0aGUgY2xhc3Mgb3ZlciB3aGljaCB0byByZWZsZWN0LlxuICAgKlxuICAgKiBAcmV0dXJucyB0aGUgbnVtYmVyIG9mIHR5cGUgcGFyYW1ldGVycyBvZiB0aGUgY2xhc3MsIGlmIGtub3duLCBvciBgbnVsbGAgaWYgdGhlIGRlY2xhcmF0aW9uXG4gICAqIGlzIG5vdCBhIGNsYXNzIG9yIGhhcyBhbiB1bmtub3duIG51bWJlciBvZiB0eXBlIHBhcmFtZXRlcnMuXG4gICAqL1xuICBnZXRHZW5lcmljQXJpdHlPZkNsYXNzKGNsYXp6OiBDbGFzc0RlY2xhcmF0aW9uKTogbnVtYmVyfG51bGw7XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIGFzc2lnbmVkIHZhbHVlIG9mIGEgdmFyaWFibGUgZGVjbGFyYXRpb24uXG4gICAqXG4gICAqIE5vcm1hbGx5IHRoaXMgd2lsbCBiZSB0aGUgaW5pdGlhbGl6ZXIgb2YgdGhlIGRlY2xhcmF0aW9uLCBidXQgd2hlcmUgdGhlIHZhcmlhYmxlIGlzXG4gICAqIG5vdCBhIGBjb25zdGAgd2UgbWF5IG5lZWQgdG8gbG9vayBlbHNld2hlcmUgZm9yIHRoZSB2YXJpYWJsZSdzIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0gZGVjbGFyYXRpb24gYSBUeXBlU2NyaXB0IHZhcmlhYmxlIGRlY2xhcmF0aW9uLCB3aG9zZSB2YWx1ZSB3ZSB3YW50LlxuICAgKiBAcmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIHZhcmlhYmxlLCBhcyBhIFR5cGVTY3JpcHQgZXhwcmVzc2lvbiBub2RlLCBvciBgdW5kZWZpbmVkYFxuICAgKiBpZiB0aGUgdmFsdWUgY2Fubm90IGJlIGNvbXB1dGVkLlxuICAgKi9cbiAgZ2V0VmFyaWFibGVWYWx1ZShkZWNsYXJhdGlvbjogdHMuVmFyaWFibGVEZWNsYXJhdGlvbik6IHRzLkV4cHJlc3Npb258bnVsbDtcblxuICAvKipcbiAgICogVGFrZSBhbiBleHBvcnRlZCBkZWNsYXJhdGlvbiAobWF5YmUgYSBjbGFzcyBkb3duLWxldmVsZWQgdG8gYSB2YXJpYWJsZSkgYW5kIGxvb2sgdXAgdGhlXG4gICAqIGRlY2xhcmF0aW9uIG9mIGl0cyB0eXBlIGluIGEgc2VwYXJhdGUgLmQudHMgdHJlZS5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiBpcyBhbGxvd2VkIHRvIHJldHVybiBgbnVsbGAgaWYgdGhlIGN1cnJlbnQgY29tcGlsYXRpb24gdW5pdCBkb2VzIG5vdCBoYXZlIGFcbiAgICogc2VwYXJhdGUgLmQudHMgdHJlZS4gV2hlbiBjb21waWxpbmcgVHlwZVNjcmlwdCBjb2RlIHRoaXMgaXMgYWx3YXlzIHRoZSBjYXNlLCBzaW5jZSAuZC50cyBmaWxlc1xuICAgKiBhcmUgcHJvZHVjZWQgb25seSBkdXJpbmcgdGhlIGVtaXQgb2Ygc3VjaCBhIGNvbXBpbGF0aW9uLiBXaGVuIGNvbXBpbGluZyAuanMgY29kZSwgaG93ZXZlcixcbiAgICogdGhlcmUgaXMgZnJlcXVlbnRseSBhIHBhcmFsbGVsIC5kLnRzIHRyZWUgd2hpY2ggdGhpcyBtZXRob2QgZXhwb3Nlcy5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoZSBgdHMuRGVjbGFyYXRpb25gIHJldHVybmVkIGZyb20gdGhpcyBmdW5jdGlvbiBtYXkgbm90IGJlIGZyb20gdGhlIHNhbWVcbiAgICogYHRzLlByb2dyYW1gIGFzIHRoZSBpbnB1dCBkZWNsYXJhdGlvbi5cbiAgICovXG4gIGdldER0c0RlY2xhcmF0aW9uKGRlY2xhcmF0aW9uOiB0cy5EZWNsYXJhdGlvbik6IHRzLkRlY2xhcmF0aW9ufG51bGw7XG59XG4iXX0=