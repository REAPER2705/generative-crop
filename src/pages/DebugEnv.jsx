const DebugEnv = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="card">
          <h1 className="text-3xl font-bold mb-6">Environment Debug</h1>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold mb-2">API Key Status:</h3>
              <p className="text-lg">
                {apiKey ? (
                  <span className="text-green-600">✓ API Key Found</span>
                ) : (
                  <span className="text-red-600">✗ API Key NOT Found</span>
                )}
              </p>
            </div>

            {apiKey && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-bold mb-2">API Key Details:</h3>
                <p className="text-sm break-all">
                  <strong>Length:</strong> {apiKey.length} characters<br/>
                  <strong>First 10 chars:</strong> {apiKey.substring(0, 10)}...<br/>
                  <strong>Last 5 chars:</strong> ...{apiKey.substring(apiKey.length - 5)}
                </p>
              </div>
            )}

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-bold mb-2">All Environment Variables:</h3>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(import.meta.env, null, 2)}
              </pre>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-bold mb-2">Instructions:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>If API Key is NOT found, the .env file is not being loaded</li>
                <li>Make sure .env file is in the root folder (farmer-project/.env)</li>
                <li>Make sure the file is named exactly ".env" (not .env.txt)</li>
                <li>Restart the dev server completely (Ctrl+C then npm run dev)</li>
                <li>Hard refresh browser (Ctrl+Shift+R)</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DebugEnv
