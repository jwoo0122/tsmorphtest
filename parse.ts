import { Project, SyntaxKind } from "ts-morph";

(function compile(): void {
  const project = new Project({ tsConfigFilePath: "tsconfig.json" });
  project.getSourceFiles().forEach((file) => {
    const callExpressions = file.getDescendantsOfKind(
      SyntaxKind.CallExpression
    );

    callExpressions.forEach((expr) => {
      const identifier = expr.getChildrenOfKind(SyntaxKind.Identifier)[0];

      if (!identifier) {
        return;
      }

      const definitions = identifier.getDefinitions();

      if (!definitions || definitions.length === 0) {
        return;
      }

      definitions.forEach((definition) => {
        const declarationNode = definition.getDeclarationNode();

        if (!declarationNode) {
          return;
        }

        process.stdout.write(
          `${definition.getName()}: declarations founded in ${declarationNode
            .getSourceFile()
            .getFilePath()}, which is ${declarationNode.getFullText()}\n`
        );
      });
    });
  });
})();
