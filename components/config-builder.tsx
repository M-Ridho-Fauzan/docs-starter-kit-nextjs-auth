"use client";

import { useState, useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Copy, Eye, EyeOff, X } from "lucide-react";

type OAuthProvider = "github" | "google";

type OAuthConfig = {
  enabled: boolean;
  clientId: string;
  clientSecret: string;
};

type ConfigState = {
  emailPassword: boolean;
  emailVerification: boolean;
  passwordReset: boolean;
  twoFactor: boolean;
  roles: boolean;
  oauth: Record<OAuthProvider, OAuthConfig>;
  customOAuth: { name: string; clientId: string; clientSecret: string }[];
  database: "prisma" | "drizzle" | "kysely";
  session: "jwt" | "database";
};

const defaultConfig: ConfigState = {
  emailPassword: true,
  emailVerification: true,
  passwordReset: true,
  twoFactor: false,
  roles: false,
  oauth: {
    github: { enabled: true, clientId: "", clientSecret: "" },
    google: { enabled: false, clientId: "", clientSecret: "" },
  },
  customOAuth: [],
  database: "prisma",
  session: "jwt",
};

function generateAuthConfig(config: ConfigState): string {
  const lines: string[] = [];
  lines.push('import { defineAuthConfig } from "@/auth/config";');
  lines.push("");
  lines.push("export default defineAuthConfig({");
  lines.push("  database: {");
  lines.push(`    adapter: "${config.database}",`);
  lines.push("    url: process.env.DATABASE_URL!,");
  lines.push("  },");
  lines.push("  features: {");

  if (config.emailPassword) {
    lines.push("    emailPassword: {");
    lines.push("      enabled: true,");
    lines.push(`      requireEmailVerification: ${config.emailVerification},`);
    lines.push("      passwordMinLength: 8,");
    lines.push("    },");
  }

  if (config.passwordReset) {
    lines.push(`    passwordReset: ${config.passwordReset},`);
  }

  const enabledOAuth = Object.entries(config.oauth).filter(
    ([_, v]) => v.enabled,
  );

  if (enabledOAuth.length > 0 || config.customOAuth.length > 0) {
    lines.push("    oauth: {");

    for (const [provider, cfg] of enabledOAuth) {
      lines.push(`      ${provider}: {`);
      lines.push("        enabled: true,");
      lines.push(
        `        clientId: process.env.${provider.toUpperCase()}_CLIENT_ID!,`,
      );
      lines.push(
        `        clientSecret: process.env.${provider.toUpperCase()}_CLIENT_SECRET!,`,
      );
      lines.push("      },");
    }

    for (const provider of config.customOAuth) {
      if (!provider.name) continue;
      lines.push(`      ${provider.name}: {`);
      lines.push("        enabled: true,");
      lines.push(
        `        clientId: process.env.${provider.name.toUpperCase()}_CLIENT_ID!,`,
      );
      lines.push(
        `        clientSecret: process.env.${provider.name.toUpperCase()}_CLIENT_SECRET!,`,
      );
      lines.push("      },");
    }

    lines.push("    },");
  }

  if (config.twoFactor) {
    lines.push("    twoFactor: {");
    lines.push("      enabled: true,");
    lines.push('      methods: ["totp"],');
    lines.push("    },");
  }

  if (config.roles) {
    lines.push("    roles: {");
    lines.push("      enabled: true,");
    lines.push('      defaultRole: "user",');
    lines.push('      roles: ["user", "admin"],');
    lines.push("    },");
  }

  lines.push("  },");
  lines.push("  session: {");
  lines.push(`    expiresIn: "7d",`);
  lines.push(`    strategy: "${config.session}",`);
  lines.push('    cookieName: "auth_session",');
  lines.push("  },");
  lines.push("  ui: {");
  lines.push('    theme: "shadcn",');
  lines.push('    redirectAfterLogin: "/dashboard",');
  lines.push('    redirectAfterLogout: "/",');
  lines.push('    twoFactorSettingsPath: "/settings/2fa",');
  lines.push('    protectedPaths: ["/dashboard", "/settings"],');
  lines.push("    roleRestrictions: {");
  lines.push('      "/admin": ["admin"],');
  lines.push("    },");
  lines.push("  },");
  lines.push("});");

  return lines.join("\n");
}

