import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1681136388519 implements MigrationInterface {
    name = 'addedEntity1681136388519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "balance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "credits" integer NOT NULL, "userId" uuid, CONSTRAINT "REL_9297a70b26dc787156fa49de26" UNIQUE ("userId"), CONSTRAINT "PK_079dddd31a81672e8143a649ca0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "email_index" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "operation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "type" character varying NOT NULL, "cost" integer, CONSTRAINT "PK_18556ee6e49c005fc108078f3ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "record" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "amount" integer NOT NULL, "operationResponse" character varying, "userId" uuid, "operationId" uuid, CONSTRAINT "PK_5cb1f4d1aff275cf9001f4343b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "balance" ADD CONSTRAINT "FK_9297a70b26dc787156fa49de26b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "record" ADD CONSTRAINT "FK_8675cd3761984947c2506f39a25" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "record" ADD CONSTRAINT "FK_04ece667648bd61900cddd532a6" FOREIGN KEY ("operationId") REFERENCES "operation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "record" DROP CONSTRAINT "FK_04ece667648bd61900cddd532a6"`);
        await queryRunner.query(`ALTER TABLE "record" DROP CONSTRAINT "FK_8675cd3761984947c2506f39a25"`);
        await queryRunner.query(`ALTER TABLE "balance" DROP CONSTRAINT "FK_9297a70b26dc787156fa49de26b"`);
        await queryRunner.query(`DROP TABLE "record"`);
        await queryRunner.query(`DROP TABLE "operation"`);
        await queryRunner.query(`DROP INDEX "public"."email_index"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "balance"`);
    }

}
