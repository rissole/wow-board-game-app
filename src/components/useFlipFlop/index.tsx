import { useMemo, useState } from "react";

export default function useFlipFlop() {
  const [value, setValue] = useState<boolean>(false);

  return useMemo(
    () => ({
      value,
      toggle: () => setValue((v) => !v),
      setOff: () => setValue(false),
      setOn: () => setValue(true),
    }),
    [value, setValue]
  );
}
