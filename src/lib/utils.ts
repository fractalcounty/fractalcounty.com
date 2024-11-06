import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateForOpenGraph(date: string | Date): string {
  let parsedDate: Date

  if (typeof date === 'string') {
    parsedDate = new Date(date)
  } else {
    parsedDate = date
  }

  if (Number.isNaN(parsedDate.getTime())) {
    // If the date is invalid, return the original string
    return typeof date === 'string' ? date : ''
  }
  // Format the date as ISO 8601
  return parsedDate.toISOString().substring(0, 10)
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, '')
  const wordCount = textOnly.split(/\s+/).length
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed()
  return `${readingTimeMinutes} min read`
}

export function dateRange(startDate: Date, endDate?: Date | string): string {
  const startMonth = startDate.toLocaleString('default', { month: 'short' })
  const startYear = startDate.getFullYear().toString()
  let endMonth = ''
  let endYear = ''

  if (endDate !== undefined) {
    if (typeof endDate === 'string') {
      endMonth = ''
      endYear = endDate
    } else {
      endMonth = endDate.toLocaleString('default', { month: 'short' })
      endYear = endDate.getFullYear().toString()
    }
  }

  return `${startMonth}${startYear} - ${endMonth}${endYear}`
}

export function getCanonicalUrl(path: string): string {
  // ensure consistent url format for schema
  return `https://fractalcounty.com${path.startsWith('/') ? path : `/${path}`}`
}

export function getAbsoluteUrl(path: string, site: URL | string): string {
  return new URL(path, site).toString()
}
