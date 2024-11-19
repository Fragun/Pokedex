SELECT * FROM pokemon WHERE pokemon.id = 1;

SELECT m.identifier AS "Attaques à apprendre", m.power, m.pp, m.accuracy, t.identifier AS types
FROM moves AS m
JOIN pokemon_moves AS pm ON m.id = pm.move_id
JOIN pokemon AS p ON pm.pokemon_id = p.id
JOIN types AS t ON m.type_id = t.id
WHERE p.identifier = "mewtwo";

ALTER TABLE types MODIFY COLUMN id INT AUTO_INCREMENT PRIMARY KEY;