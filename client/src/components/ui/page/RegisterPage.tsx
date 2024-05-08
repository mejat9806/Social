import Register from "./Register";

function RegisterPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className="bg-slate-100 p-10 rounded-3xl flex flex-col mb-24 justify-center items-center shadow-2xl w-[30%]">
        <h1 className="text-3xl font-semibold uppercase">Register</h1>
        <div className="h-1 w-full bg-slate-300/50 my-5 rounded-xl"></div>
        <Register />
      </div>
    </div>
  );
}

export default RegisterPage;
