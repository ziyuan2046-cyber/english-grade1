import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { PlayerProvider } from './lib/player'
import { BookGate, BookProvider, useBook } from './lib/books'
import Extras from './pages/Extras'
import Home from './pages/Home'
import TextReader from './pages/TextReader'
import Texts from './pages/Texts'
import UnitDetail from './pages/UnitDetail'
import VideoPlayer from './pages/VideoPlayer'
import Wordbook from './pages/Wordbook'
import BookSection from './pages/BookSection'
import Resources from './pages/Resources'
function UnknownRoute() { const { book } = useBook(); return <Navigate to={`/?book=${book.id}`} replace/> }
export default function App(){return <PlayerProvider><BookProvider><Routes><Route element={<Layout/>}>
 <Route path="/" element={<Home/>}/>
 <Route path="/unit/:unitId" element={<BookGate><UnitDetail/></BookGate>}/>
 <Route path="/learn/:unitId" element={<BookGate><UnitDetail/></BookGate>}/>
 <Route path="/read/:unitId/:sectionId" element={<BookGate><TextReader/></BookGate>}/>
 <Route path="/watch/:unitId/:videoId" element={<BookGate><VideoPlayer/></BookGate>}/>
 <Route path="/texts" element={<Texts/>}/>
 <Route path="/wordbook" element={<Wordbook/>}/>
 <Route path="/extras" element={<Extras/>}/>
 <Route path="/book-section/:sectionId" element={<BookGate><BookSection/></BookGate>}/>
 <Route path="/resources" element={<Resources/>}/>
 <Route path="*" element={<UnknownRoute/>}/>
 </Route></Routes></BookProvider></PlayerProvider>}
