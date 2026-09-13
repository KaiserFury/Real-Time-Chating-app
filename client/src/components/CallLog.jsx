export default function CallLog() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-white/10 px-4 py-3">
        <h2 className="text-sm font-semibold">Call Log</h2>
      </div>
      <div className="flex flex-1 items-center justify-center p-4 text-center text-sm text-slate-500">
        No call history yet.
        <br />
        Voice and video calling isn't set up yet.
      </div>
    </div>
  );
}