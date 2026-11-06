// 外研社《新交际英语》一年级上册（一年级起点）
// 内容来源：教材配套音频（单词表逐词录音）+ 课文视频画面文字/字幕，
//           经视频字幕逐帧核对与音频语音识别互相印证整理而来。

export type Word = {
  en: string
  ipa: string
  zh: string
  emoji: string
}

export type Track = { label: string; src: string }

export type TextSection = {
  id: string
  kind: 'start' | 'read' | 'explore'
  title: string
  subtitle: string
  tracks: Track[]
  english: string[]
  chinese: string[]
  lines: { en: string; zh: string; audio?: number }[]
}

export type VideoItem = {
  id: string
  title: string
  subtitle: string
  src: string
  /** 视频首帧截图（课本页面），用作封面 */
  poster: string
  page: number
}

export type Unit = {
  id: number
  code: string
  title: string
  titleZh: string
  emoji: string
  color: string
  tint: string
  words: Word[]
  wordsAudio: string
  texts: TextSection[]
  videos: VideoItem[]
}

export const UNIT_COLORS: Record<number, { main: string; tint: string }> = {
  1: { main: '#6366F1', tint: '#EEF1FF' },
  2: { main: '#0EA5E9', tint: '#E6F6FE' },
  3: { main: '#F43F5E', tint: '#FFEBF0' },
  4: { main: '#10B981', tint: '#E4FAF2' },
  5: { main: '#F59E0B', tint: '#FFF4E0' },
  6: { main: '#A855F7', tint: '#F6EBFF' },
}

