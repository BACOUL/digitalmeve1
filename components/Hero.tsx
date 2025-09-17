/* Badges colorés — harmonisés */
.badge { @apply inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full;
  border: 1px solid var(--border); background: color-mix(in oklab,var(--surface) 82%,white 18%); color: var(--fg); }

.badge-emerald {
  background: color-mix(in oklab, var(--accent-1) 16%, var(--surface) 84%);
  border-color: color-mix(in oklab, var(--accent-1) 45%, var(--border));
  color: color-mix(in oklab, var(--fg) 92%, transparent);
  box-shadow: 0 6px 18px color-mix(in oklab, var(--accent-1) 25%, transparent);
}

.badge-sky {
  background: color-mix(in oklab, var(--accent-2) 16%, var(--surface) 84%);
  border-color: color-mix(in oklab, var(--accent-2) 45%, var(--border));
  color: color-mix(in oklab, var(--fg) 92%, transparent);
  box-shadow: 0 6px 18px color-mix(in oklab, var(--accent-2) 25%, transparent);
}

.badge-solid {
  background: var(--grad-brand);
  border-color: transparent;
  color: #0B1220;
  box-shadow: 0 8px 26px rgba(34,211,238,.28);
}

/* Icônes des badges, taille uniforme */
.badge > svg { width: 14px; height: 14px; opacity: .95; }
