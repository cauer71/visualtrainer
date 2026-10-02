import { useEffect, useMemo, useState } from 'preact/hooks';
import { brand } from '../config/brand';
import { setSoundEnabled } from '../core/sound';
import { DEFAULT_CUSTOMER_IDS, getSettings, updateSettings, type Role } from '../core/storage';
import { getExercise } from '../exercises/registry';
import { OPT } from '../i18n/optiker';
import { detectLang, type Lang } from '../i18n/lang';
import { UI } from '../i18n/ui';
import { AppCtx, type AppState } from './app-context';
import { Footer, Header } from './components/Chrome';
import { ExercisePage } from './pages/ExercisePage';
import { Calibrate } from './pages/Calibrate';
import { Catalog, CatalogEntry } from './pages/Catalog';
import { Home } from './pages/Home';
import { OpticianPage } from './pages/OpticianPage';
import { RoleGate } from './components/RoleGate';
import { Science } from './pages/Science';
import { flags, go, useRoute } from './router';

export function App() {
  const route = useRoute();
  const [lang, setLangState] = useState<Lang>(() => detectLang(getSettings().lang));
  const [sound, setSoundState] = useState<boolean>(() => getSettings().sound);
  const [dataVersion, setDataVersion] = useState(0);
  // Tests (?quick / ?autoplay) und Einbettung (?embed) brauchen keine Rollenwahl
  const [role, setRoleState] = useState<Role | null>(() => {
    const stored = getSettings().role;
    if (stored) return stored;
    if (flags.quick || flags.autoplay) return 'optiker';
    if (flags.embed) return 'kunde';
    return null;
  });
  const [askingRole, setAskingRole] = useState(false);
  const [customerIds, setCustomerIdsState] = useState<string[]>(() => {
    const ids = getSettings().customerIds;
    const valid = Array.isArray(ids) ? ids.filter((id) => getExercise(id)) : [];
    return valid.length ? valid : [...DEFAULT_CUSTOMER_IDS];
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${brand.appName} – ${UI[lang].home.kicker}`;
  }, [lang]);

  useEffect(() => {
    setSoundEnabled(sound);
  }, [sound]);

  const state = useMemo<AppState>(
    () => ({
      lang,
      ui: UI[lang],
      opt: OPT[lang],
      role,
      isOptician: role === 'optiker',
      setRole: (r) => {
        updateSettings({ role: r });
        setRoleState(r);
        setAskingRole(false);
        go('/');
      },
      askRole: () => setAskingRole(true),
      customerIds,
      setCustomerIds: (ids) => {
        updateSettings({ customerIds: ids });
        setCustomerIdsState(ids);
      },
      setLang: (l) => {
        updateSettings({ lang: l });
        setLangState(l);
      },
      sound,
      setSound: (on) => {
        updateSettings({ sound: on });
        setSoundEnabled(on);
        setSoundState(on);
      },
      dataVersion,
      bumpData: () => setDataVersion((v) => v + 1),
    }),
    [lang, sound, dataVersion, role, customerIds],
  );

  const isOptician = role === 'optiker';
  let page;
  if (route.name === 'exercise' && route.id && (isOptician || customerIds.includes(route.id))) {
    page = <ExercisePage id={route.id} query={route.query} />;
  } else if (route.name === 'science' && isOptician) page = <Science focus={route.id} />;
  else if (route.name === 'catalog' && isOptician) page = <Catalog />;
  else if (route.name === 'catalogEntry' && route.id && isOptician) page = <CatalogEntry nr={route.id} />;
  else if (route.name === 'optiker' && isOptician) page = <OpticianPage />;
  // Kalibrierung: Sache der Person am Gerät, kein Login und keine Optiker-Ansicht nötig
  else if (route.name === 'calibrate') page = <Calibrate />;
  else page = <Home />;

  return (
    <AppCtx.Provider value={state}>
      <a class="skip-link" href="#main">
        {UI[lang].nav.exercises}
      </a>
      <Header />
      {page}
      <Footer />
      {role === null || askingRole ? <RoleGate onClose={role !== null ? () => setAskingRole(false) : undefined} /> : null}
    </AppCtx.Provider>
  );
}
