"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { EASE } from "@/components/ui/Reveal";
import {
  CONTACT,
  COUNTRIES,
  HEARD_ABOUT,
  PATIENT_CONTACT_METHODS,
  PATIENT_INTERESTS,
  SURGEON_COLLABORATION,
} from "@/data/site";

type FormKind = "patient" | "surgeon";
type Status = "idle" | "sending" | "sent" | "error";

const TABS: { id: FormKind; label: string }[] = [
  { id: "patient", label: "I am a Patient" },
  { id: "surgeon", label: "I am a Surgeon" },
];

/** Checkbox groups that need at least one tick, per form. */
const REQUIRED_GROUPS: Record<FormKind, string[]> = {
  patient: ["contact_method", "area_of_interest"],
  surgeon: [],
};

export default function ContactForms() {
  const [tab, setTab] = useState<FormKind>("patient");
  const [status, setStatus] = useState<Status>("idle");
  const [groupErrors, setGroupErrors] = useState<string[]>([]);
  const baseId = useId();

  const switchTab = (next: FormKind) => {
    setTab(next);
    setStatus("idle");
    setGroupErrors([]);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const missing = REQUIRED_GROUPS[tab].filter((group) => data.getAll(group).length === 0);
    setGroupErrors(missing);
    if (missing.length) return;

    const fields: Record<string, string | string[]> = {};
    for (const key of new Set(data.keys())) {
      const values = data.getAll(key).map(String);
      fields[key] = values.length > 1 || key.endsWith("[]") ? values : values[0];
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ form: tab, fields }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <div role="tablist" aria-label="Inquiry type" className="flex gap-9 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`${baseId}-${t.id}-tab`}
            aria-selected={tab === t.id}
            aria-controls={`${baseId}-${t.id}-panel`}
            onClick={() => switchTab(t.id)}
            className={clsx(
              "relative py-3 text-[12px] font-medium uppercase leading-[1.4] tracking-[1.4px] text-white transition-opacity duration-300",
              tab === t.id ? "opacity-100" : "opacity-60 hover:opacity-100",
            )}
          >
            {t.label}
            {tab === t.id && (
              <motion.span
                layoutId={`${baseId}-tab-underline`}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-x-0 -bottom-px h-[2px] bg-white"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={status === "sent" ? "sent" : tab}
          role="tabpanel"
          id={`${baseId}-${tab}-panel`}
          aria-labelledby={`${baseId}-${tab}-tab`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="pt-[43px]"
        >
          {status === "sent" ? (
            <SuccessPanel onReset={() => setStatus("idle")} />
          ) : (
            <form onSubmit={onSubmit} noValidate={false} className="grid gap-x-[10px] gap-y-[34px] md:grid-cols-2">
              {tab === "patient" ? (
                <PatientFields groupErrors={groupErrors} />
              ) : (
                <SurgeonFields />
              )}

              <div className="md:col-span-2">
                <SubmitButton sending={status === "sending"} />
                <AnimatePresence>
                  {status === "error" && (
                    <motion.p
                      role="alert"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 max-w-[520px] text-[14px] leading-[1.6] text-[#e7b7a3]"
                    >
                      We couldn’t send your inquiry just now. Please call{" "}
                      <a href={CONTACT.phoneHref} className="underline">
                        {CONTACT.phoneDisplay}
                      </a>{" "}
                      or{" "}
                      <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="underline">
                        message us on WhatsApp
                      </a>
                      .
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PatientFields({ groupErrors }: { groupErrors: string[] }) {
  return (
    <>
      <TextField label="First Name" name="first_name" placeholder="Your first name" autoComplete="given-name" required />
      <TextField label="Last Name" name="last_name" placeholder="Your last name" autoComplete="family-name" required />
      <TextField label="Email" name="email" type="email" placeholder="your@email.com" autoComplete="email" required />
      <TextField label="Phone" name="phone" type="tel" placeholder="+971 00 000 0000" autoComplete="tel" required />
      <TextField label="Date of Birth" name="date_of_birth" type="date" autoComplete="bday" required />
      <SelectField label="Country" name="country" placeholder="Select your country" options={COUNTRIES} required />
      <CheckboxGroup
        label="Preferred Contact Method"
        name="contact_method"
        options={PATIENT_CONTACT_METHODS}
        error={groupErrors.includes("contact_method")}
      />
      <CheckboxGroup
        label="Area of Interest"
        name="area_of_interest"
        options={PATIENT_INTERESTS}
        error={groupErrors.includes("area_of_interest")}
      />
      <SelectField
        label="How Did You Hear About Us?"
        name="heard_about"
        placeholder="Please choose"
        options={HEARD_ABOUT}
        required
        wide
      />
      <TextArea
        label="Primary Concerns"
        name="primary_concerns"
        placeholder="Tell Dr. Ghoraba what you would like to address."
        required
      />
      <label className="flex cursor-pointer items-center gap-2 text-[14px] leading-5 text-white md:col-span-2">
        <input type="checkbox" name="consent" value="yes" required className="sg-checkbox" />
        I agree to be contacted about my inquiry and accept the privacy policy.
      </label>
    </>
  );
}

function SurgeonFields() {
  return (
    <>
      <TextField label="Full Name" name="full_name" placeholder="Your name" autoComplete="name" required />
      <TextField label="Email" name="email" type="email" placeholder="your@email.com" autoComplete="email" required />
      <TextField label="phone" name="phone" type="tel" placeholder="+100000000" autoComplete="tel" required />
      <TextField label="Clinic / Practice" name="clinic" placeholder="Your practice" autoComplete="organization" required />
      <TextField label="Country" name="country" placeholder="Where you practice" autoComplete="country-name" required wide />
      <CheckboxGroup label="Area of Collaboration" name="collaboration" options={SURGEON_COLLABORATION} />
      <TextArea label="Message" name="message" placeholder="Tell Dr. Ghoraba about your interest" />
    </>
  );
}

/* ---------- Field primitives ---------- */

function FieldLabel({ htmlFor, children, required }: { htmlFor?: string; children: ReactNode; required?: boolean }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[12px] uppercase leading-[1.4] tracking-[1.4px] text-white"
    >
      {children}
      {required && <span aria-hidden className="ml-[5px]">*</span>}
    </label>
  );
}

/** Gold line that grows under the focused control. */
function FocusLine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-luxe peer-focus:scale-x-100"
    />
  );
}

type TextFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  wide?: boolean;
};

function TextField({ label, name, type = "text", placeholder, autoComplete, required, wide }: TextFieldProps) {
  const id = useId();
  return (
    <div className={clsx(wide && "md:col-span-2")}>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <div className="relative mt-2">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="peer sg-field"
        />
        <FocusLine />
      </div>
    </div>
  );
}

function SelectField({
  label,
  name,
  placeholder,
  options,
  required,
  wide,
}: {
  label: string;
  name: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  wide?: boolean;
}) {
  const id = useId();
  return (
    <div className={clsx(wide && "md:col-span-2")}>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <div className="relative mt-2">
        <select id={id} name={name} required={required} defaultValue="" className="peer sg-field sg-select">
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <FocusLine />
      </div>
    </div>
  );
}

function TextArea({
  label,
  name,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div className="md:col-span-2">
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <div className="relative mt-2">
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          rows={4}
          className="peer sg-field block h-[105px] resize-none"
        />
        <FocusLine />
      </div>
    </div>
  );
}

function CheckboxGroup({
  label,
  name,
  options,
  error,
}: {
  label: string;
  name: string;
  options: string[];
  error?: boolean;
}) {
  return (
    <fieldset className="md:col-span-2" aria-invalid={error || undefined}>
      <legend className="text-[12px] uppercase leading-[1.4] tracking-[1.4px] text-white">{label}</legend>
      <div className="mt-[15px] grid grid-cols-2 gap-x-[10px] gap-y-[18px]">
        {options.map((option) => (
          <label key={option} className="flex cursor-pointer items-center gap-2 text-[14px] leading-5 text-white">
            <input type="checkbox" name={name} value={option} className="sg-checkbox" />
            {option}
          </label>
        ))}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-[12px] text-[#e7b7a3]"
          >
            Please choose at least one option.
          </motion.p>
        )}
      </AnimatePresence>
    </fieldset>
  );
}

function SubmitButton({ sending }: { sending: boolean }) {
  return (
    <button
      type="submit"
      disabled={sending}
      className="group relative inline-flex h-12 items-center justify-center overflow-hidden bg-white px-7 font-condensed text-[20px] font-medium uppercase leading-none text-ink transition-[transform,background-color] duration-400 ease-luxe hover:bg-cream active:scale-[0.97] disabled:cursor-wait disabled:opacity-80"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-gold/35 to-transparent transition-[left] duration-700 ease-luxe group-hover:left-[120%]"
      />
      <span className="relative">{sending ? "Sending…" : "Send Inquiry"}</span>
    </button>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div className="glass-light rounded-[8px] px-6 py-10 text-center md:px-10">
      <motion.span
        aria-hidden
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        className="mx-auto grid size-14 place-items-center rounded-full border border-gold bg-gold/15 text-2xl text-cream"
      >
        ✓
      </motion.span>
      <h3 className="mt-5 font-display text-[24px] uppercase text-white">Thank you</h3>
      <p className="mx-auto mt-3 max-w-[420px] text-[14px] leading-[1.65] text-white/80">
        Your inquiry has been received. Dr. Ghoraba’s team will be in touch shortly.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-[12px] uppercase tracking-[1.4px] text-white/70 underline underline-offset-4 hover:text-white"
      >
        Send another inquiry
      </button>
    </div>
  );
}
