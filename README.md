# JS/TS Guide

# Contents

- [Spread Syntax](#spread-syntax)
- [Destructure](#destructure)
- [Higher-order Functions](#higher-order-functions)
- [Short-Circuit Evaluation](#short-circuit-evaluation)
- [Empty Arrays and Empty Object](#empty-arrays-and-empty-objects)
- [Casts](#casts)
- [Type Guards](#type-guards)
# Spread Syntax

## Arrays

### (Shallow) Copy Arrays


```ts
// src/spread-syntax/copy-arrays.ts
const a = [1, 2, 3, 4, 5];

const b = [...a]; // copy `a`
console.log(b); // [ 1, 2, 3, 4, 5 ]

b[0] = 100_000;
console.log(a); // [ 1, 2, 3, 4, 5 ]
console.log(b); // [ 100000, 2, 3, 4, 5 ]

```

#### Warning

Copying arrays using spread syntax is *shallow copy*.  
It doesn't deeply copy elements such as arrays and objects.  

```ts
// src/spread-syntax/copy-arrays.ts
const a = [
  [1, 2, 3],
  [4, 5, 6],
];

const b = [...a]; // [ [ 1, 2, 3 ], [ 4, 5, 6 ] ]

console.log(b);

b[0]![0] = 100_000;

console.log(a); // [ [ 100000, 2, 3 ], [ 4, 5, 6 ] ]
console.log(b); // [ [ 100000, 2, 3 ], [ 4, 5, 6 ] ]; `b` mutated too!

```

```ts
// src/spread-syntax/copy-arrays.ts
type User = {
  name: string;
};

const a: User[] = [{ name: "alice" }, { name: "bob" }, { name: "eve" }];

const b = [...a];
console.log(b); // [ { name: 'alice' }, { name: 'bob' }, { name: 'eve' } ]

b[0]!.name = "ALICE";

console.log(a); // [ { name: 'ALICE' }, { name: 'bob' }, { name: 'eve' } ]
console.log(b); // [ { name: 'ALICE' }, { name: 'bob' }, { name: 'eve' } ]; `b` mutated too!

```

### Concatenate Arrays

```ts
// src/spread-syntax/concat-arrays.ts
const a = [1, 2, 3, 4, 5];
const b = [10, 20, 30, 40, 50];
const c = [100, 200, 300, 400, 500];

const x = [...a, ...b, ...c];

console.log(x);
/**
 * [
 *    1,   2,   3,   4,   5,
 *   10,  20,  30,  40,  50,
 *  100, 200, 300, 400, 500
 * ]
 */

```

## Objects

### (Shallow) Copy Objects

```ts
// src/spread-syntax/concat-objects.ts
const alice = {
  id: 0,
  name: "alice",
};

const anotherAlice = { ...alice };  // copy `alice`
console.log(anotherAlice); // { id: 0, name: 'alice' }

anotherAlice.name = "ALICE";

console.log(alice); // { id: 0, name: 'alice' }
console.log(anotherAlice); // { id: 0, name: 'ALICE' }

```

#### Warning

Copying objects using spread syntax is *shallow copy* as with copying arrays.  
It doesn't deeply copy elements such as arrays and objects.  

```ts
// src/spread-syntax/copy-objects.ts
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
```

### Merge objects

Using spread syntax, we can easily overwrite properties of the object.  


```ts
// src/spread-syntax/merge-objects.ts
const permissions = ["read", "write", "execute"] as const;
type Permission = typeof permissions[number]; // "read" | "write" | "execute"

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
  },  // overwrite `name`, `permissinos` and `group` properties
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

```

#### Factory Functions

One of the useful examples of merging objects.  
Often used to create sample objects in tests.  

```ts
// src/spread-syntax/merge-objects.ts
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

```


# Destructure

## Arrays

We can get elements more easily by using destructure.  

```ts
// src/destructure/merges.ts
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

```

Also can get remaining elements as an *Array*

```ts
// src/destructure/merges.ts
const a = [1, 2, 3, 4, 5];

const [x, y, ...z] = a;
console.log(x, y, z); // 1 2 [ 3, 4, 5 ]  // `z` is an Array containing the rest of the elements
```

## Objects

```ts
// src/destructure/objects.ts
type User = {
  id: number;
  name: string;
  active?: boolean;
  type: "admin" | "user";
};

const alice: User = {
  id: 0,
  name: "alice",
  type: "admin",
};

{
  // access properties then assign the values to variables
  const id = alice.id;
  const username = alice.name;
  const active: boolean = alice.active ?? false;

  console.log({ id, username, active }); // { id: 0, username: 'alice', active: false }
}

{
  // using destructure
  const { id, name: username, active = false } = alice;

  console.log({ id, username, active }); // { id: 0, username: 'alice', active: false }
}

```

We can define polymorphic functions using object destructure.

```ts
// src/destructure/objects.ts
type Person = {
  firstName: string;
  lastName: string;
};

type Student = Person & {
  studentNo: number;
};

type Teacher = Person & {
  subject: string;
};

const alice: Student = {
  studentNo: 1,
  firstName: "alice",
  lastName: "williams",
};

const bob: Teacher = {
  subject: "science",
  firstName: "bob",
  lastName: "smith",
};

{
  // ordinal function
  const fmtFullName = (firstName: string, lastName: string) =>
    `${firstName} ${lastName}`;

  console.log(fmtFullName(alice.firstName, alice.lastName));  // alice williams
  console.log(fmtFullName(bob.firstName, bob.lastName));  // bob smith
}

{
  // polymorphic ver.
  const fmtFullName = ({ firstName, lastName }: Person) =>
    `${firstName} ${lastName}`;

  // both `alice` and `bob` can be applied `fmtFullName` even their types are defferent
  // because they have `firstName` and `lastName` properties.
  console.log(fmtFullName(alice));  // alice williams
  console.log(fmtFullName(bob));  // bob smith
}
```

# Higher-Order Functions

Functional style using higher-order functions makes code declarative and more concise.  

## [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

```ts
// src/hof/map.ts
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

```

```ts
// src/hof/map.ts
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

```


## [filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

```ts
// src/hof/map.ts
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

```

```ts
// src/hof/map.ts
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

```

## [reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

```ts
// src/hof/reduce
const a = [1, 2, 3, 4, 5];

{
  // imperative
  let sum = 0;
  for (const v of a) {
    sum += v;
  }

  console.log(sum); // 15
}

{
  // using reduce()
  const sum = a.reduce((acc, v) => acc + v, 0);

  console.log(sum); // 15
}

```

### Tip: initialValue

Set *initialValue* to `reduce()` as much as possible.  
If *initialValue* is omitted, the first element of the array of the argument is used as the initial value.  
In this case, an error raised if the passed array is empty.  

```ts
// src/hof/reduce
const a: number[] = [];

const sum = a.reduce((acc, v) => acc + v); // TypeError: Reduce of empty array with no initial value

```

## [flatMap()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)

```ts
// src/hof/flatMap.ts
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
```

## [every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

```ts
// src/hof/every.ts
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

```

Return `true` for empty arrays.

```ts
// src/hof/every.ts
const users: User[] = [];

console.log(users.every((user) => user.active)); // true
```


## [some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

```ts
// src/hof/some.ts
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

```

Return `false` for empty arrays.  

```ts
// src/hof/some.ts
const users: User[] = [];

console.log(users.some((user) => user.active)); // false

```

# Short-Circuit Evaluation

`||` operator and `??` operator can be used for short-circuit evaluations.  

## Logical OR Operator `||`

Let an expression `a || b`, if `a` evaluate to `true` then return `a` without evaluation on `b`; otherwise return `b`.  

### Warning

Use `??` instread if falsy values such as `""` (empty string) and `0` are valida values.  

___

```ts
// src/short-circuits/logical-or.ts
const defaultValue = "username";

{
  const readUserInput = () => "alice";

  const input = readUserInput() || defaultValue;

  console.log(input); // "alice"
}

{
  const readUserInput1 = () => "";

  const input = readUserInput1() || defaultValue;

  console.log(input); // "alice"
}

{
  const readUserInput1 = () => null;

  const input = readUserInput1() || defaultValue;

  console.log(input); // "username"
}

{
  const readUserInput1 = () => undefined;

  const input = readUserInput1() || defaultValue;

  console.log(input); // "username"
}

```

```ts
// src/short-circuits/logical-or.ts
const defaultValue = 1;

{
  const readUserInput = () => 100;

  const input = readUserInput() || defaultValue;

  console.log(input); // 100
}

{
  const readUserInput1 = () => 0;

  const input = readUserInput1() || defaultValue;

  console.log(input); // 100
}

{
  const readUserInput1 = () => null;

  const input = readUserInput1() || defaultValue;

  console.log(input); // 1
}

{
  const readUserInput1 = () => undefined;

  const input = readUserInput1() || defaultValue;

  console.log(input); // 1
}

```

## Nullish Coalescing Operator `??`

Let an expression `a || b`, if `a` evaluate to `null` or `undefined` then return `a` without evaluation on `b`; otherwise return `b`.  

```ts
// src/short-circuits/nullish-coalescing.ts
const defaultValue = "username";

{
  const readUserInput = () => "alice";

  const input = readUserInput() ?? defaultValue;

  console.log(input); // "alice"
}

{
  const readUserInput1 = () => "";

  const input = readUserInput1() ?? defaultValue;

  console.log(input); // ""
}

{
  const readUserInput1 = () => null;

  const input = readUserInput1() ?? defaultValue;

  console.log(input); // "username"
}

{
  const readUserInput1 = () => undefined;

  const input = readUserInput1() ?? defaultValue;

  console.log(input); // "username"
}

```

```ts
// src/short-circuits/nullish-coalescing.ts
const defaultValue = 1;

{
  const readUserInput = () => 100;

  const input = readUserInput() ?? defaultValue;

  console.log(input); // 100
}

{
  const readUserInput1 = () => 0;

  const input = readUserInput1() ?? defaultValue;

  console.log(input); // 0
}

{
  const readUserInput1 = () => null;

  const input = readUserInput1() ?? defaultValue;

  console.log(input); // 1
}

{
  const readUserInput1 = () => undefined;

  const input = readUserInput1() ?? defaultValue;

  console.log(input); // 1
}

```

# Empty Arrays and Empty Objects

Be careful about that empty arrays and empty objects evalute to `true` in boolean contexts in JavaScript.  

Also, note that comparison `[] === []` and `{} === {}` get to be `false` because operands are different objects.  

Definitely check the `Array.length` to check whether the array is empty or not.    

```ts
// src/empties/empties.ts
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
  if (a === []) {
    console.log("same!");
  } else {
    console.log("not the same!");
  }
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

```

```ts
// src/empties/empties.ts
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
  if (o === {}) {
    console.log("same!");
  } else {
    console.log("not the same!");
  }
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

```

# Casts

## flaot -> int

```ts
// src/casts/casts.ts
console.log(Math.floor(1.23)); // 1

```

### Warning: Don't use `|` operator to cast float to integer

Expression `n | 0` using bitwise OR operator works only the operand `n` is an 32-bit integer as casting; otherwise the result of the expression will overflow.  

```ts
// src/casts/casts.ts

// Don't do this!; only works when the operand is 32-bit int
console.log(1.23 | 0); // 1

console.log(2147483647.123 | 0); // 2147483647
console.log(2147483648.123 | 0); // -2147483648; Overflowed!

```

## any -> boolean

Use `Boolean()` or `!!` (double negation).  

### Tip: Double negation `!!`

`!!o` can be expressed as `!(!o)`.  
In `!o`, `o` evalutes to an boolean value so `!o` results an negated boolean value of `o`.  
Thus enagting it again, we get the boolean value of `o`.  

### Warning: Don't use `new Boolean()`

`new Boolean()` create a new Boolean **object**, not a primitive Boolean **value**.  

___


```ts
// src/casts/casts.ts

{
  // using Boolean()
  console.log(Boolean(-1)); // true
  console.log(Boolean(0)); // false
  console.log(Boolean(1)); // true

  console.log(Boolean("")); // false
  console.log(Boolean("s")); // true

  console.log(Boolean([])); // true
  console.log(Boolean({})); // true

  console.log(Boolean(null)); // false
  console.log(Boolean(undefined)); // false
}

{
  // using `!!`
  console.log(!!-1); // true
  console.log(!!0); // false
  console.log(!!1); // true

  console.log(!!""); // false
  console.log(!!"s"); // true

  console.log(!![]); // true
  console.log(!!{}); // true

  console.log(!!null); // false
  console.log(!!undefined); // false
}

```

# Type Guards

The functions, which take an argument `arg` and return a boolean value as `arg is T`, give type information about `arg` to static analysis tools.  
These functions are called *type guard*s.  

```ts
// src/type-guards/type-guards.ts

type User = {
  id: number;
  name: string;
  active: boolean;
};

const isUser = (arg: unknown): arg is User => {
  const x = arg as User;

  return (
    typeof x?.id === "number" &&
    typeof x?.name === "string" &&
    typeof x?.active === "boolean"
  );
};

const f = (x: unknown) => {
  x.name; // TSError: 'x' is of type 'unknown'.ts(18046)

  if (isUser(x)) {
    x.name; // OK; statc analysis tool knows `x` is `User` type in this clause thanks to type guard *isUser()*
  }
};

```

Type guards are also used validator for values whose type is unknown at compile time (e.g. user inputs, data sent from backend, etc.).  

```ts
// src/type-guards/type-guards.ts
const fetchUser = async ({ id }: { id: number }): Promise<User> => {
  const res = await fetch(`/users/${id}`);

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} - ${res.statusText}`);
  }

  const json = await res.json();
  if (!isUser(json)) {
    throw new Error(`API Error: unexpected content`);
  }

  return json;
};

```

## [Zod](https://zod.dev/)

*Zod* is a TypeScript-first schema-based data validation library.  
Using zod, we can create validators defining types more easily.  

```ts
// src/type-guards/type-guards.ts

const zUser = z.object({
  id: z.number(),
  name: z.string(),
  active: z.boolean(),
});

type User = z.infer<typeof zUser>;

{
  const fetchUser = async ({ id }: { id: number }): Promise<User> => {
    const res = await fetch(`/users/${id}`);

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} - ${res.statusText}`);
    }

    const json = await res.json();

    const validationRes = zUser.safeParse(json);
    if (!validationRes.success) {
      throw new Error(
        `API Error: unexpected content; ${validationRes.error}`
      );
    }

    return validationRes.data;
  };
}

```

