import { RegisterForm } from "./RegisterForm";

export const metadata = {
  title: "Register your startup — Ventroot",
};

export default function RegisterPage() {
  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-900">
            Register your startup
          </h1>
          <p className="mt-2 text-brand-700">
            Share your venture with the Ventroot network — any sector but
            hospitality on the anchor investor's track. All fields marked
            with * are required.
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
