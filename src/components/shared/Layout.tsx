import { useState } from "react";
import { useMediaQuery } from 'react-responsive'

import { Bars3Icon } from "@heroicons/react/24/outline";
import { WorkflowsTable } from "../workflows/WorkflowsTable";
import { WorkflowsToolbar } from "../workflows/WorkflowsToolbar";
import { Sidebar } from "./Sidebar";

export const Layout = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [isNavOpen, setIsNavOpen] = useState<boolean>(!isMobile);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <div className="flex flex-col h-screen w-full">
            {/* Mobile menu button when sidebar is closed */}
            {!isNavOpen && (
                <button
                    onClick={toggleNav}
                    className="fixed top-4 left-4 z-50 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Open navigation sidebar"
                    aria-expanded="false"
                >
                    <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                </button>
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
                <WorkflowsToolbar />
                {/* Workflow Table */}
                <WorkflowsTable />
            </main>
        </div>
    );
};