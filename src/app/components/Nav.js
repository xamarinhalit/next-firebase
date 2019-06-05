// src/app/components/Nav.js

// Next.js has a nice router we'll use
import Link from 'next/link'

// The links are based on the URLs that will serve those pages
export default () =>
  <ul>
    <li>
      <Link href='/'><a>Home</a></Link>
    </li>
    <li>
      <Link href='/about'><a>About</a></Link>
    </li>
  </ul>