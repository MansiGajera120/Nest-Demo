import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserCreate1773386610157 implements MigrationInterface {
  name = 'UserCreate1773386610157';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('Active', 'Blocked')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "bio" character varying, "profile" character varying NOT NULL, "status" "public"."users_status_enum" NOT NULL DEFAULT 'Active', "point" integer NOT NULL DEFAULT '0', "isNotificationSend" boolean NOT NULL DEFAULT true, "deviceType" character varying, "deviceToken" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "deleteReason" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
  }
}
