import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const API = 'https://thesimpsonsapi.com/api';
const CDN = 'https://cdn.thesimpsonsapi.com/500';
const colors = ['#dceef6', '#e7e5f4', '#fbe1bf', '#f6dce3', '#e7edcf', '#daeae2', '#e5def0', '#f9e6c4'];
const pageCache = new Map();
const detailCache = new Map();
const formatNumber = n => new Intl.NumberFormat('es-ES', {useGrouping:true}).format(n);
const statusLabel = s => ({Alive:'Vivo',Deceased:'Fallecido',Unknown:'Desconocido'}[s] || s || 'Desconocido');
const genderLabel = s => ({Male:'Masculino',Female:'Femenino',Unknown:'Desconocido'}[s] || s || 'Desconocido');
async function getJSON(path, signal) {
  const response = await fetch(`${API}${path}`, {signal});
  if (!response.ok) throw new Error(`API: ${response.status}`);
  return response.json();
}
function Portrait({character, ...props}) {
  const [failed, setFailed] = useState(false);
  const path = character.portrait_path;
  if (failed || !/^\/character\/[a-zA-Z0-9_.-]+$/.test(path || '')) return <span className="image-fallback" role="img" aria-label="Retrato no disponible">?</span>;
  return <img {...props} src={CDN + path} onError={() => setFailed(true)} />;
}
function Detail({character, onClose}) {
  const dialog = useRef(null);
  const [showAllPhrases, setShowAllPhrases] = useState(false);
  const [data, setData] = useState(detailCache.get(character.id) || character);
  const [loading, setLoading] = useState(!detailCache.has(character.id));
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    dialog.current.showModal();
    return () => dialog.current?.close();
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    if (detailCache.has(character.id)) return;
    setLoading(true); setError(false);
    getJSON(`/characters/${character.id}`, controller.signal).then(result => {
      if (controller.signal.aborted) return;
      detailCache.set(character.id, result); setData(result);
    }).catch(() => {if (!controller.signal.aborted) setError(true);}).finally(() => {if (!controller.signal.aborted) setLoading(false);});
    return () => controller.abort();
  }, [character.id, attempt]);
  const close = () => dialog.current.close();
  return <dialog ref={dialog} aria-labelledby="detail-title" onClose={onClose} onClick={event => {
    if (event.target !== dialog.current) return;
    const rect = dialog.current.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
  }}>
    <button className="close" onClick={close} aria-label="Cerrar ficha" autoFocus>✕</button>
    <div className="detail-layout"><div className="detail-art"><span className="character-id">VECINO #{String(data.id).padStart(3,'0')}</span><Portrait character={data} alt={`Retrato de ${data.name}`} /></div>
      <div className="detail-info"><p className="detail-eyebrow">EXPEDIENTE DE SPRINGFIELD</p><h2 id="detail-title">{data.name}</h2><p className="occupation">{data.occupation || 'Ocupación desconocida'}</p>
        <dl className="facts"><div><dt>Edad</dt><dd>{data.age != null ? `${data.age} años` : 'Sin datos'}</dd></div><div><dt>Género</dt><dd>{genderLabel(data.gender)}</dd></div><div><dt>Estado</dt><dd>{statusLabel(data.status)}</dd></div></dl>
        {loading && <p className="detail-loading" role="status">Buscando su historia…</p>}
        {error && <div className="detail-error" role="status"><p>No se ha podido cargar la biografía.</p><button className="retry" onClick={() => setAttempt(a => a+1)}>Reintentar</button></div>}
        {data.description && <><h3>Su historia</h3><p className="bio">{data.description}</p></>}
        {data.first_appearance_ep && <><h3>Primera aparición en la serie</h3><p className="first-appearance"><b>{data.first_appearance_ep.name}</b><br />Temporada {data.first_appearance_ep.season} · Episodio {data.first_appearance_ep.episode_number}</p></>}
        <h3>En sus propias palabras</h3>{data.phrases?.length ? <>
          <ul className="quotes" id="character-quotes">{(showAllPhrases ? data.phrases : data.phrases.slice(0, 3)).map((phrase,i) => <li key={i}>“{phrase}”</li>)}</ul>
          {data.phrases.length > 3 && <button className="quotes-toggle" aria-expanded={showAllPhrases} aria-controls="character-quotes" onClick={() => setShowAllPhrases(expanded => !expanded)}>
            {showAllPhrases ? 'Ver menos' : `Ver más (${data.phrases.length - 3})`} <span aria-hidden="true">{showAllPhrases ? '↑' : '↓'}</span>
          </button>}
        </> : <p className="bio">Todavía no hay frases de este personaje.</p>}
        <p className="api-note">Biografía, ocupación y frases en el idioma original de la API.</p>
      </div>
    </div>
  </dialog>;
}
function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [selected, setSelected] = useState(null);
  const opener = useRef(null);
  const section = useRef(null);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(false);
    const request = pageCache.has(page) ? Promise.resolve(pageCache.get(page)) : getJSON(`/characters?page=${page}`, controller.signal);
    request.then(result => {
      if (controller.signal.aborted) return;
      if (!Array.isArray(result.results) || !Number.isFinite(result.pages)) throw new Error('Respuesta no válida');
      pageCache.set(page, result); setData(result);
    }).catch(() => {if (!controller.signal.aborted) setError(true);}).finally(() => {if (!controller.signal.aborted) setLoading(false);});
    return () => controller.abort();
  }, [page, attempt]);
  const pages = data?.pages || 1;
  const changePage = next => {
    if (next === page || next < 1 || next > pages || loading) return;
    setPage(next);
    section.current.scrollIntoView({block:'start', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  };
  const candidates = new Set([1,pages,page-1,page,page+1]);
  if (page <= 2) candidates.add(3);
  if (page >= pages-1) candidates.add(pages-2);
  const numbers = [...candidates].filter(n => n>0 && n<=pages).sort((a,b) => a-b);
  return <>
    <header className="masthead"><a className="brand" href="./" aria-label="Springfield, inicio"><span className="brand-title">The Simpsons<span className="brand-dot">®</span></span><span className="brand-caption">EL UNIVERSO DE SPRINGFIELD</span></a><div className="header-right"><span className="nav-active">Personajes</span><span className="header-note">Un pueblo. Mil historias.</span></div></header>
    <main>
      <section className="intro" aria-labelledby="page-title"><div className="intro-copy"><p className="eyebrow"><span className="tiny-star">✳</span> BIENVENIDO AL VECINDARIO</p><h1 id="page-title">Todo Springfield.<br /><span>Y algún que otro loco.</span></h1><p className="intro-description">Las caras de siempre. Las historias que nunca te cansas de ver.<br className="desktop-break" /> Conoce a los personajes del pueblo más amarillo de la tele.</p><div className="intro-foot"><span className="count-pill"><b>{data ? formatNumber(data.count) : '—'}</b> personajes</span><span className="intro-aside">Sí, Flanders también está aquí.</span></div></div><div className="hero-portrait" aria-hidden="true"><span className="portrait-orbit" /><Portrait character={{portrait_path:'/character/1.webp'}} alt="" fetchPriority="high" /><span className="speech">¡D’OH!</span><span className="hero-caption">UN VECINO EJEMPLAR. MÁS O MENOS.</span></div></section>
      <section className="directory" aria-labelledby="directory-title" ref={section}><div className="section-heading"><div><span className="section-index">01 /</span><h2 id="directory-title">Los habitantes</h2></div><p aria-live="polite">{loading ? `Cargando página ${page}…` : error ? 'Sin conexión con Springfield' : `${(page-1)*20+1}–${(page-1)*20+data.results.length} de ${formatNumber(data.count)} personajes`}</p></div>
        {error && <div className="error-box" role="alert"><h3>¡D’oh! Algo no ha ido bien.</h3><p>No hemos podido cargar los personajes. Comprueba tu conexión y vuelve a intentarlo.</p><button className="retry" onClick={() => setAttempt(a => a+1)}>Volver a intentar</button></div>}
        <div className="grid" aria-busy={loading}>{loading ? Array.from({length:8},(_,i) => <div key={i} className="skeleton" aria-hidden="true" />) : !error && data.results.map((character,i) => <button key={character.id} className="card" style={{'--card-color':colors[i % colors.length]}} aria-label={`Ver ficha de ${character.name}`} onClick={event => {opener.current = event.currentTarget;setSelected(character);}}><div className="card-art"><span className="character-id">#{String(character.id).padStart(3,'0')}</span><Portrait character={character} alt="" loading={i<4 ? 'eager' : 'lazy'} width="220" height="199" /></div><div className="card-body"><h3>{character.name}</h3><span className="card-arrow" aria-hidden="true">↗</span><p>{character.occupation || 'Ocupación desconocida'}</p></div></button>)}</div>
        {!loading && !error && !data.results.length && <p role="status">No hay personajes en esta página.</p>}
        <nav className="pagination" aria-label="Páginas de personajes"><button className="page-step" disabled={loading || error || page===1} onClick={() => changePage(page-1)}><span aria-hidden="true">←</span> Anterior</button><div className="page-numbers">{!loading && !error && numbers.map((n,i) => <React.Fragment key={n}>{i>0 && n-numbers[i-1]>1 && <span className="ellipsis" aria-hidden="true">…</span>}<button aria-label={`Página ${n}`} aria-current={n===page ? 'page' : undefined} onClick={() => changePage(n)}>{n}</button></React.Fragment>)}</div><button className="page-step" disabled={loading || error || page===pages} onClick={() => changePage(page+1)}>Siguiente <span aria-hidden="true">→</span></button></nav>
        <p className="page-caption">{!loading && !error ? `Página ${page} de ${pages} · 20 personajes por página` : '\u00a0'}</p>
      </section>
    </main>
    <footer><span className="footer-brand">Hecho de amarillo.</span><p>Un proyecto fan, con datos de <a href="https://thesimpsonsapi.com/" target="_blank" rel="noreferrer">The Simpsons API ↗</a><br /><span>Datos de <a href="https://simpsons.fandom.com/" target="_blank" rel="noreferrer">The Simpsons Wiki</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA</a>. Los Simpson pertenece a sus respectivos titulares.</span></p><span className="footer-end">HASTA LUEGO, VECINITO.</span></footer>
    {selected && <Detail key={selected.id} character={selected} onClose={() => {setSelected(null);opener.current?.focus();}} />}
  </>;
}
createRoot(document.getElementById('root')).render(<App />);
