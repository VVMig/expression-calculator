function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  expr = expr.split("").filter(e => (e != " " ? true : false));
        if (
          !checkBrackets(expr) &&
          (expr.indexOf("(") >= 0 || expr.indexOf(")") >= 0)
        ) {
          throw "ExpressionError: Brackets must be paired";
        }
        if(checkZero(expr)){
          throw "TypeError: Division by zero.";
        }
        expr = exprInBrackets(expr);
        if (!isFinite(expr)) {
          throw "TypeError: Division by zero.";
        }
        return expr;

        function checkBrackets(bracketExpr) {
          let openBrackets = 0;
          let closedBrackets = 0;
          for (let i = 0; i < bracketExpr.length; i++) {
            bracketExpr[i] == "(" ? (openBrackets += 1) : 0;
            bracketExpr[i] == ")" ? (closedBrackets += 1) : 0;
          }
          if (openBrackets != closedBrackets) {
            return false;
          }
          return openBrackets == 0 ? false : true;
        }

        function exprInBrackets(bracketExpr) {
          if (!checkBrackets(bracketExpr)) {
            return parseFloat(plusOperation(bracketExpr.join("")));
          }
          let openBracket = bracketExpr.lastIndexOf("(");
          let closedBracket = bracketExpr.indexOf(")", openBracket + 1);
          let tmpExpr = bracketExpr.slice(openBracket + 1, closedBracket);
          tmpExpr = parseFloat(plusOperation(tmpExpr.join("")));
          bracketExpr.splice(
            openBracket,
            closedBracket - openBracket + 1,
            tmpExpr
          );
          return exprInBrackets(bracketExpr);
        }

        function plusOperation(expr) {
          expr = expr.split("+");

          expr.forEach((element, i) => {
            if (isNaN(Number(element))) {
              expr[i] = subtractionOperation(element);
            }
          });

          return expr.reduce((sum, e) => Number(sum) + Number(e), 0);
        }

        function subtractionOperation(expr) {
          expr=expr.split('-');
          for (let i = 0; i < expr.length; i++) {
            if(expr[i].length==0){
              expr[i+1]='-'+expr[i+1];
            }
            if(expr[i][expr[i].length-1]=='/' || expr[i][expr[i].length-1]=='*'){
              expr[i+1]='-'+expr[i+1];
            }
          }
          for (let i = 0; i < expr.length; i++) {
            
            if((expr[i][expr[i].length-1]=='/' || expr[i][expr[i].length-1]=='*')){
              expr[i]=expr[i]+expr[i+1];
              expr.splice(i+1,1);
              i--;
            }

          }
          expr=expr.filter(e=>e.length>0?true:false);
          
          expr.forEach((element, i) => {
            if (isNaN(Number(element))) {
              expr[i] = multiplyOperation(element);
            }
          });

          return expr.reduce((min, e, i) => (i == 0 ? e : min - e));
        }

        function multiplyOperation(expr) {
          expr = expr.split("*");

          expr.forEach((element, i) => {
            if (isNaN(Number(element))) {
              expr[i] = divideOperation(element);
            }
          });

          return expr.reduce((sum, e, i) => sum * e, 1);
        }

        function divideOperation(expr) {
          return expr.split("/").reduce((div, e) => div / e);
        }

        function checkZero(expr){
          for (let i = 0; i < expr.length; i++) {
            if(expr[i]=='/' && expr[i+1]==0){
              return true;
            }
            
          }
          return false;
        }
}

module.exports = {
  expressionCalculator
};
