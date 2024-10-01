import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

export type LogLevel = 'info' | 'warning' | 'error'

@Entity()
export class Log {
    constructor(timestamp: Date, level: LogLevel, text: string, hasLocalhostUrl: boolean) {
      this.timestamp = timestamp;
      this.level = level;
      this.text = text;
      this.hasLocalhostUrl = hasLocalhostUrl;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int' })
    userId!: number;

    @CreateDateColumn()
    timestamp: Date;

    @Column({ type: 'enum', enum: ['info', 'warning', 'error']})
    level: LogLevel;

    @Column({type: 'text'})
    text: string;

    @Column({type: 'boolean', default: false})
    hasLocalhostUrl: boolean;

    @ManyToOne(() => User, (user) => user.logs)
    @JoinColumn({ name: 'userId' })
    user!: User;
}
