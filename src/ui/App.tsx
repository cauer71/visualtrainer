import { useEffect, useMemo, useState } from 'preact/hooks';
import { brand } from '../config/brand';
import { setSoundEnabled } from '../core/sound';
import { getSettings, updateSettings } from '../core/storage';
import { detectLang, type Lang } from '../i18n/lang';
import { UI } from '../i18n/ui';
import { AppCtx, type AppState } from './app-context';
import { Footer, Header } from './components/Chrome';
import { ExercisePage } from './pages/ExercisePage';
import { Home } from './pages/Home';
import { Science } from './pages/Science';
import { useRoute } from './router';

export function App() {
  const route = useRoute();
  const [lang, setLangState] = useState<Lang>(() => detectLang(getSettings().lang));
  const [sound, setSoundState] = useState<boolean>(() => getSettings().sound);
  const [dataVersion, setDataVersion] = useState(0);

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
    [lang, sound, dataVersion],
  );

  let page;
  if (route.name === 'exercise' && route.id) page = <ExercisePage id={route.id} query={route.query} />;
  else if (route.name === 'science') page = <Science focus={route.id} />;
  else page = <Home />;

  return (
    <AppCtx.Provider value={state}>
      <a class="skip-link" href="#main">
        {UI[lang].nav.exercises}
      </a>
      <Header />
      {page}
      <Footer />
    </AppCtx.Provider>
  );
}
