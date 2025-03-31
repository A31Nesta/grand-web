import initSync, { expr } from "../grand/grand.js";

let wasmPromise = initSync();

let loadedExpression = "";
let loadedCompiledExpression = {};

window.addEventListener("DOMContentLoaded", async ()=>{
    const inputForm = document.getElementById("input-form");
    const expression = document.getElementById("expression");
    const output = document.getElementById("results");

    // Make sure we have wasm
    await wasmPromise;

    inputForm.onsubmit = (e) => {
        e.preventDefault();
        const inputExpr = expression.value.trim();

        // Ignore empty
        if (inputExpr == "") {
            return;
        }

        // Check if we have to recompile the expression
        if (inputExpr != loadedExpression) {
            loadedCompiledExpression = expr(inputExpr);
            loadedExpression = inputExpr;
        }

        // Run and put into output element
        let number = loadedCompiledExpression.eval();
        output.textContent = number;
    }
})