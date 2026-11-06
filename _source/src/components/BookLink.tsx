import { Link, type LinkProps } from 'react-router-dom'
import { useBook, withBook } from '../lib/books'
export default function BookLink({ to, ...props }: Omit<LinkProps, 'to'> & { to: string }) {
  const { book } = useBook()
  return <Link {...props} to={withBook(to, book.id)} />
}
