import { createFormHook } from "@tanstack/react-form";
import { SubmitButton, TextField } from "@/components/form";
import { fieldContext, formContext } from "./form-context";

// Forms built with `useAppForm` render these components through `field.TextField`
// and `form.SubmitButton`. Add your own reusable fields here.
// See https://tanstack.com/form/latest/docs/framework/react/guides/form-composition
export const { useAppForm, withForm } = createFormHook({
  fieldComponents: { TextField },
  formComponents: { SubmitButton },
  fieldContext,
  formContext,
});
