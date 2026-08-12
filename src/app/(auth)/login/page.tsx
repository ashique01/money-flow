"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Mail, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import Link from "next/link";

import { useAuthStore } from "@/store/auth-store";

import { login } from "@/features/auth/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const { theme, setTheme } = useTheme();

  const setUser = useAuthStore((state) => state.setUser);

  const [mounted, setMounted] = useState(false);

  const [email, setEmail] = useState("");

  useEffect(() => {
    setMounted(true);

    const params = new URLSearchParams(window.location.search);

    const queryEmail = params.get("email");

    if (queryEmail) {
      setEmail(queryEmail);
    }
  }, []);

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail) {
        alert("Email is required");

        return;
      }

      try {
        const response = await login(normalizedEmail);

        if (!response.authenticated || !response.user) {
          throw new Error("Authentication failed");
        }

        setUser({
          user_id: response.user.user_id,

          email: response.user.email,

          name: response.user.name,

          avatar: response.user.avatar || "",
        });

        router.push("/dashboard");
      } catch (error) {
        alert(error instanceof Error ? error.message : "Login failed");
      }
    },
    [email, setUser, router],
  );

  return (
    <div
      className="
      relative
      flex
      min-h-screen
      min-h-[100dvh]
      items-center
      justify-center
      overflow-hidden
      p-4
      "
    >
      <div
        className="
        absolute
        inset-0
        -z-10
        "
      >
        <div
          className="
          absolute
          -left-20
          -top-20
          h-80
          w-80
          rounded-full
          bg-primary/15
          blur-[100px]
          "
        />

        <div
          className="
          absolute
          -bottom-20
          -right-20
          h-96
          w-96
          rounded-full
          bg-chart-3/15
          blur-[120px]
          "
        />

        <div
          className="
          absolute
          left-1/2
          top-1/3
          h-64
          w-64
          -translate-x-1/2
          rounded-full
          bg-chart-2/10
          blur-[80px]
          "
        />
      </div>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}

        className="
        glass
        absolute
        right-4
        top-4
        rounded-xl
        p-2.5
        "
      >
        {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
      </button>

      <div
        className={cn(
          "glass-strong",
          "w-full",
          "max-w-md",
          "rounded-2xl",
          "p-6",
          "sm:p-8",
        )}
      >
        <div
          className="
          mb-8
          text-center
          "
        >
          <div
            className="
            mx-auto
            mb-4
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-primary/15
            "
          >
            <span
              className="
              text-2xl
              font-bold
              text-primary
              "
            >
              M
            </span>
          </div>

          <h1
            className="
            text-2xl
            font-bold
            "
          >
            MoneyFlow
          </h1>

          <p
            className="
            mt-1.5
            text-sm
            text-muted-foreground
            "
          >
            Sign in to manage your finances
          </p>
        </div>

        <form
          className="
          space-y-4
          "
          onSubmit={handleLogin}
        >
          <div
            className="
            space-y-1.5
            "
          >
            <label
              className="
              text-xs
              font-medium
              text-muted-foreground
              "
            >
              Email
            </label>

            <div
              className="
              relative
              "
            >
              <Mail
                size={16}

                className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-muted-foreground
                "
              />

              <Input
                type="email"

                placeholder="you@example.com"

                value={email}

                onChange={(e) => setEmail(e.target.value)}

                className="
                h-11
                pl-10
                text-sm
                "
              />
            </div>
          </div>

          <Button
            type="submit"

            size="lg"

            className="
            mt-2
            h-11
            w-full
            gap-2
            "
          >
            Continue
            <ArrowRight size={16} />
          </Button>
        </form>

        <p
          className="
          mt-6
          text-center
          text-xs
          text-muted-foreground
          "
        >
          Don't have access?{" "}
          <Link
            href="/signup"

            className="
            font-medium
            text-primary
            hover:underline
            "
          >
            Request access
          </Link>
        </p>
      </div>
    </div>
  );
}
