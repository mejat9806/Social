import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { UseFormReturn } from "react-hook-form";

interface FormInput {
  form: UseFormReturn<
    {
      email: string;
      password: string;
      passwordConfirmed: string;
      username: string;
    },
    undefined
  >;
  label: string;
  placeholder: string;
  name: "email" | "password" | "passwordConfirmed" | "username";
  type: string;
}

function FormInputRegister({
  form,
  label,
  placeholder,
  name,
  type,
}: FormInput) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel className="text-white capitalize">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className=""
              type={type}
              autoComplete="on"
            />
          </FormControl>
          <FormMessage className="absolute " />
        </FormItem>
      )}
    />
  );
}

export default FormInputRegister;
