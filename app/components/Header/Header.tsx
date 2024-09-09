
import React from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

// Titre principal : Composant Header
const Header: React.FC = () => {
    return (
        <header
            className={`max-w-[88rem] mx-auto bg-secondary lg:bg-background top-0 flex flex-col items-center justify-center gap-2 w-full max-lg:p-6 md:px-8 z-150`}
        >
            <DesktopNav />
            <MobileNav />
        </header>
    )
}

export default Header;