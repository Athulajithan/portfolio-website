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

  /* ---------- CANNED RESPONSES FALLBACK ---------- */
  const cannedResponses: {patterns: string[]; answer: string}[] = [
    {patterns:["tell me about athul","who are you","about athul"], answer: "I'm Athul N A, a results-driven Data Scientist with practical experience in forecasting, recommendation systems, and analytics using Python, SQL, Scikit-learn, TensorFlow, XGBoost, and visualization tools like Power BI and Tableau."},
    {patterns:["what roles","roles are you","targeting"], answer: "I'm seeking Data Scientist, Data Analyst, or Machine Learning Engineer roles where I can apply statistical analysis, machine learning, and data visualization to solve real business problems."},
    {patterns:["strongest technical","skills","what are your skills"], answer: "My core strengths are Python and SQL, machine learning with Scikit-learn and TensorFlow, time-series forecasting (ARIMA, SARIMA, LSTM/GRU), XGBoost, and dashboarding with Power BI, Tableau, and Streamlit."},
    {patterns:["internship","experience at ai variant","ai variant"], answer: "At AI Variant I developed end-to-end ML solutions including stock forecasting and a course recommendation system, and I created interactive dashboards to communicate insights to stakeholders."},
    {patterns:["stock","forecast","forecasting"], answer: "I built a Stock Price Forecasting and Analytics Platform combining ARIMA/SARIMA, XGBoost, LSTM and GRU models, with a Streamlit dashboard of 10+ visualizations that improved forecasting accuracy versus baseline approaches."},
    {patterns:["recommend","recommendation","course recommendation"], answer: "I developed a content-based course recommendation system using TF-IDF and cosine similarity over 3,000+ course records and exposed it via a Streamlit app for instant personalized recommendations."},
    {patterns:["visualization","dashboard","power bi","tableau"], answer: "I create stakeholder-ready dashboards in Power BI and Tableau and interactive demos with Streamlit and Plotly to present key KPIs and actionable insights clearly."},
    {patterns:["education","degree","b.tech"], answer: "I hold a B.Tech in Computer Science from Vidya Academy of Science and Technology, affiliated with APJ Abdul Kalam Technological University (2021–2025)."},
    {patterns:["certification","certifications"], answer: "I have certifications including NASSCOM Masters Program in Data Science (Gold), Deloitte Data Analytics Job Simulation, ExcelR Data Science Programme, and Coursera Advanced Data Visualization."},
    {patterns:["why should we hire","why hire you"], answer: "I combine strong technical skills, practical project experience across forecasting, recommendations, and dashboards, and a user-focused approach that turns data into clear, actionable outcomes."},
    {patterns:["relocate","remote","where are you based"], answer: "I'm based in Thrissur, Kerala, India; I'm open to relocation and work effectively in remote or distributed teams."},
    {patterns:["show me your work","portfolio","github"], answer: "My portfolio contains project demos and Streamlit apps; I can share GitHub and deployed links on request so you can review code and live demos."},
    {patterns:["default","summary","summarize athul"], answer: "Athul is a practical, delivery-focused Data Scientist skilled in Python, SQL, ML, time-series forecasting, recommendation systems, and visualization — he builds reproducible pipelines and stakeholder-ready dashboards."}
  ];

  const getFallbackAnswer=(text:string)=>{
    const t=text.toLowerCase();
    for(const item of cannedResponses){
      if(item.patterns.some(p=>t.includes(p))) return item.answer;
    }
    return null;
  };

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
Answer positively and professionally.
Use resume, certifications, internship, and project details to answer every question.
If the user asks about skills or experience, cite specific certifications, projects, and accomplishments from the portfolio.
`;

    const fullMessages=[
      {role:"system",content:systemBase},
      ...messages,
      userMsg
    ];

    setMessages(m=>[...m,userMsg,{role:"assistant",content:""}]);
    setMsg("");
    setLoading(true);

    const useProxy = import.meta.env.PROD;
    const browserKey = import.meta.env.VITE_OPENROUTER_KEY as string;
    const endpoint = useProxy ? "/api/openrouter" : "https://api.openrouter.ai/v1/chat/completions";

    if (!useProxy && (!browserKey || browserKey === "Your API Key" || browserKey === "Your_API_Key_Here")) {
      streamText("Missing OpenRouter API key for local development. Copy .env.example to .env and set VITE_OPENROUTER_KEY.");
      setLoading(false);
      return;
    }

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (!useProxy) {
        headers.Authorization = `Bearer ${browserKey}`;
      }

      const res = await axios.post(
        endpoint,
        { model: "openai/gpt-3.5-turbo", messages: fullMessages },
        {
          headers
        }
      );

      const reply = res.data?.choices?.[0]?.message?.content ?? "";
      let finalReply = reply;
      if(!finalReply || /couldn't generate|I couldn't generate|AI not connected/i.test(finalReply) || finalReply.trim().length < 5){
        const fallback = getFallbackAnswer(content);
        if(fallback) finalReply = fallback;
        else finalReply = reply || "I couldn't generate a response.";
      }
      streamText(finalReply);
      speak(finalReply);
    } catch (error: any) {
      console.error("AI request failed:", error);
      const errorMessage = error?.response?.data?.error || error?.message || "AI not connected. Check API key.";
      const fallback = getFallbackAnswer(content);
      if(fallback){
        streamText(fallback);
        speak(fallback);
      } else {
        streamText(`AI error: ${errorMessage}`);
      }
    }

    setLoading(false);
  };

  /* ---------- VOICE INPUT ---------- */
  const startVoice=()=>{
    const SR:any=(window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;
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
