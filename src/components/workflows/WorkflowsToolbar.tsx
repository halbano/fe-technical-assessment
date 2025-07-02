export const WorkflowsToolbar = () => {
    return (
        <header className="flex flex-wrap items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
                <h1 className="text-3xl font-bold text-gray-900 mr-4 mb-4">Workflows</h1>
            </div>

            <div className="flex items-center space-x-4" role="search">
                {/* Sort dropdown */}
                <button
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    aria-label="Sort workflows"
                    aria-haspopup="listbox"
                    aria-expanded="false"
                >
                    <span className="text-sm">Sort</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {/* Search field */}
                <div className="relative @container">
                    <label htmlFor="workflow-search" className="sr-only">
                        Search workflows
                    </label>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
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