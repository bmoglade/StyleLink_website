"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { AuthHeader } from "@/components/layout/AuthHeader";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { siteConfig } from "@/lib/config";
import { isValidUsername, sanitizeText } from "@/lib/utils";

/**
 * Signup Page
 * ===========
 * Route: /signup
 * Email + password signup with Google OAuth.
 * After signup, prompts creator to set their username.
 */
export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"signup" | "username">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: sanitizeText(displayName) },
        },
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      setStep("username");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${siteConfig.url}/auth/callback`,
      },
    });
  };

  const checkUsername = async (value: string) => {
    setUsername(value.toLowerCase());
    if (!isValidUsername(value.toLowerCase())) {
      setUsernameAvailable(null);
      return;
    }

    const supabase = createClient();
    const { data } = await supabase
      .from("creators")
      .select("username")
      .eq("username", value.toLowerCase())
      .single();

    setUsernameAvailable(!data);
  };

  const handleSetUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!isValidUsername(username)) {
      setError(
        "Username must be 3-20 characters, lowercase, letters/numbers/underscores only"
      );
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Session expired. Please log in again.");
        return;
      }

      const { error: insertError } = await supabase.from("creators").insert({
        auth_id: user.id,
        username: username,
        display_name: sanitizeText(displayName) || user.email?.split("@")[0] || "Creator",
      });

      if (insertError) {
        if (insertError.message.includes("unique")) {
          setError("This username is already taken.");
        } else {
          setError(insertError.message);
        }
        return;
      }

      // Force full page reload to ensure cookies are set properly
      window.location.href = "/dashboard";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Set username
  if (step === "username") {
    return (
      <div className="flex min-h-screen flex-col">
        <AuthHeader />
        <main className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-sm">
            <div className="mb-8 text-center">
              <h1 className="font-display text-3xl font-bold text-primary-dark">
                Choose your URL
              </h1>
              <p className="mt-2 text-sm text-text-secondary">
                This will be your public storefront link
              </p>
            </div>

            <form onSubmit={handleSetUsername} className="space-y-4">
              <div>
                <Input
                  label="Username"
                  value={username}
                  onChange={(e) => checkUsername(e.target.value)}
                  placeholder="priya_styles"
                  helperText={`${siteConfig.url}/${username || "your-name"}`}
                  error={
                    username && !isValidUsername(username)
                      ? "3-20 chars, lowercase, letters/numbers/underscores"
                      : undefined
                  }
                />
                {usernameAvailable === true && isValidUsername(username) && (
                  <p className="mt-1 text-xs text-green-600">
                    ✓ Username available!
                  </p>
                )}
                {usernameAvailable === false && (
                  <p className="mt-1 text-xs text-red-600">
                    ✗ Username taken
                  </p>
                )}
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                disabled={!usernameAvailable || !isValidUsername(username)}
                className="w-full"
              >
                Create My Storefront
              </Button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Step 1: Sign up
  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl font-bold text-primary-dark">
              Join {siteConfig.name}
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Create your storefront and start earning
            </p>
          </div>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleSignup}
            type="button"
            className="flex w-full items-center justify-center gap-3 border border-border px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-background transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-surface px-4 text-text-secondary">or</span>
            </div>
          </div>

          <form onSubmit={handleEmailSignup} className="space-y-4">
            <Input
              label="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Priya Sharma"
              required
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              minLength={6}
              required
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-gold-accent hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
