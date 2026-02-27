import { useState } from "react";

export default function PortfolioChatbot(){
  const [open,setOpen]=useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={()=>setOpen(!open)}
        className="fixed bottom-6 right-6 bg-primary text-black px-4 py-3 rounded-full shadow-lg"
      >
        Ask
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-black border border-white/10 rounded-xl p-4">
          <h3 className="font-semibold mb-2">Ask about my portfolio</h3>
          <p className="text-sm text-gray-400">
            Example:
            <br/>• What projects did you build?
            <br/>• What ML skills do you have?
            <br/>• Tell me about internship
          </p>
        </div>
      )}
    </>
  );
}
