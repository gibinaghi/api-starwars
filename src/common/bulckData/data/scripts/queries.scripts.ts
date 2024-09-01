import { Client } from 'pg';

export default class Query {
  constructor(private client: Client) {}
  async selectData(table: string, field: string, value: string): Promise<any> {
    const selection = await this.client.query(
      `SELECT id FROM ${table} WHERE ${field} = '${value}'; `,
    );
    return selection;
  }

  async insertRole(description: string): Promise<void> {
    await this.client.query(
      `INSERT INTO roles (description) VALUES ('${description}');`,
    );
  }

  async insertUser(
    table: string,
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.client.query(
      `INSERT INTO "${table}" (name, email, password, login_active, role_id) VALUES ('${name}', '${email}', '${password}', false, 1);`,
    );
  }
}
