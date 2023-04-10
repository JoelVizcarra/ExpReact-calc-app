import { MigrationInterface, QueryRunner } from 'typeorm';
import { Operation } from '../entities/operation.entity';

const operations = [
  { type: 'buy_credits' },
  { type: 'addition', cost: 1 },
  { type: 'subtraction', cost: 1 },
  { type: 'multiplication', cost: 2 },
  { type: 'division', cost: 2 },
  { type: 'square-root', cost: 4 },
  { type: 'random-string', cost: 5 },
];

export class seed1681136388520 implements MigrationInterface {
  name = 'seed1681136388520';

  public async up(queryRunner: QueryRunner): Promise<void> {
    operations.forEach(
      async (operation) =>
        await queryRunner.manager.save(
          queryRunner.manager.create<Operation>(Operation, operation)
        )
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM operation`);
  }
}
