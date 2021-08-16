-- CreateTable
CREATE TABLE "db_75" (
    "id_75" VARCHAR(30),
    "id_fantoir" VARCHAR(20),
    "numero" SMALLINT,
    "rep" VARCHAR(5),
    "nom_voie" VARCHAR(80),
    "code_postal" INTEGER,
    "code_insee" INTEGER,
    "nom_commune" VARCHAR(50),
    "x" DECIMAL,
    "y" DECIMAL,
    "lon" DECIMAL,
    "lat" DECIMAL,
    "libelle_acheminement" VARCHAR(30),
    "nom_afnor" VARCHAR(80),
    "id" SERIAL NOT NULL,
    "adresse" VARCHAR(180),

    PRIMARY KEY ("id")
);
