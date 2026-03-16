import { MigrationInterface, QueryRunner } from "typeorm";

export class Post1773400767450 implements MigrationInterface {
    name = 'Post1773400767450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."post_mediatype_enum" AS ENUM('image', 'video')`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "post" character varying NOT NULL, "caption" character varying NOT NULL, "points" integer NOT NULL, "mediaType" "public"."post_mediatype_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "category" uuid, "userId" uuid, "challengeId" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_60fc2bf4245759a0671aee77302" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_503eedbad054d35f9cebb705e8e" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_503eedbad054d35f9cebb705e8e"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_60fc2bf4245759a0671aee77302"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TYPE "public"."post_mediatype_enum"`);
    }

}
