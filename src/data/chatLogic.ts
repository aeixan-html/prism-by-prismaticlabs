import type { ChatResponse, Product } from './types';
import { products, getProductById, getDiscountPercent, getMemberSavings } from './products';
import { demoMembership } from './membership';

function findProductsByQuery(query: string): Product[] {
  const q = query.toLowerCase().trim();
  return products.filter((p) => {
    const name = p.name.toLowerCase();
    const cat = p.category.toLowerCase();
    return (
      name.includes(q) ||
      cat.includes(q) ||
      q.includes(name) ||
      q.includes(cat) ||
      (q.includes('biscuit') && cat === 'biscuits') ||
      (q.includes('chip') && cat === 'chips') ||
      (q.includes('chocolate') && cat === 'chocolate') ||
      (q.includes('juice') && cat === 'juice') ||
      (q.includes('drink') && cat === 'soft drinks') ||
      (q.includes('soda') && cat === 'soft drinks') ||
      (q.includes('water') && cat === 'water') ||
      (q.includes('bread') && cat === 'bread') ||
      (q.includes('milk') && cat === 'milk') ||
      (q.includes('cereal') && cat === 'cereal') ||
      (q.includes('noodle') && cat === 'instant noodles') ||
      (q.includes('cookie') && cat === 'cookies') ||
      (q.includes('ice') && cat === 'ice cream') ||
      (q.includes('pen') && (cat === 'pens' || cat === 'school supplies')) ||
      (q.includes('notebook') && cat === 'notebooks') ||
      (q.includes('usb') && cat === 'usb drives') ||
      (q.includes('earphone') && cat === 'earphones') ||
      (q.includes('phone') && cat === 'phone accessories')
    );
  });
}

function findCheaperProducts(): Product[] {
  return products.filter((p) => p.currentPrice < p.previousPrice);
}

function findSaleProducts(): Product[] {
  return products.filter((p) => p.onSale);
}

function findProductsUnder(maxPrice: number): Product[] {
  return products.filter((p) => p.currentPrice <= maxPrice);
}

function findCheapestNotebook(): Product | undefined {
  const notebooks = products.filter((p) => p.category === 'Notebooks');
  return notebooks.sort((a, b) => a.currentPrice - b.currentPrice)[0];
}

