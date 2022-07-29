import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [currentVal, setCurrentVal] = useState("");
  const [expression, setExpression] = useState([]);
  const [runningTotal, setRunningTotal] = useState(0);
  const [showRunningTotal, setShowRunningTotal] = useState(false);

  const clearClickHandler = () => {
    setCurrentVal("");
    setExpression([]);
    setRunningTotal(0);
  };

  const numClickHandler = (val) => {
    if (val === "0" && currentVal.at(-1) === "0") {
      return;
    }

    setShowRunningTotal(false);

    setCurrentVal((prevCurrentVal) => {
      return prevCurrentVal + val;
    });
  };

  const operClickHandler = (operator) => {
    if (
      operator !== "-" &&
      expression.length === 0 &&
      currentVal.length === 0
    ) {
      return;
    }

    if (
      currentVal.length === 0 &&
      ["+", "*", "/"].includes(expression.at(-1))
    ) {
      setExpression((prevExpression) => {
        return prevExpression.slice(0, -1) + operator;
      });
      return;
    }

    if (currentVal) {
      // not going to be a neg #, just enter the [#, +]
      setExpression((prevExpression) => {
        return prevExpression.concat(currentVal);
      });
      setExpression((prevExpression) => {
        return prevExpression.concat(operator);
      });
      setCurrentVal("");
    } else {
      setCurrentVal("-");
    }
  };

  const decimalClickHandler = () => {
    if (currentVal.toString().includes(".")) {
      return;
    }

    if (currentVal.length === 0) {
      setCurrentVal("0.");
    } else {
      setCurrentVal((prevCurrentVal) => {
        return prevCurrentVal + ".";
      });
    }
  };

  useEffect(() => {
    let total = Number(expression[0]) || 0;

    for (let i = 1; i < expression.length; i++) {
      if (expression[i + 1]) {
        switch (expression[i]) {
          case "+":
            total += Number(expression[i + 1]);
            break;
          case "-":
            total -= Number(expression[i + 1]);
            break;
          case "*":
            total *= Number(expression[i + 1]);
            break;
          case "/":
            total /= Number(expression[i + 1]);
            break;
          default:
            break;
        }
      }
    }

    setRunningTotal(total);
    console.log("expression", expression);
    console.log("running total", runningTotal);
    console.log("current val", currentVal);
    console.log("showRunningTotal", showRunningTotal);
  }, [currentVal, expression, runningTotal, showRunningTotal]);

  const calcClickHandler = () => {
    setExpression((prevExpression) => {
      return prevExpression.concat(currentVal);
    });
    setShowRunningTotal(true);
    setCurrentVal("");
    // setExpression([]);
  };

  return (
    <div className="App">
      <div id="container">
        <div>Running Total: {runningTotal}</div>
        Expression:
        <div id="expression">{expression}</div>
        Current Val:
        <div id="display">{showRunningTotal ? runningTotal : currentVal}</div>
        <div id="buttons">
          <button id="clear" onClick={clearClickHandler}>
            AC
          </button>
          <button id="divide" onClick={operClickHandler.bind(this, "/")}>
            /
          </button>
          <button id="multiply" onClick={operClickHandler.bind(this, "*")}>
            X
          </button>
          <button id="seven" onClick={numClickHandler.bind(this, "7")}>
            7
          </button>
          <button id="eight" onClick={numClickHandler.bind(this, "8")}>
            8
          </button>
          <button id="nine" onClick={numClickHandler.bind(this, "9")}>
            9
          </button>
          <button id="subtract" onClick={operClickHandler.bind(this, "-")}>
            -
          </button>
          <button id="four" onClick={numClickHandler.bind(this, "4")}>
            4
          </button>
          <button id="five" onClick={numClickHandler.bind(this, "5")}>
            5
          </button>
          <button id="six" onClick={numClickHandler.bind(this, "6")}>
            6
          </button>
          <button id="add" onClick={operClickHandler.bind(this, "+")}>
            +
          </button>
          <button id="one" onClick={numClickHandler.bind(this, "1")}>
            1
          </button>
          <button id="two" onClick={numClickHandler.bind(this, "2")}>
            2
          </button>
          <button id="three" onClick={numClickHandler.bind(this, "3")}>
            3
          </button>
          <button id="equals" onClick={calcClickHandler}>
            =
          </button>
          <button id="zero" onClick={numClickHandler.bind(this, "0")}>
            0
          </button>
          <button id="decimal" onClick={decimalClickHandler}>
            .
          </button>
        </div>
      </div>
    </div>
  );
}
