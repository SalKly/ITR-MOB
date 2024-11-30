import { z } from "zod";

export type ZodParserHook = {
  triggerParser: <Input, Output>(input: Input, parser: z.ZodType<Output, any, Input>) => Output;
};

export const useZodParser = (): ZodParserHook => {
  const triggerParser = <Input, Output>(input: Input, parser: z.ZodType<Output, any, Input>): Output => {
    const result = parser.safeParse(input);
    if (result.success) {
      return result.data;
    } else {
      console.error("Error Validating Data", result.error.message);
      throw new Error(result.error.message);
    }
  };
  return { triggerParser };
};
