{%- set ui = dkcutter.useShadcn -%}
import type { ComponentProps } from "react";
{%- if ui %}
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
{%- endif %}
import { useFieldContext, useFormContext } from "@/hooks/form-context";

export function TextField({
  label,
  ...props
}: ComponentProps<{% if ui %}typeof Input{% else %}"input"{% endif %}> & { label: string }) {
  const field = useFieldContext<string>();
  const isInvalid = !field.state.meta.isValid;
{%- if ui %}

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        aria-invalid={isInvalid}
        {...props}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
{%- else %}
  // Validators return Standard Schema issues (e.g. Zod) or plain strings.
  const [firstError] = field.state.meta.errors as (
    string | { message: string } | undefined
  )[];
  const error =
    typeof firstError === "string" ? firstError : firstError?.message;

  return (
    <div className="grid gap-2">
      <label htmlFor={field.name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        aria-invalid={isInvalid}
        className="
          h-9 w-full rounded-md border bg-background px-3 text-sm shadow-sm outline-none focus-visible:ring-2
          focus-visible:ring-ring aria-invalid:border-destructive
        "
        {...props}
      />
      {isInvalid && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
{%- endif %}
}

{%- if ui %}
export function SubmitButton({
  children,
  ...props
}: ComponentProps<typeof Button>) {
{%- else %}
export function SubmitButton({ children, ...props }: ComponentProps<"button">) {
{%- endif %}
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
{%- if ui %}
        <Button type="submit" disabled={isSubmitting} {...props}>
          {children}
        </Button>
{%- else %}
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium
            text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none
            disabled:opacity-50
          "
          {...props}
        >
          {children}
        </button>
{%- endif %}
      )}
    </form.Subscribe>
  );
}
