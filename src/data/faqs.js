// Global FAQ content. Grouped by topic; the FAQ page searches across all of it.
// Add an entry here and it appears in search and on the page — no code change.
export const faqs = [
  { topic: 'Booking', q: 'How do I book a trip?', a: 'Pick a package and hit Book Now (or WhatsApp us). We confirm availability, send an itinerary and a payment link. A 25% deposit secures your dates.' },
  { topic: 'Booking', q: 'How far in advance should I book?', a: 'For summer and the winter ski season, 4–8 weeks ahead is ideal for the best stays. We also take last-minute trips whenever we can arrange them well.' },
  { topic: 'Payments', q: 'What are the payment terms?', a: 'A 25% deposit confirms your booking; the balance is due 15 days before arrival. We accept cards and bank transfers.' },
  { topic: 'Payments', q: 'Are prices per person or per group?', a: 'Listed prices are “from”, per person on twin-sharing. Your exact quote depends on group size, season and room category.' },
  { topic: 'Cancellations', q: 'What is your cancellation policy?', a: 'Free changes up to 15 days before arrival. 15–7 days forfeits the deposit; within 7 days, 50% is charged. Weather changes are always rebooked at no cost.' },
  { topic: 'Travel', q: 'Is Kashmir safe to travel?', a: 'The tourist regions we operate in are well-established and welcoming. Our local guides monitor conditions and adjust plans for your comfort and safety.' },
  { topic: 'Travel', q: 'Do you arrange flights?', a: 'We arrange everything on the ground from your arrival at Srinagar or Leh. Flights are easy to add on request.' },
  { topic: 'Travel', q: 'What is the best time to visit?', a: 'Tulips and green valleys in spring, alpine treks in summer, golden chinars in autumn, and world-class powder in winter. Every season has its own magic.' },
  { topic: 'Ladakh', q: 'How do you handle high altitude in Ladakh?', a: 'Every Ladakh itinerary builds in a full acclimatisation day in Leh before higher passes, with oxygen support and first-aid carried throughout.' },
  { topic: 'Ladakh', q: 'Are permits included for Nubra and Pangong?', a: 'Yes — Inner Line Permits for Nubra, Pangong and Tso Moriri are arranged for you before arrival.' },
  { topic: 'Custom trips', q: 'Can I combine regions or customise a package?', a: 'Absolutely. Many guests pair Kashmir with Leh–Ladakh or add a trek. Use the custom builder or just ask — every package is a starting point.' },
  { topic: 'Groups', q: 'Do you cater to families and large groups?', a: 'Yes. Itineraries can be paced down for families and scaled up for groups, with the right vehicles and stays arranged.' },
]

export const faqTopics = [...new Set(faqs.map((f) => f.topic))]
