export type Intent =
  | 'points_check'
  | 'show_membership'
  | 'cheaper_products'
  | 'show_offers'
  | 'capabilities'
  | 'price_check'
  | 'find_product';

interface Def {
  intent: Intent;
  patterns: RegExp[];
  keywords: string[];
}

const defs: Def[] = [
  {
    intent: 'points_check',
    patterns: [
      /\bpoints?\b/, /prism points?/, /how many points/, /points? do i have/,
      /my points?/, /point balance/, /points? (count|total|earned)/,
      /check.*points?/, /how much.*points?/, /points? right now/,
    ],
    keywords: ['points', 'prism point', 'point balance', 'how many points', 'earned', 'point count', 'point total', 'my points'],
  },
  {
    intent: 'show_membership',
    patterns: [
      /membership/, /my (member )?card/, /my profile/, /my tier/,
      /member (card|profile|status|tier|level)/, /what.*tier/, /what.*member level/,
      /my account/, /show.*card/, /view.*profile/, /my membership/, /member rank/,
    ],
    keywords: ['membership', 'member card', 'profile', 'tier', 'my card', 'my account', 'member status', 'member level', 'member rank'],
  },
  {
    intent: 'cheaper_products',
    patterns: [
      /cheaper/, /on sale/, /less expensive/, /lower price/, /price (drop|decrease|cut)/,
      /reduced/, /marked down/, /discounted/, /which.*cheaper/, /what.*cheaper/,
      /price (went|gone|fallen) (down|lower)/, /deals? today/,
    ],
    keywords: ['cheaper', 'on sale', 'less expensive', 'lower price', 'price drop', 'price decrease', 'reduced', 'marked down', 'discounted', 'price cut', 'fallen', 'gone down'],
  },
  {
    intent: 'show_offers',
    patterns: [
      /\boffers?\b/, /\bdeals?\b/, /today's/, /specials?/, /promotions?/,
      /what.*offer/, /any.*deal/, /any.*offer/, /show.*offer/, /show.*deal/,
      /what.*on (offer|sale|special)/, /current offers?/, /available offers?/,
    ],
    keywords: ['offer', 'deals', 'today', 'special', 'promotion', 'discount', 'savings', 'deal', 'current offers', 'available offers'],
  },
  {
    intent: 'capabilities',
    patterns: [
      /what can you do/, /what do you do/, /your capabilities/, /\bhelp\b/,
      /features/, /what are you/, /what is prism/, /who are you/,
      /tell me about yourself/, /what.*capab/, /what.*help/, /how do you work/,
    ],
    keywords: ['what can you do', 'help', 'features', 'what are you', 'capabilities', 'who are you', 'what is prism', 'how do you work', 'tell me about yourself'],
  },
  {
    intent: 'price_check',
    patterns: [
      /price of/, /cost of/, /how much is/, /how much (does|for|are|do)/,
      /what.*price/, /what.*cost/, /what's the price/, /what is the price/,
      /price for/, /rate of/, /how much does.*cost/, /how much.*worth/,
    ],
    keywords: ['price of', 'cost of', 'how much is', 'how much does', 'how much for', "what's the price", 'what is the price', 'price for', 'how much are', 'how much do', 'how much worth'],
  },
  {
    intent: 'find_product',
    patterns: [
      /find.*product/, /show.*product/, /browse/, /search.*product/,
      /list.*product/, /show me/, /find me/, /get me/, /display.*product/,
      /view.*product/, /look for/, /find a product/, /show products/,
      /browse.*catalogue/, /browse.*catalog/, /what.*available/, /what.*in stock/,
    ],
    keywords: ['find', 'show me', 'browse', 'search', 'list products', 'show products', 'find products', 'display products', 'look for', 'find me', 'get me', 'what available', 'in stock'],
  },
];

export function classifyIntent(input: string): Intent | null {
  const q = input.toLowerCase().trim();
  for (const def of defs) {
    if (def.patterns.some((p) => p.test(q))) return def.intent;
  }
  let best: Intent | null = null;
  let bestScore = 0;
  for (const def of defs) {
    let score = 0;
    for (const kw of def.keywords) {
      if (q.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = def.intent;
    }
  }
  return bestScore > 0 ? best : null;
}
