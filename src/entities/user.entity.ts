import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from "typeorm";

import { Log } from "./log.entity";

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

@Entity()
export class User {
  // Constructor to initialize properties
  constructor(email: string, password: string, role: 'admin' | 'user' = UserRole.User) {
    this.email = email;
    this.password = password;
    this.role = role;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: 'user' })
  role: 'admin' | 'user';

  @OneToMany(() => Log, (log) => log.user)
  logs!: Log[];
}
