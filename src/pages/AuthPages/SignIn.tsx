import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="SignIn Dashboard"
        description="This is React.js SignIn Tables Dashboard page"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
