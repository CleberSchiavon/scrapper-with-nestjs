import { Test, TestingModule } from '@nestjs/testing'
import { ScraperService } from './scraper.service'
import { BrowserService } from 'modules/browser/browser.service'
import { IScraperRequestDTO } from 'common/dtos/scraper.dto'
import { formatDate } from 'utils/string-parsers'

describe('ScraperService', () => {
  let service: ScraperService
  let browser: BrowserService
  const checkinDate = new Date()
  const invalidCheckout = new Date(checkinDate)
  const validCheckoutDate = new Date(checkinDate)
  invalidCheckout.setDate(checkinDate.getDate() - 2)
  validCheckoutDate.setDate(checkinDate.getDate() + 4)

  const validScraperRequestMock: IScraperRequestDTO = {
    checkin: formatDate(checkinDate),
    checkout: formatDate(validCheckoutDate),
  }

  const invalidScraperRequestMock = {
    checkin: formatDate(checkinDate),
    checkout: formatDate(invalidCheckout),
  }

  const expectedRoomStructure = {
    roomName: expect.any(String),
    roomDescription: expect.any(String),
    roomPrice: expect.any(String),
    roomImage: expect.any(String),
  }

  beforeEach(async () => {
    jest.resetModules()
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScraperService, BrowserService],
    }).compile()

    service = module.get<ScraperService>(ScraperService)
    browser = module.get<BrowserService>(BrowserService)
  })

  it('ScraperService should be defined', () => {
    expect(service).toBeDefined()
  })
  it('BrowserService should be defined', () => {
    expect(browser).toBeDefined()
  })

  describe('searchHotels', () => {
    test('should return an valid array of room data when is a valid request', async () => {
      const roomData = await service.searchHotels(validScraperRequestMock)
      expect(Array.isArray(roomData)).toBeTruthy()
      expect(roomData.length).toBeGreaterThan(0)
      roomData.forEach(roomData => {
        expect(roomData).toEqual(expect.objectContaining(expectedRoomStructure))
      })
    }, 30000)

    it('should throw an HTTP error when provided with an invalid checkout date', async () => {
      await expect(
        service.searchHotels(invalidScraperRequestMock),
      ).rejects.toThrow()
    })
  })
})
