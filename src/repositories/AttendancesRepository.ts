import { Attendance } from './../models/attendance';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Attendance)
class AttendanceRepository extends Repository<Attendance> {}

export { AttendanceRepository };
