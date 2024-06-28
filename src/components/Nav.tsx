
import Link from "next/link";
import { ComponentProps, ReactNode } from "react";
import classNames from 'classnames';
import { usePathname } from 'next/navigation';



export function Nav({ children }: { children: ReactNode }) {
    return <nav className="bg-slate-600  min-w-full rounded-sm text-primary-foreground flex justify-center px-4">{children}</nav>
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathname = usePathname(); // Getting the current pathname using next/navigation

    const combinedClassName = classNames(
        "p-4  hover:text-blue-500 focus-visible:bg-blue-300 focus-visible:text-black",
        { "bg-slate-300 text-blue-400": pathname === props.href }
    );

    return (
        <Link {...props} className={combinedClassName} />
    );
}