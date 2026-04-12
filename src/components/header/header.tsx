import { Link } from "@tanstack/react-router"
import { ModeToggle } from "../theme/theme-toggle"

export const Header = () => {
  return (
    <nav className="flex items-center border-b-1 justify-between px-5 py-1">
      <div className="flex items-center gap-5 md:gap-40">
        <Link to="/">
          <div className="flex items-center gap-1.5">
            <img src="/stat-muncher-logo.svg" alt="Stat Muncher Logo" className="max-w-8"/>
            <h1 className="text-3xl font-bold -tracking-[3px] antialiased">STAT MUNCHER</h1> 
          </div>
        </Link>
        <ul >
          <Link to="/players">
            <li className="hover:text-indigo-300">Players</li>
          </Link>
        </ul> 
      </div>
      
      <ModeToggle />
    </nav>
  )
}