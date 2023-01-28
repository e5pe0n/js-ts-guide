{
  const permissions = ["read", "write", "execute"] as const;
  type Permission = typeof permissions[number];

  type UserGroup = {
    id: number;
    name: string;
  };

  type User = {
    id: number;
    name: string;
    permissions: Permission[];
    group: UserGroup;
  };

  const alice: User = {
    id: 0,
    name: "alice",
    permissions: ["read", "write"],
    group: {
      id: 0,
      name: "admin-users",
    },
  };

  const updatedAlice = {
    ...alice,
    ...{
      name: "ALICE",
      permissions: ["read", "write", "execute"],
      group: { id: 1, name: "personal-users" },
    },
  };

  console.log(alice);
  // {
  //   id: 0,
  //   name: 'alice',
  //   permissions: [ 'read', 'write' ],
  //   group: { id: 0, name: 'admin-users' }
  // }
  console.log(updatedAlice);
  // {
  //   id: 0,
  //   name: 'ALICE',
  //   permissions: [ 'read', 'write', 'execute' ],
  //   group: { id: 1, name: 'personal-users' }
  // }
}

{
  const permissions = ["read", "write", "execute"] as const;
  type Permission = typeof permissions[number];

  type User = {
    id: number;
    name: string;
    permissions: Permission[];
  };

  const UserFactory = (args?: Partial<User>): User => ({
    // default values
    id: 0,
    name: "alice",
    permissions: ["read", "write"],
    ...args, // overwrite default values if `args` given
  });

  const user1 = UserFactory();
  console.log(user1); // { id: 0, name: 'alice', permissions: [ 'read', 'write' ] }

  const user2 = UserFactory({ id: 1, name: "bob" });
  console.log(user2); // { id: 1, name: 'bob', permissions: [ 'read', 'write' ] }
}
