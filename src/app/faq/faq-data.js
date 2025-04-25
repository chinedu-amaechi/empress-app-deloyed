// src/app/faq/faq-data.js

/**
 * FAQ data structure with categories
 */
export const allFaqs = [
  {
    category: "Product Information",
    question: "How do I determine my bracelet size?",
    answer:
      'Measure your wrist circumference with a flexible tape measure. Add 0.5-1 inch (1.3-2.5 cm) to your wrist measurement for a comfortable fit. Our bracelets come in size ranges 14cm-19cm, 15cm-17.5cm, 15.5cm-18cm, and 16cm-18cm.',
  },
  {
    category: "Product Information",
    question: "What materials are used in Empress bracelets?",
    answer:
      "Our bracelets are crafted using ethically sourced precious metals including 925 sterling silver electroplated with 24K gold. Select pieces feature genuine gemstones such as amethyst, jade, opal, pearl, blue topaz, amazonite, and mother of pearl. We prioritize hypoallergenic materials and each piece undergoes rigorous quality testing.",
  },
  {
    category: "Product Care",
    question: "How should I care for my Empress bracelet?",
    answer:
      "To maintain your bracelet's beauty, we recommend storing it in a dry place. Clean gently with the provided silver polishing cloth. Keep your jewelry dry; remove it before showering, bathing, swimming, or exercising. Apply makeup, perfume, and hairspray before wearing your jewelry to avoid tarnishing.",
  },
  {
    category: "Orders & Shipping",
    question: "What is your return and exchange policy?",
    answer:
      "We are currently not accepting any returns on refunds, however we accept exchanges within 7 days of delivery in case the product is damaged. You may exchange the product for the same as the original purchase, or choose a new design with either the same or higher value, in which you will pay the difference.",
  },
  {
    category: "Orders & Shipping",
    question: "Do you offer international shipping?",
    answer:
      "We currently ship to Canada, US, and China. You should expect your product to arrive within 7-14 days of purchase. Import duties and taxes may apply depending on your location and are the responsibility of the customer. All shipments include tracking information.",
  },
  {
    category: "Product Care",
    question: "Are Empress bracelets water-resistant?",
    answer:
      "While our bracelets are crafted for durability, we recommend removing them before swimming, showering, or engaging in activities with excessive moisture. Brief exposure to water won't damage most pieces, but prolonged contact may affect the finish and mechanics. For specific care instructions for your piece, please refer to the care card included with your purchase.",
  },
  {
    category: "Customer Service",
    question: "Do you offer bracelet repairs or re-sizing?",
    answer:
      "Yes, we provide repair and re-sizing services for all Empress bracelets. Re-sizing is complimentary within the first 60 days of purchase. After this period, or for repairs, a nominal fee may apply depending on the complexity of the work required. Please contact our customer service team to arrange for these services.",
  },
  {
    category: "Orders & Shipping",
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a confirmation email with your tracking information. You can also track your order by logging into your account on our website and navigating to the 'Order History' section. If you have any issues accessing your tracking information, please contact our customer support team.",
  },
  {
    category: "Customer Service",
    question: "How can I contact customer support?",
    answer:
      "You can reach customer support via email at empresscanadagroup@gmail.com and you should expect a response within 3 business days.",
  },
  {
    category: "Account & Privacy",
    question: "How is my personal information protected?",
    answer:
      "We take your privacy seriously. All personal information is encrypted and securely stored following industry-standard protocols. We never share your information with third parties without your explicit consent.",
  },
  {
    category: "Product Information",
    question: "Are your materials ethically sourced?",
    answer:
      "Yes, we are committed to ethical sourcing practices. All our gemstones and precious metals come from suppliers who adhere to responsible mining and production standards. We regularly audit our supply chain to ensure compliance with ethical guidelines and environmental regulations.",
  },
  {
    category: "Account & Privacy",
    question: "How do I create or manage my account?",
    answer:
      "To create an account, click on the 'Account' icon in the top right corner of our website and select 'Create Account.' For existing customers, log in using your email and password to access your account dashboard. From there, you can manage your profile information, view order history, track shipments, and update payment methods.",
  },
];

/**
 * Get unique categories from FAQ data
 */
export const getCategories = () => {
  return ["All", ...new Set(allFaqs.map((faq) => faq.category))];
};

/**
 * Filter FAQs by category and search query
 */
export const filterFaqs = (category, searchQuery) => {
  let result = [...allFaqs];

  // Filter by category if not "All"
  if (category !== "All") {
    result = result.filter((faq) => faq.category === category);
  }

  // Filter by search query if it exists
  if (searchQuery && searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    result = result.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }

  return result;
};
