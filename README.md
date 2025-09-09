1) What is the difference between var, let, and const?
   Answer: Var: var is the Old way, function-scoped, can be re-declared and updated.
           Let: Block-scoped, can be updated but not re-declared in the same scope.
           const: Block-scoped, cannot be re-assigned (but objects/arrays inside can still change).
2) What is the difference between map(), forEach(), and filter()?
   Answer:  map(): Loops and returns a new array with changed values.
           forEach(): Loops but does not return anything (just runs code).
           filter(): Loops and returns a new array with only items that pass a condition.
3) What are arrow functions in ES6?
   Answer: A shorter way to write functions using =>.
           They don’t have their own this (take from outside).
           Example: const add = (a, b) => a + b;
4) How does destructuring assignment work in ES6?
   Answer: A way to quickly unpack values from arrays or objects.
      Example: const [a, b] = [1, 2];   // a=1, b=2  
               const {name, age} = {name: "Tom", age: 20};
5) Explain template literals in ES6. How are they different from string concatenation?
   Answer: Strings written with backticks `, allow variables and multi-lines easily.
       Example: const name = "Tom";  
                console.log(`Hello, ${name}!`);
