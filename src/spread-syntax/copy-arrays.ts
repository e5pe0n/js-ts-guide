{
  const a = [1, 2, 3, 4, 5];

  const b = [...a]; // copy `a`
  console.log(b); // [ 1, 2, 3, 4, 5 ]

  b[0] = 100_000;
  console.log(a); // [ 1, 2, 3, 4, 5 ]
  console.log(b); // [ 100000, 2, 3, 4, 5 ]
}

{
  const a = [
    [1, 2, 3],
    [4, 5, 6],
  ];

  const b = [...a];
  console.log(b); // [ [ 1, 2, 3 ], [ 4, 5, 6 ] ]

  b[0]![0] = 100_000;

  console.log(a); // [ [ 100000, 2, 3 ], [ 4, 5, 6 ] ]
  console.log(b); // [ [ 100000, 2, 3 ], [ 4, 5, 6 ] ]; `b` mutated too!
}

{
  type User = {
    name: string;
  };

  const a: User[] = [{ name: "alice" }, { name: "bob" }, { name: "eve" }];

  const b = [...a];
  console.log(b); // [ { name: 'alice' }, { name: 'bob' }, { name: 'eve' } ]

  b[0]!.name = "ALICE";

  console.log(a); // [ { name: 'ALICE' }, { name: 'bob' }, { name: 'eve' } ]
  console.log(b); // [ { name: 'ALICE' }, { name: 'bob' }, { name: 'eve' } ]; `b` mutated too!
}