function generateEnv(config: ConfigState, showSecrets: boolean = false): string {
  const lines: string[] = [];

  // Header banner
  lines.push("# ═══════════════════════════════════════════");
  lines.push("# NextJS Auth Starter Kit — Environment Variables");
  lines.push("# ═══════════════════════════════════════════");
  lines.push("");

  // Database section
  lines.push("# ─── Database ───");
  lines.push("DATABASE_URL=");
  lines.push("");

  // Better Auth section
  lines.push("# ─── Better Auth ───");
  lines.push("BETTER_AUTH_SECRET=");
  lines.push("BETTER_AUTH_URL=http://localhost:3000");

  // OAuth Providers section
  const hasGithub = config.oauth.github.enabled;
  const hasGoogle = config.oauth.google.enabled;
  const hasCustom = config.customOAuth.some(
    (p) => p.name.trim() !== "",
  );

  if (hasGithub || hasGoogle || hasCustom) {
    lines.push("");
    lines.push("# ─── OAuth Providers ───");

    // GitHub
    if (hasGithub) {
      lines.push(
        `GITHUB_CLIENT_ID=${showSecrets ? config.oauth.github.clientId : ""}`,
      );
      lines.push(
        `GITHUB_CLIENT_SECRET=${showSecrets ? config.oauth.github.clientSecret : ""}`,
      );
    } else {
      lines.push("# GITHUB_CLIENT_ID=");
      lines.push("# GITHUB_CLIENT_SECRET=");
    }

    // Google
    if (hasGoogle) {
      lines.push(
        `GOOGLE_CLIENT_ID=${showSecrets ? config.oauth.google.clientId : ""}`,
      );
      lines.push(
        `GOOGLE_CLIENT_SECRET=${showSecrets ? config.oauth.google.clientSecret : ""}`,
      );
    } else {
      lines.push("# GOOGLE_CLIENT_ID=");
      lines.push("# GOOGLE_CLIENT_SECRET=");
    }

    // Custom providers
    for (const provider of config.customOAuth) {
      if (!provider.name.trim()) continue;
      const name = provider.name.toUpperCase();
      lines.push(
        `${name}_CLIENT_ID=${showSecrets ? provider.clientId : ""}`,
      );
      lines.push(
        `${name}_CLIENT_SECRET=${showSecrets ? provider.clientSecret : ""}`,
      );
    }
  }

  return lines.join("\n");
}

