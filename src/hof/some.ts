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
    let anyActive = false;
    for (const user of users) {
      if (!user.active) {
        anyActive = true;
        break;
      }
    }

    console.log(anyActive); // true
  }

  {
    // using some()
    const anyActive = users.some((user) => user.active);

    console.log(anyActive); // true
  }

  {
    const users: User[] = [];

    console.log(users.some((user) => user.active)); // false
  }
}
