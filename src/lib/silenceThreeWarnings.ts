import { setConsoleFunction } from "three";

let installed = false;

export function silenceThreeClockDeprecation() {
  if (installed) return;
  installed = true;

  setConsoleFunction((type, message, ...rest) => {
    if (
      type === "warn" &&
      typeof message === "string" &&
      message.includes("Clock") &&
      message.includes("deprecated")
    ) {
      return;
    }
    if (type === "warn") console.warn(message, ...rest);
    else if (type === "error") console.error(message, ...rest);
    else console.log(message, ...rest);
  });
}
