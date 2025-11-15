

const now = Date.now();

const initialSessions = [
  {
    id: "session-1",
    title: "Sales overview - Q1",
    updatedAt: now - 1000 * 60 * 60 * 24 * 2,
    history: [
      {
        id: "m1",
        role: "assistant",
        question: "Show sales by region",
        answerText: "Here's a sample sales table grouped by region (Q1 sample).",
        table: {
          columns: ["Region", "Sales", "Growth"],
          rows: [
            ["North", "₹1,200,000", "5%"],
            ["West", "₹950,000", "3%"],
            ["South", "₹780,000", "-2%"],
            ["East", "₹520,000", "1%"]
          ]
        },
        feedback: { likes: 2, dislikes: 0 },
        createdAt: now - 1000 * 60 * 60 * 24 * 2
      }
    ]
  },
  {
    id: "session-2",
    title: "Inventory check",
    updatedAt: now - 1000 * 60 * 60 * 24 * 5,
    history: [
      {
        id: "m2",
        role: "assistant",
        question: "Show stock summary",
        answerText: "Current stock levels for popular items.",
        table: {
          columns: ["Item", "Stock", "Warehouse"],
          rows: [
            ["Apples", 120, "Wh-A"],
            ["Bananas", 80, "Wh-A"],
            ["Oranges", 150, "Wh-B"]
          ]
        },
        feedback: { likes: 1, dislikes: 0 },
        createdAt: now - 1000 * 60 * 60 * 24 * 5
      }
    ]
  }
];

function sampleTable() {
  return {
    columns: ["Item", "Quantity", "Price"],
    rows: [
      ["Apples", 120, "₹1,200"],
      ["Bananas", 80, "₹600"],
      ["Oranges", 150, "₹1,350"]
    ]
  };
}

function answerTemplate(question) {
  return `Mock answer for: "${question}". This response includes a small table and a short description.`;
}

module.exports = { initialSessions, sampleTable, answerTemplate };
