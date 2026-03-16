import { MigrationInterface, QueryRunner } from "typeorm";

export class Challenge1773399481860 implements MigrationInterface {
    name = 'Challenge1773399481860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."challenges_mediatype_enum" AS ENUM('image', 'video')`);
        await queryRunner.query(`CREATE TABLE "challenges" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "post" character varying NOT NULL, "title" character varying NOT NULL, "pointValue" integer NOT NULL, "mediaType" "public"."challenges_mediatype_enum" NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "description" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "category" uuid, CONSTRAINT "PK_1e664e93171e20fe4d6125466af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "challenges" ADD CONSTRAINT "FK_c64af6f1c51a8bddaf59edd89c1" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "challenges" DROP CONSTRAINT "FK_c64af6f1c51a8bddaf59edd89c1"`);
        await queryRunner.query(`DROP TABLE "challenges"`);
        await queryRunner.query(`DROP TYPE "public"."challenges_mediatype_enum"`);
    }

}
