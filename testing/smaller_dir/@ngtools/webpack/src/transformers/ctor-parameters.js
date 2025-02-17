"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const ts = require("typescript");
function downlevelConstructorParameters(getTypeChecker) {
    return (context) => {
        const transformer = decoratorDownlevelTransformer(getTypeChecker(), []);
        return transformer(context);
    };
}
exports.downlevelConstructorParameters = downlevelConstructorParameters;
// The following is sourced from tsickle with local modifications
// Only the creation of `ctorParameters` is retained
// https://github.com/angular/tsickle/blob/0ceb7d6bc47f6945a6c4c09689f1388eb48f5c07/src/decorator_downlevel_transformer.ts
//
/**
 * Extracts the type of the decorator (the function or expression invoked), as well as all the
 * arguments passed to the decorator. Returns an AST with the form:
 *
 *     // For @decorator(arg1, arg2)
 *     { type: decorator, args: [arg1, arg2] }
 */
function extractMetadataFromSingleDecorator(decorator, diagnostics) {
    const metadataProperties = [];
    const expr = decorator.expression;
    switch (expr.kind) {
        case ts.SyntaxKind.Identifier:
            // The decorator was a plain @Foo.
            metadataProperties.push(ts.createPropertyAssignment('type', expr));
            break;
        case ts.SyntaxKind.CallExpression:
            // The decorator was a call, like @Foo(bar).
            const call = expr;
            metadataProperties.push(ts.createPropertyAssignment('type', call.expression));
            if (call.arguments.length) {
                const args = [];
                for (const arg of call.arguments) {
                    args.push(arg);
                }
                const argsArrayLiteral = ts.createArrayLiteral(args);
                argsArrayLiteral.elements.hasTrailingComma = true;
                metadataProperties.push(ts.createPropertyAssignment('args', argsArrayLiteral));
            }
            break;
        default:
            diagnostics.push({
                file: decorator.getSourceFile(),
                start: decorator.getStart(),
                length: decorator.getEnd() - decorator.getStart(),
                messageText: `${ts.SyntaxKind[decorator.kind]} not implemented in gathering decorator metadata`,
                category: ts.DiagnosticCategory.Error,
                code: 0,
            });
            break;
    }
    return ts.createObjectLiteral(metadataProperties);
}
/**
 * createCtorParametersClassProperty creates a static 'ctorParameters' property containing
 * downleveled decorator information.
 *
 * The property contains an arrow function that returns an array of object literals of the shape:
 *     static ctorParameters = () => [{
 *       type: SomeClass|undefined,  // the type of the param that's decorated, if it's a value.
 *       decorators: [{
 *         type: DecoratorFn,  // the type of the decorator that's invoked.
 *         args: [ARGS],       // the arguments passed to the decorator.
 *       }]
 *     }];
 */
function createCtorParametersClassProperty(diagnostics, entityNameToExpression, ctorParameters, typeChecker) {
    const params = [];
    for (const ctorParam of ctorParameters) {
        if (!ctorParam.type && ctorParam.decorators.length === 0) {
            params.push(ts.createNull());
            continue;
        }
        const paramType = ctorParam.type
            ? typeReferenceToExpression(entityNameToExpression, ctorParam.type, typeChecker)
            : undefined;
        const members = [
            ts.createPropertyAssignment('type', paramType || ts.createIdentifier('undefined')),
        ];
        const decorators = [];
        for (const deco of ctorParam.decorators) {
            decorators.push(extractMetadataFromSingleDecorator(deco, diagnostics));
        }
        if (decorators.length) {
            members.push(ts.createPropertyAssignment('decorators', ts.createArrayLiteral(decorators)));
        }
        params.push(ts.createObjectLiteral(members));
    }
    const initializer = ts.createArrowFunction(undefined, undefined, [], undefined, ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken), ts.createArrayLiteral(params, true));
    const ctorProp = ts.createProperty(undefined, [ts.createToken(ts.SyntaxKind.StaticKeyword)], 'ctorParameters', undefined, undefined, initializer);
    return ctorProp;
}
/**
 * Returns an expression representing the (potentially) value part for the given node.
 *
 * This is a partial re-implementation of TypeScript's serializeTypeReferenceNode. This is a
 * workaround for https://github.com/Microsoft/TypeScript/issues/17516 (serializeTypeReferenceNode
 * not being exposed). In practice this implementation is sufficient for Angular's use of type
 * metadata.
 */
