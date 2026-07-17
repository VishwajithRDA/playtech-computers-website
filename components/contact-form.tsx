"use client"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission — a real app would POST to an API route or server action.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-8 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="font-display text-lg font-bold text-foreground">Message sent!</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thanks {form.name || "there"} — our team will get back to you at{" "}
          <span className="font-medium text-foreground">{form.email || "your email"}</span> within
          one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false)
            setForm({ name: "", email: "", message: "" })
          }}
          className="mt-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Your full name"
          className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="you@example.com"
          className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="How can we help you build?"
          className="w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.01]"
      >
        <Send className="h-4 w-4" />
        Send Message
      </button>
    </form>
  )
}
