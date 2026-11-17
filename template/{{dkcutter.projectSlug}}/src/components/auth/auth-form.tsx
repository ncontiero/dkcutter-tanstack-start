{%- set i18n = dkcutter.useParaglideJs -%}
{%- set rhf = dkcutter.useReactHookForm -%}
{%- set ui = dkcutter.useShadcn -%}
{%- macro text(on, key, value) -%}
{%- if on -%}{m.{{ key }}()}{%- else -%}{{ value|safe }}{%- endif -%}
{%- endmacro -%}
{%- macro attr(on, key, value) -%}
{%- if on -%}={m.{{ key }}()}{%- else -%}="{{ value|safe }}"{%- endif -%}
{%- endmacro -%}
{%- macro expr(on, key, value) -%}
{%- if on -%}m.{{ key }}(){%- else -%}"{{ value|safe }}"{%- endif -%}
{%- endmacro -%}
{%- if rhf and ui -%}
import type { ReactNode } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  Controller,
  useForm,
} from "react-hook-form";
{%- elif rhf -%}
import { type ComponentProps, type ReactNode, useId } from "react";
import { useForm } from "react-hook-form";
{%- else -%}
import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  useId,
  useState,
} from "react";
{%- endif %}
{%- if rhf %}
import { zodResolver } from "@hookform/resolvers/zod";
{%- endif %}
import { Link, useNavigate } from "@tanstack/react-router";
{%- if rhf %}
import { z } from "zod";
{%- endif %}
{%- if ui %}
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
{%- if rhf %}
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
{%- else %}
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
{%- endif %}
import { Input } from "@/components/ui/input";
{%- endif %}
import { authClient } from "@/lib/auth/client";
{%- if i18n %}
import { m } from "@/paraglide/messages";
{%- endif %}
{%- if rhf %}

// Better Auth requires at least 8 characters by default (`emailAndPassword.minPasswordLength`).
const signInSchema = z.object({
{%- if i18n %}
  email: z.email({ error: () => m.authEmailInvalid() }),
  password: z.string().min(8, { error: () => m.authPasswordMin() }),
{%- else %}
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Use at least 8 characters"),
{%- endif %}
});
const signUpSchema = signInSchema.extend({
{%- if i18n %}
  name: z
    .string()
    .trim()
    .min(1, { error: () => m.authNameRequired() }),
{%- else %}
  name: z.string().trim().min(1, "Enter your name"),
{%- endif %}
});

type SignInValues = z.infer<typeof signInSchema>;
type SignUpValues = z.infer<typeof signUpSchema>;
{%- endif %}

function AuthCard({
  title,
  description,
  footer,
  children,
}: {
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
{%- if ui %}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          {footer}
        </CardFooter>
      </Card>
{%- else %}
      <div className="w-full max-w-sm space-y-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="space-y-1.5">
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {children}
        <p className="text-center text-sm text-muted-foreground">{footer}</p>
      </div>
{%- endif %}
    </div>
  );
}
{%- if rhf and ui %}

function TextField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  autoComplete,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            {...field}
            id={field.name}
            type={type}
            autoComplete={autoComplete}
            aria-invalid={fieldState.invalid}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
{%- elif ui %}

function TextField({
  label,
  ...props
}: ComponentProps<typeof Input> & { label: string }) {
  const id = useId();

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input id={id} required {...props} />
    </Field>
  );
}
{%- else %}

function TextField({
  label,
{%- if rhf %}
  error,
{%- endif %}
  ...props
}: ComponentProps<"input"> & { label: string{% if rhf %}; error?: string{% endif %} }) {
  const id = useId();

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
{%- if rhf %}
        aria-invalid={!!error}
{%- else %}
        required
{%- endif %}
        className="
          h-9 w-full rounded-md border bg-background px-3 text-sm shadow-sm outline-none focus-visible:ring-2
          focus-visible:ring-ring aria-invalid:border-destructive
        "
        {...props}
      />
{%- if rhf %}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
{%- endif %}
    </div>
  );
}
{%- endif %}

function FormError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}

function SubmitButton({
  isPending,
  children,
}: {
  isPending: boolean;
  children: ReactNode;
}) {
  return (
{%- if ui %}
    <Button type="submit" className="w-full" disabled={isPending}>
      {children}
    </Button>
{%- else %}
    <button
      type="submit"
      disabled={isPending}
      className="
        inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium
        text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none
        disabled:opacity-50
      "
    >
      {children}
    </button>
{%- endif %}
  );
}

const linkClassName =
  "font-medium text-foreground underline-offset-4 hover:underline";

