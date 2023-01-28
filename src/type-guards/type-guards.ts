import { z } from "zod";

{
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
    // x.name; // TSError; 'x' is of type 'unknown'.ts(18046)

    if (isUser(x)) {
      x.name; // OK; statc analysis tool knows `x` is `User` type in this clause thanks to type guard *isUser()*
    }
  };

  {
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
  }
}

{
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
}
