{
  // float -> int
  {
    // using `Math.floor()`
    console.log(Math.floor(1.23)); // 1
  }

  {
    // Don't do this!; only works when the operand is 32-bit int
    console.log(1.23 | 0); // 1

    console.log(2147483647.123 | 0); // 2147483647
    console.log(2147483648.123 | 0); // -2147483648; Overflowed!
  }
}

{
  // any -> boolean
  {
    // using Boolean()
    console.log(Boolean(-1)); // true
    console.log(Boolean(0)); // false
    console.log(Boolean(1)); // true

    console.log(Boolean("")); // false
    console.log(Boolean("s")); // true

    console.log(Boolean([])); // true
    console.log(Boolean({})); // true

    console.log(Boolean(null)); // false
    console.log(Boolean(undefined)); // false
  }

  {
    // using `!!`
    console.log(!!-1); // true
    console.log(!!0); // false
    console.log(!!1); // true

    console.log(!!""); // false
    console.log(!!"s"); // true

    console.log(!![]); // true
    console.log(!!{}); // true

    console.log(!!null); // false
    console.log(!!undefined); // false
  }
}
