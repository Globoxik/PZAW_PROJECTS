BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "cards" (
	"id"	INTEGER,
	"name"	VARCHAR NOT NULL,
	"attribute"	VARCHAR,
	"level"	INTEGER,
	"type"	VARCHAR,
	"atk"	VARCHAR,
	"def"	VARCHAR,
	"quantity"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "cards" VALUES (1,'Dark Magician','DARK',7,'Spellcaster','2500','2100',2);
INSERT INTO "cards" VALUES (2,'Blue-Eyes White Dragon','LIGHT',8,'Dragon','3000','2500',1);
INSERT INTO "cards" VALUES (3,'Red-Eyes Black Dragon','DARK',7,'Dragon','2400','2000',3);
INSERT INTO "cards" VALUES (4,'Summoned Skull','DARK',6,'Fiend','2500','1200',1);
INSERT INTO "cards" VALUES (5,'Celtic Guardian','EARTH',4,'Warrior','1400','1200',4);
INSERT INTO "cards" VALUES (6,'Kuriboh','DARK',1,'Fiend','300','200',5);
INSERT INTO "cards" VALUES (7,'Jinzo','DARK',6,'Machine','2400','1500',2);
INSERT INTO "cards" VALUES (8,'Dark Magician Girl','DARK',6,'Spellcaster','2000','1700',1);
INSERT INTO "cards" VALUES (9,'Elemental HERO Neos','LIGHT',7,'Warrior','2500','2000',2);
INSERT INTO "cards" VALUES (10,'Blue-Eyes Chaos MAX Dragon','LIGHT',8,'Dragon','4000','0',1);
COMMIT;
