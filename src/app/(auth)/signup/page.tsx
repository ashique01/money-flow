"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, ArrowRight, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";

export default function SignupPage() {
  const router = useRouter();

  const { theme, setTheme } = useTheme();
  const setUser = useAuthStore((s) => s.setUser);

  const [mounted, setMounted] = useState(false);

  const [email, setEmail] = useState("");

  const allowedEmails = ["ashiquemurad@gmail.com", "rifaa5164@gmail.com"];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignup = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail) {
        alert("Email is required");
        return;
      }

      router.push(`/login?email=${encodeURIComponent(normalizedEmail)}`);
    },
    [email, router],
  );
  return (
    <div
      className="
      relative
      flex
      min-h-screen
      items-center
      justify-center
      overflow-hidden
      p-4
      "
    >
      {/* Background */}

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

      {/* Theme button */}

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

      {/* Card */}

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
            <User size={24} className="text-primary" />
          </div>

          <h1
            className="
            text-2xl
            font-bold
            "
          >
            Join MoneyFlow
          </h1>

          <p
            className="
            mt-1.5
            text-sm
            text-muted-foreground
            "
          >
            Access is limited to invited users
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
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

            <Input
              type="email"

              placeholder="you@example.com"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

              className="h-11"
            />
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
          Already have access?{" "}
          <Link
            href="/login"

            className="
            font-medium
            text-primary
            hover:underline
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
