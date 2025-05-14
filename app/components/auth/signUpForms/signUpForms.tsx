import { SignUpFormOne } from "./signUpFormOne";

export const SignUpForms = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col w-sm gap-2">
        <h1 className="text-4xl font-bold text-left">Sign up</h1>
        <p className="text-gray-500 mb-4">Create an account to get started</p>
        <SignUpFormOne />
      </div>
    </div>
  );
};