// 从发布前线上版本无损提取；已有单词、句子、顺序和媒体地址保持不变。
export const UNITS: Unit[] = [
  {
    "id": 1,
    "code": "Unit 1",
    "title": "Hello!",
    "titleZh": "你好！",
    "emoji": "👋",
    "color": "#6366F1",
    "tint": "#EEF1FF",
    "wordsAudio": "./audio/words/unit-1.mp3",
    "words": [
      {
        "en": "hello",
        "ipa": "/həˈləʊ/",
        "zh": "你好",
        "emoji": "👋"
      },
      {
        "en": "hi",
        "ipa": "/haɪ/",
        "zh": "嗨；你好",
        "emoji": "🙋"
      },
      {
        "en": "nice",
        "ipa": "/naɪs/",
        "zh": "好的；友好的",
        "emoji": "😊"
      },
      {
        "en": "meet",
        "ipa": "/miːt/",
        "zh": "遇见；见面",
        "emoji": "🤝"
      },
      {
        "en": "you",
        "ipa": "/juː/",
        "zh": "你；你们",
        "emoji": "🫵"
      },
      {
        "en": "play",
        "ipa": "/pleɪ/",
        "zh": "玩；玩耍",
        "emoji": "🎲"
      },
      {
        "en": "am",
        "ipa": "/æm/",
        "zh": "是（我是 I am）",
        "emoji": "✨"
      },
      {
        "en": "how",
        "ipa": "/haʊ/",
        "zh": "怎样；如何",
        "emoji": "❓"
      },
      {
        "en": "say",
        "ipa": "/seɪ/",
        "zh": "说",
        "emoji": "💬"
      }
    ],
    "texts": [
      {
        "id": "u1-start",
        "kind": "start",
        "title": "Let's start!",
        "subtitle": "见面问好",
        "tracks": [
          {
            "label": "人物问候",
            "src": "./audio/text/unit-1/start-1.mp3"
          },
          {
            "label": "问候歌",
            "src": "./audio/text/unit-1/start-2.mp3"
          }
        ],
        "english": [
          "Hello, I'm Taotao.",
          "Hello, I'm Toby.",
          "Hello, I'm Doudou.",
          "Hello, I'm Emma.",
          "Hello, hello, nice to meet you!",
          "Let's play, play, play!"
        ],
        "chinese": [
          "你好，我是淘淘。",
          "你好，我是托比。",
          "你好，我是豆豆。",
          "你好，我是艾玛。",
          "你好，你好，很高兴见到你！",
          "我们一起玩，玩，玩！"
        ],
        "lines": [
          {
            "en": "Hello, I'm Taotao.",
            "zh": "你好，我是淘淘。",
            "audio": 0
          },
          {
            "en": "Hello, I'm Toby.",
            "zh": "你好，我是托比。",
            "audio": 0
          },
          {
            "en": "Hello, I'm Doudou.",
            "zh": "你好，我是豆豆。",
            "audio": 0
          },
          {
            "en": "Hello, I'm Emma.",
            "zh": "你好，我是艾玛。",
            "audio": 0
          },
          {
            "en": "Hello, hello, nice to meet you!",
            "zh": "你好，你好，很高兴见到你！",
            "audio": 1
          },
          {
            "en": "Let's play, play, play!",
            "zh": "我们一起玩，玩，玩！",
            "audio": 1
          }
        ]
      },
      {
        "id": "u1-read",
        "kind": "read",
        "title": "Let's read!",
        "subtitle": "认识新朋友",
        "tracks": [
          {
            "label": "课文对话",
            "src": "./audio/text/unit-1/read-1.mp3"
          },
          {
            "label": "跟读练习",
            "src": "./audio/text/unit-1/read-2.mp3"
          }
        ],
        "english": [
          "Hello! I'm Emma.",
          "I'm Toby.",
          "I'm Doudou.",
          "I'm Taotao.",
          "Nice to meet you!",
          "Nice to meet you, too!",
          "Let's play!",
          "I'm Taotao. Nice to meet you.",
          "Hello! Let's play!"
        ],
        "chinese": [
          "你好！我是艾玛。",
          "我是托比。",
          "我是豆豆。",
          "我是淘淘。",
          "很高兴见到你！",
          "我也很高兴见到你！",
          "我们一起玩吧！",
          "我是淘淘。很高兴见到你。",
          "你好！我们一起玩吧！"
        ],
        "lines": [
          {
            "en": "Hello! I'm Emma.",
            "zh": "你好！我是艾玛。",
            "audio": 0
          },
          {
            "en": "I'm Toby.",
            "zh": "我是托比。",
            "audio": 0
          },
          {
            "en": "I'm Doudou.",
            "zh": "我是豆豆。",
            "audio": 0
          },
          {
            "en": "I'm Taotao.",
            "zh": "我是淘淘。",
            "audio": 0
          },
          {
            "en": "Nice to meet you!",
            "zh": "很高兴见到你！",
            "audio": 0
          },
          {
            "en": "Nice to meet you, too!",
            "zh": "我也很高兴见到你！",
            "audio": 0
          },
          {
            "en": "Let's play!",
            "zh": "我们一起玩吧！",
            "audio": 0
          },
          {
            "en": "I'm Taotao. Nice to meet you.",
            "zh": "我是淘淘。很高兴见到你。",
            "audio": 1
          },
          {
            "en": "Hello! Let's play!",
            "zh": "你好！我们一起玩吧！",
            "audio": 1
          }
        ]
      }
    ],
    "videos": [
      {
        "id": "u1v1",
        "title": "Let's start!",
        "subtitle": "第 1 页 · 见面问好",
        "src": "./video/unit-1/p1-start.mp4",
        "poster": "./video/unit-1/p1-start.jpg",
        "page": 1
      },
      {
        "id": "u1v2",
        "title": "Let's read!",
        "subtitle": "第 2 页 · 课文朗读",
        "src": "./video/unit-1/p2-read.mp4",
        "poster": "./video/unit-1/p2-read.jpg",
        "page": 2
      },
      {
        "id": "u1v3",
        "title": "Let's explore!",
        "subtitle": "第 6 页 · 拓展活动",
        "src": "./video/unit-1/p6-explore.mp4",
        "poster": "./video/unit-1/p6-explore.jpg",
        "page": 6
      }
    ]
  },
  {
    "id": 2,
    "code": "Unit 2",
    "title": "Numbers",
    "titleZh": "数字",
    "emoji": "🔢",
    "color": "#0EA5E9",
    "tint": "#E6F6FE",
    "wordsAudio": "./audio/words/unit-2.mp3",
    "words": [
      {
        "en": "one",
        "ipa": "/wʌn/",
        "zh": "一",
        "emoji": "1️⃣"
      },
      {
        "en": "two",
        "ipa": "/tuː/",
        "zh": "二",
        "emoji": "2️⃣"
      },
      {
        "en": "three",
        "ipa": "/θriː/",
        "zh": "三",
        "emoji": "3️⃣"
      },
      {
        "en": "four",
        "ipa": "/fɔː/",
        "zh": "四",
        "emoji": "4️⃣"
      },
      {
        "en": "five",
        "ipa": "/faɪv/",
        "zh": "五",
        "emoji": "5️⃣"
      },
      {
        "en": "six",
        "ipa": "/sɪks/",
        "zh": "六",
        "emoji": "6️⃣"
      },
      {
        "en": "seven",
        "ipa": "/ˈsevn/",
        "zh": "七",
        "emoji": "7️⃣"
      },
      {
        "en": "balloon",
        "ipa": "/bəˈluːn/",
        "zh": "气球",
        "emoji": "🎈"
      },
      {
        "en": "number",
        "ipa": "/ˈnʌmbə/",
        "zh": "数字",
        "emoji": "🔢"
      },
      {
        "en": "please",
        "ipa": "/pliːz/",
        "zh": "请",
        "emoji": "🙏"
      },
      {
        "en": "thank",
        "ipa": "/θæŋk/",
        "zh": "谢谢",
        "emoji": "💝"
      }
    ],
    "texts": [
      {
        "id": "u2-start",
        "kind": "start",
        "title": "Let's start!",
        "subtitle": "数字游戏",
        "tracks": [
          {
            "label": "数字跟读",
            "src": "./audio/text/unit-2/start-1.mp3"
          },
          {
            "label": "数字儿歌",
            "src": "./audio/text/unit-2/start-2.mp3"
          }
        ],
        "english": [
          "One, two, three, four, five, six, seven.",
          "Let's play! One, two, three!",
          "Three!",
          "Four, five, six!",
          "Seven!",
          "Hooray, hooray!"
        ],
        "chinese": [
          "一、二、三、四、五、六、七。",
          "我们一起玩吧！一、二、三！",
          "三！",
          "四、五、六！",
          "七！",
          "好耶，好耶！"
        ],
        "lines": [
          {
            "en": "One, two, three, four, five, six, seven.",
            "zh": "一、二、三、四、五、六、七。",
            "audio": 0
          },
          {
            "en": "Let's play! One, two, three!",
            "zh": "我们一起玩吧！一、二、三！",
            "audio": 1
          },
          {
            "en": "Three!",
            "zh": "三！",
            "audio": 1
          },
          {
            "en": "Four, five, six!",
            "zh": "四、五、六！",
            "audio": 1
          },
          {
            "en": "Seven!",
            "zh": "七！",
            "audio": 1
          },
          {
            "en": "Hooray, hooray!",
            "zh": "好耶，好耶！",
            "audio": 1
          }
        ]
      },
      {
        "id": "u2-read",
        "kind": "read",
        "title": "Let's read!",
        "subtitle": "数气球",
        "tracks": [
          {
            "label": "朗读",
            "src": "./audio/text/unit-2/read-1.mp3"
          }
        ],
        "english": [
          "Six balloons.",
          "Four balloons.",
          "Two balloons.",
          "Thank you!",
          "One balloon!"
        ],
        "chinese": [
          "六个气球。",
          "四个气球。",
          "两个气球。",
          "谢谢！",
          "一个气球！"
        ],
        "lines": [
          {
            "en": "Six balloons.",
            "zh": "六个气球。",
            "audio": 0
          },
          {
            "en": "Four balloons.",
            "zh": "四个气球。",
            "audio": 0
          },
          {
            "en": "Two balloons.",
            "zh": "两个气球。",
            "audio": 0
          },
          {
            "en": "Thank you!",
            "zh": "谢谢！",
            "audio": 0
          },
          {
            "en": "One balloon!",
            "zh": "一个气球！",
            "audio": 0
          }
        ]
      }
    ],
    "videos": [
      {
        "id": "u2v1",
        "title": "Let's start!",
        "subtitle": "第 7 页 · 认识数字",
        "src": "./video/unit-2/p7-start.mp4",
        "poster": "./video/unit-2/p7-start.jpg",
        "page": 7
      },
      {
        "id": "u2v2",
        "title": "Let's read!",
        "subtitle": "第 8 页 · 课文朗读",
        "src": "./video/unit-2/p8-read.mp4",
        "poster": "./video/unit-2/p8-read.jpg",
        "page": 8
      },
      {
        "id": "u2v3",
        "title": "Let's explore!",
        "subtitle": "第 12 页 · 拓展活动",
        "src": "./video/unit-2/p12-explore.mp4",
        "poster": "./video/unit-2/p12-explore.jpg",
        "page": 12
      }
    ]
  },
  {
    "id": 3,
    "code": "Unit 3",
    "title": "Family",
    "titleZh": "家人",
    "emoji": "👨‍👩‍👧‍👦",
    "color": "#F43F5E",
    "tint": "#FFEBF0",
    "wordsAudio": "./audio/words/unit-3.mp3",
    "words": [
      {
        "en": "my",
        "ipa": "/maɪ/",
        "zh": "我的",
        "emoji": "🏷️"
      },
      {
        "en": "family",
        "ipa": "/ˈfæməli/",
        "zh": "家庭",
        "emoji": "🏠"
      },
      {
        "en": "mum",
        "ipa": "/mʌm/",
        "zh": "妈妈",
        "emoji": "👩"
      },
      {
        "en": "dad",
        "ipa": "/dæd/",
        "zh": "爸爸",
        "emoji": "👨"
      },
      {
        "en": "grandpa",
        "ipa": "/ˈɡrænpɑː/",
        "zh": "爷爷；外公",
        "emoji": "👴"
      },
      {
        "en": "grandma",
        "ipa": "/ˈɡrænmɑː/",
        "zh": "奶奶；外婆",
        "emoji": "👵"
      },
      {
        "en": "sister",
        "ipa": "/ˈsɪstə/",
        "zh": "姐妹",
        "emoji": "👧"
      },
      {
        "en": "brother",
        "ipa": "/ˈbrʌðə/",
        "zh": "兄弟",
        "emoji": "👦"
      },
      {
        "en": "love",
        "ipa": "/lʌv/",
        "zh": "爱",
        "emoji": "❤️"
      },
      {
        "en": "this",
        "ipa": "/ðɪs/",
        "zh": "这；这个",
        "emoji": "☝️"
      }
    ],
    "texts": [
      {
        "id": "u3-start",
        "kind": "start",
        "title": "Let's start!",
        "subtitle": "介绍我的家人",
        "tracks": [
          {
            "label": "家人称呼",
            "src": "./audio/text/unit-3/start-1.mp3"
          },
          {
            "label": "家人歌",
            "src": "./audio/text/unit-3/start-2.mp3"
          }
        ],
        "english": [
          "Dad, mum, sister, brother, grandpa, grandma.",
          "Meet my family. My mum, my dad.",
          "My grandpa, my grandma.",
          "My sister and brother."
        ],
        "chinese": [
          "爸爸、妈妈、姐姐、弟弟、爷爷、奶奶。",
          "见见我的家人。我的妈妈，我的爸爸。",
          "我的爷爷，我的奶奶。",
          "我的姐姐和弟弟。"
        ],
        "lines": [
          {
            "en": "Dad, mum, sister, brother, grandpa, grandma.",
            "zh": "爸爸、妈妈、姐姐、弟弟、爷爷、奶奶。",
            "audio": 0
          },
          {
            "en": "Meet my family. My mum, my dad.",
            "zh": "见见我的家人。我的妈妈，我的爸爸。",
            "audio": 1
          },
          {
            "en": "My grandpa, my grandma.",
            "zh": "我的爷爷，我的奶奶。",
            "audio": 1
          },
          {
            "en": "My sister and brother.",
            "zh": "我的姐姐和弟弟。",
            "audio": 1
          }
        ]
      },
      {
        "id": "u3-read",
        "kind": "read",
        "title": "Let's read!",
        "subtitle": "我爱我的家",
        "tracks": [
          {
            "label": "家人朗读",
            "src": "./audio/text/unit-3/read-1.mp3"
          },
          {
            "label": "介绍家人",
            "src": "./audio/text/unit-3/read-2.mp3"
          }
        ],
        "english": [
          "This is my mum. I love my mum.",
          "This is my dad. I love my dad.",
          "This is my grandma. I love my grandma.",
          "This is my brother.",
          "I love my brother.",
          "I love my family.",
          "This is my grandpa.",
          "This is my sister."
        ],
        "chinese": [
          "这是我的妈妈。我爱我的妈妈。",
          "这是我的爸爸。我爱我的爸爸。",
          "这是我的奶奶。我爱我的奶奶。",
          "这是我的弟弟。",
          "我爱我的弟弟。",
          "我爱我的家。",
          "这是我的爷爷。",
          "这是我的姐姐。"
        ],
        "lines": [
          {
            "en": "This is my mum. I love my mum.",
            "zh": "这是我的妈妈。我爱我的妈妈。",
            "audio": 0
          },
          {
            "en": "This is my dad. I love my dad.",
            "zh": "这是我的爸爸。我爱我的爸爸。",
            "audio": 0
          },
          {
            "en": "This is my grandma. I love my grandma.",
            "zh": "这是我的奶奶。我爱我的奶奶。",
            "audio": 0
          },
          {
            "en": "This is my brother.",
            "zh": "这是我的弟弟。",
            "audio": 0
          },
          {
            "en": "I love my brother.",
            "zh": "我爱我的弟弟。",
            "audio": 0
          },
          {
            "en": "I love my family.",
            "zh": "我爱我的家。",
            "audio": 0
          },
          {
            "en": "This is my grandpa.",
            "zh": "这是我的爷爷。",
            "audio": 1
          },
          {
            "en": "This is my sister.",
            "zh": "这是我的姐姐。",
            "audio": 1
          }
        ]
      }
    ],
    "videos": [
      {
        "id": "u3v1",
        "title": "Let's start!",
        "subtitle": "第 13 页 · 家人称呼",
        "src": "./video/unit-3/p13-start.mp4",
        "poster": "./video/unit-3/p13-start.jpg",
        "page": 13
      },
      {
        "id": "u3v2",
        "title": "Let's read!",
        "subtitle": "第 14 页 · 课文朗读",
        "src": "./video/unit-3/p14-read.mp4",
        "poster": "./video/unit-3/p14-read.jpg",
        "page": 14
      },
      {
        "id": "u3v3",
        "title": "Let's explore!",
        "subtitle": "第 18 页 · 拓展活动",
        "src": "./video/unit-3/p18-explore.mp4",
        "poster": "./video/unit-3/p18-explore.jpg",
        "page": 18
      }
    ]
  },
  {
    "id": 4,
    "code": "Unit 4",
    "title": "My classroom",
    "titleZh": "我的教室",
    "emoji": "🏫",
    "color": "#10B981",
    "tint": "#E4FAF2",
    "wordsAudio": "./audio/words/unit-4.mp3",
    "words": [
      {
        "en": "classroom",
        "ipa": "/ˈklɑːsruːm/",
        "zh": "教室",
        "emoji": "🏫"
      },
      {
        "en": "door",
        "ipa": "/dɔː/",
        "zh": "门",
        "emoji": "🚪"
      },
      {
        "en": "blackboard",
        "ipa": "/ˈblækbɔːd/",
        "zh": "黑板",
        "emoji": "🖤"
      },
      {
        "en": "window",
        "ipa": "/ˈwɪndəʊ/",
        "zh": "窗户",
        "emoji": "🪟"
      },
      {
        "en": "desk",
        "ipa": "/desk/",
        "zh": "书桌",
        "emoji": "🪑"
      },
      {
        "en": "chair",
        "ipa": "/tʃeə/",
        "zh": "椅子",
        "emoji": "💺"
      },
      {
        "en": "teacher",
        "ipa": "/ˈtiːtʃə/",
        "zh": "老师",
        "emoji": "🧑‍🏫"
      },
      {
        "en": "open",
        "ipa": "/ˈəʊpən/",
        "zh": "打开",
        "emoji": "🔓"
      },
      {
        "en": "what",
        "ipa": "/wɒt/",
        "zh": "什么",
        "emoji": "❓"
      },
      {
        "en": "big",
        "ipa": "/bɪɡ/",
        "zh": "大的",
        "emoji": "🐘"
      }
    ],
    "texts": [
      {
        "id": "u4-start",
        "kind": "start",
        "title": "Let's start!",
        "subtitle": "我的教室",
        "tracks": [
          {
            "label": "教室词汇",
            "src": "./audio/text/unit-4/start-1.mp3"
          },
          {
            "label": "教室对话",
            "src": "./audio/text/unit-4/start-2.mp3"
          }
        ],
        "english": [
          "Door, classroom, window, desk, chair.",
          "What's this? Open, open the door.",
          "This is my classroom.",
          "This is the blackboard.",
          "This is the window.",
          "This is my desk.",
          "And this is my chair.",
          "Let's say it again!"
        ],
        "chinese": [
          "门、教室、窗户、书桌、椅子。",
          "这是什么？打开，打开门。",
          "这是我的教室。",
          "这是黑板。",
          "这是窗户。",
          "这是我的书桌。",
          "这是我的椅子。",
          "我们再说一遍！"
        ],
        "lines": [
          {
            "en": "Door, classroom, window, desk, chair.",
            "zh": "门、教室、窗户、书桌、椅子。",
            "audio": 0
          },
          {
            "en": "What's this? Open, open the door.",
            "zh": "这是什么？打开，打开门。",
            "audio": 1
          },
          {
            "en": "This is my classroom.",
            "zh": "这是我的教室。",
            "audio": 1
          },
          {
            "en": "This is the blackboard.",
            "zh": "这是黑板。",
            "audio": 1
          },
          {
            "en": "This is the window.",
            "zh": "这是窗户。",
            "audio": 1
          },
          {
            "en": "This is my desk.",
            "zh": "这是我的书桌。",
            "audio": 1
          },
          {
            "en": "And this is my chair.",
            "zh": "这是我的椅子。",
            "audio": 1
          },
          {
            "en": "Let's say it again!",
            "zh": "我们再说一遍！",
            "audio": 1
          }
        ]
      },
      {
        "id": "u4-read",
        "kind": "read",
        "title": "Let's read!",
        "subtitle": "参观我的教室",
        "tracks": [
          {
            "label": "课文对话",
            "src": "./audio/text/unit-4/read-1.mp3"
          },
          {
            "label": "问答练习",
            "src": "./audio/text/unit-4/read-2.mp3"
          }
        ],
        "english": [
          "Dad! May! This is my classroom!",
          "Wow! It's big!",
          "This is the blackboard!",
          "This is my desk!",
          "This is my chair!",
          "May!",
          "Oh! That is my teacher!",
          "This is my dad, and this is my sister, May.",
          "Good job, May.",
          "Thank you.",
          "That is my teacher.",
          "This is the blackboard. This is my desk."
        ],
        "chinese": [
          "爸爸！梅！这是我的教室！",
          "哇！它真大！",
          "这是黑板！",
          "这是我的书桌！",
          "这是我的椅子！",
          "梅！",
          "哦！那是我的老师！",
          "这是我的爸爸，这是我的姐姐梅。",
          "做得好，梅。",
          "谢谢你。",
          "那是我的老师。",
          "这是黑板。这是我的书桌。"
        ],
        "lines": [
          {
            "en": "Dad! May! This is my classroom!",
            "zh": "爸爸！梅！这是我的教室！",
            "audio": 0
          },
          {
            "en": "Wow! It's big!",
            "zh": "哇！它真大！",
            "audio": 0
          },
          {
            "en": "This is the blackboard!",
            "zh": "这是黑板！",
            "audio": 0
          },
          {
            "en": "This is my desk!",
            "zh": "这是我的书桌！",
            "audio": 0
          },
          {
            "en": "This is my chair!",
            "zh": "这是我的椅子！",
            "audio": 0
          },
          {
            "en": "May!",
            "zh": "梅！",
            "audio": 0
          },
          {
            "en": "Oh! That is my teacher!",
            "zh": "哦！那是我的老师！",
            "audio": 0
          },
          {
            "en": "This is my dad, and this is my sister, May.",
            "zh": "这是我的爸爸，这是我的姐姐梅。",
            "audio": 0
          },
          {
            "en": "Good job, May.",
            "zh": "做得好，梅。",
            "audio": 0
          },
          {
            "en": "Thank you.",
            "zh": "谢谢你。",
            "audio": 0
          },
          {
            "en": "That is my teacher.",
            "zh": "那是我的老师。",
            "audio": 1
          },
          {
            "en": "This is the blackboard. This is my desk.",
            "zh": "这是黑板。这是我的书桌。",
            "audio": 1
          }
        ]
      },
      {
        "id": "u4-explore",
        "kind": "explore",
        "title": "Let's explore!",
        "subtitle": "古老的学堂",
        "tracks": [
          {
            "label": "拓展活动",
            "src": "./audio/text/unit-4/explore.mp3"
          }
        ],
        "english": [
          "Yingjian Academy, Xiangqiu.",
          "This is a very old school.",
          "This is a classroom.",
          "It's big!",
          "Songyang Academy, Dongfeng.",
          "Look! That is an old school too!",
          "This is a classroom!",
          "Look! This is a desk!"
        ],
        "chinese": [
          "嵩阳书院，登封。",
          "这是一所很古老的学校。",
          "这是一间教室。",
          "它很大！",
          "嵩阳书院，登封。",
          "看！那也是一所古老的学校！",
          "这是一间教室！",
          "看！这是一张书桌！"
        ],
        "lines": [
          {
            "en": "Yingjian Academy, Xiangqiu.",
            "zh": "嵩阳书院，登封。",
            "audio": 0
          },
          {
            "en": "This is a very old school.",
            "zh": "这是一所很古老的学校。",
            "audio": 0
          },
          {
            "en": "This is a classroom.",
            "zh": "这是一间教室。",
            "audio": 0
          },
          {
            "en": "It's big!",
            "zh": "它很大！",
            "audio": 0
          },
          {
            "en": "Songyang Academy, Dongfeng.",
            "zh": "嵩阳书院，登封。",
            "audio": 0
          },
          {
            "en": "Look! That is an old school too!",
            "zh": "看！那也是一所古老的学校！",
            "audio": 0
          },
          {
            "en": "This is a classroom!",
            "zh": "这是一间教室！",
            "audio": 0
          },
          {
            "en": "Look! This is a desk!",
            "zh": "看！这是一张书桌！",
            "audio": 0
          }
        ]
      }
    ],
    "videos": [
      {
        "id": "u4v1",
        "title": "Let's start!",
        "subtitle": "第 19 页 · 教室里的物品",
        "src": "./video/unit-4/p19-start.mp4",
        "poster": "./video/unit-4/p19-start.jpg",
        "page": 19
      },
      {
        "id": "u4v2",
        "title": "Let's read!",
        "subtitle": "第 20 页 · 课文朗读",
        "src": "./video/unit-4/p20-read.mp4",
        "poster": "./video/unit-4/p20-read.jpg",
        "page": 20
      }
    ]
  },
  {
    "id": 5,
    "code": "Unit 5",
    "title": "School things",
    "titleZh": "学习用品",
    "emoji": "🎒",
    "color": "#F59E0B",
    "tint": "#FFF4E0",
    "wordsAudio": "./audio/words/unit-5.mp3",
    "words": [
      {
        "en": "schoolbag",
        "ipa": "/ˈskuːlbæɡ/",
        "zh": "书包",
        "emoji": "🎒"
      },
      {
        "en": "pencil case",
        "ipa": "/ˈpensl keɪs/",
        "zh": "铅笔盒",
        "emoji": "🧰"
      },
      {
        "en": "pencil",
        "ipa": "/ˈpensl/",
        "zh": "铅笔",
        "emoji": "✏️"
      },
      {
        "en": "book",
        "ipa": "/bʊk/",
        "zh": "书",
        "emoji": "📖"
      },
      {
        "en": "read",
        "ipa": "/riːd/",
        "zh": "读；阅读",
        "emoji": "📚"
      },
      {
        "en": "together",
        "ipa": "/təˈɡeðə/",
        "zh": "一起",
        "emoji": "👫"
      },
      {
        "en": "here you are",
        "ipa": "/hɪə juː ɑː/",
        "zh": "给你",
        "emoji": "🤲"
      },
      {
        "en": "goodbye",
        "ipa": "/ˌɡʊdˈbaɪ/",
        "zh": "再见",
        "emoji": "👋"
      }
    ],
    "texts": [
      {
        "id": "u5-start",
        "kind": "start",
        "title": "Let's start!",
        "subtitle": "文具词汇与对话",
        "tracks": [
          {
            "label": "单词跟读",
            "src": "./audio/text/unit-5/start-1.mp3"
          },
          {
            "label": "句型跟读",
            "src": "./audio/text/unit-5/start-2.mp3"
          }
        ],
        "english": [
          "Pencil, pencil case, book, school bag.",
          "Open my schoolbag!",
          "My pencil case.",
          "My pencil.",
          "And my books!"
        ],
        "chinese": [
          "铅笔，铅笔盒，书，书包。",
          "打开我的书包！",
          "我的铅笔盒。",
          "我的铅笔。",
          "还有我的书！"
        ],
        "lines": [
          {
            "en": "Pencil, pencil case, book, school bag.",
            "zh": "铅笔，铅笔盒，书，书包。",
            "audio": 0
          },
          {
            "en": "Open my schoolbag!",
            "zh": "打开我的书包！",
            "audio": 1
          },
          {
            "en": "My pencil case.",
            "zh": "我的铅笔盒。",
            "audio": 1
          },
          {
            "en": "My pencil.",
            "zh": "我的铅笔。",
            "audio": 1
          },
          {
            "en": "And my books!",
            "zh": "还有我的书！",
            "audio": 1
          }
        ]
      },
      {
        "id": "u5-read",
        "kind": "read",
        "title": "Let's read!",
        "subtitle": "一起读吧",
        "tracks": [
          {
            "label": "朗读",
            "src": "./audio/text/unit-5/read-1.mp3"
          }
        ],
        "english": [
          "Bye, Dad!",
          "Oh, that's Toby's book and pencil case.",
          "Oh no! This is my pencil.",
          "Here you are. Thank you.",
          "This is my book.",
          "Let's read together.",
          "Thank you."
        ],
        "chinese": [
          "再见，爸爸！",
          "哦，那是托比的书和铅笔盒。",
          "哦不！这是我的铅笔。",
          "给你。谢谢。",
          "这是我的书。",
          "我们一起读吧。",
          "谢谢你。"
        ],
        "lines": [
          {
            "en": "Bye, Dad!",
            "zh": "再见，爸爸！",
            "audio": 0
          },
          {
            "en": "Oh, that's Toby's book and pencil case.",
            "zh": "哦，那是托比的书和铅笔盒。",
            "audio": 0
          },
          {
            "en": "Oh no! This is my pencil.",
            "zh": "哦不！这是我的铅笔。",
            "audio": 0
          },
          {
            "en": "Here you are. Thank you.",
            "zh": "给你。谢谢。",
            "audio": 0
          },
          {
            "en": "This is my book.",
            "zh": "这是我的书。",
            "audio": 0
          },
          {
            "en": "Let's read together.",
            "zh": "我们一起读吧。",
            "audio": 0
          },
          {
            "en": "Thank you.",
            "zh": "谢谢你。",
            "audio": 0
          }
        ]
      }
    ],
    "videos": [
      {
        "id": "u5v1",
        "title": "Let's start!",
        "subtitle": "第 25 页 · 文具词汇",
        "src": "./video/unit-5/p25-start.mp4",
        "poster": "./video/unit-5/p25-start.jpg",
        "page": 25
      },
      {
        "id": "u5v2",
        "title": "Let's read!",
        "subtitle": "第 26 页 · 课文朗读",
        "src": "./video/unit-5/p26-read.mp4",
        "poster": "./video/unit-5/p26-read.jpg",
        "page": 26
      },
      {
        "id": "u5v3",
        "title": "Let's explore!",
        "subtitle": "第 30 页 · 拓展活动",
        "src": "./video/unit-5/p30-explore.mp4",
        "poster": "./video/unit-5/p30-explore.jpg",
        "page": 30
      }
    ]
  },
  {
    "id": 6,
    "code": "Unit 6",
    "title": "Colours",
    "titleZh": "颜色",
    "emoji": "🎨",
    "color": "#A855F7",
    "tint": "#F6EBFF",
    "wordsAudio": "./audio/words/unit-6.mp3",
    "words": [
      {
        "en": "red",
        "ipa": "/red/",
        "zh": "红色",
        "emoji": "🟥"
      },
      {
        "en": "green",
        "ipa": "/ɡriːn/",
        "zh": "绿色",
        "emoji": "🟩"
      },
      {
        "en": "blue",
        "ipa": "/bluː/",
        "zh": "蓝色",
        "emoji": "🟦"
      },
      {
        "en": "black",
        "ipa": "/blæk/",
        "zh": "黑色",
        "emoji": "⬛"
      },
      {
        "en": "white",
        "ipa": "/waɪt/",
        "zh": "白色",
        "emoji": "⬜"
      },
      {
        "en": "yellow",
        "ipa": "/ˈjeləʊ/",
        "zh": "黄色",
        "emoji": "🟨"
      },
      {
        "en": "colour",
        "ipa": "/ˈkʌlə/",
        "zh": "颜色",
        "emoji": "🎨"
      },
      {
        "en": "so many",
        "ipa": "/səʊ ˈmeni/",
        "zh": "这么多",
        "emoji": "✨"
      },
      {
        "en": "Chinese New Year",
        "ipa": "/ˌtʃaɪˈniːz njuː jɪə/",
        "zh": "中国新年；春节",
        "emoji": "🧨"
      },
      {
        "en": "happy",
        "ipa": "/ˈhæpi/",
        "zh": "快乐的",
        "emoji": "😄"
      }
    ],
    "texts": [
      {
        "id": "u6-start",
        "kind": "start",
        "title": "Let's start!",
        "subtitle": "认识颜色",
        "tracks": [
          {
            "label": "颜色单词",
            "src": "./audio/text/unit-6/start-1.mp3"
          },
          {
            "label": "颜色歌",
            "src": "./audio/text/unit-6/start-2.mp3"
          }
        ],
        "english": [
          "Black, red, green, blue, white, yellow.",
          "What colour? Red, green and blue.",
          "Black, white and yellow.",
          "Colours, colours, so many colours!"
        ],
        "chinese": [
          "黑色、红色、绿色、蓝色、白色、黄色。",
          "什么颜色？红色、绿色和蓝色。",
          "黑色、白色和黄色。",
          "颜色，颜色，这么多颜色！"
        ],
        "lines": [
          {
            "en": "Black, red, green, blue, white, yellow.",
            "zh": "黑色、红色、绿色、蓝色、白色、黄色。",
            "audio": 0
          },
          {
            "en": "What colour? Red, green and blue.",
            "zh": "什么颜色？红色、绿色和蓝色。",
            "audio": 1
          },
          {
            "en": "Black, white and yellow.",
            "zh": "黑色、白色和黄色。",
            "audio": 1
          },
          {
            "en": "Colours, colours, so many colours!",
            "zh": "颜色，颜色，这么多颜色！",
            "audio": 1
          }
        ]
      },
      {
        "id": "u6-read",
        "kind": "read",
        "title": "Let's read!",
        "subtitle": "色彩与新年",
        "tracks": [
          {
            "label": "课文朗读",
            "src": "./audio/text/unit-6/read-1.mp3"
          },
          {
            "label": "朗读练习",
            "src": "./audio/text/unit-6/read-2.mp3"
          }
        ],
        "english": [
          "It's red.",
          "It's green, red and yellow.",
          "Blue, green, red and yellow.",
          "Four colours.",
          "One, two, three.",
          "Happy Chinese New Year!"
        ],
        "chinese": [
          "它是红色的。",
          "它是绿色、红色和黄色。",
          "蓝色、绿色、红色和黄色。",
          "四种颜色。",
          "一、二、三。",
          "中国新年快乐！"
        ],
        "lines": [
          {
            "en": "It's red.",
            "zh": "它是红色的。",
            "audio": 0
          },
          {
            "en": "It's green, red and yellow.",
            "zh": "它是绿色、红色和黄色。",
            "audio": 0
          },
          {
            "en": "Blue, green, red and yellow.",
            "zh": "蓝色、绿色、红色和黄色。",
            "audio": 0
          },
          {
            "en": "Four colours.",
            "zh": "四种颜色。",
            "audio": 0
          },
          {
            "en": "One, two, three.",
            "zh": "一、二、三。",
            "audio": 0
          },
          {
            "en": "Happy Chinese New Year!",
            "zh": "中国新年快乐！",
            "audio": 0
          }
        ]
      }
    ],
    "videos": [
      {
        "id": "u6v1",
        "title": "Let's start!",
        "subtitle": "第 31 页 · 认识颜色",
        "src": "./video/unit-6/p31-start.mp4",
        "poster": "./video/unit-6/p31-start.jpg",
        "page": 31
      },
      {
        "id": "u6v2",
        "title": "Let's read!",
        "subtitle": "第 32 页 · 课文朗读",
        "src": "./video/unit-6/p32-read.mp4",
        "poster": "./video/unit-6/p32-read.jpg",
        "page": 32
      },
      {
        "id": "u6v3",
        "title": "Let's explore!",
        "subtitle": "第 36 页 · 拓展活动",
        "src": "./video/unit-6/p36-explore.mp4",
        "poster": "./video/unit-6/p36-explore.jpg",
        "page": 36
      }
    ]
  }
]

