{
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
}

{
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
}
