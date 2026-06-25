import React, { useEffect, useRef, useState } from 'react'

/* ============================================================================
   UNIVERSAL CHAT WIDGET  (drop-in, locked, zero external icon dependency)
   ----------------------------------------------------------------------------
   This component + its `.cw-*` styles in index.css are LOCKED. Do NOT redesign.
   Per site you change exactly two things:
     1) The brand colours: the 11 `--cw-*` variables in index.css (← brand).
     2) The content: the CHAT config + CHAT_QA list directly below.
   Keep replies short, grounded in real facts, and always nudge toward a call /
   booking. Never invent prices, availability, or anything not written here.
   ========================================================================== */

/* ----- inline icons (lucide-shaped, no external dependency) — LOCKED ----- */
type IconProps = { className?: string; strokeWidth?: number }
const MessageCircle = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
)
const X = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)
const Send = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22 11 13 2 9 22 2Z" />
  </svg>
)
const Phone = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

/* ===================== PER-SITE CONTENT (edit only this region) ===================== */

const CHAT = {
  phoneLabel: '@robinsons_pub',
  phoneHref: 'https://instagram.com/robinsons_pub',
  launcher: 'Vprašajte nas',
  title: 'Pomočnik',
  subtitle: "Robinson's Pub",
  badge: 'predogled',
  teaserStrong: 'Pozdravljeni!',
  teaserRest: 'Vam lahko pomagam?',
  placeholder: 'Napišite vprašanje ...',
  callLabel: 'Sledite nam',
  intro: "Dobrodošli pri Robinson's Pub. Z veseljem odgovorim na vprašanja o pijači, dogodkih in delovnem času. Kako lahko pomagam?",
  limit: 5,
  fallback: 'Tega na žalost nimam pri roki, vam pa z veseljem pomaga naša ekipa. Pišite nam na @robinsons_pub ali se oglasite pri baru.',
  capped: 'To je predogled našega pomočnika. Za vse ostalo nam pišite na @robinsons_pub ali se oglasite pri baru, z veseljem pomagamo.',
}

type QA = { id: string; q: string; a: string; keywords: string[] }

const CHAT_QA: QA[] = [
  { id: 'cas', q: 'Kakšen je delovni čas?', a: 'Odprti smo pon–čet 9.00–24.00, pet–sob 9.00–02.00 in ned 10.00–22.00. Za sprotne novice spremljajte @robinsons_pub.', keywords: ['cas', 'čas', 'odpr', 'ura', 'kdaj', 'delovni', 'open', 'hour', 'time'] },
  { id: 'lokacija', q: 'Kje se nahajate?', a: 'Najdete nas na Stadionu Bonifika, Ljubljanska cesta 2A, 6000 Koper. Pot do nas je na voljo prek zemljevida na strani.', keywords: ['kje', 'naslov', 'lokacij', 'bonifika', 'koper', 'where', 'address', 'pot', 'map'] },
  { id: 'pijaca', q: 'Kaj imate za piti?', a: 'Točimo odličen Guinness in Kilkenny, ponujamo pa tudi koktajle in vrhunsko kavo. Pravi irski pub doživetje.', keywords: ['pija', 'pijac', 'guinness', 'kilkenny', 'pivo', 'koktaj', 'kava', 'beer', 'drink', 'coffee', 'meni', 'menu'] },
  { id: 'dogodki', q: 'Kakšni dogodki potekajo?', a: 'Pri nas so tedenski pub kvizi, večeri žive glasbe in praznovanja irskih praznikov. Datume objavljamo na @robinsons_pub.', keywords: ['dogod', 'kviz', 'glasb', 'music', 'event', 'quiz', 'patrik', 'praznik', 'nastop', 'live'] },
  { id: 'kviz', q: 'Kdaj je pub kviz?', a: 'Pub kviz pri nas poteka tedensko. Točne datume in termine objavljamo na Instagramu @robinsons_pub.', keywords: ['kviz', 'quiz', 'znanje', 'ekipa', 'tedensk', 'team'] },
  { id: 'rezervacija', q: 'Ali lahko rezerviram mizo?', a: 'Glede skupin in dogodkov vam najlažje pomagamo prek sporočila na @robinsons_pub ali kar pri baru. Razpoložljivosti vnaprej ne morem potrditi.', keywords: ['rezerv', 'miza', 'skupin', 'naroc', 'naroč', 'book', 'reserv', 'termin', 'table'] },
  { id: 'cena', q: 'Koliko stane obisk?', a: 'Gostje pravijo, da se obisk giblje okoli 5–10 € na osebo. Za točne cene se oglasite pri baru.', keywords: ['cena', 'cen', 'stane', 'koliko', 'price', 'cost', 'placilo', 'plačilo', 'pay', 'eur'] },
  { id: 'kontakt', q: 'Kako vas kontaktiram?', a: 'Najlažje nas dobite na Instagramu @robinsons_pub ali po e-pošti. Z veseljem odgovorimo.', keywords: ['kontakt', 'contact', 'instagram', 'mail', 'eposta', 'e-pošta', 'pisi', 'piši', 'social'] },
]

