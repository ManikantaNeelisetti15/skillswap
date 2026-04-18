import { useState, useEffect } from "react";

/* ─── GLOBAL STYLES ─────────────────────────────────────────────── */
const style = document.createElement("style");
style.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#07090f;--s1:#0d1117;--s2:#111827;--s3:#1a2236;
  --border:rgba(148,163,184,.07);--border2:rgba(148,163,184,.13);
  --accent:#38bdf8;--accent2:#818cf8;--green:#34d399;
  --orange:#fb923c;--gold:#fbbf24;--red:#f87171;
  --text:#e2e8f0;--dim:#64748b;--dim2:#475569;
  --F:'Syne',sans-serif;--FB:'DM Sans',sans-serif;
}
body{background:var(--bg);color:var(--text);font-family:var(--FB);-webkit-font-smoothing:antialiased}
button{cursor:pointer;border:none;background:none;font-family:var(--FB)}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.app{display:flex;flex-direction:column;height:100vh;max-width:430px;margin:0 auto;background:var(--bg);overflow:hidden}
.screen{flex:1;overflow-y:auto;scrollbar-width:none}
.screen::-webkit-scrollbar{display:none}
.pad{padding:20px 18px}
.fu{animation:fadeUp .32s ease both}
.fu1{animation-delay:.06s}.fu2{animation-delay:.12s}.fu3{animation-delay:.18s}.fu4{animation-delay:.24s}
.disp{font-family:var(--F);font-weight:800}
.label{font-family:var(--F);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--dim)}
.card{background:var(--s1);border:1px solid var(--border);border-radius:18px;transition:transform .18s,border-color .18s}
.card:hover{transform:translateY(-2px);border-color:var(--border2)}
.pill{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:500}
.pill-blue{background:rgba(56,189,248,.08);border:1px solid rgba(56,189,248,.18);color:var(--accent)}
.pill-green{background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.18);color:var(--green)}
.pill-orange{background:rgba(251,146,60,.1);border:1px solid rgba(251,146,60,.2);color:var(--orange)}
.pill-gold{background:rgba(251,191,36,.08);border:1px solid rgba(251,191,36,.2);color:var(--gold)}
.pill-red{background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.2);color:var(--red)}
.live-dot{display:inline-block;width:7px;height:7px;background:var(--red);border-radius:50%;animation:pulse 1.4s ease-in-out infinite;margin-right:4px}
.hs{display:flex;gap:10px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}
.hs::-webkit-scrollbar{display:none}
.nav{display:flex;justify-content:space-around;align-items:center;padding:10px 0 14px;background:rgba(7,9,15,.96);backdrop-filter:blur(16px);border-top:1px solid var(--border);flex-shrink:0}
.nb{display:flex;flex-direction:column;align-items:center;gap:3px;padding:5px 12px;transition:all .2s}
.ni{font-size:18px;line-height:1}
.nl{font-family:var(--F);font-size:8px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);transition:color .2s}
.nb.on .nl{color:var(--accent)}
.overlay{position:absolute;inset:0;background:rgba(7,9,15,.85);backdrop-filter:blur(4px);z-index:50;display:flex;align-items:flex-end}
.sheet{background:var(--s1);border-radius:24px 24px 0 0;border-top:1px solid var(--border2);padding:28px 20px 36px;width:100%;animation:fadeUp .28s ease both;max-height:88vh;overflow-y:auto}
.sheet::-webkit-scrollbar{display:none}
.btn{display:block;width:100%;padding:14px;border-radius:14px;font-family:var(--F);font-weight:700;font-size:14px;letter-spacing:.02em;text-align:center;transition:all .18s}
.btn-primary{background:linear-gradient(135deg,#0ea5e9,#6366f1);color:#fff}
.btn-primary:hover{filter:brightness(1.1)}
.btn-outline{background:transparent;border:1px solid var(--border2);color:var(--text)}
.btn-outline:hover{border-color:var(--accent);color:var(--accent)}
.stars{color:var(--gold);font-size:12px;letter-spacing:1px}
.pbar{height:5px;background:var(--s3);border-radius:5px;overflow:hidden;margin-top:8px}
.pfill{height:100%;border-radius:5px;background:linear-gradient(90deg,var(--accent),var(--accent2));transition:width 1s ease}
.av{display:flex;align-items:center;justify-content:center;border-radius:50%;font-family:var(--F);font-weight:800}
.cert{background:linear-gradient(135deg,#0d1f3c 0%,#111827 100%);border:1px solid rgba(56,189,248,.15);border-radius:18px;padding:18px;margin-bottom:12px;position:relative;overflow:hidden}
.cert::after{content:'';position:absolute;top:-30px;right:-30px;width:100px;height:100px;border:30px solid rgba(56,189,248,.05);border-radius:50%}
.bdg{background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:12px 6px;text-align:center}
.bdg.earned{border-color:rgba(251,191,36,.2);background:rgba(251,191,36,.04)}
.bdg.locked{opacity:.35;filter:grayscale(1)}
.step{display:flex;gap:14px;align-items:flex-start;margin-bottom:14px}
.step-num{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--F);font-size:12px;font-weight:800;color:#fff;flex-shrink:0;margin-top:2px}
.chip{flex-shrink:0;padding:8px 16px;border-radius:50px;font-family:var(--F);font-size:12px;font-weight:700;transition:all .18s;border:1px solid var(--border)}
.tc{background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:16px;flex-shrink:0;width:156px;transition:transform .18s,border-color .18s;cursor:pointer}
.tc:hover{transform:translateY(-2px);border-color:var(--border2)}
.srow{display:flex;align-items:center;gap:14px;background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:14px 16px;margin-bottom:10px}
.sdiv{width:1px;height:36px;background:var(--border2)}
`;
document.head.appendChild(style);

/* ─── DATA ──────────────────────────────────────────────────────── */
const TEACHERS = [
  {name:"Priya M.",sub:"IIT Bombay · 4 yrs",emoji:"👩‍💻",bg:"linear-gradient(135deg,#0ea5e9,#6366f1)",rating:"4.9",sessions:"320+"},
  {name:"Rahul S.",sub:"NIT · 3 yrs",emoji:"👨‍🏫",bg:"linear-gradient(135deg,#f59e0b,#ef4444)",rating:"4.8",sessions:"210+"},
  {name:"Sneha K.",sub:"BITS · 5 yrs",emoji:"👩‍🏫",bg:"linear-gradient(135deg,#10b981,#0ea5e9)",rating:"5.0",sessions:"480+"},
  {name:"Arjun V.",sub:"IIT Delhi · 2 yrs",emoji:"👨‍💻",bg:"linear-gradient(135deg,#8b5cf6,#ec4899)",rating:"4.7",sessions:"140+"},
];
const SCHEDULE = [
  {time:"10:00",period:"AM",title:"Python Basics",teacher:"Priya M.",live:true},
  {time:"02:30",period:"PM",title:"Web Dev – HTML",teacher:"Rahul S.",live:false},
  {time:"05:00",period:"PM",title:"AI & Scratch",teacher:"Sneha K.",live:false},
];
const COURSES = [
  {id:1,icon:"🐍",title:"Python for Kids",level:"Beginner",age:"8–12",lessons:24,done:14,color:"rgba(56,189,248,.1)"},
  {id:2,icon:"🌐",title:"Web Development",level:"Intermediate",age:"12–16",lessons:32,done:5,color:"rgba(129,140,248,.1)"},
  {id:3,icon:"🤖",title:"AI & Scratch",level:"Beginner",age:"6–10",lessons:18,done:18,color:"rgba(52,211,153,.1)"},
  {id:4,icon:"🎮",title:"Game Dev with Unity",level:"Advanced",age:"14+",lessons:40,done:0,color:"rgba(251,191,36,.1)"},
];
const BADGES = [
  {icon:"🥇",name:"First Code",earned:true},{icon:"🔥",name:"7-day Streak",earned:true},
  {icon:"🐍",name:"Python Pro",earned:true},{icon:"🌐",name:"Web Wizard",earned:false},
  {icon:"🤖",name:"AI Master",earned:false},{icon:"🎓",name:"Certified",earned:false},
  {icon:"⚡",name:"Speed Coder",earned:false},{icon:"🏆",name:"Champion",earned:false},
];
const CERTS = [
  {title:"Python Fundamentals",date:"Mar 2025",grade:"A+"},
  {title:"Scratch Animation",date:"Jan 2025",grade:"A"},
];
const TABS=[
  {id:"home",label:"Home",icon:"🏠"},
  {id:"classes",label:"Classes",icon:"📡"},
  {id:"explore",label:"Explore",icon:"🔭"},
  {id:"dash",label:"Progress",icon:"📊"},
  {id:"profile",label:"Profile",icon:"👤"},
];

/* ─── SHARED ────────────────────────────────────────────────────── */
function SectionTitle({children,mb=14,mt=4}){
  return <div className="label fu" style={{marginBottom:mb,marginTop:mt}}>{children}</div>;
}
function Spacer({h=16}){return <div style={{height:h}}/>}

/* ─── HOME ──────────────────────────────────────────────────────── */
function Home({onBook,onTeacher}){
  const [activeSkill,setActiveSkill]=useState("All");
  return(
    <div className="screen">
      <div className="pad">
        {/* Hero */}
        <div className="fu" style={{background:"linear-gradient(135deg,#0d1f3c,#09111f)",border:"1px solid var(--border)",borderRadius:22,padding:"24px 20px 20px",marginBottom:20,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-30,right:-20,width:130,height:130,background:"radial-gradient(circle,rgba(56,189,248,.1) 0%,transparent 70%)",borderRadius:"50%"}}/>
          <div style={{fontSize:11,fontFamily:"var(--F)",fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:"var(--accent)",marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
            <span style={{display:"inline-block",width:16,height:1,background:"var(--accent)"}}/>Platform
          </div>
          <div className="disp" style={{fontSize:32,color:"#fff",letterSpacing:"-.02em",marginBottom:6}}>Skill<span style={{color:"var(--accent)"}}>mmunity</span></div>
          <div style={{fontSize:13,color:"var(--dim)",fontWeight:300}}>Learn. Earn. Grow.</div>
        </div>

        {/* Trial Banner */}
        <div className="fu fu1" style={{background:"linear-gradient(135deg,#0c2340,#0f172a)",border:"1px solid rgba(56,189,248,.18)",borderRadius:22,padding:"22px 20px",marginBottom:22,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-20,right:-20,width:120,height:120,background:"radial-gradient(circle,rgba(56,189,248,.14),transparent 70%)",borderRadius:"50%"}}/>
          <div className="pill pill-blue" style={{marginBottom:12}}>✦ Limited Slots</div>
          <div className="disp" style={{fontSize:22,color:"#fff",lineHeight:1.2,marginBottom:8}}>Free Trial<br/><span style={{color:"var(--accent)"}}>Live 1:1 Class</span></div>
          <div style={{fontSize:13,color:"var(--dim)",marginBottom:18,fontWeight:300}}>45-min class with an expert teacher — no credit card needed.</div>
          <button className="btn btn-primary" onClick={onBook} style={{width:"auto",padding:"11px 24px",fontSize:13}}>Book Free Trial →</button>
        </div>

        <SectionTitle>Top Teachers Today</SectionTitle>
        <div className="hs fu2" style={{marginBottom:22}}>
          {TEACHERS.map((t,i)=>(
            <div key={i} className="tc" onClick={()=>onTeacher(t)}>
              <div className="av" style={{background:t.bg,width:50,height:50,fontSize:20,marginBottom:10}}>{t.emoji}</div>
              <div style={{fontFamily:"var(--F)",fontWeight:700,fontSize:13,marginBottom:2}}>{t.name}</div>
              <div style={{fontSize:11,color:"var(--dim)",marginBottom:6}}>{t.sub}</div>
              <div className="stars">★★★★★</div>
              <div style={{fontSize:11,color:"var(--dim)"}}>{t.rating} · {t.sessions} sessions</div>
            </div>
          ))}
        </div>

        <SectionTitle>Today's Schedule</SectionTitle>
        {SCHEDULE.map((s,i)=>(
          <div key={i} className="srow fu" style={{animationDelay:`${i*.06}s`}}>
            <div style={{fontFamily:"var(--F)",fontWeight:700,fontSize:13,color:"var(--text)",textAlign:"center",minWidth:44}}>
              <div>{s.time}</div><div style={{fontSize:10,color:"var(--dim)"}}>{s.period}</div>
            </div>
            <div className="sdiv"/>
            <div style={{flex:1}}>
              <div style={{fontFamily:"var(--F)",fontWeight:700,fontSize:14,marginBottom:3}}>{s.title}</div>
              <div style={{fontSize:12,color:"var(--dim)"}}>{s.teacher}</div>
            </div>
            {s.live
              ?<button className="btn btn-primary" style={{width:"auto",padding:"7px 14px",fontSize:12}}>Join</button>
              :<div className="pill pill-blue" style={{fontSize:10}}>Upcoming</div>}
          </div>
        ))}

        <Spacer h={20}/>
        <SectionTitle>Trending Skills</SectionTitle>
        <div className="hs" style={{paddingBottom:8}}>
          {["All","AI & ML","Python","Web Dev","Game Dev","UI/UX","Scratch"].map((s,i)=>(
            <button key={i} className="chip" onClick={()=>setActiveSkill(s)}
              style={{background:activeSkill===s?"rgba(56,189,248,.1)":"var(--s1)",color:activeSkill===s?"var(--accent)":"var(--text)",borderColor:activeSkill===s?"rgba(56,189,248,.3)":"var(--border)"}}>
              {s}
            </button>
          ))}
        </div>
        <Spacer h={8}/>

        <SectionTitle mt={12}>Top Opportunities</SectionTitle>
        {[
          {title:"Build E-commerce Website",tag:"₹2,000",sub:"React · 3–5 days · Remote"},
          {title:"Design Brand Identity",tag:"₹3,500",sub:"Figma · 5–7 days · Remote"},
          {title:"Write SEO Blog Posts",tag:"₹800",sub:"Content · 2 days · Remote"},
        ].map((o,i)=>(
          <div key={i} className="card fu" style={{padding:18,marginBottom:10,position:"relative",animationDelay:`${i*.06}s`}}>
            <div style={{fontFamily:"var(--F)",fontWeight:700,fontSize:15,marginBottom:3}}>{o.title}</div>
            <div style={{fontSize:12,color:"var(--dim)"}}>{o.sub}</div>
            <div style={{position:"absolute",top:16,right:16,background:"rgba(251,191,36,.1)",border:"1px solid rgba(251,191,36,.2)",color:"var(--gold)",fontSize:12,fontWeight:700,fontFamily:"var(--F)",padding:"4px 10px",borderRadius:20}}>{o.tag}</div>
          </div>
        ))}
        <Spacer/>
      </div>
    </div>
  );
}

/* ─── CLASSES ───────────────────────────────────────────────────── */
function Classes({onBook,onTeacher}){
  const [view,setView]=useState("live");
  return(
    <div className="screen">
      <div className="pad">
        <div className="disp fu" style={{fontSize:22,color:"#fff",marginBottom:18}}>Live Classes</div>
        <div style={{display:"flex",gap:6,background:"var(--s1)",borderRadius:14,padding:5,marginBottom:22}}>
          {[["live","🔴 Live Now"],["upcoming","Upcoming"],["recorded","Recorded"]].map(([id,label])=>(
            <button key={id} onClick={()=>setView(id)} style={{flex:1,padding:"9px 4px",borderRadius:10,fontFamily:"var(--F)",fontSize:11,fontWeight:700,transition:"all .18s",background:view===id?"linear-gradient(135deg,#0ea5e9,#6366f1)":"transparent",color:view===id?"#fff":"var(--dim)"}}>
              {label}
            </button>
          ))}
        </div>

        {view==="live" && <>
          <div className="card fu" style={{padding:20,marginBottom:14,background:"linear-gradient(135deg,#0d1f3c,#111827)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div>
                <div style={{display:"flex",alignItems:"center",marginBottom:8}}>
                  <span className="live-dot"/>
                  <span style={{fontSize:11,fontFamily:"var(--F)",fontWeight:700,color:"var(--red)",letterSpacing:".08em"}}>LIVE NOW</span>
                </div>
                <div className="disp" style={{fontSize:18,color:"#fff",marginBottom:4}}>Python Basics – Session 5</div>
                <div style={{fontSize:13,color:"var(--dim)"}}>with Priya M. · 23 students joined</div>
              </div>
              <div style={{fontSize:32}}>🐍</div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-primary" style={{flex:1,padding:"12px"}}>Join Now</button>
              <button className="btn btn-outline" style={{width:"auto",padding:"12px 16px",fontSize:18}}>💬</button>
            </div>
          </div>
          <SectionTitle mb={12}>Other Live Classes</SectionTitle>
          {[{icon:"🌐",title:"HTML & CSS Crash Course",teacher:"Rahul S.",students:14},{icon:"🤖",title:"Intro to AI with Scratch",teacher:"Sneha K.",students:31}].map((c,i)=>(
            <div key={i} className="card fu" style={{padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:14,animationDelay:`${i*.06}s`}}>
              <div style={{fontSize:26}}>{c.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"var(--F)",fontWeight:700,fontSize:14,marginBottom:2}}>{c.title}</div>
                <div style={{fontSize:12,color:"var(--dim)"}}>{c.teacher} · {c.students} students</div>
              </div>
              <button className="btn btn-outline" style={{width:"auto",padding:"8px 14px",fontSize:12}}>Join</button>
            </div>
          ))}
        </>}

        {view==="upcoming" && <>
          <SectionTitle>Booked Classes</SectionTitle>
          {SCHEDULE.map((s,i)=>(
            <div key={i} className="card fu" style={{padding:16,marginBottom:12,animationDelay:`${i*.06}s`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div className="disp" style={{fontSize:15,color:"#fff"}}>{s.title}</div>
                <div className="pill pill-blue" style={{fontSize:10}}>{s.time} {s.period}</div>
              </div>
              <div style={{fontSize:12,color:"var(--dim)",marginBottom:14}}>Teacher: {s.teacher}</div>
              <div style={{display:"flex",gap:8}}>
                <button className="btn btn-primary" style={{flex:1,padding:"10px",fontSize:12}}>Add to Calendar</button>
                <button className="btn btn-outline" style={{width:"auto",padding:"10px 14px",fontSize:12}}>Reschedule</button>
              </div>
            </div>
          ))}
          <button className="btn btn-outline fu" style={{marginTop:8}} onClick={onBook}>+ Book Another Class</button>
        </>}

        {view==="recorded" && <>
          <SectionTitle>Past Recordings</SectionTitle>
          {[
            {icon:"🐍",title:"Python Session 1–4",dur:"3h 20m",date:"Apr 10"},
            {icon:"🎨",title:"Scratch Animation Intro",dur:"45m",date:"Apr 5"},
            {icon:"🌐",title:"HTML Basics",dur:"1h 10m",date:"Mar 28"},
          ].map((r,i)=>(
            <div key={i} className="card fu" style={{padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:14,animationDelay:`${i*.06}s`}}>
              <div style={{width:42,height:42,background:"var(--s2)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{r.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"var(--F)",fontWeight:700,fontSize:14,marginBottom:2}}>{r.title}</div>
                <div style={{fontSize:12,color:"var(--dim)"}}>{r.dur} · {r.date}</div>
              </div>
              <button style={{background:"var(--s2)",border:"1px solid var(--border2)",borderRadius:10,padding:"8px 12px",fontSize:18}}>▶</button>
            </div>
          ))}
        </>}

        <Spacer h={20}/>
        <SectionTitle>Our Teachers</SectionTitle>
        <div className="hs" style={{paddingBottom:8}}>
          {TEACHERS.map((t,i)=>(
            <div key={i} className="tc" onClick={()=>onTeacher(t)}>
              <div className="av" style={{background:t.bg,width:48,height:48,fontSize:20,marginBottom:8}}>{t.emoji}</div>
              <div style={{fontFamily:"var(--F)",fontWeight:700,fontSize:13,marginBottom:2}}>{t.name}</div>
              <div style={{fontSize:11,color:"var(--dim)",marginBottom:6}}>{t.sub}</div>
              <div className="stars" style={{fontSize:10}}>★★★★★ {t.rating}</div>
            </div>
          ))}
        </div>
        <Spacer/>
      </div>
    </div>
  );
}

/* ─── EXPLORE ───────────────────────────────────────────────────── */
function Explore(){
  const [filter,setFilter]=useState("All");
  const levels=["All","Beginner","Intermediate","Advanced"];
  const visible=filter==="All"?COURSES:COURSES.filter(c=>c.level===filter);
  return(
    <div className="screen">
      <div className="pad">
        <div className="disp fu" style={{fontSize:22,color:"#fff",marginBottom:18}}>Explore Courses</div>
        <div className="hs fu1" style={{marginBottom:20}}>
          {levels.map(l=>(
            <button key={l} className="chip" onClick={()=>setFilter(l)}
              style={{background:filter===l?"linear-gradient(135deg,#0ea5e9,#6366f1)":"var(--s1)",color:filter===l?"#fff":"var(--dim)",borderColor:filter===l?"transparent":"var(--border)"}}>
              {l}
            </button>
          ))}
        </div>
        {visible.map((c,i)=>(
          <div key={c.id} className="card fu" style={{padding:20,marginBottom:12,animationDelay:`${i*.07}s`}}>
            <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
              <div style={{width:52,height:52,borderRadius:14,background:c.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{c.icon}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:6,marginBottom:6,flexWrap:"wrap"}}>
                  <div className={`pill ${c.level==="Beginner"?"pill-green":c.level==="Intermediate"?"pill-blue":"pill-gold"}`} style={{fontSize:10}}>{c.level}</div>
                  <div className="pill pill-orange" style={{fontSize:10}}>Age {c.age}</div>
                </div>
                <div className="disp" style={{fontSize:16,color:"#fff",marginBottom:3}}>{c.title}</div>
                <div style={{fontSize:12,color:"var(--dim)",marginBottom:10}}>{c.lessons} lessons · {c.done===c.lessons?"✅ Completed":c.done===0?"Not started":`${c.done}/${c.lessons} done`}</div>
                {c.done>0&&<div className="pbar"><div className="pfill" style={{width:`${Math.round(c.done/c.lessons*100)}%`}}/></div>}
              </div>
            </div>
            <div style={{display:"flex",gap:8,marginTop:16}}>
              <button className="btn btn-primary" style={{flex:1,padding:"11px",fontSize:13}}>
                {c.done===0?"Enroll Now":c.done===c.lessons?"View Certificate":"Continue →"}
              </button>
              {c.done===0&&<button className="btn btn-outline" style={{width:"auto",padding:"11px 14px",fontSize:12}}>Preview</button>}
            </div>
          </div>
        ))}
        <Spacer/>
        {/* Learning Path */}
        <div className="cert fu">
          <div style={{fontSize:11,fontFamily:"var(--F)",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"var(--accent)",marginBottom:8}}>Skill Path</div>
          <div className="disp" style={{fontSize:17,color:"#fff",marginBottom:16}}>Complete all to unlock the <span style={{color:"var(--gold)"}}>Master Coder</span> cert</div>
          {[["🐍","Python","Done"],["🌐","Web Dev","Active"],["🤖","AI","Locked"],["🎮","Game Dev","Locked"]].map(([icon,name,st],i)=>(
            <div key={i} className="step">
              <div className="step-num" style={{background:st==="Done"?"var(--green)":st==="Active"?"linear-gradient(135deg,var(--accent),var(--accent2))":"var(--s3)",color:st==="Locked"?"var(--dim)":"#fff"}}>{st==="Done"?"✓":i+1}</div>
              <div style={{flex:1,paddingTop:4}}>
                <div style={{fontFamily:"var(--F)",fontWeight:700,fontSize:14,color:st==="Locked"?"var(--dim)":"#fff"}}>{icon} {name}</div>
                <div style={{fontSize:11,color:"var(--dim2)"}}>{st}</div>
              </div>
            </div>
          ))}
        </div>
        <Spacer/>
      </div>
    </div>
  );
}

/* ─── DASHBOARD ─────────────────────────────────────────────────── */
function Dash(){
  return(
    <div className="screen">
      <div className="pad">
        <div className="disp fu" style={{fontSize:22,color:"#fff",marginBottom:18}}>My Progress</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          {[
            {label:"Classes Done",val:"14",c:"var(--accent)"},
            {label:"Streak",val:"7d 🔥",c:"var(--orange)"},
            {label:"Earnings",val:"₹1,200",c:"var(--green)"},
            {label:"Projects",val:"3",c:"var(--accent2)"},
          ].map((s,i)=>(
            <div key={i} className="card fu" style={{padding:"18px 16px",animationDelay:`${i*.05}s`}}>
              <div style={{fontSize:11,fontFamily:"var(--F)",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"var(--dim)",marginBottom:4}}>{s.label}</div>
              <div className="disp" style={{fontSize:26,color:s.c}}>{s.val}</div>
            </div>
          ))}
        </div>

        <SectionTitle>Active Courses</SectionTitle>
        {COURSES.filter(c=>c.done>0&&c.done<c.lessons).map((c,i)=>(
          <div key={c.id} className="card fu" style={{padding:16,marginBottom:10,animationDelay:`${i*.06}s`}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
              <div style={{fontSize:22}}>{c.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"var(--F)",fontWeight:700,fontSize:14}}>{c.title}</div>
                <div style={{fontSize:12,color:"var(--dim)"}}>{c.done}/{c.lessons} lessons · {Math.round(c.done/c.lessons*100)}%</div>
              </div>
            </div>
            <div className="pbar"><div className="pfill" style={{width:`${Math.round(c.done/c.lessons*100)}%`}}/></div>
          </div>
        ))}

        <SectionTitle mb={12} mt={8}>Achievements</SectionTitle>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
          {BADGES.map((b,i)=>(
            <div key={i} className={`bdg ${b.earned?"earned":"locked"}`}>
              <div style={{fontSize:22,marginBottom:4}}>{b.icon}</div>
              <div style={{fontSize:9,color:"var(--dim)",fontFamily:"var(--F)",fontWeight:600,letterSpacing:".04em",textTransform:"uppercase"}}>{b.name}</div>
            </div>
          ))}
        </div>

        <SectionTitle>Certificates</SectionTitle>
        {CERTS.map((c,i)=>(
          <div key={i} className="cert fu" style={{animationDelay:`${i*.07}s`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontSize:11,fontFamily:"var(--F)",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"var(--accent)",marginBottom:6}}>Certificate of Completion</div>
                <div className="disp" style={{fontSize:16,color:"#fff",marginBottom:4}}>{c.title}</div>
                <div style={{fontSize:12,color:"var(--dim)"}}>{c.date}</div>
              </div>
              <div style={{background:"rgba(251,191,36,.1)",border:"1px solid rgba(251,191,36,.2)",borderRadius:10,padding:"6px 12px",fontFamily:"var(--F)",fontWeight:800,fontSize:16,color:"var(--gold)"}}>{c.grade}</div>
            </div>
            <button className="btn btn-outline" style={{marginTop:14,padding:"10px",fontSize:12}}>⬇ Download PDF</button>
          </div>
        ))}

        <SectionTitle mt={8}>Projects Portfolio</SectionTitle>
        {[
          {icon:"🛒",title:"E-commerce Site",tech:"React · Tailwind",status:"Live"},
          {icon:"🎮",title:"Snake Game",tech:"Python · Pygame",status:"Completed"},
          {icon:"🤖",title:"Chatbot UI",tech:"HTML · JS",status:"In Progress"},
        ].map((p,i)=>(
          <div key={i} className="card fu" style={{padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:14,animationDelay:`${i*.06}s`}}>
            <div style={{width:42,height:42,background:"var(--s2)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{p.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"var(--F)",fontWeight:700,fontSize:14,marginBottom:2}}>{p.title}</div>
              <div style={{fontSize:11,color:"var(--dim)"}}>{p.tech}</div>
            </div>
            <div className={`pill ${p.status==="Live"?"pill-green":p.status==="Completed"?"pill-blue":"pill-orange"}`} style={{fontSize:10}}>{p.status}</div>
          </div>
        ))}
        <Spacer/>
      </div>
    </div>
  );
}

/* ─── PROFILE ───────────────────────────────────────────────────── */
function Profile(){
  return(
    <div className="screen">
      <div className="pad">
        <div className="disp fu" style={{fontSize:22,color:"#fff",marginBottom:18}}>Profile</div>
        <div className="card fu" style={{padding:24,marginBottom:14,textAlign:"center"}}>
          <div className="av" style={{margin:"0 auto 12px",background:"linear-gradient(135deg,var(--accent),var(--accent2))",width:64,height:64,fontSize:24}}>D</div>
          <div className="disp" style={{fontSize:20,color:"#fff",marginBottom:2}}>Demo User</div>
          <div style={{fontSize:13,color:"var(--dim)",marginBottom:12}}>Freelancer · Mumbai, IN</div>
          <div style={{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap"}}>
            <div className="pill pill-blue">⚡ Verified</div>
            <div className="pill pill-gold">★ Pro</div>
            <div className="pill pill-green">🎓 Certified</div>
          </div>
        </div>

        {/* Parent Dashboard card */}
        <div className="card fu fu1" style={{padding:16,marginBottom:14,display:"flex",alignItems:"center",gap:14}}>
          <div style={{fontSize:28}}>👨‍👩‍👧</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"var(--F)",fontWeight:700,fontSize:15,marginBottom:2}}>Parent Dashboard</div>
            <div style={{fontSize:12,color:"var(--dim)"}}>Monitor your child's learning</div>
          </div>
          <button style={{background:"linear-gradient(135deg,var(--accent),var(--accent2))",borderRadius:10,padding:"8px 14px",fontFamily:"var(--F)",fontWeight:700,fontSize:12,color:"#fff"}}>View</button>
        </div>

        {/* Child progress snapshot */}
        <div className="card fu fu2" style={{padding:16,marginBottom:16}}>
          <div style={{fontFamily:"var(--F)",fontWeight:700,fontSize:13,marginBottom:10,color:"var(--dim)",letterSpacing:".04em"}}>CHILD'S WEEKLY REPORT</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
            {[["Classes","4 ✅"],["Hours","3.5h"],["Score","92%"]].map(([l,v])=>(
              <div key={l} style={{background:"var(--s2)",borderRadius:12,padding:"10px 8px",textAlign:"center"}}>
                <div className="disp" style={{fontSize:16,color:"var(--accent)"}}>{v}</div>
                <div style={{fontSize:10,color:"var(--dim)",fontFamily:"var(--F)",fontWeight:600,textTransform:"uppercase",letterSpacing:".04em"}}>{l}</div>
              </div>
            ))}
          </div>
          <div className="pbar"><div className="pfill" style={{width:"72%"}}/></div>
          <div style={{fontSize:11,color:"var(--dim)",marginTop:6}}>72% of weekly goal completed</div>
        </div>

        <SectionTitle>My Skills</SectionTitle>
        <div className="hs fu" style={{marginBottom:20}}>
          {["React","Python","Figma","Node.js","AI Prompting"].map(s=>(
            <div key={s} style={{flexShrink:0,padding:"8px 14px",background:"rgba(56,189,248,.08)",border:"1px solid rgba(56,189,248,.18)",borderRadius:50,fontSize:12,fontWeight:500,color:"var(--accent)"}}>{s}</div>
          ))}
        </div>

        <SectionTitle>Account</SectionTitle>
        {[
          {icon:"✏️",label:"Edit Profile"},
          {icon:"💳",label:"Payment Methods"},
          {icon:"🔔",label:"Notifications"},
          {icon:"🔒",label:"Privacy & Security"},
          {icon:"🚪",label:"Sign Out",danger:true},
        ].map((item,i)=>(
          <div key={i} className="card fu" style={{padding:"14px 16px",marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:"pointer",animationDelay:`${i*.04}s`}}>
            <span style={{fontSize:18}}>{item.icon}</span>
            <span style={{flex:1,fontSize:14,fontFamily:"var(--F)",fontWeight:600,color:item.danger?"var(--red)":"var(--text)"}}>{item.label}</span>
            <span style={{color:"var(--dim)",fontSize:14}}>›</span>
          </div>
        ))}
        <Spacer/>
      </div>
    </div>
  );
}

/* ─── TRIAL MODAL ───────────────────────────────────────────────── */
function TrialModal({onClose}){
  const [step,setStep]=useState(0);
  const [sel,setSel]=useState({age:"",slot:"",teacher:""});
  return(
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e=>e.stopPropagation()}>
        {step===0 && <>
          <div className="disp" style={{fontSize:20,color:"#fff",marginBottom:4}}>Book Free Trial</div>
          <div style={{fontSize:13,color:"var(--dim)",marginBottom:20}}>45-min live 1:1 class · No payment needed</div>
          <div className="label" style={{marginBottom:8}}>Child's Age Group</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:20}}>
            {["6–8 yrs","9–12 yrs","13–16 yrs"].map(a=>(
              <button key={a} onClick={()=>setSel(s=>({...s,age:a}))} style={{padding:"10px 4px",borderRadius:12,fontFamily:"var(--F)",fontWeight:700,fontSize:11,border:`1px solid ${sel.age===a?"var(--accent)":"var(--border)"}`,background:sel.age===a?"rgba(56,189,248,.1)":"var(--s2)",color:sel.age===a?"var(--accent)":"var(--dim)"}}>
                {a}
              </button>
            ))}
          </div>
          <div className="label" style={{marginBottom:8}}>Preferred Slot</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:24}}>
            {["Morning 9–11 AM","Afternoon 2–4 PM","Evening 5–7 PM","Weekend"].map(sl=>(
              <button key={sl} onClick={()=>setSel(s=>({...s,slot:sl}))} style={{padding:"10px 8px",borderRadius:12,fontFamily:"var(--F)",fontWeight:600,fontSize:11,border:`1px solid ${sel.slot===sl?"var(--accent)":"var(--border)"}`,background:sel.slot===sl?"rgba(56,189,248,.1)":"var(--s2)",color:sel.slot===sl?"var(--accent)":"var(--dim)"}}>
                {sl}
              </button>
            ))}
          </div>
          <button className="btn btn-primary" onClick={()=>sel.age&&sel.slot&&setStep(1)}>Next →</button>
        </>}
        {step===1 && <>
          <div className="disp" style={{fontSize:20,color:"#fff",marginBottom:4}}>Choose a Teacher</div>
          <div style={{fontSize:13,color:"var(--dim)",marginBottom:20}}>All teachers are verified experts</div>
          {TEACHERS.map((t,i)=>(
            <div key={i} onClick={()=>setSel(s=>({...s,teacher:t.name}))} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 14px",borderRadius:14,marginBottom:10,cursor:"pointer",border:`1px solid ${sel.teacher===t.name?"var(--accent)":"var(--border)"}`,background:sel.teacher===t.name?"rgba(56,189,248,.06)":"var(--s2)"}}>
              <div className="av" style={{background:t.bg,width:42,height:42,fontSize:18}}>{t.emoji}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"var(--F)",fontWeight:700,fontSize:14}}>{t.name}</div>
                <div style={{fontSize:11,color:"var(--dim)"}}>{t.sub} · ★ {t.rating}</div>
              </div>
              {sel.teacher===t.name&&<span style={{color:"var(--accent)",fontSize:18}}>✓</span>}
            </div>
          ))}
          <button className="btn btn-primary" style={{marginTop:4}} onClick={()=>sel.teacher&&setStep(2)}>Confirm Booking →</button>
        </>}
        {step===2 && <div style={{textAlign:"center"}}>
          <div style={{fontSize:52,marginBottom:12}}>🎉</div>
          <div className="disp" style={{fontSize:22,color:"#fff",marginBottom:8}}>You're Booked!</div>
          <div style={{fontSize:13,color:"var(--dim)",marginBottom:4}}>Free trial confirmed with</div>
          <div className="disp" style={{fontSize:18,color:"var(--accent)",marginBottom:20}}>{sel.teacher}</div>
          <div className="pill pill-blue" style={{justifyContent:"center",display:"flex",marginBottom:24,fontSize:13,padding:"8px 18px"}}>{sel.slot} · {sel.age}</div>
          <div style={{fontSize:12,color:"var(--dim)",marginBottom:24}}>You'll receive a WhatsApp confirmation with the class link shortly.</div>
          <button className="btn btn-primary" onClick={onClose}>Done ✓</button>
        </div>}
      </div>
    </div>
  );
}

/* ─── TEACHER MODAL ─────────────────────────────────────────────── */
function TeacherModal({teacher,onClose}){
  return(
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e=>e.stopPropagation()}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div className="av" style={{background:teacher.bg,margin:"0 auto 12px",width:64,height:64,fontSize:26}}>{teacher.emoji}</div>
          <div className="disp" style={{fontSize:20,color:"#fff"}}>{teacher.name}</div>
          <div style={{fontSize:13,color:"var(--dim)",marginBottom:6}}>{teacher.sub}</div>
          <div className="stars">★★★★★ {teacher.rating}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
          {[["Sessions",teacher.sessions],["Rating",teacher.rating],["Exp","4 yrs"]].map(([l,v])=>(
            <div key={l} style={{background:"var(--s2)",borderRadius:12,padding:"12px 8px",textAlign:"center"}}>
              <div className="disp" style={{fontSize:16,color:"var(--accent)"}}>{v}</div>
              <div style={{fontSize:10,color:"var(--dim)",fontFamily:"var(--F)",fontWeight:600,letterSpacing:".06em",textTransform:"uppercase"}}>{l}</div>
            </div>
          ))}
        </div>
        <div className="label" style={{marginBottom:8}}>Teaches</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
          {["Python","Web Dev","AI","Scratch"].map(s=>(
            <div key={s} className="pill pill-blue">{s}</div>
          ))}
        </div>
        <div className="label" style={{marginBottom:8}}>Reviews</div>
        {["Super patient, my kid loves the classes!","Explains concepts in a fun way 🙌"].map((r,i)=>(
          <div key={i} style={{background:"var(--s2)",borderRadius:12,padding:"12px 14px",marginBottom:8,fontSize:13,color:"var(--text)",fontStyle:"italic"}}>"{r}"</div>
        ))}
        <button className="btn btn-primary" style={{marginTop:8}}>Book 1:1 Class</button>
        <button className="btn btn-outline" style={{marginTop:10}} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

/* ─── APP ROOT ──────────────────────────────────────────────────── */
export default function App(){
  const [tab,setTab]=useState("home");
  const [modal,setModal]=useState(null);
  const openBook=()=>setModal("trial");
  const openTeacher=(t)=>setModal({teacher:t});
  const closeModal=()=>setModal(null);

  return(
    <div className="app">
      <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column",position:"relative"}}>
        {tab==="home"    && <Home      onBook={openBook} onTeacher={openTeacher}/>}
        {tab==="classes" && <Classes   onBook={openBook} onTeacher={openTeacher}/>}
        {tab==="explore" && <Explore/>}
        {tab==="dash"    && <Dash/>}
        {tab==="profile" && <Profile/>}
        {modal==="trial"   && <TrialModal    onClose={closeModal}/>}
        {modal?.teacher    && <TeacherModal teacher={modal.teacher} onClose={closeModal}/>}
      </div>
      <nav className="nav">
        {TABS.map(t=>(
          <button key={t.id} className={`nb${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)}>
            <span className="ni">{t.icon}</span>
            <span className="nl">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
