import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { PlayerProvider } from './lib/player'
import { BookGate, BookProvider } from './lib/books'
import Extras from './pages/Extras'
import Home from './pages/Home'
import TextReader from './pages/TextReader'
import Texts from './pages/Texts'
import UnitDetail from './pages/UnitDetail'
import VideoPlayer from './pages/VideoPlayer'
import Wordbook from './pages/Wordbook'
import BookSection from './pages/BookSection'
import Resources from './pages/Resources'
export default function App(){return <PlayerProvider><BookProvider><Routes><Route element={<Layout/>}>
 <Route path="/" element={<Home/>}/>
 <Route path="/unit/:unitId" element={<BookGate><UnitDetail/></BookGate>}/>
 <Route path="/learn/:unitId" element={<BookGate><UnitDetail/></BookGate>}/>
 <Route path="/read/:unitId/:sectionId" element={<BookGate><TextReader/></BookGate>}/>
 <Route path="/watch/:unitId/:videoId" element={<BookGate><VideoPlayer/></BookGate>}/>
 <Route path="/texts" element={<BookGate><Texts/></BookGate>}/>
 <Route path="/wordbook" element={<BookGate><Wordbook/></BookGate>}/>
 <Route path="/extras" element={<BookGate><Extras/></BookGate>}/>
 <Route path="/book-section/:sectionId" element={<BookGate><BookSection/></BookGate>}/>
 <Route path="/resources" element={<BookGate><Resources/></BookGate>}/>
 <Route path="*" element={<Navigate to="/" replace/>}/>
 </Route></Routes></BookProvider></PlayerProvider>}
