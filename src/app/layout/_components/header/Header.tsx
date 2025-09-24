import { LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';

import { cn } from '@/lib/utils';
import { useGlobalStore } from '@/store/global/globalStore';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/ui';

import { headerLinls } from './HeaderConstants';

export const Header = () => {
  const navigate = useNavigate();
  const { organization } = useGlobalStore();

  return (
    <header className="w-full h-[70px]">
      <div className="max-w-[var(--container_mw)] flex flex-row justify-between items-center m-auto h-full">
        <div className="flex items-center justify-center gap-14">
          <div role="button" onClick={() => navigate('/')}>
            <img src="/vite.svg" alt="logo" />
          </div>
          <nav className="flex flex-row gap-5.5 justify-center items-center">
            {headerLinls.map((link) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    'font-[18px] px-3 py-1.5 text-neutral-950 cursor-pointer rounded-md hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]',
                    isActive &&
                      'text-[var(--primary-foreground)] pointer-events-none bg-[var(--primary)]'
                  )
                }
                to={link.path}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
              <Avatar>
                {organization.logo ? (
                  <AvatarImage src={organization.logo} />
                ) : (
                  <AvatarFallback>
                    {organization.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
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
