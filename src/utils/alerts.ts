export type PageAlertLevel = 'success' | 'error' | 'warning'

export interface PageAlert {
  level: PageAlertLevel
  message: string
}

export const pageAlertClass = (level: PageAlertLevel) => {
  const classMap: Record<PageAlertLevel, string> = {
    success: 'border-[var(--ui-success-soft)] bg-[var(--ui-success-soft)] text-[var(--ui-success)]',
    error: 'border-[var(--ui-danger-soft)] bg-[var(--ui-danger-soft)] text-[var(--ui-danger)]',
    warning: 'border-[var(--ui-warning-soft)] bg-[var(--ui-warning-soft)] text-[var(--ui-warning)]',
  }
  return classMap[level]
}
