import { Injectable } from '@nestjs/common'
import { writeFile } from 'fs/promises'
import { join } from 'path'

@Injectable()
export class FilesService {
  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    const uploadFolder = join(__dirname, '..', 'uploads') // Путь к папке для загрузки файлов
    const fileUrls: string[] = []

    for (const file of files) {
      const filePath = join(uploadFolder, file.originalname)
      await writeFile(filePath, file.buffer) // Сохранение файла на сервере
      const fileUrl = `http://localhost:5005/images/${file.originalname}` // Формирование URL файла
      fileUrls.push(fileUrl)
    }

    return fileUrls
  }
}
