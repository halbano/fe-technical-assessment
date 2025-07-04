import { useState } from "react";
import { useMediaQuery } from 'react-responsive'

import { Bars3Icon } from "@heroicons/react/24/outline";
import { WorkflowsTable } from "./workflows/WorkflowsTable";
import { WorkflowsToolbar } from "./workflows/WorkflowsToolbar";
import { Sidebar } from "./Sidebar";
import { Button } from "./shared/Button";

export const Layout = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [isNavOpen, setIsNavOpen] = useState<boolean>(!isMobile);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <div className="flex flex-col h-screen w-full">
            {/* Menu button when sidebar is closed */}
            {!isNavOpen && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="fixed top-4 left-4 z-50"
                    aria-label="Open navigation sidebar"
                    onClick={toggleNav}
                >
                    <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                </Button>
            )}
            {/* Sidebar */}
            <Sidebar isOpen={isNavOpen} toggleNav={toggleNav} />
            {/* Main Content */}
            <main
                id="main-content"
                className={`p-6 ${isNavOpen ? 'ml-64' : 'ml-0 mt-8'} transition-all duration-300 min-h-screen bg-white`}
                role="main"
                aria-label="Workflows management"
            >
                {/* Toolbar */}
                <WorkflowsToolbar />
                {/* Workflows Table */}
                <WorkflowsTable />
            </main>
        </div>
    );
};