export const EXTRA_TRACKS: Track[] = [
  {
    "label": "This is Beijing!（附加课文）",
    "src": "./audio/text/this-is-beijing.mp3"
  },
  {
    "label": "Reading for pleasure ① The bear picks apples",
    "src": "./audio/text/reading-1.mp3"
  },
  {
    "label": "Reading for pleasure ② The Monkeys and the Moon",
    "src": "./audio/text/reading-2.mp3"
  },
  {
    "label": "Appendix 1 · 单元句型",
    "src": "./audio/text/appendix-1.mp3"
  },
  {
    "label": "Appendix 2 · 数字 1~6",
    "src": "./audio/text/appendix-2.mp3"
  },
  {
    "label": "Appendix 3 · 数字与家人",
    "src": "./audio/text/appendix-3.mp3"
  },
  {
    "label": "Appendix 4 · 数字与教室",
    "src": "./audio/text/appendix-4.mp3"
  },
  {
    "label": "Appendix 5 · 数字与文具",
    "src": "./audio/text/appendix-5.mp3"
  },
  {
    "label": "Appendix 6 · 数字与颜色",
    "src": "./audio/text/appendix-6.mp3"
  }
]

export const getUnit = (id: number) => UNITS.find(u => u.id === id)
export const ALL_WORDS = UNITS.flatMap(u => u.words.map(w => ({ ...w, unitId: u.id, unitColor: u.color, unitTitle: u.code })))
