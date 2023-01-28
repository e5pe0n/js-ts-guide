{
  const a = [1, 2, 3, 4, 5];

  {
    // using subscription
    const x = a[0];
    const y = a[1];
    const z = a[2];
    console.log(x, y, z); // 1 2 3
  }

  {
    // using destructure
    const [x, y, z] = a;
    console.log(x, y, z); // 1 2 3
  }

  {
    // get elements of rest as an Array
    const [x, y, ...z] = a;
    console.log(x, y, z); // 1 2 [ 3, 4, 5 ]
  }
}
