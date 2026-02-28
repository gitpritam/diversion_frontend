import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/app"
        appearance={{
          variables: {
            colorPrimary: "#818cf8",
            colorBackground: "hsl(240 10% 8%)",
            colorInputBackground: "hsl(240 10% 10%)",
            colorText: "hsl(0 0% 97%)",
            colorTextSecondary: "hsl(0 0% 52%)",
            colorInputText: "hsl(0 0% 97%)",
            borderRadius: "0.75rem",
          },
          elements: {
            card: "shadow-xl border border-white/8",
            headerTitle: "text-foreground",
            headerSubtitle: "text-muted-foreground",
          },
        }}
      />
    </div>
  );
}
