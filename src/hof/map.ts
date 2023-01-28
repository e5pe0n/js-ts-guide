{
  const a = [1, 2, 3, 4, 5];

  {
    // imperative
    const b: number[] = [];
    for (const v of a) {
      b.push(v ** 2);
    }

    console.log(b); // [ 1, 4, 9, 16, 25 ]
  }

  {
    // using map()
    const b = a.map((v) => v ** 2);

    console.log(b); // [ 1, 4, 9, 16, 25 ]
  }
}

{
  type UserData = {
    name: string;
    active: boolean;
  };

  type User = {
    id: number;
  };

  const userDataList: UserData[] = [
    {
      name: "alice",
      active: true,
    },
    {
      name: "bob",
      active: false,
    },
    {
      name: "even",
      active: true,
    },
  ];

  {
    // imperative
    const users: User[] = [];
    for (const [i, v] of userDataList.entries()) {
      users.push({
        ...v,
        id: i,
      });
    }

    console.log(users);
    // [
    //   { name: 'alice', active: true, id: 0 },
    //   { name: 'bob', active: false, id: 1 },
    //   { name: 'even', active: true, id: 2 }
    // ]
  }

  {
    // using map()
    const users = userDataList.map((userData, i) => ({ ...userData, id: i }));

    console.log(users);
    // [
    //   { name: 'alice', active: true, id: 0 },
    //   { name: 'bob', active: false, id: 1 },
    //   { name: 'even', active: true, id: 2 }
    // ]
  }
}
