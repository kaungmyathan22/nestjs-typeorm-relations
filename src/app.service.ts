import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Employee } from './employee.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private contactInfoRepository: Repository<ContactInfo>,
    @InjectRepository(Meeting) private meetingRepository: Repository<Meeting>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) { }

  async seed () {
    const ceo = this.employeeRepository.create({ name: 'Mr. CEO' });
    await this.employeeRepository.save(ceo);

    const contactInfo = this.contactInfoRepository.create({
      email: 'ceo@gmail.com',
    });
    contactInfo.employee = ceo;
    await this.contactInfoRepository.save(contactInfo);

    const manager = this.employeeRepository.create({
      name: 'Mr.John',
      manager: ceo,
    });
    const task1 = this.taskRepository.create({ name: 'Hire People' });
    await this.taskRepository.save(task1);

    const task2 = this.taskRepository.create({ name: 'Report to ceo' });
    await this.taskRepository.save(task2);

    manager.tasks = [task1, task2];
    await this.employeeRepository.save(manager);

    const meeting1 = this.meetingRepository.create({ zoomUrl: 'hola.com' });
    meeting1.attendees = [ceo, manager];

    await this.meetingRepository.save(meeting1);

    return 'Seed Complete';
  }

  getEmployeeById (id: number) {
    return this.employeeRepository.findOne({
      where: { id },
      relations: {
        tasks: true,
        manager: true,
        directReports: true,
        contactInfo: true,
        meetings: true
      },
      // relations: [
      //   'manager',
      //   'directReports',
      //   'tasks',
      //   'contactInfo',

      //   // 'meetings',
      // ],
    });
  }

  getHello (): string {
    return 'Hello World!';
  }
}
