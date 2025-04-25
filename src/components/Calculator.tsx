import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  const handleNumberClick = (num: string) => {
    if (display === "0" || resetDisplay) {
      setDisplay(num);
      setResetDisplay(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperationClick = (op: string) => {
    if (previousValue && operation && !resetDisplay) {
      const result = calculate();
      setPreviousValue(result);
      setDisplay(result);
    } else {
      setPreviousValue(display);
    }
    setOperation(op);
    setResetDisplay(true);
  };

  const handleDecimalClick = () => {
    if (resetDisplay) {
      setDisplay("0.");
      setResetDisplay(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleClearClick = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
  };

  const handleEqualsClick = () => {
    if (!previousValue || !operation) return;
    
    const result = calculate();
    setDisplay(result);
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(true);
  };

  const calculate = (): string => {
    const prev = parseFloat(previousValue || "0");
    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        result = prev / current;
        break;
      default:
        return display;
    }

    return Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, "");
  };

  const handleBackspaceClick = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handlePlusMinusClick = () => {
    if (display !== "0") {
      setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
    }
  };

  const handlePercentClick = () => {
    const value = parseFloat(display) / 100;
    setDisplay(value.toString());
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="bg-white p-4 mb-4 rounded-md shadow-inner text-right">
        <div className="text-gray-500 text-sm h-6">
          {previousValue && `${previousValue} ${operation}`}
        </div>
        <div className="text-3xl font-semibold overflow-x-auto whitespace-nowrap">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <Button 
          variant="secondary" 
          onClick={handleClearClick}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          AC
        </Button>
        <Button 
          variant="secondary" 
          onClick={handlePlusMinusClick}
        >
          +/-
        </Button>
        <Button 
          variant="secondary" 
          onClick={handlePercentClick}
        >
          %
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => handleOperationClick("÷")}
          className={cn(
            "bg-amber-500 hover:bg-amber-600 text-white",
            operation === "÷" && "bg-white text-amber-500 border-2 border-amber-500"
          )}
        >
          ÷
        </Button>
        
        <Button onClick={() => handleNumberClick("7")}>7</Button>
        <Button onClick={() => handleNumberClick("8")}>8</Button>
        <Button onClick={() => handleNumberClick("9")}>9</Button>
        <Button 
          variant="secondary" 
          onClick={() => handleOperationClick("×")}
          className={cn(
            "bg-amber-500 hover:bg-amber-600 text-white",
            operation === "×" && "bg-white text-amber-500 border-2 border-amber-500"
          )}
        >
          ×
        </Button>
        
        <Button onClick={() => handleNumberClick("4")}>4</Button>
        <Button onClick={() => handleNumberClick("5")}>5</Button>
        <Button onClick={() => handleNumberClick("6")}>6</Button>
        <Button 
          variant="secondary" 
          onClick={() => handleOperationClick("-")}
          className={cn(
            "bg-amber-500 hover:bg-amber-600 text-white",
            operation === "-" && "bg-white text-amber-500 border-2 border-amber-500"
          )}
        >
          -
        </Button>
        
        <Button onClick={() => handleNumberClick("1")}>1</Button>
        <Button onClick={() => handleNumberClick("2")}>2</Button>
        <Button onClick={() => handleNumberClick("3")}>3</Button>
        <Button 
          variant="secondary" 
          onClick={() => handleOperationClick("+")}
          className={cn(
            "bg-amber-500 hover:bg-amber-600 text-white",
            operation === "+" && "bg-white text-amber-500 border-2 border-amber-500"
          )}
        >
          +
        </Button>
        
        <Button 
          onClick={() => handleNumberClick("0")}
          className="col-span-2"
        >
          0
        </Button>
        <Button onClick={handleDecimalClick}>.</Button>
        <Button 
          variant="secondary" 
          onClick={handleEqualsClick}
          className="bg-amber-500 hover:bg-amber-600 text-white"
        >
          =
        </Button>
      </div>
    </div>
  );
}