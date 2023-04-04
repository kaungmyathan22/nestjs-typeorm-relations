import {
    Column,
    Entity,
    JoinTable,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Employee, (emp) => emp.directReports, {
        onDelete: 'SET NULL',
    })
    manager: Employee;

    @OneToMany(() => Employee, (emp) => emp.manager)
    directReports: Employee[];

    @OneToOne(() => ContactInfo, (contact) => contact.employee)
    contactInfo: ContactInfo;

    @OneToMany(() => Task, (task) => task.employee)
    tasks: Task[];

    @OneToMany(() => Meeting, (meeting) => meeting.attendees)
    @JoinTable()
    meetings: Meeting[];
}
