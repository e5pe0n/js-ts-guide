{
  const a = [1, 2, 3, 4, 5];

  {
    // imperative
    let sum = 0;
    for (const v of a) {
      sum += v;
    }

    console.log(sum); // 15
  }

  {
    // using reduce()
    const sum = a.reduce((acc, v) => acc + v, 0);

    console.log(sum); // 15
  }
}

{
  const a: number[] = [];

  const sum = a.reduce((acc, v) => acc + v); // TypeError: Reduce of empty array with no initial value
}
