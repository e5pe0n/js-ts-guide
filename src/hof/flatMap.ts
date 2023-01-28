{
  type User = {
    id: number;
    name: string;
    active: boolean;
  };

  const usersList: User[][] = [
    [
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
    ],
    [
      {
        id: 3,
        name: "emma",
        active: false,
      },
      {
        id: 4,
        name: "weston",
        active: true,
      },
      {
        id: 5,
        name: "john",
        active: false,
      },
    ],
  ];

  {
    // imperative
    const activeUsers: User[] = [];
    for (const users of usersList) {
      for (const user of users) {
        if (user.active) {
          activeUsers.push(user);
        }
      }
    }

    console.log(activeUsers);
    // [
    //   { id: 0, name: 'alice', active: true },
    //   { id: 2, name: 'eve', active: true },
    //   { id: 4, name: 'weston', active: true }
    // ]
  }

  {
    // using flatMap()
    const activeUsers = usersList.flatMap((users) =>
      users.filter((user) => user.active)
    );

    console.log(activeUsers);
    // [
    //   { id: 0, name: 'alice', active: true },
    //   { id: 2, name: 'eve', active: true },
    //   { id: 4, name: 'weston', active: true }
    // ]
  }
}