export function SignInForm() {
  const navigate = useNavigate();
{%- if rhf %}
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: SignInValues) => {
    const { error } = await authClient.signIn.email(values);
    if (error) {
      form.setError("root", {
        message: error.message ?? {{ expr(i18n, "authError", "Something went wrong. Try again.") }},
      });
      return;
    }
    await navigate({ to: "/" });
  };
  const error = form.formState.errors.root?.message;
  const isPending = form.formState.isSubmitting;
{%- else %}
  const [error, setError] = useState<string>();
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setIsPending(true);
    const { error: authError } = await authClient.signIn.email({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });
    setIsPending(false);

    if (authError) {
      setError(authError.message ?? {{ expr(i18n, "authError", "Something went wrong. Try again.") }});
      return;
    }
    await navigate({ to: "/" });
  };
{%- endif %}

  return (
    <AuthCard
      title{{ attr(i18n, "authSignIn", "Sign in") }}
      description{{ attr(i18n, "authSignInDescription", "Welcome back! Sign in to your account.") }}
      footer={
        <>
          {{ text(i18n, "authNoAccount", "Don't have an account?") }}{" "}
          <Link to="/sign-up" className={linkClassName}>
            {{ text(i18n, "authSignUp", "Sign up") }}
          </Link>
        </>
      }
    >
{%- if rhf %}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="grid gap-6"
      >
{%- else %}
      <form onSubmit={onSubmit} className="grid gap-6">
{%- endif %}
{%- if ui %}
        <FieldGroup>
{%- else %}
        <div className="grid gap-4">
{%- endif %}
{%- if rhf and ui %}
          <TextField
            control={form.control}
            name="email"
            label{{ attr(i18n, "authEmail", "Email") }}
            type="email"
            autoComplete="email"
          />
          <TextField
            control={form.control}
            name="password"
            label{{ attr(i18n, "authPassword", "Password") }}
            type="password"
            autoComplete="current-password"
          />
{%- elif rhf %}
          <TextField
            label{{ attr(i18n, "authEmail", "Email") }}
            type="email"
            autoComplete="email"
            error={form.formState.errors.email?.message}
            {...form.register("email")}
          />
          <TextField
            label{{ attr(i18n, "authPassword", "Password") }}
            type="password"
            autoComplete="current-password"
            error={form.formState.errors.password?.message}
            {...form.register("password")}
          />
{%- else %}
          <TextField
            name="email"
            label{{ attr(i18n, "authEmail", "Email") }}
            type="email"
            autoComplete="email"
          />
          <TextField
            name="password"
            label{{ attr(i18n, "authPassword", "Password") }}
            type="password"
            autoComplete="current-password"
            minLength={8}
          />
{%- endif %}
{%- if ui %}
        </FieldGroup>
{%- else %}
        </div>
{%- endif %}
        <FormError message={error} />
        <SubmitButton isPending={isPending}>{{ text(i18n, "authSignIn", "Sign in") }}</SubmitButton>
      </form>
    </AuthCard>
  );
}

export function SignUpForm() {
  const navigate = useNavigate();
{%- if rhf %}
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: SignUpValues) => {
    const { error } = await authClient.signUp.email(values);
    if (error) {
      form.setError("root", {
        message: error.message ?? {{ expr(i18n, "authError", "Something went wrong. Try again.") }},
      });
      return;
    }
    await navigate({ to: "/" });
  };
  const error = form.formState.errors.root?.message;
  const isPending = form.formState.isSubmitting;
{%- else %}
  const [error, setError] = useState<string>();
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setIsPending(true);
    const { error: authError } = await authClient.signUp.email({
      name: data.get("name") as string,
      email: data.get("email") as string,
      password: data.get("password") as string,
    });
    setIsPending(false);

    if (authError) {
      setError(authError.message ?? {{ expr(i18n, "authError", "Something went wrong. Try again.") }});
      return;
    }
    await navigate({ to: "/" });
  };
{%- endif %}

  return (
    <AuthCard
      title{{ attr(i18n, "authSignUpTitle", "Create an account") }}
      description{{ attr(i18n, "authSignUpDescription", "Enter your details to get started.") }}
      footer={
        <>
          {{ text(i18n, "authHasAccount", "Already have an account?") }}{" "}
          <Link to="/sign-in" className={linkClassName}>
            {{ text(i18n, "authSignIn", "Sign in") }}
          </Link>
        </>
      }
    >
{%- if rhf %}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="grid gap-6"
      >
{%- else %}
      <form onSubmit={onSubmit} className="grid gap-6">
{%- endif %}
{%- if ui %}
        <FieldGroup>
{%- else %}
        <div className="grid gap-4">
{%- endif %}
{%- if rhf and ui %}
          <TextField
            control={form.control}
            name="name"
            label{{ attr(i18n, "authName", "Name") }}
            autoComplete="name"
          />
          <TextField
            control={form.control}
            name="email"
            label{{ attr(i18n, "authEmail", "Email") }}
            type="email"
            autoComplete="email"
          />
          <TextField
            control={form.control}
            name="password"
            label{{ attr(i18n, "authPassword", "Password") }}
            type="password"
            autoComplete="new-password"
          />
{%- elif rhf %}
          <TextField
            label{{ attr(i18n, "authName", "Name") }}
            autoComplete="name"
            error={form.formState.errors.name?.message}
            {...form.register("name")}
          />
          <TextField
            label{{ attr(i18n, "authEmail", "Email") }}
            type="email"
            autoComplete="email"
            error={form.formState.errors.email?.message}
            {...form.register("email")}
          />
          <TextField
            label{{ attr(i18n, "authPassword", "Password") }}
            type="password"
            autoComplete="new-password"
            error={form.formState.errors.password?.message}
            {...form.register("password")}
          />
{%- else %}
          <TextField name="name" label{{ attr(i18n, "authName", "Name") }} autoComplete="name" />
          <TextField
            name="email"
            label{{ attr(i18n, "authEmail", "Email") }}
            type="email"
            autoComplete="email"
          />
          <TextField
            name="password"
            label{{ attr(i18n, "authPassword", "Password") }}
            type="password"
            autoComplete="new-password"
            minLength={8}
          />
{%- endif %}
{%- if ui %}
        </FieldGroup>
{%- else %}
        </div>
{%- endif %}
        <FormError message={error} />
        <SubmitButton isPending={isPending}>{{ text(i18n, "authSignUp", "Sign up") }}</SubmitButton>
      </form>
    </AuthCard>
  );
}