function typeReferenceToExpression(entityNameToExpression, node, typeChecker) {
    let kind = node.kind;
    if (ts.isLiteralTypeNode(node)) {
        // Treat literal types like their base type (boolean, string, number).
        kind = node.literal.kind;
    }
    switch (kind) {
        case ts.SyntaxKind.FunctionType:
        case ts.SyntaxKind.ConstructorType:
            return ts.createIdentifier('Function');
        case ts.SyntaxKind.ArrayType:
        case ts.SyntaxKind.TupleType:
            return ts.createIdentifier('Array');
        case ts.SyntaxKind.TypePredicate:
        case ts.SyntaxKind.TrueKeyword:
        case ts.SyntaxKind.FalseKeyword:
        case ts.SyntaxKind.BooleanKeyword:
            return ts.createIdentifier('Boolean');
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.StringKeyword:
            return ts.createIdentifier('String');
        case ts.SyntaxKind.ObjectKeyword:
            return ts.createIdentifier('Object');
        case ts.SyntaxKind.NumberKeyword:
        case ts.SyntaxKind.NumericLiteral:
            return ts.createIdentifier('Number');
        case ts.SyntaxKind.TypeReference:
            const typeRef = node;
            let typeSymbol = typeChecker.getSymbolAtLocation(typeRef.typeName);
            if (typeSymbol && typeSymbol.flags & ts.SymbolFlags.Alias) {
                typeSymbol = typeChecker.getAliasedSymbol(typeSymbol);
            }
            if (!typeSymbol || !(typeSymbol.flags & ts.SymbolFlags.Value)) {
                return undefined;
            }
            const type = typeChecker.getTypeOfSymbolAtLocation(typeSymbol, typeRef);
            if (!type || typeChecker.getSignaturesOfType(type, ts.SignatureKind.Construct).length === 0) {
                return undefined;
            }
            // Ignore any generic types, just return the base type.
            return entityNameToExpression(typeRef.typeName);
        default:
            return undefined;
    }
}
/**
 * Transformer factory for the decorator downlevel transformer. See fileoverview for details.
 */
function decoratorDownlevelTransformer(typeChecker, diagnostics) {
    return (context) => {
        const parameterTypeSymbols = new Set();
        /**
         * Converts an EntityName (from a type annotation) to an expression (accessing a value).
         *
         * For a given ts.EntityName, this walks depth first to find the leftmost ts.Identifier, then
         * converts the path into property accesses.
         *
         */
        function entityNameToExpression(name) {
            if (ts.isIdentifier(name)) {
                const typeSymbol = typeChecker.getSymbolAtLocation(name);
                if (typeSymbol) {
                    parameterTypeSymbols.add(typeSymbol);
                }
                // Based on TS's strategy to allow the checker to reach this identifier
                // tslint:disable-next-line:max-line-length
                // https://github.com/microsoft/TypeScript/blob/7f47a08a5e9874f0f97a667bd81eebddec61247c/src/compiler/transformers/ts.ts#L2093
                const exp = ts.getMutableClone(name);
                exp.flags &= ~ts.NodeFlags.Synthesized;
                exp.original = undefined;
                exp.parent = ts.getParseTreeNode(name.getSourceFile());
                return exp;
            }
            const ref = entityNameToExpression(name.left);
            if (!ref) {
                return undefined;
            }
            return ts.createPropertyAccess(ref, name.right);
        }
        function classMemberVisitor(node) {
            if (!ts.isConstructorDeclaration(node) || !node.body) {
                return visitor(node);
            }
            const parametersInfo = [];
            for (const param of node.parameters) {
                const paramInfo = { decorators: [], type: null };
                for (const decorator of param.decorators || []) {
                    paramInfo.decorators.push(decorator);
                }
                if (param.type) {
                    // param has a type provided, e.g. "foo: Bar".
                    // The type will be emitted as a value expression in entityNameToExpression, which takes
                    // care not to emit anything for types that cannot be expressed as a value (e.g.
                    // interfaces).
                    paramInfo.type = param.type;
                }
                parametersInfo.push(paramInfo);
            }
            if (parametersInfo.length > 0) {
                const ctorProperty = createCtorParametersClassProperty(diagnostics, entityNameToExpression, parametersInfo, typeChecker);
                return [node, ctorProperty];
            }
            else {
                return node;
            }
        }
        function visitor(node) {
            if (ts.isClassDeclaration(node)) {
                return ts.updateClassDeclaration(node, node.decorators, node.modifiers, node.name, node.typeParameters, node.heritageClauses, ts.visitNodes(node.members, classMemberVisitor));
            }
            else {
                return ts.visitEachChild(node, visitor, context);
            }
        }
        return (sf) => {
            parameterTypeSymbols.clear();
            return ts.visitEachChild(visitor(sf), function visitImports(node) {
                if ((ts.isImportSpecifier(node) || ts.isNamespaceImport(node) || ts.isImportClause(node)) &&
                    node.name) {
                    const importSymbol = typeChecker.getSymbolAtLocation(node.name);
                    if (importSymbol && parameterTypeSymbols.has(importSymbol)) {
                        // Using a clone prevents TS from removing the import specifier
                        return ts.getMutableClone(node);
                    }
                }
                return ts.visitEachChild(node, visitImports, context);
            }, context);
        };
    };
}
exports.decoratorDownlevelTransformer = decoratorDownlevelTransformer;
