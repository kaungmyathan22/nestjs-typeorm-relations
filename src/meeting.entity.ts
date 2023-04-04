import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meeting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    zoomUrl: string;

    @ManyToMany(() => Employee, emp => emp.meetings)
    attendees: Employee[];
}