import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5 flex-wrap">
      <Link href="/" className="hover:text-[#1a7a5c] transition-colors">Inicio</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-gray-300" />
          {item.href ? (
            <Link href={item.href} className="hover:text-[#1a7a5c] transition-colors">{item.label}</Link>
          ) : (
            <span className="text-gray-600 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
