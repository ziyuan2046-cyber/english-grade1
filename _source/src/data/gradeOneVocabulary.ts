import type { Word } from './curriculum'

type Entry = [en: string, ipa: string, zh: string, emoji?: string, form?: string]
const words = (entries: Entry[]): Word[] => entries.map(([en, ipa, zh, emoji = '', form]) => ({ en, ipa: ipa ? `/${ipa}/` : '', zh, emoji, form }))

// 教材照片 pp. 64–66：按单元词汇表顺序，字母索引不重复录入。
export const GRADE_ONE_UNIT_WORDS = [
  words([
    ['hello', 'həˈləʊ', '喂，你好', '👋'], ['nice', 'naɪs', '令人愉快的'], ['meet', 'miːt', '认识，结识'],
    ['you', 'juː', '你'], ["let’s", 'lets', '让我们', '', 'let us'], ['play', 'pleɪ', '玩，玩耍'],
    ['I', 'aɪ', '我'], ['am', 'æm', '是（我是）', '', 'I’m = I am'], ['too', 'tuː', '也，还'],
    ['Miss', 'mɪs', '老师'], ['photo', 'ˈfəʊtəʊ', '照片，相片', '📷'], ['how', 'haʊ', '怎样，如何'], ['say', 'seɪ', '说'],
  ]),
  words([
    ['number', 'ˈnʌmbə', '数，数字'], ['one', 'wʌn', '一'], ['two', 'tuː', '二'], ['three', 'θriː', '三'],
    ['four', 'fɔː', '四'], ['five', 'faɪv', '五'], ['six', 'sɪks', '六'], ['seven', 'ˈsevən', '七'],
    ['balloon', 'bəˈluːn', '气球', '🎈'], ['thank', 'θæŋk', '感谢；向……表示谢意'], ['please', 'pliːz', '请，劳驾'],
  ]),
  words([
    ['family', 'ˈfæməli', '家庭'], ['my', 'maɪ', '我的'], ['mum', 'mʌm', '妈妈'], ['dad', 'dæd', '爸爸'],
    ['grandpa', 'ˈɡrænpɑː', '祖父；外祖父'], ['grandma', 'ˈɡrænmɑː', '祖母；外祖母'], ['sister', 'ˈsɪstə', '姐姐；妹妹'],
    ['and', 'ænd', '和，与'], ['brother', 'ˈbrʌðə', '哥哥；弟弟'], ['this', 'ðɪs', '这，这个'],
    ['is', 'ɪz', '是'], ['love', 'lʌv', '爱，关爱'], ['tree', 'triː', '树', '🌳'], ['me', 'miː', '我'],
  ]),
  words([
    ['classroom', 'ˈklɑːsruːm', '教室'], ['what', 'wɒt', '什么'], ['open', 'ˈəʊpən', '打开'], ['door', 'dɔː', '门'],
    ['blackboard', 'ˈblækbɔːd', '黑板'], ['window', 'ˈwɪndəʊ', '窗户'], ['desk', 'desk', '书桌'], ['chair', 'tʃeə', '椅子'],
    ['it', 'ɪt', '它，这，那'], ['big', 'bɪɡ', '大的'], ['that', 'ðæt', '那，那个'], ['teacher', 'ˈtiːtʃə', '教师，老师'],
    ['Good job!', 'ɡʊd dʒɒb', '干得好！真不错！'], ['a(n)', 'ə / ən', '一（个）', '', 'a / an'],
    ['very', 'ˈveri', '非常'], ['old', 'əʊld', '年代久远的'], ['school', 'skuːl', '学校', '🏫'], ['look', 'lʊk', '看，望，瞧'],
  ]),
  words([
    ['thing', 'θɪŋ', '东西，物品'], ['schoolbag', 'ˈskuːlbæɡ', '书包'], ['pencil case', 'ˈpensəl keɪs', '笔袋；铅笔盒'],
    ['pencil', 'ˈpensəl', '铅笔'], ['book', 'bʊk', '书，书籍'], ['bye', 'baɪ', '再见，拜拜', '👋', 'goodbye'],
    ['no', 'nəʊ', '不'], ['here you are', 'hɪə juː ɑː', '给你（递东西时用）'], ['read', 'riːd', '阅读'], ['together', 'təˈɡeðə', '一起，共同'],
  ]),
  words([
    ['colour', 'ˈkʌlə', '颜色'], ['red', 'red', '红色'], ['green', 'ɡriːn', '绿色'], ['blue', 'bluː', '蓝色'],
    ['black', 'blæk', '黑色'], ['white', 'waɪt', '白色'], ['yellow', 'ˈjeləʊ', '黄色'], ['so', 'səʊ', '这么，如此'],
    ['many', 'ˈmeni', '许多；大量'], ['happy', 'ˈhæpi', '快乐的'], ['Chinese New Year', 'ˌtʃaɪˈniːz njuː jɪə', '春节'],
    ['stop', 'stɒp', '停止，终止', '🛑'], ['go', 'ɡəʊ', '走'], ['slow', 'sləʊ', '慢下来，减速'],
  ]),
]

// pp. 69–70：附录按教材章节归类，专有名词不混入六个单元。
export const GRADE_ONE_EXTRA_WORDS = [
  { id: 'beijing', title: 'This is Beijing!', subtitle: '这是北京！', words: words([
    ['welcome', 'ˈwelkəm', '欢迎'], ['friend', 'frend', '朋友'], ['OK', 'ˌəʊˈkeɪ', '行，可以'], ['come', 'kʌm', '来；来到'],
    ['see', 'siː', '看见，看到'], ['she', 'ʃiː', '她'], ['great', 'ɡreɪt', '极棒的，极好的'], ['city', 'ˈsɪti', '城市'],
    ['the Great Wall', 'ðə ɡreɪt wɔːl', '长城'], ['the Palace Museum', 'ðə ˈpæləs mjuˈziːəm', '故宫'], ['colourful', 'ˈkʌləfəl', '色彩丰富的', '🎨'],
  ]) },
  { id: 'reading', title: 'Reading for pleasure', subtitle: '趣味阅读', words: words([
    ['bear', 'beə', '熊', '🐻'], ['pick', 'pɪk', '采，摘'], ['apple', 'ˈæpəl', '苹果', '🍎'], ['now', 'naʊ', '现在，此刻'],
  ]) },
  { id: 'proper-nouns', title: 'Proper nouns', subtitle: '专有名词', words: words([
    ['Toby', 'ˈtəʊbi', '托比'], ['Emma', 'ˈemə', '埃玛'], ['May', 'meɪ', '梅'],
    ['Yingtian Academy', '', '应天书院'], ['Songyang Academy', '', '嵩阳书院'],
  ]) },
]
