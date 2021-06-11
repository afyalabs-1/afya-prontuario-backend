import { Request, Response } from 'express';
import { MedicalRecordDetailService } from '../services/MedicalRecordDetailService';

class MedicalRecordDetailController {
  async create(request: Request, response: Response): Promise<Response> {
    const { dateTime, description, specialists, attendance, medicalRecord } =
      request.body;

    const medicalRecordDetailService = new MedicalRecordDetailService();

    const medicalRecordDetail = await medicalRecordDetailService.create({
      dateTime,
      description,
      specialists,
      attendance,
      medicalRecord,
    });

    if (medicalRecordDetail) {
      return response.status(201).json(medicalRecordDetail);
    } else {
      return response
        .status(401)
        .json({ message: 'ERROR: when registering Medical Record Detail!' });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { dateTime, description, specialists, attendance, medicalRecord } =
      request.body;

    const medicalRecordDetailService = new MedicalRecordDetailService();

    try {
      const medicalRecordDetail = await medicalRecordDetailService.update({
        id,
        dateTime,
        description,
        specialists,
        attendance,
        medicalRecord,
      });

      if (medicalRecordDetail) {
        return response.status(200).json(medicalRecordDetail);
      } else {
        return response.status(404).json({
          message: 'ERROR when updating Medical Record Detail',
        });
      }
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const medicalRecordDetailService = new MedicalRecordDetailService();

    try {
      const medicalRecordDetail = await medicalRecordDetailService.delete(id);
      return response.json(medicalRecordDetail);
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async listMedicalRecord(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { medicalRecord } = request.body;

    const medicalRecordDetailService = new MedicalRecordDetailService();

    try {
      const medicalRecordDetail =
        await medicalRecordDetailService.listMedicalRecord(medicalRecord);
      return response.json(medicalRecordDetail);
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
}

export { MedicalRecordDetailController };
