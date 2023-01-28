{
  const a = [1, 2, 3, 4, 5];

  {
    // imperative
    const evens: number[] = [];
    for (const v of a) {
      if (v % 2 == 0) {
        evens.push(v);
      }
    }

    console.log(evens); // [ 2, 4 ]
  }

  {
    // using filter()
    const evens = a.filter((v) => v % 2 == 0);

    console.log(evens); // [ 2, 4 ]
  }
}

{
  type User = {
    id: number;
    name: string;
    active: boolean;
  };

  const users: User[] = [
    {
      id: 0,
      name: "alice",
      active: true,
    },
    {
      id: 1,
      name: "bob",
      active: false,
    },
    {
      id: 2,
      name: "eve",
      active: true,
    },
  ];

  {
    // imperative
    const activeUsers: User[] = [];
    for (const user of users) {
      if (user.active) {
        activeUsers.push(user);
      }
    }

    console.log(activeUsers);
    // [
    //   { id: 0, name: 'alice', active: true },
    //   { id: 2, name: 'eve', active: true }
    // ]
  }

  {
    const activeUsers = users.filter((user) => user.active);

    console.log(activeUsers);
    // [
    //   { id: 0, name: 'alice', active: true },
    //   { id: 2, name: 'eve', active: true }
    // ]
  }
}
