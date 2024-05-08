// import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Form } from "../form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../button";
import FormInputRegister from "../FormInputRegister";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "../use-toast";

function Register() {
  const navigate = useNavigate();
  const registerFormSchema = z
    .object({
      email: z
        .string()
        .min(1, { message: "Please enter a valid email address" })
        .email(),
      password: z.string().min(8, { message: "Need 8 character" }),
      passwordConfirmed: z.string().min(8, { message: "Need 8 character" }),
      username: z
        .string()
        .min(3, { message: "Please enter atleast 3 characters" }),
    })
    .refine((data) => data.password === data.passwordConfirmed, {
      message: "passwords do not match",
      path: ["passwordConfirmed"], //error path
    });

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmed: "",
      username: "",
    },
  });
  async function registerUser(values: z.infer<typeof registerFormSchema>) {
    const { data } = await axios.post("users/register", {
      email: values.email,
      username: values.username,
      password: values.password,
      passwordConfirmed: values.passwordConfirmed,
    });
    if (data.error) {
      console.log(data.error);
    } else {
      toast({
        title: "ok created",
        description: "user created successfully",
        variant: "success",
        //className: cn(),
      });
      navigate("/login");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(registerUser)}
        className="space-y-8 flex flex-col  capitalize  "
      >
        <FormInputRegister
          form={form}
          label={"email"}
          placeholder={"email"}
          name="email"
          type="email"
        />

        <FormInputRegister
          form={form}
          label={"username"}
          placeholder={"username"}
          name="username"
          type="string"
        />
        <FormInputRegister
          form={form}
          label={"password"}
          placeholder={"password"}
          name="password"
          type="password"
        />
        <FormInputRegister
          form={form}
          label={"password Confirmed"}
          placeholder={"passwordConfirmed"}
          name="passwordConfirmed"
          type="password"
        />

        <Button type="submit" className="hover:bg-slate-600 ">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default Register;
