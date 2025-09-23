import { LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';

import { cn } from '@/lib/utils';
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/ui';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full h-[70px]">
      <div className="max-w-[var(--container_mw)] flex flex-row justify-between items-center m-auto h-full">
        <div className="flex items-center justify-center gap-14">
          <div role="button" onClick={() => navigate('/')}>
            <img src="/vite.svg" alt="logo" />
          </div>
          <nav className="flex flex-row gap-5.5 justify-center items-center">
            <NavLink
              className={({ isActive }) =>
                cn(
                  'font-[18px] px-3 py-1.5 text-neutral-950 cursor-pointer rounded-md hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]',
                  isActive &&
                    'text-[var(--primary-foreground)] pointer-events-none bg-[var(--primary)]'
                )
              }
              to="/"
            >
              Кабинет
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                cn(
                  'font-[18px] px-3 py-1.5 text-neutral-950 cursor-pointer rounded-md hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]',
                  isActive &&
                    'text-[var(--primary-foreground)] pointer-events-none bg-[var(--primary)]'
                )
              }
              to="/applications"
            >
              Заявки
            </NavLink>
          </nav>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
              <Avatar>
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuItem asChild>
                <NavLink to="org">Организация</NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                role="button"
                className="cursor-pointer"
                onClick={() => navigate('login')}
              >
                Выйти
                <DropdownMenuShortcut>
                  <LogOut />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
