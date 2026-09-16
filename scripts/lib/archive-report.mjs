import ts from 'typescript'
// Parse syntax only. Archived modules are never imported or executed.
export function extractReport(source, filename) {
  if (filename.endsWith('.json')) return {sections:[{title:'Recorded data',value:JSON.parse(source)}],text:[]}
  const ast=ts.createSourceFile(filename,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX)
  const sections=[],text=[],seen=new Set()
  function value(n,depth=0) {
    if(!n||depth>20)return undefined
    if(ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n))return n.text
    if(ts.isNumericLiteral(n))return Number(n.text)
    if(n.kind===ts.SyntaxKind.TrueKeyword)return true
    if(n.kind===ts.SyntaxKind.FalseKeyword)return false
    if(n.kind===ts.SyntaxKind.NullKeyword)return null
    if(ts.isAsExpression(n)||ts.isSatisfiesExpression(n)||ts.isParenthesizedExpression(n))return value(n.expression,depth+1)
    if(ts.isPrefixUnaryExpression(n)&&n.operator===ts.SyntaxKind.MinusToken&&ts.isNumericLiteral(n.operand))return -Number(n.operand.text)
    const resolved=x=>{const v=value(x,depth+1);return v===undefined?{unresolvedSourceExpression:x.getText(ast)}:v}
    if(ts.isArrayLiteralExpression(n))return n.elements.map(resolved)
    if(ts.isObjectLiteralExpression(n))return Object.fromEntries(n.properties.map((p,i)=>ts.isPropertyAssignment(p)?[p.name.getText(ast).replace(/^["']|["']$/g,''),resolved(p.initializer)]:['unresolved'+i,{unresolvedSourceExpression:p.getText(ast)}]))
    return undefined
  }
  function visit(n) {
    if(ts.isVariableDeclaration(n)&&ts.isIdentifier(n.name)&&n.initializer){const v=value(n.initializer);if(v!==undefined&&(typeof v==='object'||(typeof v==='string'&&v.length>60))){sections.push({title:n.name.text,value:v});return}}
    if(ts.isJsxText(n)){const s=n.text.replace(/\s+/g,' ').trim();if(s&&!seen.has(s)){seen.add(s);text.push(s)}}
    if(ts.isNoSubstitutionTemplateLiteral(n)&&n.text.includes('<')){const s=n.text.replace(/<script\b[\s\S]*?<\/script>/gi,'').replace(/<style\b[\s\S]*?<\/style>/gi,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();if(s&&!seen.has(s)){seen.add(s);text.push(s)}}
    ts.forEachChild(n,visit)
  }
  visit(ast)
  if(!sections.length&&!text.length&&filename.endsWith('.txt'))text.push(source)
  return {sections,text}
}
