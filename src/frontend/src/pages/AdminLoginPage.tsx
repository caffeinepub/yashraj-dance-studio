import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "@tanstack/react-router";
import { Fingerprint, Shield } from "lucide-react";
import { useEffect } from "react";

export default function AdminLoginPage() {
  const { session, login } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (session.isLoggedIn) {
      navigate({ to: "/admin" });
    }
  }, [session.isLoggedIn, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,188,212,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/assets/yashraj-logo.png"
            alt="Yashraj Dance Studio"
            className="h-24 w-auto object-contain"
          />
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "#111111",
            border: "1px solid #1f1f1f",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,188,212,0.15), rgba(124,58,237,0.15))",
                border: "1px solid rgba(0,188,212,0.2)",
              }}
            >
              <Shield size={22} style={{ color: "#00bcd4" }} />
            </div>
            <h1
              className="text-2xl font-bold mb-1"
              style={{ color: "#ffffff", fontFamily: "var(--font-display)" }}
            >
              Admin Login
            </h1>
            <p className="text-sm" style={{ color: "#666" }}>
              Access the studio management panel
            </p>
          </div>

          {/* Info box */}
          <div
            className="mb-7 px-4 py-3 rounded-xl text-sm text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,188,212,0.06), rgba(124,58,237,0.06))",
              border: "1px solid rgba(0,188,212,0.15)",
              color: "#a0a0a0",
            }}
          >
            Sign in with your Internet Identity to manage photos and enquiries
          </div>

          {/* Internet Identity Button */}
          <button
            type="button"
            disabled={session.isValidating}
            onClick={login}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-semibold text-sm transition-smooth disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #00bcd4, #7c3aed)",
              color: "#ffffff",
              cursor: session.isValidating ? "not-allowed" : "pointer",
            }}
            data-ocid="admin-ii-login-btn"
          >
            <Fingerprint size={18} />
            {session.isValidating
              ? "Connecting..."
              : "Login with Internet Identity"}
          </button>
        </div>

        <p className="text-center mt-6 text-xs" style={{ color: "#333" }}>
          Yashraj Dance Studio — Admin Panel
        </p>
      </div>
    </div>
  );
}
