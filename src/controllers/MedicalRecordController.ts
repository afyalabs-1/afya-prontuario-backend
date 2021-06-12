import { Request, Response } from 'express';
import { MedicalRecordService } from '../services/MedicalRecordService';

class MedicalRecordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { openDate, client } = request.body;

    const medicalRecordService = new MedicalRecordService();

    const medicalRecord = await medicalRecordService.create({
      openDate,
      client,
    });

    if (medicalRecord) {
      return response.status(201).json(medicalRecord);
    } else {
      return response
        .status(401)
        .json({ message: 'Error when registering Medical Record' });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const medicalRecordService = new MedicalRecordService();

    try {
      const medicalRecord = await medicalRecordService.delete(id);
      return response.json(medicalRecord);
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
    const { id } = request.body;

    const medicalRecordService = new MedicalRecordService();

    try {
      const medicalRecord = await medicalRecordService.listMedicalRecord(id);

      return response.json(medicalRecord);
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
}

export { MedicalRecordController };
