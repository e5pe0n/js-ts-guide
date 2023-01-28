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
    let allActive = true;
    for (const user of users) {
      if (!user.active) {
        allActive = false;
        break;
      }
    }

    console.log(allActive); // false
  }

  {
    // using every()
    const allActive = users.every((user) => user.active);

    console.log(allActive); // false
  }

  {
    const users: User[] = [];

    console.log(users.every((user) => user.active)); // true
  }
}
