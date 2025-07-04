import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "../shared/Button";

export const WorkflowsToolbar = () => {
    return (
        <header className="flex flex-wrap items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
                <h1 className="text-3xl font-bold text-primary mr-4 mb-4">Workflows</h1>
            </div>
            <div className="flex items-center space-x-4" role="search">
                {/* Sort dropdown */}
                <Button
                    variant="secondary"
                    className="px-4 py-2 w-24"
                    aria-label="Sort workflows"
                    aria-haspopup="listbox"
                    aria-expanded="false"
                >
                    <span className="text-sm font-semibold">Sort</span>
                    <ChevronDownIcon className="w-4 h-4" aria-hidden="true" />
                </Button>
                {/* Search field */}
                <div className="relative @container">
                    <label htmlFor="workflow-search" className="sr-only">
                        Search workflows
                    </label>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-4 w-4 text-muted" aria-hidden="true" />
                    </div>
                    <input
                        id="workflow-search"
                        type="search"
                        placeholder="Search workflows"
                        className="pl-10 pr-4 py-2 w-80 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        aria-describedby="search-description"
                    />
                </div>
            </div>
        </header>
    );
};