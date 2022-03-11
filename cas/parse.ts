import type Expression from './expressions/Expression';
import Integer from './expressions/atomic/Integer';
import Symbol from './expressions/atomic/Symbol';
import Add from './expressions/compound/Add';
import Div from './expressions/compound/Div';
import Mul from './expressions/compound/Mul';
import Power from './expressions/compound/Power';
import Sub from './expressions/compound/Sub';

function tryOperator(expr: string, operator: string,
    callback: (left: string, right: string) => Expression | null) : Expression | null {
  if (expr.startsWith('(') && expr.endsWith(')')) {
    return null;
  }

  for (let i = expr.indexOf(operator);
    i != -1; i = expr.indexOf(operator, i + 1)) {
    const expression = callback(expr.substring(0, i),
        expr.substring(i + 1, expr.length));

    if (expression) {
      return expression;
    }
  }

  return null;
}

function isInteger(expr: string) : Expression | null {
  if (expr.match(/^\d+$/gm)) {
    return new Integer(parseInt(expr));
  }
  return null;
}

function isSymbol(expr: string) : Expression | null {
  if (expr.match(/^[a-z]$/gm)) {
    return new Symbol(expr);
  }
  return null;
}

function hasParentheses(expr: string) : Expression | null {
  if (expr.startsWith('(') && expr.endsWith(')')) {
    return isExpression(expr.substring(1, expr.length -1));
  }
  return null;
}

function isFactor(expr : string) : Expression | null {
  return hasParentheses(expr) || isInteger(expr) || isSymbol(expr);
}

function isP(expr : string) : Expression | null {
  return tryOperator(expr, '^', (left, right) => {
    const leftExpr = isFactor(left);
    if (!leftExpr) return null;

    const rightExpr = isPower(right);
    if (!rightExpr) return null;

    return new Power([leftExpr, rightExpr]);
  });
}

function isPower(expr: string) : Expression | null {
  return isP(expr) || isFactor(expr);
}

function isMultiplication(expr: string) : Expression | null {
  return tryOperator(expr, '*', (left, right) => {
    const leftExpr = isTerm(left);
    if (!leftExpr) return null;

    const rightExpr = isPower(right);
    if (!rightExpr) return null;

    return new Mul([leftExpr, rightExpr]);
  });
}

function isDivision(expr: string) : Expression | null {
  return tryOperator(expr, '/', (left, right) => {
    const leftExpr = isTerm(left);
    if (!leftExpr) return null;

    const rightExpr = isTerm(right);
    if (!rightExpr) return null;

    return new Div([leftExpr, rightExpr]);
  });
}

function isTerm(expr: string) : Expression | null {
  return isMultiplication(expr) || isDivision(expr) || isPower(expr);
}

function isAddition(expr: string) : Expression | null {
  return tryOperator(expr, '+', (left, right) => {
    const leftExpr = isExpression(left);
    if (!leftExpr) return null;

    const rightExpr = isTerm(right);
    if (!rightExpr) return null;

    return new Add([leftExpr, rightExpr]);
  });
}

function isSubtraction(expr: string) : Expression | null {
  return tryOperator(expr, '-', (left, right) => {
    const leftExpr = isExpression(left);
    if (!leftExpr) return null;

    const rightExpr = isExpression(right);
    if (!rightExpr) return null;

    return new Sub([leftExpr, rightExpr]);
  });
}

export default function isExpression(expr: string) : Expression | null {
  return isAddition(expr) || isSubtraction(expr) || isTerm(expr);
}


