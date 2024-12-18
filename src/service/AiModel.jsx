import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GAMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
  systemInstruction:
    "Generate  a shopping list for Recipe:  [Recipe ] biryani for 3 person [number of people]. Include all necessary ingredients and quantities for [specific meals, e.g., breakfast, lunch, dinner, snacks] and any household essentials. Ensure the list is organized by Category\tlike Item Name , Quantity(gm/kg) ,  etc. in JSON format.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate  a shopping list for Recipe:  [Recipe ] biryani for 3 person [number of people]. Include all necessary ingredients and quantities for [specific meals, e.g., breakfast, lunch, dinner, snacks] and any household essentials. Ensure the list is organized by Category\tlike Item Name , Quantity(gm/kg) ,  etc. in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "shopping_list": {\n    "recipe": "Biryani",\n    "servings": 3,\n    "meal_type": "lunch/dinner",\n    "categories": [\n      {\n        "category_name": "Rice & Grains",\n        "items": [\n          {\n            "item_name": "Basmati Rice",\n            "quantity": "500 gm",\n            "unit": "gm",\n            "notes": "Good quality long grain"\n          }\n        ]\n      },\n      {\n          "category_name": "Protein",\n          "items": [\n            {\n              "item_name": "Chicken (bone-in, cut into pieces)",\n              "quantity": "750 gm",\n              "unit": "gm",\n               "notes": "Can substitute with mutton/vegetables"\n            }\n          ]\n      },\n      {\n        "category_name": "Vegetables",\n        "items": [\n          {\n            "item_name": "Onions",\n            "quantity": "250 gm",\n            "unit": "gm",\n            "notes": "Medium sized, finely sliced"\n          },\n           {\n            "item_name": "Tomatoes",\n            "quantity": "200 gm",\n            "unit": "gm",\n             "notes": "Medium sized, chopped"\n          },\n          {\n            "item_name": "Green Chilies",\n            "quantity": "2-3",\n            "unit": "number",\n            "notes": "Adjust to spice preference"\n          },\n           {\n            "item_name": "Cilantro",\n            "quantity": "1 bunch",\n            "unit": "bunch",\n             "notes": "Fresh, for garnishing"\n          },\n           {\n            "item_name": "Mint Leaves",\n            "quantity": "1 bunch",\n             "unit": "bunch",\n            "notes":"Fresh, for flavour"\n           }\n        ]\n      },\n     {\n        "category_name": "Dairy",\n        "items": [\n          {\n            "item_name": "Yogurt (plain)",\n            "quantity": "200 gm",\n            "unit": "gm",\n            "notes":"Full fat preferred"\n          }\n        ]\n      },\n      {\n        "category_name": "Spices & Seasoning",\n        "items": [\n          {\n            "item_name": "Ginger Garlic Paste",\n            "quantity": "2 tbsp",\n             "unit": "tbsp",\n            "notes":"Freshly made preferred"\n          },\n            {\n            "item_name": "Biryani Masala Powder",\n            "quantity": "3 tbsp",\n              "unit": "tbsp",\n            "notes": "Store-bought or homemade"\n          },\n           {\n            "item_name": "Turmeric Powder",\n            "quantity": "1 tsp",\n             "unit":"tsp",\n             "notes": ""\n          },\n           {\n             "item_name":"Red Chili Powder",\n              "quantity":"1 tsp",\n              "unit":"tsp",\n             "notes":"Adjust to spice level"\n            },\n             {\n            "item_name":"Garam Masala Powder",\n            "quantity":"1 tsp",\n             "unit":"tsp",\n            "notes":""\n           },\n          {\n            "item_name": "Salt",\n            "quantity": "To taste",\n            "unit":" ",\n            "notes": "Regular or sea salt"\n          },\n            {\n            "item_name": "Black Peppercorns",\n            "quantity": "10-12",\n            "unit": "number",\n             "notes":"Whole"\n          },\n            {\n             "item_name":"Cloves",\n             "quantity":"4-5",\n             "unit":"number",\n            "notes":"Whole"\n            },\n            {\n             "item_name":"Cinnamon Stick",\n             "quantity":"1 inch",\n              "unit":"inch",\n             "notes": ""\n            },\n            {\n             "item_name":"Bay Leaves",\n             "quantity":"2",\n              "unit":"number",\n             "notes":""\n            },\n           {\n              "item_name":"Cardamom pods",\n             "quantity":"3-4",\n              "unit":"number",\n             "notes":"Green"\n           }\n\n        ]\n      },\n      {\n         "category_name": "Oils & Fats",\n         "items":[\n          {\n           "item_name": "Cooking Oil/ Ghee",\n            "quantity":"100 ml",\n             "unit":"ml",\n            "notes":"Vegetable oil or Ghee"\n          }\n        ]\n\n      },\n        {\n        "category_name":"Household Essentials",\n        "items":[\n          {\n            "item_name":"Water",\n             "quantity":"As needed",\n             "unit":"",\n             "notes":"For Cooking rice"\n           },\n            {\n              "item_name":"Aluminium foil",\n              "quantity":"1 roll",\n              "unit":"roll",\n              "notes":"For dum cooking (optional)"\n            }\n           ]\n      }\n    ]\n  }\n}\n```\n',
        },
      ],
    },
  ],
});