/* ===================== locked implementation below ===================== */

const cx = (...p: Array<string | false | null | undefined>) => p.filter(Boolean).join(' ')

type Msg = { id: number; role: 'bot' | 'user'; text: string }

function withPhone(text: string): React.ReactNode {
  const parts = text.split(CHAT.phoneLabel)
  if (parts.length === 1) return text
  const out: React.ReactNode[] = []
  parts.forEach((p, i) => {
    if (i > 0)
      out.push(
        <a key={`tel-${i}`} href={CHAT.phoneHref} className="cw-link">
          {CHAT.phoneLabel}
        </a>,
      )
    out.push(<React.Fragment key={`t-${i}`}>{p}</React.Fragment>)
  })
  return out
}

function matchQA(text: string): QA | null {
  const t = text.toLowerCase()
  for (const qa of CHAT_QA) if (qa.keywords.some((k) => t.includes(k))) return qa
  return null
}

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, role: 'bot', text: CHAT.intro }])
  const [answered, setAnswered] = useState<string[]>([])
  const [count, setCount] = useState(0)
  const [thinking, setThinking] = useState(false)
  const [input, setInput] = useState('')
  const [teaser, setTeaser] = useState(false)
  const idRef = useRef(1)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const teaserDismissed = useRef(false)
  const capped = count >= CHAT.limit

  useEffect(() => {
    const reveal = setTimeout(() => {
      if (!teaserDismissed.current) setTeaser(true)
    }, 1100)
    const onScroll = () => {
      if (window.scrollY > 16) {
        teaserDismissed.current = true
        setTeaser(false)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(reveal)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [msgs, thinking])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const t = setTimeout(() => inputRef.current?.focus(), 120)
    return () => {
      document.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [open])

  function dismissTeaser() {
    teaserDismissed.current = true
    setTeaser(false)
  }
  function openChat() {
    dismissTeaser()
    setOpen(true)
  }

  function ask(userText: string, forced?: QA) {
    if (capped || thinking) return
    const qa = forced || matchQA(userText)
    setMsgs((m) => [...m, { id: idRef.current++, role: 'user', text: userText }])
    setInput('')
    setThinking(true)
    const reply = qa ? qa.a : CHAT.fallback
    const delay = prefersReduced() ? 60 : 480
    setTimeout(() => {
      setMsgs((m) => [...m, { id: idRef.current++, role: 'bot', text: reply }])
      if (qa) setAnswered((a) => (a.includes(qa.id) ? a : [...a, qa.id]))
      const next = count + 1
      setCount(next)
      setThinking(false)
      if (next >= CHAT.limit)
        setTimeout(
          () => setMsgs((m) => [...m, { id: idRef.current++, role: 'bot', text: CHAT.capped }]),
          prefersReduced() ? 60 : 420,
        )
    }, delay)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const t = input.trim()
    if (t) ask(t)
  }

  const suggestions = CHAT_QA.filter((q) => !answered.includes(q.id)).slice(0, 4)

  return (
    <>
      {!open && (
        <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
          {teaser && (
            <div className="cw-teaser cw-teaser-anim flex max-w-[15.5rem] items-start gap-2 rounded-2xl rounded-br-md px-4 py-3">
              <button type="button" onClick={openChat} className="text-left font-sans text-[0.88rem] leading-snug">
                <span className="cw-strong">{CHAT.teaserStrong}</span> {CHAT.teaserRest}
              </button>
              <button
                type="button"
                onClick={dismissTeaser}
                aria-label="Zapri sporočilo"
                className="cw-teaser-close -mr-1.5 -mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full transition"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={openChat}
            aria-label="Odpri pomočnika"
            className="cw-launcher tap flex items-center gap-2.5 rounded-full py-3 pl-3.5 pr-5 transition"
          >
            <span className="cw-launcher-icon grid h-8 w-8 place-items-center rounded-full">
              <MessageCircle className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="font-sans text-[0.86rem] font-semibold">{CHAT.launcher}</span>
          </button>
        </div>
      )}

      {open && (
        <>
          <div className="cw-scrim fixed inset-0 z-[65] md:hidden" aria-hidden="true" onClick={() => setOpen(false)} />

          <div
            role="dialog"
            aria-label={`${CHAT.title} ${CHAT.subtitle}`}
            className="cw-panel fixed inset-x-3 top-24 bottom-24 z-[70] flex flex-col overflow-hidden rounded-3xl md:inset-auto md:bottom-6 md:right-6 md:h-[560px] md:w-[384px]"
          >
            <div className="cw-header flex items-center gap-3 px-4 py-3.5">
              <span className="cw-avatar grid h-10 w-10 shrink-0 place-items-center rounded-full">
                <MessageCircle className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="cw-title flex items-center gap-2 font-serif text-[1.05rem]">
                  {CHAT.title}
                  <span className="cw-badge rounded-full px-2 py-0.5 font-sans text-[0.56rem] font-semibold uppercase tracking-[0.16em]">
                    {CHAT.badge}
                  </span>
                </p>
                <p className="cw-subtitle truncate font-sans text-[0.7rem]">{CHAT.subtitle}</p>
              </div>
              <a
                href={CHAT.phoneHref}
                aria-label={`Pokliči ${CHAT.phoneLabel}`}
                className="cw-phone-btn grid h-9 w-9 place-items-center rounded-full transition"
              >
                <Phone className="h-4 w-4" strokeWidth={2.1} />
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Zapri pomočnika"
                className="cw-close grid h-9 w-9 place-items-center rounded-full transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={scrollRef} className="cw-messages flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m) => (
                <div key={m.id} className={cx('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cx(
                      'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.9rem] leading-relaxed',
                      m.role === 'user' ? 'cw-bubble-user rounded-tr-sm' : 'cw-bubble-bot rounded-tl-sm',
                    )}
                  >
                    {m.role === 'bot' ? withPhone(m.text) : m.text}
                  </div>
                </div>
              ))}
              {thinking && (
                <div className="flex justify-start">
                  <div className="cw-bubble-bot flex items-center gap-1.5 rounded-2xl rounded-tl-sm px-4 py-3">
                    <span className="cw-dot" />
                    <span className="cw-dot" style={{ animationDelay: '0.15s' }} />
                    <span className="cw-dot" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="cw-footer px-4 py-3.5">
              {capped ? (
                <a href={CHAT.phoneHref} className="cw-cta tap flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 font-sans text-[0.84rem] font-semibold transition">
                  <Phone className="h-4 w-4" strokeWidth={2.1} />
                  {CHAT.callLabel} {CHAT.phoneLabel}
                </a>
              ) : (
                <>
                  {suggestions.length > 0 && !thinking && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {suggestions.map((qa) => (
                        <button
                          key={qa.id}
                          type="button"
                          onClick={() => ask(qa.q, qa)}
                          className="cw-chip tap rounded-full px-3 py-1.5 text-left font-sans text-[0.78rem] transition"
                        >
                          {qa.q}
                        </button>
                      ))}
                    </div>
                  )}
                  <form onSubmit={onSubmit} className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      type="text"
                      aria-label="Vaše vprašanje"
                      placeholder={CHAT.placeholder}
                      className="cw-input min-w-0 flex-1 rounded-full px-4 py-2.5 font-sans text-[0.9rem]"
                    />
                    <button
                      type="submit"
                      aria-label="Pošlji"
                      disabled={thinking || !input.trim()}
                      className="cw-send tap grid h-11 w-11 shrink-0 place-items-center rounded-full transition"
                    >
                      <Send className="h-4 w-4" strokeWidth={2.1} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