export function processQuery(input: string): ChatResponse {
  const q = input.toLowerCase().trim();

  // Membership
  if (/(show|view|my).*(membership|card|profile)/.test(q) || q === 'membership' || q === 'show my membership') {
    return {
      text: "You're a **PURPLE member** with **2,450 PRISM Points**.\n\nYou've saved **₹2,450**, which means you've earned **2,450 PRISM Points** in this demo.\n\nYou currently have a **15% member discount** and access to selected member offers.",
      attachments: [{ type: 'membership-card' }],
    };
  }

  // Points
  if (/how many points|points do i have|my points|prism points/.test(q)) {
    return {
      text: `You have **${demoMembership.points.toLocaleString()} PRISM Points**.\n\nThat's based on **₹${demoMembership.saved.toLocaleString()} saved** in this demo.`,
      attachments: [{ type: 'points', saved: demoMembership.saved, points: demoMembership.points }],
    };
  }

  // Discounts
  if (/what discounts|my discounts|discounts do i/.test(q)) {
    return {
      text: 'As a PURPLE member, you currently have:\n\n**15% member discount**\n\nPlus a **20% demo offer** on selected products.',
      attachments: [{ type: 'offers' }],
    };
  }

  // Saved
  if (/how much.*saved|how much.*save/.test(q)) {
    return {
      text: `You've saved **₹${demoMembership.saved.toLocaleString()}** so far.\n\nThat's also **${demoMembership.points.toLocaleString()} PRISM Points** in the demo.`,
      attachments: [{ type: 'points', saved: demoMembership.saved, points: demoMembership.points }],
    };
  }

  // Offers
  if (/(show|today's|what).*(offer|offers|deal|deals)/.test(q) || q === "show today's offers" || q === 'offers') {
    return {
      text: "Here are today's demo offers available to you as a PURPLE member.",
      attachments: [{ type: 'offers' }],
    };
  }

  // Price change check
  if (/(did|has).*(price|change|changed|increase|decrease)/.test(q)) {
    const matched = findProductsByQuery(q);
    if (matched.length > 0) {
      const p = matched[0];
      const trend = p.currentPrice < p.previousPrice ? 'decrease' : p.currentPrice > p.previousPrice ? 'increase' : 'no change';
      if (trend === 'decrease') {
        const diff = p.previousPrice - p.currentPrice;
        const pct = Math.round((diff / p.previousPrice) * 100);
        return {
          text: `Yes.\n\nThe demo price changed from **₹${p.previousPrice} to ₹${p.currentPrice}**.\n\nThat's a decrease of **₹${diff}**, or **${pct}%**.`,
          attachments: [{ type: 'product-card', productId: p.id }],
        };
      } else if (trend === 'increase') {
        const diff = p.currentPrice - p.previousPrice;
        const pct = Math.round((diff / p.previousPrice) * 100);
        return {
          text: `Yes.\n\nThe demo price changed from **₹${p.previousPrice} to ₹${p.currentPrice}**.\n\nThat's an increase of **₹${diff}**, or **${pct}%**.`,
          attachments: [{ type: 'product-card', productId: p.id }],
        };
      }
      return {
        text: `The demo price for **${p.name}** has stayed at **₹${p.currentPrice}** — no change from the previous price.`,
        attachments: [{ type: 'product-card', productId: p.id }],
      };
    }
  }

  // Cheaper today
  if (/(what's|what|which).*(cheaper|on sale|less expensive|lower price)/.test(q) || q.includes('cheaper')) {
    const cheaper = findCheaperProducts().slice(0, 5);
    return {
      text: `Here are some products with demo price decreases today.`,
      attachments: [{ type: 'cheaper-list', productIds: cheaper.map((p) => p.id) }],
    };
  }

  // Products on sale
  if (/products on sale|on sale|sale items/.test(q)) {
    const sale = findSaleProducts();
    return {
      text: `Here are the products currently on demo sale.`,
      attachments: [{ type: 'product-list', productIds: sale.map((p) => p.id), title: 'Products on Sale' }],
    };
  }

  // Earphones under X
  const underMatch = q.match(/(earphones?|earbuds?|notebooks?|pens?|usb|products?)\s*(under|below|less than)\s*₹?(\d[\d,]*)/);
  if (underMatch) {
    const maxPrice = parseInt(underMatch[3].replace(/,/g, ''), 10);
    const category = underMatch[1];
    let results = findProductsUnder(maxPrice);
    if (category !== 'products') {
      const catLower = category.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(catLower) ||
          p.category.toLowerCase().includes(catLower),
      );
    }
    if (results.length > 0) {
      return {
        text: `I found **${results.length} product${results.length > 1 ? 's' : ''}** under **₹${maxPrice}**.`,
        attachments: [{ type: 'product-list', productIds: results.map((p) => p.id), title: `Under ₹${maxPrice}` }],
      };
    }
    return { text: `I couldn't find any products under **₹${maxPrice}** in the demo catalogue.` };
  }

  // Cheapest notebook
  if (/cheapest notebook|cheapest.*notebook/.test(q)) {
    const cheapest = findCheapestNotebook();
    if (cheapest) {
      return {
        text: `The cheapest notebook in the demo is **${cheapest.name}** at **₹${cheapest.currentPrice}**.`,
        attachments: [{ type: 'product-card', productId: cheapest.id }],
      };
    }
  }

  // Price of X
  if (/(what's|what is|price of|cost of|how much is|how much).*/.test(q) || q.startsWith("what's the price")) {
    const matched = findProductsByQuery(q);
    if (matched.length > 0) {
      const p = matched[0];
      const discount = getDiscountPercent(p);
      const memberSave = getMemberSavings(p);
      const trend = p.currentPrice < p.previousPrice ? 'down from' : p.currentPrice > p.previousPrice ? 'up from' : 'currently';
      const trendLabel = trend === 'down from' ? `, down from ₹${p.previousPrice}` : trend === 'up from' ? `, up from ₹${p.previousPrice}` : '';
      return {
        text: `The demo price for **${p.name}** is currently **₹${p.currentPrice}**${trendLabel}.\n\n**${discount}% OFF**\n\nPURPLE Member Price: **₹${p.memberPrice}**\n\nYou're saving **₹${p.mrp - p.currentPrice}**, or **₹${p.mrp - p.memberPrice} with your membership**.`,
        attachments: [{ type: 'product-card', productId: p.id }],
      };
    }
    if (matched.length === 0 && /(biscuit|chip|chocolate|juice|drink|water|bread|milk|cereal|noodle|cookie|ice cream|pen|notebook|usb|earphone|phone)/.test(q)) {
      return { text: `I couldn't find a product matching that in the demo catalogue. Try asking about biscuits, chips, chocolate, juice, or earphones.` };
    }
  }

  // Show me X
  if (/(show me|find|show).*/.test(q)) {
    const matched = findProductsByQuery(q);
    if (matched.length > 0) {
      if (matched.length === 1) {
        return {
          text: `Here's **${matched[0].name}** from the demo catalogue.`,
          attachments: [{ type: 'product-card', productId: matched[0].id }],
        };
      }
      return {
        text: `I found **${matched.length} products** matching your request.`,
        attachments: [{ type: 'product-list', productIds: matched.map((p) => p.id), title: 'Matching Products' }],
      };
    }
    if (q === 'find a product' || q === 'show products' || q === 'show me products') {
      const featured = products.slice(0, 6);
      return {
        text: `Here are some products from the demo catalogue. Ask me about specific items like biscuits, chips, chocolate, or earphones.`,
        attachments: [{ type: 'product-list', productIds: featured.map((p) => p.id), title: 'Featured Products' }],
      };
    }
  }

  // What can you do
  if (/what can you do|what do you do|your capabilities|help me|features|what are you/.test(q) || q === 'i need help' || q === 'help') {
    if (q === 'i need help' || q === 'help') {
      return {
        text: "I can help you explore products, check demo prices, view your membership benefits, or discover available offers.",
      };
    }
    return {
      text: "I can demonstrate retail assistance, product discovery, membership personalization, price information, offers, and customer interaction.",
    };
  }

  // Fallback
  return {
    text: "I'm currently running in demo mode. Try one of the suggested retail requests to explore what I can do.",
  };
}

export const suggestedPrompts: string[] = [
  'Find a product',
  'Show my membership',
  "What's the price of biscuits?",
  "Show today's offers",
  'What can you do?',
  'Which products are cheaper?',
  'How many points do I have?',
];

export function formatText(text: string): string {
  return text;
}
