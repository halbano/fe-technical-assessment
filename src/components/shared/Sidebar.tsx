import { XMarkIcon } from "@heroicons/react/24/outline"
import { Button } from "./Button";
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
                            <button
                                onClick={toggleNav}
                                className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                                aria-label="Close navigation sidebar"
                                aria-expanded="true"
                            >
                                <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>

                        {/* New Button */}
                        <div className="mb-6">
                            <Button variant="secondary" fullWidth aria-label="Create new workflow">
                                New
                                <PlusIcon className="w-4 h-4 ml-2" aria-hidden="true" />
                            </Button>
                        </div>

                        {/* Navigation Items */}
                        <nav aria-label="Main navigation">
                            <ul className="space-y-1" role="list">
                                <li>
                                    <a 
                                        href="#" 
                                        className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
                                        aria-current="page"
                                    >
                                        <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-700" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                                        </svg>
                                        <span className="ml-3 text-sm font-medium">Data Name</span>
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
                                    >
                                        <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-700" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                        </svg>
                                        <span className="ml-3 text-sm font-medium">Monitoring</span>
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
                                    >
                                        <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-700" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                                        </svg>
                                        <span className="ml-3 text-sm font-medium">Settings</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
    )
}