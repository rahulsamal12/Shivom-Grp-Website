const publicExamples = [
  "/api/public/group/home",
  "/api/public/solar/landing-sections",
  "/api/public/concrete/projects",
  "/api/public/enterprise/blogs/featured",
  "/api/public/group/awards-certifications",
  "/api/public/group/pages/about-us",
  "/api/public/solar/contact"
];

const Settings = () => (
  <div className="space-y-5">
    <div className="rounded-md border border-slate-200 bg-white p-6 shadow-panel">
      <h1 className="text-2xl font-bold text-slate-950">Settings</h1>
      <p className="mt-1 text-sm text-slate-500">Backend configuration is handled through environment variables in the server app.</p>
    </div>
    <div className="rounded-md border border-slate-200 bg-white p-6 shadow-panel">
      <h2 className="text-lg font-bold text-slate-950">Public API Examples</h2>
      <div className="mt-4 space-y-2">
        {publicExamples.map((url) => (
          <code key={url} className="block rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700">
            {url}
          </code>
        ))}
      </div>
    </div>
  </div>
);

export default Settings;
