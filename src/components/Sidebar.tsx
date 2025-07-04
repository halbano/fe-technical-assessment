import { XMarkIcon, Squares2X2Icon, ClipboardDocumentCheckIcon, Cog6ToothIcon, CircleStackIcon, ChartBarIcon } from "@heroicons/react/24/outline"
import { Button } from "./shared/Button";
import { PlusIcon } from "@heroicons/react/24/outline";

interface SidebarProps {
    isOpen: boolean;
    toggleNav: () => void;
}

export const Sidebar = ({ isOpen, toggleNav }: SidebarProps) => {
    if (!isOpen) return null;
    return (
        <aside
            className="fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200"
            aria-label="Navigation sidebar"
            role="complementary"
        >
            <div className="h-full px-4 py-6 overflow-y-auto">
                {/* Header with logo and close button */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <img
                            src="https://cdn.prod.website-files.com/61fae48cb5979577435753f6/62a13bc15bc3259229f2b00a_Variant3.png"
                            alt="AirOps"
                            className="w-8 h-8 rounded-lg object-contain"
                        />
                        <span className="text-gray-900 font-semibold text-sm">AirOps</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Close navigation sidebar"
                        onClick={toggleNav}
                    >
                        <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                </div>
                {/* New Button */}
                <div className="mb-6">
                    <Button variant="secondary" fullWidth aria-label="Create new workflow">
                        <span className="text-sm font-semibold">New</span>
                        <PlusIcon className="w-4 h-4" aria-hidden="true" />
                    </Button>
                </div>
                {/* Navigation Items */}
                <nav aria-label="Main navigation">
                    <ul className="space-y-1" role="list">
                        <li>
                            <a
                                href="#"
                                className="flex items-center px-1 py-1 text-gray-700 rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
                                aria-current="page"
                            >
                                <CircleStackIcon className="w-5 h-5 text-gray-500 group-hover:text-gray-700" aria-hidden="true" />
                                <span className="ml-3 text-sm font-medium">Data Name</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center px-1 py-1 text-gray-700 rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
                            >
                                <ChartBarIcon className="w-5 h-5 text-gray-500 group-hover:text-gray-700" aria-hidden="true" />
                                <span className="ml-3 text-sm font-medium">Monitoring</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center px-1 py-1 text-gray-700 rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
                            >
                                <Cog6ToothIcon className="w-5 h-5 text-gray-500 group-hover:text-gray-700" aria-hidden="true" />
                                <span className="ml-3 text-sm font-medium">Settings</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}