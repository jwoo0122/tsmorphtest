"use strict";
exports.__esModule = true;
var ts_morph_1 = require("ts-morph");
(function compile() {
    var project = new ts_morph_1.Project({ tsConfigFilePath: "tsconfig.json" });
    project.getSourceFiles().forEach(function (file) {
        var callExpressions = file.getDescendantsOfKind(ts_morph_1.SyntaxKind.CallExpression);
        callExpressions.forEach(function (expr) {
            var identifier = expr.getChildrenOfKind(ts_morph_1.SyntaxKind.Identifier)[0];
            if (!identifier) {
                return;
            }
            var definitions = identifier.getDefinitions();
            if (!definitions || definitions.length === 0) {
                return;
            }
            definitions.forEach(function (definition) {
                var declarationNode = definition.getDeclarationNode();
                if (!declarationNode) {
                    return;
                }
                process.stdout.write("".concat(definition.getName(), ": declarations founded in ").concat(declarationNode
                    .getSourceFile()
                    .getFilePath(), ", which is ").concat(declarationNode.getFullText(), "\n"));
            });
        });
    });
})();
