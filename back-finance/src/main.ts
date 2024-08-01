import { NestFactory } from '@nestjs/core'
import { join } from 'path'
import * as serveStatic from 'serve-static'
import { AppModule } from './app.module'

const PORT = process.env.PORT || 4200

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true // Enable credentials support
  })

  // Serve static files from the 'images' directory
  app.use(
    '/images',
    serveStatic(join(__dirname, '..', 'images'), {
      maxAge: '1d',
      extensions: ['jpg', 'jpeg', 'png', 'gif', 'pdf']
    })
  )

  await app.listen(PORT)

  console.log(`app start on port: ${PORT}`)
}
bootstrap()
