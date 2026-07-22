import { RegisterForm } from "./RegisterForm";

export const metadata = {
  title: "Register your idea — SeedSprout",
};

export default function RegisterPage() {
  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-900">
            Register your sustainable startup
          </h1>
          <p className="mt-2 text-brand-700">
            Share your idea with the SeedSprout community and seed investors. All
            fields marked with * are required.
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
