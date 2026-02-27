import { useState, useRef, useEffect } from "react";
import axios from "axios";
import portfolioContext from "../data/portfolioContext";

export default function AIChat(){

  const [open,setOpen]=useState(false);
  const [msg,setMsg]=useState("");
  const [messages,setMessages]=useState<any[]>([]);
  const [loading,setLoading]=useState(false);
  const [mode,setMode]=useState<"normal"|"interview"|"job">("normal");

  const containerRef:any = useRef(null);

  /* ---------- LOAD MEMORY ---------- */
  useEffect(()=>{
    const saved=localStorage.getItem("ai-memory");
    if(saved) setMessages(JSON.parse(saved));
  },[]);

  /* ---------- SAVE MEMORY ---------- */
  useEffect(()=>{
    localStorage.setItem("ai-memory",JSON.stringify(messages));
  },[messages]);

  /* ---------- AUTO SCROLL ---------- */
  useEffect(()=>{
    containerRef.current?.scrollTo({
      top:containerRef.current.scrollHeight,
      behavior:"smooth"
    });
  },[messages,loading]);

  /* ---------- ESC CLOSE + STOP VOICE ---------- */
  useEffect(()=>{
    const handler=(e:any)=>{
      if(e.key==="Escape"){
        speechSynthesis.cancel();
        setOpen(false);
      }
    };
    window.addEventListener("keydown",handler);
    return ()=>window.removeEventListener("keydown",handler);
  },[]);

  /* ---------- STREAM TYPE EFFECT ---------- */
  const streamText=(text:string)=>{
    let i=0;
    const id=setInterval(()=>{
      i++;
      setMessages(m=>{
        const copy=[...m];
        copy[copy.length-1].content=text.slice(0,i);
        return copy;
      });
      if(i>=text.length) clearInterval(id);
    },15);
  };

  /* ---------- SPEAK ---------- */
  const speak=(t:string)=>{
    speechSynthesis.cancel(); // stop previous voice
    const u=new SpeechSynthesisUtterance(t);
    speechSynthesis.speak(u);
  };

  const stopVoice=()=> speechSynthesis.cancel();

  /* ---------- SEND ---------- */
  const send=async(text?:string)=>{
    const content=text ?? msg;
    if(!content) return;

    const userMsg={role:"user",content};

    const systemBase=`
You are Athul's portfolio AI assistant.

${portfolioContext}

Mode: ${mode}
Answer professionally like explaining a candidate.
`;

    const fullMessages=[
      {role:"system",content:systemBase},
      ...messages,
      userMsg
    ];

    setMessages(m=>[...m,userMsg,{role:"assistant",content:""}]);
    setMsg("");
    setLoading(true);

    try{
      const res=await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        { model:"openai/gpt-3.5-turbo", messages:fullMessages },
        {
          headers:{
            Authorization:`Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
            "HTTP-Referer":"http://localhost:5173",
            "X-Title":"Athul Portfolio",
            "Content-Type":"application/json"
          }
        }
      );

      const reply=res.data.choices[0].message.content;
      streamText(reply);
      speak(reply);

    }catch{
      streamText("AI not connected. Check API key.");
    }

    setLoading(false);
  };

  /* ---------- VOICE INPUT ---------- */
  const startVoice=()=>{
    const SR:any=window.SpeechRecognition||(window as any).webkitSpeechRecognition;
    if(!SR) return;
    const r=new SR();
    r.onresult=(e:any)=>send(e.results[0][0].transcript);
    r.start();
  };

  /* ---------- QUICK ACTIONS ---------- */
  const summarize=()=>send("Summarize Athul profile");
  const interview=()=>{setMode("interview");send("Start interview mode");}
  const jobMode=()=>{setMode("job");send("Analyze me for this job");}

  const suggestions=[
    "Tell me about Athul",
    "What projects did he build?",
    "What are his skills?",
    "Explain internship"
  ];

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={()=>{
          if(open) speechSynthesis.cancel(); // stop voice when closing
          setOpen(!open);
        }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-cyan-400 text-black px-5 py-3 rounded-full shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:scale-105 transition z-50"
      >
        AI
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-[400px] h-[600px] backdrop-blur-xl bg-black/70 border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50">

          {/* HEADER */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center animate-pulse text-black font-bold">
              AI
            </div>
            <div>
              <p className="font-semibold">AI Portfolio Assistant</p>
              <p className="text-xs text-gray-400">{mode} mode</p>
            </div>
          </div>

          {/* QUICK SUGGESTIONS */}
          <div className="p-3 flex flex-wrap gap-2 border-b border-white/10">
            {suggestions.map((s,i)=>(
              <button key={i} onClick={()=>send(s)} className="text-xs px-3 py-1 bg-white/10 rounded-full hover:border-primary border border-transparent">
                {s}
              </button>
            ))}
          </div>

          {/* MESSAGES */}
          <div ref={containerRef} className="flex-1 overflow-auto p-4 space-y-3">
            {messages.map((m,i)=>(
              <div key={i} className={m.role==="user"?"text-right":""}>
                <div className={`inline-block px-3 py-2 rounded-xl text-sm ${m.role==="user"?"bg-primary text-black":"bg-white/10"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div className="text-sm text-gray-400 animate-pulse">AI thinking…</div>}
          </div>

          {/* ACTION BAR */}
          <div className="p-2 flex gap-2 border-t border-white/10">
            <button onClick={summarize} className="text-xs bg-white/10 px-2 rounded">Summary</button>
            <button onClick={interview} className="text-xs bg-white/10 px-2 rounded">Interview</button>
            <button onClick={jobMode} className="text-xs bg-white/10 px-2 rounded">Job Mode</button>
          </div>

          {/* INPUT */}
          <div className="p-3 flex gap-2">
            <input value={msg} onChange={e=>setMsg(e.target.value)} className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-sm" placeholder="Ask about Athul…" />
            <button onClick={()=>send()} className="px-3 bg-primary text-black rounded-lg">Send</button>
            <button onClick={startVoice} className="px-3 bg-white/10 rounded-lg">🎤</button>
            <button onClick={stopVoice} className="px-3 bg-red-500/20 text-red-400 rounded-lg">⏹</button>
          </div>

        </div>
      )}
    </>
  );
}
