import { NavLink } from "react-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { LogOut } from "lucide-react";

export const Header = () => {
    return <header className="w-full h-[60px] border-b-1 border-b-neutral-300">
        <div className="max-w-[var(--container_mw)] flex flex-row justify-between items-center m-auto h-full">
            <div className="flex items-center justify-center gap-14">
                <h1 className="font-bold text-2xl text-neutral-700">
                    Logo
                </h1>
                <nav className="flex flex-row gap-1.5 justify-center items-center">
                    <NavLink to="/">Кабинет</NavLink>
                    <NavLink to="/applications">Заявки</NavLink>
                </nav>
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer" asChild>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuItem asChild>
                            <NavLink to="org">Организация</NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem role="button">
                            Выйти
                            <DropdownMenuShortcut>
                                <LogOut/>
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </header>;
}
