import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { ScraperController } from './scraper.controller'
import { ScraperService } from './scraper.service'
import { BrowserService } from 'modules/browser/browser.service'
import { AppModule } from 'src/app.module'
import { HttpStatusMessages } from 'types/enums/http.enums'
describe('ScraperController', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ScraperController],
      providers: [ScraperService, BrowserService],
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('searchHotels', () => {
    test('should return array of rooms on success', async () => {
      const checkinDate = new Date()
      const checkoutDate = new Date(checkinDate)
      checkoutDate.setDate(checkinDate.getDate() + 4)
      const requestBodyMock = {
        checkin: checkinDate,
        checkout: checkoutDate,
      }

      const response = await request(app.getHttpServer())
        .post('/search')
        .send(requestBodyMock)
        .expect(HttpStatus.OK)

      expect(response.body).toBeInstanceOf(Array)
      expect(response.body.length).toBeGreaterThan(0)

      const expectedRoomStructure = {
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(String),
        image: expect.any(String),
      }

      response.body.forEach(room => {
        expect(room).toEqual(expect.objectContaining(expectedRoomStructure))
      })
    }, 40000)

    test('should return 400 for old date in payload', async () => {
      const oldDatePayload = {
        checkin: '2024-04-19',
        checkout: '2024-04-23',
      }

      const response = await request(app.getHttpServer())
        .post('/search')
        .send(oldDatePayload)
        .expect(HttpStatus.BAD_REQUEST)
      const errorMessage = response.body.message
      expect(errorMessage).toStrictEqual(HttpStatusMessages.OLD_DATE)
    })
    test('should return 400 for not enought days in payload', async () => {
      const checkinDate = new Date()
      const checkoutDate = new Date(checkinDate)
      checkoutDate.setDate(checkinDate.getDate() + 1)
      const oldDatePayload = {
        checkin: checkinDate,
        checkout: checkoutDate,
      }

      const response = await request(app.getHttpServer())
        .post('/search')
        .send(oldDatePayload)
        .expect(HttpStatus.BAD_REQUEST)
      const errorMessage = response.body.message
      expect(errorMessage).toStrictEqual(HttpStatusMessages.NOT_ENOUGH_DAYS)
    })
    test('should return 400 for invalid checkout date in payload', async () => {
      const checkinDate = new Date()
      const checkoutDate = new Date(checkinDate)
      checkoutDate.setDate(checkinDate.getDate() - 2)
      const oldDatePayload = {
        checkin: checkinDate,
        checkout: checkoutDate,
      }

      const response = await request(app.getHttpServer())
        .post('/search')
        .send(oldDatePayload)
        .expect(HttpStatus.BAD_REQUEST)
      const errorMessage = response.body.message
      expect(errorMessage).toStrictEqual(
        HttpStatusMessages.INVALID_CHECKOUT_DATE_MESSAGE,
      )
    })
  })
})
