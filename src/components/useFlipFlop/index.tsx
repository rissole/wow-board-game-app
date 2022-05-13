import { useMemo, useState } from "react";

export default function useFlipFlop(defaultValue = false) {
  const [value, setValue] = useState<boolean>(defaultValue);

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
