import { EntityRepository, Repository } from 'typeorm';
import { Attendance } from './../models/attendance';

@EntityRepository(Attendance)
class AttendanceRepository extends Repository<Attendance> {}

export { AttendanceRepository };
