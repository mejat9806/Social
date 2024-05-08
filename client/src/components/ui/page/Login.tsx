import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Form } from "../form";
import { Button } from "../button";
import FormInputLogin from "@/components/ui/FormInputLogin";
import { toast } from "../use-toast";
import { cn } from "@/lib/utils";

function Login() {
  const navigate = useNavigate();
  const LoginFormSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Please enter a valid email address" })
      .email(),
    password: z.string().min(8),
  });

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    const { data } = await axios.post("users/login", {
      email: values.email,
      password: values.password,
    });
    if (data.error) {
      console.log(data.error);
    } else {
      toast({
        title: "Welcome",
        variant: "success",
        className: cn(),
      });
      navigate("/");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col gap-6 capitalize"
      >
        <FormInputLogin
          form={form}
          label={"email"}
          placeholder={"email"}
          name="email"
          type="email"
        />
        <FormInputLogin
          form={form}
          label={"password"}
          placeholder={"password"}
          name="password"
          type="password"
        />

        <Button type="submit" className="hover:bg-slate-600 ">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default Login;
