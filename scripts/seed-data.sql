-- Sample data for Food Truck Marketplace
-- Run this after initializing the database

-- Insert sample food trucks
INSERT INTO food_trucks (title, description, category, specifications) VALUES
(
  'Pizza Mobile Premium',
  'Food truck spécialisé dans la pizza artisanale avec four à bois intégré. Design moderne et équipements professionnels pour une qualité restaurant.',
  'Pizza',
  '{"Dimensions": "3.5m x 2.2m", "Capacité": "60 personnes/heure", "Équipements": ["Four à bois", "Préparation", "Réfrigération"], "Prix": "Sur devis"}'
),
(
  'Burger King Mobile',
  'Food truck complet pour burgers gourmets avec grill professionnel et zone de préparation optimisée. Parfait pour événements et festivals.',
  'Burger',
  '{"Dimensions": "3m x 2m", "Capacité": "80 burgers/heure", "Équipements": ["Grill double", "Friteuse", "Préparation"], "Prix": "Sur devis"}'
),
(
  'Tacos Express',
  'Food truck coloré et attractif spécialisé dans les tacos mexicains authentiques. Équipé d''une cuisine complète et d''un espace de service optimisé.',
  'Tacos',
  '{"Dimensions": "3.2m x 2.1m", "Capacité": "100 tacos/heure", "Équipements": ["Plancha", "Préparation", "Service"], "Prix": "Sur devis"}'
),
(
  'Sandwich Corner',
  'Food truck polyvalent pour sandwiches, paninis et salades. Design épuré et fonctionnel avec zone de préparation spacieuse.',
  'Sandwich',
  '{"Dimensions": "2.8m x 1.8m", "Capacité": "50 personnes/heure", "Équipements": ["Grill panini", "Réfrigération", "Préparation"], "Prix": "Sur devis"}'
),
(
  'Dessert Paradise',
  'Food truck spécialisé dans les desserts et pâtisseries. Équipé d''un four professionnel et d''une vitrine réfrigérée pour présenter les créations.',
  'Dessert',
  '{"Dimensions": "3m x 2m", "Capacité": "40 desserts/heure", "Équipements": ["Four professionnel", "Vitrine réfrigérée", "Préparation"], "Prix": "Sur devis"}'
),
(
  'Boissons & Smoothies',
  'Food truck compact spécialisé dans les boissons fraîches, smoothies et jus de fruits. Parfait pour compléter votre offre alimentaire.',
  'Boissons',
  '{"Dimensions": "2.5m x 1.5m", "Capacité": "100 boissons/heure", "Équipements": ["Blender professionnel", "Réfrigération", "Service"], "Prix": "Sur devis"}'
);

-- Insert sample quote requests
INSERT INTO quote_requests (name, email, phone, message, food_truck_id, status) VALUES
(
  'Ahmed Benali',
  'ahmed.benali@email.com',
  '+212 6XX XXX XXX',
  'Bonjour, je suis intéressé par le modèle Pizza Mobile Premium. Pouvez-vous me faire un devis détaillé avec les options d''équipements supplémentaires ?',
  1,
  'pending'
),
(
  'Fatima Zahra',
  'fatima.zahra@email.com',
  '+212 6XX XXX XXX',
  'Je souhaite créer un food truck pour mon entreprise de burgers. Le modèle Burger King Mobile correspond parfaitement à mes besoins.',
  2,
  'in_progress'
),
(
  'Youssef Alami',
  'youssef.alami@email.com',
  '+212 6XX XXX XXX',
  'Projet de food truck pour tacos mexicains. Besoin d''informations sur les délais de livraison et les options de personnalisation.',
  3,
  'completed'
);

-- Insert sample contact messages
INSERT INTO contact_messages (name, email, phone, message) VALUES
(
  'Karim El Fassi',
  'karim.elfassi@email.com',
  '+212 6XX XXX XXX',
  'Bonjour, je suis à la recherche d''un food truck personnalisé pour mon restaurant. Pouvez-vous me contacter pour discuter de mon projet ?'
),
(
  'Aicha Benjelloun',
  'aicha.benjelloun@email.com',
  '+212 6XX XXX XXX',
  'Je souhaite obtenir des informations sur vos services de maintenance et SAV pour food trucks. Merci de me recontacter.'
),
(
  'Omar Tazi',
  'omar.tazi@email.com',
  NULL,
  'Excellente qualité de vos food trucks ! Je recommande vos services à tous mes collègues restaurateurs.'
);
