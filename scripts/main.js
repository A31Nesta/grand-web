import initSync, { compile } from "../grand/grand.js";

let wasmPromise = initSync();

let loadedExpression = "";
let loadedCompiledExpression = null;

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
            // delete previously compiled GrandEx
            if (loadedCompiledExpression) {
                loadedCompiledExpression.free();
                console.log("Freed previous GrandEx object");
            }

            loadedCompiledExpression = compile(inputExpr);
            loadedExpression = inputExpr;
            console.log("Compiled new GrandEx object");
        }

        // Run and put into output element
        let number = loadedCompiledExpression.generate();
        output.textContent = number;
    }
})