export function ConfigBuilder() {
  const [config, setConfig] = useState<ConfigState>(defaultConfig);
  const [copied, setCopied] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);
  const [activeTab, setActiveTab] = useState<"config" | "env">("config");

  const update = useCallback(
    <K extends keyof ConfigState>(key: K, value: ConfigState[K]) => {
      setConfig((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const updateOAuth = useCallback(
    (provider: OAuthProvider, value: Partial<OAuthConfig>) => {
      setConfig((prev) => ({
        ...prev,
        oauth: {
          ...prev.oauth,
          [provider]: { ...prev.oauth[provider], ...value },
        },
      }));
    },
    [],
  );

  const addCustomOAuth = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      customOAuth: [
        ...prev.customOAuth,
        { name: "", clientId: "", clientSecret: "" },
      ],
    }));
  }, []);

  const updateCustomOAuth = useCallback(
    (index: number, value: Partial<(typeof config.customOAuth)[number]>) => {
      setConfig((prev) => {
        const next = [...prev.customOAuth];
        next[index] = { ...next[index], ...value };
        return { ...prev, customOAuth: next };
      });
    },
    [],
  );

  const removeCustomOAuth = useCallback((index: number) => {
    setConfig((prev) => ({
      ...prev,
      customOAuth: prev.customOAuth.filter((_, i) => i !== index),
    }));
  }, []);

  const handleCopy = useCallback(async () => {
    const output =
      activeTab === "config"
        ? generateAuthConfig(config)
        : generateEnv(config, showSecrets);
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [config, activeTab, showSecrets]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-sm font-semibold">Auth Methods</h3>
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-password">Email / Password</Label>
              <Switch
                id="email-password"
                checked={config.emailPassword}
                onCheckedChange={(v) => update("emailPassword", v)}
              />
            </div>
            {config.emailPassword && (
              <div className="flex items-center justify-between pl-4">
                <Label htmlFor="email-verification">
                  Require Email Verification
                </Label>
                <Switch
                  id="email-verification"
                  checked={config.emailVerification}
                  onCheckedChange={(v) => update("emailVerification", v)}
                />
              </div>
            )}
            <div className="flex items-center justify-between">
              <Label htmlFor="password-reset">Password Reset</Label>
              <Switch
                id="password-reset"
                checked={config.passwordReset}
                onCheckedChange={(v) => update("passwordReset", v)}
              />
            </div>
          </Card>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Advanced Features</h3>
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor">Two-Factor Auth (TOTP)</Label>
              <Switch
                id="two-factor"
                checked={config.twoFactor}
                onCheckedChange={(v) => update("twoFactor", v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="roles">Role &amp; Permissions</Label>
              <Switch
                id="roles"
                checked={config.roles}
                onCheckedChange={(v) => update("roles", v)}
              />
            </div>
          </Card>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">OAuth Providers</h3>
          <Card className="p-4 space-y-4">
            {(["github", "google"] as const).map((provider) => (
              <div key={provider} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`oauth-${provider}`}>
                    {provider.charAt(0).toUpperCase() + provider.slice(1)}
                  </Label>
                  <Switch
                    id={`oauth-${provider}`}
                    checked={config.oauth[provider].enabled}
                    onCheckedChange={(v) =>
                      updateOAuth(provider, { enabled: v })
                    }
                  />
                </div>
                {config.oauth[provider].enabled && (
                  <div className="grid gap-2 pl-4">
                    <Input
                      placeholder="Client ID"
                      value={config.oauth[provider].clientId}
                      onChange={(e) =>
                        updateOAuth(provider, { clientId: e.target.value })
                      }
                    />
                    <Input
                      type={showSecrets ? "text" : "password"}
                      placeholder="Client Secret"
                      value={config.oauth[provider].clientSecret}
                      onChange={(e) =>
                        updateOAuth(provider, {
                          clientSecret: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            ))}
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Custom Providers</Label>
                <Button variant="outline" size="sm" onClick={addCustomOAuth}>
                  + Add
                </Button>
              </div>
              {config.customOAuth.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {config.customOAuth.map((p, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="cursor-pointer gap-1"
                      onClick={() => removeCustomOAuth(i)}
                    >
                      {p.name || "unnamed"}
                      <X className="size-3" />
                    </Badge>
                  ))}
                </div>
              )}
              {config.customOAuth.map((p, i) => (
                <div key={i} className="grid gap-2 border rounded-md p-3">
                  <Input
                    placeholder="Provider name (e.g. facebook)"
                    value={p.name}
                    onChange={(e) =>
                      updateCustomOAuth(i, { name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Client ID"
                    value={p.clientId}
                    onChange={(e) =>
                      updateCustomOAuth(i, { clientId: e.target.value })
                    }
                  />
                  <Input
                    type={showSecrets ? "text" : "password"}
                    placeholder="Client Secret"
                    value={p.clientSecret}
                    onChange={(e) =>
                      updateCustomOAuth(i, { clientSecret: e.target.value })
                    }
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Database</h3>
          <Card className="p-4">
            <div className="space-y-2">
              <Label htmlFor="database">Adapter</Label>
              <select
                id="database"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={config.database}
                onChange={(e) =>
                  update("database", e.target.value as ConfigState["database"])
                }
              >
                <option value="prisma">Prisma</option>
                <option value="drizzle">Drizzle</option>
                <option value="kysely">Kysely</option>
              </select>
            </div>
          </Card>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Session</h3>
          <Card className="p-4">
            <div className="space-y-2">
              <Label htmlFor="session">Strategy</Label>
              <select
                id="session"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={config.session}
                onChange={(e) =>
                  update("session", e.target.value as ConfigState["session"])
                }
              >
                <option value="jwt">JWT</option>
                <option value="database">Database</option>
              </select>
            </div>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        {/* Tab buttons + actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 rounded-lg border bg-muted p-0.5">
            <button
              onClick={() => setActiveTab("config")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === "config"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              auth.config.ts
            </button>
            <button
              onClick={() => setActiveTab("env")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === "env"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              .env
            </button>
          </div>
          <div className="flex gap-2">
            {activeTab === "env" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSecrets(!showSecrets)}
              >
                {showSecrets ? (
                  <EyeOff className="size-3.5" />
                ) : (
                  <Eye className="size-3.5" />
                )}
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? (
                <Check className="size-3.5" />
              ) : (
                <Copy className="size-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>

        {/* Code output */}
        <pre className="shiki">
          {activeTab === "config"
            ? generateAuthConfig(config)
            : generateEnv(config, showSecrets)}
        </pre>

        <p className="text-xs text-muted-foreground">
          {activeTab === "config"
            ? "Configure these options in your auth.config.ts file. Toggle features above to preview the generated configuration."
            : "Copy these values to your .env file. Use the eye button to show/hide secret values."}
        </p>
      </div>
    </div>
  );
}
