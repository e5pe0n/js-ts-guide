{
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
}

{
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
    const fmtFullName = (firstName: string, lastName: string) =>
      `${firstName} ${lastName}`;

    console.log(fmtFullName(alice.firstName, alice.lastName)); // alice williams
    console.log(fmtFullName(bob.firstName, bob.lastName)); // bob smith
  }

  {
    const fmtFullName = ({ firstName, lastName }: Person) =>
      `${firstName} ${lastName}`;

    // both `alice` and `bob` can be applied `fmtFullName`
    // even their types are defferent because they have `firstName` and `lastName` properties; Polymorphism
    console.log(fmtFullName(alice)); // alice williams
    console.log(fmtFullName(bob)); // bob smith
  }
}
