{
  const a: number[] = [];

  {
    if (a) {
      console.log("truthy!");
    } else {
      console.log("falsy!");
    }
    // truthy!
  }

  {
    // This condition will always return 'false' since JavaScript compares objects by reference, not value.ts(2839)
    // if (a === []) {
    //   console.log("same!");
    // } else {
    //   console.log("not the same!");
    // }
    // not the same!
  }

  {
    if (a.length > 0) {
      console.log("non-empty!");
    } else {
      console.log("empty!");
    }
    // empty!
  }
}

{
  const o = {};

  {
    if (o) {
      console.log("truthy!");
    } else {
      console.log("falsy!");
    }
    // truthy!
  }

  {
    // This condition will always return 'false' since JavaScript compares objects by reference, not value.ts(2839)
    // if (a === {}) {
    //   console.log("same!");
    // } else {
    //   console.log("not the same!");
    // }
    // not the same!
  }

  {
    if (Object.keys(o).length > 0) {
      console.log("non-empty!");
    } else {
      console.log("empty!");
    }
    // empty!
  }
}
