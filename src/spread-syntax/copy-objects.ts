{
  const alice = {
    id: 0,
    name: "alice",
  };

  const anotherAlice = { ...alice };
  console.log(anotherAlice); // { id: 0, name: 'alice' }

  anotherAlice.name = "ALICE";

  console.log(alice); // { id: 0, name: 'alice' }
  console.log(anotherAlice); // { id: 0, name: 'ALICE' }
}

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

  const anotherAlice = { ...alice };
  console.log(anotherAlice);
  // {
  //   id: 0,
  //   name: 'alice',
  //   permissions: [ 'read', 'write' ],
  //   group: { id: 0, name: 'admin-users' }
  // }

  anotherAlice.permissions.push("execute");
  anotherAlice.group.name = "personal-users";

  console.log(alice);
  // {
  //   id: 0,
  //   name: 'alice',
  //   permissions: [ 'read', 'write', 'execute' ],
  //   group: { id: 0, name: 'personal-users' }
  // }
  console.log(anotherAlice);
  // {
  //   id: 0,
  //   name: 'alice',
  //   permissions: [ 'read', 'write', 'execute' ],
  //   group: { id: 0, name: 'personal-users' }
  // }
}
