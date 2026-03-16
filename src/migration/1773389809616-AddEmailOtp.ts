import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailOtp1773389809616 implements MigrationInterface {
  name = 'AddEmailOtp1773389809616';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "otp" ADD "email" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "email"`);
  }
}
